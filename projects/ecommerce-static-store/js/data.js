// Generated Seed Data
const DEFAULT_CATEGORIES = [
    {
        "id": "all",
        "name": "جميع المنتجات",
        "icon": "grid"
    },
    {
        "id": "electronics",
        "name": "إلكترونيات وأجهزة",
        "icon": "laptop"
    },
    {
        "id": "perfumes",
        "name": "عطور فاخرة",
        "icon": "sparkles"
    },
    {
        "id": "watches",
        "name": "ساعات وإكسسوارات",
        "icon": "watch"
    },
    {
        "id": "fashion",
        "name": "أزياء وحقائب",
        "icon": "bag"
    },
    {
        "id": "coffee",
        "name": "قهوة ومكائن",
        "icon": "coffee"
    }
];
const DEFAULT_PRODUCTS = [
    {
        "id": "prod-1",
        "name": "سماعات الرأس اللاسلكية سوني WH-1000XM5 عازلة للضوضاء",
        "category": "electronics",
        "price": 1399,
        "oldPrice": 1699,
        "stock": 14,
        "rating": 4.9,
        "reviewsCount": 128,
        "featured": true,
        "badge": "الأكثر طلباً",
        "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        "description": "سماعات الرأس اللاسلكية الرائدة عالمياً في إلغاء الضوضاء بتقنية الذكاء الاصطناعي، بطارية تدوم حتى 30 ساعة متواصلة مع دعم الشحن السريع ومعالج V1 المزدوج وتقنية الاتصال متعدد النقاط لجودة صوت استوديو استثنائية.",
        "features": [
            "تقنية إلغاء ضوضاء ثورية رائدة عالمياً",
            "بطارية تدوم 30 ساعة مع شحن 3 دقائق لـ 3 ساعات استخدام",
            "ميكروفونات متعددة بدقة متناهية للمكالمات النقية",
            "وسائد أذن جلدية مريحة جداً للاستخدام طوال اليوم"
        ]
    },
    {
        "id": "prod-2",
        "name": "عطر ليذر رويال الفاخر - أو دو بارفيوم ملكي 100 مل",
        "category": "perfumes",
        "price": 480,
        "oldPrice": 650,
        "stock": 9,
        "rating": 4.8,
        "reviewsCount": 94,
        "featured": true,
        "badge": "خصم 26%",
        "image": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80",
        "description": "مزيج ملكي أخّاذ يجمع بين فخامة الجلد الطبيعي والعود الكمبودي المعتق، مع لمسات مخملية من الهيل والبرغموت والعنبر الدافئ، يمنحك حضوراً آسراً يدوم لأكثر من 24 ساعة.",
        "features": [
            "ثبات وفوحان فائق يدوم لأكثر من 24 ساعة",
            "زيوت عطرية فرنسية طبيعية 100%",
            "زجاجة كريستال إيطالي فاخرة بغطاء مغناطيسي ثقيل"
        ]
    },
    {
        "id": "prod-3",
        "name": "ساعة كرونوغراف تيتانيوم الذكية - إصدار الفخامة AMOLED",
        "category": "watches",
        "price": 890,
        "oldPrice": 1150,
        "stock": 18,
        "rating": 4.7,
        "reviewsCount": 76,
        "featured": true,
        "badge": "وصل حديثاً",
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        "description": "ساعة ذكية استثنائية بهيكل مصقول من التيتانيوم المقاوم للصدمات مع شاشة AMOLED نقية تعمل طوال الوقت، تدعم قياس نبضات القلب ونسبة الأكسجين ومقاومة الماء حتى عمق 50 متراً.",
        "features": [
            "شاشة AMOLED 1.43 بوصة فائقة الوضوح والسطوع تحت الشمس",
            "هيكل تيتانيوم قوي خفيف الوزن مع زجاج ياقوتي مضاد للخدش",
            "بطارية تدوم حتى 14 يوماً في الشحنة الواحدة",
            "أكثر من 100 وضع رياضي وتتبع صحي ذكي"
        ]
    },
    {
        "id": "prod-4",
        "name": "ماكينة قهوة إسبريسو نصف أوتوماتيكية مع مطحنة مدمجة 15 بار",
        "category": "coffee",
        "price": 2450,
        "oldPrice": 2890,
        "stock": 5,
        "rating": 4.9,
        "reviewsCount": 112,
        "featured": true,
        "badge": "عرض حصري",
        "image": "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80",
        "description": "عِش تجربة مقهى الباريستا المتخصص في راحة منزلك! مضخة إيطالية بقوة ضغط مثالية 15 بار، مع مطحنة حبوب مخروطية مدمجة وعصا تبخير احترافية لرسم أحلى فنون اللاتيه.",
        "features": [
            "مضخة إيطالية أصلية بضغط 15 بار لاستخلاص مثالي",
            "مطحنة ستانلس ستيل مع 30 درجة طحن دقيقة",
            "تسخين سريع بنظام Thermo-coil خلال 3 ثوانٍ",
            "عصا بخار قوية لصنع رغوة حليب ميكروكريمية كالحرير"
        ]
    },
    {
        "id": "prod-5",
        "name": "كاميرا ميرورليس بدقة 4K احترافية مع عدسة 24-70mm f/2.8",
        "category": "electronics",
        "price": 4999,
        "oldPrice": 5600,
        "stock": 6,
        "rating": 5.0,
        "reviewsCount": 45,
        "featured": false,
        "badge": "نسخة المحترفين",
        "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
        "description": "أداة الإبداع المثالية لصناع المحتوى والمصورين المحترفين: مستشعر كامل الإطار 33 ميجابكسل، تصوير سينمائي بدقة 4K بمعدل 60 إطار بالثانية بدون اقتصاص، وتتبع ذكي للعين والوجه.",
        "features": [
            "مستشعر Full-Frame فائق الحساسية للإضاءة المنخفضة",
            "نظام تركيز هجين سريع بـ 759 نقطة فوكس",
            "مانع اهتزاز ميكانيكي مدمج خماسي المحاور داخل الهيكل"
        ]
    },
    {
        "id": "prod-6",
        "name": "حقيبة ظهر تنفيذية للأعمال مقاومة للماء مع منفذ شحن ذكي",
        "category": "fashion",
        "price": 260,
        "oldPrice": 340,
        "stock": 25,
        "rating": 4.6,
        "reviewsCount": 88,
        "featured": false,
        "badge": "الأكثر مبيعاً",
        "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
        "description": "حقيبة ظهر تجمع بين الأناقة والعملية المطلقة. تتسع للابتوب حتى مقاس 16 بوصة مع جيوب سرية مضادة للسرقة وخامة أكسفورد المقاومة للماء والخدوش.",
        "features": [
            "حماية متكاملة ومقاومة للماء والتمزق",
            "منفذ USB خارجي للشحن أثناء التنقل",
            "حزام خلفي للتثبيت على مقبض حقائب السفر",
            "وسائد ظهر مريحة مهواة لتخفيف الضغط"
        ]
    },
    {
        "id": "prod-7",
        "name": "عطر مسك الفانيليا وزهور السوسن الملكية - أو دو بارفيوم 80 مل",
        "category": "perfumes",
        "price": 320,
        "oldPrice": 410,
        "stock": 12,
        "rating": 4.8,
        "reviewsCount": 63,
        "featured": false,
        "badge": "إحساس النقاء",
        "image": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
        "description": "سيمفونية عطرية تجمع بين نقاء المسك الأبيض ونعومة الفانيليا الاستوائية مع نفحات السوسن وزهر البرتقال لتجربة هادئة راقية تدوم طويلاً.",
        "features": [
            "عطر يومي فواح ومريح للحواس",
            "مناسب للجنسين بلمسة منعشة",
            "تغليف هدايا فاخر مغلف بالمخمل"
        ]
    },
    {
        "id": "prod-8",
        "name": "مطحنة حبوب القهوة الكهربائية الدقيقة المتنقلة مع شحن Type-C",
        "category": "coffee",
        "price": 340,
        "oldPrice": 420,
        "stock": 15,
        "rating": 4.7,
        "reviewsCount": 52,
        "featured": false,
        "badge": "قهوة مختصة",
        "image": "https://images.unsplash.com/photo-1589396575653-c09c794ff6a6?auto=format&fit=crop&w=800&q=80",
        "description": "مطحنة بن كهربائية بحجم محمول أنيق مزودة بشفرات مخروطية من الفولاذ المقوى المقاوم للصدأ لضمان استخلاص متوازن ونكهات نقية لكافة أنواع القهوة.",
        "features": [
            "شفرات مخروطية CNC من الستانلس ستيل 38 ملم",
            "بطارية ليثيوم قابلة للشحن عبر Type-C تطحن حتى 25 مرة",
            "تعديل دقيق بنقرات متعددة للإسبريسو والفلتر"
        ]
    },
    {
        "id": "prod-9",
        "name": "نظارة شمسية كلاسيكية مستقطبة بإطار تيتانيوم أسود مطفي",
        "category": "fashion",
        "price": 195,
        "oldPrice": 280,
        "stock": 22,
        "rating": 4.5,
        "reviewsCount": 39,
        "featured": false,
        "badge": "عدسات Polarized",
        "image": "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
        "description": "تصميم خالد يجمع بين الفخامة وخفة الوزن، يوفر حماية كاملة 100% من الأشعة فوق البنفسجية UVA/UVB مع عدسات مستقطبة تمنع الانعكاسات المزعجة.",
        "features": [
            "حماية UV400 معتمدة طبياً",
            "عدسات تمنع توهج أشعة الشمس والماء والأسفلت",
            "مفصلات مرنة تناسب جميع أحجام الوجه"
        ]
    },
    {
        "id": "prod-10",
        "name": "مكبر صوت بلوتوث لاسلكي محمول مع مضخم صوت Bass وإضاءة RGB",
        "category": "electronics",
        "price": 380,
        "oldPrice": 499,
        "stock": 16,
        "rating": 4.8,
        "reviewsCount": 84,
        "featured": true,
        "badge": "صوت محيطي 360",
        "image": "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80",
        "description": "صوت فائق القوة والوضوح بزاوية 360 درجة مع مضخم باس عميق ومقاومة تامة للماء والغبار بمعيار IPX7، يعمل حتى 20 ساعة متواصلة مع إضاءة حية متفاعلة مع الموسيقى.",
        "features": [
            "مقاومة الماء بالكامل بمعيار IPX7 (تطفو على الماء)",
            "بطارية عملاقة 5000 مللي أمبير تدوم حتى 20 ساعة",
            "ميزة TWS لربط سماعتين لاسلكياً لصوت ستيريو هائل"
        ]
    },
    {
        "id": "prod-11",
        "name": "ساعة ميكانيكية أوتوماتيكية فاخرة بهيكل مكشوف وسوار جلد طبيعي",
        "category": "watches",
        "price": 750,
        "oldPrice": 980,
        "stock": 8,
        "rating": 4.9,
        "reviewsCount": 41,
        "featured": false,
        "badge": "ساعة كلاسيكية",
        "image": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80",
        "description": "تحفة فنية دقيقة تعمل بنبض يدك دون بطارية، تكشف عن حركة التروس الذهبية الدقيقة بأسلوب Skeleton الهندسي الفاخر مع سوار جلدي أصلي مخيط يدوياً.",
        "features": [
            "حركة أوتوماتيكية ذاتية التعبئة بحركة المعصم",
            "زجاج ياقوتي كريستالي مقاوم للخدش والصدمات",
            "حزام من الجلد الطبيعي المدبوغ بعناية فائقة"
        ]
    },
    {
        "id": "prod-12",
        "name": "حقيبة أدوات تحضير القهوة V60 الفاخرة المتكاملة 8 قطع",
        "category": "coffee",
        "price": 460,
        "oldPrice": 590,
        "stock": 10,
        "rating": 4.9,
        "reviewsCount": 118,
        "featured": true,
        "badge": "بكج الهدية الفاخر",
        "image": "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80",
        "description": "كل ما يحتاجه عاشق القهوة المقطرة في حقيبة صلبة فاخرة ومقاومة للصدمات: إبريق ترشيح بعنق الإوزة، قمع زجاجي، سيرفر تقديم، مطحنة يدوية، ميزان إلكتروني رقمي، وفلاتر نقية.",
        "features": [
            "حقيبة سفر صلبة مع تقسيمات مبطنة لحماية كل قطعة",
            "ميزان ذكي رقمي مع مؤقت حساس حتى 0.1 جرام",
            "إبريق تقطير ستانلس ستيل مع مقبض خشبي عازل للحرارة"
        ]
    }
];
const DEFAULT_COUPONS = [
    {
        "code": "ELITE10",
        "discountPercent": 10,
        "minSpend": 100,
        "active": true,
        "title": "خصم الترحيب 10%"
    },
    {
        "code": "GOLD20",
        "discountPercent": 20,
        "minSpend": 400,
        "active": true,
        "title": "خصم المتسوق الذهبي 20%"
    },
    {
        "code": "VIP50",
        "discountPercent": 50,
        "minSpend": 2000,
        "active": true,
        "title": "خصم العملاء المميزين 50%"
    }
];
const DEFAULT_ORDERS = [
    {
        "id": "ORD-8812",
        "date": "2026-09-05T14:30:00Z",
        "customer": {
            "name": "عبد العزيز الشمري",
            "phone": "0501234567",
            "email": "aziz@example.com",
            "city": "الرياض",
            "address": "حي النرجس، شارع الأمير فيصل بن بندر"
        },
        "items": [
            {
                "id": "prod-1",
                "name": "سماعات الرأس اللاسلكية سوني WH-1000XM5",
                "price": 1399,
                "quantity": 1,
                "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
            },
            {
                "id": "prod-2",
                "name": "عطر ليذر رويال الفاخر",
                "price": 480,
                "quantity": 1,
                "image": "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=800&q=80"
            }
        ],
        "subtotal": 1879,
        "discount": 187.9,
        "couponCode": "ELITE10",
        "shipping": 0,
        "tax": 253.66,
        "total": 1944.76,
        "status": "delivered",
        "paymentMethod": "mada",
        "notes": "توصيل خلال الفترة الصباحية"
    },
    {
        "id": "ORD-8813",
        "date": "2026-09-06T09:10:00Z",
        "customer": {
            "name": "ريم القحطاني",
            "phone": "0559876543",
            "email": "reem@example.com",
            "city": "جدة",
            "address": "حي الشاطئ، طريق الكورنيش"
        },
        "items": [
            {
                "id": "prod-4",
                "name": "ماكينة قهوة إسبريسو نصف أوتوماتيكية",
                "price": 2450,
                "quantity": 1,
                "image": "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80"
            }
        ],
        "subtotal": 2450,
        "discount": 0,
        "couponCode": "",
        "shipping": 0,
        "tax": 367.5,
        "total": 2817.5,
        "status": "processing",
        "paymentMethod": "apple_pay",
        "notes": "يرجى التأكد من سلامة كرتون الماكينة"
    },
    {
        "id": "ORD-8814",
        "date": "2026-09-06T11:40:00Z",
        "customer": {
            "name": "فهد بن خالد السديري",
            "phone": "0543322110",
            "email": "fahad@example.com",
            "city": "الخبر",
            "address": "حي الحزام الذهبي"
        },
        "items": [
            {
                "id": "prod-3",
                "name": "ساعة كرونوغراف تيتانيوم الذكية",
                "price": 890,
                "quantity": 1,
                "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80"
            }
        ],
        "subtotal": 890,
        "discount": 0,
        "couponCode": "",
        "shipping": 25,
        "tax": 137.25,
        "total": 1052.25,
        "status": "pending",
        "paymentMethod": "cod",
        "notes": ""
    }
];
const DEFAULT_SETTINGS = {
    "storeName": "سوق النخبة | Elite Store",
    "storeTagline": "المتجر الإلكتروني العصري للمنتجات الفاخرة والتقنية",
    "currency": "ر.س",
    "phone": "+966 50 123 4567",
    "email": "support@elitestore.sa",
    "address": "الرياض، المملكة العربية السعودية",
    "taxRate": 15,
    "freeShippingThreshold": 500,
    "standardShippingCost": 25,
    "heroBadge": "⚡ عروض وتخفيضات موسمية حصرية",
    "heroTitle": "تسوق أرقى المنتجات العصرية بأعلى معايير الفخامة",
    "heroSubtitle": "اكتشف تشكيلة منتقاة بعناية من الإلكترونيات المبتكرة، العطور الملكية، الساعات الفاخرة وأدوات القهوة المختصة مع شحن مجاني وضمان سنتين."
};
