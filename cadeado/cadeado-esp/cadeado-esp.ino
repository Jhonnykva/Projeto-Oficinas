#include <WiFi.h>
#include <Adafruit_MPU6050.h>
#include <Wire.h>
//#include <Servo.h>
#include <HTTPClient.h>
// Definições de pinos internos
#define DEBUG 0
#define PWDN_GPIO_NUM  32
#define RESET_GPIO_NUM -1
#define XCLK_GPIO_NUM  0
#define SIOD_GPIO_NUM  26
#define SIOC_GPIO_NUM  27
#define Y9_GPIO_NUM    35
#define Y8_GPIO_NUM    34
#define Y7_GPIO_NUM    39
#define Y6_GPIO_NUM    36
#define Y5_GPIO_NUM    21
#define Y4_GPIO_NUM    19
#define Y3_GPIO_NUM    18
#define Y2_GPIO_NUM    5
#define VSYNC_GPIO_NUM 25
#define HREF_GPIO_NUM  23
#define PCLK_GPIO_NUM  22

// Pinos I2C
#define I2C_SDA 15
#define I2C_SCL 14

// Controle servo
//Servo servo;
const int pinServo = 4;

// Controle Gyroscopio
const int MPU_ADDRESS = 0x68; // MPU6050 I2C address
TwoWire I2CMPU = TwoWire(0);
Adafruit_MPU6050 mpu;

// Parametros servidor
String host = "http://ip_servidor/api/v1";
WiFiClient client;
// Parametros WiFi
char* ssid = "nome_wifi";
char* pass = "senha";
void setup(){
  
  //Inicialização do Serial
  Serial.begin(115200);
  delay(100);
  Serial.println("Serial iniciado!");
  
  // Inicializa I2C
  I2CMPU.begin(I2C_SDA,I2C_SCL,100000);
  
  //Inicialização do Giroscópio
  if(!mpu.begin(MPU_ADDRESS, &I2CMPU)){
    Serial.println("Falha ao iniciar Giroscopio!");
  }
  else
    Serial.println("Giroscopio iniciado!");
  

  //Configuração do Servo-Motor
  //PS: talvez seja necesxário colocar essa função antes de serial.begin(). 
//  servo.attach(pinServo);

  //Ajusta todas as configurações iniciais para o Wifi
  setupWifi();  
  
}


void loop(){
// OBS: a string do liberador é obtida pelo leitor de códigos QR
isLiberadorValido("613a8cca80021109d39e6706");
sleep(1000);
//  envioAPI();
  
// COMENTADO PARA TESTES
//  if(permissaoCadeado()==true)
//    abrirCadeado();
//  else if(permissaoCadeado()==false)
//    fecharCadeado();


  
}

void setupWifi(){

  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, pass);
  Serial.print("Connecting to WiFi ..");
  int cwi = 0;
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);

  }
  Serial.println(WiFi.localIP());
}


//Funções para abrir ou fechar cadeado de acordo com a permissão do sistema
void abrirCadeado(){
//    servo.write(180);
}

void fecharCadeado(){  
//    servo.write(0);
}

bool permissaoCadeado(){

  bool permissao = false;
  //fazer a interação de permissão com a API
  //...

  return permissao;
}

//Funções para CAM
String lerQRcode(){

  String string;
  //fazer a leitura pela câmera.
  //...
  return string;
}

int verificaMPU(){

  int vetorCoordenadas[3] = {0,0,0};
  //...
//  return vetorCoordenadas;
return 0;
}

bool isLiberadorValido(const String& liberador){
  
  HTTPClient http;
  String url = host + "/liberador/" + liberador + "/valido";
#if DEBUG
  Serial.println(url);
#endif
  char* buffer = (char*) malloc(sizeof(char)*url.length()+1);
  url.toCharArray(buffer, url.length()+1);
  http.begin(client,buffer);
  free(buffer);
  int resCode = http.GET();
  http.end();
  return resCode == 200 || resCode == 304;
}
void envioAPI(){

  lerQRcode();
  verificaMPU();
  //enviar dados ca camera para a API
  //...
  
}
