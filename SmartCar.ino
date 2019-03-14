int veri;
int ledSol=13;
int ledSag=12;
int motorPin=11;
#define mesafeEcho 6
#define mesafeTrig 7
int errorLed=10;

int motorDurum=LOW;

void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
pinMode(ledSag,OUTPUT);
pinMode(ledSol,OUTPUT);
pinMode(motorPin,OUTPUT);
pinMode(mesafeEcho,INPUT);
pinMode(mesafeTrig,OUTPUT);
pinMode(errorLed,OUTPUT);
}

void loop() {
  if(!mesafeYeterliMi()){
    digitalWrite(errorLed,HIGH);
    motorDurum=LOW;
    digitalWrite(motorPin,motorDurum);
  }
  else{
    digitalWrite(errorLed,LOW);
  }
  // put your main code here, to run repeatedly:
  if(Serial.available()){
      veri=Serial.read();
    }
  if(veri=='1'){
    Sinyal(ledSol);
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
  else if(veri=='3'){
    Sinyal(ledSag);
    veri=Serial.available();
      }
}

void Sinyal(int led){
  for(int i=0;i<5;i++){
    digitalWrite(led,HIGH);
    delay(300);
    digitalWrite(led,LOW);
    delay(300);
  }
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
  Serial.println(distance);
  if(distance<20)
    return false;
  else
    return true;
    
}
