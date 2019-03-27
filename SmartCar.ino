int veri;
int ledSol=13;
int ledSag=12;
int motorPin=11;
#define mesafeEcho 6
#define mesafeTrig 7
int errorLed=10;
int buzzerPin=9;

int motorDurum=LOW;
bool sinyalSag=false;
bool sinyalSol=false;

int dumanSensor=A0;
//Ön ısıtma süresi
#define preheat_time 5000
//Eşik değeri
#define threshold 300

int farLed1=4;
int farLed2=5;

int ldrPin=A1;

void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
pinMode(ledSag,OUTPUT);
pinMode(ledSol,OUTPUT);
pinMode(motorPin,OUTPUT);
pinMode(mesafeEcho,INPUT);
pinMode(mesafeTrig,OUTPUT);
pinMode(errorLed,OUTPUT);
pinMode(buzzerPin,OUTPUT);
pinMode(farLed1,OUTPUT);
pinMode(farLed2,OUTPUT);
delay(preheat_time);
}

void loop() {
  int dumanSensorDeger = analogRead(dumanSensor);
  Serial.println(dumanSensorDeger);
  if (dumanSensorDeger >= threshold){
    digitalWrite(errorLed,HIGH);
    buzzerCalistir();
    }
    else{
      digitalWrite(errorLed,LOW);
    }
    int isik= analogRead(ldrPin);
    //Serial.println(isik);
    if(isik<170){
      digitalWrite(farLed1,HIGH);
      digitalWrite(farLed2,HIGH);
    }
    else{
      digitalWrite(farLed1,LOW);
      digitalWrite(farLed2,LOW);
    }
  if(sinyalSol==true){
    Sinyal(ledSol);
    }
  else if(sinyalSag==true){
    Sinyal(ledSag);
    }
  if(!mesafeYeterliMi()){
    motorDurum=LOW;
    digitalWrite(motorPin,motorDurum);
    digitalWrite(errorLed,HIGH);
    buzzerCalistir();
  }
  else{
    digitalWrite(errorLed,LOW);
  }
  // put your main code here, to run repeatedly:
  if(Serial.available()){
      veri=Serial.read();
    }
  if(veri=='1'){
    sinyalSol=true;
    sinyalSag=false;
    veri=Serial.available();
    }
  else if(veri=='4'){
    sinyalSol=false;
    veri=Serial.available();
    }
   else if(veri=='2'){
    //TODO: Basılı tutulduğu sürece dönecek.
    digitalWrite(errorLed, LOW);
    if(motorDurum==LOW){
      motorDurum=HIGH;  
     }
     else{
      motorDurum=LOW;
     }
     digitalWrite(motorPin,motorDurum);
     veri=Serial.available();
}
  if(veri=='3'){
    sinyalSag=true;
    sinyalSol=false;
    veri=Serial.available();
    }
  else if(veri=='5'){
    sinyalSag=false;
    veri=Serial.available();
    }
}

void Sinyal(int led){
    digitalWrite(led,HIGH);
    delay(300);
    digitalWrite(led,LOW);
    delay(300);
}
bool mesafeYeterliMi(){
  double duration;
  float distance;
  
  digitalWrite(mesafeTrig,LOW);
  delayMicroseconds(2);
  digitalWrite(mesafeTrig,HIGH);
  delayMicroseconds(10);

  duration = pulseIn(mesafeEcho,HIGH);
  distance = duration/58.2;
  //Serial.println(distance);
  if(distance<20)
    return false;
  else
    return true;
    
}
void buzzerCalistir(){
  tone(buzzerPin,440);
  delay(1000);
  noTone(buzzerPin);
}
