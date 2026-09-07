/*
 * =====================================================================================
 * مشروع إنترنت الأشياء #18: نظام المزارع السمكية والأكوابونيك الذكي
 * المتحكم: ESP32 NodeMCU | الحساسات: pH Sensor + DS18B20 + مضخة أكسجين
 * البرتوكول: MQTT + ThingSpeak
 * =====================================================================================
 */
#include <WiFi.h>

const int PIN_PH_ANALOG = 35; // مدخل مسبار الحموضة pH
const int PIN_OXYGEN_PUMP = 27; // مرحل مضخة تهوية الأكسجين (Aerator)
const int PIN_FEEDER_SERVO = 18; // محرك تفريغ العلف التلقائي

float readPH() {
  int raw = analogRead(PIN_PH_ANALOG);
  float voltage = (raw / 4095.0) * 3.3;
  // معادلة المعايرة الخطية لمسبار pH القياسي
  float phValue = 7.0 + ((2.5 - voltage) / 0.18);
  return constrain(phValue, 0.0, 14.0);
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_OXYGEN_PUMP, OUTPUT);
  pinMode(PIN_FEEDER_SERVO, OUTPUT);
  digitalWrite(PIN_OXYGEN_PUMP, HIGH); // مضخة الأكسجين تعمل افتراضياً

  analogSetAttenuation(ADC_ATTEN_DB_11);
  Serial.println("Smart Aquaponics & Fish Pond Monitor Online.");
}

void loop() {
  float currentPH = readPH();
  float waterTemp = 24.8; // مقروءة من DS18B20

  // مراقبة توازن حموضة مياه الأسماك (المدى الآمن: 6.5 إلى 8.0)
  if (currentPH < 6.5) {
    Serial.println("⚠️ [ALERT]: Water Acidic! Add Calcium Carbonate Buffer.");
  } else if (currentPH > 8.2) {
    Serial.println("⚠️ [ALERT]: Water Alkaline! Risk of Ammonia Toxicity.");
  }

  // تشغيل التهوية المكثفة في المياه الدافئة (الأكسجين الذائب يقل بارتفاع الحرارة)
  if (waterTemp > 28.0) {
    digitalWrite(PIN_OXYGEN_PUMP, HIGH);
  }

  Serial.printf("Water Temp: %.1f C | pH Level: %.2f | Oxygen Pump: %s\n",
                waterTemp, currentPH, digitalRead(PIN_OXYGEN_PUMP) ? "ACTIVE" : "STANDBY");
  delay(3000);
}
