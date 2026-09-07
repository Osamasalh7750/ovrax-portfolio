/*
  =============================================================================
  مشروع 12: نظام مراقبة منسوب المياه والخزانات الذكية (Smart Water Tank Monitor)
  المتحكم: ESP32 DevKit V1
  الحساس: JSN-SR04T Waterproof Ultrasonic Sensor (TRIG -> GPIO 5, ECHO -> GPIO 18)
  المشغلات: 5V Relay لصمام مضخة التعبئة (GPIO 19) + مؤشر مستوى المياه (Buzzer: GPIO 23)
  البروتوكول: Blynk IoT 2.0 / MQTT / Web Dashboard
  =============================================================================
*/

#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// أطراف الحساس المقاوم للماء والريليه
const int PIN_TRIG        = 5;
const int PIN_ECHO        = 18;
const int PIN_PUMP_RELAY  = 19;
const int PIN_ALARM_BUZZ  = 23;

// أبعاد الخزان بالسنتيمتر
const float TANK_TOTAL_HEIGHT_CM = 200.0; // الارتفاع الإجمالي للخزان
const float SENSOR_OFFSET_CM     = 20.0;  // المسافة بين الحساس وأعلى مستوى للمياه
const float TANK_CAPACITY_LITERS = 5000.0;// سعة الخزان الإجمالية باللتر

unsigned long lastTelemetryTime = 0;
bool isPumpActive = false;

// دالة قياس المسافة بدقة بالموجات فوق الصوتية
float measureDistanceCM() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);

  long durationMicroSec = pulseIn(PIN_ECHO, HIGH, 30000); // مهلة أقصاها 30 مللي ثانية
  if (durationMicroSec == 0) return -1.0; // خطأ في القراءة

  // سرعة الصوت في الهواء = 343 م/ث = 0.0343 سم/ميكرو ثانية
  float distance = (durationMicroSec * 0.0343) / 2.0;
  return distance;
}

void setup() {
  Serial.begin(115200);

  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_PUMP_RELAY, OUTPUT);
  pinMode(PIN_ALARM_BUZZ, OUTPUT);

  digitalWrite(PIN_PUMP_RELAY, LOW); // المضخة مطفأة افتراضياً
  digitalWrite(PIN_ALARM_BUZZ, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  Serial.println(F("=================================================="));
  Serial.println(F("نظام مراقبة منسوب المياه والخزانات الذكية - ESP32"));
  Serial.println(F("المتحكم متصل وجاهز لقياس حجم المياه اللحظي..."));
  Serial.println(F("=================================================="));
}

void loop() {
  unsigned long now = millis();
  if (now - lastTelemetryTime > 2000) {
    lastTelemetryTime = now;

    float measuredDist = measureDistanceCM();
    if (measuredDist > 0) {
      // حساب عمق المياه الحالي
      float waterDepth = (TANK_TOTAL_HEIGHT_CM + SENSOR_OFFSET_CM) - measuredDist;
      waterDepth = constrain(waterDepth, 0.0, TANK_TOTAL_HEIGHT_CM);

      // حساب نسبة الامتلاء المئوية
      float fillPercentage = (waterDepth / TANK_TOTAL_HEIGHT_CM) * 100.0;
      
      // حساب الحجم الفعلي الحالي باللتر
      float currentLiters = (fillPercentage / 100.0) * TANK_CAPACITY_LITERS;

      Serial.println(F("----------------- قياسات الخزان الذكي -----------------"));
      Serial.print(F("المسافة من الحساس لسطح الماء: ")); Serial.print(measuredDist); Serial.println(F(" cm"));
      Serial.print(F("عمق المياه الفعلي:           ")); Serial.print(waterDepth); Serial.println(F(" cm"));
      Serial.print(F("نسبة امتلاء الخزان:          ")); Serial.print(fillPercentage, 1); Serial.println(F(" %"));
      Serial.print(F("كمية المياه المتوفرة:        ")); Serial.print(currentLiters, 0); Serial.println(F(" Liters"));
      Serial.print(F("حالة مضخة التعبئة:           ")); Serial.println(isPumpActive ? F("تعمل 💧") : F("متوقفة ⏸️"));
      Serial.println(F("------------------------------------------------------"));

      // التحكم الذكي التلقائي بمضخة التعبئة (Hysteresis Control):
      // إذا انخفض الماء لأقل من 20% -> تشغيل المضخة فوراً لمنع انقطاع المياه
      if (fillPercentage < 20.0 && !isPumpActive) {
        Serial.println(F("⚠️ تنبيه: مستوى المياه منخفض جداً! تشغيل مضخة التعبئة تلقائياً..."));
        digitalWrite(PIN_PUMP_RELAY, HIGH);
        isPumpActive = true;
      } 
      // إذا وصل الماء إلى 95% -> إيقاف المضخة فوراً لمنع الفيضان والهدر
      else if (fillPercentage >= 95.0 && isPumpActive) {
        Serial.println(F("✅ الخزان ممتلئ! إيقاف مضخة التعبئة تلقائياً."));
        digitalWrite(PIN_PUMP_RELAY, LOW);
        isPumpActive = false;
      }
    } else {
      Serial.println(F("تعذر قراءة المسافة من حساس JSN-SR04T، جاري إعادة المحاولة..."));
    }
  }
}
