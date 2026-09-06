/**
 * منصة صروح - مخزن البيانات الشامل (100+ عقار ومنتج عقاري وهندسي)
 * مصمم ليعمل مباشرة دون اتصال وخالٍ من مشاكل CORS عبر بروتوكول file:///
 */

const INITIAL_DATA = {
    "properties": [
        {
            "id": "PROP-101",
            "title": "قصر سكني بتصميم كلاسيكي راقي وحديقة واسعة بـحي الروضة (جدة)",
            "type": "شقة",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 750000,
            "priceDisplay": "٧٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "جدة",
            "district": "حي الروضة",
            "address": "حي الروضة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 139,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "2 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي الروضة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-02"
        },
        {
            "id": "PROP-102",
            "title": "بنتهاوس فاخر بإطلالة بانورامية ساحرة وتراس بـحي اليرموك (الخبر)",
            "type": "بنتهاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2650000,
            "priceDisplay": "٢٬٦٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الخبر",
            "district": "حي اليرموك",
            "address": "حي اليرموك، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 318,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "3 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي اليرموك. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-03"
        },
        {
            "id": "PROP-103",
            "title": "شقة سكنية بتصميم ذكي وإطلالة مفتوحة بـحي الفاخرية (الدمام)",
            "type": "تاون هاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1800000,
            "priceDisplay": "١٬٨٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الدمام",
            "district": "حي الفاخرية",
            "address": "حي الفاخرية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 277,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "4 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي الفاخرية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-04"
        },
        {
            "id": "PROP-104",
            "title": "تاون هاوس عصري داخل مجمع سكني مغلق مع حراسة بـحي العزيزية (مكة المكرمة)",
            "type": "شاليه",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1700000,
            "priceDisplay": "١٬٧٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "مكة المكرمة",
            "district": "حي العزيزية",
            "address": "حي العزيزية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 426,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي العزيزية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-05"
        },
        {
            "id": "PROP-105",
            "title": "فيلا زاوية على شارعين بتصميم معماري حديث بـحي الهدا (المدينة المنورة)",
            "type": "مبنى تجاري",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 7100000,
            "priceDisplay": "٧٬١٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "المدينة المنورة",
            "district": "حي الهدا",
            "address": "حي الهدا، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 695,
            "rooms": 13,
            "bathrooms": 13,
            "livingRooms": 1,
            "floors": 4,
            "age": "1 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي الهدا. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-06"
        },
        {
            "id": "PROP-106",
            "title": "دوبلكس راقي بمدخل خاص وسطح مجهز كجلسة لاونج بـحي الضباب (أبها)",
            "type": "فيلا",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2950000,
            "priceDisplay": "٢٬٩٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "أبها",
            "district": "حي الضباب",
            "address": "حي الضباب، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 434,
            "rooms": 6,
            "bathrooms": 7,
            "livingRooms": 2,
            "floors": 3,
            "age": "2 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي الضباب. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-07"
        },
        {
            "id": "PROP-107",
            "title": "مبنى تجاري إداري مؤجر بعائد استثماري مجزي بـحي الصحافة (الرياض)",
            "type": "شقة",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1500000,
            "priceDisplay": "١٬٥٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الرياض",
            "district": "حي الصحافة",
            "address": "حي الصحافة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 133,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "3 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي الصحافة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-08"
        },
        {
            "id": "PROP-108",
            "title": "فيلا درج صالة مع شقة مسروقة واستقلالية تامة بـحي الأندلس (جدة)",
            "type": "بنتهاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 3400000,
            "priceDisplay": "٣٬٤٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "جدة",
            "district": "حي الأندلس",
            "address": "حي الأندلس، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 432,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي الأندلس. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-09"
        },
        {
            "id": "PROP-109",
            "title": "شقة تمليك عائلية فندقية مؤثثة بالكامل بـحي الكورنيش (الخبر)",
            "type": "تاون هاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2550000,
            "priceDisplay": "٢٬٥٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الخبر",
            "district": "حي الكورنيش",
            "address": "حي الكورنيش، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 261,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "5 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي الكورنيش. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-10"
        },
        {
            "id": "PROP-110",
            "title": "فيلا مودرن فاخرة بتشطيب سوبر ديلوكس مع مسبح بـحي الشاطئ الشرقي (الدمام)",
            "type": "شاليه",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2450000,
            "priceDisplay": "٢٬٤٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الدمام",
            "district": "حي الشاطئ الشرقي",
            "address": "حي الشاطئ الشرقي، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 540,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "1 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي الشاطئ الشرقي. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-11"
        },
        {
            "id": "PROP-111",
            "title": "قصر سكني بتصميم كلاسيكي راقي وحديقة واسعة بـحي النسيم (مكة المكرمة)",
            "type": "مبنى تجاري",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 7850000,
            "priceDisplay": "٧٬٨٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "مكة المكرمة",
            "district": "حي النسيم",
            "address": "حي النسيم، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 809,
            "rooms": 19,
            "bathrooms": 19,
            "livingRooms": 1,
            "floors": 4,
            "age": "2 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي النسيم. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-12"
        },
        {
            "id": "PROP-112",
            "title": "بنتهاوس فاخر بإطلالة بانورامية ساحرة وتراس بـحي سلطانة (المدينة المنورة)",
            "type": "فيلا",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 3700000,
            "priceDisplay": "٣٬٧٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "المدينة المنورة",
            "district": "حي سلطانة",
            "address": "حي سلطانة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 548,
            "rooms": 4,
            "bathrooms": 5,
            "livingRooms": 2,
            "floors": 3,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي سلطانة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-13"
        },
        {
            "id": "PROP-113",
            "title": "شقة سكنية بتصميم ذكي وإطلالة مفتوحة بـحي المنسك (أبها)",
            "type": "شقة",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1100000,
            "priceDisplay": "١٬١٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "أبها",
            "district": "حي المنسك",
            "address": "حي المنسك، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 127,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "4 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي المنسك. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-14"
        },
        {
            "id": "PROP-114",
            "title": "تاون هاوس عصري داخل مجمع سكني مغلق مع حراسة بـحي الغدير (الرياض)",
            "type": "بنتهاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 4150000,
            "priceDisplay": "٤٬١٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الرياض",
            "district": "حي الغدير",
            "address": "حي الغدير، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 346,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "5 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي الغدير. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-15"
        },
        {
            "id": "PROP-115",
            "title": "فيلا زاوية على شارعين بتصميم معماري حديث بـحي المحمدية (جدة)",
            "type": "تاون هاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2150000,
            "priceDisplay": "٢٬١٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "جدة",
            "district": "حي المحمدية",
            "address": "حي المحمدية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 245,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "1 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي المحمدية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-16"
        },
        {
            "id": "PROP-116",
            "title": "دوبلكس راقي بمدخل خاص وسطح مجهز كجلسة لاونج بـحي الحزام الذهبي (الخبر)",
            "type": "شاليه",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1600000,
            "priceDisplay": "١٬٦٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الخبر",
            "district": "حي الحزام الذهبي",
            "address": "حي الحزام الذهبي، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 404,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي الحزام الذهبي. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-17"
        },
        {
            "id": "PROP-117",
            "title": "مبنى تجاري إداري مؤجر بعائد استثماري مجزي بـحي المزروعية (الدمام)",
            "type": "مبنى تجاري",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 8600000,
            "priceDisplay": "٨٬٦٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الدمام",
            "district": "حي المزروعية",
            "address": "حي المزروعية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 923,
            "rooms": 12,
            "bathrooms": 12,
            "livingRooms": 1,
            "floors": 4,
            "age": "3 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي المزروعية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-18"
        },
        {
            "id": "PROP-118",
            "title": "فيلا درج صالة مع شقة مسروقة واستقلالية تامة بـحي العوالي (مكة المكرمة)",
            "type": "فيلا",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 4400000,
            "priceDisplay": "٤٬٤٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "مكة المكرمة",
            "district": "حي العوالي",
            "address": "حي العوالي، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 662,
            "rooms": 6,
            "bathrooms": 7,
            "livingRooms": 2,
            "floors": 3,
            "age": "4 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي العوالي. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-19"
        },
        {
            "id": "PROP-119",
            "title": "شقة تمليك عائلية فندقية مؤثثة بالكامل بـحي باقدو (المدينة المنورة)",
            "type": "شقة",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 700000,
            "priceDisplay": "٧٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "المدينة المنورة",
            "district": "حي باقدو",
            "address": "حي باقدو، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 121,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "5 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي باقدو. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-20"
        },
        {
            "id": "PROP-120",
            "title": "فيلا مودرن فاخرة بتشطيب سوبر ديلوكس مع مسبح بـحي المفتاحة (أبها)",
            "type": "بنتهاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 4850000,
            "priceDisplay": "٤٬٨٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "أبها",
            "district": "حي المفتاحة",
            "address": "حي المفتاحة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 460,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي المفتاحة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-21"
        },
        {
            "id": "PROP-121",
            "title": "قصر سكني بتصميم كلاسيكي راقي وحديقة واسعة بـحي العليا (الرياض)",
            "type": "تاون هاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1750000,
            "priceDisplay": "١٬٧٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الرياض",
            "district": "حي العليا",
            "address": "حي العليا، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 229,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "2 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي العليا. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-22"
        },
        {
            "id": "PROP-122",
            "title": "بنتهاوس فاخر بإطلالة بانورامية ساحرة وتراس بـحي الشاطئ (جدة)",
            "type": "شاليه",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2300000,
            "priceDisplay": "٢٬٣٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "جدة",
            "district": "حي الشاطئ",
            "address": "حي الشاطئ، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 518,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "3 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي الشاطئ. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-23"
        },
        {
            "id": "PROP-123",
            "title": "شقة سكنية بتصميم ذكي وإطلالة مفتوحة بـحي الصواري (الخبر)",
            "type": "مبنى تجاري",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 9350000,
            "priceDisplay": "٩٬٣٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الخبر",
            "district": "حي الصواري",
            "address": "حي الصواري، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 1037,
            "rooms": 18,
            "bathrooms": 18,
            "livingRooms": 1,
            "floors": 4,
            "age": "4 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي الصواري. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-24"
        },
        {
            "id": "PROP-124",
            "title": "تاون هاوس عصري داخل مجمع سكني مغلق مع حراسة بـحي الحمراء (الدمام)",
            "type": "فيلا",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 5150000,
            "priceDisplay": "٥٬١٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الدمام",
            "district": "حي الحمراء",
            "address": "حي الحمراء، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 776,
            "rooms": 4,
            "bathrooms": 5,
            "livingRooms": 2,
            "floors": 3,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي الحمراء. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-25"
        },
        {
            "id": "PROP-125",
            "title": "فيلا زاوية على شارعين بتصميم معماري حديث بـحي الشوقية (مكة المكرمة)",
            "type": "شقة",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1450000,
            "priceDisplay": "١٬٤٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "مكة المكرمة",
            "district": "حي الشوقية",
            "address": "حي الشوقية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 235,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "1 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي الشوقية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-26"
        },
        {
            "id": "PROP-126",
            "title": "دوبلكس راقي بمدخل خاص وسطح مجهز كجلسة لاونج بـحي العيون (المدينة المنورة)",
            "type": "بنتهاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2800000,
            "priceDisplay": "٢٬٨٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "المدينة المنورة",
            "district": "حي العيون",
            "address": "حي العيون، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 374,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "2 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي العيون. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-27"
        },
        {
            "id": "PROP-127",
            "title": "مبنى تجاري إداري مؤجر بعائد استثماري مجزي بـحي النزهة (أبها)",
            "type": "تاون هاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2500000,
            "priceDisplay": "٢٬٥٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "أبها",
            "district": "حي النزهة",
            "address": "حي النزهة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 343,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "3 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي النزهة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-28"
        },
        {
            "id": "PROP-128",
            "title": "فيلا درج صالة مع شقة مسروقة واستقلالية تامة بـحي المونسية (الرياض)",
            "type": "شاليه",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1450000,
            "priceDisplay": "١٬٤٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الرياض",
            "district": "حي المونسية",
            "address": "حي المونسية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 382,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي المونسية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-01"
        },
        {
            "id": "PROP-129",
            "title": "شقة تمليك عائلية فندقية مؤثثة بالكامل بـحي البساتين (جدة)",
            "type": "مبنى تجاري",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 10100000,
            "priceDisplay": "١٠٬١٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "جدة",
            "district": "حي البساتين",
            "address": "حي البساتين، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 1151,
            "rooms": 11,
            "bathrooms": 11,
            "livingRooms": 1,
            "floors": 4,
            "age": "5 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي البساتين. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-02"
        },
        {
            "id": "PROP-130",
            "title": "فيلا مودرن فاخرة بتشطيب سوبر ديلوكس مع مسبح بـحي الراكة الجنوبية (الخبر)",
            "type": "فيلا",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 5900000,
            "priceDisplay": "٥٬٩٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الخبر",
            "district": "حي الراكة الجنوبية",
            "address": "حي الراكة الجنوبية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 360,
            "rooms": 6,
            "bathrooms": 7,
            "livingRooms": 2,
            "floors": 3,
            "age": "1 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي الراكة الجنوبية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-03"
        },
        {
            "id": "PROP-131",
            "title": "قصر سكني بتصميم كلاسيكي راقي وحديقة واسعة بـحي الفيصلية (الدمام)",
            "type": "شقة",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1050000,
            "priceDisplay": "١٬٠٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الدمام",
            "district": "حي الفيصلية",
            "address": "حي الفيصلية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 229,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "2 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي الفيصلية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-04"
        },
        {
            "id": "PROP-132",
            "title": "بنتهاوس فاخر بإطلالة بانورامية ساحرة وتراس بـحي العزيزية (مكة المكرمة)",
            "type": "بنتهاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 3550000,
            "priceDisplay": "٣٬٥٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "مكة المكرمة",
            "district": "حي العزيزية",
            "address": "حي العزيزية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 288,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي العزيزية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-05"
        },
        {
            "id": "PROP-133",
            "title": "شقة سكنية بتصميم ذكي وإطلالة مفتوحة بـحي الهدا (المدينة المنورة)",
            "type": "تاون هاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2050000,
            "priceDisplay": "٢٬٠٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "المدينة المنورة",
            "district": "حي الهدا",
            "address": "حي الهدا، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 327,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "4 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي الهدا. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-06"
        },
        {
            "id": "PROP-134",
            "title": "تاون هاوس عصري داخل مجمع سكني مغلق مع حراسة بـحي الضباب (أبها)",
            "type": "شاليه",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2200000,
            "priceDisplay": "٢٬٢٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "أبها",
            "district": "حي الضباب",
            "address": "حي الضباب، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 496,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "5 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي الضباب. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-07"
        },
        {
            "id": "PROP-135",
            "title": "فيلا زاوية على شارعين بتصميم معماري حديث بـحي حطين (الرياض)",
            "type": "مبنى تجاري",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 10800000,
            "priceDisplay": "١٠٬٨٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الرياض",
            "district": "حي حطين",
            "address": "حي حطين، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 1265,
            "rooms": 17,
            "bathrooms": 17,
            "livingRooms": 1,
            "floors": 4,
            "age": "1 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي حطين. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-08"
        },
        {
            "id": "PROP-136",
            "title": "دوبلكس راقي بمدخل خاص وسطح مجهز كجلسة لاونج بـحي الحمراء (جدة)",
            "type": "فيلا",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 6650000,
            "priceDisplay": "٦٬٦٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "جدة",
            "district": "حي الحمراء",
            "address": "حي الحمراء، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 474,
            "rooms": 4,
            "bathrooms": 5,
            "livingRooms": 2,
            "floors": 3,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي الحمراء. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-09"
        },
        {
            "id": "PROP-137",
            "title": "مبنى تجاري إداري مؤجر بعائد استثماري مجزي بـحي التحلية (الخبر)",
            "type": "شقة",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1750000,
            "priceDisplay": "١٬٧٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الخبر",
            "district": "حي التحلية",
            "address": "حي التحلية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 223,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "3 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي التحلية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-10"
        },
        {
            "id": "PROP-138",
            "title": "فيلا درج صالة مع شقة مسروقة واستقلالية تامة بـحي الفاخرية (الدمام)",
            "type": "بنتهاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 4300000,
            "priceDisplay": "٤٬٣٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الدمام",
            "district": "حي الفاخرية",
            "address": "حي الفاخرية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 402,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "4 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي الفاخرية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-11"
        },
        {
            "id": "PROP-139",
            "title": "شقة تمليك عائلية فندقية مؤثثة بالكامل بـحي النسيم (مكة المكرمة)",
            "type": "تاون هاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1650000,
            "priceDisplay": "١٬٦٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "مكة المكرمة",
            "district": "حي النسيم",
            "address": "حي النسيم، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 311,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "5 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي النسيم. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-12"
        },
        {
            "id": "PROP-140",
            "title": "فيلا مودرن فاخرة بتشطيب سوبر ديلوكس مع مسبح بـحي سلطانة (المدينة المنورة)",
            "type": "شاليه",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1350000,
            "priceDisplay": "١٬٣٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "المدينة المنورة",
            "district": "حي سلطانة",
            "address": "حي سلطانة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 360,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي سلطانة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-13"
        },
        {
            "id": "PROP-141",
            "title": "قصر سكني بتصميم كلاسيكي راقي وحديقة واسعة بـحي المنسك (أبها)",
            "type": "مبنى تجاري",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 11550000,
            "priceDisplay": "١١٬٥٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "أبها",
            "district": "حي المنسك",
            "address": "حي المنسك، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 1379,
            "rooms": 10,
            "bathrooms": 10,
            "livingRooms": 1,
            "floors": 4,
            "age": "2 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي المنسك. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-14"
        },
        {
            "id": "PROP-142",
            "title": "بنتهاوس فاخر بإطلالة بانورامية ساحرة وتراس بـحي العقيق (الرياض)",
            "type": "فيلا",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 7400000,
            "priceDisplay": "٧٬٤٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الرياض",
            "district": "حي العقيق",
            "address": "حي العقيق، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 588,
            "rooms": 6,
            "bathrooms": 7,
            "livingRooms": 2,
            "floors": 3,
            "age": "3 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي العقيق. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-15"
        },
        {
            "id": "PROP-143",
            "title": "شقة سكنية بتصميم ذكي وإطلالة مفتوحة بـحي النعيم (جدة)",
            "type": "شقة",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1350000,
            "priceDisplay": "١٬٣٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "جدة",
            "district": "حي النعيم",
            "address": "حي النعيم، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 217,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "4 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي النعيم. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-16"
        },
        {
            "id": "PROP-144",
            "title": "تاون هاوس عصري داخل مجمع سكني مغلق مع حراسة بـحي العليا (الخبر)",
            "type": "بنتهاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 5050000,
            "priceDisplay": "٥٬٠٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الخبر",
            "district": "حي العليا",
            "address": "حي العليا، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 316,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي العليا. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-17"
        },
        {
            "id": "PROP-145",
            "title": "فيلا زاوية على شارعين بتصميم معماري حديث بـحي الشاطئ الشرقي (الدمام)",
            "type": "تاون هاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2400000,
            "priceDisplay": "٢٬٤٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الدمام",
            "district": "حي الشاطئ الشرقي",
            "address": "حي الشاطئ الشرقي، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 295,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "1 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي الشاطئ الشرقي. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-18"
        },
        {
            "id": "PROP-146",
            "title": "دوبلكس راقي بمدخل خاص وسطح مجهز كجلسة لاونج بـحي العوالي (مكة المكرمة)",
            "type": "شاليه",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2100000,
            "priceDisplay": "٢٬١٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "مكة المكرمة",
            "district": "حي العوالي",
            "address": "حي العوالي، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 474,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "2 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي العوالي. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-19"
        },
        {
            "id": "PROP-147",
            "title": "مبنى تجاري إداري مؤجر بعائد استثماري مجزي بـحي باقدو (المدينة المنورة)",
            "type": "مبنى تجاري",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 12300000,
            "priceDisplay": "١٢٬٣٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "المدينة المنورة",
            "district": "حي باقدو",
            "address": "حي باقدو، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 1493,
            "rooms": 16,
            "bathrooms": 16,
            "livingRooms": 1,
            "floors": 4,
            "age": "3 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي باقدو. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-20"
        },
        {
            "id": "PROP-148",
            "title": "فيلا درج صالة مع شقة مسروقة واستقلالية تامة بـحي المفتاحة (أبها)",
            "type": "فيلا",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2850000,
            "priceDisplay": "٢٬٨٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "أبها",
            "district": "حي المفتاحة",
            "address": "حي المفتاحة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 702,
            "rooms": 4,
            "bathrooms": 5,
            "livingRooms": 2,
            "floors": 3,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي المفتاحة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-21"
        },
        {
            "id": "PROP-149",
            "title": "شقة تمليك عائلية فندقية مؤثثة بالكامل بـحي الربيع (الرياض)",
            "type": "شقة",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 950000,
            "priceDisplay": "٩٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الرياض",
            "district": "حي الربيع",
            "address": "حي الربيع، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 211,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "5 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي الربيع. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-22"
        },
        {
            "id": "PROP-150",
            "title": "فيلا مودرن فاخرة بتشطيب سوبر ديلوكس مع مسبح بـحي السلامة (جدة)",
            "type": "بنتهاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2950000,
            "priceDisplay": "٢٬٩٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "جدة",
            "district": "حي السلامة",
            "address": "حي السلامة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 430,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "1 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي السلامة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-23"
        },
        {
            "id": "PROP-151",
            "title": "قصر سكني بتصميم كلاسيكي راقي وحديقة واسعة بـحي العقربية (الخبر)",
            "type": "تاون هاوس",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 2000000,
            "priceDisplay": "٢٬٠٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الخبر",
            "district": "حي العقربية",
            "address": "حي العقربية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 279,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "2 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي العقربية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-24"
        },
        {
            "id": "PROP-152",
            "title": "بنتهاوس فاخر بإطلالة بانورامية ساحرة وتراس بـحي المزروعية (الدمام)",
            "type": "شاليه",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1200000,
            "priceDisplay": "١٬٢٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "الدمام",
            "district": "حي المزروعية",
            "address": "حي المزروعية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 588,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي المزروعية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-25"
        },
        {
            "id": "PROP-153",
            "title": "شقة سكنية بتصميم ذكي وإطلالة مفتوحة بـحي الشوقية (مكة المكرمة)",
            "type": "مبنى تجاري",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 13050000,
            "priceDisplay": "١٣٬٠٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "مكة المكرمة",
            "district": "حي الشوقية",
            "address": "حي الشوقية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 1607,
            "rooms": 9,
            "bathrooms": 9,
            "livingRooms": 1,
            "floors": 4,
            "age": "4 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي الشوقية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-26"
        },
        {
            "id": "PROP-154",
            "title": "تاون هاوس عصري داخل مجمع سكني مغلق مع حراسة بـحي العيون (المدينة المنورة)",
            "type": "فيلا",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 3550000,
            "priceDisplay": "٣٬٥٥٠٬٠٠٠ ريال",
            "rates": null,
            "city": "المدينة المنورة",
            "district": "حي العيون",
            "address": "حي العيون، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 816,
            "rooms": 6,
            "bathrooms": 7,
            "livingRooms": 2,
            "floors": 3,
            "age": "5 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": false,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي العيون. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-27"
        },
        {
            "id": "PROP-155",
            "title": "فيلا زاوية على شارعين بتصميم معماري حديث بـحي النزهة (أبها)",
            "type": "شقة",
            "category": "buy",
            "rentPeriod": null,
            "rentPeriodsAvailable": null,
            "price": 1700000,
            "priceDisplay": "١٬٧٠٠٬٠٠٠ ريال",
            "rates": null,
            "city": "أبها",
            "district": "حي النزهة",
            "address": "حي النزهة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 205,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "1 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي النزهة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-28"
        },
        {
            "id": "PROP-156",
            "title": "شقة مفروشة VIP متكاملة بأثاث راقي وموقع حيوي بـحي السليمانية (الرياض)",
            "type": "بنتهاوس",
            "category": "rent",
            "rentPeriod": "يومي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي"
            ],
            "price": 1610,
            "priceDisplay": "١٬٦١٠ ريال / يومياً",
            "rates": {
                "daily": 1610,
                "weekly": 9660,
                "monthly": 35420
            },
            "city": "الرياض",
            "district": "حي السليمانية",
            "address": "حي السليمانية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 344,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي السليمانية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-01"
        },
        {
            "id": "PROP-157",
            "title": "فيلا عائلية راقية للإيجار بموقع هادئ وتشطيب فاخر بـحي أبحر الشمالية (جدة)",
            "type": "تاون هاوس",
            "category": "rent",
            "rentPeriod": "أسبوعي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي",
                "شهري"
            ],
            "price": 2880,
            "priceDisplay": "٢٬٨٨٠ ريال / أسبوعياً",
            "rates": {
                "daily": 480,
                "weekly": 2880,
                "monthly": 10368
            },
            "city": "جدة",
            "district": "حي أبحر الشمالية",
            "address": "حي أبحر الشمالية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 263,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "3 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي أبحر الشمالية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-02"
        },
        {
            "id": "PROP-158",
            "title": "شاليه واستراحة فخمة مع مسبح خاص وجلسة خارجية بـحي اليرموك (الخبر)",
            "type": "شاليه",
            "category": "rent",
            "rentPeriod": "شهري",
            "rentPeriodsAvailable": [
                "شهري",
                "سنوي"
            ],
            "price": 16600,
            "priceDisplay": "١٦٬٦٠٠ ريال / شهرياً",
            "rates": {
                "monthly": 16600,
                "yearly": 174300
            },
            "city": "الخبر",
            "district": "حي اليرموك",
            "address": "حي اليرموك، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 452,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "4 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي اليرموك. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-03"
        },
        {
            "id": "PROP-159",
            "title": "بنتهاوس للإيجار بإطلالة مفتوحة ومسبح خاص بـحي الحمراء (الدمام)",
            "type": "مبنى تجاري",
            "category": "rent",
            "rentPeriod": "سنوي",
            "rentPeriodsAvailable": [
                "سنوي"
            ],
            "price": 120500,
            "priceDisplay": "١٢٠٬٥٠٠ ريال / سنوياً",
            "rates": {
                "yearly": 120500,
                "monthly": 10955
            },
            "city": "الدمام",
            "district": "حي الحمراء",
            "address": "حي الحمراء، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 1721,
            "rooms": 15,
            "bathrooms": 15,
            "livingRooms": 1,
            "floors": 4,
            "age": "5 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي الحمراء. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-04"
        },
        {
            "id": "PROP-160",
            "title": "شقة استوديو مؤثثة بالكامل شاملة الفواتير والإنترنت بـحي العزيزية (مكة المكرمة)",
            "type": "فيلا",
            "category": "rent",
            "rentPeriod": "يومي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي"
            ],
            "price": 1950,
            "priceDisplay": "١٬٩٥٠ ريال / يومياً",
            "rates": {
                "daily": 1950,
                "weekly": 11700,
                "monthly": 42900
            },
            "city": "مكة المكرمة",
            "district": "حي العزيزية",
            "address": "حي العزيزية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 400,
            "rooms": 4,
            "bathrooms": 5,
            "livingRooms": 2,
            "floors": 3,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي العزيزية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-05"
        },
        {
            "id": "PROP-161",
            "title": "تاون هاوس راقي للإيجار السنوي داخل كمباوند متكامل بـحي الهدا (المدينة المنورة)",
            "type": "شقة",
            "category": "rent",
            "rentPeriod": "أسبوعي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي",
                "شهري"
            ],
            "price": 3840,
            "priceDisplay": "٣٬٨٤٠ ريال / أسبوعياً",
            "rates": {
                "daily": 640,
                "weekly": 3840,
                "monthly": 13824
            },
            "city": "المدينة المنورة",
            "district": "حي الهدا",
            "address": "حي الهدا، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 199,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "2 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي الهدا. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-06"
        },
        {
            "id": "PROP-162",
            "title": "فيلا مودرن مستقلة مع غرفة سائق ومطبخ راكب بـحي الضباب (أبها)",
            "type": "بنتهاوس",
            "category": "rent",
            "rentPeriod": "شهري",
            "rentPeriodsAvailable": [
                "شهري",
                "سنوي"
            ],
            "price": 18400,
            "priceDisplay": "١٨٬٤٠٠ ريال / شهرياً",
            "rates": {
                "monthly": 18400,
                "yearly": 193200
            },
            "city": "أبها",
            "district": "حي الضباب",
            "address": "حي الضباب، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 458,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "3 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي الضباب. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-07"
        },
        {
            "id": "PROP-163",
            "title": "مقر إداري ومكاتب عمل مفروشة ومجهزة بالكامل بـحي اليرموك (الرياض)",
            "type": "تاون هاوس",
            "category": "rent",
            "rentPeriod": "سنوي",
            "rentPeriodsAvailable": [
                "سنوي"
            ],
            "price": 138500,
            "priceDisplay": "١٣٨٬٥٠٠ ريال / سنوياً",
            "rates": {
                "yearly": 138500,
                "monthly": 12591
            },
            "city": "الرياض",
            "district": "حي اليرموك",
            "address": "حي اليرموك، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 247,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "4 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي اليرموك. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-08"
        },
        {
            "id": "PROP-164",
            "title": "شقة مفروشة VIP متكاملة بأثاث راقي وموقع حيوي بـحي المرجان (جدة)",
            "type": "شاليه",
            "category": "rent",
            "rentPeriod": "يومي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي"
            ],
            "price": 490,
            "priceDisplay": "٤٩٠ ريال / يومياً",
            "rates": {
                "daily": 490,
                "weekly": 2940,
                "monthly": 10780
            },
            "city": "جدة",
            "district": "حي المرجان",
            "address": "حي المرجان، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 566,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي المرجان. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-09"
        },
        {
            "id": "PROP-165",
            "title": "فيلا عائلية راقية للإيجار بموقع هادئ وتشطيب فاخر بـحي الكورنيش (الخبر)",
            "type": "مبنى تجاري",
            "category": "rent",
            "rentPeriod": "أسبوعي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي",
                "شهري"
            ],
            "price": 4800,
            "priceDisplay": "٤٬٨٠٠ ريال / أسبوعياً",
            "rates": {
                "daily": 800,
                "weekly": 4800,
                "monthly": 17280
            },
            "city": "الخبر",
            "district": "حي الكورنيش",
            "address": "حي الكورنيش، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 1835,
            "rooms": 8,
            "bathrooms": 8,
            "livingRooms": 1,
            "floors": 4,
            "age": "1 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي الكورنيش. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-10"
        },
        {
            "id": "PROP-166",
            "title": "شاليه واستراحة فخمة مع مسبح خاص وجلسة خارجية بـحي الفيصلية (الدمام)",
            "type": "فيلا",
            "category": "rent",
            "rentPeriod": "شهري",
            "rentPeriodsAvailable": [
                "شهري",
                "سنوي"
            ],
            "price": 6200,
            "priceDisplay": "٦٬٢٠٠ ريال / شهرياً",
            "rates": {
                "monthly": 6200,
                "yearly": 65100
            },
            "city": "الدمام",
            "district": "حي الفيصلية",
            "address": "حي الفيصلية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 514,
            "rooms": 6,
            "bathrooms": 7,
            "livingRooms": 2,
            "floors": 3,
            "age": "2 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي الفيصلية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-11"
        },
        {
            "id": "PROP-167",
            "title": "بنتهاوس للإيجار بإطلالة مفتوحة ومسبح خاص بـحي النسيم (مكة المكرمة)",
            "type": "شقة",
            "category": "rent",
            "rentPeriod": "سنوي",
            "rentPeriodsAvailable": [
                "سنوي"
            ],
            "price": 156500,
            "priceDisplay": "١٥٦٬٥٠٠ ريال / سنوياً",
            "rates": {
                "yearly": 156500,
                "monthly": 14227
            },
            "city": "مكة المكرمة",
            "district": "حي النسيم",
            "address": "حي النسيم، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 193,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "3 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي النسيم. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-12"
        },
        {
            "id": "PROP-168",
            "title": "شقة استوديو مؤثثة بالكامل شاملة الفواتير والإنترنت بـحي سلطانة (المدينة المنورة)",
            "type": "بنتهاوس",
            "category": "rent",
            "rentPeriod": "يومي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي"
            ],
            "price": 830,
            "priceDisplay": "٨٣٠ ريال / يومياً",
            "rates": {
                "daily": 830,
                "weekly": 4980,
                "monthly": 18260
            },
            "city": "المدينة المنورة",
            "district": "حي سلطانة",
            "address": "حي سلطانة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 372,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي سلطانة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-13"
        },
        {
            "id": "PROP-169",
            "title": "تاون هاوس راقي للإيجار السنوي داخل كمباوند متكامل بـحي المنسك (أبها)",
            "type": "تاون هاوس",
            "category": "rent",
            "rentPeriod": "أسبوعي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي",
                "شهري"
            ],
            "price": 5760,
            "priceDisplay": "٥٬٧٦٠ ريال / أسبوعياً",
            "rates": {
                "daily": 960,
                "weekly": 5760,
                "monthly": 20736
            },
            "city": "أبها",
            "district": "حي المنسك",
            "address": "حي المنسك، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 231,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "5 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي المنسك. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-14"
        },
        {
            "id": "PROP-170",
            "title": "فيلا مودرن مستقلة مع غرفة سائق ومطبخ راكب بـحي الياسمين (الرياض)",
            "type": "شاليه",
            "category": "rent",
            "rentPeriod": "شهري",
            "rentPeriodsAvailable": [
                "شهري",
                "سنوي"
            ],
            "price": 8000,
            "priceDisplay": "٨٬٠٠٠ ريال / شهرياً",
            "rates": {
                "monthly": 8000,
                "yearly": 84000
            },
            "city": "الرياض",
            "district": "حي الياسمين",
            "address": "حي الياسمين، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 430,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "1 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي الياسمين. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-15"
        },
        {
            "id": "PROP-171",
            "title": "مقر إداري ومكاتب عمل مفروشة ومجهزة بالكامل بـحي الزهراء (جدة)",
            "type": "مبنى تجاري",
            "category": "rent",
            "rentPeriod": "سنوي",
            "rentPeriodsAvailable": [
                "سنوي"
            ],
            "price": 174500,
            "priceDisplay": "١٧٤٬٥٠٠ ريال / سنوياً",
            "rates": {
                "yearly": 174500,
                "monthly": 15864
            },
            "city": "جدة",
            "district": "حي الزهراء",
            "address": "حي الزهراء، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 1949,
            "rooms": 14,
            "bathrooms": 14,
            "livingRooms": 1,
            "floors": 4,
            "age": "2 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي الزهراء. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-16"
        },
        {
            "id": "PROP-172",
            "title": "شقة مفروشة VIP متكاملة بأثاث راقي وموقع حيوي بـحي الحزام الذهبي (الخبر)",
            "type": "فيلا",
            "category": "rent",
            "rentPeriod": "يومي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي"
            ],
            "price": 1170,
            "priceDisplay": "١٬١٧٠ ريال / يومياً",
            "rates": {
                "daily": 1170,
                "weekly": 7020,
                "monthly": 25740
            },
            "city": "الخبر",
            "district": "حي الحزام الذهبي",
            "address": "حي الحزام الذهبي، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 628,
            "rooms": 4,
            "bathrooms": 5,
            "livingRooms": 2,
            "floors": 3,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي الحزام الذهبي. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-17"
        },
        {
            "id": "PROP-173",
            "title": "فيلا عائلية راقية للإيجار بموقع هادئ وتشطيب فاخر بـحي الفاخرية (الدمام)",
            "type": "شقة",
            "category": "rent",
            "rentPeriod": "أسبوعي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي",
                "شهري"
            ],
            "price": 6720,
            "priceDisplay": "٦٬٧٢٠ ريال / أسبوعياً",
            "rates": {
                "daily": 1120,
                "weekly": 6720,
                "monthly": 24192
            },
            "city": "الدمام",
            "district": "حي الفاخرية",
            "address": "حي الفاخرية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 187,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "4 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي الفاخرية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-18"
        },
        {
            "id": "PROP-174",
            "title": "شاليه واستراحة فخمة مع مسبح خاص وجلسة خارجية بـحي العوالي (مكة المكرمة)",
            "type": "بنتهاوس",
            "category": "rent",
            "rentPeriod": "شهري",
            "rentPeriodsAvailable": [
                "شهري",
                "سنوي"
            ],
            "price": 9800,
            "priceDisplay": "٩٬٨٠٠ ريال / شهرياً",
            "rates": {
                "monthly": 9800,
                "yearly": 102900
            },
            "city": "مكة المكرمة",
            "district": "حي العوالي",
            "address": "حي العوالي، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 286,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "5 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي العوالي. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-19"
        },
        {
            "id": "PROP-175",
            "title": "بنتهاوس للإيجار بإطلالة مفتوحة ومسبح خاص بـحي باقدو (المدينة المنورة)",
            "type": "تاون هاوس",
            "category": "rent",
            "rentPeriod": "سنوي",
            "rentPeriodsAvailable": [
                "سنوي"
            ],
            "price": 192500,
            "priceDisplay": "١٩٢٬٥٠٠ ريال / سنوياً",
            "rates": {
                "yearly": 192500,
                "monthly": 17500
            },
            "city": "المدينة المنورة",
            "district": "حي باقدو",
            "address": "حي باقدو، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 345,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "1 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي باقدو. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-20"
        },
        {
            "id": "PROP-176",
            "title": "شقة استوديو مؤثثة بالكامل شاملة الفواتير والإنترنت بـحي المفتاحة (أبها)",
            "type": "شاليه",
            "category": "rent",
            "rentPeriod": "يومي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي"
            ],
            "price": 1510,
            "priceDisplay": "١٬٥١٠ ريال / يومياً",
            "rates": {
                "daily": 1510,
                "weekly": 9060,
                "monthly": 33220
            },
            "city": "أبها",
            "district": "حي المفتاحة",
            "address": "حي المفتاحة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 544,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي المفتاحة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-21"
        },
        {
            "id": "PROP-177",
            "title": "تاون هاوس راقي للإيجار السنوي داخل كمباوند متكامل بـحي الرمال (الرياض)",
            "type": "مبنى تجاري",
            "category": "rent",
            "rentPeriod": "أسبوعي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي",
                "شهري"
            ],
            "price": 7680,
            "priceDisplay": "٧٬٦٨٠ ريال / أسبوعياً",
            "rates": {
                "daily": 1280,
                "weekly": 7680,
                "monthly": 27648
            },
            "city": "الرياض",
            "district": "حي الرمال",
            "address": "حي الرمال، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 2063,
            "rooms": 20,
            "bathrooms": 20,
            "livingRooms": 1,
            "floors": 4,
            "age": "3 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي الرمال. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-22"
        },
        {
            "id": "PROP-178",
            "title": "فيلا مودرن مستقلة مع غرفة سائق ومطبخ راكب بـحي الروضة (جدة)",
            "type": "فيلا",
            "category": "rent",
            "rentPeriod": "شهري",
            "rentPeriodsAvailable": [
                "شهري",
                "سنوي"
            ],
            "price": 11600,
            "priceDisplay": "١١٬٦٠٠ ريال / شهرياً",
            "rates": {
                "monthly": 11600,
                "yearly": 121800
            },
            "city": "جدة",
            "district": "حي الروضة",
            "address": "حي الروضة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 742,
            "rooms": 6,
            "bathrooms": 7,
            "livingRooms": 2,
            "floors": 3,
            "age": "4 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي الروضة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-23"
        },
        {
            "id": "PROP-179",
            "title": "مقر إداري ومكاتب عمل مفروشة ومجهزة بالكامل بـحي الصواري (الخبر)",
            "type": "شقة",
            "category": "rent",
            "rentPeriod": "سنوي",
            "rentPeriodsAvailable": [
                "سنوي"
            ],
            "price": 210500,
            "priceDisplay": "٢١٠٬٥٠٠ ريال / سنوياً",
            "rates": {
                "yearly": 210500,
                "monthly": 19136
            },
            "city": "الخبر",
            "district": "حي الصواري",
            "address": "حي الصواري، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 181,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "5 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي الصواري. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-24"
        },
        {
            "id": "PROP-180",
            "title": "شقة مفروشة VIP متكاملة بأثاث راقي وموقع حيوي بـحي الشاطئ الشرقي (الدمام)",
            "type": "بنتهاوس",
            "category": "rent",
            "rentPeriod": "يومي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي"
            ],
            "price": 1850,
            "priceDisplay": "١٬٨٥٠ ريال / يومياً",
            "rates": {
                "daily": 1850,
                "weekly": 11100,
                "monthly": 40700
            },
            "city": "الدمام",
            "district": "حي الشاطئ الشرقي",
            "address": "حي الشاطئ الشرقي، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 400,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي الشاطئ الشرقي. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-25"
        },
        {
            "id": "PROP-181",
            "title": "فيلا عائلية راقية للإيجار بموقع هادئ وتشطيب فاخر بـحي الشوقية (مكة المكرمة)",
            "type": "تاون هاوس",
            "category": "rent",
            "rentPeriod": "أسبوعي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي",
                "شهري"
            ],
            "price": 8640,
            "priceDisplay": "٨٬٦٤٠ ريال / أسبوعياً",
            "rates": {
                "daily": 1440,
                "weekly": 8640,
                "monthly": 31104
            },
            "city": "مكة المكرمة",
            "district": "حي الشوقية",
            "address": "حي الشوقية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 329,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "2 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي الشوقية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-26"
        },
        {
            "id": "PROP-182",
            "title": "شاليه واستراحة فخمة مع مسبح خاص وجلسة خارجية بـحي العيون (المدينة المنورة)",
            "type": "شاليه",
            "category": "rent",
            "rentPeriod": "شهري",
            "rentPeriodsAvailable": [
                "شهري",
                "سنوي"
            ],
            "price": 13400,
            "priceDisplay": "١٣٬٤٠٠ ريال / شهرياً",
            "rates": {
                "monthly": 13400,
                "yearly": 140700
            },
            "city": "المدينة المنورة",
            "district": "حي العيون",
            "address": "حي العيون، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 408,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "3 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي العيون. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-27"
        },
        {
            "id": "PROP-183",
            "title": "بنتهاوس للإيجار بإطلالة مفتوحة ومسبح خاص بـحي النزهة (أبها)",
            "type": "مبنى تجاري",
            "category": "rent",
            "rentPeriod": "سنوي",
            "rentPeriodsAvailable": [
                "سنوي"
            ],
            "price": 228500,
            "priceDisplay": "٢٢٨٬٥٠٠ ريال / سنوياً",
            "rates": {
                "yearly": 228500,
                "monthly": 20773
            },
            "city": "أبها",
            "district": "حي النزهة",
            "address": "حي النزهة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 2177,
            "rooms": 13,
            "bathrooms": 13,
            "livingRooms": 1,
            "floors": 4,
            "age": "4 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي النزهة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-28"
        },
        {
            "id": "PROP-184",
            "title": "شقة استوديو مؤثثة بالكامل شاملة الفواتير والإنترنت بـحي العارض (الرياض)",
            "type": "فيلا",
            "category": "rent",
            "rentPeriod": "يومي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي"
            ],
            "price": 2190,
            "priceDisplay": "٢٬١٩٠ ريال / يومياً",
            "rates": {
                "daily": 2190,
                "weekly": 13140,
                "monthly": 48180
            },
            "city": "الرياض",
            "district": "حي العارض",
            "address": "حي العارض، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 326,
            "rooms": 4,
            "bathrooms": 5,
            "livingRooms": 2,
            "floors": 3,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي العارض. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-01"
        },
        {
            "id": "PROP-185",
            "title": "تاون هاوس راقي للإيجار السنوي داخل كمباوند متكامل بـحي الأندلس (جدة)",
            "type": "شقة",
            "category": "rent",
            "rentPeriod": "أسبوعي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي",
                "شهري"
            ],
            "price": 3100,
            "priceDisplay": "٣٬١٠٠ ريال / أسبوعياً",
            "rates": {
                "daily": 517,
                "weekly": 3100,
                "monthly": 11160
            },
            "city": "جدة",
            "district": "حي الأندلس",
            "address": "حي الأندلس، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 175,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "1 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي الأندلس. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-02"
        },
        {
            "id": "PROP-186",
            "title": "فيلا مودرن مستقلة مع غرفة سائق ومطبخ راكب بـحي الراكة الجنوبية (الخبر)",
            "type": "بنتهاوس",
            "category": "rent",
            "rentPeriod": "شهري",
            "rentPeriodsAvailable": [
                "شهري",
                "سنوي"
            ],
            "price": 15200,
            "priceDisplay": "١٥٬٢٠٠ ريال / شهرياً",
            "rates": {
                "monthly": 15200,
                "yearly": 159600
            },
            "city": "الخبر",
            "district": "حي الراكة الجنوبية",
            "address": "حي الراكة الجنوبية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 314,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "2 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي الراكة الجنوبية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-03"
        },
        {
            "id": "PROP-187",
            "title": "مقر إداري ومكاتب عمل مفروشة ومجهزة بالكامل بـحي المزروعية (الدمام)",
            "type": "تاون هاوس",
            "category": "rent",
            "rentPeriod": "سنوي",
            "rentPeriodsAvailable": [
                "سنوي"
            ],
            "price": 56500,
            "priceDisplay": "٥٦٬٥٠٠ ريال / سنوياً",
            "rates": {
                "yearly": 56500,
                "monthly": 5136
            },
            "city": "الدمام",
            "district": "حي المزروعية",
            "address": "حي المزروعية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 313,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "3 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي المزروعية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-04"
        },
        {
            "id": "PROP-188",
            "title": "شقة مفروشة VIP متكاملة بأثاث راقي وموقع حيوي بـحي العزيزية (مكة المكرمة)",
            "type": "شاليه",
            "category": "rent",
            "rentPeriod": "يومي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي"
            ],
            "price": 730,
            "priceDisplay": "٧٣٠ ريال / يومياً",
            "rates": {
                "daily": 730,
                "weekly": 4380,
                "monthly": 16060
            },
            "city": "مكة المكرمة",
            "district": "حي العزيزية",
            "address": "حي العزيزية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 522,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي العزيزية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-05"
        },
        {
            "id": "PROP-189",
            "title": "فيلا عائلية راقية للإيجار بموقع هادئ وتشطيب فاخر بـحي الهدا (المدينة المنورة)",
            "type": "مبنى تجاري",
            "category": "rent",
            "rentPeriod": "أسبوعي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي",
                "شهري"
            ],
            "price": 4060,
            "priceDisplay": "٤٬٠٦٠ ريال / أسبوعياً",
            "rates": {
                "daily": 677,
                "weekly": 4060,
                "monthly": 14616
            },
            "city": "المدينة المنورة",
            "district": "حي الهدا",
            "address": "حي الهدا، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 691,
            "rooms": 19,
            "bathrooms": 19,
            "livingRooms": 1,
            "floors": 4,
            "age": "5 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي الهدا. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-06"
        },
        {
            "id": "PROP-190",
            "title": "شاليه واستراحة فخمة مع مسبح خاص وجلسة خارجية بـحي الضباب (أبها)",
            "type": "فيلا",
            "category": "rent",
            "rentPeriod": "شهري",
            "rentPeriodsAvailable": [
                "شهري",
                "سنوي"
            ],
            "price": 17000,
            "priceDisplay": "١٧٬٠٠٠ ريال / شهرياً",
            "rates": {
                "monthly": 17000,
                "yearly": 178500
            },
            "city": "أبها",
            "district": "حي الضباب",
            "address": "حي الضباب، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 440,
            "rooms": 6,
            "bathrooms": 7,
            "livingRooms": 2,
            "floors": 3,
            "age": "1 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي الضباب. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-07"
        },
        {
            "id": "PROP-191",
            "title": "بنتهاوس للإيجار بإطلالة مفتوحة ومسبح خاص بـحي الدرعية (الرياض)",
            "type": "شقة",
            "category": "rent",
            "rentPeriod": "سنوي",
            "rentPeriodsAvailable": [
                "سنوي"
            ],
            "price": 74500,
            "priceDisplay": "٧٤٬٥٠٠ ريال / سنوياً",
            "rates": {
                "yearly": 74500,
                "monthly": 6773
            },
            "city": "الرياض",
            "district": "حي الدرعية",
            "address": "حي الدرعية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 169,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "2 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي الدرعية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-08"
        },
        {
            "id": "PROP-192",
            "title": "شقة استوديو مؤثثة بالكامل شاملة الفواتير والإنترنت بـحي المحمدية (جدة)",
            "type": "بنتهاوس",
            "category": "rent",
            "rentPeriod": "يومي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي"
            ],
            "price": 1070,
            "priceDisplay": "١٬٠٧٠ ريال / يومياً",
            "rates": {
                "daily": 1070,
                "weekly": 6420,
                "monthly": 23540
            },
            "city": "جدة",
            "district": "حي المحمدية",
            "address": "حي المحمدية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 428,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي المحمدية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-09"
        },
        {
            "id": "PROP-193",
            "title": "تاون هاوس راقي للإيجار السنوي داخل كمباوند متكامل بـحي التحلية (الخبر)",
            "type": "تاون هاوس",
            "category": "rent",
            "rentPeriod": "أسبوعي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي",
                "شهري"
            ],
            "price": 5020,
            "priceDisplay": "٥٬٠٢٠ ريال / أسبوعياً",
            "rates": {
                "daily": 837,
                "weekly": 5020,
                "monthly": 18072
            },
            "city": "الخبر",
            "district": "حي التحلية",
            "address": "حي التحلية، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 297,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "4 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي التحلية. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-10"
        },
        {
            "id": "PROP-194",
            "title": "فيلا مودرن مستقلة مع غرفة سائق ومطبخ راكب بـحي الحمراء (الدمام)",
            "type": "شاليه",
            "category": "rent",
            "rentPeriod": "شهري",
            "rentPeriodsAvailable": [
                "شهري",
                "سنوي"
            ],
            "price": 4800,
            "priceDisplay": "٤٬٨٠٠ ريال / شهرياً",
            "rates": {
                "monthly": 4800,
                "yearly": 50400
            },
            "city": "الدمام",
            "district": "حي الحمراء",
            "address": "حي الحمراء، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 386,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "5 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الدمام بـحي الحمراء. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-11"
        },
        {
            "id": "PROP-195",
            "title": "مقر إداري ومكاتب عمل مفروشة ومجهزة بالكامل بـحي النسيم (مكة المكرمة)",
            "type": "مبنى تجاري",
            "category": "rent",
            "rentPeriod": "سنوي",
            "rentPeriodsAvailable": [
                "سنوي"
            ],
            "price": 92500,
            "priceDisplay": "٩٢٬٥٠٠ ريال / سنوياً",
            "rates": {
                "yearly": 92500,
                "monthly": 8409
            },
            "city": "مكة المكرمة",
            "district": "حي النسيم",
            "address": "حي النسيم، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 805,
            "rooms": 12,
            "bathrooms": 12,
            "livingRooms": 1,
            "floors": 4,
            "age": "1 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق مكة المكرمة بـحي النسيم. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تشطيبات رخام طبيعي وبورسلان إسباني",
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي"
            ],
            "broker": {
                "name": "هشام الخالدي",
                "title": "مدير وساطة المنطقة الشرقية",
                "company": "ديار الشرقية للعقارات",
                "phone": "+966 53 111 8899",
                "rating": 4.8,
                "reviewsCount": 45,
                "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-12"
        },
        {
            "id": "PROP-196",
            "title": "شقة مفروشة VIP متكاملة بأثاث راقي وموقع حيوي بـحي سلطانة (المدينة المنورة)",
            "type": "فيلا",
            "category": "rent",
            "rentPeriod": "يومي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي"
            ],
            "price": 1410,
            "priceDisplay": "١٬٤١٠ ريال / يومياً",
            "rates": {
                "daily": 1410,
                "weekly": 8460,
                "monthly": 31020
            },
            "city": "المدينة المنورة",
            "district": "حي سلطانة",
            "address": "حي سلطانة، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 554,
            "rooms": 4,
            "bathrooms": 5,
            "livingRooms": 2,
            "floors": 3,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": true,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق المدينة المنورة بـحي سلطانة. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مسبح خاص بنظام تدفئة وتنقية ذكي",
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء"
            ],
            "broker": {
                "name": "عبدالرحمن الشمري",
                "title": "مستشار عقاري معتمد - رخصة فال 120045",
                "company": "شركة الأفق للتطوير والاستثمار العقاري",
                "phone": "+966 55 123 4567",
                "rating": 4.9,
                "reviewsCount": 38,
                "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-13"
        },
        {
            "id": "PROP-197",
            "title": "فيلا عائلية راقية للإيجار بموقع هادئ وتشطيب فاخر بـحي المنسك (أبها)",
            "type": "شقة",
            "category": "rent",
            "rentPeriod": "أسبوعي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي",
                "شهري"
            ],
            "price": 5980,
            "priceDisplay": "٥٬٩٨٠ ريال / أسبوعياً",
            "rates": {
                "daily": 997,
                "weekly": 5980,
                "monthly": 21528
            },
            "city": "أبها",
            "district": "حي المنسك",
            "address": "حي المنسك، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 163,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 1,
            "floors": 1,
            "age": "3 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق أبها بـحي المنسك. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "مصعد بانورامي حديث يخدم كافة الأدوار",
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة"
            ],
            "broker": {
                "name": "مروان العمودي",
                "title": "وسيط عقارات فاخرة معتمد",
                "company": "مجموعة الماسة للوساطة العقارية",
                "phone": "+966 50 888 7766",
                "rating": 4.8,
                "reviewsCount": 52,
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-14"
        },
        {
            "id": "PROP-198",
            "title": "شاليه واستراحة فخمة مع مسبح خاص وجلسة خارجية بـحي النخيل (الرياض)",
            "type": "بنتهاوس",
            "category": "rent",
            "rentPeriod": "شهري",
            "rentPeriodsAvailable": [
                "شهري",
                "سنوي"
            ],
            "price": 6600,
            "priceDisplay": "٦٬٦٠٠ ريال / شهرياً",
            "rates": {
                "monthly": 6600,
                "yearly": 69300
            },
            "city": "الرياض",
            "district": "حي النخيل",
            "address": "حي النخيل، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 342,
            "rooms": 5,
            "bathrooms": 6,
            "livingRooms": 1,
            "floors": 2,
            "age": "4 سنوات",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": false,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الرياض بـحي النخيل. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "غرفة خادمة خاصة وغرفة سائق مستقلة",
                "حديقة خارجية ومسطحات خضراء مع جلسة شواء",
                "ضمان 10 سنوات على الهيكل الإنشائي",
                "تشطيبات رخام طبيعي وبورسلان إسباني"
            ],
            "broker": {
                "name": "منى السالم",
                "title": "مديرة تأجير وإدارة أملاك",
                "company": "صروح لإدارة الأصول والضيافة",
                "phone": "+966 54 999 1122",
                "rating": 5,
                "reviewsCount": 64,
                "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-15"
        },
        {
            "id": "PROP-199",
            "title": "بنتهاوس للإيجار بإطلالة مفتوحة ومسبح خاص بـحي الشاطئ (جدة)",
            "type": "تاون هاوس",
            "category": "rent",
            "rentPeriod": "سنوي",
            "rentPeriodsAvailable": [
                "سنوي"
            ],
            "price": 110500,
            "priceDisplay": "١١٠٬٥٠٠ ريال / سنوياً",
            "rates": {
                "yearly": 110500,
                "monthly": 10045
            },
            "city": "جدة",
            "district": "حي الشاطئ",
            "address": "حي الشاطئ، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 281,
            "rooms": 3,
            "bathrooms": 3,
            "livingRooms": 2,
            "floors": 2,
            "age": "5 سنوات",
            "facade": "شرقية على شارع 25م",
            "isFurnished": false,
            "hasPool": false,
            "hasElevator": false,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق جدة بـحي الشاطئ. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "تكييف مركزي موفر للطاقة VRF بالكامل",
                "موقف سيارات مظلل يتسع لسيارتين أو أكثر",
                "ضمان 25 سنة على تمديدات السباكة والكهرباء",
                "مسبح خاص بنظام تدفئة وتنقية ذكي"
            ],
            "broker": {
                "name": "فهد الدوسري",
                "title": "وكيل تسويق وتأجير عقاري",
                "company": "مكتب ديار نجد العقاري",
                "phone": "+966 56 444 3322",
                "rating": 4.7,
                "reviewsCount": 29,
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-16"
        },
        {
            "id": "PROP-200",
            "title": "شقة استوديو مؤثثة بالكامل شاملة الفواتير والإنترنت بـحي العليا (الخبر)",
            "type": "شاليه",
            "category": "rent",
            "rentPeriod": "يومي",
            "rentPeriodsAvailable": [
                "يومي",
                "أسبوعي"
            ],
            "price": 1750,
            "priceDisplay": "١٬٧٥٠ ريال / يومياً",
            "rates": {
                "daily": 1750,
                "weekly": 10500,
                "monthly": 38500
            },
            "city": "الخبر",
            "district": "حي العليا",
            "address": "حي العليا، بالقرب من طريق رئيسي وخدمات عامة",
            "area": 500,
            "rooms": 3,
            "bathrooms": 4,
            "livingRooms": 1,
            "floors": 1,
            "age": "جديد (بناء حديث)",
            "facade": "شمالية على شارع 20م",
            "isFurnished": true,
            "hasPool": true,
            "hasElevator": true,
            "isFeatured": false,
            "verified": true,
            "status": "active",
            "images": [
                "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80",
                "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80"
            ],
            "description": "عقار مميز واستثنائي يتمتع بموقع استراتيجي في أرقى مناطق الخبر بـحي العليا. تشطيبات هندسية متكاملة تحت إشراف معتمد ومطابقة لكافة اشتراطات كود البناء السعودي. تتوفر كافة الضمانات والشهادات الإنشائية وخدمات التكييف والإنارة الذكية.",
            "features": [
                "نظام أمني ذكي وكاميرات مراقبة متطورة",
                "مطابق لكود البناء السعودي مع شهادة إتمام بناء",
                "عزل مائي وحراري فائق الجودة",
                "مصعد بانورامي حديث يخدم كافة الأدوار"
            ],
            "broker": {
                "name": "سلطان القحطاني",
                "title": "وسيط منتجعات واستجمام",
                "company": "صروح لتأجير العطلات",
                "phone": "+966 53 777 4411",
                "rating": 4.9,
                "reviewsCount": 88,
                "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80"
            },
            "dateAdded": "2026-08-17"
        }
    ],
    "engineeringServices": [
        {
            "id": "ENG-01",
            "title": "التصميم المعماري المتكامل والواجهات",
            "category": "تصميم",
            "icon": "📐",
            "badge": "الأكثر طلباً",
            "shortDesc": "تصميم مخططات معمارية ثلاثية الأبعاد (3D) عصرية ومطابقة لكود البناء السعودي مع تصميم الواجهات والحدائق.",
            "fullDesc": "نقدم حلولاً معمارية متقدمة تعتمد على استغلال أدق المساحات ومراعاة اتجاهات الشمس والرياح لتحقيق أعلى كفاءة طاقة وجمالية بصرية. يشمل العمل المخططات التنفيذية، الواجهات الخارجية، توزيع الإضاءة الطبيعية، وفيديو محاكاة واقعي 3D بجودة 4K قبل البدء بأعمال البناء.",
            "deliverables": [
                "مخططات معمارية تفصيلية معتمدة ورسمية",
                "تصميم واجهات 3D نهارية وليلية عالية الواقعية",
                "مخططات استغلال المساحات والتوزيع الداخلي",
                "إصدار رخصة البناء عبر منصة بلدي"
            ],
            "duration": "من 10 إلى 20 يوم عمل",
            "startingPrice": "ابتداءً من 25 ريال / م²"
        },
        {
            "id": "ENG-02",
            "title": "التصميم الإنشائي وتدقيق الأحمال",
            "category": "إنشائي",
            "icon": "🏢",
            "badge": "سلامة وأمان",
            "shortDesc": "حسابات دقيقة للكمرات والقواعد والأعمدة لتقليل هدر الحديد والخرسانة وضمان أقصى معايير السلامة الإنشائية.",
            "fullDesc": "يقوم فريقنا من مهندسي الإنشاءات بتصميم الهيكل الخرساني أو المعدني باستخدام أحدث البرامج الهندسية (ETABS, SAFE, Revit) مع تقديم تقرير تفصيلي بأحمال الزلازل والرياح وتحسين جداول التسليح لتوفير ما يصل إلى 20% من تكاليف المواد الإنشائية دون المساس بالأمان.",
            "deliverables": [
                "مخططات إنشائية تنفيذية شاملة جداول التسليح",
                "نوتة حسابية معتمدة ومفصلة للأحمال",
                "مطابقة معايير كود البناء السعودي (SBC)",
                "شهادة سلامة إنشائية معتمدة من مكتب مرخص"
            ],
            "duration": "من 7 إلى 14 يوم عمل",
            "startingPrice": "ابتداءً من 18 ريال / م²"
        },
        {
            "id": "ENG-03",
            "title": "التصميم الكهروميكانيكي (MEP)",
            "category": "كهروميكانيك",
            "icon": "⚡",
            "badge": "كفاءة واستدامة",
            "shortDesc": "تصميم شبكات التغذية والصرف الصحي، الأحمال الكهربائية، الإنارة الذكية، وأنظمة التكييف المركزي HVAC.",
            "fullDesc": "تصميم هندسي متكامل لشبكات الكهرباء، السباكة، والصرف، وأنظمة مكافحة الحريق، مع حساب أحمال التبريد الحرارية بدقة لاختيار أنسب أنظمة التكييف الموفرة لاستهلاك الكهرباء، وتجهيز المبنى للأنظمة الذكية Smart Home.",
            "deliverables": [
                "مخططات التمديدات الكهربائية ولوحات التوزيع",
                "مخططات السباكة والتغذية وضغط المياه والصرف",
                "تصميم أنظمة التكييف والتهوية الميكانيكية",
                "مخططات نظام مكافحة الحريق والإنذار المبكر"
            ],
            "duration": "من 7 إلى 12 يوم عمل",
            "startingPrice": "ابتداءً من 15 ريال / م²"
        },
        {
            "id": "ENG-04",
            "title": "الإشراف الهندسي الموقعي والزيارات",
            "category": "إشراف",
            "icon": "🔍",
            "badge": "ضمان الجودة",
            "shortDesc": "إشراف دوري وزيارات ميدانية لكافة مراحل صب الخرسانة واستلام حديد التسليح لضمان تنفيذ المخططات بدون أخطاء.",
            "fullDesc": "يتولى مهندس استشاري متخصص فحص استلام حديد القواعد والميد والأعمدة والأسقف، وفحص عينات الخرسانة الجاهزة واختبارات الهبوط، وتقديم تقارير زيارة دورية موثقة بالصور والملاحظات عبر التطبيق قبل كل عملية صب لضمان حق المالك.",
            "deliverables": [
                "استلام حديد التسليح والنجارة الإنشائية مرحلياً",
                "حضور ومراقبة صب الخرسانة ومطابقتها للمواصفات",
                "تقارير زيارة موقعية إلكترونية فورية موثقة بالصور",
                "إصدار شهادات الإشراف الهندسي المطلوبة رسمياً"
            ],
            "duration": "طوال مدة المشروع (زيارات مجدولة)",
            "startingPrice": "ابتداءً من 500 ريال / الزيارة"
        },
        {
            "id": "ENG-05",
            "title": "إدارة المشاريع الهندسية وضبط التكاليف",
            "category": "إدارة",
            "icon": "📋",
            "badge": "تسليم بالموعد",
            "shortDesc": "تخطيط زمني، مراقبة الميزانية والمستخلصات المالية، وإدارة المقاولين والموردين لضمان التسليم بأعلى جودة.",
            "fullDesc": "خدمة شاملة تريح مالك العقار تماماً من عناء التعامل مع المقاولين ومتابعة العمال والمشتريات. نقوم بوضع الجدول الزمني الدقيق (Gantt Chart)، مراقبة الصرفيات وتدقيق مستخلصات الدفع حسب الإنجاز الفعلي، والتأكد من مطابقة جميع الموردين للمواصفات الفنية.",
            "deliverables": [
                "إعداد ومتابعة المخطط الزمني الشامل للمشروع",
                "تدقيق فواتير ومستخلصات المقاولين والمطابقات",
                "إدارة المخاطر وتفادي التأخيرات في التوريد",
                "تقارير أسبوعية وشهرية شاملة لتقدم الأعمال"
            ],
            "duration": "عقد شهري طوال مدة التنفيذ",
            "startingPrice": "نسبة من قيمة المشروع أو عقد شهري"
        },
        {
            "id": "ENG-06",
            "title": "حصر الكميات وجداول المواصفات (BOQ)",
            "category": "حصر وتكلفة",
            "icon": "📊",
            "badge": "تحكم بالميزانية",
            "shortDesc": "حصر هندسي تفصيلي ودقيق لكافة مواد البناء (حديد، خرسانة، بلوك، تشطيبات) لتفادي التلاعب وطلب أسعار عادلة.",
            "fullDesc": "إعداد جدول كميات (Bill of Quantities) مهني دقيق يحدد الكميات التفصيلية لكل بند بدءاً من أعمال الحفر والخرسانات حتى آخر طبقة دهان، مما يمكن المالك من طرح المشروع على المقاولين للمقارنة العادلة وتجنب طلبات تغيير الأسعار أثناء التنفيذ.",
            "deliverables": [
                "جدول كميات هندسي تفصيلي وفق المعايير القياسية",
                "كراسة الشروط والمواصفات الفنية المعتمدة للمقاولين",
                "تقدير التكلفة الاسترشادية المتوقعة للسوق الحالي",
                "ملف Excel قابل للتسعير المباشر من الشركات"
            ],
            "duration": "من 5 إلى 8 أيام عمل",
            "startingPrice": "ابتداءً من 2,500 ريال للمشروع"
        },
        {
            "id": "ENG-07",
            "title": "التقييم والتثمين العقاري المعتمد",
            "category": "تقييم",
            "icon": "🏷️",
            "badge": "معتمد من تقييم",
            "shortDesc": "تقييم أصول وعقارات وفق معايير الهيئة السعودية للمقيمين المعتمدين (تقييم) لأغراض التمويل أو البيع أو الشراكات.",
            "fullDesc": "إصدار تقارير تثمين رسمية ومعتمدة للأراضي والفلل والعمائر والمشاريع التجارية باستخدام أساليب التقييم المعتمدة (طريقة مقارنة المبيعات، طريقة الدخل، وطريقة التكلفة الإحلالية) لتقديم القيمة السوقية العادلة بدقة متناهية.",
            "deliverables": [
                "تقرير تثمين عقاري شامل ومعتمد بخاتم مقيم معتمد",
                "دراسة دقيقة للمنطقة والمبيعات المماثلة بالسوق",
                "تحديد القيمة السوقية العادلة والقيمة الإيجارية",
                "صالح للتقديم لدى البنوك والجهات التمويلية والقضائية"
            ],
            "duration": "من 3 إلى 5 أيام عمل",
            "startingPrice": "ابتداءً من 1,800 ريال"
        },
        {
            "id": "ENG-08",
            "title": "فحص جودة المباني الجاهزة والاستشارات",
            "category": "فحص",
            "icon": "💡",
            "badge": "قبل الشراء",
            "shortDesc": "فحص شامل للمباني والفلل الجاهزة قبل الشراء بالأجهزة الحرارية لكشف عيوب السباكة والعوازل والتشققات.",
            "fullDesc": "خدمة حيوية قبل اتخاذ قرار شراء عقار جاهز؛ يقوم مهندس فحص معتمد بإجراء اختبارات ميدانية للكشف عن التسريبات الخفية، كفاءة العزل المائي والحراري، سلامة التمديدات الكهربائية، والتحقق من جودة التشطيبات والهبوطات الإنشائية لمنع الخسائر المستقبلية.",
            "deliverables": [
                "فحص أكثر من 120 نقطة في العقار بالأجهزة المتقدمة",
                "تصوير حراري لكشف تسريبات المياه ورطوبة الجدران",
                "تقرير فني هندسي مفصل مدعم بالصور ونسب الخطورة",
                "تقدير تكلفة إصلاح الملاحظات المكتشفة إن وجدت"
            ],
            "duration": "تقرير خلال 24 - 48 ساعة من الزيارة",
            "startingPrice": "ابتداءً من 1,200 ريال"
        }
    ],
    "constructionConfig": {
        "projectTypes": [
            {
                "id": "villa",
                "name": "فيلا سكنية مودرن",
                "baseCostPerSqm": 1400,
                "icon": "🏡",
                "defaultFloors": 2
            },
            {
                "id": "building",
                "name": "عمارة سكنية / شقق",
                "baseCostPerSqm": 1250,
                "icon": "🏢",
                "defaultFloors": 4
            },
            {
                "id": "commercial",
                "name": "مجمع / مبنى تجاري",
                "baseCostPerSqm": 1600,
                "icon": "🏬",
                "defaultFloors": 3
            },
            {
                "id": "office",
                "name": "مكاتب إدارية",
                "baseCostPerSqm": 1500,
                "icon": "💼",
                "defaultFloors": 3
            },
            {
                "id": "chalet",
                "name": "شاليه / استراحة فاخرة",
                "baseCostPerSqm": 1350,
                "icon": "🌴",
                "defaultFloors": 1
            },
            {
                "id": "warehouse",
                "name": "مستودع أو هنجر معدني",
                "baseCostPerSqm": 750,
                "icon": "📦",
                "defaultFloors": 1
            }
        ],
        "finishingTiers": [
            {
                "id": "economy",
                "name": "تشطيب اقتصادي عملي",
                "multiplier": 1,
                "desc": "أرضيات سيراميك جيدة، دهانات جوتن ناعمة، أطقم صحية ممتازة مع ضمانات أساسية.",
                "tag": "أوفر تكلفة"
            },
            {
                "id": "deluxe",
                "name": "تشطيب ديلوكس راقي",
                "multiplier": 1.35,
                "desc": "أرضيات بورسلان إسباني، أطقم صحية إيطالية، إنارة مخفية LED، ديكورات بديل خشب ورخام عصرية.",
                "tag": "الأكثر طلباً"
            },
            {
                "id": "vip",
                "name": "تشطيب VIP سوبر ديلوكس فاخر",
                "multiplier": 1.85,
                "desc": "رخام طبيعي نخب أول، زجاج واجهات ستركشر، سمارت هوم متكامل، مصعد بانوراما، تجهيزات فندقية راقية.",
                "tag": "فخامة مطلقة"
            }
        ],
        "availableServices": [
            {
                "id": "arch_design",
                "name": "التصميم المعماري ورخصة البناء",
                "cost": 25000,
                "checked": true
            },
            {
                "id": "struct_design",
                "name": "التصميم الإنشائي واعتماد المخططات",
                "cost": 15000,
                "checked": true
            },
            {
                "id": "mep_design",
                "name": "المخططات الكهروميكانيكية (MEP)",
                "cost": 12000,
                "checked": true
            },
            {
                "id": "structure_build",
                "name": "تنفيذ عظم بالمواد وتحت إشراف",
                "costPercentage": 0.55,
                "isCore": true,
                "checked": true
            },
            {
                "id": "finishing_turnkey",
                "name": "أعمال التشطيب تسليم مفتاح",
                "costPercentage": 0.45,
                "isCore": true,
                "checked": true
            },
            {
                "id": "supervision",
                "name": "الإشراف الهندسي الموقعي الشامل",
                "cost": 18000,
                "checked": true
            },
            {
                "id": "smart_home",
                "name": "تأسيس وتشغيل نظام المنزل الذكي Smart Home",
                "cost": 35000,
                "checked": false
            },
            {
                "id": "landscaping",
                "name": "تنسيق الحدائق والمسبح الخارجي",
                "cost": 45000,
                "checked": false
            }
        ]
    },
    "renovationConfig": {
        "scopes": [
            {
                "id": "full_house",
                "name": "تجديد فيلا / منزل كامل",
                "icon": "🏡",
                "baseCost": 150000
            },
            {
                "id": "apartment",
                "name": "تجديد شقة سكنية",
                "icon": "🏢",
                "baseCost": 45000
            },
            {
                "id": "kitchen",
                "name": "تجديد مطبخ بالكامل",
                "icon": "🍳",
                "baseCost": 28000
            },
            {
                "id": "bathrooms",
                "name": "تجديد دورات المياه والسباكة",
                "icon": "🚿",
                "baseCost": 18000
            },
            {
                "id": "facade",
                "name": "تحديث الواجهة الخارجية والدهانات",
                "icon": "🏛️",
                "baseCost": 35000
            },
            {
                "id": "majlis",
                "name": "إعادة تصميم وتأثيث المجلس وصالة الضيوف",
                "icon": "🛋️",
                "baseCost": 25000
            },
            {
                "id": "office_reno",
                "name": "ترميم وتطوير مقر مكتبي",
                "icon": "💼",
                "baseCost": 55000
            }
        ],
        "conditions": [
            {
                "id": "light",
                "name": "تجديد تجميلي سطحي",
                "multiplier": 1,
                "desc": "دهانات، تغيير إنارة، تعديلات ديكورية خفيفة دون تكسير سباكة أو كهرباء."
            },
            {
                "id": "medium",
                "name": "ترميم وتحديث متوسط",
                "multiplier": 1.45,
                "desc": "تغيير أرضيات، تحديث أبواب ودورات مياه، معالجة الرطوبة وتعديل الإنارة."
            },
            {
                "id": "heavy",
                "name": "إعادة هيكلة وتأسيس شامل",
                "multiplier": 2.1,
                "desc": "تكسير وتعديل قواطع جدارية، تغيير كامل لشبكات السباكة والكهرباء وتحديث الواجهة."
            }
        ]
    },
    "initialRequests": [
        {
            "id": "REQ-BLD-1024",
            "type": "بناء وتشييد",
            "typeCode": "construction",
            "title": "بناء فيلا سكنية مودرن - حي النرجس",
            "details": "مساحة الأرض 500 م² | دورين وملحق | تشطيب VIP فاخر | حزمة متكاملة (تصميم + تنفيذ + إشراف)",
            "estimatedBudget": "1,550,000 ريال",
            "date": "2026-09-02",
            "status": "review",
            "statusLabel": "قيد المراجعة الفنية",
            "progressPercentage": 40,
            "assignedEngineer": "م. فهد القرني (استشاري مشاريع إنشائية)",
            "notes": "تم مراجعة مخططات الأرض وفحص التربة، جاري إعداد جدول الكميات وعرض السعر النهائي."
        },
        {
            "id": "REQ-REN-2089",
            "type": "ترميم وتجديد",
            "typeCode": "renovation",
            "title": "تحديث وتجديد واجهة قصر ودورات المياه",
            "details": "واجهة حجرية مودرن مع إنارة مخفية + تجديد 4 دورات مياه بالكامل",
            "estimatedBudget": "85,000 ريال",
            "date": "2026-08-28",
            "status": "quoted",
            "statusLabel": "تم إرسال عرض السعر",
            "progressPercentage": 60,
            "assignedEngineer": "م. طارق العسيري (مهندس ديكور ومقاولات)",
            "notes": "تم إرسال عرض السعر الفني والمالي مع عينات المواد بانتظار موافقتكم للاعتماد وبدء التنفيذ."
        },
        {
            "id": "REQ-ENG-3045",
            "type": "خدمة هندسية",
            "typeCode": "engineering",
            "title": "فحص جودة واستلام مبنى جاهز قبل الإفراغ",
            "details": "فحص حراري وإنشائي لفيلا سكنية بحي الياسمين بمساحة 380 م²",
            "estimatedBudget": "1,500 ريال",
            "date": "2026-09-05",
            "status": "in_progress",
            "statusLabel": "قيد التنفيذ الميداني",
            "progressPercentage": 80,
            "assignedEngineer": "م. خالد العتيبي (أخصائي فحص جودة معتمد)",
            "notes": "تمت الزيارة الميدانية صباح اليوم، جاري إعداد التقرير الفني النهائي وسيصدر خلال ساعات."
        },
        {
            "id": "REQ-VIEW-4012",
            "type": "طلب معاينة عقار",
            "typeCode": "viewing",
            "title": "معاينة: فيلا مودرن فاخرة بحي النرجس (#PROP-101)",
            "details": "الموعد المقترح: الثلاثاء 8 سبتمبر 2026 - الساعة 5:30 مساءً",
            "estimatedBudget": "مجاناً",
            "date": "2026-09-05",
            "status": "approved",
            "statusLabel": "تم تأكيد الموعد",
            "progressPercentage": 70,
            "assignedEngineer": "عبدالرحمن الشمري (الوسيط المسؤول)",
            "notes": "تم التنسيق مع المالك وتأكيد الزيارة في موقع الفيلا."
        },
        {
            "id": "REQ-RENT-5091",
            "type": "حجز إيجار",
            "typeCode": "rental_booking",
            "title": "حجز شقة بأبراج العليا (#PROP-103) - شهري",
            "details": "مدة الحجز: شهر واحد (ابتداءً من 15 سبتمبر 2026)",
            "estimatedBudget": "8,500 ريال",
            "date": "2026-09-04",
            "status": "completed",
            "statusLabel": "مكتمل ومؤكد",
            "progressPercentage": 100,
            "assignedEngineer": "منى السالم (إدارة الحجوزات)",
            "notes": "تم توثيق العقد الإلكتروني واستلام الدفعة، كود الدخول الذكي مرسل عبر الرسائل."
        }
    ],
    "initialChats": [
        {
            "id": "CHAT-01",
            "contactName": "م. خالد العتيبي",
            "contactRole": "مستشار فحص المباني والاستشارات الهندسية",
            "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
            "unread": 1,
            "lastMessageTime": "منذ 15 دقيقة",
            "messages": [
                {
                    "sender": "other",
                    "text": "أهلاً بك أستاذي الكريم، قمنا بمعاينة العقار بحي الياسمين وفحص شبكات التغذية والعزل الحراري.",
                    "time": "10:30 ص"
                },
                {
                    "sender": "me",
                    "text": "أهلاً م. خالد، هل وجدتم أي ملاحظات جوهرية أو تسريبات؟",
                    "time": "10:35 ص"
                },
                {
                    "sender": "other",
                    "text": "بشكل عام الهيكل الإنشائي ممتاز جداً ولا توجد تشققات هبوط، هناك فقط ملاحظة بسيطة على عزل دورة مياه الدور العلوي وتم توثيقها بالتقرير الحراري.",
                    "time": "10:42 ص"
                },
                {
                    "sender": "other",
                    "text": "سأرسل لك مسودة التقرير مع توصيات الإصلاح والتكلفة التقديرية بعد قليل.",
                    "time": "11:05 ص"
                }
            ]
        },
        {
            "id": "CHAT-02",
            "contactName": "عبدالرحمن الشمري",
            "contactRole": "المستشار العقاري المسؤول عن فيلا النرجس",
            "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
            "unread": 0,
            "lastMessageTime": "أمس",
            "messages": [
                {
                    "sender": "me",
                    "text": "السلام عليكم، هل الفيلا جاهزة للمعاينة يوم الثلاثاء القادم؟",
                    "time": "04:15 م"
                },
                {
                    "sender": "other",
                    "text": "وعليكم السلام ورحمة الله، نعم بإذن الله الموعد مناسب وسأكون في انتظاركم عند بوابة الفيلا.",
                    "time": "04:22 م"
                },
                {
                    "sender": "me",
                    "text": "ممتاز، شكراً جزيلاً لك.",
                    "time": "04:25 م"
                }
            ]
        }
    ],
    "initialNotifications": [
        {
            "id": "NOTIF-1",
            "title": "تحديث حالة طلب البناء #REQ-BLD-1024",
            "body": "تم الانتهاء من مراجعة المخططات الأولية لفيلا حي النرجس وهي الآن في مرحلة إعداد عرض السعر.",
            "time": "منذ ساعتين",
            "isRead": false,
            "type": "construction"
        },
        {
            "id": "NOTIF-2",
            "title": "رسالة جديدة من م. خالد العتيبي",
            "body": "سأرسل لك مسودة التقرير مع توصيات الإصلاح والتكلفة التقديرية بعد قليل.",
            "time": "منذ 15 دقيقة",
            "isRead": false,
            "type": "chat"
        },
        {
            "id": "NOTIF-3",
            "title": "تأكيد طلب المعاينة #REQ-VIEW-4012",
            "body": "تم تأكيد موعد معاينة فيلا النرجس ليوم الثلاثاء 8 سبتمبر الساعة 5:30 مساءً.",
            "time": "أمس",
            "isRead": true,
            "type": "viewing"
        },
        {
            "id": "NOTIF-4",
            "title": "عرض سعر جديد لطلب الترميم #REQ-REN-2089",
            "body": "تم رفع عرض السعر الرسمي لمشروع واجهة القصر ودورات المياه، يمكنك الاطلاع والاعتماد الآن.",
            "time": "منذ يومين",
            "isRead": true,
            "type": "renovation"
        }
    ]
};

// إتاحة الكائن على المستوى العام للنافذة
if (typeof window !== "undefined") {
    window.INITIAL_DATA = INITIAL_DATA;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = INITIAL_DATA;
}
