/**
 * قاعدة بيانات متجر الأثاث الفاخر (50 منتجاً متكاملاً)
 * يحتوي كل منتج على تفاصيل دقيقة، أبعاد، خامات، مزايا، وصور عالية الجودة
 */

window.CATEGORIES = [
  { id: 'all', name: 'جميع المعروضات', icon: 'fa-gem' },
  { id: 'living-room', name: 'غرف المعيشة والكنب', icon: 'fa-couch' },
  { id: 'bedroom', name: 'غرف النوم والسرائر', icon: 'fa-bed' },
  { id: 'dining-room', name: 'غرف وسفر الطعام', icon: 'fa-utensils' },
  { id: 'office', name: 'أثاث المكاتب المنزلية', icon: 'fa-briefcase' },
  { id: 'outdoor', name: 'أثاث الحدائق والخارجي', icon: 'fa-umbrella-beach' },
  { id: 'decor', name: 'المفروشات والديكور', icon: 'fa-lightbulb' }
];

window.INITIAL_PRODUCTS = [
  // --- غرف المعيشة والكنب (12 منتج) ---
  {
    id: 1,
    title: "طقم كنب رويال إمبيريال 7 مقاعد - مخمل رمادي لؤلؤي",
    category: "living-room",
    categoryName: "غرف المعيشة والكنب",
    price: 5490,
    oldPrice: 6990,
    rating: 4.9,
    reviewsCount: 42,
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "طقم كنب فاخر يجمع بين الأصالة الملكية والراحة العصرية، مصنوع من هيكل خشب الزان الروماني المتين مع تنجيد من المخمل التركي الفاخر المعالج ضد البقع.",
    dimensions: "كنبة ثلاثية: 230×90×85 سم | ثنائية: 180×90×85 سم | مفردتان: 90×85×90 سم",
    material: "خشب زان طبيعي 100% + إسفنج عالي المرونة HR 38 + قماش مخمل أوروبي",
    colors: [
      { name: "رمادي لؤلؤي", hex: "#B0B7BD" },
      { name: "أخضر زمردي", hex: "#234E43" },
      { name: "أزرق ملكي", hex: "#1A365D" }
    ],
    badges: ["توصيل مجاني", "تركيب مجاني", "ضمان 10 سنوات", "خصم 21%"],
    features: [
      "توصيل مجاني وسريع حتى باب المنزل",
      "تركيب مجاني واحترافي بأيدي فنيين معتمدين",
      "ضمان ذهبي 10 سنوات على الهيكل الداخلي والخشب",
      "إسفنج مقعد بتقنية الذاكرة لا يهبط مع مرور الوقت",
      "قماش مقاوم لامتصاص السوائل وسهل التنظيف بمسحة واحدة"
    ],
    inStock: 8,
    isFeatured: true,
    isNew: false
  },
  {
    id: 2,
    title: "كنبة زاوية L-Shape ساندي مودرن مع مسند قدم متنقل",
    category: "living-room",
    categoryName: "غرف المعيشة والكنب",
    price: 3850,
    oldPrice: 4700,
    rating: 4.8,
    reviewsCount: 35,
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "ركنة كنب رحبة ومريحة بتصميم أوروبي انسيابي تمنح غرفة المعيشة دفئاً لا مثيل له مع قماش الكتان الطبيعي المنسوج بعناية.",
    dimensions: "الطول الإجمالي: 290 سم | زاوية الاسترخاء: 185 سم | العمق: 95 سم",
    material: "خشب البلوط الصلب + نسيج كتان طبيعي مقاوم للبكتيريا + حشوة ريش ناعمة",
    colors: [
      { name: "بيج رملي", hex: "#D6C7B2" },
      { name: "رمادي داكن", hex: "#4A4D52" },
      { name: "أبيض كريمي", hex: "#F5F2EB" }
    ],
    badges: ["تركيب مجاني", "الأكثر طلباً", "توصيل سريع"],
    features: [
      "تركيب مجاني فوري في نفس يوم التوصيل",
      "توصيل مباشر مجاني داخل كافة المناطق",
      "ضمان 7 سنوات ضد عيوب الصناعة",
      "أغطية وسائد قابلة للفك والغسيل في الغسالة"
    ],
    inStock: 12,
    isFeatured: true,
    isNew: true
  },
  {
    id: 3,
    title: "كرسي استرخاء شيزلونج ريكلاينر كهربائي مع مساج مدمج",
    category: "living-room",
    categoryName: "غرف المعيشة والكنب",
    price: 2150,
    oldPrice: 2800,
    rating: 4.9,
    reviewsCount: 56,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "أقصى درجات الراحة بعد يوم طويل مع محرك هادئ فائق السلاسة لتعديل زاوية الانحناء، مدعوم بنقاط تدليك مدمجة ومنفذ USB للشحن السريع.",
    dimensions: "العرض: 95 سم | العمق: 90 سم | الارتفاع: 105 سم (يمتد لـ 170 سم)",
    material: "جلد إيطالي نابا فاخر ناعم + ميكانيزم فولاذي مطلي حرارياً",
    colors: [
      { name: "بني هافان كلاسيك", hex: "#5C3A21" },
      { name: "أسود ملكي", hex: "#1C1C1C" },
      { name: "بيج كابتشينو", hex: "#C4A482" }
    ],
    badges: ["توصيل مجاني", "شحن USB مدمج", "ضمان 5 سنوات"],
    features: [
      "توصيل مجاني للمنزل مع اختبار الجهاز أمام العميل",
      "نظام تدليك بـ 5 برامج متنوعة وتدفئة لمنطقة أسفل الظهر",
      "محرك ألماني فائق الهدوء مع تحكم بلمسة زر",
      "حامل أكواب مخفي وجيوب جانبية للكتب والأجهزة"
    ],
    inStock: 15,
    isFeatured: true,
    isNew: false
  },
  {
    id: 4,
    title: "طقم طاولات قهوة رخامية متداخلة نيستنج - ثنائي ذهبي",
    category: "living-room",
    categoryName: "غرف المعيشة والكنب",
    price: 1350,
    oldPrice: 1750,
    rating: 4.7,
    reviewsCount: 29,
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "تصميم مذهل يجمع بين سطح الرخام الإسباني الطبيعي كلكتا وقواعد الستانلس ستيل المقاوم للصدأ المطلي بماء الذهب عيار 24 بلمسة مصقولة.",
    dimensions: "الطاولة الكبيرة: قطر 80 سم × ارتفاع 45 سم | الصغيرة: قطر 60 سم × ارتفاع 40 سم",
    material: "رخام كلكتا طبيعي مقاوم للحرارة + ستانلس ستيل مطلي PVD مقاوم للخدش",
    colors: [
      { name: "أبيض مع عروق رمادية", hex: "#EBEBEB" },
      { name: "أسود ماركينا مع ذهبي", hex: "#2B2B2B" }
    ],
    badges: ["تركيب مجاني", "رخام طبيعي", "توصيل آمن"],
    features: [
      "توصيل مجاني في صناديق خشبية مبطنة ضد الكسر",
      "تركيب وتلميع مجاني عند التسليم",
      "رخام معالج كيميائياً ضد بقع القهوة والمشروبات"
    ],
    inStock: 10,
    isFeatured: false,
    isNew: false
  },
  {
    id: 5,
    title: "كنبة تشيسترفيلد جلدية أيقونية عريضة 3 مقاعد",
    category: "living-room",
    categoryName: "غرف المعيشة والكنب",
    price: 4300,
    oldPrice: 5200,
    rating: 4.9,
    reviewsCount: 31,
    images: [
      "https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "الأناقة البريطانية الكلاسيكية في أبهى صورها بتطريزات أزرار كابوتونيه يدوية الصنع تضفي فخامة لا تضاهى على صالون الاستقبال.",
    dimensions: "الطول: 235 سم | العمق: 95 سم | الارتفاع: 78 سم",
    material: "جلد بقر طبيعي مدبوغ نباتياً + هيكل خشب زان مجفف بالفرن",
    colors: [
      { name: "كونياك دافئ", hex: "#7E3817" },
      { name: "أخضر إنجليزي داكن", hex: "#1B3B2B" },
      { name: "أسود فاحم", hex: "#1A1A1A" }
    ],
    badges: ["صناعة يدوية", "توصيل مجاني", "ضمان 10 سنوات"],
    features: [
      "توصيل وتركيب مجاني بواسطة خبراء الأثاث الكلاسيكي",
      "ضمان 10 سنوات على الجلد والخشب الداخلي",
      "كابوتونيه يدوي متقن بأزرار مثبتة بعقد مضاعفة"
    ],
    inStock: 5,
    isFeatured: true,
    isNew: false
  },
  {
    id: 6,
    title: "طقم كنب نيو-مودرن سكاندينافي 5 مقاعد من الكشمير الخفيف",
    category: "living-room",
    categoryName: "غرف المعيشة والكنب",
    price: 3600,
    oldPrice: 4200,
    rating: 4.8,
    reviewsCount: 22,
    images: [
      "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "بساطة هندسية مستوحاة من الطراز الاسكندنافي المعاصر مع أرجل من خشب الجوز الأمريكي الطبيعي لإطلالة عصرية أنيقة ومتجددة.",
    dimensions: "كنبة 3 مقاعد: 215×85×80 سم | كنبة مقعدين: 165×85×80 سم",
    material: "خشب جوز طبيعي + صوف كشمير مهجن فائق النعومة",
    colors: [
      { name: "رمادي ضبابي", hex: "#CCD0D5" },
      { name: "خردلي هادئ", hex: "#D4AF37" },
      { name: "وردي ترابي", hex: "#D8A49B" }
    ],
    badges: ["توصيل مجاني", "تركيب مجاني"],
    features: [
      "توصيل مجاني سريع خلال 48 ساعة",
      "تركيب وتجهيز مجاني للغرفة",
      "خامات صديقة للبيئة وخالية تماماً من الروائح الكيميائية"
    ],
    inStock: 9,
    isFeatured: false,
    isNew: true
  },
  {
    id: 7,
    title: "كرسي صالون آرم تشير أرستقراطي مخملي بقاعدة دوارة 360",
    category: "living-room",
    categoryName: "غرف المعيشة والكنب",
    price: 1190,
    oldPrice: 1500,
    rating: 4.7,
    reviewsCount: 18,
    images: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "كرسي قراءة واستقبال فائق الأناقة مع مسند ظهر مقوس يدعم فقرات العمود الفقري بحرية دوران كاملة وقاعدة معدنية مذهبة.",
    dimensions: "العرض: 82 سم | العمق: 80 سم | الارتفاع: 85 سم",
    material: "قماش بوكليه تيدي ناعم + قاعدة ستانلس ستيل مطفي ذهبي",
    colors: [
      { name: "أوف وايت كريمي", hex: "#FAF8F5" },
      { name: "وردي باودر", hex: "#E6C2BF" },
      { name: "أخضر زيتوني", hex: "#556B2F" }
    ],
    badges: ["توصيل مجاني", "دوران 360 درجة"],
    features: [
      "توصيل مجاني حتى باب الشقة",
      "جاهز للاستخدام الفوري بدون الحاجة لأدوات تركيب معقدة",
      "ضمان 3 سنوات على الميكانيزم الدوار"
    ],
    inStock: 14,
    isFeatured: false,
    isNew: false
  },
  {
    id: 8,
    title: "طاولة تلفزيون جدارية معلقة مع إضاءة LED ذكية مدمجة",
    category: "living-room",
    categoryName: "غرف المعيشة والكنب",
    price: 1890,
    oldPrice: 2350,
    rating: 4.8,
    reviewsCount: 27,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "وحدة تلفزيون جدارية بتصميم مينيمالي انسيابي تحتوي على أدراج تخزين هيدروليكية بلمسة فتح Push-to-Open ومسارات مخفية لتنظيم الأسلاك.",
    dimensions: "الطول: 220 سم | العمق: 38 سم | الارتفاع: 30 سم",
    material: "خشب MDF تايلاندي معالج ضد الرطوبة وقشرة خشب سنديان طبيعية",
    colors: [
      { name: "رمادي حجري مع خشب جوزي", hex: "#5C564C" },
      { name: "أبيض ثلجي رخامي", hex: "#F7F7F7" }
    ],
    badges: ["تركيب جداري مجاني", "إضاءة LED مجانية"],
    features: [
      "خدمة تثبيت جداري وتركيب مجانية شاملة البراغي والقطع الآمنة",
      "شريط إضاءة LED ذكي يتم التحكم فيه عبر الهاتف أو الريموت",
      "أدراج بآلية سوفت كلوز تمنع الارتطام التلقائي"
    ],
    inStock: 11,
    isFeatured: false,
    isNew: true
  },
  {
    id: 9,
    title: "بوف دائري فاخر مع مساحة تخزين سرية وقاعدة مذهبة",
    category: "living-room",
    categoryName: "غرف المعيشة والكنب",
    price: 490,
    oldPrice: 650,
    rating: 4.6,
    reviewsCount: 19,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "قطعة ديكورية وعملية متعددة الاستخدامات، تستخدم كمقعد إضافي أو مسند للأقدام وتوفر مساحة تخزين داخلية رحبة للمفارش والوسائد.",
    dimensions: "القطر: 55 سم | الارتفاع: 45 سم",
    material: "مخمل ناعم مقاوم للماء + قاعدة معدنية مقاومة للصدأ",
    colors: [
      { name: "فيروزي دافئ", hex: "#1976D2" },
      { name: "خردلي ذهبي", hex: "#CBA135" },
      { name: "رمادي دخاني", hex: "#696969" }
    ],
    badges: ["توصيل مجاني", "مساحة تخزين"],
    features: [
      "توصيل مجاني مع تغليف محكم",
      "غطاء ناعم مبطن يصلح كطاولة قهوة صغيرة عند وضع صينية تقديم",
      "قفل هيدروليكي أمان عند رفع الغطاء"
    ],
    inStock: 25,
    isFeatured: false,
    isNew: false
  },
  {
    id: 10,
    title: "كنبة سرير صوفا بد فاخرة ميكانيزم إيطالي سهل الفتح",
    category: "living-room",
    categoryName: "غرف المعيشة والكنب",
    price: 2790,
    oldPrice: 3400,
    rating: 4.8,
    reviewsCount: 38,
    images: [
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "الحل المثالي لغرف الضيوف والشقق الحديثة؛ تتحول من كنبة ثلاثية مريحة إلى سرير نوم مزدوج فاخر بمرتبة طبية في أقل من 5 ثوانٍ.",
    dimensions: "وضع الكنبة: 210×90×88 سم | وضع السرير: 195×145 سم",
    material: "ميكانيزم فولاذي إيطالي + قماش هيدرو-شيلد مانع لامتصاص السوائل",
    colors: [
      { name: "رمادي أنثراسيت", hex: "#383E42" },
      { name: "أزرق نيلي", hex: "#1C3144" }
    ],
    badges: ["توصيل مجاني", "تركيب مجاني", "مرتبة طبية مدمجة"],
    features: [
      "توصيل وتركيب مجاني مع شرح طريقة الفتح والإغلاق للعميل",
      "تتضمن مرتبة بوكيت سبرينغ طبية مريحة للظهر مدمجة مجاناً",
      "ضمان 5 سنوات على المحاور الميكانيكية"
    ],
    inStock: 7,
    isFeatured: true,
    isNew: false
  },
  {
    id: 11,
    title: "طقم كونسول مدخل استيل رخامي مع مرآة دائرية ذات إضاءة خلفية",
    category: "living-room",
    categoryName: "غرف المعيشة والكنب",
    price: 1950,
    oldPrice: 2400,
    rating: 4.9,
    reviewsCount: 24,
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "يمنح مدخل منزلك فخامة تخطف الأنظار، مع سطح رخام أبيض نقي ومرآة كريستال بلجيكي ذات إضاءة خافتة تعمل باللمس.",
    dimensions: "الكونسول: 120×35×85 سم | قطر المرآة: 80 سم",
    material: "رخام ستاتوريو إيطالي + ستانلس ستيل مطلي ذهب تيتانيوم",
    colors: [
      { name: "ذهبي ملكي مع رخام أبيض", hex: "#D4AF37" },
      { name: "فضي كروم مع رخام رمادي", hex: "#C0C0C0" }
    ],
    badges: ["تركيب وتثبيت مجاني", "توصيل آمن"],
    features: [
      "تركيب مجاني للكونسول وتثبيت آمن للمرآة مع توصيل الإضاءة",
      "مفتاح لمس ذكي مدمج للتحكم بشدة الإضاءة",
      "تغليف ضد الصدمات لضمان وصول المرآة سليمة 100%"
    ],
    inStock: 6,
    isFeatured: false,
    isNew: true
  },
  {
    id: 12,
    title: "مكتبة أرفف جدارية مفتوحة بتصميم هندسي مودرن مع خشب الجوز",
    category: "living-room",
    categoryName: "غرف المعيشة والكنب",
    price: 1650,
    oldPrice: 2100,
    rating: 4.7,
    reviewsCount: 16,
    images: [
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "تحفة هندسية تجمع بين أرفف خشب الجوز الطبيعي وهيكل معدني أسود مطفي لعرض الكتب والتحف والمزهريات بأناقة متناهية.",
    dimensions: "الارتفاع: 190 سم | العرض: 110 سم | العمق: 35 سم",
    material: "خشب جوز طبيعي معالج + حديد صلب معالج ضد الصدأ دهان كهرستاتي",
    colors: [
      { name: "جوزي داكن مع أسود", hex: "#3E2723" },
      { name: "بلوط فاتح مع أبيض", hex: "#D7CCC8" }
    ],
    badges: ["تركيب مجاني", "توصيل مجاني"],
    features: [
      "تركيب وتجميع مجاني في الموقع مع تثبيت مضاد للميلان",
      "تتحمل الأوزان الثقيلة حتى 45 كجم لكل رف",
      "ضمان 5 سنوات"
    ],
    inStock: 13,
    isFeatured: false,
    isNew: false
  },

  // --- غرف النوم والسرائر (10 منتجات) ---
  {
    id: 13,
    title: "طقم غرفة نوم ماستر فينيسيا الملكية كاملة 6 قطع",
    category: "bedroom",
    categoryName: "غرف النوم والسرائر",
    price: 9800,
    oldPrice: 12500,
    rating: 5.0,
    reviewsCount: 48,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "غرفة نوم متكاملة تجسد أبهى معايير الفخامة الإيطالية. تتضمن سرير كينج بظهر مبطن ومقوس، دولاب ملابس جرار 6 أبواب، تسريحة مع مرآة LED، و2 كومودينو وبنش سرير أمامي.",
    dimensions: "سرير: 200×200 سم | دولاب: 270×220×65 سم | تسريحة: 150×85×48 سم",
    material: "خشب زان وقشرة أرو طبيعية + تنجيد هيدبورد جلد طبيعي + مرايا عاكسة للضوء",
    colors: [
      { name: "بيج مذهب شامبين", hex: "#E3DAC9" },
      { name: "رمادي ملكي لؤلؤي", hex: "#C7CBD1" }
    ],
    badges: ["توصيل مجاني", "تركيب مجاني شامل", "ضمان 10 سنوات", "الأعلى تقييماً"],
    features: [
      "توصيل مجاني مبرد مع طاقم تركيب محترف متكامل",
      "تجميع وتركيب كامل الغرفة مع ضبط الإضاءات والأدراج الهيدروليكية مجاناً",
      "ضمان 10 سنوات يشمل كافة القطع والمفصلات الألمانية",
      "دولاب ملابس مقسم بعناية مع إضاءة ذكية عند فتح الأبواب"
    ],
    inStock: 4,
    isFeatured: true,
    isNew: false
  },
  {
    id: 14,
    title: "سرير كينج نورديك هيدبورد بوكليه عائم مع أرفف جانبية",
    category: "bedroom",
    categoryName: "غرف النوم والسرائر",
    price: 3650,
    oldPrice: 4400,
    rating: 4.8,
    reviewsCount: 33,
    images: [
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "تصميم سرير عصري فائق النعومة مع مظهر عائم وأقدام مخفية، وظهر سرير عريض مبطن بقماش البوكليه الدافئ يمنح غرفة النوم جواً من الاسترخاء.",
    dimensions: "مقاس المرتبة: 180×200 سم | إجمالي مقاس السرير: 220×215 سم",
    material: "خشب زان طبيعي مدعم بقواطع معدنية + قماش بوكليه تيدي مضاد للحساسية",
    colors: [
      { name: "أوف وايت كريمي", hex: "#F7F5F0" },
      { name: "رمادي ناعم", hex: "#D4D8DD" },
      { name: "وردي باودري", hex: "#E8D3D0" }
    ],
    badges: ["تركيب مجاني", "توصيل مجاني", "تصميم عائم"],
    features: [
      "توصيل مجاني حتى غرفة النوم",
      "تركيب مجاني مع شد وتثبيت القواعد لضمان عدم حدوث أصوات صرير إطلاقاً",
      "ضمان ذهبي 7 سنوات على السرير والهيكل الداخلي"
    ],
    inStock: 9,
    isFeatured: false,
    isNew: true
  },
  {
    id: 15,
    title: "دولاب ملابس زجاجي شفاف فاخر 6 أبواب مع إضاءة سينسور",
    category: "bedroom",
    categoryName: "غرف النوم والسرائر",
    price: 5900,
    oldPrice: 7200,
    rating: 4.9,
    reviewsCount: 29,
    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "دولاب ملابس ملهم مستوحى من بوتيكات الأزياء العالمية، مع واجهات زجاجية عاكسة باللون الدخاني، وإطارات ألمنيوم فحمية وإضاءة خطية تتوهج عند الاقتراب.",
    dimensions: "العرض: 280 سم | الارتفاع: 240 سم | العمق: 60 سم",
    material: "زجاج أمان مقسى 8 ملم عاكس دخاني + إطارات ألمنيوم أنودايز + ألواح خشب ميلامين مقاوم للخدش",
    colors: [
      { name: "زجاج رمادي دخاني مع فريم أسود", hex: "#2C2F33" },
      { name: "زجاج برونزي مع فريم شامبين", hex: "#4A3B32" }
    ],
    badges: ["تركيب مجاني بواسطة متخصصين", "إضاءة ذكية", "ضمان 8 سنوات"],
    features: [
      "فريق تركيب مخصص لتركيب وتوصيل الكهرباء والزجاج مجاناً",
      "مستشعرات حركة تلقائية تضيء الرفوف وتطفئها ذاتياً",
      "أدراج مخصصة للساعات والمجوهرات مبطنة بالمخمل الفاخر",
      "توصيل مجاني بسيارات أثاث مجهزة خصيصاً لحماية الزجاج"
    ],
    inStock: 5,
    isFeatured: true,
    isNew: false
  },
  {
    id: 16,
    title: "تسريحة دريسنج مودرن مع مرآة ذكية وإضاءة LED ثلاثية الألوان",
    category: "bedroom",
    categoryName: "غرف النوم والسرائر",
    price: 2100,
    oldPrice: 2600,
    rating: 4.8,
    reviewsCount: 40,
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "تسريحة أنيقة ومكتملة مع سطح رخامي أنيق و4 أدراج تخزين منظمة لمستحضرات التجميل، بالإضافة لمرآة ذكية تتيح التبديل بين إضاءة النهار، الأبيض، والأصفر الدافئ.",
    dimensions: "التسريحة: 120×45×78 سم | كرسي البف: 40×40×45 سم",
    material: "خشب MDF مطلي بلمسة بيانو لاكيه عالية اللمعان + أرجل ستانلس مذهبة",
    colors: [
      { name: "أبيض رخامي ناصع", hex: "#FFFFFF" },
      { name: "رمادي كشميري", hex: "#A8A29E" }
    ],
    badges: ["تركيب مجاني", "مرآة لمس ذكية", "توصيل مجاني"],
    features: [
      "توصيل وتركيب مجاني مع ضبط المرآة وتوصيل الكهرباء",
      "مرآة لمس تتيح التبديل بين 3 درجات حرارة للإضاءة (دافئ، طبيعي، بارد)",
      "تتضمن كرسي بف مبطن مجاناً متناسق مع التصميم"
    ],
    inStock: 14,
    isFeatured: false,
    isNew: true
  },
  {
    id: 17,
    title: "طقم كومودينو ثنائي فاخر بدرجين مع سطح زجاجي ملون",
    category: "bedroom",
    categoryName: "غرف النوم والسرائر",
    price: 1100,
    oldPrice: 1450,
    rating: 4.7,
    reviewsCount: 21,
    images: [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "طاولات سرير جانبية تكمل تناسق غرفة النوم، بتشطيب ناعم وأدراج صامتة الفتح لحفظ الكتب والأجهزة الشخصية.",
    dimensions: "العرض: 50 سم | العمق: 40 سم | الارتفاع: 50 سم (للقطعة الواحدة)",
    material: "خشب مصنع عالي الكثافة + مقابض نحاسية عتيقة + زجاج مقسى علوي",
    colors: [
      { name: "رمادي أنثراسيت", hex: "#374151" },
      { name: "بيج كريمي", hex: "#E5E0D8" }
    ],
    badges: ["طقم قطعتين", "توصيل مجاني"],
    features: [
      "سعر الطقم يشمل قطعتين لجهتي السرير",
      "توصيل مجاني سريع حتى الباب",
      "أدراج مبطنة لحماية المقتنيات من الخدش"
    ],
    inStock: 18,
    isFeatured: false,
    isNew: false
  },
  {
    id: 18,
    title: "سرير أطفال وشباب بتصميم كابينة مع وحدات تخزين وسرير سحاب",
    category: "bedroom",
    categoryName: "غرف النوم والسرائر",
    price: 2450,
    oldPrice: 3100,
    rating: 4.8,
    reviewsCount: 36,
    images: [
      "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "سرير مثالي لغرف الأطفال واليافعين، يجمع بين الأمان والعملية القصوى مع سرير إضافي ينسحب بسهولة لاستقبال الضيوف وأدراج لتخزين الألعاب والملابس.",
    dimensions: "السرير الأساسي: 120×200 سم | السرير السحاب: 100×190 سم",
    material: "خشب زان طبيعي وألواح صديقة للأطفال غير سامة ومضادة للخدش",
    colors: [
      { name: "أبيض مع خشب طبيعي", hex: "#ECEFF1" },
      { name: "رمادي فاتح مع أزرق باستيل", hex: "#B0BEC5" }
    ],
    badges: ["توصيل مجاني", "تركيب مجاني", "سرير سحاب مدمج"],
    features: [
      "توصيل وتركيب مجاني وآمن تماماً للأطفال",
      "حواف دائرية مدروسة لحماية الصغار من الاصطدام",
      "ضمان 5 سنوات"
    ],
    inStock: 8,
    isFeatured: false,
    isNew: false
  },
  {
    id: 19,
    title: "شماعة ملابس عمودية فاخرة مع مرآة طولية وقاعدة رخامية",
    category: "bedroom",
    categoryName: "غرف النوم والسرائر",
    price: 750,
    oldPrice: 990,
    rating: 4.6,
    reviewsCount: 15,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "قطعة عملية لتعليق العباءات، المعاطف، والحقائب مع مرآة كاملة الطول وقاعدة رخامية ثقيلة تمنح الثبات والأمان.",
    dimensions: "الارتفاع: 175 سم | قطر القاعدة: 40 سم",
    material: "حديد مصقول مقاوم للصدأ بلون ذهبي مطفي + قاعدة رخام طبيعي",
    colors: [
      { name: "ذهبي شامبين", hex: "#C5A880" },
      { name: "أسود مطفي", hex: "#232323" }
    ],
    badges: ["توصيل مجاني", "رخام طبيعي"],
    features: [
      "توصيل مجاني مريح",
      "سهلة التركيب خلال دقيقتين فقط",
      "قاعدة مانعة للخدش لحماية الباركيه والأرضيات"
    ],
    inStock: 22,
    isFeatured: false,
    isNew: false
  },
  {
    id: 20,
    title: "بنش سرير ملكي مخملي بتصميم كابوتونيه مع أرجل نحاسية",
    category: "bedroom",
    categoryName: "غرف النوم والسرائر",
    price: 950,
    oldPrice: 1250,
    rating: 4.7,
    reviewsCount: 23,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4ef2?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "يوضع أمام مقدمة السرير لإضفاء لمسة فندقية باذخة على غرفة النوم، مع مقعد وثير ومريح للجلوس أثناء ارتداء الملابس والأحذية.",
    dimensions: "الطول: 140 سم | العمق: 45 سم | الارتفاع: 46 سم",
    material: "خشب متين + إسفنج عالي الكثافة + قماش مخمل حريري",
    colors: [
      { name: "أخضر زمردي", hex: "#1A472A" },
      { name: "بيج رملي", hex: "#D2B48C" },
      { name: "رمادي فضي", hex: "#A9A9A9" }
    ],
    badges: ["توصيل مجاني", "جاهز للاستخدام"],
    features: [
      "توصيل مجاني حتى باب الغرفة",
      "خامات عالية الجودة مضادة للبقع وسهلة التنظيف",
      "أرجل معدنية نحاسية فاخرة"
    ],
    inStock: 16,
    isFeatured: false,
    isNew: true
  },
  {
    id: 21,
    title: "مرتبة سرير ملكية أورثوبيديك طبية 7 طبقات زنبركية منفصلة",
    category: "bedroom",
    categoryName: "غرف النوم والسرائر",
    price: 2890,
    oldPrice: 3800,
    rating: 4.9,
    reviewsCount: 64,
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "نوم عميق بلا آلام للظهر، بفضل نوابض البوكيت المنفصلة التي تعزل الحركة تماماً عن الشريك، مع طبقة ميموري فوم جل باردة تمنع التعرق صيفاً.",
    dimensions: "200×200 سم | الارتفاع: 32 سم",
    material: "نوابض بوكيت سبرينغ كربونية + ميموري فوم جل تبريد + قماش أورجانيك قطن 100%",
    colors: [
      { name: "أبيض مطرز بذهبي", hex: "#FDFDFD" }
    ],
    badges: ["توصيل مجاني", "تجربة نوم 100 ليلة", "ضمان 10 سنوات"],
    features: [
      "توصيل مجاني مع إدخال المرتبة وتركيبها على السرير مباشرة",
      "ميزة حصرية: تجربة نوم مجانية لمدة 100 ليلة مع استرجاع كامل المبلغ إن لم تناسبك",
      "عزل تام للحركة لضمان عدم إزعاج الشريك أثناء النوم",
      "معالجة كاملة ضد عث الغبار وحساسية الصدر"
    ],
    inStock: 20,
    isFeatured: true,
    isNew: false
  },
  {
    id: 22,
    title: "وحدة أدراج دريسر واسعة 6 أدراج بتشطيب خشب البلوط المات",
    category: "bedroom",
    categoryName: "غرف النوم والسرائر",
    price: 1750,
    oldPrice: 2200,
    rating: 4.7,
    reviewsCount: 19,
    images: [
      "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "حل مثالي لتنظيم الملابس والمفارش بمساحة تخزين هائلة وتصميم مودرن دافئ ينسجم مع جميع ألوان ديكورات غرف النوم.",
    dimensions: "العرض: 140 سم | العمق: 48 سم | الارتفاع: 85 سم",
    material: "خشب بلوط أوروبي طبيعي + مجاري أدراج تلسكوبية صامتة",
    colors: [
      { name: "بلوط طبيعي فاتح", hex: "#C8AD7F" },
      { name: "خشب محروق كلاسيك", hex: "#4B382A" }
    ],
    badges: ["توصيل مجاني", "تركيب مجاني"],
    features: [
      "توصيل وتركيب مجاني في الموقع المطلوب",
      "تتضمن مثبت أمان جداري مضاد لانقلاب الخزانة مجاناً",
      "أدراج تتحمل حتى 25 كجم للدرج الواحد"
    ],
    inStock: 11,
    isFeatured: false,
    isNew: false
  },

  // --- غرف وسفر الطعام (8 منتجات) ---
  {
    id: 23,
    title: "طقم غرفة طعام ملكية 8 كراسي مع طاولة رخام كلكتا الذهبي",
    category: "dining-room",
    categoryName: "غرف وسفر الطعام",
    price: 7900,
    oldPrice: 9900,
    rating: 5.0,
    reviewsCount: 37,
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "سفرة طعام استثنائية للمناسبات الراقية والعائلية، طاولة بسطح رخام طبيعي مصقول بدقة مع 8 كراسي مريحة منجدة بمخمل مقاوم للبقع وقواعد ستانلس ذهبية.",
    dimensions: "الطاولة: 240×110×76 سم | الكرسي: 55×58×90 سم",
    material: "رخام كلكتا إيطالي طبيعي سمك 25 ملم + قواعد ستيل تيتانيوم ذهبي مقاوم للخدش",
    colors: [
      { name: "رخام أبيض مع كراسي بيج ملكي", hex: "#F3EFEA" },
      { name: "رخام أسود مع كراسي رمادي داكن", hex: "#3A3D40" }
    ],
    badges: ["توصيل مجاني", "تركيب وتلميع مجاني", "ضمان 10 سنوات", "الأكثر مبيعاً"],
    features: [
      "توصيل مجاني بسيارات مجهزة مع فريق تجميع محترف",
      "خدمة تلميع وتطبيق طبقة حماية نانو ضد بقع الزيوت والسوائل الساخنة مجاناً",
      "كراسي مريحة جداً تناسب الجلسات الطويلة مع دعامات أسفل الظهر",
      "ضمان 10 سنوات شامل الطاولة والكراسي"
    ],
    inStock: 6,
    isFeatured: true,
    isNew: false
  },
  {
    id: 24,
    title: "طاولة طعام دائرية مودرن 6 كراسي بتصميم هندسي مع خشب البلوط",
    category: "dining-room",
    categoryName: "غرف وسفر الطعام",
    price: 4200,
    oldPrice: 5100,
    rating: 4.8,
    reviewsCount: 26,
    images: [
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "الطاولة الدائرية المثالية لخلق أجواء حميمية وقريبة بين العائلة والضيوف، مع قاعدة مخروطية نحتية مذهلة تعزز المساحة المتاحة للأقدام.",
    dimensions: "قطر الطاولة: 150 سم | الارتفاع: 76 سم",
    material: "خشب بلوط طبيعي ماسيف 100% + كراسي كتان تركي معالج",
    colors: [
      { name: "خشب طبيعي هادئ", hex: "#D2B48C" },
      { name: "جوزي داكن وقور", hex: "#4A3525" }
    ],
    badges: ["توصيل مجاني", "تركيب مجاني"],
    features: [
      "توصيل مجاني وتركيب مباشر في غرفة الطعام",
      "تصميم القاعدة المركزية يتيح حرية تامة لحركة الأرجل دون الاصطدام بالقوائم",
      "طلاء نهائي مقاوم للحرارة وعلامات الأكواب والصحون الساخنة"
    ],
    inStock: 8,
    isFeatured: false,
    isNew: true
  },
  {
    id: 25,
    title: "بوفيه غرفة طعام فاخر 4 أبواب مع تفاصيل حفر ليزر وسطح رخامي",
    category: "dining-room",
    categoryName: "غرف وسفر الطعام",
    price: 3350,
    oldPrice: 4100,
    rating: 4.9,
    reviewsCount: 21,
    images: [
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "خزانة بوفيه أنيقة للغاية لتخزين أطقم الأطباق والكريستالات ومفارش السفرة، مع أبواب بتصميم مضلع أنيق وأدراج داخلية مبطنة.",
    dimensions: "الطول: 200 سم | العمق: 46 سم | الارتفاع: 85 سم",
    material: "خشب زان طبيعي + رخام صناعي نانو كريستال مقاوم للخدش",
    colors: [
      { name: "رمادي فحمي مع ذهبي", hex: "#2A2D34" },
      { name: "أوف وايت ناعم مع رخام بيج", hex: "#FAF8F5" }
    ],
    badges: ["تركيب مجاني", "توصيل مجاني", "أدراج هيدروليكية"],
    features: [
      "خدمة نقل وتركيب مجانية بالكامل",
      "أدراج ومفصلات بنظام سوفت كلوز ألماني مانع للارتطام",
      "منظمات داخلية مدمجة للملاعق والسكاكين الفضية"
    ],
    inStock: 7,
    isFeatured: false,
    isNew: false
  },
  {
    id: 26,
    title: "طقم كراسي طعام مخملية مودرن مريحة (طقم من 4 كراسي)",
    category: "dining-room",
    categoryName: "غرف وسفر الطعام",
    price: 1550,
    oldPrice: 1950,
    rating: 4.7,
    reviewsCount: 30,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "كراسي سفرة تتميز بمنحنيات ظهر مريحة جداً وتنجيد إسفنجي غني يوفر أقصى درجات الراحة أثناء تناول الوجبات العائلية.",
    dimensions: "العرض: 52 سم | العمق: 56 سم | الارتفاع: 86 سم",
    material: "أرجل حديد كربوني أسود مطفي مع أطراف مذهبة + مخمل كوري وثير",
    colors: [
      { name: "رمادي فاتح", hex: "#B8BEC5" },
      { name: "أخضر زمردي", hex: "#1C3B2B" },
      { name: "أصفر خردلي", hex: "#CCA43B" }
    ],
    badges: ["طقم 4 كراسي", "توصيل مجاني"],
    features: [
      "السعر يشمل 4 كراسي متكاملة",
      "توصيل مجاني سريع حتى الباب",
      "أرجل مزودة بقطع سيليكون لحماية السيراميك والباركيه من الخدوش والضجيج"
    ],
    inStock: 15,
    isFeatured: false,
    isNew: true
  },
  {
    id: 27,
    title: "طاولة طعام قابلة للتمديد ذكياً من 6 إلى 10 مقاعد",
    category: "dining-room",
    categoryName: "غرف وسفر الطعام",
    price: 4600,
    oldPrice: 5600,
    rating: 4.9,
    reviewsCount: 34,
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "الحل العبقري للعزائم والمساحات المرنة؛ تمتد بسلاسة فائقة بفضل سكة ألومنيوم ميكانيكية مدمجة بدون أي جهد، لتوفر مقاعد إضافية فوراً.",
    dimensions: "الطول المغلق: 180 سم | الطول الممتد: 260 سم | العرض: 100 سم",
    material: "خشب جوز طبيعي ماسيف + سيراميك إسباني مقاوم للحرارة والسكاكين",
    colors: [
      { name: "رمادي سيراميكي مع خشب جوزي", hex: "#5E564F" },
      { name: "أبيض رخامي ناصع", hex: "#F5F5F5" }
    ],
    badges: ["توصيل مجاني", "تركيب مجاني", "قابلة للتمديد الذكي"],
    features: [
      "توصيل وتركيب مجاني مع تدريب المشتري على آلية التمديد",
      "سطح سيراميك معالج حرارياً حتى 1200 درجة مئوية لا يتأثر بالحرارة أو التقطيع المباشر",
      "ضمان 5 سنوات على الميكانيزم التلسكوبي"
    ],
    inStock: 7,
    isFeatured: true,
    isNew: false
  },
  {
    id: 28,
    title: "دولاب عرض نيش كريستال زجاجي مودرن بإضاءة سبوت لايت",
    category: "dining-room",
    categoryName: "غرف وسفر الطعام",
    price: 2650,
    oldPrice: 3200,
    rating: 4.8,
    reviewsCount: 17,
    images: [
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "خزانة عرض رأسية بـ 4 أرفف زجاجية متينة لحفظ الكؤوس الفاخرة والتحف التذكارية في غرفة الطعام، مع إضاءة علوية تبرز جمال المعروضات.",
    dimensions: "الارتفاع: 195 سم | العرض: 90 سم | العمق: 42 سم",
    material: "زجاج فائق النقاء كريستال بلجيكي + هيكل خشب زان أسود مطفي",
    colors: [
      { name: "أسود ملكي مطفي", hex: "#1F2226" },
      { name: "بني شوكولاتة", hex: "#38281F" }
    ],
    badges: ["تركيب وتثبيت مجاني", "توصيل آمن"],
    features: [
      "تركيب مجاني وتثبيت آمن مع توصيل إنارة الـ LED",
      "أرفف زجاجية مقساة تتحمل حتى 20 كجم لكل رف",
      "أبواب مزودة بقفل مغناطيسي صامت"
    ],
    inStock: 9,
    isFeatured: false,
    isNew: false
  },
  {
    id: 29,
    title: "طقم كراسي بار مطبخ مرتفعة دوارة بتصميم جلد كلاسيك (زوج)",
    category: "dining-room",
    categoryName: "غرف وسفر الطعام",
    price: 890,
    oldPrice: 1150,
    rating: 4.7,
    reviewsCount: 28,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "كراسي كاونتر وجزيرة مطبخ عملية وأنيقة، مع مقبض هيدروليكي لتعديل الارتفاع ومسند مريح للأقدام ودوران 360 درجة.",
    dimensions: "ارتفاع المقعد قابل للتعديل: 60 - 82 سم | العرض: 45 سم",
    material: "جلد صناعي كلاسيك ناعم + قاعدة دائرية فولاذية مانعة للانزلاق",
    colors: [
      { name: "بني كراميل عتيق", hex: "#8B5A2B" },
      { name: "أسود كربوني", hex: "#222222" }
    ],
    badges: ["طقم كرسيين", "توصيل مجاني"],
    features: [
      "السعر يشمل كرسيين كاونتر متطابقين",
      "توصيل مجاني حتى باب المنزل",
      "بستم هيدروليكي معتمد فئة SGS لتحمل الأوزان الثقيلة"
    ],
    inStock: 20,
    isFeatured: false,
    isNew: true
  },
  {
    id: 30,
    title: "عربة تقديم ضيافة وترولي مشروبات فاخرة ذات طابقين رخاميين",
    category: "dining-room",
    categoryName: "غرف وسفر الطعام",
    price: 780,
    oldPrice: 990,
    rating: 4.9,
    reviewsCount: 44,
    images: [
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "عربة ضيافة متنقلة راقية بعجلات صامتة مطلية بالذهب، مع رفين من الرخام وحوامل مخصصة للأكواب والقوارير لتقديم الشاي والقهوة بفخامة.",
    dimensions: "الطول: 80 سم | العرض: 42 سم | الارتفاع: 85 سم",
    material: "رخام صناعي خفيف ومقاوم للبقع + معدن ذهبي PVD لامع لا يتغير لونه",
    colors: [
      { name: "ذهبي لامع مع رخام أبيض", hex: "#D4AF37" }
    ],
    badges: ["توصيل مجاني", "عجلات صامتة مع فرامل"],
    features: [
      "توصيل مجاني سريع",
      "عجلات مرنة تدور 360 درجة مع مكابح تثبيت لمنع الانزلاق",
      "مثالية لتقديم القهوة السعودية والضيافة الملكية أمام الضيوف"
    ],
    inStock: 17,
    isFeatured: false,
    isNew: false
  },

  // --- أثاث المكاتب المنزلية (7 منتجات) ---
  {
    id: 31,
    title: "مكتب تنفيذي فخم حرف L مع وحدة أدراج ذكية وخشب الجوز",
    category: "office",
    categoryName: "أثاث المكاتب المنزلية",
    price: 3800,
    oldPrice: 4700,
    rating: 4.9,
    reviewsCount: 29,
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "صمم للمدراء ورجال الأعمال، يوفر بيئة عمل مهيبة ومحفزة على الإنجاز، مع مساحات واسعة للشاشات، خزنة رقمية مدمجة، ومخارج للأسلاك والشواحن اللاسلكية.",
    dimensions: "المكتب الرئيسي: 180×80×76 سم | الامتداد الجانبي: 120×45×65 سم",
    material: "خشب جوز طبيعي مجفف + جلد طبيعي لسطح المكتب + إكسسوارات إلكترونية",
    colors: [
      { name: "جوزي ملكي داكن", hex: "#3B271A" },
      { name: "خشب رمادي مودرن", hex: "#4B4C4E" }
    ],
    badges: ["توصيل مجاني", "تركيب مجاني", "شاحن لاسلكي مدمج", "ضمان 7 سنوات"],
    features: [
      "توصيل وتركيب مجاني في مكتبك المنزلي",
      "شاحن لاسلكي Fast-Charge ومخارج Type-C مدمجة بسطح المكتب",
      "قفل رقمي ذكي بالبصمة للأدراج السرية",
      "ضمان 7 سنوات على الخشب والهيكل"
    ],
    inStock: 8,
    isFeatured: true,
    isNew: false
  },
  {
    id: 32,
    title: "كرسي مكتب مريح إرجونوميك طبي كامل التحكم مع مسند رأس",
    category: "office",
    categoryName: "أثاث المكاتب المنزلية",
    price: 1450,
    oldPrice: 1890,
    rating: 5.0,
    reviewsCount: 78,
    images: [
      "https://images.unsplash.com/photo-1580481077195-c3a9927b74b7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "الحل النهائي لآلام الظهر والرقبة وساعات العمل الطويلة؛ شبك كوري مهوى يمنع التعرق، دعم ديناميكي لفقرات القطنية، وأذرع 4D تتحرك في كافة الاتجاهات.",
    dimensions: "الارتفاع الإجمالي: 115 - 130 سم | عرض المقعد: 52 سم",
    material: "شبك ميكروفيبر تنفسي متين + قاعدة ألومنيوم معالجة بالضغط العالي",
    colors: [
      { name: "أسود احترافي", hex: "#1D1E20" },
      { name: "رمادي ثلجي", hex: "#CFD4D9" }
    ],
    badges: ["الأكثر مبيعاً", "توصيل مجاني", "طبي إرجونوميك", "ضمان 5 سنوات"],
    features: [
      "توصيل سريع مجاني للمنزل",
      "ضمان شامل 5 سنوات على الميكانيزم والبستم الهيدروليكي",
      "دعامة قطنية ديناميكية تتحرك ذاتياً مع حركة ظهرك",
      "مساند ذراع 4D قابلة للتعديل بالارتفاع والزاوية والعمق"
    ],
    inStock: 25,
    isFeatured: true,
    isNew: false
  },
  {
    id: 33,
    title: "مكتب كهربائي ذكي قابل لتعديل الارتفاع للمستقيمين والجالسين",
    category: "office",
    categoryName: "أثاث المكاتب المنزلية",
    price: 2200,
    oldPrice: 2800,
    rating: 4.9,
    reviewsCount: 45,
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "عزز نشاطك وصحتك أثناء العمل؛ محركان كهربائيان مزدوجان فائقان الهدوء يرفعان ويخفضون المكتب بضغطة زر مع 4 ذواكر لحفظ أطوالك المفضلة.",
    dimensions: "السطح: 140×70 سم | الارتفاع قابل للتعديل: 68 - 122 سم",
    material: "سطح خشب معالج ضد الخدش + أرجل فولاذية صلبة بمحرك مزدوج Dual-Motor",
    colors: [
      { name: "سطح خشبي طبيعي مع أرجل سوداء", hex: "#303030" },
      { name: "أبيض عصري ناصع", hex: "#FAFAFA" }
    ],
    badges: ["توصيل مجاني", "تركيب مجاني", "محرك مزدوج هادئ", "مكتب صحي"],
    features: [
      "توصيل مجاني وتركيب وبرمجة أزرار الذاكرة مجاناً",
      "شاشة رقمية تعمل باللمس لعرض الارتفاع بالسنتيمتر",
      "مستشعر مضاد للتصادم (يتوقف تلقائياً إذا واجه عائقاً)",
      "نظام إخفاء الأسلاك وتنظيم الشواحن مدمج مجاناً"
    ],
    inStock: 12,
    isFeatured: true,
    isNew: true
  },
  {
    id: 34,
    title: "خزانة ملفات ومكتبة كتب خشبية 3 أبواب زجاجية مع أقفال",
    category: "office",
    categoryName: "أثاث المكاتب المنزلية",
    price: 1950,
    oldPrice: 2450,
    rating: 4.8,
    reviewsCount: 19,
    images: [
      "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "تنظيم مثالي للوثائق الهامة، المراجع والكتب القيمة في المكتب، مع أبواب زجاجية تحمي من الغبار وأقفال أمان تحافظ على الخصوصية.",
    dimensions: "العرض: 120 سم | الارتفاع: 185 سم | العمق: 40 سم",
    material: "خشب صلب عالي الكثافة + زجاج مقسى + مقابض سبيكة ألمنيوم",
    colors: [
      { name: "جوزي كلاسيكي", hex: "#4A3222" },
      { name: "رمادي معدني", hex: "#505459" }
    ],
    badges: ["تركيب مجاني", "توصيل مجاني", "أقفال أمان"],
    features: [
      "خدمة تجميع وتثبيت مجانية بالكامل",
      "أرفف سميكة لا تنحني إطلاقاً مع ثقل الموسوعات والملفات",
      "ضمان 5 سنوات"
    ],
    inStock: 10,
    isFeatured: false,
    isNew: false
  },
  {
    id: 35,
    title: "كرسي ضيوف مكتب فخم جلد مبطن بقاعدة زلاجة ثقيلة",
    category: "office",
    categoryName: "أثاث المكاتب المنزلية",
    price: 690,
    oldPrice: 890,
    rating: 4.7,
    reviewsCount: 22,
    images: [
      "https://images.unsplash.com/photo-1580481077195-c3a9927b74b7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "كرسي استقبال مثالي لغرفة العمل ومكتب الاجتماعات؛ قاعدة زلاجة كرومية توفر ثباتاً فائقاً وتنجيد جلدي وثير يعكس الاحترافية.",
    dimensions: "العرض: 58 سم | العمق: 60 سم | الارتفاع: 92 سم",
    material: "جلد بولي يوريثان مقاوم للاهتراء + هيكل حديدي مطلي كروم",
    colors: [
      { name: "أسود كربوني", hex: "#1C1C1C" },
      { name: "بني شيكولاتة", hex: "#443125" }
    ],
    badges: ["توصيل مجاني", "قاعدة ثابتة"],
    features: [
      "توصيل مجاني سريع",
      "أرجل محمية بحوافر مانعة لخدش الأرضيات الخشبية والرخامية",
      "تنجيد إسفنجي مريح للجلوس أثناء الاجتماعات"
    ],
    inStock: 18,
    isFeatured: false,
    isNew: false
  },
  {
    id: 36,
    title: "مكتب دراسة وعمل مدمج مع رفوف علوية ووحدة إضاءة",
    category: "office",
    categoryName: "أثاث المكاتب المنزلية",
    price: 1150,
    oldPrice: 1450,
    rating: 4.6,
    reviewsCount: 25,
    images: [
      "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "تصميم مدمج ذكي يستغل المساحات الصغيرة بكفاءة عالية، يوفر مساحة مريحة للكمبيوتر المحمول مع أرفف عمودية للملاحظات والكتب.",
    dimensions: "العرض: 100 سم | العمق: 55 سم | الارتفاع: 140 سم",
    material: "خشب صلب هندسي وقشرة ميلامين مقاومة للبقع والحرارة",
    colors: [
      { name: "أبيض ناصع مع لمسات خشبية", hex: "#F8F8F8" },
      { name: "رمادي ناعم", hex: "#BFC5CB" }
    ],
    badges: ["تركيب مجاني", "توصيل مجاني", "مناسب للمساحات الصغيرة"],
    features: [
      "توصيل وتركيب مجاني كامل",
      "تصميم عملي للأطفال والطلاب ومحبي العمل المرن",
      "لوحة مغناطيسية مدمجة لتعليق الملاحظات والمهام"
    ],
    inStock: 14,
    isFeatured: false,
    isNew: true
  },
  {
    id: 37,
    title: "وحدة أدراج متنقلة أسفل المكتب 3 أدراج مع قفل مركزي",
    category: "office",
    categoryName: "أثاث المكاتب المنزلية",
    price: 550,
    oldPrice: 720,
    rating: 4.8,
    reviewsCount: 31,
    images: [
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "وحدة تخزين متحركة تستقر بانسيابية أسفل أي مكتب، مزودة بعجلات صامتة ودرج سفلي واسع يتسع لملفات بحجم A4 ومجلدات الأرشيف.",
    dimensions: "العرض: 40 سم | العمق: 50 سم | الارتفاع: 60 سم",
    material: "فولاذ مجلفن صلب مطلي بودرة حرارية غير قابلة للخدش",
    colors: [
      { name: "أسود مات", hex: "#22252A" },
      { name: "أبيض ثلجي", hex: "#ECECEC" }
    ],
    badges: ["توصيل مجاني", "قفل مركزي", "جاهز للاستخدام"],
    features: [
      "توصيل مجاني حتى باب منزلك",
      "تصل مجمعة بالكامل وجاهزة للاستخدام الفوري بدون أي تركيب",
      "مفتاح أمان مركزي يقفل جميع الأدراج الثلاثة بضغطة واحدة"
    ],
    inStock: 22,
    isFeatured: false,
    isNew: false
  },

  // --- أثاث الحدائق والخارجي (6 منتجات) ---
  {
    id: 38,
    title: "طقم جلسة خارجية فاخرة 7 أشخاص من الرتان الطبيعي المعالج للشمس",
    category: "outdoor",
    categoryName: "أثاث الحدائق والخارجي",
    price: 5200,
    oldPrice: 6500,
    rating: 4.9,
    reviewsCount: 38,
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "استمتع بأروع الجلسات العائلية في الفناء الخارجي أو الحديقة؛ مصنوع من خيوط الرتان الاصطناعي عالي الكثافة المقاوم لأشعة الشمس الحارقة والأمطار، مع طاولة زجاجية ووسائد مبطنة ضد الماء.",
    dimensions: "كنبة ثلاثية: 200×80 سم | كرسيان مفردان: 80×80 سم | طاولة: 120×65×45 سم",
    material: "رتان بوليمر ألماني مقاوم للأشعة فوق البنفسجية UV + شاسيه ألومنيوم غير قابل للصدأ",
    colors: [
      { name: "رتان بني دافئ مع وسائد بيج", hex: "#5D4037" },
      { name: "رتان رمادي عصري مع وسائد تركواز", hex: "#616161" }
    ],
    badges: ["توصيل مجاني", "تركيب مجاني", "مقاوم للشمس والأمطار 100%", "ضمان 5 سنوات"],
    features: [
      "توصيل وتركيب مجاني في فناء منزلك أو حديقتك",
      "أقمشة معالجة بتكنولوجيا Sunbrella تقاوم البهتان والماء والأتربة",
      "شاسيه ألومنيوم خفيف وقوي لا يصدأ حتى مع التعرض المباشر لمياه المسابح",
      "يتضمن غطاء حماية مجاني كامل لحفظ الطقم في مواسم الغبار"
    ],
    inStock: 6,
    isFeatured: true,
    isNew: true
  },
  {
    id: 39,
    title: "أرجوحة حديقة معلقة رتان مفردة مع مظلة وقاعدة فولاذية",
    category: "outdoor",
    categoryName: "أثاث الحدائق والخارجي",
    price: 1350,
    oldPrice: 1750,
    rating: 4.8,
    reviewsCount: 52,
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "ركنك السحري للاسترخاء وقراءة الكتب في الهواء الطلق، مع سلة رتان وثيره معلقة بنابض تخميد قوي ووسائد قطنية سميكة لا تسبب الحساسية.",
    dimensions: "ارتفاع الحامل: 195 سم | قطر السلة: 105 سم | تتحمل حتى 160 كجم",
    material: "حديد فولاذي سميك مجلفن + رتان صناعي + وسائد مقاومة للماء",
    colors: [
      { name: "سلة سوداء مع وسادة رمادية", hex: "#262626" },
      { name: "سلة بيضاء مع وسادة زرقاء", hex: "#F5F5F5" }
    ],
    badges: ["توصيل مجاني", "تركيب مجاني", "تحمل حتى 160 كجم"],
    features: [
      "توصيل مجاني وتركيب فوري بواسطة الفني",
      "قاعدة دائرية عريضة توفر أماناً وتوازناً كاملاً عند التأرجح",
      "زنبرك فولاذي هادئ لا يصدر أي أصوات احتكاك"
    ],
    inStock: 14,
    isFeatured: false,
    isNew: false
  },
  {
    id: 40,
    title: "طقم كراسي استرخاء شاطئية ومسبح (كرسيان شيزلونج + طاولة صغيرة)",
    category: "outdoor",
    categoryName: "أثاث الحدائق والخارجي",
    price: 1890,
    oldPrice: 2350,
    rating: 4.7,
    reviewsCount: 27,
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "كراسي شمسية مريحة لحافة المسبح أو سطح المنزل، مع ظهر قابل للتعديل بـ 5 مستويات مختلفة للاستلقاء أو الجلوس، وعجلات خلفية لتسهيل النقل.",
    dimensions: "طول الشيزلونج: 195 سم | العرض: 68 سم | الارتفاع: 35 سم",
    material: "خشب الساج الاستوائي (تيك وود) المعالج بالزيوت الطبيعية والمقاوم للمياه",
    colors: [
      { name: "خشب الساج الذهبي", hex: "#A57140" },
      { name: "أبيض مطلي حماية", hex: "#EEEEEE" }
    ],
    badges: ["توصيل مجاني", "خشب ساج طبيعي 100%", "طقم متكامل"],
    features: [
      "توصيل مجاني في كراتين محكمة",
      "خشب التيك لا يتأثر بالكلور، الرطوبة العالية أو ملوحة البحر",
      "يتضمن فرشتين مائيتين مجاناً بلون كحلي فندقي"
    ],
    inStock: 9,
    isFeatured: false,
    isNew: true
  },
  {
    id: 41,
    title: "طاولة طعام خارجية 6 مقاعد من الألمنيوم المصبوب مع فتحة للمظلة",
    category: "outdoor",
    categoryName: "أثاث الحدائق والخارجي",
    price: 3100,
    oldPrice: 3800,
    rating: 4.8,
    reviewsCount: 22,
    images: [
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "تناول وجبات الشواء العائلية في الهواء الطلق براحة وفخامة، مع طاولة وكراسي لا تتأثر بالطقس الحار أو الرطب ولا تتطلب أي صيانة معقدة.",
    dimensions: "الطاولة: 160×90×75 سم | الكرسي: 60×58×88 سم",
    material: "ألمنيوم مصبوب غير قابل للصدأ مطلي بطلاء مسحوق حراري أسود كلاسيك",
    colors: [
      { name: "برونزي عتيق", hex: "#3E2E20" },
      { name: "أسود داكن", hex: "#1D1D1D" }
    ],
    badges: ["توصيل مجاني", "تركيب مجاني", "ضمان 10 سنوات ضد الصدأ"],
    features: [
      "توصيل وتركيب مجاني في المكان المخصص",
      "مقاومة تامة للصدأ والتآكل مدى الحياة",
      "فتحة مجهزة في منتصف الطاولة لتركيب أي مظلة حديقة بسهولة"
    ],
    inStock: 7,
    isFeatured: false,
    isNew: false
  },
  {
    id: 42,
    title: "مظلة حديقة جانبية كانتيليفر عملاقة 3×3 أمتار مع إضاءة شمسية",
    category: "outdoor",
    categoryName: "أثاث الحدائق والخارجي",
    price: 1650,
    oldPrice: 2150,
    rating: 4.7,
    reviewsCount: 39,
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "تغطية ظلال واسعة تحميك من أشعة الشمس المباشرة، مع ذراع جانبي يسهل الدوران 360 درجة، وشرائح خلايا شمسية تشحن مصابيح LED في أضلاع المظلة تلقائياً.",
    dimensions: "المساحة: 300×300 سم | الارتفاع: 260 سم",
    material: "قماش بوليستر 280 جرام عازل للحرارة والماء + عمود ألمنيوم صلب 70 ملم",
    colors: [
      { name: "بيج رملي", hex: "#DDD2BC" },
      { name: "رمادي حجري", hex: "#5C6066" }
    ],
    badges: ["توصيل مجاني", "تركيب وتثبيت مجاني", "إضاءة طاقة شمسية"],
    features: [
      "توصيل مجاني وتثبيت متقن مع أوزان القاعدة المائية/الرملية",
      "أضواء LED في كل ضلع تعمل بالطاقة الشمسية لأجواء ليلية ساحرة",
      "مقبض كرنك سلس لفتح وإغلاق المظلة بدون أي مشقة"
    ],
    inStock: 11,
    isFeatured: false,
    isNew: true
  },
  {
    id: 43,
    title: "مدفأة فناء خارجية غازية بتصميم شعلة لهب زجاجية هرمية",
    category: "outdoor",
    categoryName: "أثاث الحدائق والخارجي",
    price: 1450,
    oldPrice: 1900,
    rating: 4.9,
    reviewsCount: 33,
    images: [
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "دفء ساحر وأجواء شتوية دافئة؛ تطلق شعلة نار مرئية داخل أنبوب زجاجي مقاوم للحرارة مع نشر الحرارة في دائرة نصف قطرها 5 أمتار بأمان كامل.",
    dimensions: "الارتفاع: 225 سم | القاعدة: 50×50 سم | قوة التدفئة: 13 كيلو واط",
    material: "ستانلس ستيل غير قابل للصدأ + أنبوب زجاجي كوارتز حراري",
    colors: [
      { name: "ستانلس ستيل فضي", hex: "#C8C9CB" },
      { name: "أسود بودرة حرارية", hex: "#222325" }
    ],
    badges: ["توصيل مجاني", "تركيب واختبار مجاني", "أمان ذكي"],
    features: [
      "توصيل مجاني واختبار تشغيل وإشعال فوري مع منظم الغاز مجاناً",
      "نظام إغلاق أمان تلقائي في حال انسكاب أو ميلان الدفاية",
      "عجلات سفلية متينة لتحريك المدفأة إلى أي مكان بكل يسر"
    ],
    inStock: 13,
    isFeatured: false,
    isNew: false
  },

  // --- المفروشات والديكور (7 منتجات) ---
  {
    id: 44,
    title: "سجادة تبريز ملكية حريرية منسوجة يدوياً بكثافة 2 مليون عقدة",
    category: "decor",
    categoryName: "المفروشات والديكور",
    price: 3400,
    oldPrice: 4200,
    rating: 5.0,
    reviewsCount: 41,
    images: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "قطعة فنية نادرة تعكس فخامة القصور، ملمس حريري فائق النعومة مع لمعان يتغير حسب زاوية الضوء ونقوش هندسية كلاسيكية معقدة تنبض بالحياة.",
    dimensions: "المقاس: 200×300 سم (6 أمتار مربعة)",
    material: "حرير طبيعي 60% وصوف نيوزيلندي فائق الجودة 40%",
    colors: [
      { name: "كريمي عاجي مع أزرق ملكي", hex: "#E9E3D3" },
      { name: "عنابي ملكي مع ذهبي", hex: "#6A1A24" }
    ],
    badges: ["توصيل مجاني", "حرير طبيعي", "معالجة ضد البكتيريا", "ضمان 10 سنوات"],
    features: [
      "توصيل مجاني مع فرش وتنسيق السجادة في الغرفة المطلوبة",
      "معالجة بتقنية النانو لصد السوائل والغبار ومنع الحشرات",
      "ثابتة على الأرضيات ولا تحتاج لباد مانع للانزلاق"
    ],
    inStock: 7,
    isFeatured: true,
    isNew: false
  },
  {
    id: 45,
    title: "ثريا كريستال شاندلير عصرية ذهبية متعددة الطبقات مع ريموت",
    category: "decor",
    categoryName: "المفروشات والديكور",
    price: 2450,
    oldPrice: 3200,
    rating: 4.9,
    reviewsCount: 36,
    images: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "إضاءة مبهرة تخطف الأبصار بتصميم متدرج الحلقات مع قطع كريستال K9 النقي التي تكسر الضوء كأطياف قوس قزح في غرف المعيشة وغرف الطعام.",
    dimensions: "القطر: 80 سم | الارتفاع قابل للتعديل حتى 150 سم",
    material: "ستانلس ستيل مطلي بماء الذهب + كريستال K9 البراق فائق النقاوة",
    colors: [
      { name: "ذهبي ملكي براق", hex: "#FFD700" },
      { name: "فضي كروم", hex: "#E0E0E0" }
    ],
    badges: ["تركيب فني مجاني", "توصيل آمن", "إضاءة LED موفرة للكهرباء"],
    features: [
      "فني كهربائي متخصص لتوصيل وتركيب وضبط الثريا في السقف مجاناً",
      "ريموت كنترول للتحكم بدرجة الإضاءة (أصفر، شمسي، أبيض) والسطوع",
      "قطع كريستال احتياطية مدمجة مجاناً في العلبة"
    ],
    inStock: 10,
    isFeatured: true,
    isNew: true
  },
  {
    id: 46,
    title: "مرآة جدارية عضوية غير منتظمة بإطار خشب الجوز المذهب",
    category: "decor",
    categoryName: "المفروشات والديكور",
    price: 850,
    oldPrice: 1100,
    rating: 4.8,
    reviewsCount: 29,
    images: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "تريند الديكور العالمي الأبرز؛ تصميم عضوي غير متماثل مستوحى من أشكال الطبيعة يمنح الجدار بعداً فنياً وسعة بصرية منعشة للمكان.",
    dimensions: "الارتفاع: 100 سم | العرض: 75 سم | السماكة: 4 ملم",
    material: "مرآة فضية بلجيكية مقاومة للأكسدة + إطار خشبي منحوت بدقة",
    colors: [
      { name: "ذهبي عتيق", hex: "#CFB53B" },
      { name: "أسود ناعم", hex: "#2B2B2B" }
    ],
    badges: ["تركيب جداري مجاني", "توصيل آمن ضد الكسر"],
    features: [
      "توصيل مجاني بتغليف صندوقي مضاد للاهتزاز والكسر",
      "تثبيت جداري احترافي مجاناً بالمسامير المخفية",
      "عكس نقي 100% بدون أي تشويه للصورة"
    ],
    inStock: 16,
    isFeatured: false,
    isNew: true
  },
  {
    id: 47,
    title: "أباجورة أرضية قائمة مودرن مقوسة مع قاعدة رخامية ثقيلة",
    category: "decor",
    categoryName: "المفروشات والديكور",
    price: 680,
    oldPrice: 890,
    rating: 4.7,
    reviewsCount: 23,
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "إضاءة قراءة جانبية أنيقة تنحني بأناقة فوق مقعد القراءة أو الكنبة، مع مفتاح أرضي يعمل بضغطة القدم وقاعدة رخام طبيعي مانعة للميلان.",
    dimensions: "الارتفاع: 185 سم | امتداد القوس: 90 سم | قطر القاعدة: 35 سم",
    material: "معدن ستانلس مطلي ذهبي مطفي + قاعدة رخام طبيعي 14 كجم",
    colors: [
      { name: "ذهبي مطفي شيك", hex: "#C5A880" },
      { name: "أسود مطفي مينيملي", hex: "#1F1F1F" }
    ],
    badges: ["توصيل مجاني", "لمبة ذكية مجانية مدمجة"],
    features: [
      "توصيل مجاني حتى باب المنزل",
      "تتضمن لمبة LED ذكية متغيرة الألوان مجاناً",
      "مفتاح تشغيل عملي بدعسة القدم بدون انحناء"
    ],
    inStock: 21,
    isFeatured: false,
    isNew: false
  },
  {
    id: 48,
    title: "طقم وسائد ديكورية مخملية مطرزة بنقوش هندسية (طقم 4 قطع)",
    category: "decor",
    categoryName: "المفروشات والديكور",
    price: 320,
    oldPrice: 450,
    rating: 4.8,
    reviewsCount: 55,
    images: [
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "جدد حيوية كنب غرفة المعيشة بطقم وسائد فاخر ممتلئ بريش النعام الصناعي الناعم، مع أغطية قابلة للفك والغسيل وسحابات مخفية متينة.",
    dimensions: "المقاس: 45×45 سم (4 وسائد متناسقة)",
    material: "قماش مخمل هولندي ناعم + حشوة مايكروفايبر مضغوطة عالية الامتلاء",
    colors: [
      { name: "مزيج زمردي وذهبي", hex: "#1C4938" },
      { name: "مزيج كحلي وبيج", hex: "#1C3144" }
    ],
    badges: ["طقم 4 وسائد", "توصيل مجاني"],
    features: [
      "السعر يشمل 4 وسائد بالحشوة الكاملة الفاخرة",
      "توصيل مجاني مباشر",
      "أغطية بسحاب مخفي قابلة للغسيل والكي بكل أمان"
    ],
    inStock: 35,
    isFeatured: false,
    isNew: false
  },
  {
    id: 49,
    title: "لوحة جدارية ثلاثية كانفاس فنية مجردة مع إطارات ألمنيوم ذهبية",
    category: "decor",
    categoryName: "المفروشات والديكور",
    price: 990,
    oldPrice: 1350,
    rating: 4.9,
    reviewsCount: 31,
    images: [
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "مجموعة ثلاثية من اللوحات التشكيلية المطبوعة بألوان زيتية نسيجية بارزة، تضيف لمسة متحفية راقية على الجدار الرئيسي للصالون.",
    dimensions: "المقاس الإجمالي: 180×80 سم (3 لوحات مقاس كل منها 60×80 سم)",
    material: "قماش كانفاس إيطالي أصلي 380 جرام + إطار ألمنيوم عائم مطلي بالذهب",
    colors: [
      { name: "درجات الأزرق والرمادي والذهب", hex: "#3A506B" },
      { name: "تدرجات الترابي والأوف وايت", hex: "#D6C7B2" }
    ],
    badges: ["توصيل مجاني", "تركيب وميزان ليزري مجاني"],
    features: [
      "توصيل مجاني محكم التغليف في كرتون مقوى",
      "تركيب مجاني بواسطة ميزان ليزر لضبط استقامة اللوحات الثلاث بدقة متناهية",
      "ألوان ثابتة لا تبهت مدى الحياة ومقاومة للرطوبة"
    ],
    inStock: 12,
    isFeatured: false,
    isNew: true
  },
  {
    id: 50,
    title: "فازة سيراميك ديكورية عملاقة منحوتة يدوياً بتصميم معاصر",
    category: "decor",
    categoryName: "المفروشات والديكور",
    price: 450,
    oldPrice: 590,
    rating: 4.7,
    reviewsCount: 18,
    images: [
      "https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1000&q=80"
    ],
    description: "فازة أرضية بتشطيب طيني مطفي محبب ونحت هندسي يدوي فريد، مثالية لوضع أغصان البامبو المجفف أو زهور البامباس لإضفاء طابع بوهيمي أنيق.",
    dimensions: "الارتفاع: 65 سم | القطر الأقصى: 30 سم",
    material: "فخار وسيراميك حجري معالج بالحرارة العالية بتشطيب ناعم مات",
    colors: [
      { name: "أبيض رملي مطفي", hex: "#EAE6DF" },
      { name: "طين فخاري دافئ", hex: "#B87333" }
    ],
    badges: ["توصيل مجاني", "صناعة فخارية يدوية"],
    features: [
      "توصيل مجاني مع حماية هوائية مضادة للصدمات",
      "تتضمن باقة من أغصان البامباس المجففة الطبيعية مجاناً",
      "قاعدة سفلية مزودة بحماية من السيليكون لمنع الخدش"
    ],
    inStock: 19,
    isFeatured: false,
    isNew: false
  }
];
