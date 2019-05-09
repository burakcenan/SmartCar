//Bluetooth modülünden gelen sinyal değişkeni
int veri;
//sinyal led pinleri
#define ledSol 12
#define ledSag 11

//mesafe sensörü pinleri
#define mesafeEcho 3
#define mesafeTrig 2

//buzzer pini
#define buzzerPin 7
bool sinyalSag=false;
bool sinyalSol=false;

//far led pini
#define farLed 13

//ldr okuma pini
#define ldrPin A1

//Hız değişkeni 0-255
int vSpeed=125;

//L298N Motor sürücü pinleri
#define motorA1 5  // L298N'in IN3 Girişi
#define motorA2 6  // L298N'in IN1 Girişi
#define motorB1 10 // L298N'in IN2 Girişi
#define motorB2 9  // L298N'in IN4 Girişi

//Isı sensörü okuma pini
#define isiSensor 4


//yağmur sensörü eşik değeri ve pini
#define yagmurEsikDegeri 100
#define yagmurSensor A2

void buzzerCalistir(){
  tone(buzzerPin,560);
  delay(200);
  noTone(buzzerPin);
}

//aralıklı led yakan fonksiyon
void Sinyal(int led){
    digitalWrite(led,HIGH);
    delay(300);
    digitalWrite(led,LOW);
    delay(300);
}


bool mesafeYeterliMi(){
  double duration;
  float distance;
  
  //mesafeyi hesaplıyor
  digitalWrite(mesafeTrig,LOW);
  delayMicroseconds(2);
  digitalWrite(mesafeTrig,HIGH);
  delayMicroseconds(10);

  duration = pulseIn(mesafeEcho,HIGH);
  
  distance = duration/58.2;
  if(distance<10)
    return false;
  else 
    return true; 
}

void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
pinMode(ledSag,OUTPUT);
pinMode(ledSol,OUTPUT);
pinMode(mesafeEcho,INPUT);
pinMode(mesafeTrig,OUTPUT);
pinMode(buzzerPin,OUTPUT);
pinMode(motorA1, OUTPUT);
pinMode(motorA2, OUTPUT);
pinMode(motorB1, OUTPUT);
pinMode(motorB2, OUTPUT);    
pinMode(farLed,OUTPUT);
pinMode(farLed,OUTPUT);
pinMode(isiSensor,INPUT);
}

void loop() {
  
  //Isı sensörünü kontrol eder
  if(digitalRead(isiSensor)){
      buzzerCalistir();
  }
  //Yağmur sensörünü kontrol eder.
  if(digitalRead(yagmurSensor)>yagmurEsikDegeri){
      buzzerCalistir();
  }
  
  //ışığı kontrol edip farı yakar
  if(analogRead(ldrPin)<270){
      digitalWrite(farLed,HIGH);
    }
    else{
      digitalWrite(farLed,LOW);
    }

    //Sol sinyali yakar.
  if(sinyalSol==true){
    Sinyal(ledSol);
    }
    
    //sağ sinyali yakar.
  else if(sinyalSag==true){
    Sinyal(ledSag);
    }
    
    //mesafeyi kontrol eder
  if(!mesafeYeterliMi()){
    buzzerCalistir();
  }
  
  //hc06dan veriyi okur, sinyale göre motoru hareket ettirir.
  if(Serial.available()){
      veri=Serial.read();
    }
  if(veri=='1'){
      //
      analogWrite(motorA1, 75);
      analogWrite(motorA2, 0); 
      analogWrite(motorB1, vSpeed);
      analogWrite(motorB2, 0); 
      veri=Serial.available();
  }
  else if(veri=='2'){
      analogWrite(motorA1, vSpeed);
      analogWrite(motorA2, 0); 
      analogWrite(motorB1, vSpeed);
      analogWrite(motorB2, 0);
      veri=Serial.available();
  }
  else if(veri=='3'){
      analogWrite(motorA1,vSpeed );
      analogWrite(motorA2, 0);  
      analogWrite(motorB1, 75);
      analogWrite(motorB2, 0); 
      veri=Serial.available();
  }
  else if(veri=='4'){
      analogWrite(motorA1, 0);
      analogWrite(motorA2, 0);
      analogWrite(motorB1, vSpeed);
      analogWrite(motorB2, 150); 
      veri=Serial.available();
  }
  else if(veri=='6'){
      analogWrite(motorA1, vSpeed);
      analogWrite(motorA2, 150); 
      analogWrite(motorB1, 0);
      analogWrite(motorB2, 0); 
      veri=Serial.available(); 
   }
   else if(veri=='7'){
      analogWrite(motorA1, 0);
      analogWrite(motorA2, vSpeed); 
      analogWrite(motorB1, 0);
      analogWrite(motorB2, 75); 
   }
   else if(veri=='8'){
      analogWrite(motorA1, 0);
      analogWrite(motorA2, vSpeed); 
      analogWrite(motorB1, 0);
      analogWrite(motorB2, vSpeed); 
      veri=Serial.available();
   }
   else if(veri=='9'){
      analogWrite(motorA1, 0);
      analogWrite(motorA2, 75); 
      analogWrite(motorB1, 0);
      analogWrite(motorB2, vSpeed);
      veri=Serial.available();
   }
   else if (veri == '5'){
       analogWrite(motorA1, 0);
       analogWrite(motorA2, 0); 
       analogWrite(motorB1, 0);
       analogWrite(motorB2, 0);
       veri=Serial.available();
    } 
    if(veri=='L'){
      sinyalSol=false;
      if(sinyalSag==true){
        sinyalSag=false;
      }
      else{
        sinyalSag=true;
      }
      veri=Serial.available();
    }
    else if(veri=='R'){
      sinyalSag=false;
      if(sinyalSol==true){
        sinyalSol=false;
      }
      else{
        sinyalSol=true;
      }
      veri=Serial.available();
    }
}
