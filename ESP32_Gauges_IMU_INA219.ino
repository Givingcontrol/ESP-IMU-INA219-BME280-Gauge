

/*********
  Rui Santos & Sara Santos - Random Nerd Tutorials
  Complete instructions at https://RandomNerdTutorials.com/esp32-web-server-gauges/
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files.
  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

******
20241206
 *** Merging IMU6050 into code***
    (Keeping BMP280 code and gauge for temperature to test working)
    Start with creating webpage for gauges for  x,y,x sum in index and Script files - Complete
    I2C device found at address 0x68 = MPU6050
    Add IMU code - test in serial monitor -data showing in serial monitor
    add eventlisteners to Script - test in console_log - data showing in console log
     Temperature from BMP280 still reading
    Link eventListeners Json Obj to gauges
      X and Z  and radial sum Accel values changing. Y and Radial Sum  needles over range. No values on Linear Sum
      Change gauge values in script
        All radial gauges work
          add .value to linear sum gauge (duh!)


20241205
  Add Access point code to initWifi
  add gauge.min.js to data folder
  index.html change 
       <!script src="http://cdn.rawgit.com/Mikhus/canvas-gauges/gh-pages/download/2.1.7/all/gauge.min.js"></script>
    to  <script src="gauge.min.js"></script>

  change sensor to BMP280 (what is on hand)
  change humditiy to pressure in .ino code
    Works in serial monitor
    update/ change humidity to pressure in
          index.html
          script.js
    stopped working
          script.js not updating
          force cache update Cntrl+F5
          Changes client->send("hello!", NULL, millis(), 10000); TO client->send("hello!", NULL, millis(), 1000);
          change pressure gauge values to start low end at higher prssure than 0 in script.js
          change timerDelay to 1000 (1second)
              gauges don't update
           change timerDelay to 10000 (10second)
              gauges update
           change timerDelay to 5000 (5second)
              Gauge updates
           change timerDelay to 2000 (2second)
            Gauge updates
           change timerDelay to 1000 (1second)
            no update
          change timerDelay to 1500 (1,5second)
          change animationDuration: to 500, from  //1500 in script.js
          change timerDelay to 1000 (1second)
             Gauge updates
          change timerDelay to 500 (0,5second)
            Gauge updates
            How fast can be pushed
          change animationDuration: to 50, from  //1500 in script.js
           change timerDelay to 50 (0,5second)

20241210
      Add INA219 Votmeter Current meter to code and webpage
      I2C device found at address 0x40 = INA219
      Only read voltage for now

*********/
#include <Arduino.h>
#include <WiFi.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>
#include "LittleFS.h"
#include <Arduino_JSON.h>
#include <Adafruit_BMP280.h>  //change to BMP
#include <Adafruit_Sensor.h>
//Added below
#include <Adafruit_MPU6050.h>
#include <Adafruit_INA219.h>


// Replace with your network credentials
const char* ssid = "ESP32_INA219_IMU_Gauges";
const char* password = "REPLACE_WITH_YOUR_PASSWORD";

// Create AsyncWebServer object on port 80
AsyncWebServer server(80);

// Create an Event Source on /events
AsyncEventSource events("/events");

// Json Variable to Hold Sensor Readings
JSONVar readings;

// Timer variables
unsigned long lastTime = 0;
unsigned long timerDelay = 50;
//Added below
// Timer variables initialize
unsigned long lastTimeGyro = 0;
unsigned long lastTimeTemperature = 0;
unsigned long lastTimeAcc = 0;
unsigned long gyroDelay = 500;
unsigned long temperatureDelay = 1000;
unsigned long accelerometerDelay = 100; // OG=200

// Create a sensor object
Adafruit_BMP280 bme; // Change to BMP BME280 connect to ESP32 I2C (GPIO 21 = SDA, GPIO 22 = SCL)
//Added below
Adafruit_MPU6050 mpu;
sensors_event_t a, g, temp;
sensors_event_t old_a, old_g, old_temp;
float gyroX, gyroY, gyroZ;
float accX, accY, accZ, Sumaccel;
float temperature;

Adafruit_INA219 ina219;

//Gyroscope sensor deviation
//float gyroXerror = 0.07;
//float gyroYerror = 0.03;
//float gyroZerror = 0.01;

float gyroXerror = 0.08;
float gyroYerror = 0.02;
float gyroZerror = 0.015;


// Init BME280
void initBME(){
  if (!bme.begin(0x76)) {
    Serial.println("Could not find a valid BMP280 sensor, check wiring!");
    while (1);
  }
}

// Init MPU6050
void initMPU(){
  if (!mpu.begin()) {
    Serial.println("Failed to find MPU6050 chip");
    while (1) {
      delay(10);
    }
  }
  Serial.println("MPU6050 Found!");
}

void initINA219()
  {
  // Try to initialize the INA219
  if (! ina219.begin())
   {
    Serial.println("Failed to find INA219 chip");
    while (1) { delay(10); }
    }
  }

// Get Sensor Readings and return JSON object
String getSensorReadings(){
  readings["temperature"] = String(bme.readTemperature());
  readings["pressure"] =  String(bme.readPressure());
  String jsonString = JSON.stringify(readings);
  Serial.print("temperature:");
  Serial.println(bme.readTemperature());
  Serial.print("pressure:");
  Serial.println(bme.readPressure());
  return jsonString;
}

String getGyroReadings(){
  mpu.getEvent(&a, &g, &temp);
  old_a=a;
  old_g=g;
  old_temp=temp;
  float gyroX_temp = g.gyro.x;
  if(abs(gyroX_temp) > gyroXerror)  {
    gyroX += gyroX_temp/50.00;
  }
  
  float gyroY_temp = g.gyro.y;
  if(abs(gyroY_temp) > gyroYerror) {
    gyroY += gyroY_temp/70.00;
  }

  float gyroZ_temp = g.gyro.z;
  if(abs(gyroZ_temp) > gyroZerror) {
    gyroZ += gyroZ_temp/90.00;
  }

  readings["gyroX"] = String(gyroX);
  readings["gyroY"] = String(gyroY);
  readings["gyroZ"] = String(gyroZ);
  Serial.println(bme.readTemperature());
  Serial.print("Gyro X:");
  Serial.println(gyroX_temp);

  String jsonString = JSON.stringify(readings);
  return jsonString;
}

String getAccReadings() {
  mpu.getEvent(&a, &g, &temp);
  // Get current acceleration values
  accX = a.acceleration.x;
  accY = a.acceleration.y;
  accZ = a.acceleration.z;
  Sumaccel = (sqrt((a.acceleration.x*a.acceleration.x)+(a.acceleration.y*a.acceleration.y)+(a.acceleration.z*a.acceleration.z)));
  
  readings["accX"] = String(accX);
  readings["accY"] = String(accY);
  readings["accZ"] = String(accZ);
  readings["Sumaccel"] = String(Sumaccel);

   Serial.print("accX:");
  Serial.println(accX);
   Serial.print("accY:");
  Serial.println(accY);
   Serial.print("accZ:");
  Serial.println(accZ);
  Serial.print("Sumaccel:");
  Serial.println(Sumaccel);

  String accString = JSON.stringify (readings);
  return accString;
}

String getTemperature(){
  mpu.getEvent(&a, &g, &temp);
  temperature = temp.temperature;
  Serial.print("IMU temp:");
  Serial.println(temperature);
  return String(temperature);
}

String getINA219(){
  // Read voltage and current from INA219.
  float shuntvoltage = ina219.getShuntVoltage_mV();
  float busvoltage = ina219.getBusVoltage_V();
  float current_mA = ina219.getCurrent_mA();
  readings["shuntvoltage"] = String(shuntvoltage);
  readings["busvoltage"] = String(busvoltage);
  readings["current_mA"] = String(current_mA);
  Serial.print("Voltage:");
  Serial.println(busvoltage);
  String INAString = JSON.stringify (readings);
  return INAString;
}

// Initialize LittleFS
void initLittleFS() {
  if (!LittleFS.begin()) {
    Serial.println("An error has occurred while mounting LittleFS");
  }
  Serial.println("LittleFS mounted successfully");
}

// Initialize WiFi
void initWiFi() {
  /*
  WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi ..");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print('.');
    delay(1000);
  }
  Serial.println(WiFi.localIP());
*/
  //Access point
   // You can remove the password parameter if you want the AP to be open.
  WiFi.softAP(ssid); //, password
  IPAddress myIP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(myIP);
}

void setup() {
  // Serial port for debugging purposes
  Serial.begin(115200);
  initBME();
  initWiFi();
  initLittleFS();
  initINA219();
  initMPU();

  // Web Server Root URL
  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    request->send(LittleFS, "/index.html", "text/html");
  });

  server.serveStatic("/", LittleFS, "/");

  // Request for the latest sensor readings
  server.on("/readings", HTTP_GET, [](AsyncWebServerRequest *request){
    String json = getSensorReadings();
    request->send(200, "application/json", json);
    json = String();
  });

  events.onConnect([](AsyncEventSourceClient *client){
    if(client->lastId()){
      Serial.printf("Client reconnected! Last message ID that it got is: %u\n", client->lastId());
    }
    // send event with message "hello!", id current millis
    // and set reconnect delay to 1 second
    client->send("hello!", NULL, millis(), 1000);
  });
  server.addHandler(&events);

  // Start server
  server.begin();
}

void loop() {
   sensors_event_t a, g, temp;
   mpu.getEvent(&a, &g, &temp);

  if ((millis() - lastTime) > timerDelay) {
    // Send Events to the client with the Sensor Readings Every 10 seconds
    events.send("ping",NULL,millis());
    events.send(getSensorReadings().c_str(),"new_readings" ,millis());
    lastTime = millis();
  }

  if ((millis() - lastTime) > gyroDelay) {
    // Send Events to the Web Server with the Sensor Readings
    events.send(getGyroReadings().c_str(),"gyro_readings",millis());
    lastTimeGyro = millis();
  }
  if ((millis() - lastTimeAcc) > accelerometerDelay) {

    // Send Events to the Web Server with the Sensor Readings
    events.send(getAccReadings().c_str(),"accelerometer_readings",millis());
    lastTimeAcc = millis();
  }
  if ((millis() - lastTimeTemperature) > temperatureDelay) {
    // Send Events to the Web Server with the Sensor Readings
    events.send(getTemperature().c_str(),"temperature_reading",millis());
    events.send(getINA219().c_str(),"voltmeter_reading",millis());
    lastTimeTemperature = millis();
  }
}