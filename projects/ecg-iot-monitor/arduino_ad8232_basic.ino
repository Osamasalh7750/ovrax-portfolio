/*
  =============================================================================
  مشروع: جهاز مراقبة تخطيط القلب (ECG Monitor) - الكود الأساسي للأردوينو
  الحساس: AD8232 Single Lead Heart Rate Monitor
  المتحكم: Arduino Uno / Nano / Mega
  المطور: منصة إلكترونيات القلب وإنترنت الأشياء (ECG & IoT Dashboard)
  =============================================================================
  
  توصيل الأطراف (Pin Wiring):
  - AD8232 GND   -> Arduino GND
  - AD8232 3.3V  -> Arduino 3.3V (تنبيه: لا توصله بـ 5V لحماية الحساس)
  - AD8232 OUTPUT-> Arduino A0 (مدخل تناظري)
  - AD8232 LO-   -> Arduino Pin 11 (اكتشاف انفصال القطب السالب)
  - AD8232 LO+   -> Arduino Pin 10 (اكتشاف انفصال القطب الموجب)
  - AD8232 SDN   -> غير موصول (أو HIGH للتشغيل)
  =============================================================================
*/

// تعريف الأطراف
const int PIN_OUTPUT = A0;   // طرف إشارة تخطيط القلب التناظرية
const int PIN_LO_MINUS = 11; // طرف تنبيه انفصال القطب LO-
const int PIN_LO_PLUS = 10;  // طرف تنبيه انفصال القطب LO+

// متغيرات القراءة
int rawECG = 0;
bool leadsConnected = true;

void setup() {
  // تهيئة الاتصال التسلسلي بسرعة عالية لضمان دقة رسم الإشارة
  Serial.begin(115200);
  
  // تهيئة أطراف اكتشاف انفصال الأقطاب
  pinMode(PIN_LO_MINUS, INPUT);
  pinMode(PIN_LO_PLUS, INPUT);
  
  Serial.println(F("========================================"));
  Serial.println(F("نظام مراقبة تخطيط القلب AD8232 - أردوينو"));
  Serial.println(F("افتح Serial Plotter (Ctrl+Shift+L) لرؤية النبض"));
  Serial.println(F("========================================"));
  delay(1000);
}

void loop() {
  // فحص أطراف LO+ و LO-
  // إذا كان أي منهما HIGH، فهذا يعني أن أحد الأقطاب منفصل عن الجلد
  if ((digitalRead(PIN_LO_MINUS) == 1) || (digitalRead(PIN_LO_PLUS) == 1)) {
    leadsConnected = false;
    // طباعة قيمة محايدة لتحذير الراسم التسلسلي
    Serial.println(0); 
  } else {
    leadsConnected = true;
    // قراءة الجهد التناظري من الحساس (بين 0 و 1023 في الأردوينو 10-bit ADC)
    rawECG = analogRead(PIN_OUTPUT);
    
    // إرسال القيمة عبر المنفذ التسلسلي
    // يمكنك فتح أدوات -> Serial Plotter لرؤية الموجة القلبية مباشرة
    Serial.println(rawECG);
  }
  
  // معدل أخذ عينات مناسب (حوالي 250 إلى 300 عينة في الثانية)
  // تأخير بمقدار 4 مللي ثانية يعطي تردد أخذ عينات ~250Hz
  delay(4);
}
