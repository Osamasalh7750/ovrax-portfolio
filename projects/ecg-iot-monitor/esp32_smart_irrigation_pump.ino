/*
  =============================================================================
  مشروع 6: نظام الري الآلي والزراعة الدقيقة الذكية (Smart Soil & Auto-Irrigation)
  المتحكم: ESP32 DevKit
  الحساس: Capacitive Soil Moisture Sensor v1.2 (GPIO 34 ADC1)
  المشغل: 5V Relay Module لمضخة مياه غاطسة صغيرة (GPIO 26)
  المنصة: Blynk IoT / MQTT
  =============================================================================
*/

#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

const int PIN_SOIL_ADC  = 34; // قراءة رطوبة التربة
const int PIN_PUMP_RELAY = 26; // ريليه مضخة الري

// قيم المعايرة لحساس الرطوبة السعوي (12-bit ADC: 0 - 4095)
const int AIR_VALUE   = 3200; // قيمة القراءة في الهواء الجاف
const int WATER_VALUE = 1400; // قيمة القراءة في الماء المشبع

const int DRY_THRESHOLD_PERCENT = 35; // نسبة الجفاف التي تستدعي بدء الري

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);
  pinMode(PIN_PUMP_RELAY, OUTPUT);
  digitalWrite(PIN_PUMP_RELAY, LOW); // إبقاء المضخة متوقفة في البداية

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  Serial.println(F("نظام الزراعة الذكية متصل ويعمل..."));
}

void loop() {
  int rawADC = analogRead(PIN_SOIL_ADC);
  
  // تحويل القراءة التناظرية إلى نسبة مئوية للرطوبة
  int moisturePercent = map(rawADC, AIR_VALUE, WATER_VALUE, 0, 100);
  moisturePercent = constrain(moisturePercent, 0, 100);

  Serial.print(F("نسبة رطوبة التربة الحالية: "));
  Serial.print(moisturePercent);
  Serial.println(F(" %"));

  // التحكم التلقائي بالمضخة
  if (moisturePercent < DRY_THRESHOLD_PERCENT) {
    Serial.println(F("⚠️ التربة جافة: تشغيل مضخة المياه لمدة 4 ثوانٍ..."));
    digitalWrite(PIN_PUMP_RELAY, HIGH); // تشغيل المضخة
    delay(4000);
    digitalWrite(PIN_PUMP_RELAY, LOW);  // إيقاف المضخة
    Serial.println(F("تم إنهاء دورة الري ومراقبة امتصاص التربة للماء."));
  } else {
    Serial.println(F("✅ رطوبة التربة مثالية، المضخة في وضع الاستعداد."));
  }

  delay(5000);
}
