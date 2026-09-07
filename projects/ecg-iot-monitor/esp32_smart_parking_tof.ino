/*
 * =====================================================================================
 * مشروع إنترنت الأشياء #16: نظام إدارة مواقف السيارات الذكية ومؤشرات الإشغال
 * المتحكم: ESP32 NodeMCU | الحساسات: Laser ToF / Ultrasonic x4 + إشارات LED
 * البرتوكول: MQTT + خريطة المواقف الحية
 * =====================================================================================
 */
#include <WiFi.h>

const int NUM_SLOTS = 4;
const int trigPins[NUM_SLOTS] = {5, 18, 19, 23};
const int echoPins[NUM_SLOTS] = {34, 35, 32, 33};
const int ledPins[NUM_SLOTS]  = {13, 12, 14, 27}; // مؤشرات الحالة الحمراء/الخضراء

bool slotOccupied[NUM_SLOTS] = {false, false, false, false};
unsigned long parkStartTime[NUM_SLOTS] = {0, 0, 0, 0};

float readDistanceCm(int trigPin, int echoPin) {
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);
  long duration = pulseIn(echoPin, HIGH, 25000);
  if (duration == 0) return 200.0;
  return duration * 0.034 / 2.0;
}

void setup() {
  Serial.begin(115200);
  for (int i = 0; i < NUM_SLOTS; i++) {
    pinMode(ledPins[i], OUTPUT);
    digitalWrite(ledPins[i], LOW);
  }
  Serial.println("Smart Parking Guidance System Online.");
}

void loop() {
  int availableSlots = 0;
  for (int i = 0; i < NUM_SLOTS; i++) {
    float dist = readDistanceCm(trigPins[i], echoPins[i]);
    bool currentOccupied = (dist < 35.0); // سيارة واقفة على بعد أقل من 35 سم

    if (currentOccupied && !slotOccupied[i]) {
      // سيارة دخلت الموقف
      slotOccupied[i] = true;
      parkStartTime[i] = millis();
      digitalWrite(ledPins[i], HIGH); // إضاءة حمراء (محجوز)
      Serial.printf("Slot #%d -> OCCUPIED.\n", i + 1);
    } else if (!currentOccupied && slotOccupied[i]) {
      // سيارة غادرت الموقف
      slotOccupied[i] = false;
      unsigned long durationSec = (millis() - parkStartTime[i]) / 1000;
      float fee = (durationSec / 60.0) * 0.5; // نصف دولار للدقيقة
      digitalWrite(ledPins[i], LOW); // إضاءة خضراء (فارغ)
      Serial.printf("Slot #%d -> VACATED. Parked: %lu s | Fee: $%.2f\n", i + 1, durationSec, fee);
    }

    if (!slotOccupied[i]) availableSlots++;
    delay(50);
  }

  Serial.printf("Available Free Slots: %d / %d\n", availableSlots, NUM_SLOTS);
  delay(2000);
}
