/*
  =============================================================================
  مشروع 2: محطة الطقس والمناخ الذكية المتصلة بإنترنت الأشياء (Smart Weather Station)
  المتحكم: ESP32 / ESP8266
  الحساس: BME280 (I2C: SDA -> GPIO 21, SCL -> GPIO 22)
  المنصة السحابية: Blynk IoT / Adafruit IO / MQTT
  =============================================================================
*/

#include <WiFi.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

Adafruit_BME280 bme; // اتصال عبر I2C (عنوان 0x76 أو 0x77)

unsigned long lastTelemetryTime = 0;

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22); // أطراف I2C في ESP32

  Serial.println(F("بدء تشغيل محطة الطقس الذكية..."));
  
  if (!bme.begin(0x76)) {
    Serial.println(F("تحذير: تعذر العثور على حساس BME280! تحقق من توصيل SDA و SCL"));
    while (1) delay(100);
  }

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(F("."));
  }
  Serial.println(F("\nتم الاتصال بالواي فاي بنجاح!"));
}

void loop() {
  unsigned long now = millis();
  if (now - lastTelemetryTime > 2000) {
    lastTelemetryTime = now;

    float temperature = bme.readTemperature();       // درجة الحرارة مئوية
    float humidity    = bme.readHumidity();          // الرطوبة النسبية %
    float pressure    = bme.readPressure() / 100.0F; // الضغط الجوي بالهيكتوباسكال (hPa)
    float altitude    = bme.readAltitude(1013.25);   // الارتفاع التقريبي بالمتر

    // حساب مؤشر الحرارة المحسوسة (Heat Index / Comfort Index)
    float heatIndex = -8.784695 + 1.61139411 * temperature + 2.338549 * humidity;

    Serial.println(F("===================================="));
    Serial.print(F("درجة الحرارة: ")); Serial.print(temperature); Serial.println(F(" °C"));
    Serial.print(F("الرطوبة النسبية: ")); Serial.print(humidity); Serial.println(F(" %"));
    Serial.print(F("الضغط الجوي: ")); Serial.print(pressure); Serial.println(F(" hPa"));
    Serial.print(F("الارتفاع التقديري: ")); Serial.print(altitude); Serial.println(F(" m"));
    Serial.print(F("المؤشر المحسوس: ")); Serial.print(heatIndex); Serial.println(F(" °C"));

    // إرسال البيانات للسحابة أو شاشة العرض
  }
}
