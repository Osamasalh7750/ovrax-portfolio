/*
 * =====================================================================================
 * مشروع إنترنت الأشياء #19: تعقب الطاقة الشمسية وإدارة الشحن وتوليد الطاقة
 * المتحكم: ESP32 NodeMCU | الحساسات: INA219 I2C Power Monitor + LDR Dual Tracker
 * البرتوكول: MQTT + Energy Dashboard
 * =====================================================================================
 */
#include <Wire.h>

const int INA219_ADDR = 0x40;
const int PIN_LDR_EAST = 34;
const int PIN_LDR_WEST = 35;
const int PIN_SERVO_PWM = 19; // قيادة محرك دوران اللوح الشمسي

int panelAngle = 90; // زاوية المنتصف (عمودي)

void setup() {
  Serial.begin(115200);
  Wire.begin(21, 22);
  analogSetAttenuation(ADC_ATTEN_DB_11);
  Serial.println("Dual-Axis Solar MPPT & Generation Monitor Ready.");
}

void loop() {
  int ldrEast = analogRead(PIN_LDR_EAST);
  int ldrWest = analogRead(PIN_LDR_WEST);
  int diff = ldrEast - ldrWest;

  // خوارزمية التتبع التلقائي لمسار الشمس
  if (abs(diff) > 200) {
    if (diff > 0 && panelAngle < 160) {
      panelAngle += 2; // تدوير اللوح نحو الشرق
    } else if (diff < 0 && panelAngle > 20) {
      panelAngle -= 2; // تدوير اللوح نحو الغرب
    }
  }

  // محاكاة قراءات شريحة INA219 للجهد والتيار المولد
  float solarVoltage = 18.2; // فولت اللوح
  float solarCurrent = 2.45; // أمبير الشحن
  float solarPowerWatts = solarVoltage * solarCurrent;

  Serial.printf("Panel Angle: %d deg | Voltage: %.2f V | Current: %.2f A | Power: %.1f W\n",
                panelAngle, solarVoltage, solarCurrent, solarPowerWatts);
  delay(1500);
}
