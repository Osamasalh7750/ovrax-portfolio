/*
  =============================================================================
  مشروع 5: نظام التحكم الذكي بالتكييف والترموستات (Smart AC & Thermostat)
  المتحكم: ESP32 DevKit
  الحساس: DS18B20 Waterproof Temp Sensor (OneWire: GPIO 4)
  التحكم: IR Transmitter LED (GPIO 19) لإرسال إشارات الريموت + ريليه حماية (GPIO 18)
  البروتوكول: MQTT / Home Assistant / Blynk
  =============================================================================
*/

#include <WiFi.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <IRremoteESP8266.h>
#include <IRsend.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// إعداد حساس الحرارة
const int ONE_WIRE_BUS = 4;
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// إعداد مرسل الأشعة تحت الحمراء IR
const uint16_t kIrLed = 19;
IRsend irsend(kIrLed);

const int PIN_RELAY = 18; // ريليه فصل الضاغط في الحالات الطارئة

float targetTemperature = 22.0; // درجة الحرارة المطلوبة
bool acPowerState = true;

void setup() {
  Serial.begin(115200);
  irsend.begin();
  sensors.begin();
  pinMode(PIN_RELAY, OUTPUT);
  digitalWrite(PIN_RELAY, HIGH);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  Serial.println(F("نظام التكييف الذكي متصل وجاهز للتحكم..."));
}

void loop() {
  sensors.requestTemperatures();
  float currentTemp = sensors.getTempCByIndex(0);

  Serial.print(F("درجة الحرارة الحالية للغرفة: "));
  Serial.print(currentTemp);
  Serial.print(F(" °C | المستهدفة: "));
  Serial.print(targetTemperature);
  Serial.println(F(" °C"));

  // حلقة التحكم المغلقة (Thermostat Feedback Loop)
  if (currentTemp > targetTemperature + 1.0 && !acPowerState) {
    Serial.println(F("الغرفة دافئة: إرسال أمر تشغيل التكييف عبر IR..."));
    // إرسال كود الـ IR لتشغيل التكييف (مثال: بروتوكول LG أو Coolix)
    irsend.sendNEC(0x20DF10EF, 32); 
    acPowerState = true;
    digitalWrite(PIN_RELAY, HIGH);
  } else if (currentTemp < targetTemperature - 1.0 && acPowerState) {
    Serial.println(F("تم الوصول للبرودة المطلوبة: إيقاف الضاغط لتوفير الطاقة..."));
    irsend.sendNEC(0x20DF906F, 32);
    acPowerState = false;
  }

  delay(3000);
}
