/* ==========================================================================
   OVRAX SOFTWARE MARKETPLACE & PORTFOLIO MODULE
   Engineer: Osama Saleh Derhem Rajeh
   ========================================================================== */

const OVRAX_PRODUCTS = [
  // ==================== المشاريع الفعلية الجاهزة (Live Projects) ====================
  {
    id: "enterprise-saas-erp",
    title: "منصة العاصمة المؤسسية لإدارة الشركات (Enterprise SaaS ERP)",
    category: "retail",
    categoryName: "أنظمة إدارة الموارد والشركات ERP",
    icon: "fa-network-wired",
    tag: "منظومة سحابية مؤسسية كبرى",
    tagType: "amber",
    shortDesc: "منصة ERP سحابية متكاملة للشركات تشمل الموارد البشرية، المبيعات والمشتريات، المشاريع، العقود، والمالية.",
    fullDesc: "نظام إدارة موارد مؤسسية متكامل (SaaS ERP) صُمم لإدارة كافة العمليات التشغيلية للشركات: إدارة الموظفين والموارد البشرية والحضور، إدارة علاقات العملاء والمبيعات (CRM)، المشتريات والموردين، المشاريع وتوزيع المهام، الفواتير والمصروفات، والمخزون، مع لوحات تحكم بيانية تفاعلية وتقارير مفصلة.",
    features: [
      "إدارة شاملة للموارد البشرية (HR)، الرواتب، وسجلات الحضور والمهام",
      "منظومة مبيعات ومشتريات وفواتير إلكترونية مع تتبع المستودعات والمخزون",
      "إدارة المشاريع والمقاولات والعقود ومتابعة نسب الإنجاز وجداول التسليم",
      "تقارير مالية ولوحات مؤشرات أداء (KPIs) ورسوم بيانية حية لحظة بلحظة"
    ],
    techStack: ["Enterprise JS", "Modular Architecture", "Charts Engine", "SaaS Cloud UI"],
    price: "واجهة حية متكاملة",
    licenseType: "جاهز للمعاينة الفورية",
    demoType: "live-link",
    projectUrl: "projects/enterprise-saas-erp/index.html"
  },
  {
    id: "real-estate-engineering-platform",
    title: "منصة صروح للعقارات والحلول الهندسية والمقاولات",
    category: "retail",
    categoryName: "العقارات والمقاولات الهندسية",
    icon: "fa-building",
    tag: "منظومة عقارية وهندسية متكاملة",
    tagType: "amber",
    shortDesc: "منصة شاملة لبيع وشراء واستئجار العقارات، مع حاسبة بناء ذكية، معالج ترميم، خدمات هندسية، ولوحة تحكم متقدمة.",
    fullDesc: "منظومة سعودية رائدة تجمع بين صفقات العقارات الفاخرة الموثقة برخص فال، معالج حساب تكلفة البناء التقديرية حسب المساحة ومستوى التشطيب، نظام طلبات الترميم مع رفع ومعاينة الصور، حجز الخدمات والاستشارات الهندسية، وبوابتي مستخدم وإدارة (Admin Dashboard) متكاملتين.",
    features: [
      "سوق عقاري متكامل (بيع - إيجار يومي/شهري/سنوي) مع فلترة بالمواقع والميزانية",
      "معالج وحاسبة بناء ذكية متقدمة تحسب التكاليف الإنشائية ونسب الإشراف الفوري",
      "معالج طلبات الترميم وإعادة التأهيل المعماري مع رفع ومعاينة الصور محلياً",
      "لوحة تحكم للمستخدم لمتابعة المشاريع والرسائل، ولوحة إدارة (Admin) لتحديث الحالات"
    ],
    techStack: ["JavaScript SPA", "LocalStorage DB", "Engineering Estimator", "Luxury UI/UX"],
    price: "واجهة حية متكاملة",
    licenseType: "جاهز للمعاينة الفورية",
    demoType: "live-link",
    projectUrl: "projects/real-estate-engineering-platform/index.html"
  },
  {
    id: "safwa-car-rental",
    title: "منصة الصفوة لتأجير السيارات الفاخرة",
    category: "retail",
    categoryName: "منصات تأجير السيارات والنقل",
    icon: "fa-car",
    tag: "حجز سيارات + لوحة تحكم",
    tagType: "amber",
    shortDesc: "منصة تأجير سيارات متطورة تدعم الحجز الفوري بمطارات ومدن المملكة، فلاتر لـ 20 ماركة عالمية، لوحة تحكم إدارية، ودعم لغتين.",
    fullDesc: "نظام شامل لتأجير السيارات بالمملكة العربية السعودية يضم محرك بحث متقدم لمواقع وتواريخ الاستلام والتسليم، أسطولاً متنوعاً من السيارات الاقتصادية والفاخرة والدفع الرباعي، نظام إدارة أسطول وحجوزات متكامل (Admin Dashboard)، وحساب دقيق لباقات التأمين والوديعة.",
    features: [
      "محرك حجز فوري يحدد مواقع الاستلام والتسليم بمطارات ومراكز مدن المملكة",
      "فلترة متقدمة للأسطول حسب 20 شركة عالمية (تويوتا، مرسيدس، بي إم دبليو، لوسيد، تسلا)",
      "لوحة إدارة كاملة (Admin Dashboard) لمتابعة الإيرادات والأسطول ونسب الإشغال والكوبونات",
      "دعم متعدد اللغات (عربي / إنجليزي)، حسابات عملاء، وتتبع الحجوزات النشطة والسابقة"
    ],
    techStack: ["JavaScript SPA", "LocalStorage DB", "Multilingual i18n", "Car Rental Engine"],
    price: "واجهة حية متكاملة",
    licenseType: "جاهز للمعاينة الفورية",
    demoType: "live-link",
    projectUrl: "projects/safwa-car-rental/index.html"
  },
  {
    id: "manar-edu-platform",
    title: "منصة مَنار التعليمية لطلاب المدارس والمعلمين",
    category: "retail",
    categoryName: "المنصات التعليمية والمدارس",
    icon: "fa-graduation-cap",
    tag: "منظومة تعليمية متكاملة",
    tagType: "amber",
    shortDesc: "منصة تعليمية شاملة للمناهج المدرسية، تدعم حجز المعلمين خصوصياً، دورات المدارس، قارئ كتب مدمج، ومشغل فيديو تفاعلي.",
    fullDesc: "نظام تعليمي متكامل لطلاب المدارس يجمع بين شروحات المناهج الدراسية، نظام حجز مرن للمعلمين (حضوري بالمنزل أو عبر الإنترنت)، دورات معتمدة مع المجمعات المدرسية، مكتبة إلكترونية تفاعلية للمذكرات، ومشغل فيديو مدمج مع سبورة ذكية واختبارات قصيرة.",
    features: [
      "نظام حجز معلمين خصوصيين (حضوري في منزل الطالب أو عبر الفصول الافتراضية)",
      "شروحات تفاعلية للمناهج ودورات معتمدة للمدارس الأهلية والمجمعات",
      "قارئ إلكتروني تفاعلي للمذكرات والكتب المدرسية مع تدوين الملاحظات هامشياً",
      "مشغل فيديو تعليمي ذكي مدمج مع سبورة رقمية ودفتر ملاحظات واختبارات تقييمية"
    ],
    techStack: ["JavaScript SPA", "LocalStorage DB", "Academic UI/UX", "Interactive Reader"],
    price: "واجهة حية متكاملة",
    licenseType: "جاهز للمعاينة الفورية",
    demoType: "live-link",
    projectUrl: "projects/manar-edu-platform/index.html"
  },
  {
    id: "grand-clothing-mall",
    title: "مول النخبة للأزياء والملابس (Grand Fashion Mall)",
    category: "retail",
    categoryName: "المتاجر الإلكترونية والتجزئة",
    icon: "fa-tshirt",
    tag: "سوق أزياء متكامل",
    tagType: "amber",
    shortDesc: "منصة وسوق ملابس ضخم يضم 120 تشكيلة أزياء لجميع أفراد العائلة، مع دليل طوابق وحاسبة مقاسات ذكية وسلة جانبية.",
    fullDesc: "سوق أزياء إلكتروني متكامل مصمم بنمط Single Page App يضم 120 منتجاً مفصلاً لـ 8 أقسام للملابس (رجالي، نسائي، أطفال، مواليد، رياضي، رسمي، تراثي، شتوي) مع دليل تفاعلي لطوابق ومتاجر المول وسلة تسوق متقدمة.",
    features: [
      "كتالوج ضخم لـ 120 منتجاً موزعاً على 8 أقسام أزياء مع بيانات المصانع والمنشأ",
      "دليل تفاعلي لطوابق ومحلات المول ومناطق الخدمات (Mall Floor Directory)",
      "حاسبة ودليل المقاسات الذكي لجميع الفئات وتعديل المقاسات الفوري",
      "سلة تسوق جانبية (Cart Drawer) وكوبونات خصم وقوائم مفضلة متكاملة"
    ],
    techStack: ["JavaScript SPA", "LocalStorage DB", "CSS Modern UI", "E-Commerce"],
    price: "واجهة حية متكاملة",
    licenseType: "جاهز للمعاينة الفورية",
    demoType: "live-link",
    projectUrl: "projects/grand-clothing-mall/index.html"
  },
  {
    id: "shifa-surgeons-platform",
    title: "منصة شفاء الطبية لحجز كبار الجراحين الاستشاريين",
    category: "retail",
    categoryName: "المنصات الطبية وحجز الاستشارات",
    icon: "fa-user-md",
    tag: "منظومة طبية شاملة",
    tagType: "cyan",
    shortDesc: "منصة طبية متخصصة لحجز 60 جراحاً استشارياً لـ 20 عملية دقيقة، مع حجز تفاعلي وإصدار تذاكر رقمية بالباركود.",
    fullDesc: "منظومة جراحية متكاملة تتيح للمرضى تصفح 20 تخصصاً جراحياً دقيقاً، ومقارنة السير الذاتية والشهادات لـ 60 جراحاً استشارياً معتمداً، وحجز الاستشارات عبر نظام متدرج (Stepper) وإصدار تذاكر طبية وطباعتها.",
    features: [
      "دليل شامل لـ 20 عملية جراحية كبرى ودقيقة مع إحصائيات ونسب النجاح",
      "ملفات تعريفية معتمدة لـ 60 جراحاً استشارياً بالزمالات والشهادات الدولية",
      "نظام حجز مواعيد ذكي وتفاعلي من 5 خطوات (حضوري، فيديو، تقييم)",
      "إصدار تذكرة استشارة طبية رقمية معتمدة مع باركود وحفظ في حجوزاتي"
    ],
    techStack: ["JavaScript SPA", "LocalStorage DB", "CSS Modern UI", "Medical UX"],
    price: "واجهة حية متكاملة",
    licenseType: "جاهز للمعاينة الفورية",
    demoType: "live-link",
    projectUrl: "projects/shifa-surgeons-platform/index.html"
  },
  {
    id: "ecommerce-static-store",
    title: "متجر سوق النخبة (ساعات وإلكترونيات فاخرة)",
    category: "retail",
    categoryName: "المتاجر الإلكترونية والتجزئة",
    icon: "fa-clock",
    tag: "متجر + لوحة تحكم",
    tagType: "amber",
    shortDesc: "منصة تجارة إلكترونية متكاملة لبيع الساعات والإلكترونيات، مزودة بلوحة إدارة مبيعات حية، وتتبع للشحنات.",
    fullDesc: "متجر إلكتروني عصري متكامل مع لوحة إدارة كاملة (Admin Dashboard) لإدارة المنتجات والمخزون، وتتبع الطلبات، وإصدار الفواتير وطباعتها، مع كود خصم تفاعلي ونظام تفضيلات وسلة جانبية.",
    features: [
      "لوحة إدارة متكاملة (Admin Dashboard) لإدارة المنتجات، المخزون، والطلبات",
      "نظام تتبع الشحنات المباشر للعميل برقم الطلب أو الجوال",
      "سلة تسوق جانبية مع شريط مؤشر الشحن المجاني وحساب الضرائب",
      "طباعة فواتير إلكترونية معتمدة وإمكانية تصدير واستيراد قاعدة البيانات"
    ],
    techStack: ["JavaScript ES6", "LocalStorage DB", "CSS Grid/Flex", "Admin UI/UX"],
    price: "واجهة حية تفاعلية",
    licenseType: "جاهز للمعاينة الفورية",
    demoType: "live-link",
    projectUrl: "projects/ecommerce-static-store/index.html"
  },
  {
    id: "chalet-party-booking",
    title: "منصة أثير لحجز الشاليهات وقاعات VIP",
    category: "retail",
    categoryName: "منصات الحجز والضيافة",
    icon: "fa-crown",
    tag: "منظومة تفاعلية 3D",
    tagType: "amber",
    shortDesc: "منصة فاخرة لحجز الشاليهات وتنظيم الحفلات، مزودة بعارض 3D تفاعلي، حاسبة أسعار لحظية، ومخطط جلوس وتوزيع طاولات.",
    fullDesc: "منظومة رقمية متكاملة لقطاع الضيافة والمناسبات تجمع بين استعراض القاعات بتقنية Three.js 360°، متجر تجهيزات الحفلات (21 صنفاً)، تقويم توافر لحظي، وحاسبة فواتير مع محاكاة دفع إلكتروني وإصدار بطاقات الدعوة.",
    features: [
      "عارض 3D تفاعلي للشاليه والقاعة مع تبديل الإضاءة وزوايا الكاميرا",
      "حاسبة تكاليف تفاعلية تحسب الضريبة والخدمات والتأمين لحظياً",
      "مخطط توزيع طاولات المعازيم والجلوس (Interactive Floor Plan)",
      "محاكاة بوابة دفع إلكتروني متكاملة وبطاقة دعوة ذكية بالـ QR Code"
    ],
    techStack: ["Three.js 3D", "JavaScript ES6", "HTML5/CSS3", "Luxury UI/UX"],
    price: "واجهة حية تفاعلية",
    licenseType: "جاهز للمعاينة الفورية",
    demoType: "live-link",
    projectUrl: "projects/chalet-party-booking/index.html"
  },
  {
    id: "al-sultan-sweets-store",
    title: "متجر حلويات السلطان الفاخرة",
    category: "retail",
    categoryName: "المتاجر الإلكترونية والتجزئة",
    icon: "fa-cookie-bite",
    tag: "متجر إلكتروني متكامل",
    tagType: "cyan",
    shortDesc: "واجهة متجر فاخر للحلويات الشرقية والغربية، تدعم السلة المنزلقة، عداد العروض التنازلي، والطلب المباشر عبر واتساب.",
    fullDesc: "تصميم تجاري جذاب موجه للمطاعم ومتاجر الحلويات الفاخرة، يركز على رفع نسبة الشراء عبر بطاقات المنتجات السريعة، سلة جانبية تفاعلية (Cart Drawer)، كوبونات الخصم التلقائية، وربط الطلب بفاتورة فورية مع WhatsApp.",
    features: [
      "سلة مشتريات منزلقة (Slide Cart Drawer) بدون الحاجة لإعادة تحميل الصفحة",
      "بانر عروض يومية مع عداد تنازلي رقمي وتفعيل تلقائي لكود الخصم",
      "تبديل مظهر المتجر بين الوضع الليلي والنهاري (Dark/Light Mode)",
      "نظام إرسال الطلبات المباشر إلى واتساب وفاتورة تفصيلية"
    ],
    techStack: ["JavaScript", "CSS Animations", "Responsive UI", "WhatsApp API"],
    price: "واجهة حية تفاعلية",
    licenseType: "جاهز للمعاينة الفورية",
    demoType: "live-link",
    projectUrl: "projects/al-sultan-sweets-store/index.html"
  },

  // ==================== الأنظمة والبيانات السابقة ====================
  {
    id: "ai-x-marketing",
    title: "منصة AI-X-Marketing",
    category: "marketing",
    categoryName: "التسويق والأتمتة",
    icon: "fa-bullhorn",
    tag: "الأكثر طلباً",
    tagType: "amber",
    shortDesc: "نظام شامل لأتمتة الحملات الإعلانية وصناعة المحتوى الإعلاني بالذكاء الاصطناعي عبر TikTok, Meta, Google Ads, Snapchat.",
    fullDesc: "نظام متطور مبني للشركات والوكالات الإعلانية يقوم بتوليد النصوص الإعلانية، تصميم المتغيرات، إطلاق الحملات أوتوماتيكياً عبر الـ APIs، ومراقبة الـ ROI وتحسين الميزانيات بدقة متناهية.",
    features: [
      "تكامل شامل مع Google Ads, Meta Graph API, TikTok API, Snapchat Ads",
      "محرك ذكاء اصطناعي لتوليد الـ Copywriting والعناوين الجذابة",
      "نظام Webhooks لتتبع المبيعات والتحويلات اللحظية",
      "لوحة تحكم تفاعلية مع تقارير وإحصائيات مباشرة"
    ],
    techStack: ["Node.js", "Python", "Meta API", "TikTok API", "React/Vue", "PostgreSQL"],
    price: "$799",
    licenseType: "ترخيص تجاري كامل",
    demoType: "marketing-sim",
    projectUrl: ""
  },
  {
    id: "retail-pos-erp",
    title: "منظومة إدارة تجارة التجزئة (حلويات إب)",
    category: "retail",
    categoryName: "إدارة التجزئة والمتاجر",
    icon: "fa-cash-register",
    tag: "جاهز للنشر",
    tagType: "cyan",
    shortDesc: "نظام متكامل لإدارة نقاط البيع والمخزون، تتبع المبيعات، إدارة الفروع، وإصدار الفواتير والتقارير المالية الدقيقة.",
    fullDesc: "حل برمجي متين (Full-Stack) صمم خصيصاً لمتاجر التجزئة ومحلات الحلويات والمطاعم والمتاجر المتعددة الفروع. يوفر تحكماً شاملاً بحركة الأصناف، الموردين، وإدارة الصندوق والورديات.",
    features: [
      "نقطة بيع POS سريعة جداً تدعم الباركود والطباعة الحرارية",
      "إدارة المخزون وتنبيهات نفاد الأصناف وصلاحيات المنتجات",
      "تقارير مالية تفصيلية (أرباح وخسائر، حركة الصندوق، جرد)",
      "نظام صلاحيات متقدم للموظفين والكاشير والإدارة"
    ],
    techStack: ["Full-Stack", "FastAPI / Node", "MySQL / PostgreSQL", "Electron / Web", "PWA"],
    price: "$599",
    licenseType: "ترخيص دائم مدى الحياة",
    demoType: "pos-sim",
    projectUrl: ""
  },
  {
    id: "genai-media-suite",
    title: "حزمة الذكاء الاصطناعي التوليدي (GenAI Suite)",
    category: "ai",
    categoryName: "الذكاء الاصطناعي",
    icon: "fa-brain",
    tag: "تكنولوجيا حديثة",
    tagType: "amber",
    shortDesc: "منصة أدوات متخصصة لإنشاء وتوليد الصور، تحرير الفيديوهات وصناعة المحتوى متعدد الوسائط من النصوص بالأوامر.",
    fullDesc: "استوديو رقمي مدعوم بأحدث نماذج الذكاء الاصطناعي التوليدي ونماذج الانتشار (Diffusion Models) وLLMs لتوليد وسائط إعلانية وصور فائقة الدقة بضغطة زر.",
    features: [
      "تحويل النصوص إلى صور وفيديوهات عالية الجودة (Prompt to Media)",
      "تحرير وإعادة مزج الوسائط وتحسين الدقة آلياً",
      "واجهات سهلة الاستخدام للمصممين وصناع المحتوى",
      "ربط مع واجهات برمجية لتوليد آلاف الصور دفعة واحدة"
    ],
    techStack: ["Python", "PyTorch", "Diffusers", "FastAPI", "React UI", "Docker"],
    price: "$899",
    licenseType: "ترخيص SaaS أو كود مصدري",
    demoType: "genai-sim",
    projectUrl: ""
  },
  {
    id: "iot-smart-monitor",
    title: "نظام مراقبة أجهزة IoT والبيانات الحيوية",
    category: "iot",
    categoryName: "إنترنت الأشياء والشبكات",
    icon: "fa-heartbeat",
    tag: "أنظمة مدمجة",
    tagType: "cyan",
    shortDesc: "نظام برمجي/مادي متطور لقياس ومراقبة معدل ضربات القلب والمؤشرات التشغيلية عبر السحابة لحظياً.",
    fullDesc: "منصة متصلة تجمع بيانات الحساسات الذكية وأجهزة إنترنت الأشياء، تقوم بمعالجتها سحابياً وإرسال تنبيهات طارئة عند تجاوز المعدلات الطبيعية، مع لوحات عرض بيانية فورية.",
    features: [
      "اتصال فوري بروتوكول MQTT و WebSockets",
      "لوحة قياس حيوية مع مؤشرات ورسوم بيانية مباشرة",
      "تنبيهات فورية عبر الرسائل القصيرة والبريد عند الطوارئ",
      "تخزين سحابي آمن وتصدير السجلات الطبية والتشغيلية"
    ],
    techStack: ["C++ / Embedded", "MQTT Broker", "Node.js", "WebSockets", "Chart.js"],
    price: "$450",
    licenseType: "ترخيص المنظومة + كود الحساسات",
    demoType: "iot-sim",
    projectUrl: ""
  },
  {
    id: "universal-api-gateway",
    title: "بوابة تكامل الـ APIs والأتمتة السحابية",
    category: "marketing",
    categoryName: "التسويق والأتمتة",
    icon: "fa-network-wired",
    tag: "بنية تحتية",
    tagType: "cyan",
    shortDesc: "محرك وسيط لربط جميع المنظومات والمتاجر بقنوات الإعلانات وبوابات الدفع وقواعد البيانات بدون تعقيد.",
    fullDesc: "بوابة Middleware عالية السرعة والموثوقية توحد الاتصال بين تطبيقاتك وخدمات الطرف الثالث (Third-Party Services) مع معالجة الأخطاء وإعادة الإرسال الآمن.",
    features: [
      "تحويل وتنسيق بيانات JSON بين مختلف المنصات",
      "أمان عالي عبر التشفير والمفاتيح الرقمية و Rate Limiting",
      "سجل تدقيق كامل لجميع الطلبات (Audit Logs)",
      "دعم Webhooks متبادلة وفلترة الأحداث"
    ],
    techStack: ["Go / Node.js", "Redis Cache", "Docker", "RESTful Architecture"],
    price: "$350",
    licenseType: "ترخيص المصدر المفتوح التجاري",
    demoType: "api-sim",
    projectUrl: ""
  },
  {
    id: "cyber-network-guard",
    title: "منظومة تأمين ومراقبة أداء الشبكات",
    category: "iot",
    categoryName: "إنترنت الأشياء والشبكات",
    icon: "fa-shield-alt",
    tag: "أمان متقدم",
    tagType: "amber",
    shortDesc: "حل برمجي لهندسة وصيانة البنية التحتية، رصد التهديدات واختناقات الاتصال وأتمتة إصلاح الأعطال.",
    fullDesc: "نظام إداري شامل لمهندسي الشبكات ومزودي خدمات الإنترنت لمراقبة الأجهزة السلكية واللاسلكية، استهلاك الباندويث، وضمان أقصى موثوقية تشغيلية.",
    features: [
      "مراقبة حية لاتصالات الراوترات والسيرفرات (Ping/SNMP)",
      "تنبيهات تلقائية عند انقطاع الاتصال أو ارتفاع الضغط",
      "فحص أمان المنافذ والبروتوكولات لمنع الاختراقات",
      "أتمتة النسخ الاحتياطي لإعدادات الشبكة"
    ],
    techStack: ["Python Scripting", "SNMP", "Linux Core", "Grafana / Prometheus"],
    price: "$499",
    licenseType: "ترخيص إدارة الشركات",
    demoType: "network-sim",
    projectUrl: ""
  }
];

// Initialize Marketplace UI
function initMarketplace() {
  const container = document.getElementById('productsContainer');
  if (!container) return;

  renderProducts('all');

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderProducts(filter);
    });
  });

  // Modal Close
  const modalClose = document.getElementById('modalCloseBtn');
  const modalOverlay = document.getElementById('productModal');
  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => modalOverlay.classList.remove('active'));
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) modalOverlay.classList.remove('active');
    });
  }
}

function renderProducts(filter) {
  const container = document.getElementById('productsContainer');
  container.innerHTML = '';

  const filtered = filter === 'all' 
    ? OVRAX_PRODUCTS 
    : OVRAX_PRODUCTS.filter(p => p.category === filter);

  filtered.forEach(prod => {
    const card = document.createElement('div');
    card.className = 'product-card cyber-glass';
    card.setAttribute('data-tilt', '');

    const techChips = prod.techStack.map(t => `<span class="tech-chip">${t}</span>`).join('');

    // زر المعاينة الذكي: إذا كان هناك رابط فعلي يفتحه مباشرة في صفحة جديدة، وإلا يفتح النافذة
    const demoButtonHtml = prod.projectUrl 
      ? `<a href="${prod.projectUrl}" target="_blank" class="btn-demo" style="text-decoration:none;">
           <i class="fas fa-external-link-alt"></i> استعراض حي
         </a>`
      : `<button class="btn-demo" onclick="openProductDemo('${prod.id}')">
           <i class="fas fa-play"></i> معاينة حية
         </button>`;

    card.innerHTML = `
      <div class="product-preview-box">
        <span class="product-tag-badge ${prod.tagType}">${prod.tag}</span>
        <i class="fas ${prod.icon}"></i>
      </div>
      <div class="product-info-box">
        <h3>${prod.title}</h3>
        <p>${prod.shortDesc}</p>
        <div class="product-tech-stack">
          ${techChips}
        </div>
      </div>
      <div class="product-pricing-bar">
        <div class="price-box">
          <span class="price-label">السعر / الحالة</span>
          <span class="price-amount" style="font-size:1rem;">${prod.price}</span>
        </div>
        <span class="license-pill">${prod.licenseType}</span>
      </div>
      <div class="product-action-btns">
        ${demoButtonHtml}
        <button class="btn-buy" onclick="openProductPurchase('${prod.id}')">
          <i class="fas fa-shopping-cart"></i> ${prod.projectUrl ? 'طلب نظام مماثل' : 'طلب الترخيص'}
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Open Product Demo Simulator in Modal
function openProductDemo(productId) {
  const prod = OVRAX_PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  // إذا كان له رابط مشروع، افتحه مباشرة في تبويب جديد
  if (prod.projectUrl) {
    window.open(prod.projectUrl, '_blank');
    return;
  }

  const modal = document.getElementById('productModal');
  const modalHeader = document.getElementById('modalHeader');
  const modalBody = document.getElementById('modalBody');
  const modalFooter = document.getElementById('modalFooter');

  modalHeader.innerHTML = `
    <div style="display:flex; align-items:center; gap:12px;">
      <i class="fas ${prod.icon}" style="font-size:1.8rem; color:var(--cyan-primary);"></i>
      <div>
        <h3 style="font-size:1.3rem; color:#fff;">معاينة تفاعلية: ${prod.title}</h3>
        <span style="font-size:0.8rem; color:var(--amber-primary); font-family:var(--font-cyber);">LIVE DEMO SANDBOX // ACTIVE</span>
      </div>
    </div>
  `;

  let demoContent = '';

  if (prod.demoType === 'marketing-sim') {
    demoContent = `
      <div class="demo-live-canvas-box">
        <div class="demo-screen-header">
          <div class="screen-dots"><span></span><span></span><span></span></div>
          <span class="screen-title">AI-X-MARKETING // CAMPAIGN CONTROLLER</span>
        </div>
        <div class="sim-grid">
          <div class="sim-metric-card"><span class="sim-val" style="color:var(--cyan-primary);">$14,280</span><span class="sim-lbl">المبيعات المحققة</span></div>
          <div class="sim-metric-card"><span class="sim-val" style="color:var(--emerald-accent);">4.8x</span><span class="sim-lbl">عائد الإنفاق ROAS</span></div>
          <div class="sim-metric-card"><span class="sim-val" style="color:var(--amber-primary);">12 الحملات</span><span class="sim-lbl">نشطة عبر TikTok & Meta</span></div>
        </div>
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.08); border-radius:8px; padding:12px; font-size:0.85rem;">
          <div style="color:var(--cyan-primary); font-weight:700; margin-bottom:6px;"><i class="fas fa-magic"></i> نص إعلاني مولد بالذكاء الاصطناعي:</div>
          <p style="color:#cbd5e1; font-style:italic;">"ضاعف مبيعاتك اليوم مع أسرع نظام أتمتة إعلانية يدمج أحدث خوارزميات الـ AI لتحقيق أعلى عائد لمتجرك!"</p>
        </div>
      </div>
    `;
  } else if (prod.demoType === 'pos-sim') {
    demoContent = `
      <div class="demo-live-canvas-box">
        <div class="demo-screen-header">
          <div class="screen-dots"><span></span><span></span><span></span></div>
          <span class="screen-title">RETAIL POS & ERP // SYSTEM OVERVIEW</span>
        </div>
        <div class="sim-grid">
          <div class="sim-metric-card"><span class="sim-val" style="color:var(--cyan-primary);">184</span><span class="sim-lbl">فواتير اليوم</span></div>
          <div class="sim-metric-card"><span class="sim-val" style="color:var(--emerald-accent);">98.4%</span><span class="sim-lbl">جاهزية المخزون</span></div>
          <div class="sim-metric-card"><span class="sim-val" style="color:var(--amber-primary);">3 فروع</span><span class="sim-lbl">متزامنة لحظياً</span></div>
        </div>
        <div style="font-size:0.85rem; color:#cbd5e1; line-height:1.6;">
          <p><i class="fas fa-check-circle text-cyan"></i> دعم كامل لطباعة الفواتير الضريبية وتطبيق الخصومات وطرق الدفع المتعددة.</p>
        </div>
      </div>
    `;
  } else {
    demoContent = `
      <div class="demo-live-canvas-box">
        <div class="demo-screen-header">
          <div class="screen-dots"><span></span><span></span><span></span></div>
          <span class="screen-title">SYSTEM PREVIEW // ACTIVE NODES</span>
        </div>
        <p style="font-size:0.9rem; color:#cbd5e1; margin-bottom:12px;">${prod.fullDesc}</p>
        <div class="sim-grid">
          <div class="sim-metric-card"><span class="sim-val" style="color:var(--cyan-primary);">99.9%</span><span class="sim-lbl">جاهزية النظام</span></div>
          <div class="sim-metric-card"><span class="sim-val" style="color:var(--amber-primary);">&lt; 40ms</span><span class="sim-lbl">زمن الاستجابة</span></div>
          <div class="sim-metric-card"><span class="sim-val" style="color:var(--emerald-accent);">Secured</span><span class="sim-lbl">أمان مشفر</span></div>
        </div>
      </div>
    `;
  }

  const featuresList = prod.features.map(f => `<li><i class="fas fa-check text-cyan"></i> ${f}</li>`).join('');

  modalBody.innerHTML = `
    ${demoContent}
    <div style="margin-top:16px;">
      <h4 style="font-size:1rem; color:#fff; margin-bottom:8px;"><i class="fas fa-star neon-amber"></i> أهم ميزات هذه المنظومة:</h4>
      <ul style="list-style:none; font-size:0.88rem; color:#cbd5e1; line-height:1.8;">
        ${featuresList}
      </ul>
    </div>
  `;

  modalFooter.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
      <span style="font-size:1.1rem; font-weight:800; color:var(--amber-primary); font-family:var(--font-cyber);">${prod.price}</span>
      <button class="cyber-btn cyber-btn-primary" onclick="openProductPurchase('${prod.id}')">
        <i class="fas fa-shopping-bag"></i> طلب شراء / ترخيص هذا النظام
      </button>
    </div>
  `;

  modal.classList.add('active');
}

// Open Product Purchase / License Modal
function openProductPurchase(productId) {
  const prod = OVRAX_PRODUCTS.find(p => p.id === productId);
  if (!prod) return;

  const modal = document.getElementById('productModal');
  const modalHeader = document.getElementById('modalHeader');
  const modalBody = document.getElementById('modalBody');
  const modalFooter = document.getElementById('modalFooter');

  modalHeader.innerHTML = `
    <div style="display:flex; align-items:center; gap:12px;">
      <i class="fas fa-file-contract" style="font-size:1.8rem; color:var(--amber-primary);"></i>
      <div>
        <h3 style="font-size:1.3rem; color:#fff;">طلب ترخيص / مشروع: ${prod.title}</h3>
        <span style="font-size:0.8rem; color:var(--cyan-primary);">تنفيذ مخصص أو شراء الترخيص الكامل</span>
      </div>
    </div>
  `;

  modalBody.innerHTML = `
    <div style="background:rgba(6,9,14,0.7); border:1px solid var(--metal-border); border-radius:12px; padding:16px; margin-bottom:16px;">
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--metal-muted); font-size:0.9rem;">المنتج / النظام:</span>
        <strong style="color:#fff;">${prod.title}</strong>
      </div>
      <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
        <span style="color:var(--metal-muted); font-size:0.9rem;">التصنيف:</span>
        <strong style="color:var(--amber-primary);">${prod.categoryName}</strong>
      </div>
      <div style="display:flex; justify-content:space-between;">
        <span style="color:var(--metal-muted); font-size:0.9rem;">نوع الترخيص / الحالة:</span>
        <span style="color:var(--cyan-primary);">${prod.licenseType}</span>
      </div>
    </div>

    <div style="font-size:0.88rem; color:#cbd5e1; line-height:1.7; margin-bottom:14px;">
      عند الضغط على الزر أدناه، سيتم فتح محادثة WhatsApp مباشرة مع المهندس <strong>أسامة صالح</strong> لمناقشة تفاصيل النظام والبدء في التنفيذ أو التسليم.
    </div>
  `;

  const waText = encodeURIComponent(`السلام عليكم مهندس أسامة، أود الاستفسار والاتفاق بخصوص نظام (${prod.title}) المعروض في منصتك.`);
  const waUrl = `https://wa.me/966553074762?text=${waText}`;

  modalFooter.innerHTML = `
    <div style="display:flex; gap:12px; width:100%;">
      <a href="${waUrl}" target="_blank" class="cyber-btn cyber-btn-whatsapp w-100" onclick="celebrateAction()">
        <i class="fab fa-whatsapp"></i> إتمام الطلب فوراً عبر WhatsApp
      </a>
      <a href="mailto:osamasalh7750@gmail.com?subject=طلب استفسار عن نظام ${encodeURIComponent(prod.title)}&body=${waText}" class="cyber-btn cyber-btn-outline" style="min-width:140px;">
        <i class="fas fa-envelope"></i> بالبريد
      </a>
    </div>
  `;

  modal.classList.add('active');
}

function celebrateAction() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

document.addEventListener('DOMContentLoaded', initMarketplace);