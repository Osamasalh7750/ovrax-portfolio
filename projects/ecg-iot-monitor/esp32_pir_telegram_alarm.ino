/*
  =============================================================================
  مشروع 3: نظام الحراسة وكشف الحركة والرادار الذكي (PIR Motion & Telegram Alarm)
  المتحكم: ESP32 DevKit
  الحساسات: PIR Motion HC-SR501 (GPIO 13) + Buzzer Alarm (GPIO 12) + LED (GPIO 14)
  التنبيه: إرسال إشعار فوري عبر بوت تيليجرام (Telegram Bot API)
  =============================================================================
*/

#include <WiFi.h>
#include <WiFiClientSecure.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// بيانات بوت تيليجرام
const char* botToken = "YOUR_TELEGRAM_BOT_TOKEN";
const char* chatID   = "YOUR_TELEGRAM_CHAT_ID";

const int PIN_PIR    = 13;
const int PIN_BUZZER = 12;
const int PIN_LED    = 14;

bool motionDetected = false;
unsigned long lastAlarmTime = 0;

void sendTelegramAlert(String message) {
  WiFiClientSecure client;
  client.setInsecure(); // للتسهيل بدون تحميل شهادة SSL كاملة

  if (client.connect("api.telegram.org", 443)) {
    String url = "/bot" + String(botToken) + "/sendMessage?chat_id=" + String(chatID) + "&text=" + message;
    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                 "Host: api.telegram.org\r\n" +
                 "Connection: close\r\n\r\n");
    Serial.println(F("تم إرسال إشعار الإنذار إلى تيليجرام بنجاح!"));
  }
}

void setup() {
  Serial.begin(115200);
  pinMode(PIN_PIR, INPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  pinMode(PIN_LED, OUTPUT);

  digitalWrite(PIN_BUZZER, LOW);
  digitalWrite(PIN_LED, LOW);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);
  Serial.println(F("نظام الحراسة الذكي متصل وجاهز للرصد..."));
}

void loop() {
  int pirState = digitalRead(PIN_PIR);

  if (pirState == HIGH) {
    unsigned long now = millis();
    if (now - lastAlarmTime > 10000) { // منع التكرار لأكثر من مرة كل 10 ثوانٍ
      lastAlarmTime = now;
      Serial.println(F("🚨 تحذير أمني: تم رصد حركة واقتحام في المنطقة المراقبة!"));
      
      // إطلاق صفارة الإنذار ووميض LED
      digitalWrite(PIN_LED, HIGH);
      for (int i = 0; i < 5; i++) {
        digitalWrite(PIN_BUZZER, HIGH); delay(100);
        digitalWrite(PIN_BUZZER, LOW);  delay(100);
      }
      digitalWrite(PIN_LED, LOW);

      // إرسال رسالة تيليجرام الفورية
      sendTelegramAlert("🚨 تنبيه أمني عاجل: تم رصد حركة واقتحام في الموقع!");
    }
  }
  delay(50);
}
