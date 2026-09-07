/*
 * =====================================================================================
 * مشروع إنترنت الأشياء #15: نظام كشف الزلازل والاهتزازات والتحذير المبكر
 * المتحكم: ESP32 NodeMCU | الحساس: MPU-6050 6-Axis Gyro/Accelerometer عبر I2C
 * البرتوكول: MQTT + إنذار كهروميكانيكي فوري
 * =====================================================================================
 */
#include <Wire.h>

const int MPU_ADDR = 0x68;
const int PIN_SIREN = 25;
const int PIN_VALVE_CUTOFF = 26; // فصل الغاز والكهرباء تلقائياً عند الزلازل

int16_t ax, ay, az;
float prev_a_mag = 1.0;
unsigned long lastSample = 0;

void setup() {
  Serial.begin(115200);
  pinMode(PIN_SIREN, OUTPUT);
  pinMode(PIN_VALVE_CUTOFF, OUTPUT);
  digitalWrite(PIN_SIREN, LOW);
  digitalWrite(PIN_VALVE_CUTOFF, LOW);

  Wire.begin(21, 22); // SDA, SCL
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x6B);   // سجل PWR_MGMT_1
  Wire.write(0x00);   // إيقاظ الحساس من النوم
  Wire.endTransmission(true);

  Serial.println("MPU-6050 Seismic Early Warning Sensor Online.");
}

void loop() {
  Wire.beginTransmission(MPU_ADDR);
  Wire.write(0x3B); // بدء قراءة تسارع المحاور X, Y, Z
  Wire.endTransmission(false);
  Wire.requestFrom(MPU_ADDR, 6, true);

  ax = Wire.read() << 8 | Wire.read();
  ay = Wire.read() << 8 | Wire.read();
  az = Wire.read() << 8 | Wire.read();

  // تحويل القراءات لقوة الجاذبية الأرضية g (نطاق ±2g)
  float gx = ax / 16384.0;
  float gy = ay / 16384.0;
  float gz = az / 16384.0;

  // حساب محصلة متجهات التسارع الديناميكية
  float a_mag = sqrt(gx * gx + gy * gy + gz * gz);
  float seismic_delta = abs(a_mag - prev_a_mag);
  prev_a_mag = a_mag;

  // عتبات استشعار الهزات الأرضية والزلازل
  if (seismic_delta > 0.45) { // هزة عنيفة (> 5.5 ريختر)
    digitalWrite(PIN_SIREN, HIGH);
    digitalWrite(PIN_VALVE_CUTOFF, HIGH); // فصل فوري لمحبس الغاز لتفادي الانفجار
    Serial.print("🚨 [EARTHQUAKE DETECTED!]: Delta = ");
    Serial.print(seismic_delta, 3);
    Serial.println(" g -> Critical Shutoff Triggered!");
  } else if (seismic_delta > 0.15) { // هزة تحذيرية طفيفة
    digitalWrite(PIN_SIREN, HIGH);
    delay(50);
    digitalWrite(PIN_SIREN, LOW);
  } else {
    digitalWrite(PIN_SIREN, LOW);
  }

  delay(50); // معدل أخذ عينات 20Hz
}
