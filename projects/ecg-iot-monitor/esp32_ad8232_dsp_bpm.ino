/*
  =============================================================================
  مشروع: جهاز مراقبة تخطيط القلب المتقدم مع ESP32 (Digital Signal Processing)
  المتحكم: ESP32 DevKit V1
  الحساس: AD8232 Single Lead Heart Rate Monitor
  الميزات: فلترة رقمية 50Hz Notch + كشف قمة R-Peak وحساب نبضات القلب (BPM)
  =============================================================================
  
  توصيل الأطراف (Pin Wiring - ESP32):
  - AD8232 GND   -> ESP32 GND
  - AD8232 3.3V  -> ESP32 3V3 (مصدر جهد منظم 3.3V)
  - AD8232 OUTPUT-> ESP32 GPIO 34 (قناة ADC1_CH6 - لا تتعارض مع الواي فاي)
  - AD8232 LO-   -> ESP32 GPIO 19
  - AD8232 LO+   -> ESP32 GPIO 18
  =============================================================================
*/

// تعريف الأطراف
const int PIN_ECG_IN = 34;   // مدخل تناظري (ADC1)
const int PIN_LO_MINUS = 19; // قطب سالب مفصول
const int PIN_LO_PLUS = 18;  // قطب موجب مفصول

// متغيرات معالجة الإشارة
int rawValue = 0;
float filteredValue = 0.0;
float baseline = 2048.0; // نقطة المنتصف لمحول ESP32 12-bit (0 - 4095)

// معاملات فلتر الرفض 50Hz Notch Filter (Sampling rate = 250Hz, Notch = 50Hz, Q=10)
float x0 = 0, x1 = 0, x2 = 0;
float y0 = 0, y1 = 0, y2 = 0;

// معاملات الفلتر الرقمي:
const float b0 = 0.956543;
const float b1 = -0.591244;
const float b2 = 0.956543;
const float a1 = -0.591244;
const float a2 = 0.913087;

// خوارزمية حساب معدل ضربات القلب (BPM Peak Detection)
unsigned long lastBeatTime = 0;
unsigned long currentBeatTime = 0;
int heartRateBPM = 72;
float adaptiveThreshold = 2400.0;
bool peakDetected = false;

// فلتر إزالة تشويش 50 هرتز الناتج عن خطوط الكهرباء
float applyNotchFilter(float input) {
  x2 = x1;
  x1 = x0;
  x0 = input;
  
  y0 = (b0 * x0) + (b1 * x1) + (b2 * x2) - (a1 * y1) - (a2 * y2);
  
  y2 = y1;
  y1 = y0;
  return y0;
}

void setup() {
  Serial.begin(115200);
  
  // ضبط دقة المحول التناظري إلى 12-bit (0 - 4095)
  analogReadResolution(12);
  // ضبط توهين الإشارة ليغطي المدى الكامل حتى 3.3V
  analogSetAttenuation(ADC_11db);
  
  pinMode(PIN_LO_MINUS, INPUT);
  pinMode(PIN_LO_PLUS, INPUT);
  
  Serial.println(F("===================================================="));
  Serial.println(F("ESP32 Advanced ECG & Digital Signal Processing (DSP)"));
  Serial.println(F("مراقبة الإشارة وحساب الـ BPM في الوقت الفعلي"));
  Serial.println(F("===================================================="));
}

void loop() {
  unsigned long now = millis();
  
  // فحص سلامة توصيل الأقطاب
  bool leadOff = (digitalRead(PIN_LO_MINUS) == HIGH || digitalRead(PIN_LO_PLUS) == HIGH);
  
  if (leadOff) {
    Serial.println("Warning: الأقطاب غير متصلة بالجلد! تأكد من وضع الجيل واللاصق.");
    delay(200);
    return;
  }
  
  // 1. قراءة الإشارة الخام من ADC
  rawValue = analogRead(PIN_ECG_IN);
  
  // 2. تطبيق فلتر رفض تردد الشبكة الكهربائية 50Hz (Powerline Hum Rejection)
  filteredValue = applyNotchFilter(rawValue);
  
  // 3. كشف قمة موجة R وحساب النبض (R-Peak Detection)
  // القيمة المرجعية التكيفية ترتفع وتنخفض بحسب متوسط الإشارة
  if (filteredValue > adaptiveThreshold && !peakDetected) {
    // التأكد من مرور 250ms على الأقل لتجنب احتساب موجة T كـ R-peak (معدل نبض أقصى 240 BPM)
    if (now - lastBeatTime > 250) {
      currentBeatTime = now;
      unsigned long rrInterval = currentBeatTime - lastBeatTime;
      lastBeatTime = currentBeatTime;
      
      // حساب النبض في الدقيقة (60000 مللي ثانية / فاصل RR)
      if (rrInterval > 0) {
        int instantaneousBPM = 60000 / rrInterval;
        // تقييد النبض ضمن المدى الطبيعي والمنطقي طبياً (40 - 200 BPM)
        if (instantaneousBPM >= 40 && instantaneousBPM <= 200) {
          // حساب متوسط متحرك ناعم للنبض
          heartRateBPM = (heartRateBPM * 0.7) + (instantaneousBPM * 0.3);
        }
      }
      peakDetected = true;
    }
  }
  
  // إعادة ضبط حالة القمة عند عودة الإشارة للخط الأساسي
  if (filteredValue < (adaptiveThreshold * 0.92)) {
    peakDetected = false;
  }
  
  // تحديث العتبة التكيفية ببطء لمواكبة تغير وضعية المريض
  adaptiveThreshold = (adaptiveThreshold * 0.995) + (filteredValue * 0.005) + 30.0;
  
  // 4. طباعة البيانات إلى Serial Plotter بتنسيق متعدد المتغيرات
  // صيغة العرض: Raw, Filtered, BPM, Threshold
  Serial.print("Raw:");
  Serial.print(rawValue);
  Serial.print(",");
  Serial.print("Filtered:");
  Serial.print(filteredValue);
  Serial.print(",");
  Serial.print("BPM:");
  Serial.print(heartRateBPM);
  Serial.print(",");
  Serial.print("Threshold:");
  Serial.println(adaptiveThreshold);
  
  // ضبط زمن العينة لتردد 250Hz (4ms)
  delay(4);
}
