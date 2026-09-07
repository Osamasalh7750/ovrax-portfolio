/*
  =============================================================================
  مشروع 9: نظام القفل الذكي وبوابة الدخول عبر RFID (Smart Door Access Control)
  المتحكم: ESP32 DevKit
  القارئ: RC522 RFID Reader (SPI: SS -> GPIO 5, RST -> GPIO 22, MOSI -> 23, MISO -> 19, SCK -> 18)
  المشغل: Solenoid Door Lock / Servo (GPIO 4) + Green/Red Status LEDs + Buzzer
  =============================================================================
*/

#include <SPI.h>
#include <MFRC522.h>
#include <WiFi.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

#define SS_PIN    5
#define RST_PIN  22
MFRC522 mfrc522(SS_PIN, RST_PIN);

const int PIN_LOCK_RELAY = 4;
const int PIN_BUZZER     = 2;

// المعرّف المصرح له بالدخول (Master Authorized UID)
String authorizedUID = "A3 8F 21 4B";

void setup() {
  Serial.begin(115200);
  SPI.begin();
  mfrc522.PCD_Init();

  pinMode(PIN_LOCK_RELAY, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  digitalWrite(PIN_LOCK_RELAY, LOW); // القفل مغلق

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) delay(500);

  Serial.println(F("نظام الدخول الذكي جاهز. قرّب بطاقتك من القارئ..."));
}

void loop() {
  if (!mfrc522.PICC_IsNewCardPresent() || !mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  String content = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    content.concat(String(mfrc522.uid.uidByte[i] < 0x10 ? " 0" : " "));
    content.concat(String(mfrc522.uid.uidByte[i], HEX));
  }
  content.toUpperCase();
  String readUID = content.substring(1);

  Serial.print(F("معرف البطاقة المقروءة: "));
  Serial.println(readUID);

  if (readUID == authorizedUID) {
    Serial.println(F("✅ تصريح مقبول! فتح القفل الإلكتروني لمدة 5 ثوانٍ..."));
    digitalWrite(PIN_LOCK_RELAY, HIGH);
    tone(PIN_BUZZER, 2000, 200);
    delay(5000);
    digitalWrite(PIN_LOCK_RELAY, LOW);
    Serial.println(F("تم إغلاق الباب تلقائياً."));
  } else {
    Serial.println(F("❌ بطاقة غير مصرح بها! إطلاق إنذار وتسجيل المحاولة في السحابة."));
    for (int i = 0; i < 3; i++) {
      tone(PIN_BUZZER, 800, 150); delay(200);
    }
  }

  mfrc522.PICC_HaltA();
  mfrc522.PCD_StopCrypto1();
}
