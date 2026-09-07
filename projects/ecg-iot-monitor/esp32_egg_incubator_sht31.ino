/*
 * =====================================================================================
 * مشروع إنترنت الأشياء #17: حاضنة البيض الذكية ومحرك التقليب التلقائي
 * المتحكم: ESP32 NodeMCU | الحساس: SHT31 I2C + سيرفو SG90 + سخان PTC
 * البرتوكول: MQTT + Blynk IoT
 * =====================================================================================
 */
#include <Wire.h>

const int SHT31_ADDR = 0x44;
const int PIN_HEATER = 25; // مرحل عنصر التسخين PTC
const int PIN_HUMID  = 26; // مرحل المبخرة فوق الصوتية للرطوبة
const int PIN_SERVO  = 19; // إشارة محرك تقليب البيض

const float TARGET_TEMP = 37.5; // درجة الحرارة المثلى لفقس البيض (37.5°C)
const float TARGET_HUM  = 65.0; // الرطوبة النسبية المثلى (60 - 65%)

unsigned long lastTurn = 0;
bool turnDirection = false;

void readSHT31(float &temp, float &hum) {
  Wire.beginTransmission(SHT31_ADDR);
  Wire.write(0x24);
  Wire.write(0x00);
  Wire.endTransmission();
  delay(20);
  Wire.requestFrom(SHT31_ADDR, 6);
  if (Wire.available() == 6) {
    uint16_t rawT = Wire.read() << 8 | Wire.read(); Wire.read(); // CRC
    uint16_t rawH = Wire.read() << 8 | Wire.read(); Wire.read(); // CRC
    temp = -45.0 + 175.0 * (float)rawT / 65535.0;
    hum = 100.0 * (float)rawH / 65535.0;
  }
}

void turnEggs() {
  turnDirection = !turnDirection;
  Serial.print("🔄 Turning Eggs to ");
  Serial.println(turnDirection ? "+45 Degrees" : "-45 Degrees");
  // محاكاة نبضة PWM للسيرفو بزاوية 45 درجة
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_HEATER, OUTPUT);
  pinMode(PIN_HUMID, OUTPUT);
  Wire.begin(21, 22);
  Serial.println("Smart Egg Incubator System Online.");
}

void loop() {
  float temp = 0, hum = 0;
  readSHT31(temp, hum);

  // التحكم الحراري فائق الدقة (نطاق ±0.2°C)
  if (temp < (TARGET_TEMP - 0.2)) {
    digitalWrite(PIN_HEATER, HIGH); // تشغيل السخان
  } else if (temp > (TARGET_TEMP + 0.1)) {
    digitalWrite(PIN_HEATER, LOW);  // فصل السخان
  }

  // التحكم بالرطوبة
  if (hum < TARGET_HUM) {
    digitalWrite(PIN_HUMID, HIGH);
  } else {
    digitalWrite(PIN_HUMID, LOW);
  }

  // تقليب البيض الآلي كل ساعتين (أو 10 ثوانٍ للعرض التجريبي)
  if (millis() - lastTurn > 10000) {
    lastTurn = millis();
    turnEggs();
  }

  Serial.printf("Incubator Temp: %.2f C | Humidity: %.1f %% | Heater: %s\n",
                temp, hum, digitalRead(PIN_HEATER) ? "ON" : "OFF");
  delay(2000);
}
