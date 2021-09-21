#include <WiFi.h>
#include "Adafruit_MPU6050.h"
#include <Wire.h>
//#include <Servo.h>
#include <HTTPClient.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"
#include "esp_camera.h"
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

// Pinos I2C
#define I2C_SDA 15
#define I2C_SCL 14

// Servidor
#define API_PORT 5000

// Controle servo
//Servo servo;
const int pinServo = 4;

// Controle Gyroscopio
const int MPU_ADDRESS = 0x68; // MPU6050 I2C address
TwoWire I2CMPU = TwoWire(0);
Adafruit_MPU6050 mpu;

// Parametros servidor
String host = "10.255.0.219";
String authString = "Basic NDZlODNlYzQ0MTQxMDdiYjozNDQ0NjczYjllZWVmMDA1";
WiFiClient client;

// Parametros WiFi
char *ssid = "--";
char *pass = "--";
void setup()
{

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
  //PS: talvez seja necesxário colocar essa função antes de serial.begin().
  //  servo.attach(pinServo);

  //Ajusta todas as configurações iniciais para o Wifi
  setupWifi();
  iniciaCamera();
}

void loop()
{
  /* Pega a imagem da camera e envia para o servidor
      para verificar se existe um liberador na imagem
  */
  bool liberadorStatus = verificarLiberador();
#if DEBUG
  if (liberadorStatus) {
    Serial.println("Cadeado Desbloqueado");
  } else {
    Serial.println("Liberador inválido");
  }
#endif
  sleep(10);
  //  envioAPI();

  // COMENTADO PARA TESTES
  //  if(permissaoCadeado()==true)
  //    abrirCadeado();
  //  else if(permissaoCadeado()==false)
  //    fecharCadeado();
}

void setupWifi()
{

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);
  Serial.print("Connecting to WiFi ..");
  int cwi = 0;
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
}

//Funções para abrir ou fechar cadeado de acordo com a permissão do sistema
void abrirCadeado()
{
  //    servo.write(180);
}

void fecharCadeado()
{
  //    servo.write(0);
}

bool permissaoCadeado()
{

  bool permissao = false;
  //fazer a interação de permissão com a API
  //...

  return permissao;
}

//Funções para CAM
String lerQRcode()
{

  String string;
  //fazer a leitura pela câmera.
  //...
  return string;
}

int verificaMPU()
{

  int vetorCoordenadas[3] = {0, 0, 0};
  //...
  //  return vetorCoordenadas;
  return 0;
}
/**
* @Desc: Captura uma imagem e envia para o servidor para verificar se um liberador válido 
* existe na imagem.
* @Retorno: True -> Liberador válido | False -> Liberador inválido ou não existente
**/
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
  Serial.println("Connecting to server: " + host);
#endif
  if (client.connect(host.c_str(), API_PORT))
  {
#if DEBUG
    Serial.println("Connection successful!");
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
    client.println("Authorization: " + authString);
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
          if (isDigit(res.charAt(9)) && isDigit(res.charAt(10)) && isDigit(res.charAt(11))) {
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
    //    Serial.println(getBody);
    return res.charAt(0) == '2' && res.charAt(1) == '0';
  } else {
#if DEBUG
    Serial.println("Connection to " + host + " failed.");
#endif
    return false;
  }
  return false;
}


void iniciaCamera() {
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
  config.frame_size = FRAMESIZE_XGA;
  config.jpeg_quality = 10;  //0-63 lower number means higher quality
  config.fb_count = 2;


  // camera init
  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Camera init failed with error 0x%x", err);
    delay(1000);
    ESP.restart();
  }
}
void envioAPI()
{

  lerQRcode();
  verificaMPU();
  //enviar dados ca camera para a API
  //...
}
