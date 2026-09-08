/**
 * NetworkArchitect Hub - Enterprise Database & Multi-Vendor Store
 * Contains technical documentation, multi-vendor hardware catalog
 * (MikroTik, Ubiquiti, TP-Link, Netis, D-Link, Cisco, Tenda),
 * geographic multi-site deployment plans, and educational modules.
 */

const NETWORK_DATA = {
  // Enterprise Information
  enterprise: {
    name: "منظومة البنية التحتية الشبكية الموحدة (Enterprise Mega-Network)",
    scope: "ربط المقر الرئيسي، الأبراج اللاسلكية، الفروع الإدارية، المستودعات، والمصانع، ونقاط البيع، والعاملين الميدانيين",
    standards: ["IEEE 802.3 (Ethernet)", "IEEE 802.1Q (VLAN)", "IEEE 802.11ax (Wi-Fi 6)", "airMAX AC (PtP/PtMP)", "RFC 1918 (Private IP)"],
    vlans: [
      { id: 10, name: "إدارة الأجهزة (MGMT)", subnet: "10.10.10.0/24", gateway: "10.10.10.1", color: "#38bdf8", desc: "أجهزة الراوترات، السويتشات، والهوائيات" },
      { id: 20, name: "مزرعة الخوادم (Servers & ERP)", subnet: "10.10.20.0/24", gateway: "10.10.20.1", color: "#0284c7", desc: "خوادم البيانات وقواعد البيانات و NVR المراقبة" },
      { id: 30, name: "موظفي المقر والفروع (Corporate Staff)", subnet: "10.10.30.0/23", gateway: "10.10.30.1", color: "#60a5fa", desc: "أجهزة الحواسيب المكتبية والمحمولة للموظفين" },
      { id: 40, name: "الهواتف الصوتية (VoIP Telephony)", subnet: "10.10.40.0/24", gateway: "10.10.40.1", color: "#c084fc", desc: "هواتف IP ومقسم السنترال مع أولوية QoS DSCP 46" },
      { id: 50, name: "كاميرات المراقبة (Security CCTV)", subnet: "10.10.50.0/24", gateway: "10.10.50.1", color: "#f87171", desc: "كاميرات IP وبوابات الدخول الأمنية" },
      { id: 60, name: "شبكة الضيوف (Guest Wi-Fi)", subnet: "10.10.60.0/23", gateway: "10.10.60.1", color: "#4ade80", desc: "بوابة مصادقة Hotspot مع عزل كامل وتحديد سرعة" },
      { id: 70, name: "روابط الأبراج اللاسلكية (Wireless PtP)", subnet: "10.10.70.0/28", gateway: "10.10.70.1", color: "#fbbf24", desc: "مسارات البث الهوائي بين المقر والمواقع النائية" }
    ]
  },

  // Geographic Multi-Site Rollout Plan (خطة النشر الجغرافي للمواقع المتعددة)
  geographicPlan: {
    title: "خطة النشر الهندسي والتوزيع الجغرافي للمواقع والفروع",
    description: "مخطط توزيع التغطية ونقل البيانات من المقر الرئيسي إلى 5 مواقع جغرافية متباعدة مع العمالة الميدانية",
    masterTower: {
      site: "المقر الرئيسي (HQ Central Campus)",
      height: "35 متر برج جملوني (Lattice Tower)",
      coordinates: "24.7136° N, 46.6753° E",
      equipment: [
        "راوتر ميكروتك مركزي: MikroTik CCR2004-16G-2S+ (Core Routing & BGP)",
        "سويتش توزيع رئيسي: MikroTik CRS328-24P-4S+ (PoE 500W & 10G SFP+ Uplinks)",
        "هوائي قطاعي مركزي: Rocket Prism 5AC Gen2 + airMAX 120° 22dBi Sector (للبث المتعدد PtMP)",
        "هوائي صحني نقطي: airFiber 5XHD / PowerBeam 5AC ISO (للرابط المباشر 18km إلى المصنع)",
        "منظومة حماية: 4x محاقن تأريض ETH-SP-G2 مع كابلات ToughCable Carrier STP"
      ],
      backboneInternet: "10G Fiber Leased Line (1:1 Dedicated) + 500Mbps Microwave Backup",
      frequencyChannels: "5785 MHz (Sector PtMP) | 5500 MHz (Dish PtP المصنع)"
    },
    sites: [
      {
        id: "site-admin",
        name: "الموقع 1: فرع الإدارة العامة والمبيعات (Administrative Branch)",
        distance: "4.2 كم من البرج الرئيسي",
        losStatus: "خط رؤية مباشر كامل (Clear Line of Sight)",
        targetSignal: "-54 dBm (ممتاز)",
        bandwidthAllocated: "150 Mbps متماثل",
        userCount: "45 موظف مكتبي + 8 هواتف IP + 6 كاميرات مراقبة",
        cpeReceiver: {
          brand: "Ubiquiti",
          model: "NanoStation 5AC (NS-5AC)",
          type: "محطة استقبال هوائية (Station PtMP)",
          gain: "16 dBi Panel Antenna مدمج",
          mount: "ماست حديدي بارتفاع 6 أمتار فوق سطح المبنى"
        },
        distributionSwitch: {
          brand: "Cisco / TP-Link",
          model: "TP-Link JetStream TL-SG3428MP (24-Port Gigabit PoE+ L2+ Managed Switch)",
          role: "توزيع الـ VLANs وتغذية نقاط الوصول والهواتف بالطاقة"
        },
        localAPs: [
          { brand: "TP-Link", model: "Archer AX10 / C6 (Wi-Fi 6 Gigabit Router)", mode: "Pure Access Point Mode (مع تعطيل DHCP)", role: "تغطية مكاتب الموظفين والاجتماعات" },
          { brand: "D-Link", model: "DAP-3320 Outdoor PoE AP", mode: "Access Point", role: "تغطية باحة مواقف سيارات الفرع ومدخل الزوار" }
        ],
        ipSubnet: "10.10.30.0/24 (VLAN 30 للموظفين) | 10.10.40.0/25 (VLAN 40 للهواتف)",
        wiringNotes: "كابل ToughCable CAT6 STP من النانواستيشن بأعلى السطح إلى محقن PoE 24V بغرفة الشبكة، ثم كابل إيثرنت إلى المنفذ 1 في سويتش TP-Link."
      },
      {
        id: "site-warehouse",
        name: "الموقع 2: المستودعات المركزية واللوجستيات (Central Logistics Hub)",
        distance: "11.8 كم من البرج الرئيسي",
        losStatus: "خط رؤية مع عائق تلي جزئي يتطلب برجاً بارتفاع 24 متراً",
        targetSignal: "-58 dBm (مستقر)",
        bandwidthAllocated: "200 Mbps متماثل",
        userCount: "25 موظف ومناول + 32 كاميرا مراقبة NVR + 40 قارئ باركود لاسلكي",
        cpeReceiver: {
          brand: "Ubiquiti",
          model: "PowerBeam 5AC ISO 400mm",
          type: "صحن توجيهي فائق العزل (Isolator Dish PtP)",
          gain: "25 dBi Parabolic Dish",
          mount: "برج مثلثي بارتفاع 24 متراً مع أسلاك شداد (Guyed Tower)"
        },
        distributionSwitch: {
          brand: "D-Link / Cisco",
          model: "D-Link DGS-1210-28P (24x Gigabit PoE + 4x SFP Smart Managed Switch)",
          role: "تغذية كاميرات الـ NVR ونقاط الوصول الخارجية الصناعية"
        },
        localAPs: [
          { brand: "Netis", model: "Netis WF2322 (Outdoor High Power 300Mbps)", mode: "Pure AP", role: "تغطية ممرات هناجر المستودع لقارئات الباركود المحمولة" },
          { brand: "TP-Link", model: "Pharos CPE510 / EAP225-Outdoor", mode: "AP", role: "تغطية ساحات التحميل والتفريغ وموازين الشاحنات" }
        ],
        ipSubnet: "10.10.50.0/24 (VLAN 50 لكاميرات المراقبة) | 10.10.30.128/25 للمستودع",
        wiringNotes: "تأريض إلزامي للهوائي الصحن بقضيب أرضي مستقل عند قاعدة البرج لحماية أجهزة المستودع من ضربات الصواعق."
      },
      {
        id: "site-plant",
        name: "الموقع 3: مصنع الإنتاج والمختبرات الميدانية (Production Plant)",
        distance: "18.5 كم من البرج الرئيسي (رابط بعيد المدى)",
        losStatus: "رابط ممتد عبر الأفق مع حساب انحناء الأرض (4.2 متر تحدب)",
        targetSignal: "-52 dBm (باستخدام هوائي صحني عالي الكسب)",
        bandwidthAllocated: "300 Mbps (ربط مباشر فائق السعة)",
        userCount: "60 مهندس وفني + خطوط إنتاج PLC/SCADA الحساسة",
        cpeReceiver: {
          brand: "Ubiquiti",
          model: "airFiber 5XHD مع صحن Slant 45 (30 dBi)",
          type: "رابط نقطي مخصص عالي السعة (Dedicated Carrier PtP Backhaul)",
          gain: "30 dBi Slant 45 Parabolic Dish",
          mount: "برج جملوني على هضبة المصنع بارتفاع 18 متراً"
        },
        distributionSwitch: {
          brand: "Cisco Catalyst",
          model: "Cisco Catalyst 2960-X / 3650 48-Port PoE+ L3 Switch",
          role: "عزل شبكة أنظمة التحكم الصناعية (OT/SCADA) عن شبكة المكاتب"
        },
        localAPs: [
          { brand: "MikroTik", model: "cAP ax Wi-Fi 6 Enterprise Ceiling AP", mode: "CAPsMAN Managed AP", role: "تغطية مبنى الإدارة والمختبرات" },
          { brand: "D-Link", model: "D-Link DIR-842 Gigabit Router", mode: "AP Mode (DHCP Disabled)", role: "تغطية غرفة الصيانة والورش" }
        ],
        ipSubnet: "10.10.20.0/24 (خوادم المصنع) | 10.10.30.0/23 (المهندسين)",
        wiringNotes: "كابلات فايبر بصرية ممتدة بين هناجر المصنع والسويتش المركزي لحصانتها الكاملة ضد التشويش الكهرومغناطيسي لمحركات المصنع."
      },
      {
        id: "site-retail",
        name: "الموقع 4: نقاط البيع والأكشاك الخارجية (Retail POS & Kiosks)",
        distance: "1.2 كم - 2.8 كم (مواقع قريبة متعددة)",
        losStatus: "رؤية مباشرة بين أسطح المباني",
        targetSignal: "-48 dBm إلى -55 dBm",
        bandwidthAllocated: "30 Mbps لكل نقطة بيع",
        userCount: "محطات بيع POS وكاشيرات وخدمة عملاء وواي فاي ضيوف",
        cpeReceiver: {
          brand: "Ubiquiti / Netis",
          model: "NanoStation Loco5AC أو Netis WF2322",
          type: "لاقط مدمج مدمج منخفض التكلفة (Compact CPE Client)",
          gain: "13 - 16 dBi Panel",
          mount: "ذراع جدارية مثبتة على واجهة الفرع"
        },
        distributionSwitch: {
          brand: "TP-Link / Tenda",
          model: "TP-Link TL-SG108PE (8-Port Gigabit Desktop PoE Switch)",
          role: "توصيل أجهزة الكاشير ونقاط البيع ونقطة الواي فاي"
        },
        localAPs: [
          { brand: "TP-Link", model: "TL-WR840N / Archer C24", mode: "Access Point Mode (Fixed IP 10.10.30.x)", role: "تغطية مساحة الصالة ونقطة البيع" },
          { brand: "Tenda", model: "Tenda AC10 Dual Band AC1200", mode: "AP Mode", role: "تغطية شبكة الكاشيرات وشبكة الزوار" }
        ],
        ipSubnet: "10.10.30.x (VLAN 30 لأجهزة البيع) | 10.10.60.x (VLAN 60 للزبائن)",
        wiringNotes: "تعطيل خادم DHCP في راوتر TP-Link المنزلي إلزامياً لمنع قطع خدمة نقاط البيع."
      },
      {
        id: "site-teleworkers",
        name: "الموقع 5: المندوبون والعاملون الميدانيون (Remote Field Staff)",
        distance: "أي مكان في العالم (عبر شبكات 4G/5G والإنترنت الخارجي)",
        losStatus: "اتصال مشفر آمن عبر الإنترنت العالمي",
        targetSignal: "تغطية شبكة الهاتف الخلوي",
        bandwidthAllocated: "10-25 Mbps لكل موظف ميداني",
        userCount: "50+ مندوب مبيعات، مشرفو مواقع، وسائقو شاحنات",
        cpeReceiver: {
          brand: "برمجي (Software VPN)",
          model: "WireGuard / IPsec Road Warrior Tunnel",
          type: "نفق مشفر فائق السرعة عبر بروتوكول UDP مع ChaCha20-Poly1305",
          gain: "تشفير عالي الأداء دون إجهاد بطارية الهواتف والأجهزة اللوحية"
        },
        distributionSwitch: {
          brand: "MikroTik Core",
          model: "واجهة WireGuard داخل راوتر MikroTik CCR2004 المركزي",
          role: "منح المندوبين وصولاً آمناً لقاعدة بيانات الـ ERP والأسعار والمخزون"
        },
        localAPs: [],
        ipSubnet: "10.10.90.0/24 (نطاق أنفاق الـ VPN المشفرة)",
        wiringNotes: "المصادقة بمفاتيح تشفير خاصة (Public/Private Keys) بدون أي كلمات سر مكشوفة."
      }
    ]
  },

  // 5 Educational Modules (Deep Scientific & Practical Breakdown)
  modules: [
    {
      id: 1,
      tag: "الوحدة الأولى",
      title: "المعمارية الفيزيائية ومصدر الخدمة (Physical & WAN Layer)",
      subtitle: "المودم، خطوط الفايبر المزدوجة، التأريض، كابلات الشيلد وأنظمة الطاقة PoE",
      icon: "⚡",
      duration: "45 دقيقة قراءة وتطبيق",
      sections: [
        {
          heading: "1. المودم ومزود الخدمة (ISP) والمعركة بين Bridge Mode و Route Mode",
          whyContent: "لماذا نصرّ هندسياً على تحويل مودم المزود إلى Bridge Mode؟ في الوضع الافتراضي (Route Mode)، يقوم مودم المزود بوظيفة التوجيه وجدار الحماية وتوزيع الآي بي عبر NAT خاص به، وعند وصل راوتر ميكروتك خلفه يُنشئ الميكروتك NAT ثانٍ، وهو ما يُعرف بكارثة (Double NAT). هذه الكارثة تُسبب: فشل اتصالات VPN الخارجية، اختناق جدول تتبع الاتصالات (Connection Tracking Table) في مودم المزود الرخيص، وتأخير زمني ملحوظ (Bufferbloat). في المقابل، تحويل المودم إلى نمط الجسر (Bridge Mode) يجعله مجرد جسر فيزيائي يحول الإشارة الضوئية إلى كهربائية فقط، ويسلم الـ Public IP مباشرة لمنفذ SFP+ في الميكروتك.",
          howContent: "الدخول لواجهة مودم الـ Fiber ONT، التوجه إلى Network -> WAN -> تعديل نوع الاتصال من Route إلى Bridge، وتعطيل خادم DHCP والـ Wi-Fi تماماً في المودم. ثم في الميكروتك: إضافة PPPoE Client أو DHCP Client على المنفذ المتصل بالمودم ليحصل راوتر الشركة المركزي على العنوان الحقيقي للإنترنت مباشرة.",
          keyPoints: [
            "تجنب Double NAT نهائياً لضمان سلامة خوادم الـ VPN والـ VoIP.",
            "إعداد Dual-WAN: خط الفايبر الرئيسي عبر SFP+ 10G (WAN1)، وخط راديو/LTE احتياطي عبر ether1 (WAN2).",
            "استخدام نظام التحقق المستمر (Recursive Routing Failover) لفحص مسار الإنترنت الحقيقي وليس مجرد حالة الكابل."
          ]
        },
        {
          heading: "2. البنية التحتية السلكية: لماذا نحظر كابلات UTP في الأبراج ونلزم كابلات STP/FTP؟",
          whyContent: "الهواء المحيط بالأبراج مشحون بجزيئات الكتروستاتيكية تزداد مع حركة الرياح والعواصف الرعدية. إذا استخدمت كابل UTP بلاستيكي عادي، فإن هذه الشحنات تتراكم على الغلاف النحاسي وتصل مباشرة إلى منفذ إيثرنت الراوتر مسببة احتراق رقاقة المتحكم الفيزيائي (PHY Chip). كابلات STP/FTP المحمية تحتوي على درع قصديري يمتص الشحنات، وسلك أرضي مدمج (ESD Drain Wire) يفرغ أي جهد كهربائي زائد فوراً إلى الأرض قبل وصوله للأجهزة.",
          howContent: "استخدام كابلات ToughCable Carrier CAT6 STP ذات غلاف مقاوم للأشعة فوق البنفسجية (UV-Resistant). تقشير الكابل بعناية، ثني سلك التأريض النحاسي وملاسمته للغلاف المعدني لرأس RJ45 Shielded، واستخدام مكبس مخصص للتأكد من استمرارية الدائرة الكهربائية للأرضي.",
          keyPoints: [
            "قاعدة ألوان الكابل المعتمدة مؤسسياً: معيار T568B (أبيض-برتقالي، برتقالي، أبيض-أخضر، أزرق، أبيض-أزرق، أخضر، أبيض-بني، بني).",
            "تركيب محاقن حماية من الصواعق (Ubiquiti ETH-SP-G2) في نقطتين: عند خروج الكابل من الهوائي بأعلى البرج، وعند نقطة دخول الكابل للمبنى.",
            "ربط قضيب تأريض نحاسي (Ground Rod) بمقاومة أرضية أقل من 5 أوم."
          ]
        },
        {
          heading: "3. أنظمة التغذية الكهربائية عبر الشبكة (PoE): صدمة الـ 24V مقابل 48V",
          whyContent: "كثير من الفنيين يتسببون في احتراق أجهزة الأبراج بسبب خلط الجهد! أجهزة Ubiquiti NanoStation و Rocket تعمل بنظام (Passive PoE 24V) حيث يتم حقن 24 فولت تيار مستمر بشكل دائم على الأزواج (4,5 موجباً و 7,8 سالباً) بدون أي تفاوض ذكي. بينما أجهزة السويتشات ونقاط الوصول الحديثة وكاميرات المراقبة تعمل بمعيار (Active PoE 802.3af/at 48V-54V) الذي يرسل نبضة فحص أولاً للتأكد من حاجة الجهاز للطاقة قبل تفعيلها. إذا ربطت سويتش 48V مباشر بجهاز نانو قديم بدون محول، ستحترق لوحة الراديو في ثوانٍ!",
          howContent: "استخدام سويتش ذكي مثل MikroTik CRS328-24P الذي يسمح بضبط كل منفذ على حدة (Auto 802.3af/at أو Forced 24V Passive)، أو استخدام محاقن طاقة PoE أصلية 24V 0.5A Gigabit Rated لأجهزة الأبراج ومحطات النانو.",
          keyPoints: [
            "التحقق المزدوج من فولتية المنفذ قبل تشغيل الكابل.",
            "حساب ميزانية الطاقة الكلية (PoE Budget): مجموع استهلاك الأجهزة يجب ألا يتجاوز 80% من قدرة السويتش لمنع إعادة التشغيل العشوائي."
          ]
        }
      ]
    },
    {
      id: 2,
      tag: "الوحدة الثانية",
      title: "العقل المدبر وإدارة المسارات (MikroTik Core Routing)",
      subtitle: "التأمين المتقدم، تجزئة الـ VLANs، جدار الحماية، وتوزيع السرعات العادل عبر خوارزمية PCQ",
      icon: "🧠",
      duration: "60 دقيقة قراءة وتطبيق",
      sections: [
        {
          heading: "1. تحصين الراوتر وإغلاق الثغرات (Hardening & Initial Lockdown)",
          whyContent: "راوتر ميكروتك عند خروجه من المصنع يكون به منافذ بروتوكولات غير مشفرة مفتوحة مثل Telnet و FTP و Web HTTP. هذه المنافذ تسمح للمهاجمين بالتقاط كلمات السر بنص صريح، أو شن هجمات تخمين القوة الغاشمة (Brute Force). تحصين الراوتر هو الخطوة الصفرية قبل توصيله بالإنترنت.",
          howContent: "الانتقال إلى `/ip service` وتعطيل telnet, ftp, www, api, api-ssl، وتغيير منفذ Winbox من 8291 الافتراضي إلى منفذ مخصص، وتحديد قائمة العناوين المسموح لها بالدخول عبر خيار `address-list=ADMINS`.",
          keyPoints: [
            "تعطيل خدمة RoMON و MAC-Winbox على منافذ الـ WAN لمنع اكتشاف الراوتر عبر الجيران.",
            "تفعيل قواعد إسقاط الحزم المشبوهة (Drop Invalid) في أعلى سلسلة الـ Firewall Filter.",
            "استخدام جدار ناري مؤقت (Tarpit) لحظر الآي بي الذي يحاول تسجيل الدخول 3 مرات متتالية فاشلة لمدة 24 ساعة."
          ]
        },
        {
          heading: "2. معمارية الجسر المدار وعزل الشبكات الافتراضية (Bridge VLAN Filtering)",
          whyContent: "في الشركات العملاقة، لا يمكن وضع جميع الموظفين والخوادم والكاميرات والضيوف في نطاق بث واحد (Broadcast Domain). إذا أصيب حاسوب موظف ببرمجية خبيثة، ستنتقل لجميع السيرفرات، كما أن حركة بيانات كاميرات المراقبة ستخنق شبكة الواي فاي. الحل هو إنشاء Bridge واحد مدعوم بالعتاد (Hardware Offloaded)، وتشغيل الـ VLAN Filtering لعزل كل قسم في شبكة افتراضية مستقلة على مستوى الطبقة الثانية (Layer 2).",
          howContent: "إنشاء جسر باسم `bridge-core` مع تفعيل `vlan-filtering=yes`، ثم تعريف الـ VLANs وتحديد المنافذ الممررة (Trunk Ports) والمنافذ الطرفية (Access Ports). ثم تخصيص IP Address و IP Pool و DHCP Server منفصل لكل VLAN.",
          keyPoints: [
            "تخصيص مسار السويتش الرئيسي كـ Trunk Port يحمل كافة الـ Tags (10, 20, 30, 40, 50, 60, 70).",
            "حظر حركة المرور بين الـ VLANs عبر جدار الحماية باستثناء إتاحة الوصول لخوادم الـ ERP من شبكة الموظفين فقط.",
            "تفعيل خادم DHCP مخصص لكل شبكة مع أوقات تأجير (Lease Time) متناسبة (ساعتين للضيوف، 7 أيام للموظفين المكاتب)."
          ]
        },
        {
          heading: "3. جدار الحماية وترجمة العناوين (Firewall NAT: Masquerade vs Src-NAT)",
          whyContent: "جميع الأجهزة الداخلية تمتلك عناوين IP محلية خاصة (RFC 1918) غير قابلة للتوجيه على الإنترنت العالمي. وظيفة الـ NAT هي استبدال عنوان المرسل الداخلي بعنوان الراوتر الخارجي. نستخدم `action=masquerade` على واجهات الـ WAN الديناميكية (DHCP أو PPPoE) لأنها تعيد فحص العنوان تلقائياً عند تغيره، بينما نستخدم `action=src-nat to-addresses=x.x.x.x` على الخطوط ذات الآي بي الثابت (Static IP) لتوفير جهد المعالج وزيادة سرعة المعالجة بنسبة 15%.",
          howContent: "إضافة قاعدة `chain=srcnat out-interface-list=WAN action=masquerade`. ولتوجيه البوابات الخارجية لخوادم داخلية، نستخدم الـ Destination NAT (Dst-NAT / Port Forwarding).",
          keyPoints: [
            "حماية الراوتر من هجمات تزييف الهوية (Anti-IP Spoofing) عبر منع الحزم الواردة من الـ WAN بعناوين محلية خاصة.",
            "حماية خوادم الـ DNS من استغلالها في هجمات تضخيم النطاق (DNS Amplification) عبر حظر استعلامات DNS الواردة من منفذ الـ WAN."
          ]
        },
        {
          heading: "4. إدارة الباندويث العادلة: خوارزمية PCQ (Per Connection Queue) السحرية",
          whyContent: "المشكلة الكبرى في شبكات الشركات هي أن موظفاً واحداً يقوم بتنزيل ملف عبر Torrent أو Google Drive يسحب كامل سرعة الخط، مما يؤدي إلى توقف برامج الـ ERP وتقطع مكالمات الـ VoIP لدى باقي الموظفين. تحديد سرعة ثابتة لكل جهاز (مثل 2Mbps لكل حاسوب) غير فعال، لأنه إذا كان هناك موظف واحد فقط في المبنى، فلن يستفيد من باقي سرعة الخط الـ 200Mbps المتوفرة! الحل هو تطبيق خوارزمية **PCQ**. تعمل PCQ على مراقبة استهلاك الشبكة؛ فإذا كانت السرعة الكلية 100Mbps وكان هناك مستخدم واحد، يحصل على 100Mbps كاملة، وإذا دخل 10 مستخدمين، تقسم السرعة ديناميكياً ولحظياً إلى 10Mbps لكل مستخدم بالتساوي الدقيق وبدون تدخل يدوي!",
          howContent: "في `/queue type` إنشاء نوعين: `pcq-download` (المعيار: Dst-Address) و `pcq-upload` (المعيار: Src-Address). ثم في `/queue simple` أو `/queue tree` إنشاء طابور عام للإنترنت وتعيين هذه الأنواع له.",
          keyPoints: [
            "توزيع متكافئ للتحميل والرفع يمنع ظاهرة اختناق الطوابير (Bufferbloat).",
            "عزل حركة الـ VoIP وحركة الـ ERP في طابور ذي أولوية قصوى (Priority 1) لتمريرها قبل أي حركة تصفح أو تحميل."
          ]
        }
      ]
    },
    {
      id: 3,
      tag: "الوحدة الثالثة",
      title: "الربط اللاسلكي ونقل المسافات (Ubiquiti Backhaul PtP / PtMP)",
      subtitle: "المبادئ الفيزيائية للراديو، حساب منطقة فرينل، هوائيات الروكت والنانو، وقراءة مؤشرات جودة الإشارة",
      icon: "📡",
      duration: "55 دقيقة قراءة وتطبيق",
      sections: [
        {
          heading: "1. المبادئ الفيزيائية للربط الهوائي: خط الرؤية (LOS) ومنطقة فرينل (Fresnel Zone)",
          whyContent: "يعتقد الكثيرون أنه يكفي أن ترى البرج المقابل بعينك المجردة (Visual Line of Sight) لكي ينجح الرابط اللاسلكي. هذا خطأ هندسي فادح! موجات الراديو لا تنتقل في خط ليزري دقيق، بل تنتشر على شكل مجسم بيضاوي ثلاثي الأبعاد يُعرف بـ (Fresnel Zone). إذا دخل أي عائق (شجرة، قمة مبنى، تل، أو حتى انحناء سطح الأرض في المسافات الطويلة) داخل 60% من منطقة فرينل الأولى، ستنعكس جزء من الموجات وتصل إلى هوائي الاستقبال بفارق زمني وعكس قطبية (Phase Cancellation)، مما يؤدي إلى انخفاض مفاجئ في السرعة وفقدان الحزم (Packet Loss) على الرغم من أن إشارة الاستقبال تبدو ظاهرياً جيدة!",
          howContent: "حساب نصف قطر منطقة فرينل عند نقطة المنتصف بالمعادلة: r1 = 8.656 * sqrt(d / f) حيث d المسافة بالكيلومتر و f التردد بالجيجاهرتز. إذا كانت المسافة 10 كم على تردد 5.8 GHz، فإن نصف قطر المنطقة في المنتصف هو 11.36 متر، ويجب أن يرتفع الهوائيان بما يضمن خلو 6.8 متر على الأقل فوق أعلى عائق.",
          keyPoints: [
            "لماذا نختار تردد 5GHz بدلاً من 2.4GHz في الربط؟ لأن 5GHz يوفر قنوات واسعة (20/40/80 MHz)، وطاقة اختراق ضوضاء أعلى، وخالٍ من تداخلات أجهزة البلوتوث والواي فاي المنزلي.",
            "مراعاة انحناء كروية الأرض: في الروابط الأطول من 10 كم، يرتفع سطح الأرض في المنتصف بمقدار h = d^2 / (8 * R) مما يتطلب زيادة ارتفاع أبراج التثبيت."
          ]
        },
        {
          heading: "2. إعداد محطة البث المركزية (Master Tower: Rocket Prism 5AC + Sector)",
          whyContent: "في برج المقر الرئيسي للشركة، نحتاج لبث الإنترنت إلى عدة فروع ومستودعات في اتجاهات متقاربة (Point-to-Multipoint PtMP). نستخدم جهاز Rocket Prism 5AC المزود بتقنية التصفية النشطة airPrism التي تعزل الضوضاء من الأبراج المجاورة، مع هوائي قطاعي (Sector Antenna) يغطي زاوية 120 درجة بربح 21-22 dBi.",
          howContent: "في واجهة airOS 8: اختيار وضع اللاسلكي `Access Point PtMP airMAX AC`، ضبط وضع الشبكة على `Bridge`، تفعيل بروتوكول `airMAX AC`، واختيار تردد نظيف غير مشوش عبر أداة `airView`، وضبط عرض القناة على 40MHz لتحقيق سرعات تفوق 300Mbps.",
          keyPoints: [
            "تفعيل بروتوكول التزامن الزمني بالأقمار الصناعية (GPS Sync) لمنع تداخل أجهزة الإرسال المتجاورة على نفس البرج.",
            "تفعيل تشفير لاسلكي آمن WPA2-PSK (AES) حصراً لمنع خفض معدلات التعديل (Modulation Rates)."
          ]
        },
        {
          heading: "3. إعداد محطات الاستقبال في الفروع (Client Stations: NanoStation & PowerBeam)",
          whyContent: "في مواقع الفروع، نستخدم NanoStation 5AC للمسافات حتى 5 كم، أو صحن PowerBeam 5AC ISO للمسافات البعيدة حتى 20 كم لحصر الإشارة في شعاع ضيق جداً (8 درجات) لمنع التقاط أي تشويش جانبي.",
          howContent: "ضبط الوضع على `Station PtP / PtMP`، إجراء مسح لاسلكي للأثير (Site Survey)، واختيار شبكة برج المقر، ثم تفعيل خيار **Lock to AP** وكتابة الـ MAC Address للبرج لضمان عدم اتصال المحطة بأي برج مزيف آخر في حال حدوث تداخل.",
          keyPoints: [
            "التوجيه الدقيق جداً للهوائي (Antenna Alignment) عبر مراقبة صوت النغمات أو عداد الإشارة المباشر للوصول لأفضل قيمة.",
            "تفعيل عزل المشتركين (Client Isolation) في البرج لمنع محطات الفروع من التحدث مباشرة مع بعضها دون المرور بالراوتر الرئيسي."
          ]
        },
        {
          heading: "4. قراءة مؤشرات جودة الرابط الحقيقية (RF Metrics Engineering)",
          whyContent: "كثير من المبتدئين ينظرون فقط إلى 'قوة الإشارة' (Signal Strength) ويعتبرون الرابط ممتازاً إذا كانت -60 dBm. هذا غير كافٍ إطلاقاً! قد تكون الإشارة -60 dBm ولكن الرابط يسقط بسبب الضجيج الشديد أو التشويه.",
          howContent: "فحص المؤشرات الأربعة المعيارية في شاشة airOS Dashboard:",
          keyPoints: [
            "قوة الإشارة (Signal): النطاق المثالي بين -50 dBm إلى -65 dBm. الإشارة الأقوى من -45 dBm تسبب تشبع الراديو (Overload/Distortion)، والأضعف من -75 dBm تسبب هبوط السرعة.",
            "أرضية الضجيج (Noise Floor): يجب أن تكون بين -95 dBm إلى -102 dBm. كلما كان الرقم سالباً أكثر كان أفضل.",
            "نسبة الإشارة إلى الضوضاء (SNR): الإشارة ناقص الضجيج. يجب أن تتجاوز 30 dB للحصول على أعلى تعديل 256QAM.",
            "مؤشر جودة الاتصال (Transmit CCQ): النسبة المئوية للحزم التي تم إرسالها واستلامها بنجاح دون الحاجة لإعادة إرسال. يجب أن تكون 98% إلى 100%."
          ]
        }
      ]
    },
    {
      id: 4,
      tag: "الوحدة الرابعة",
      title: "طبقة التوزيع واللواقط للمستخدم النهائي (Distribution & Customer Access Points)",
      subtitle: "ضبط اللواقط الخارجية (Netis, TP-Link, D-Link)، تحويل الراوترات إلى Pure APs، والقضاء على Rogue DHCP",
      icon: "🏢",
      duration: "50 دقيقة قراءة وتطبيق",
      sections: [
        {
          heading: "1. تحويل المودمات والراوترات المنزلية (TP-Link, D-Link, Netis, Tenda) إلى Pure Access Points",
          whyContent: "في المكاتب ونقاط البيع، غالباً ما تتوفر راوترات تجارية عادية من شركات TP-Link أو D-Link أو Tenda أو Netis. هذه الراوترات مُعدة مصنعياً لتعمل كـ 'راوتر منزلي'؛ أي أنها تقوم بتفعيل خادم DHCP وتوزيع آي بيهات خاصة وتطبيق NAT خاص بها. إذا قمت بوصلها بالسويتش مباشرة، سيتسبب ذلك في كارثة انهيار الشبكة (Rogue DHCP) وانقطاع الإنترنت عن الحواسيب. الحل الهندسي الوحيد هو تجريدها من وظائف التوجيه وتحويلها إلى مجرد 'نقطة بث لاسلكي شفافة' (Pure AP).",
          howContent: "الخطوات الأربع الذهبية الموحدة لجميع الشركات (TP-Link, D-Link, Netis, Tenda):\n1. الدخول لصفحة الراوتر (عادة 192.168.0.1 أو 192.168.1.1).\n2. التوجه إلى صفحة LAN وتغيير الـ IP ليكون ثابتاً خارج نطاق توزيع الميكروتك (مثلاً: 10.10.30.2 للراوتر الأول، 10.10.30.3 للثاني...).\n3. الخطوة الحاسمة: التوجه إلى DHCP والضغط على Disable DHCP Server لحظر توزيع الآي بيهات نهائياً.\n4. توصيل كابل الشبكة القادم من السويتش أو النانواستيشن في منفذ LAN الأصفر وليس منفذ WAN الأزرق!",
          keyPoints: [
            "تسمية الـ SSIDs بشكل منظم في الفروع (مثال: Company_Branch_Staff و Company_Branch_Guest).",
            "فصل شبكة الموظفين عن الزوار عبر الـ Multi-SSID والـ VLAN Tagging في نقاط الوصول المتقدمة."
          ]
        },
        {
          heading: "2. اللواقط الخارجية للزبائن والمحطات (Outdoor CPEs: Netis WF2322 & TP-Link Pharos)",
          whyContent: "في المواقع التي لا تتطلب سعات نقل هائلة، يُعد استخدام لواقط اقتصادية من شركة Netis أو TP-Link أو Tenda حلاً عملياً لتأمين الربط بتكلفة منخفضة ومقاومة عالية للعوامل الجوية.",
          howContent: "ضبط اللاقط الخارجي (CPE) في وضع **Client Mode** أو **WISP Client Router Mode**، وتوجيهه نحو برج البث الرئيسي، ومسح الأثير لاختيار الشبكة وإدخال كلمة المرور. ثم يتم إخراج كابل إيثرنت من محقن الباور PoE المتصل باللاقط إلى سويتش التوزيع أو راوتر التوزيع الداخلي.",
          keyPoints: [
            "تثبيت اللاقط الخارجي في أعلى نقطة خالية من الأشجار والجدران.",
            "استخدام كابل خارجي معزول STP مع رأس RJ45 معدني مؤرض لحماية اللاقط من الصواعق."
          ]
        },
        {
          heading: "3. هندسة قنوات الواي فاي للشركات: تفادي التداخل والتجوال السلس (802.11k/v/r)",
          whyContent: "في شبكات 2.4GHz، هناك 3 قنوات فقط لا تتداخل تردداتها إطلاقاً: القنوات 1 و 6 و 11. استخدام قنوات أخرى مثل القناة 3 أو 9 يتداخل مع القناتين المجاورتين ويخلق تشويشاً هائلاً (Co-Channel Interference). في شبكات الشركات، نوزع نقاط الوصول المتقاربة على القنوات 1، 6، 11 بالتناوب بحيث لا توجد نقطتان متجاورتان على نفس القناة.",
          howContent: "في نقاط الوصول المؤسسية: تفعيل Multi-SSID، وتفعيل بروتوكولات التجوال السلس 802.11k (مشاركة قائمة الجيران) و 802.11v (توجيه الأجهزة لأقرب برج) و 802.11r (التنقل السريع بين النقاط في أقل من 50 ملي ثانية دون انقطاع مكالمة الواتساب أو زووم).",
          keyPoints: [
            "استخدام قنوات 5GHz بعرض 40MHz لتحقيق توازن مثالي بين السرعة الفائقة وعدم التداخل.",
            "تفعيل عزل الأجهزة (Client Isolation) في شبكة الضيوف لمنع المتصلين من اختراق أو فحص هواتف وحواسيب بعضهم البعض."
          ]
        }
      ]
    },
    {
      id: 5,
      tag: "الوحدة الخامسة",
      title: "التشخيص والمراقبة واستكشاف الأعطال (Troubleshooting & Enterprise Observability)",
      subtitle: "منهجية الفحص الطبقي OSI، سيناريوهات الأعطال الميدانية، تعقب تعارض الـ IP، وأدوات المراقبة الحية",
      icon: "🛠️",
      duration: "60 دقيقة قراءة وتطبيق",
      sections: [
        {
          heading: "1. منهجية الفحص الطبقي لحل أزمات الشبكات (The OSI 7-Layer Methodology)",
          whyContent: "عند حدوث عطل في شبكة عملاقة، لا تبدأ بتخمينات عشوائية! الفني المحترف يتبع المنهجية التصاعدية (Bottom-Up):",
          howContent: "1. الطبقة الفيزيائية (Physical): هل مؤشر الإيثرنت يضيء؟ هل كابل الفايبر سليم؟ هل محقن الـ PoE يعمل؟\n2. طبقة ربط البيانات (Data Link): هل يرى الراوتر عنوان الماك الخاص بالجهاز المقابل في جدول ARP؟ هل أرقام الـ VLAN متطابقة على الطرفين؟\n3. طبقة الشبكة (Network): هل الجهاز حصل على عنوان IP وبوابة صحيحة؟ هل البوابة تستجيب للـ Ping؟\n4. طبقة النقل والتطبيقات: هل خادم الـ DNS يعمل؟ هل يتم حل اسم google.com؟ هل قاعدة جدار الحماية تحظر المنفذ؟",
          keyPoints: [
            "تدرج الفحص يوفر 80% من وقت اكتشاف العطل.",
            "استخدام أداة `Torch` المدمجة في ميكروتك لمشاهدة حركة البيانات الحية لحظة بلحظة لكل منفذ ولكل IP."
          ]
        },
        {
          heading: "2. تفكيك وتحليل السيناريوهات الحقيقية الثلاثة الأكثر شيوعاً في الميدان",
          whyContent: "الخبرة الحقيقية تكتسب من حل المشكلات المعقدة التي تواجه مهندسي الشبكات يومياً.",
          howContent: "يتضمن هذا القسم التوجيهات الهندسية للسيناريوهات المتاحة في مختبر المحاكاة التفاعلي بالمنصة:",
          keyPoints: [
            "السيناريو 1 (متصل ولكن لا يوجد إنترنت): فحص سلسلة المسار بدءاً من 127.0.0.1 الداخلي، ثم آي بي الجهاز، ثم بوابة الميكروتك 10.10.30.1، ثم مسار الـ NAT الخارجي 8.8.8.8، ثم خادم الـ DNS.",
            "السيناريو 2 (هبوط مفاجئ للسرعة وقت الذروة): التفريق بين اختناق خط المزود (Bandwidth Saturation) واختناق الرابط اللاسلكي بسبب هبوط الـ CCQ ووجود تشويش راديوي جديد.",
            "السيناريو 3 (تعارض الـ IP والـ Rogue DHCP): كيفية تشغيل أداة `IP -> DHCP Server -> Alerts` لمعرفة عنوان الـ MAC للراوتر الدخيل وفصل المنفذ المتصل به فوراً عبر السويتش."
          ]
        }
      ]
    }
  ],

  // Comprehensive Multi-Vendor Hardware Catalog
  hardware: [
    // 1. MikroTik Routers
    {
      id: "ccr2004",
      brand: "MikroTik",
      name: "MikroTik CCR2004-16G-2S+",
      role: "الراوتر المركزي الرئيسي للشركة (Enterprise Core Router)",
      category: "Routing & Security",
      badge: "Flagship Core",
      svg: "assets/svg/mikrotik-core.svg",
      image: "assets/images/ccr2004.jpg",
      specs: {
        cpu: "Annapurna Labs AL32400 64-bit 4-Core @ 1.7GHz",
        ram: "4GB DDR4 ECC RAM",
        storage: "128MB NAND + RouterOS v7",
        interfaces: "16x Gigabit Ethernet + 2x 10G SFP+ Cages + RJ45 Serial Console",
        throughput: "تصل إلى 15 Gbps مع توجيه الحزم الصغيرة وتفعيل FastPath",
        power: "مزود طاقة مزدوج مدمج (Dual Redundant PSU 100-240V)",
        cooling: "تبريد هوائي ذكي بمروحتين مع تحكم آلي بالحرارة",
        dimensions: "1U Rackmount مع حواشي تثبيت قياسية"
      },
      deployment: "يتم تركيبه في خزانة السيرفرات الرئيسية (HQ Datacenter Rack). يستقبل خط الفايبر 10G وخط الراديو الرديف، ويدير أنفاق WireGuard/IPsec لكافة الفروع، ويتحكم بجميع الـ VLANs وخوارزمية PCQ.",
      wiringGuide: [
        "منفذ sfp-sfpplus1: مخصص لخط الإنترنت الرئيسي الفايبر 10G (WAN1).",
        "منفذ sfp-sfpplus2: مخصص كوصلة رئيسية مجمعة (10G Trunk Uplink) إلى سويتش التوزيع CRS328.",
        "منفذ ether1: مخصص لخط الإنترنت الاحتياطي الميكروويف/LTE (WAN2 Backup Failover).",
        "منفذ ether2: مخصص لكابل برج البث الرئيسي للربط اللاسلكي إلى الفروع والمواقع الميدانية."
      ]
    },
    {
      id: "hex-s",
      brand: "MikroTik",
      name: "MikroTik hEX S (RB760iGS)",
      role: "راوتر الفروع الصغيرة والمواقع الطرفية (Branch Office Edge Router)",
      category: "Routing & Security",
      badge: "Compact Gigabit + SFP",
      svg: "assets/svg/mikrotik-core.svg",
      image: "assets/images/hex-s.jpg",
      specs: {
        cpu: "MediaTek MT7621A Dual-Core 4-Threads @ 880MHz",
        ram: "256MB RAM + MicroSD slot for Dude server",
        interfaces: "5x Gigabit Ethernet + 1x SFP Cage (1.25G) + USB",
        poeOut: "يدعم Passive PoE-Out على المنفذ 5 (لتغذية جهاز نانو أو نقطة وصول)",
        ipsecHardware: "دعم تشفير IPsec العتادي حتى 470 Mbps"
      },
      deployment: "يُوضع في الفروع المتوسطة لإدارة شبكة الفرع محلياً وإنشاء نفق VPN دائم ومستقر مع المقر الرئيسي.",
      wiringGuide: [
        "المنفذ 1 (Internet/PoE In): يستقبل خط الإنترنت أو كابل لاقط النانواستيشن.",
        "المنافذ 2-4: مخصصة لحواسيب موظفي الفرع وهواتف الـ IP.",
        "المنفذ 5 (PoE Out): يغذي نقطة الواي فاي الداخلية للفرع بالطاقة والبيانات."
      ]
    },

    // 2. Switches (Multi-Vendor: MikroTik, Cisco, TP-Link, D-Link)
    {
      id: "crs328",
      brand: "MikroTik",
      name: "MikroTik CRS328-24P-4S+RM",
      role: "سويتش التوزيع والـ PoE المؤسسي المدار (Distribution Switch)",
      category: "Switching & PoE",
      badge: "Smart PoE+ 500W",
      svg: "assets/svg/core-switch.svg",
      image: "assets/images/crs328.jpg",
      specs: {
        cpu: "98DX3236 @ 800MHz",
        ram: "512MB RAM + RouterOS / SwOS Dual Boot",
        ports: "24x Gigabit RJ45 PoE-Out Ports + 4x 10G SFP+ Cages",
        poeOutput: "يدعم كلاً من 802.3af/at (48V) و 24V Passive PoE قابل للتخصيص لكل منفذ",
        poeBudget: "ميزانية طاقة إجمالية ضخمة 500 واط (حتى 30 واط لكل منفذ)",
        switchingCapacity: "128 Gbps Non-Blocking Throughput",
        features: "Hardware VLAN Filtering, Port Isolation, DHCP Snooping, RSTP, Storm Control"
      },
      deployment: "يقع في قلب شبكة المقر الرئيسي، ويقوم بتوزيع الـ VLANs عبر منافذه وتغذية كاميرات المراقبة، هواتف IP، ونقاط الوصول السقفية Wi-Fi 6 مباشرة دون الحاجة لأي محولات.",
      wiringGuide: [
        "المنافذ 1-4: مخصصة لمزرعة الخوادم والـ ERP (VLAN 20).",
        "المنافذ 5-10: مخصصة لحواسيب موظفي المقر (VLAN 30).",
        "المنافذ 11-14: مخصصة لهواتف الـ IP مع تفعيل 802.3af PoE (VLAN 40).",
        "المنافذ 15-20: مخصصة لكاميرات المراقبة NVR مع تفعيل PoE (VLAN 50).",
        "المنافذ 21-24: مخصصة لنقاط الوصول Wi-Fi 6 مع تفعيل PoE وتمرير Multi-VLANs."
      ]
    },
    {
      id: "cisco-2960x",
      brand: "Cisco",
      name: "Cisco Catalyst 2960-X / 3650 Series",
      role: "سويتش المؤسسات والشركات المدار (Enterprise Campus Switch)",
      category: "Switching & PoE",
      badge: "Industry Standard",
      svg: "assets/svg/core-switch.svg",
      image: "assets/images/cisco-2960x.jpg",
      specs: {
        ports: "24x أو 48x Gigabit Ethernet 802.3at PoE+ + 4x 1G SFP أو 2x 10G SFP+",
        poeBudget: "370W إلى 740W ميزانية طاقة كاملة",
        os: "Cisco IOS مع دعم كامل لـ VLANs, VTP, Spanning Tree PVST+, 802.1X",
        stacking: "تقنية FlexStack-Plus حتى 80 Gbps بين السويتشات"
      },
      deployment: "يُركب في المصانع والمباني الكبيرة لتأمين ربط عالي الاعتمادية مع جودة خدمة QoS صارمة لحركة الصوت والفيديو.",
      wiringGuide: [
        "منفذ Uplink SFP: ربط بكابل فايبر بـ Core Switch.",
        "المنافذ 1-24: ربط أجهزة الموظفين وتخصيص access vlan 30."
      ]
    },
    {
      id: "tplink-sg3428mp",
      brand: "TP-Link",
      name: "TP-Link JetStream TL-SG3428MP",
      role: "سويتش إدارة وتوزيع ذكي للفروع (L2+ Managed PoE Switch)",
      category: "Switching & PoE",
      badge: "Cost-Effective PoE+ 384W",
      svg: "assets/svg/core-switch.svg",
      image: "assets/images/tplink-sg3428mp.jpg",
      specs: {
        ports: "24x Gigabit PoE+ (802.3at/af) + 4x Gigabit SFP Slots",
        poeBudget: "384 واط ميزانية طاقة إجمالية (حتى 30W لكل منفذ)",
        features: "Omada SDN Cloud Management, 802.1Q VLAN, Voice VLAN, DHCP Snooping",
        switchingCapacity: "56 Gbps"
      },
      deployment: "الخيار الأكثر شعبية وكفاءة في فروع الشركات والمستودعات لتغذية كاميرات المراقبة ونقاط الواي فاي.",
      wiringGuide: [
        "المنفذ 24: Trunk Port متصل بالراوتر الرئيسي لتمرير كافة الـ VLANs.",
        "المنافذ 1-16: تغذية كاميرات المراقبة ونقاط الوصول بالطاقة والبيانات."
      ]
    },
    {
      id: "dlink-dgs1210",
      brand: "D-Link",
      name: "D-Link DGS-1210-28P Web Smart Switch",
      role: "سويتش مدار ذكي لتوزيع الشبكات والمراقبة",
      category: "Switching & PoE",
      badge: "Auto Surveillance VLAN",
      svg: "assets/svg/core-switch.svg",
      image: "assets/images/dlink-dgs1210.jpg",
      specs: {
        ports: "24x Gigabit PoE + 4x Combo Gigabit/SFP",
        poeBudget: "193W (قابلة للتوسيع حتى 370W في طرازات Max)",
        features: "Auto Surveillance VLAN (إعطاء أولوية تلقائية لكاميرات المراقبة), Loopback Detection"
      },
      deployment: "يُستخدم في غرف التحكم بالمراقبة ومكاتب الفروع المتوسطة.",
      wiringGuide: [
        "المنافذ 1-8: كاميرات مراقبة IP Cameras مع تفعيل Surveillance VLAN تلقائياً."
      ]
    },

    // 3. Ubiquiti Wireless (NanoStation & airMAX)
    {
      id: "nanostation-5ac",
      brand: "Ubiquiti",
      name: "Ubiquiti NanoStation 5AC (NS-5AC)",
      role: "محطة الاستقبال الطرفية ونقل المسافات (CPE Client / PtP 5km)",
      category: "Wireless Long-Range",
      badge: "airMAX AC Classic",
      svg: "assets/svg/nanostation-ac.svg",
      image: "assets/images/nanostation-5ac.jpg",
      specs: {
        gain: "16 dBi هوائي مدمج ثنائي الاستقطاب (Dual-Polarity 45°)",
        frequency: "5150 - 5875 MHz (5GHz airMAX AC)",
        ports: "منفذان Gigabit Ethernet (مع ميزة التمرير PoE Passthrough)",
        throughput: "450+ Mbps سرعة نقل حقيقية",
        housing: "بلاستيك خارجي مقاوم للأشعة فوق البنفسجية لجميع فصول السنة",
        power: "24V 0.5A Gigabit PoE Adapter"
      },
      deployment: "يُثبت على أسطح فروع الشركة الإدارية ونقاط البيع لاستقبال الإنترنت والربط بالشبكة المركزية ثم تمريره إلى السويتش الداخلي للفرع.",
      wiringGuide: [
        "المنفذ الرئيسي (Main): يستقبل كابل التغذية والبيانات PoE In 24V القادم من المحقن الداخلي.",
        "المنفذ الثانوي (Secondary): يمكن استخدامه لتغذية كاميرا مراقبة خارجية مباشرة عبر خاصية PoE Passthrough دون الحاجة لكابل إضافي من الأسفل."
      ]
    },
    {
      id: "nanostation-loco5ac",
      brand: "Ubiquiti",
      name: "Ubiquiti NanoStation Loco 5AC",
      role: "لاقط مدمج اقتصادي للمسافات القريبة (Short-Range CPE 1-3km)",
      category: "Wireless Long-Range",
      badge: "Compact & Powerful",
      svg: "assets/svg/nanostation-ac.svg",
      image: "assets/images/nanostation-loco5ac.jpg",
      specs: {
        gain: "13 dBi هوائي لوحي مدمج",
        throughput: "450+ Mbps على قنوات 20/40/80 MHz",
        ports: "1x Gigabit Ethernet PoE Port",
        dimensions: "حجم كف اليد خفيف الوزن يسهل تثبيته على الواجهات والشبابيك"
      },
      deployment: "مثالي لنقاط البيع والأكشاك والمكاتب القريبة من البرج المركزي حتى 3 كم.",
      wiringGuide: [
        "كابل إيثرنت واحد من منفذ PoE بمحقن الطاقة إلى المنفذ الوحيد بالجهاز."
      ]
    },
    {
      id: "rocket-prism",
      brand: "Ubiquiti",
      name: "Ubiquiti Rocket Prism 5AC Gen2",
      role: "محطة البث الرئيسية لبرج المقر (Master Base Station PtMP)",
      category: "Wireless Long-Range",
      badge: "airPrism Active Filter",
      svg: "assets/svg/rocket-prism.svg",
      image: "assets/images/rocket-prism.jpg",
      specs: {
        frequency: "5.15 - 5.875 GHz (النطاق الكامل متضمناً قنوات DFS)",
        filtering: "تقنية airPrism النشطة لعزل الضوضاء المجاورة وتحسين الـ SNR",
        gps: "تزامن زمني عبر الأقمار الصناعية (GPS Sync) لمنع التداخل بين الأجهزة المتجاورة",
        housing: "هيكل معدني مصبوب (Die-Cast Aluminum) للحماية القصوى من التداخل الكهرومغناطيسي",
        antennaInterface: "2x RP-SMA معزولة ضد الماء للربط بهوائي السيكتور 120 درجة",
        throughput: "تتجاوز 500+ Mbps مع دعم قنوات 20/40/80 MHz"
      },
      deployment: "يتم تثبيته في أعلى برج المقر الرئيسي وربطه بهوائي Sector 120° 22dBi لتأمين بث إنترنت وشبكة مركزية لجميع فروع ومستودعات الشركة المحيطة في نطاق 15 كم.",
      wiringGuide: [
        "توصيل مخرجي RP-SMA بكابلي الـ Coaxial ذوي الجودة العالية إلى هوائي السيكتور.",
        "توصيل هوائي الـ GPS المغناطيسي لضمان قفل الأقمار الصناعية."
      ]
    },
    {
      id: "powerbeam",
      brand: "Ubiquiti",
      name: "Ubiquiti PowerBeam 5AC ISO 400mm",
      role: "صحن الربط النقطي المركز فائق العزل (Long-Range PtP 15-25km)",
      category: "Wireless Long-Range",
      badge: "Pencil Beam 25dBi",
      svg: "assets/svg/powerbeam-dish.svg",
      image: "assets/images/powerbeam.jpg",
      specs: {
        dishDiameter: "400 ملم مع حلقة عزل رادارية مدمجة (Integrated Isolator Radome)",
        gain: "25 dBi تركيز إشعاعي حاد جداً (حزمة شعاعية قلمية بعرض 8 درجات)",
        frequency: "5150 - 5875 MHz",
        windSurvivability: "مقاومة رياح عاتية تصل إلى 200 كم/ساعة",
        range: "مثالي للروابط النقطية الممتدة من 10 إلى 25 كيلومتر"
      },
      deployment: "يُستخدم في الربط المباشر عالي السعة بين المقر الرئيسي والمستودع المركزي البعيد أو المصنع خارج المدينة لضمان استقرار حركة خوادم الـ ERP وكاميرات المراقبة.",
      wiringGuide: [
        "التوجيه الدقيق جداً للهوائي (Sub-Degree Alignment) بسبب ضيق الحزمة الشعاعية."
      ]
    },

    // 4. Client CPEs & Modems/APs (Netis, TP-Link, D-Link, Tenda)
    {
      id: "netis-wf2322",
      brand: "Netis",
      name: "Netis WF2322 High Power Outdoor CPE",
      role: "لاقط خارجي عالي القدرة ونقطة وصول (Outdoor AP / Client CPE)",
      category: "Receivers & CPEs",
      badge: "Outdoor 300Mbps",
      svg: "assets/svg/nanostation-ac.svg",
      image: "assets/images/netis-wf2322.jpg",
      specs: {
        speed: "300 Mbps على تردد 2.4GHz",
        power: "طاقة إرسال عالية تصل إلى 1000mW (30 dBm)",
        gain: "هوائي داخلي مزدوج 12 dBi",
        modes: "AP, Client, WISP, WDS Repeater",
        weatherproof: "معيار IP55 لمقاومة الأمطار والرطوبة والحرارة",
        poe: "Passive PoE In عبر كابل الإيثرنت حتى 60 متراً"
      },
      deployment: "يُستخدم كلاقط للإنترنت من الأبراج القريبة وتمريره إلى المكاتب، أو كنقطة بث خارجية لتغطية الساحات المفتوحة والمستودعات.",
      wiringGuide: [
        "توصيل منفذ PoE باللاقط، ومنفذ LAN بمحقن الباور إلى سويتش الفرع.",
        "ضبط الوضع على Client أو WISP لاختيار شبكة البرج وإدخال كلمة المرور."
      ]
    },
    {
      id: "tplink-cpe510",
      brand: "TP-Link",
      name: "TP-Link Pharos CPE510 / CPE610",
      role: "لاقط ومحطة ربط لاسلكي خارجية 5GHz (Outdoor CPE)",
      category: "Receivers & CPEs",
      badge: "Pharos 5GHz 13-23dBi",
      svg: "assets/svg/powerbeam-dish.svg",
      image: "assets/images/tplink-cpe510.jpg",
      specs: {
        frequency: "5 GHz (5150 - 5850 MHz) خالٍ من تشويش 2.4GHz",
        gain: "13 dBi (في CPE510) أو 23 dBi صحن شبكي (في CPE610)",
        range: "تصل إلى 15+ كم في الروابط النقطية",
        technology: "تقنية Pharos MAXtream TDMA لمنع تصادم الحزم",
        housing: "مقاوم لظروف الطقس الخارجية IPX5 وحماية 6KV من الصواعق"
      },
      deployment: "بديل اقتصادي ممتاز لأجهزة النانواستيشن والباور بيم لربط الفروع البعيدة والمزارع والمستودعات بالبرج الرئيسي.",
      wiringGuide: [
        "توصيل كابل STP بمحقن الطاقة Passive PoE المرفق ثم إلى السويتش.",
        "ضبط الجهاز على وضع Client وقفل الاتصال على SSID البرج."
      ]
    },
    {
      id: "tplink-archer-c6",
      brand: "TP-Link",
      name: "TP-Link Archer C6 / AX10 (Gigabit AP Mode)",
      role: "راوتر وموزع واي فاي منزلي/مكتبي يُحول لنقطة وصول نقية (Pure AP)",
      category: "Access Points",
      badge: "Dual Band Gigabit",
      svg: "assets/svg/wifi6-ap.svg",
      image: "assets/images/tplink-archer-c6.jpg",
      specs: {
        speed: "300 Mbps (2.4GHz) + 867 Mbps (5GHz) AC1200",
        ports: "4x Gigabit LAN + 1x Gigabit WAN",
        antennas: "4 هوائيات خارجية بتقنية MU-MIMO و Beamforming",
        modeFeature: "دعم مدمج لوضع Access Point Mode بنقرة زر واحدة"
      },
      deployment: "يُوضع في مكاتب الفروع ونقاط البيع لنشر الواي فاي للموظفين والزوار.",
      wiringGuide: [
        "الخطوة 1: الدخول لصفحة الراوتر وتفعيل نمط 'Access Point Mode'.",
        "الخطوة 2: تغيير الـ IP إلى ثابت (مثلاً 10.10.30.5) وتعطيل DHCP Server.",
        "الخطوة 3: التوصيل عبر كابل إيثرنت في أحد منافذ الـ LAN القادمة من السويتش."
      ]
    },
    {
      id: "tplink-wr840n",
      brand: "TP-Link",
      name: "TP-Link TL-WR840N / TL-WR841N",
      role: "راوتر توزيع منزلي اقتصادي (موزع واي فاي مكتبي)",
      category: "Access Points",
      badge: "Classic 300Mbps",
      svg: "assets/svg/wifi6-ap.svg",
      image: "assets/images/tplink-wr840n.jpg",
      specs: {
        speed: "300 Mbps على تردد 2.4GHz",
        ports: "4x 10/100 Mbps LAN + 1x WAN",
        antennas: "2 هوائي ثابت 5 dBi",
        cost: "اقتصادي جداً ومنتشر عالمياً في المكاتب الصغيرة"
      },
      deployment: "يُستخدم في غرف الحراسة ونقاط البيع البسيطة.",
      wiringGuide: [
        "إلزامي: تعطيل خادم DHCP تماماً (Disable DHCP Server) لتجنب شل حركة شبكة الشركة.",
        "التوصيل في منفذ الـ LAN الأصفر حصراً."
      ]
    },
    {
      id: "dlink-dir842",
      brand: "D-Link",
      name: "D-Link DIR-842 Dual Band Gigabit Router",
      role: "راوتر توزيع وموزع واي فاي جيجابت مكتبي",
      category: "Access Points",
      badge: "Gigabit AC1200",
      svg: "assets/svg/wifi6-ap.svg",
      image: "assets/images/dlink-dir842.png",
      specs: {
        speed: "1200 Mbps Dual Band",
        ports: "4x Gigabit LAN + 1x Gigabit WAN",
        antennas: "4 هوائيات عالية الكسب"
      },
      deployment: "يُستخدم كموزع واي فاي في مكاتب المهندسين وقاعات الاجتماعات.",
      wiringGuide: [
        "تثبيت الـ IP ليكون 10.10.30.10 وإلغاء خادم DHCP ووصل كابل السويتش بمنفذ LAN 1."
      ]
    },
    {
      id: "tenda-o3",
      brand: "Tenda",
      name: "Tenda O3 5km Outdoor Point-to-Point CPE",
      role: "لاقط خارجي للمسافات المتوسطة (Outdoor CPE 2.4GHz)",
      category: "Receivers & CPEs",
      badge: "Outdoor 5km 12dBi",
      svg: "assets/svg/nanostation-ac.svg",
      image: "assets/images/tenda-o3.jpg",
      specs: {
        gain: "12 dBi هوائي اتجاهي مدمج",
        range: "مصمم للمسافات حتى 5 كم",
        weatherproof: "معيار IP64 ضد الماء والأتربة",
        ledIndicator: "مؤشرات LED خلفية تبين قوة الإشارة الحية للمحاذاة السهلة"
      },
      deployment: "ربط المواقع الإنشائية والمستودعات القريبة.",
      wiringGuide: [
        "توصيل منفذ PoE باللاقط، وضبطه في وضع Station / Client للاتصال بالبرج."
      ]
    },

    // 5. Enterprise APs & Accessories
    {
      id: "cap-ax",
      brand: "MikroTik",
      name: "MikroTik cAP ax (Wi-Fi 6 Enterprise AP)",
      role: "نقطة الوصول السقفية المؤسسية للعاملين (Enterprise Wi-Fi 6)",
      category: "Access Points",
      badge: "Wi-Fi 6 AX1800",
      svg: "assets/svg/wifi6-ap.svg",
      image: "assets/images/cap-ax.jpg",
      specs: {
        standards: "802.11ax (Wi-Fi 6) Dual-Band Dual-Chain",
        speed: "574 Mbps على 2.4GHz + 1200 Mbps على 5GHz",
        cpu: "Qualcomm IPQ-6010 Quad-Core @ 1.8GHz",
        ram: "1GB RAM + RouterOS v7 مع دعم CAPsMAN v2 للتوجيه المركزي",
        ports: "2x Gigabit Ethernet (PoE-In 802.3af/at + PoE-Out)",
        security: "WPA3-Enterprise, WPA3-Personal, Multi-SSID VLAN Mapping, 802.11r Roaming"
      },
      deployment: "تُركب في أسقف المكاتب والقاعات المفتوحة وممرات الشركة لتوفير تغطية لاسلكية فائقة السرعة للموظفين والزوار مع عزل تلقائي للترافيك.",
      wiringGuide: [
        "كابل إيثرنت واحد من سويتش التوزيع CRS328 ينقل البيانات والكهرباء معاً عبر الـ PoE.",
        "ربط بث SSID الخاص بالموظفين بـ VLAN 30، وربط بث شبكة الضيوف بـ VLAN 60."
      ]
    },
    {
      id: "cable-stp",
      brand: "Ubiquiti",
      name: "Ubiquiti ToughCable Carrier & ETH-SP-G2",
      role: "منظومة الكابلات المحمية والحماية من الصواعق (Shielded Cabling & Surge Protection)",
      category: "Infrastructure & Protection",
      badge: "Military Grade",
      svg: "assets/svg/cat6-stp-ground.svg",
      image: "assets/images/cable-stp.png",
      specs: {
        category: "CAT6 STP / FTP مع غلاف خارجي مضاعف UV Weatherproof",
        shielding: "درع قصديري Al Foil + شبكة ألياف معدنية Braided Shield + سلك تصريف أرضي (Drain Wire)",
        surgeProtector: "أنبوب تفريغ غازي (Gas Discharge Tube) يمتص حتى 100A/µs صدمة كهربائية",
        response: "زمن استجابة فوري أقل من 1 نانو ثانية"
      },
      deployment: "تُستخدم في كافة تمديدات الأبراج اللاسلكية والأسطح المرتفعة لمنع احتراق معالجات الراديو وضمان استمرار عمل الشبكة أثناء العواصف الرعدية.",
      wiringGuide: [
        "لحام أو ربط سلك التأريض (Drain Wire) برأس الـ RJ45 المعدني بإحكام.",
        "تثبيت جهاز الحماية ETH-SP-G2 عند قاعدة البرج وتوصيل مربط الأرضي الخاص به بقضيب تأريض نحاسي مدفون في التربة."
      ]
    },
    {
      id: "poe-inj",
      brand: "Ubiquiti",
      name: "Gigabit Passive PoE Injector (24V 0.5A)",
      role: "محقن الطاقة الكهربائية لأجهزة الأبراج (Power Injector)",
      category: "Power Systems",
      badge: "24V Stable DC",
      svg: "assets/svg/poe-injector.svg",
      image: "assets/images/poe-inj.png",
      specs: {
        input: "100-240V AC 50/60Hz",
        output: "24V DC @ 0.5A (12W)",
        dataRate: "10/100/1000 Mbps Gigabit Passthrough",
        pinout: "أزواج الطاقة: الأقطاب الموجبة (4, 5) والأقطاب السالبة (7, 8)"
      },
      deployment: "يُوضع في غرفة التحكم أو داخل صناديق التوزيع لتغذية محطات النانو والروكت الميدانية عبر كابل الشبكة.",
      wiringGuide: [
        "منفذ LAN: يُوصل بكيبل عادي إلى سويتش الفرع أو الراوتر الداخلي.",
        "منفذ POE: يُوصل بكابل الـ STP المتجه إلى جهاز البرج (النانواستيشن أو الروكت)."
      ]
    }
  ]
};
