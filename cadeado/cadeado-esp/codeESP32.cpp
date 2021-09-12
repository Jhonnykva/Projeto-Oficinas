// Definições de pinos internos
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



//Variáveis globais
Servo servo;
const int pinServo = 4;
Adafruit_MPU6050 mpu;


void setup(){
  
  //Inicialização do Serial
  Serial.begin(115200);
  delay(100);
  Serial.println("Serial iniciado!");

  //Inicialização do Giroscópio
  if(!mpu.begin()){
    Serial.println("Falha ao iniciar Giroscopio!");
  }
  else
    Serial.println("Giroscopio iniciado!");
  

  //Configuração do Servo-Motor
  //PS: talvez seja necesxário colocar essa função antes de serial.begin(). 
  servo.attach(pinServo);

  //Ajusta todas as configurações iniciais para o Wifi
  setupWifi();  
  
}


void loop(){

  envioAPI();
  

  if(permissaoCadeado()==true)
    abrirCadeado();
  else if(permissaoCadeado()==false)
    fecharCadeado();


  
}

void setupWifi(){

  // configurando o modo de operação do WiFi como estação
  //...

  // desconecta do access point caso ele já esteja conectado
  WiFi.disconnect();
}


//Funções para abrir ou fechar cadeado de acordo com a permissão do sistema
void abrirCadeado(){
    servo.write(180);
}

void fecharCadeado(){  
    servo.write(0);
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
  return vetorCoordenadas;
}

void envioAPI(){

  lerQRcode();
  verificaMPU();
  //enviar dados ca camera para a API
  //...
  
}

