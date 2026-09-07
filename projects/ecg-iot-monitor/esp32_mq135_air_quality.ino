/*
 * =====================================================================================
 * مشروع إنترنت الأشياء #13: نظام مراقبة جودة الهواء ونقاء الغرف ومؤشر AQI
 * المتحكم: ESP32 NodeMCU | الحساسات: MQ-135 + PM2.5 PMS5003 + مروحة تنقية
 * البرتوكول: MQTT + Web Dashboard
 * =====================================================================================
 */
#include <WiFi.h>
#include <PubSubClient.h>

const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";
const char* mqtt_server = "io.adafruit.com";

WiFiClient espClient;
PubSubClient client(espClient);

const int PIN_MQ135 = 34;      // مدخل تناظري لحساس الغازات MQ-135
const int PIN_FAN_RELAY = 26;  // مخرج تشغيل مروحة التنقية والشفط
const int PIN_BUZZER = 25;     // مخرج صفارة الإنذار

const float V_REF = 3.3;
const float RL = 10.0;         // مقاومة الحمل بالكيلو أوم
float Ro = 24.5;               // مقاومة الحساس في الهواء النقي (معايرة)

unsigned long lastMsg = 0;

void setup() {
  Serial.begin(115200);
  pinMode(PIN_FAN_RELAY, OUTPUT);
  pinMode(PIN_BUZZER, OUTPUT);
  digitalWrite(PIN_FAN_RELAY, LOW); // المروحة متوقفة مبدئياً
  digitalWrite(PIN_BUZZER, LOW);

  analogSetAttenuation(ADC_ATTEN_DB_11);

  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi...");
  int retries = 0;
  while (WiFi.status() != WL_CONNECTED && retries < 15) {
    delay(500);
    Serial.print(".");
    retries++;
  }
  Serial.println("\nWiFi Connected. Air Quality Monitor Initialized.");
  client.setServer(mqtt_server, 1883);
}

float calculateAQI(int rawAdc) {
  float vOut = (rawAdc / 4095.0) * V_REF;
  if (vOut <= 0.1) return 15.0;
  float Rs = ((V_REF - vOut) / vOut) * RL;
  float ratio = Rs / Ro;
  // معادلة تقريبية لحساب تركيز CO2 والغازات الملوثة بـ PPM
  float ppm = 116.6 * pow(ratio, -2.76);
  // تحويل PPM لمؤشر AQI القياسي (0 - 500)
  float aqi = constrain(ppm * 0.45, 10.0, 500.0);
  return aqi;
}

void loop() {
  int rawAdc = analogRead(PIN_MQ135);
  float aqi = calculateAQI(rawAdc);

  // منطق التحكم بالمروحة والإنذار
  if (aqi > 150.0) { // هواء غير صحي أو ملوث
    digitalWrite(PIN_FAN_RELAY, HIGH); // تشغيل مروحة الشفط والتنقية فوراً
    if (aqi > 250.0) {
      digitalWrite(PIN_BUZZER, HIGH);  // إنذار صوتي في حالات التلوث الحرج
    } else {
      digitalWrite(PIN_BUZZER, LOW);
    }
  } else if (aqi < 90.0) { // عودة الهواء للنقاء مع نطاق Hysteresis
    digitalWrite(PIN_FAN_RELAY, LOW);
    digitalWrite(PIN_BUZZER, LOW);
  }

  if (millis() - lastMsg > 3000) {
    lastMsg = millis();
    Serial.print("Raw ADC: "); Serial.print(rawAdc);
    Serial.print(" | AQI Index: "); Serial.print(aqi, 1);
    Serial.print(" | Purifier Fan: ");
    Serial.println(digitalRead(PIN_FAN_RELAY) ? "ON (Purifying)" : "OFF (Clean)");

    if (client.connected()) {
      char payload[64];
      snprintf(payload, sizeof(payload), "{\"aqi\":%.1f,\"fan\":%d}", aqi, digitalRead(PIN_FAN_RELAY));
      client.publish("sensors/air_quality", payload);
    }
  }
}
