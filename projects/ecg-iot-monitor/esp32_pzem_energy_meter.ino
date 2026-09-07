/*
  =============================================================================
  مشروع 8: العداد الذكي ومراقبة استهلاك الطاقة الكهربائية (Smart Energy Meter)
  المتحكم: ESP32 DevKit
  الموديول: PZEM-004T v3.0 AC Multi-Function Energy Meter (UART: TX2/RX2 -> GPIO 16/17)
  القياسات: الجهد (V)، التيار (A)، القدرة الفعالة (W)، واستهلاك الطاقة (kWh)
  البروتوكول: MQTT / Adafruit IO / Blynk
  =============================================================================
*/

#include <WiFi.h>
#include <PZEM004Tv30.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// استخدام المنفذ التسلسلي Hardware Serial 2 في ESP32
#define PZEM_RX_PIN 16
#define PZEM_TX_PIN 17
PZEM004Tv30 pzem(Serial2, PZEM_RX_PIN, PZEM_TX_PIN);

const float KWH_PRICE_SAR = 0.18; // سعر الكيلوواط ساعة بالريال / العملة المحلية

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  Serial.println(F("العداد الكهربائي الذكي متصل بالسحابة..."));
}

void loop() {
  float voltage     = pzem.voltage();
  float current     = pzem.current();
  float power       = pzem.power();
  float energy_kwh  = pzem.energy();
  float frequency   = pzem.frequency();
  float pf          = pzem.pf();

  if (isnan(voltage)) {
    Serial.println(F("خطأ في قراءة بيانات عداد PZEM-004T"));
  } else {
    float totalCost = energy_kwh * KWH_PRICE_SAR;

    Serial.println(F("============== قراءات العداد الذكي =============="));
    Serial.print(F("الجهد الكهربائي: ")); Serial.print(voltage); Serial.println(F(" V"));
    Serial.print(F("التيار الكهربائي: ")); Serial.print(current); Serial.println(F(" A"));
    Serial.print(F("القدرة اللحظية: ")); Serial.print(power); Serial.println(F(" Watts"));
    Serial.print(F("إجمالي الطاقة المستهلكة: ")); Serial.print(energy_kwh, 3); Serial.println(F(" kWh"));
    Serial.print(F("معامل القدرة (Power Factor): ")); Serial.println(pf);
    Serial.print(F("التكلفة التقديرية الحالية: ")); Serial.print(totalCost, 2); Serial.println(F(" SAR"));
    Serial.println(F("================================================="));
  }

  delay(2000);
}
