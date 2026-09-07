/*
  =============================================================================
  مشروع 7: نظام كشف تسريب الغاز والحرائق الذكي (Smart Gas & Flame Detector)
  المتحكم: ESP32 DevKit
  الحساسات: MQ-2 Combustible Gas Sensor (GPIO 35) + Flame Sensor (GPIO 32)
  المشغلات: صمام الغاز الكهرومغناطيسي Solenoid (GPIO 25) + Buzzer Alarm (GPIO 27)
  =============================================================================
*/

#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

const int PIN_MQ2_ADC     = 35; // مدخل تناظري لقراءة تركيز الغاز
const int PIN_FLAME_DIGI  = 32; // كاشف اللهب الرقمي (Active LOW)
const int PIN_GAS_VALVE   = 25; // ريليه صمام إغلاق خط الغاز
const int PIN_SIREN       = 27; // صفارة الإنذار العالية

const int GAS_DANGER_THRESHOLD = 1800; // عتبة الخطر للغاز بالـ ADC

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);

  pinMode(PIN_FLAME_DIGI, INPUT);
  pinMode(PIN_GAS_VALVE, OUTPUT);
  pinMode(PIN_SIREN, OUTPUT);

  digitalWrite(PIN_GAS_VALVE, LOW); // الصمام مفتوح في الوضع الطبيعي
  digitalWrite(PIN_SIREN, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  Serial.println(F("نظام السلامة ومكافحة الغاز والحرائق نشط..."));
}

void loop() {
  int gasPPM = analogRead(PIN_MQ2_ADC);
  bool flameDetected = (digitalRead(PIN_FLAME_DIGI) == LOW);

  Serial.print(F("تركيز الغاز الخام: "));
  Serial.print(gasPPM);
  Serial.print(F(" | حالة اللهب: "));
  Serial.println(flameDetected ? F("🔥 حريق مكتشف!") : F("آمن"));

  // إجراءات الطوارئ عند تسريب الغاز أو الحريق
  if (gasPPM > GAS_DANGER_THRESHOLD || flameDetected) {
    Serial.println(F("🚨 إنذار حرج أحمر: إغلاق فوري لصمام الغاز وتفعيل صفارات الإنذار!"));
    
    digitalWrite(PIN_GAS_VALVE, HIGH); // قطع تدفق الغاز فوراً
    digitalWrite(PIN_SIREN, HIGH);     // إطلاق صفارة الطوارئ
    
    // إرسال إشعار SMS أو إشعار سحابي للطوارئ والدفاع المدني
    delay(1000);
  } else {
    digitalWrite(PIN_SIREN, LOW);
  }

  delay(1000);
}
