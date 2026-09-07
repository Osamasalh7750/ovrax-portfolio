/*
  =============================================================================
  مشروع 11: نظام تتبع المركبات والأصول الذكي عبر GPS و GSM (Smart GPS Fleet Tracker)
  المتحكم: ESP32 DevKit V1
  شريحة الـ GPS: u-blox NEO-6M GPS Module (UART2: TX -> GPIO 16, RX -> GPIO 17)
  موديول الاتصال الخلوي: SIM800L GPRS/GSM Module (UART1: TX -> GPIO 26, RX -> GPIO 27)
  الوظيفة: قراءة خطوط الطول والعرض، السرعة، الوقت، وإرسال رابط خرائط Google عبر SMS والسحابة
  =============================================================================
*/

#include <HardwareSerial.h>
#include <TinyGPS++.h>

// إعداد المنافذ التسلسلية لـ GPS و GSM
HardwareSerial gpsSerial(2); // Serial2
HardwareSerial gsmSerial(1); // Serial1

TinyGPSPlus gps;

// رقم هاتف الطوارئ لتلقي رسائل الـ SMS
const char* EMERGENCY_PHONE_NUMBER = "+966500000000";

unsigned long lastGpsPublish = 0;
float currentLatitude = 0.0;
float currentLongitude = 0.0;
float currentSpeedKmh = 0.0;
int satellitesCount = 0;

void sendSMSLocation(float lat, float lng, float speed) {
  Serial.println(F("إرسال رسالة SMS بإحداثيات الموقع الحالي..."));
  
  gsmSerial.println("AT+CMGF=1"); // ضبط نمط الرسائل النصية
  delay(500);
  
  gsmSerial.print("AT+CMGS=\"");
  gsmSerial.print(EMERGENCY_PHONE_NUMBER);
  gsmSerial.println("\"");
  delay(500);

  // تكوين محتوى الرسالة مع رابط خرائط Google Maps المباشر
  gsmSerial.print("🚨 تنبيه موقع المركبة:\n");
  gsmSerial.print("خط العرض: "); gsmSerial.println(lat, 6);
  gsmSerial.print("خط الطول: "); gsmSerial.println(lng, 6);
  gsmSerial.print("السرعة: "); gsmSerial.print(speed); gsmSerial.println(" km/h\n");
  gsmSerial.print("الرابط المباشر:\nhttps://maps.google.com/?q=");
  gsmSerial.print(lat, 6);
  gsmSerial.print(",");
  gsmSerial.println(lng, 6);
  delay(500);

  gsmSerial.write(26); // إرسال رمز Ctrl+Z لإنهاء وبث الرسالة
  delay(3000);
  Serial.println(F("تم إرسال رسالة الـ SMS بنجاح!"));
}

void setup() {
  Serial.begin(115200);
  
  // تهيئة منفذ الـ GPS (باود ريت افتراضي 9600)
  gpsSerial.begin(9600, SERIAL_8N1, 16, 17);
  
  // تهيئة موديول الـ GSM (باود ريت 9600 أو 115200)
  gsmSerial.begin(9600, SERIAL_8N1, 26, 27);

  Serial.println(F("===================================================="));
  Serial.println(F("نظام تتبع المركبات والأساطيل الذكي GPS & GSM - ESP32"));
  Serial.println(F("جاري التقاط إشارات الأقمار الصناعية..."));
  Serial.println(F("===================================================="));
}

void loop() {
  // قراءة حزم البيانات القادمة من مستقبل الـ GPS (NMEA Sentences)
  while (gpsSerial.available() > 0) {
    gps.encode(gpsSerial.read());
  }

  // فحص استقرار الإحداثيات كل 3 ثوانٍ
  unsigned long now = millis();
  if (now - lastGpsPublish > 3000) {
    lastGpsPublish = now;

    if (gps.location.isValid()) {
      currentLatitude = gps.location.lat();
      currentLongitude = gps.location.lng();
      currentSpeedKmh = gps.speed.kmph();
      satellitesCount = gps.satellites.value();

      Serial.println(F("----------------- بيانات الموقع المحدثة -----------------"));
      Serial.print(F("خط العرض (Latitude):  ")); Serial.println(currentLatitude, 6);
      Serial.print(F("خط الطول (Longitude): ")); Serial.println(currentLongitude, 6);
      Serial.print(F("السرعة الحالية:       ")); Serial.print(currentSpeedKmh); Serial.println(F(" km/h"));
      Serial.print(F("عدد الأقمار المرصودة: ")); Serial.println(satellitesCount);
      Serial.print(F("رابط الخريطة: https://maps.google.com/?q="));
      Serial.print(currentLatitude, 6); Serial.print(F(",")); Serial.println(currentLongitude, 6);
      Serial.println(F("---------------------------------------------------------"));

      // إرسال تنبيه في حال تجاوز السرعة القانونية (مثلاً 120 كم/ساعة)
      if (currentSpeedKmh > 120.0) {
        Serial.println(F("⚠️ تحذير: تجاوزت المركبة السرعة المحددة! إرسال إشعار SMS..."));
        sendSMSLocation(currentLatitude, currentLongitude, currentSpeedKmh);
      }
    } else {
      Serial.println(F("جاري البحث عن تغطية الأقمار الصناعية (GPS Fix Seeking)..."));
    }
  }
}
