/*
  =============================================================================
  مشروع: مراقبة تخطيط القلب عبر سحابة Adafruit IO باستخدام بروتوكول MQTT
  المتحكم: ESP32 DevKit V1
  الحساس: AD8232 ECG Sensor
  البروتوكول: MQTT (Message Queuing Telemetry Transport)
  =============================================================================
*/

#include <WiFi.h>
#include <PubSubClient.h>

// إعدادات شبكة الواي فاي
const char* ssid = "YOUR_WIFI_SSID";
const char* password = "YOUR_WIFI_PASSWORD";

// إعدادات منصة Adafruit IO
const char* mqtt_server = "io.adafruit.com";
const int mqtt_port = 1883;
const char* io_username = "YOUR_ADAFRUIT_USERNAME";
const char* io_key = "YOUR_ADAFRUIT_AIO_KEY";

// مسارات مواضيع MQTT (Feeds)
const char* topic_bpm    = "YOUR_ADAFRUIT_USERNAME/feeds/ecg-bpm";
const char* topic_status = "YOUR_ADAFRUIT_USERNAME/feeds/ecg-status";

WiFiClient espClient;
PubSubClient client(espClient);

// أطراف الحساس
const int PIN_ECG_IN   = 34;
const int PIN_LO_MINUS = 19;
const int PIN_LO_PLUS  = 18;

unsigned long lastMqttPublish = 0;
int currentBPM = 72;
bool leadOff = false;

void connectWiFi() {
  Serial.print("Connecting to WiFi: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected! IP: " + WiFi.localIP().toString());
}

void reconnectMQTT() {
  while (!client.connected()) {
    Serial.print("Connecting to Adafruit IO MQTT...");
    // استخدام اسم المستخدم ومفتاح AIO كمصادقة
    if (client.connect("ESP32_ECG_Client", io_username, io_key)) {
      Serial.println(" Connected to Adafruit IO!");
      client.publish(topic_status, "ECG Device Online");
    } else {
      Serial.print(" Failed, rc=");
      Serial.print(client.state());
      Serial.println(" Retrying in 5 seconds...");
      delay(5000);
    }
  }
}

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);
  pinMode(PIN_LO_MINUS, INPUT);
  pinMode(PIN_LO_PLUS, INPUT);

  connectWiFi();
  client.setServer(mqtt_server, mqtt_port);
}

void loop() {
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();

  leadOff = (digitalRead(PIN_LO_MINUS) == HIGH || digitalRead(PIN_LO_PLUS) == HIGH);

  // إرسال معدل النبض كل 2 ثانية لاحترام حدود معدل Adafruit IO المجاني
  unsigned long now = millis();
  if (now - lastMqttPublish > 2000) {
    lastMqttPublish = now;

    if (leadOff) {
      client.publish(topic_status, "Electrodes Disconnected ⚠️");
      Serial.println("Published: Leads Disconnected");
    } else {
      char bpmString[8];
      dtostrf(currentBPM, 1, 0, bpmString);
      client.publish(topic_bpm, bpmString);
      client.publish(topic_status, "Normal Monitoring ✅");
      Serial.print("Published BPM: ");
      Serial.println(bpmString);
    }
  }

  // كشف قمم النبض السريعة
  delay(10);
}
