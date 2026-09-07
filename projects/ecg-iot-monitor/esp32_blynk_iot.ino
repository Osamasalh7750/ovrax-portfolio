/*
  =============================================================================
  مشروع: جهاز مراقبة تخطيط القلب المرتبط بـ Blynk IoT 2.0
  المتحكم: ESP32 DevKit
  الحساس: AD8232 ECG Sensor
  المنصة: Blynk Cloud (Android / iOS / Web Dashboard)
  =============================================================================
*/

// يجب وضع هذه المعرّفات في أعلى الكود دائماً قبل استدعاء مكتبات Blynk
#define BLYNK_TEMPLATE_ID   "TMPLxxxxxx"
#define BLYNK_TEMPLATE_NAME "ECG Telemedicine Monitor"
#define BLYNK_AUTH_TOKEN    "YOUR_BLYNK_AUTH_TOKEN_HERE"

#define BLYNK_PRINT Serial

#include <WiFi.h>
#include <WiFiClient.h>
#include <BlynkSimpleEsp32.h>

// بيانات شبكة الواي فاي المنزلية
char ssid[] = "YOUR_WIFI_SSID";
char pass[] = "YOUR_WIFI_PASSWORD";

// تعريف أطراف الحساس مع ESP32
const int PIN_ECG_IN   = 34; // قراءة تناظرية ADC1
const int PIN_LO_MINUS = 19; // انفصال القطب السالب
const int PIN_LO_PLUS  = 18; // انفصال القطب الموجب

// متغيرات النبض والفلاتر
BlynkTimer timer;
int rawECG = 0;
int heartRateBPM = 75;
bool leadOff = false;
unsigned long lastBeatTime = 0;
float adaptiveThreshold = 2200.0;
bool peakDetected = false;

// دالة إرسال النبض والإنذارات كل 1 ثانية إلى Blynk
void sendHeartTelemetry() {
  if (leadOff) {
    Blynk.virtualWrite(V0, "منفصل ⚠️");
    Blynk.virtualWrite(V1, 0); // تصفير النبض
    return;
  }
  
  Blynk.virtualWrite(V0, "متصل ومستقر ✅");
  Blynk.virtualWrite(V1, heartRateBPM);
  
  // فحص الحالات الحرجة وإرسال إشعار فوري لهاتف الطبيب / المريض
  if (heartRateBPM > 120) {
    Blynk.logEvent("tachycardia_alert", String("تحذير طبي: تسارع نبضات القلب مكتشف! المعدل: ") + heartRateBPM + " BPM");
  } else if (heartRateBPM < 50 && heartRateBPM > 0) {
    Blynk.logEvent("bradycardia_alert", String("تحذير طبي: تباطؤ حاد في نبضات القلب! المعدل: ") + heartRateBPM + " BPM");
  }
}

// دالة إرسال الإشارة اللحظية لرسم التخطيط الحي (SuperChart) كل 20ms
void sendWaveform() {
  if (!leadOff) {
    Blynk.virtualWrite(V2, rawECG);
  } else {
    Blynk.virtualWrite(V2, 0);
  }
}

void setup() {
  Serial.begin(115200);
  
  analogReadResolution(12);
  analogSetAttenuation(ADC_11db);
  
  pinMode(PIN_LO_MINUS, INPUT);
  pinMode(PIN_LO_PLUS, INPUT);
  
  // بدء الاتصال بمنصة Blynk
  Blynk.begin(BLYNK_AUTH_TOKEN, ssid, pass);
  
  // جدولة المهام: إرسال النبض والإنذارات كل ثانية، وبث الإشارة كل 25 مللي ثانية
  timer.setInterval(1000L, sendHeartTelemetry);
  timer.setInterval(25L, sendWaveform);
  
  Serial.println(F("Blynk IoT ECG Monitor Started!"));
}

void loop() {
  Blynk.run();
  timer.run();
  
  // فحص أطراف انفصال الأقطاب
  leadOff = (digitalRead(PIN_LO_MINUS) == HIGH || digitalRead(PIN_LO_PLUS) == HIGH);
  
  if (!leadOff) {
    rawECG = analogRead(PIN_ECG_IN);
    
    // خوارزمية كشف قمة R وحساب BPM
    unsigned long now = millis();
    if (rawECG > adaptiveThreshold && !peakDetected) {
      if (now - lastBeatTime > 250) {
        unsigned long rr = now - lastBeatTime;
        lastBeatTime = now;
        if (rr > 0) {
          int instantBPM = 60000 / rr;
          if (instantBPM >= 40 && instantBPM <= 200) {
            heartRateBPM = (heartRateBPM * 0.75) + (instantBPM * 0.25);
          }
        }
        peakDetected = true;
      }
    }
    
    if (rawECG < (adaptiveThreshold * 0.9)) {
      peakDetected = false;
    }
    
    adaptiveThreshold = (adaptiveThreshold * 0.99) + (rawECG * 0.01) + 25.0;
  }
}
