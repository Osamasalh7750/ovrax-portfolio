/*
 * =====================================================================================
 * مشروع إنترنت الأشياء #14: نظام الميزان الذكي وإدارة المخزون الصناعي
 * المتحكم: ESP32 NodeMCU | الحساس: Load Cell + شريحة HX711 24-bit ADC
 * البرتوكول: MQTT + REST Telemetry
 * =====================================================================================
 */
#include <WiFi.h>

const int PIN_HX711_DOUT = 21; // طرف البيانات التسلسلي لـ HX711
const int PIN_HX711_SCK  = 22; // طرف نبضات الساعة لـ HX711

long offset = 8388608;         // قيمة تصفير الميزان (Tare Offset)
float calibration_factor = 420.5; // معامل المعايرة بالجرام

unsigned long lastRead = 0;

long readHX711Raw() {
  while (digitalRead(PIN_HX711_DOUT) == HIGH) {
    // انتظار جاهزية الشريحة
  }
  unsigned long count = 0;
  for (int i = 0; i < 24; i++) {
    digitalWrite(PIN_HX711_SCK, HIGH);
    delayMicroseconds(1);
    count = count << 1;
    digitalWrite(PIN_HX711_SCK, LOW);
    delayMicroseconds(1);
    if (digitalRead(PIN_HX711_DOUT)) {
      count++;
    }
  }
  // النبضة رقم 25 لضبط تكبير القناة A إلى 128x
  digitalWrite(PIN_HX711_SCK, HIGH);
  delayMicroseconds(1);
  digitalWrite(PIN_HX711_SCK, LOW);
  delayMicroseconds(1);

  count ^= 0x800000;
  return (long)count;
}

void tareScale() {
  long sum = 0;
  for (int i = 0; i < 10; i++) {
    sum += readHX711Raw();
    delay(20);
  }
  offset = sum / 10;
  Serial.println("Scale Tared to 0.0g.");
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_HX711_DOUT, INPUT);
  pinMode(PIN_HX711_SCK, OUTPUT);
  digitalWrite(PIN_HX711_SCK, LOW);

  delay(500);
  tareScale();
  Serial.println("Smart Warehouse Inventory Scale Ready.");
}

void loop() {
  if (millis() - lastRead > 1000) {
    lastRead = millis();
    long raw = readHX711Raw();
    float weightGrams = (raw - offset) / calibration_factor;
    if (weightGrams < 0) weightGrams = 0.0;

    Serial.print("Weight: ");
    Serial.print(weightGrams, 1);
    Serial.print(" g (");
    Serial.print(weightGrams / 1000.0, 3);
    Serial.print(" kg)");

    // تنبيه نفاد المخزون على الرف الذكي
    if (weightGrams < 150.0) {
      Serial.println(" -> [ALERT]: Shelf Empty! Restock Needed.");
    } else {
      Serial.println(" -> [STATUS]: Inventory Normal.");
    }
  }
}
