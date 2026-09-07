/*
  =============================================================================
  مشروع: تسجيل بيانات تخطيط القلب على منصة Firebase Realtime Database
  المتحكم: ESP32 DevKit V1
  الحساس: AD8232 ECG Sensor
  السحابة: Google Firebase Realtime Database (سجل طبي زمني للمريض)
  =============================================================================
*/

#include <WiFi.h>
#include <HTTPClient.h>

// إعدادات شبكة الواي فاي
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// رابط مشروع Firebase Realtime Database ومفتاح المصادقة
const char* firebaseUrl = "https://your-project-id-default-rtdb.firebaseio.com/patients/patient_01/telemetry.json";
const char* databaseSecret = "YOUR_FIREBASE_DATABASE_SECRET"; // أو استخدام Firebase REST Auth

// أطراف الحساس
const int PIN_ECG_IN   = 34;
const int PIN_LO_MINUS = 19;
const int PIN_LO_PLUS  = 18;

unsigned long lastFirebaseUpload = 0;
int heartRateBPM = 74;

void sendDataToFirebase(int bpm, bool leadsOk) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    
    // إضافة مصادقة السجل
    String url = String(firebaseUrl) + "?auth=" + databaseSecret;
    http.begin(url);
    http.addHeader("Content-Type", "application/json");
    
    // تكوين حمولة JSON للبيانات الطبية
    String jsonPayload = "{";
    jsonPayload += "\"bpm\":" + String(bpm) + ",";
    jsonPayload += "\"leads_attached\":" + String(leadsOk ? "true" : "false") + ",";
    jsonPayload += "\"timestamp\":{\".sv\":\"timestamp\"},";
    jsonPayload += "\"status\":\"" + String(leadsOk ? (bpm > 100 ? "Tachycardia" : (bpm < 60 ? "Bradycardia" : "Normal")) : "Leads Off") + "\"";
    jsonPayload += "}";
    
    int httpResponseCode = http.PUT(jsonPayload); // تحديث القراءة اللحظية
    
    if (httpResponseCode > 0) {
      Serial.print("Firebase Update OK, Response code: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Error sending PUT: ");
      Serial.println(httpResponseCode);
    }
    
    http.end();
  }
}

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);
  pinMode(PIN_LO_MINUS, INPUT);
  pinMode(PIN_LO_PLUS, INPUT);
  
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nConnected to WiFi!");
}

void loop() {
  bool leadsOk = !(digitalRead(PIN_LO_MINUS) == HIGH || digitalRead(PIN_LO_PLUS) == HIGH);
  
  // رفع البيانات للسحابة كل 3 ثوانٍ
  unsigned long now = millis();
  if (now - lastFirebaseUpload > 3000) {
    lastFirebaseUpload = now;
    sendDataToFirebase(heartRateBPM, leadsOk);
  }
  
  delay(10);
}
