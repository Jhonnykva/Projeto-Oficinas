
#include <EEPROM.h>
#include <Servo.h>
#include <WiFi.h>
#include <Wire.h>

#include <HTTPClient.h>
#include "Adafruit_MPU6050.h"
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include "esp_camera.h"

#define EEPROM_LENGTH 1024

// Controle de tensão da bateria
#define CHECK_BATTERY 1
#define BAT_CHECK_PIN 33
#define BAT_CHECK_N_SAMPLES 30
#define BAT_CHECK_CAL 0.00477401
#define MIN_VOLTAGE 7.2

// Definições de pinos internos
#define DEBUG 1
#define PWDN_GPIO_NUM 32
#define RESET_GPIO_NUM -1
#define XCLK_GPIO_NUM 0
#define SIOD_GPIO_NUM 26
#define SIOC_GPIO_NUM 27
#define Y9_GPIO_NUM 35
#define Y8_GPIO_NUM 34
#define Y7_GPIO_NUM 39
#define Y6_GPIO_NUM 36
#define Y5_GPIO_NUM 21
#define Y4_GPIO_NUM 19
#define Y3_GPIO_NUM 18
#define Y2_GPIO_NUM 5
#define VSYNC_GPIO_NUM 25
#define HREF_GPIO_NUM 23
#define PCLK_GPIO_NUM 22

// Control Button
#define BTN_PIN 12
bool btnStatus = false;

// Pinos I2C
#define I2C_SDA 15
#define I2C_SCL 14

// Servidor
#define API_PORT 5055

// Controle servo
#define PIN_SERVO 13
Servo servo;
int pos = 0;

// Controle Giroscópio
const int MPU_ADDRESS = 0x68; // MPU6050 I2C address
TwoWire I2CMPU = TwoWire(0);
Adafruit_MPU6050 mpu;
int contagemNotificacaoMPU = 0;
float ax = -1, ay = -1, az = -1, gx = -1, gy = -1, gz = -1;
sensors_event_t a, g, temp;

// Parametros servidor
String host = "10.255.0.254";
String authString = "--`";
WiFiClient client;

// Parametros WiFi
String ssid = "--";
String pass = "--";

void setup()
{
  // Inicia EEPROM
  EEPROM.begin(EEPROM_LENGTH);
  //Inicialização do Serial
  Serial.begin(115200);
  delay(100);
  Serial.println("Serial iniciado!");

  // Inicializa I2C
  I2CMPU.begin(I2C_SDA, I2C_SCL, 100000);

  //Inicialização do Giroscópio
  if (!mpu.begin(MPU_ADDRESS, &I2CMPU))
  {
    Serial.println("Falha ao iniciar Giroscopio!");
  }
  else
    Serial.println("Giroscopio iniciado!");

  //Configuração do Servo-Motor
  servo.attach(PIN_SERVO, 2);

  // Carrega parametros desde EEPROM
  carregarEEPROM();
  iniciaCamera();

  // Configura Interrupt do botao
  initBtnControl();

  //Ajusta todas as configurações iniciais para o Wifi
  setupWifi();

  // Verifica se não existe um cod de configuração
  checkForConfigUpdate();
}

void checkBatteryStatus(bool);
bool desbloqueado = false;
void loop()
{
  /* Pega a imagem da camera e envia para o servidor
      para verificar se existe um liberador na imagem
  */
  bool running = digitalRead(BTN_PIN) == HIGH;
  if (!running) {
#if DEBUG
    Serial.println("NOT RUNNING");
#endif
    //delay(250);
    //return;
  }
  if (running)
    desbloqueado = isCadeadoDesbloqueado();
#if DEBUG
  if (desbloqueado)
    Serial.println("Cadeado Desbloqueado");
  else Serial.println("Cadeado bloqueado");
#endif
  if (running) {
    if (desbloqueado) {
      bloquearCadeado();
      desbloqueado = isCadeadoDesbloqueado();
    } else {
      bool liberadorStatus = verificarLiberador();
      if (desbloqueado != liberadorStatus)
        desbloqueado = liberadorStatus;
#if DEBUG
      if (liberadorStatus)
        Serial.println("Cadeado Desbloqueado");
      else
        Serial.println("Liberador inválido");
#endif
    }
  }

  if (desbloqueado) {
    abrirCadeado();
  } else {
    fecharCadeado();
  }

  if (!desbloqueado) {
    // Verifica movimento caso o cadeado esteja bloqueado
    executarMPU();
  }
  checkBatteryStatus(false);
  if (!running) {
    delay(500);
  }
}

void setupWifi()
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid.c_str(), pass.c_str());
  Serial.print("Connecting to WiFi ..");
  int cwi = 0;
  unsigned int timeWaited = 0;
  while (WiFi.status() != WL_CONNECTED && timeWaited < 30000)
  {
    Serial.print('.');
    delay(1000);
    //    timeWaited += 1000;
  }
  Serial.println(WiFi.localIP());
}

//Funções para abrir ou fechar cadeado de acordo com a permissão do sistema
void abrirCadeado()
{
  if (pos != 180)
  {
    pos = 180;
    servo.write(pos);
  }
}

void fecharCadeado()
{
  if (pos != 0)
  {
    pos = 0;
    servo.write(0);
  }
}

/**
  @Desc: Envia evento de movimento inesperado
  @Retorno: True -> OK | False -> Error ao enviar
**/
bool enviarEventoMovimentosCadeado()
{
  HTTPClient http;
  int COD_EVENTO = 401; // Código do evento
  String serverPath = "http://" + host + ":" + API_PORT + "/api/v1/evento/p/" + COD_EVENTO;

  http.begin(serverPath.c_str());
  http.addHeader("Authorization", "Basic " + authString);
  int httpResponseCode = http.POST(String(""));
  http.end();

#if DEBUG
  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
#endif
}

/**
  @Desc: Verifica se o cadeado está desbloqueado no servidor
  @Retorno: True -> Desbloqueado | False -> Bloquerado
**/
bool isCadeadoDesbloqueado()
{
  bool status = false;
  HTTPClient http;

  String serverPath = "http://" + host + ":" + API_PORT + "/api/v1/cadeado/me/desbloqueado";

  http.begin(serverPath.c_str());
  http.addHeader("Content-Type", "Application/JSON");
  http.addHeader("Authorization", "Basic " + authString);
  int httpResponseCode = http.GET();
  http.end();

  if (httpResponseCode > 0)
  {
#if DEBUG
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
#endif
    status = httpResponseCode == 200;
  }
  else
  {
#if DEBUG
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
#endif
  }
  // Free resources
  http.end();
  return status;
}

/**
  @Desc: Captura uma imagem e envia para o servidor para verificar se um liberador válido
  existe na imagem.
  @Retorno: True -> Liberador válido | False -> Liberador inválido ou não existente
**/
// Ref1: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST
// Ref2: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type
bool verificarLiberador()
{
  String res;
  camera_fb_t *fb = NULL;
  fb = esp_camera_fb_get();
  if (!fb)
  {
#if DEBUG
    Serial.println("Erro ao obter imagem da camera");
#endif
    delay(1000);
    ESP.restart();
  }
#if DEBUG
  Serial.println("Conectando ao servidor: " + host);
#endif
  if (client.connect(host.c_str(), API_PORT))
  {
#if DEBUG
    Serial.println("Conectado !");
#endif
    String head = "--CadeadoEsp\r\nContent-Disposition: form-data; name=\"imageFile\"; filename=\"esp32-cam.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n";
    String tail = "\r\n--CadeadoEsp--\r\n";

    uint32_t imageLen = fb->len;
    uint32_t extraLen = head.length() + tail.length();
    uint32_t totalLen = imageLen + extraLen;

    client.println("POST /api/v1/cadeado/me/liberar HTTP/1.1");
    client.println("Host: " + host);
    client.println("Content-Length: " + String(totalLen));
    client.println("Content-Type: multipart/form-data; boundary=CadeadoEsp");
    client.println("Authorization: Basic " + authString);
    client.println();
    client.print(head);

    uint8_t *fbBuf = fb->buf;
    size_t fbLen = fb->len;
    for (size_t n = 0; n < fbLen; n = n + 1024)
    {
      if (n + 1024 < fbLen)
      {
        client.write(fbBuf, 1024);
        fbBuf += 1024;
      }
      else if (fbLen % 1024 > 0)
      {
        size_t remainder = fbLen % 1024;
        client.write(fbBuf, remainder);
      }
    }
    client.print(tail);

    esp_camera_fb_return(fb);

    int timoutTimer = 10000;
    long startTimer = millis();
    boolean state = false;

    while (!state && (startTimer + timoutTimer) > millis())
    {
#if DEBUG
      Serial.print(".");
#endif
      delay(100);
      while (!state && client.available())
      {
        char c = client.read();
        //        Serial.print(c);
        if (c == '\n')
        {
          if (isDigit(res.charAt(9)) && isDigit(res.charAt(10)) && isDigit(res.charAt(11)))
          {
            res = res.substring(9, 12);
            state = true;
            break;
          }
          res = "";
        }
        else if (c != '\r')
        {
          res += String(c);
        }
      }
    }
#if DEBUG
    Serial.println(res);
#endif
    client.stop();
    return res.charAt(0) == '2' && res.charAt(1) == '0';
  }
  else
  {
#if DEBUG
    Serial.println("Connection to " + host + " failed.");
#endif
    return false;
  }
  return false;
}

/**
  @Desc: Captura uma imagem e envia para o servidor para buscar um código de configuração válido
**/
void verificarCodConfig()
{
  String res = "", aux = "";
  camera_fb_t *fb = NULL;
  fb = esp_camera_fb_get();
  if (!fb)
  {
#if DEBUG
    Serial.println("Erro ao obter imagem da camera");
#endif
    delay(1000);
    ESP.restart();
  }
#if DEBUG
  Serial.println("Conectando ao servidor: " + host);
#endif
  if (client.connect(host.c_str(), API_PORT))
  {
#if DEBUG
    Serial.println("Conectado !");
#endif
    String head = "--CadeadoEsp\r\nContent-Disposition: form-data; name=\"imageFile\"; filename=\"esp32-cam.jpg\"\r\nContent-Type: image/jpeg\r\n\r\n";
    String tail = "\r\n--CadeadoEsp--\r\n";

    uint32_t imageLen = fb->len;
    uint32_t extraLen = head.length() + tail.length();
    uint32_t totalLen = imageLen + extraLen;

    client.println("POST /api/v1/cadeado/decode_config_qr HTTP/1.1");
    client.println("Host: " + host);
    client.println("Content-Length: " + String(totalLen));
    client.println("Content-Type: multipart/form-data; boundary=CadeadoEsp");
    client.println("Authorization: Basic " + authString);
    client.println();
    client.print(head);

    uint8_t *fbBuf = fb->buf;
    size_t fbLen = fb->len;
    for (size_t n = 0; n < fbLen; n = n + 1024)
    {
      if (n + 1024 < fbLen)
      {
        client.write(fbBuf, 1024);
        fbBuf += 1024;
      }
      else if (fbLen % 1024 > 0)
      {
        size_t remainder = fbLen % 1024;
        client.write(fbBuf, remainder);
      }
    }
    client.print(tail);

    esp_camera_fb_return(fb);

    int timoutTimer = 10000;
    long startTimer = millis();
    boolean state = false;

    while (!state && (startTimer + timoutTimer) > millis())
    {
#if DEBUG
      Serial.print(".");
#endif
      delay(100);
      while (client.available())
      {
        char c = client.read();
        if (c == '\n')
        {
          if (aux.length() == 0)
          {
            state = true;
          }
          aux = "";
        }
        else if (c != '\r')
        {
          aux += String(c);
        }
        if (state == true)
        {
          res += String(c);
        }
        startTimer = millis();
      }
      if (res.length() > 0)
      {
        break;
      }
    }
#if DEBUG
    Serial.println(aux);
    Serial.println(res);
#endif
    client.stop();
    if (res.charAt(1) != '{')
    {
      atualizarParametros(res);
    }
  }
  else
  {
#if DEBUG
    Serial.println("Conexão a " + host + " falida.");
#endif
  }
}

// Atualizar
void atualizarParametros(String & res)
{
  int i = 1;
  authString = "";
  while (res.charAt(i) != '\n')
  {
    authString += res.charAt(i);
    i++;
  }
  i++;
  ssid = "";
  while (res.charAt(i) != '\n')
  {
    ssid += res.charAt(i);
    i++;
  }
  i++;
  pass = "";
  while (res.charAt(i) != '\n')
  {
    pass += res.charAt(i);
    i++;
  }
  salvarEEPROM();
}

// https://randomnerdtutorials.com/esp32-cam-take-photo-display-web-server/
void iniciaCamera()
{
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = Y2_GPIO_NUM;
  config.pin_d1 = Y3_GPIO_NUM;
  config.pin_d2 = Y4_GPIO_NUM;
  config.pin_d3 = Y5_GPIO_NUM;
  config.pin_d4 = Y6_GPIO_NUM;
  config.pin_d5 = Y7_GPIO_NUM;
  config.pin_d6 = Y8_GPIO_NUM;
  config.pin_d7 = Y9_GPIO_NUM;
  config.pin_xclk = XCLK_GPIO_NUM;
  config.pin_pclk = PCLK_GPIO_NUM;
  config.pin_vsync = VSYNC_GPIO_NUM;
  config.pin_href = HREF_GPIO_NUM;
  config.pin_sscb_sda = SIOD_GPIO_NUM;
  config.pin_sscb_scl = SIOC_GPIO_NUM;
  config.pin_pwdn = PWDN_GPIO_NUM;
  config.pin_reset = RESET_GPIO_NUM;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  // Define qualidade da imagen
  config.frame_size = FRAMESIZE_SVGA;
  config.jpeg_quality = 10; //0-63 lower number means higher quality
  config.fb_count = 2;

  // camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK)
  {
#if DEBUG
    Serial.printf("Erro ao iniciar a camera: 0x%x", err);
#endif
    delay(1000);
    ESP.restart();
  }
}

void carregarEEPROM()
{
  int i = 0;

  char by = EEPROM.read(i++);
  bool eepromValid = by == 'T';

  if (eepromValid)
  {
    host = "";
    authString = "";
    ssid = "";
    pass = "";
    i = captaString(&host, i);
    i = captaString(&authString, i);
    i = captaString(&ssid, i);
    i = captaString(&pass, i);
  }

#if DEBUG
  if (eepromValid)
  {
    Serial.println("#### Carregado desde EEPROM ####");
  }
  else
  {
    Serial.println("#### EEPROM  inválido ####");
  }
  Serial.println("Host: " + host);
  Serial.println("Server token: " + authString);
  Serial.println("WiFi: " + ssid + " " + pass);
  Serial.println(ssid.c_str());
  Serial.println("################################");
#endif
}

int captaString(String * nome, int i)
{

  int j = EEPROM.read(i);
  char c = j;
  while (c != '\n')
  {
    (*nome).concat(c);
    i++;
    j = EEPROM.read(i);
    c = j;
  }
  //chuncho para resolver um problema que fazia aparecer um caracter desconhecido do nada
  int a = (*nome).length();
  (*nome).remove(a - 1);

  return (i + 1);
}

void salvarEEPROM()
{

#if DEBUG
  Serial.println("#### Salvando em EEPROM ####");
  Serial.println("Host: " + host);
  Serial.println("Server token: " + authString);
  Serial.println("WiFi: " + ssid + " " + pass);
  Serial.println("################################");
#endif

  // host authString ssid pass
  int i = 0;
  EEPROM.write(i++, 'T');
  i = salvaInfo(i, &host);
  i = salvaInfo(i, &authString);
  i = salvaInfo(i, &ssid);
  i = salvaInfo(i, &pass);

  EEPROM.commit();
}

int salvaInfo(int posicao, String * nome)
{

  int i = 0, tam;
  tam = (*nome).length();
  for (i; i < tam; i++)
  {
    EEPROM.write(posicao, (*nome)[i]);
    posicao++;
  }

  posicao = posicao + 1;
  EEPROM.write(posicao, '\n');
  posicao = posicao + 1;

  return posicao;
}

int statusMovimento = 0;

void executarMPU()
{
#if DEBUG
  Serial.println("Verificando dados MPU");
#endif
  // Obtem novos valores do sensor
  atualizarValoresMPU();
  bool movendo = cadeadoMovendo() || cadeadoGirando();
  if (movendo && statusMovimento == 0)
  {
    //Notifica o sistema que o cadeado começou a se mover
    statusMovimento = 1;
    enviarEventoCadeadoMovendo();
    enviarEventoCadeadoViolado();
  }
  if (!movendo && statusMovimento == 1)
  {
    //Notifica o sistema que o cadeado parou de se mover
    statusMovimento = 0;
    enviarEventoCadeadoParado();
  }
  //  if (cadeadoMovendo() && statusMovimento == 1) {
  //    //Notifica o sistema a cada um certo tempo que o cadeado ainda não parou de se mover
  //    contagemNotificacaoMPU++;
  //    if (contagemNotificacaoMPU >= 10) {
  //      enviarEventoCadeadoContinuaMovimento();
  //      contagemNotificacaoMPU = 0;
  //    }
  //  }
}

bool enviarEventoCadeadoMovendo()
{
  //Mensagem na API: "O cadeado começou a se mover!"
  HTTPClient http;
  int COD_EVENTO = 401; // Código do evento registrado
  String serverPath = "http://" + host + ":" + API_PORT + "/api/v1/evento/p/" + COD_EVENTO;

  http.begin(serverPath.c_str());
  http.addHeader("Authorization", "Basic " + authString);
  int httpResponseCode = http.POST(String(""));
  http.end();

#if DEBUG
  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
#endif
}

bool enviarEventoCadeadoParado()
{
  //Mensagem na API: "O cadeado parou de se mover!"
  HTTPClient http;
  int COD_EVENTO = 402; // Código do evento registrado
  String serverPath = "http://" + host + ":" + API_PORT + "/api/v1/evento/p/" + COD_EVENTO;

  http.begin(serverPath.c_str());
  http.addHeader("Authorization", "Basic " + authString);
  int httpResponseCode = http.POST(String(""));
  http.end();

#if DEBUG
  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
#endif
}

bool enviarEventoCadeadoContinuaMovimento()
{
  //Mensagem na API: "O cadeado continua a se mover!"
  HTTPClient http;
  int COD_EVENTO = 403; // Código do evento registrado
  String serverPath = "http://" + host + ":" + API_PORT + "/api/v1/evento/p/" + COD_EVENTO;

  http.begin(serverPath.c_str());
  http.addHeader("Authorization", "Basic " + authString);
  int httpResponseCode = http.POST(String(""));
  http.end();

#if DEBUG
  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
#endif
}

bool enviarEventoCadeadoViolado()
{
  //Mensagem na API: "Alguém sem autorização está mechendo no cadeado!"
  HTTPClient http;
  int COD_EVENTO = 404; // Código do evento registrado
  String serverPath = "http://" + host + ":" + API_PORT + "/api/v1/evento/p/" + COD_EVENTO;

  http.begin(serverPath.c_str());
  http.addHeader("Authorization", "Basic " + authString);
  int httpResponseCode = http.POST(String(""));
  http.end();

#if DEBUG
  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
#endif
}

bool enviarEventoCadeadoBateriaBaixa() {
  HTTPClient http;
  int COD_EVENTO = 410; // Código do evento registrado
  String serverPath = "http://" + host + ":" + API_PORT + "/api/v1/evento/p/" + COD_EVENTO;

  http.begin(serverPath.c_str());
  http.addHeader("Authorization", "Basic " + authString);
  int httpResponseCode = http.POST(String(""));
  http.end();

#if DEBUG
  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
#endif
}

void bloquearCadeado()
{
  //Mensagem na API: "O cadeado começou a se mover!"
  HTTPClient http;
  String serverPath = "http://" + host + ":" + API_PORT + "/api/v1/cadeado/me/bloquear";

  http.begin(serverPath.c_str());
  http.addHeader("Authorization", "Basic " + authString);
  int httpResponseCode = http.PUT(String(""));
  http.end();

#if DEBUG
  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
#endif
}
void atualizarValoresMPU()
{
  // Obtem valores do sensor
  mpu.getEvent(&a, &g, &temp);

  // Valores < 0, primeira leitura
  if (ax < 0)
  {
    ax = abs(a.acceleration.x);
    ay = abs(a.acceleration.y);
    az = abs(a.acceleration.z);
    gx = abs(g.gyro.x);
    gy = abs(g.gyro.y);
    gz = abs(g.gyro.z);
  }
  else
  { // Valores >= 0, leituras consecutivas
    // Tomamos a media com o valor de aceleracao atual como referência
    ax = (ax + abs(a.acceleration.x)) / 2;
    ay = (ay + abs(a.acceleration.y)) / 2;
    az = (az + abs(a.acceleration.z)) / 2;
    gx = (gx + abs(g.gyro.x)) / 2;
    gy = (gy + abs(g.gyro.y)) / 2;
    gz = (gz + abs(g.gyro.z)) / 2;
  }
}

bool cadeadoMovendo()
{

  // A variável error é utilizada para evitar a deteção de flutuações
  // Talvez seja necessário mudar o valor dela dependendo dos testes
  float error = 0.05;
#if 0 && DEBUG
  Serial.println(" A  " + String(a.acceleration.x) + " " + String(a.acceleration.y) + " " + String(a.acceleration.z));
  Serial.println("<A> " + String(ax) + " " + String(ay) + " " + String(az));
  Serial.println("%A  " + String(pow(ax - abs(a.acceleration.x), 2) / ax) + " " + String(pow(ay - abs(a.acceleration.y), 2) / ay) + " " + String(pow(az - abs(a.acceleration.z), 2) / az));
#endif

  if (ax != 0 && pow(ax - abs(a.acceleration.x), 2) / ax > error)
  {
    return true;
  }
  else if (ay != 0 && pow(ay - abs(a.acceleration.y), 2) / ay > error)
  {
    return true;
  }
  else if (az != 0 && pow(az - abs(a.acceleration.z), 2) / az > error)
  {
    return true;
  }

  return false;
}

bool cadeadoGirando()
{

#if 0 && DEBUG
  Serial.println(" G  " + String(g.gyro.x) + " " + String(g.gyro.y) + " " + String(g.gyro.z));
  Serial.println("<G> " + String(gx) + " " + String(gy) + " " + String(gz));
  Serial.println("%G  " + String(pow(gx - abs(g.gyro.x), 2) / gx) + " " + String(pow(gy - abs(g.gyro.y), 2) / gy) + " " + String(pow(gz - abs(g.gyro.z), 2) / gz));
#endif

  // A variável error é utilizada para evitar a deteção de flutuações
  // Talvez seja necessário mudar o valor dela dependendo dos testes
  float error = 0.05;

  if (gx != 0 && pow(gx - abs(g.gyro.x), 2) / gx > error)
  {
    return true;
  }
  else if (gy != 0 && pow(gy - abs(g.gyro.y), 2) / gy > error)
  {
    return true;
  }
  else if (gz != 0 && pow(gz - abs(g.gyro.z), 2) / gz > error)
  {
    return true;
  }

  return false;
}

// https://docs.espressif.com/projects/esp-idf/en/latest/esp32/api-reference/peripherals/gpio.html
// https://github.com/espressif/esp-who/issues/90
void initBtnControl() {
  //  pinMode(BTN_PIN, INPUT);

  pinMode(BTN_PIN, OUTPUT);
}
void checkBatteryStatus(bool second = false) {
  if (!CHECK_BATTERY) return;

  float voltage = getBatteryVoltage(second ? BAT_CHECK_N_SAMPLES * 2 : BAT_CHECK_N_SAMPLES);
#if DEBUG
  Serial.printf("Battery Voltage: %0.3f\n", voltage);
#endif
  if (voltage < MIN_VOLTAGE) {
    if (second) {
      enviarEventoCadeadoBateriaBaixa();
      dormirESP();
    } else {
      delay(100);
      checkBatteryStatus(true);
    }
  }


}
int oldVoltage = 0;
float getBatteryVoltage(int nSamples) {
  int voltage = 0;
  for (int i = 0; i < nSamples; i++) {
    voltage += analogRead(BAT_CHECK_PIN);
    delay(5);
  }
  voltage = voltage / nSamples;
  if (oldVoltage > 0) {
    oldVoltage = voltage;
  } else {
    oldVoltage = oldVoltage * 0.2 + voltage * 0.8;
  }
  return BAT_CHECK_CAL * oldVoltage;
}


void dormirESP() {
#if DEBUG
  Serial.println("Entrando em modo deep sleep");
#endif
  esp_deep_sleep_start();
}

void checkForConfigUpdate() {
  delay(1000);
  if (digitalRead(BTN_PIN) == HIGH)
  {

    while (1)
    {
#if DEBUG
      Serial.println("Verificando cod config");
#endif
      verificarCodConfig();
      delay(250);
    }
  }
}
