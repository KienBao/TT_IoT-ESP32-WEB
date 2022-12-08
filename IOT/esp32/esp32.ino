#include <WiFi.h>
#include <FirebaseESP32.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <SimpleDHT.h>
#include <MQ135.h>

//const char *ssid = "SCT";
//const char *password = "28011973";
const char *ssid = "FPT TELECOM";
const char *password = "19006600";

#define FIREBASE_HOST "esp32-iot-e0b8a-default-rtdb.europe-west1.firebasedatabase.app"
#define FIREBASE_AUTH "STZYs7syOUtdvXmtTNlrZBW2BFI3RfG21CrlLqpK"
FirebaseData fbdb;

LiquidCrystal_I2C lcd(0X27,16,2);

#define LED 15

#define BUZZER 18

#define pinDHT11 4
SimpleDHT11 dht11(pinDHT11);
byte temp=0, hum=0;

#define rainDigital 34

#define PIN_MQ135 32
MQ135 mq135_sensor(PIN_MQ135);
float temperature = 21.0; 
float humidity = 25.0;

void setup(){
  //connect to wifi................................
  Serial.begin(115200);
  Serial.print(" ");
  Serial.print("Connecting to WIFI...");
  WiFi.begin(ssid, password);

  while(WiFi.status() != WL_CONNECTED){
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  //firebase...............................
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
  Firebase.reconnectWiFi(true);

  Firebase.setReadTimeout(fbdb, 1000*60);
  Firebase.setwriteSizeLimit(fbdb, "tiny");
  
  //led.....................................
  pinMode(LED, OUTPUT);

  //BUZZER.....................................
  pinMode(BUZZER, OUTPUT);

  //LCD.....................................
  lcd.init();                    

  //CAM BIEN MUA............................
  pinMode(rainDigital,INPUT);
  
}

void loop() {
  //Led...........................................
  if(Firebase.getInt(fbdb, "breed/Den_1")==true){
    String st = fbdb.to<String>();  
    if(st=="on"){
      digitalWrite(LED, HIGH);
//      Serial.println("led 1 on");
    }
    else{
      digitalWrite(LED, LOW);
//      Serial.println("led 1 off");
    } 
  }

  //BUZZER...........................................
  if(Firebase.getInt(fbdb, "breed/Den_2")==true){
    String st = fbdb.to<String>();  
    if(st=="on"){
      digitalWrite(BUZZER, HIGH);
    }
    else{
      digitalWrite(BUZZER, LOW);
    } 
  }
  
  //LCD................................
  if(Firebase.getInt(fbdb, "breed/Den_4")==true){
    String t = fbdb.to<String>();  
    if(t=="on"){
      lcd.backlight();
      lcd.setCursor(1, 0);
      lcd.print("Duong Kien Bao");
      lcd.setCursor(1, 1);
      lcd.print("Pham Thanh Dat");
//      Serial.println("lcd 4 on");
    }
    else{
      lcd.noBacklight();
      lcd.clear();
//      Serial.println("lcd 4 off");
    }
  }
  
  //CAM BIEN NHIET DO DO AM..................
  if(dht11.read(&temp, &hum, NULL)!= SimpleDHTErrSuccess)
    Serial.println("read failed");
  else{
//    Serial.println("DHT11 ");
//    Serial.println(temp);
//    Serial.println(hum);
    Firebase.setInt(fbdb, "breed/Nhietdo1", temp);
    Firebase.setInt(fbdb, "breed/doam1", hum);
    delay(1000);
  }
  
  //CAM BIEN MUA..............................
  int rainDigitalVal = digitalRead(rainDigital);
  Firebase.setString(fbdb, "breed/Rain", rainDigitalVal);
  delay(100);

  //CAM BIEN KHONG KHI........................
  float rzero = mq135_sensor.getRZero();
  float correctedRZero = mq135_sensor.getCorrectedRZero(temperature, humidity);
  float resistance = mq135_sensor.getResistance();
  float ppm = mq135_sensor.getPPM();
  float correctedPPM = mq135_sensor.getCorrectedPPM(temperature, humidity);
//  Serial.print("MQ135 RZero: ");
//  Serial.print(rzero);
//  Serial.print("\t Corrected RZero: ");
//  Serial.print(correctedRZero);
//  Serial.print("\t Resistance: ");
//  Serial.print(resistance);
//  Serial.print("\t PPM: ");
//  Serial.print(ppm);
//  Serial.print("\t Corrected PPM: ");
//  Serial.print(correctedPPM);
//  Serial.println("ppm");
  Firebase.setFloat(fbdb, "breed/Oxi", correctedPPM);
}
