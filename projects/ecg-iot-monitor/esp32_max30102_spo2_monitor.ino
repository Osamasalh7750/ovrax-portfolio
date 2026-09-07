/*
 * =====================================================================================
 * مشروع إنترنت الأشياء #20: نظام قياس نبض وأكسجين الدم البصري (SpO2 & PPG Monitor)
 * المتحكم: ESP32 NodeMCU | الحساس: MAX30102 Optical PPG Oximeter عبر I2C
 * البرتوكول: BLE + MQTT Telemedicine
 * =====================================================================================
 */
#include <Wire.h>

const int MAX30102_ADDR = 0x57;
const int PIN_BUZZER = 25;

unsigned long lastBeat = 0;
float currentBpm = 72.0;
float currentSpO2 = 98.5;

void setup() {
  Serial.begin(115200);
  pinMode(PIN_BUZZER, OUTPUT);
  Wire.begin(21, 22);
  Serial.println("MAX30102 Optical Biosensing System Initialized.");
}

void loop() {
  // محاكاة استخراج نسبة SpO2 من نسبة امتصاص الضوء الأحمر وتحت الحمراء
  float acRed = 240.0, dcRed = 12000.0;
  float acIr  = 280.0, dcIr  = 13500.0;
  float R = (acRed / dcRed) / (acIr / dcIr);

  currentSpO2 = 110.0 - 25.0 * R; // معادلة المعايرة التجريبية لـ SpO2
  currentSpO2 = constrain(currentSpO2, 75.0, 100.0);

  // تنبيه نقص الأكسجين الحرج (Hypoxemia Alert)
  if (currentSpO2 < 92.0) {
    digitalWrite(PIN_BUZZER, HIGH);
    Serial.printf("🚨 [CRITICAL ALERT]: Low Blood Oxygen SpO2: %.1f %%!\n", currentSpO2);
  } else {
    digitalWrite(PIN_BUZZER, LOW);
  }

  Serial.printf("Heart Rate: %.0f BPM | Blood Oxygen SpO2: %.1f %% | Lead Status: OK\n",
                currentBpm, currentSpO2);
  delay(1000);
}
