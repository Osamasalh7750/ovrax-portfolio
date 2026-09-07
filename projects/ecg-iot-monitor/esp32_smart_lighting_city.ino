/*
  =============================================================================
  مشروع 10: نظام الإنارة التكيفية والمدن الذكية (Smart City Adaptive Streetlight)
  المتحكم: ESP32 DevKit
  الحساسات: LDR Light Sensor (GPIO 34 ADC1) + Ultrasonic Radar / Motion (GPIO 13/12)
  الإضاءة: شريط إضاءة قابل للتحكم PWM / WS2812B NeoPixel (GPIO 18)
  البروتوكول: MQTT / Smart City Dashboard
  =============================================================================
*/

#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

const int PIN_LDR_ADC    = 34; // قياس ضوء النهار المحيط
const int PIN_PWM_LIGHT  = 18; // خرج التحكم بشدة الإنارة (PWM)
const int PIN_TRIG       = 13; // حساس المسافة لرصد مرور المشاة والسيارات
const int PIN_ECHO       = 12;

// قنوات الـ PWM في ESP32
const int PWM_CHANNEL    = 0;
const int PWM_FREQ       = 5000;
const int PWM_RESOLUTION = 8; // 0 - 255

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);

  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);

  ledcSetup(PWM_CHANNEL, PWM_FREQ, PWM_RESOLUTION);
  ledcAttachPin(PIN_PWM_LIGHT, PWM_CHANNEL);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  Serial.println(F("نظام الإنارة الذكية للمدن متصل ويعمل..."));
}

long getDistanceCM() {
  digitalWrite(PIN_TRIG, LOW); delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH); delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  long duration = pulseIn(PIN_ECHO, HIGH, 25000);
  if (duration == 0) return 999;
  return duration * 0.034 / 2;
}

void loop() {
  int ambientLight = analogRead(PIN_LDR_ADC); // قيمة عالية = ظلام، قيمة منخفضة = شمس ساطعة
  long distance = getDistanceCM();

  bool isNight = (ambientLight > 2000);
  bool vehicleDetected = (distance < 150); // رصد سيارة أو مشاة على بعد أقل من 1.5 متر

  if (!isNight) {
    // فترة النهار: إطفاء الأضواء تماماً لتوفير الطاقة
    ledcWrite(PWM_CHANNEL, 0);
    Serial.println(F("☀️ نهار مشمس: الإنارة مطفأة بنسبة 100%"));
  } else {
    if (vehicleDetected) {
      // رصد حركة سيارة/مشاة ليلاً: رفع السطوع لأقصى حد (100%)
      ledcWrite(PWM_CHANNEL, 255);
      Serial.println(F("🚗 رصد سيارة مقتربة: رفع شدة الإضاءة إلى 100% للأمان!"));
    } else {
      // ليل هادئ دون حركة: خفت الإضاءة إلى وضع الاستعداد الموفر (20% سطوع)
      ledcWrite(PWM_CHANNEL, 50);
      Serial.println(F("🌙 ليل هادئ: إضاءة خافتة موفرة للطاقة (Eco 20%)"));
    }
  }

  delay(1000);
}
