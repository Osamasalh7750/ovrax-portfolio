/**
 * Comprehensive Enterprise Mock Data
 * Realistic, deep, Saudi / Gulf enterprise context (SAR currency, bilingual labels)
 */

window.ERP = window.ERP || {};

window.ERP.mockData = {
  // Current active session
  session: {
    currentCompanyId: 'comp-1',
    currentBranchId: 'branch-101',
    currentUserId: 'usr-1',
    theme: 'light',
    locale: 'ar'
  },

  // Multi-Company System
  companies: [
    {
      id: 'comp-1',
      name: 'مجموعة العاصمة القابضة للاستثمار والتقنية',
      legalName: 'شركة مجموعة العاصمة المساهمة المقفلة',
      crNumber: '1010489201',
      vatNumber: '310249817200003',
      logoText: 'العاصمة',
      currency: 'SAR',
      fiscalYearStart: '2026-01-01',
      website: 'www.al-asima.sa',
      email: 'hq@al-asima.sa',
      phone: '+966 11 450 8800',
      address: 'برج النخبة، طريق الملك فهد، حي العليا، الرياض 12214',
      branchesCount: 3,
      employeesCount: 148,
      branches: [
        { id: 'branch-101', name: 'المقر الرئيسي - الرياض', manager: 'م. خالد بن سلطان الغامدي', city: 'الرياض', phone: '+966 11 450 8801', staffCount: 82, budget: 14500000 },
        { id: 'branch-102', name: 'فرع المنطقة الغربية - جدة', manager: 'أ. سارة بنت عبدالعزيز العتيبي', city: 'جدة', phone: '+966 12 620 4410', staffCount: 41, budget: 8200000 },
        { id: 'branch-103', name: 'فرع المنطقة الشرقية - الخبر', manager: 'م. فهد بن عبدالله الدوسري', city: 'الخبر', phone: '+966 13 890 3320', staffCount: 25, budget: 5100000 }
      ]
    },
    {
      id: 'comp-2',
      name: 'شركة أفق الغد للحلول الرقمية',
      legalName: 'شركة أفق الغد لتقنية المعلومات ذ.م.م',
      crNumber: '1010738291',
      vatNumber: '311984728100003',
      logoText: 'أفق',
      currency: 'SAR',
      fiscalYearStart: '2026-01-01',
      website: 'www.ofooq-tech.sa',
      email: 'info@ofooq-tech.sa',
      phone: '+966 11 210 9940',
      address: 'مجمع واحة الأعمال، طريق الثمامة، الرياض',
      branchesCount: 2,
      employeesCount: 64,
      branches: [
        { id: 'branch-201', name: 'المقر التقني - الرياض', manager: 'د. طارق المنصور', city: 'الرياض', phone: '+966 11 210 9941', staffCount: 48, budget: 9000000 },
        { id: 'branch-202', name: 'مركز البحث والابتكار - الظهران', manager: 'م. ريم الشمري', city: 'الظهران', phone: '+966 13 830 1120', staffCount: 16, budget: 3500000 }
      ]
    }
  ],

  // Departments
  departments: [
    { id: 'dept-exec', name: 'الإدارة التنفيذية العليا', code: 'EXEC', head: 'م. خالد بن سلطان الغامدي', count: 4 },
    { id: 'dept-finance', name: 'الإدارة المالية والمحاسبة', code: 'FIN', head: 'أ. عبدالله بن سعد القحطاني', count: 12 },
    { id: 'dept-hr', name: 'الموارد البشرية والعمليات', code: 'HR', head: 'أ. سارة بنت عبدالعزيز العتيبي', count: 9 },
    { id: 'dept-projects', name: 'الهندسة وإدارة المشاريع', code: 'ENG', head: 'م. فيصل بن عبدالرحمن المطيري', count: 36 },
    { id: 'dept-sales', name: 'المبيعات وتطوير الأعمال CRM', code: 'SALES', head: 'أ. عمر بن إبراهيم التميمي', count: 18 },
    { id: 'dept-procurement', name: 'المشتريات وسلاسل الإمداد', code: 'PROC', head: 'أ. نورة بنت سليمان الدخيل', count: 8 },
    { id: 'dept-tech', name: 'تقنية المعلومات والتحول الرقمي', code: 'IT', head: 'م. ماجد بن صالح الرشيدي', count: 24 }
  ],

  // Current Users / Personas for Simulation
  users: [
    {
      id: 'usr-1',
      name: 'م. خالد الغامدي',
      email: 'k.alghamdi@al-asima.sa',
      role: 'Super Admin / الرئيس التنفيذي',
      roleKey: 'super_admin',
      department: 'الإدارة التنفيذية',
      branch: 'المقر الرئيسي - الرياض',
      avatar: 'خ',
      status: 'active',
      phone: '+966 50 112 3456'
    },
    {
      id: 'usr-2',
      name: 'أ. عبدالله القحطاني',
      email: 'a.alqahtani@al-asima.sa',
      role: 'المدير المالي CFO',
      roleKey: 'finance_manager',
      department: 'الإدارة المالية',
      branch: 'المقر الرئيسي - الرياض',
      avatar: 'ع',
      status: 'active',
      phone: '+966 55 223 4567'
    },
    {
      id: 'usr-3',
      name: 'أ. سارة العتيبي',
      email: 's.otaibi@al-asima.sa',
      role: 'مديرة الموارد البشرية HR Director',
      roleKey: 'hr_manager',
      department: 'الموارد البشرية',
      branch: 'المقر الرئيسي - الرياض',
      avatar: 'س',
      status: 'active',
      phone: '+966 54 334 5678'
    },
    {
      id: 'usr-4',
      name: 'م. فيصل المطيري',
      email: 'f.almutairi@al-asima.sa',
      role: 'مدير المشاريع الهندسية PMO',
      roleKey: 'project_manager',
      department: 'الهندسة والمشاريع',
      branch: 'المقر الرئيسي - الرياض',
      avatar: 'ف',
      status: 'active',
      phone: '+966 56 445 6789'
    },
    {
      id: 'usr-5',
      name: 'أ. عمر التميمي',
      email: 'o.altamimi@al-asima.sa',
      role: 'مدير المبيعات والعقود Sales VP',
      roleKey: 'sales_manager',
      department: 'المبيعات',
      branch: 'فرع جدة للأعمال',
      avatar: 'ع',
      status: 'active',
      phone: '+966 50 556 7890'
    }
  ],

  // Employees Full Directory
  employees: [
    {
      id: 'emp-001',
      code: 'EMP-1001',
      name: 'م. خالد بن سلطان الغامدي',
      avatar: 'خ',
      position: 'الرئيس التنفيذي للمجموعة',
      department: 'الإدارة التنفيذية العليا',
      branch: 'المقر الرئيسي - الرياض',
      salary: 65000,
      joinDate: '2021-03-01',
      status: 'active',
      email: 'k.alghamdi@al-asima.sa',
      phone: '+966 50 112 3456',
      nationalId: '1084920192',
      leavesBalance: 24,
      performanceRating: '98%'
    },
    {
      id: 'emp-002',
      code: 'EMP-1002',
      name: 'أ. عبدالله بن سعد القحطاني',
      avatar: 'ع',
      position: 'المدير المالي التنفيذي',
      department: 'الإدارة المالية والمحاسبة',
      branch: 'المقر الرئيسي - الرياض',
      salary: 38000,
      joinDate: '2021-06-15',
      status: 'active',
      email: 'a.alqahtani@al-asima.sa',
      phone: '+966 55 223 4567',
      nationalId: '1092837461',
      leavesBalance: 18,
      performanceRating: '95%'
    },
    {
      id: 'emp-003',
      code: 'EMP-1003',
      name: 'أ. سارة بنت عبدالعزيز العتيبي',
      avatar: 'س',
      position: 'مديرة الموارد البشرية والعمليات',
      department: 'الموارد البشرية والعمليات',
      branch: 'المقر الرئيسي - الرياض',
      salary: 32000,
      joinDate: '2022-01-10',
      status: 'active',
      email: 's.otaibi@al-asima.sa',
      phone: '+966 54 334 5678',
      nationalId: '1039482710',
      leavesBalance: 21,
      performanceRating: '96%'
    },
    {
      id: 'emp-004',
      code: 'EMP-1004',
      name: 'م. فيصل بن عبدالرحمن المطيري',
      avatar: 'ف',
      position: 'مدير إدارة المشاريع الهندسية PMO',
      department: 'الهندسة وإدارة المشاريع',
      branch: 'المقر الرئيسي - الرياض',
      salary: 34000,
      joinDate: '2022-04-01',
      status: 'active',
      email: 'f.almutairi@al-asima.sa',
      phone: '+966 56 445 6789',
      nationalId: '1048291048',
      leavesBalance: 15,
      performanceRating: '94%'
    },
    {
      id: 'emp-005',
      code: 'EMP-1005',
      name: 'أ. عمر بن إبراهيم التميمي',
      avatar: 'ع',
      position: 'مدير المبيعات وتطوير الأعمال',
      department: 'المبيعات وتطوير الأعمال CRM',
      branch: 'المقر الرئيسي - الرياض',
      salary: 28000,
      joinDate: '2022-08-15',
      status: 'active',
      email: 'o.altamimi@al-asima.sa',
      phone: '+966 50 556 7890',
      nationalId: '1074829103',
      leavesBalance: 19,
      performanceRating: '92%'
    },
    {
      id: 'emp-006',
      code: 'EMP-1006',
      name: 'م. ماجد بن صالح الرشيدي',
      avatar: 'م',
      position: 'رئيس قسم البنية السحابية والأنظمة',
      department: 'تقنية المعلومات والتحول الرقمي',
      branch: 'المقر الرئيسي - الرياض',
      salary: 29500,
      joinDate: '2023-01-05',
      status: 'active',
      email: 'm.alrashidi@al-asima.sa',
      phone: '+966 55 667 8901',
      nationalId: '1094820194',
      leavesBalance: 26,
      performanceRating: '97%'
    },
    {
      id: 'emp-007',
      code: 'EMP-1007',
      name: 'أ. نورة بنت سليمان الدخيل',
      avatar: 'ن',
      position: 'مديرة العقود والمشتريات',
      department: 'المشتريات وسلاسل الإمداد',
      branch: 'المقر الرئيسي - الرياض',
      salary: 26000,
      joinDate: '2023-03-12',
      status: 'active',
      email: 'n.aldakheel@al-asima.sa',
      phone: '+966 53 778 9012',
      nationalId: '1083920194',
      leavesBalance: 16,
      performanceRating: '93%'
    },
    {
      id: 'emp-008',
      code: 'EMP-1008',
      name: 'م. طلال بن عبدالعزيز الهذلول',
      avatar: 'ط',
      position: 'مهندس حلول برمجية أول',
      department: 'تقنية المعلومات والتحول الرقمي',
      branch: 'المقر الرئيسي - الرياض',
      salary: 24000,
      joinDate: '2023-06-01',
      status: 'active',
      email: 't.alhadhloul@al-asima.sa',
      phone: '+966 50 889 0123',
      nationalId: '1064829102',
      leavesBalance: 20,
      performanceRating: '91%'
    },
    {
      id: 'emp-009',
      code: 'EMP-1009',
      name: 'أ. هند بنت منصور الشهري',
      avatar: 'هـ',
      position: 'أخصائية أولى موارد بشرية',
      department: 'الموارد البشرية والعمليات',
      branch: 'المقر الرئيسي - الرياض',
      salary: 19000,
      joinDate: '2023-09-15',
      status: 'active',
      email: 'h.alshehri@al-asima.sa',
      phone: '+966 54 990 1234',
      nationalId: '1058392019',
      leavesBalance: 22,
      performanceRating: '95%'
    },
    {
      id: 'emp-010',
      code: 'EMP-1010',
      name: 'م. ياسر بن حامد الحربي',
      avatar: 'ي',
      position: 'مهندس مشاريع إنشائية مقيم',
      department: 'الهندسة وإدارة المشاريع',
      branch: 'فرع المنطقة الغربية - جدة',
      salary: 22000,
      joinDate: '2024-02-01',
      status: 'active',
      email: 'y.alharbi@al-asima.sa',
      phone: '+966 55 001 2345',
      nationalId: '1049281039',
      leavesBalance: 17,
      performanceRating: '89%'
    },
    {
      id: 'emp-011',
      code: 'EMP-1011',
      name: 'أ. لمى بنت خالد السبيعي',
      avatar: 'ل',
      position: 'محاسبة تكاليف وموازنات',
      department: 'الإدارة المالية والمحاسبة',
      branch: 'المقر الرئيسي - الرياض',
      salary: 17500,
      joinDate: '2024-05-10',
      status: 'active',
      email: 'l.alsobaie@al-asima.sa',
      phone: '+966 56 112 3450',
      nationalId: '1039281948',
      leavesBalance: 14,
      performanceRating: '90%'
    },
    {
      id: 'emp-012',
      code: 'EMP-1012',
      name: 'أ. ريان بن فهد الدوسري',
      avatar: 'ر',
      position: 'مسؤول علاقات كبار العملاء Key Accounts',
      department: 'المبيعات وتطوير الأعمال CRM',
      branch: 'فرع المنطقة الشرقية - الخبر',
      salary: 21000,
      joinDate: '2024-07-20',
      status: 'active',
      email: 'r.aldossari@al-asima.sa',
      phone: '+966 50 223 4561',
      nationalId: '1029384756',
      leavesBalance: 12,
      performanceRating: '92%'
    }
  ],

  // CRM Clients
  clients: [
    {
      id: 'cli-01',
      name: 'مجموعة مستشفيات الأمل الطبية',
      type: 'مؤسسي / رعاية صحية',
      contactPerson: 'د. وليد البواردي',
      email: 'w.albawardi@al-amal-med.sa',
      phone: '+966 11 480 2200',
      city: 'الرياض',
      status: 'active',
      accountManager: 'أ. عمر التميمي',
      contractValue: 3450000,
      activeProjects: 2,
      paidTotal: 2200000,
      dueTotal: 450000,
      rating: 5,
      pipelineStage: 'عقد ساري',
      notes: 'عميل استراتيجي لخدمات البنية السحابية وإدارة المستندات الطبية المشفرة.'
    },
    {
      id: 'cli-02',
      name: 'شركة الروابي للتطوير والاستثمار العقاري',
      type: 'مطور عقاري',
      contactPerson: 'م. بسام الشريف',
      email: 'b.alsharif@alrawabi-dev.sa',
      phone: '+966 12 690 8877',
      city: 'جدة',
      status: 'active',
      accountManager: 'أ. ريان الدوسري',
      contractValue: 5800000,
      activeProjects: 3,
      paidTotal: 4100000,
      dueTotal: 620000,
      rating: 5,
      pipelineStage: 'عقد ساري',
      notes: 'مشروع برج السحاب السكني ومشروع مجمع الروابي اللوجستي.'
    },
    {
      id: 'cli-03',
      name: 'أكاديمية المعرفة العالمية للتعليم',
      type: 'قطاع تعليمي خاص',
      contactPerson: 'أ. منيرة القحطاني',
      email: 'm.alqahtani@almarefa.edu.sa',
      phone: '+966 11 240 1155',
      city: 'الرياض',
      status: 'active',
      accountManager: 'أ. عمر التميمي',
      contractValue: 1200000,
      activeProjects: 1,
      paidTotal: 950000,
      dueTotal: 0,
      rating: 4,
      pipelineStage: 'عقد ساري',
      notes: 'توريد تراخيص الحوسبة ونظام تتبع الحضور الذكي للكوادر.'
    },
    {
      id: 'cli-04',
      name: 'مؤسسة الإنجاز للمقاولات والتشييد',
      type: 'مقاولات عامة',
      contactPerson: 'م. سالم باوزير',
      email: 'salem@alinjaz-sa.com',
      phone: '+966 13 850 4433',
      city: 'الدمام',
      status: 'pending',
      accountManager: 'أ. ريان الدوسري',
      contractValue: 2150000,
      activeProjects: 1,
      paidTotal: 800000,
      dueTotal: 350000,
      rating: 4,
      pipelineStage: 'تفاوض نهائي',
      notes: 'بصدد توقيع ملحق عقد لتغطية مشروع البنية التحتية لمدينة الطاقة.'
    },
    {
      id: 'cli-05',
      name: 'سلسلة فنادق الواحة والضيافة',
      type: 'فندقة وسياحة',
      contactPerson: 'أ. حاتم المرشد',
      email: 'h.almurshid@oasis-hotels.sa',
      phone: '+966 12 770 1290',
      city: 'مكة المكرمة',
      status: 'lead',
      accountManager: 'أ. عمر التميمي',
      contractValue: 850000,
      activeProjects: 0,
      paidTotal: 0,
      dueTotal: 0,
      rating: 3,
      pipelineStage: 'عرض سعر مقدم',
      notes: 'تم تقديم عرض أسعار لتطوير نظام نقاط البيع المركزي وتطبيق الولاء.'
    }
  ],

  // Procurement Suppliers
  suppliers: [
    {
      id: 'sup-01',
      name: 'شركة الحلول السحابية العالمية المحدودة',
      category: 'خوادم وبنية سحابية',
      cr: '1010394812',
      contact: 'م. يوسف النمر',
      phone: '+966 11 411 9900',
      email: 'sales@cloudsolutions.sa',
      balance: 145000,
      rating: 5,
      status: 'approved',
      terms: 'دفع خلال 30 يوم'
    },
    {
      id: 'sup-02',
      name: 'مؤسسة التوريدات المكتبية والتقنية الحديثة',
      category: 'أجهزة حاسوب وتجهيزات',
      cr: '1010582910',
      contact: 'أ. طارق الشيخ',
      phone: '+966 11 260 5511',
      email: 'info@modern-supplies.sa',
      balance: 42000,
      rating: 4,
      status: 'approved',
      terms: 'دفع خلال 15 يوم'
    },
    {
      id: 'sup-03',
      name: 'شركة المواد الإنشائية المتكاملة',
      category: 'مواد بناء وهندسة',
      cr: '2050192834',
      contact: 'م. إبراهيم فودة',
      phone: '+966 13 810 2299',
      email: 'supply@integrated-mat.sa',
      balance: 290000,
      rating: 5,
      status: 'approved',
      terms: 'دفع عند الاستلام 50% والباقي 30 يوم'
    },
    {
      id: 'sup-04',
      name: 'وكالة النخبة للدعاية والتسويق الرقمي',
      category: 'خدمات تسويق وإعلام',
      cr: '1010648291',
      contact: 'أ. هاني الجارالله',
      phone: '+966 11 499 1020',
      email: 'campaigns@nukhba-ads.sa',
      balance: 18500,
      rating: 4,
      status: 'approved',
      terms: 'دفع فوري'
    }
  ],

  // Sales Catalog (Products & Services)
  products: [
    { id: 'prd-01', code: 'SRV-ERP-ENT', name: 'ترخيص نظام ERP السحابي المتقدم للمؤسسات (سنوي)', type: 'خدمة برمجية SaaS', price: 120000, cost: 35000, tax: 15, stock: 999, category: 'تراخيص رقمية' },
    { id: 'prd-02', code: 'SRV-ARCH-CONS', name: 'استشارات هندسية وإشراف ميداني على المشاريع (شهري)', type: 'استشارة', price: 45000, cost: 20000, tax: 15, stock: 50, category: 'خدمات هندسية' },
    { id: 'prd-03', code: 'HW-SRV-RACK', name: 'خادم حوسبة مؤسسي Enterprise Rack Server 64-Core', type: 'منتج عتادي', price: 68000, cost: 49000, tax: 15, stock: 14, category: 'أجهزة وعقود عتاد' },
    { id: 'prd-04', code: 'SRV-CYBER-AUDIT', name: 'خدمة فحص الأمان السيبراني واختبار الاختراق', type: 'خدمة', price: 85000, cost: 30000, tax: 15, stock: 100, category: 'أمن سيبراني' },
    { id: 'prd-05', code: 'HW-LAPTOP-DEV', name: 'حاسوب محمول عالي الأداء للمطورين والمهندسين 32GB', type: 'منتج عتادي', price: 9200, cost: 7400, tax: 15, stock: 28, category: 'أجهزة وعقود عتاد' }
  ],

  // Sales Quotes
  quotes: [
    { id: 'QUO-2026-089', client: 'مجموعة مستشفيات الأمل الطبية', date: '2026-08-25', validUntil: '2026-09-25', subtotal: 350000, vat: 52500, total: 402500, status: 'مقبول', createdBy: 'أ. عمر التميمي' },
    { id: 'QUO-2026-090', client: 'سلسلة فنادق الواحة والضيافة', date: '2026-09-01', validUntil: '2026-10-01', subtotal: 740000, vat: 111000, total: 851000, status: 'قيد الانتظار', createdBy: 'أ. عمر التميمي' },
    { id: 'QUO-2026-091', client: 'شركة الروابي للتطوير والاستثمار العقاري', date: '2026-09-03', validUntil: '2026-10-03', subtotal: 1200000, vat: 180000, total: 1380000, status: 'مسودة', createdBy: 'أ. ريان الدوسري' }
  ],

  // Purchasing & Procurement
  purchases: [
    { id: 'PO-2026-044', supplier: 'شركة الحلول السحابية العالمية المحدودة', date: '2026-08-18', amount: 145000, vat: 21750, total: 166750, status: 'مستلم ومعتمد', prNumber: 'PR-1021', branch: 'المقر الرئيسي - الرياض' },
    { id: 'PO-2026-045', supplier: 'مؤسسة التوريدات المكتبية والتقنية الحديثة', date: '2026-08-29', amount: 92000, vat: 13800, total: 105800, status: 'بانتظار الشحن', prNumber: 'PR-1024', branch: 'المقر الرئيسي - الرياض' },
    { id: 'PO-2026-046', supplier: 'شركة المواد الإنشائية المتكاملة', date: '2026-09-02', amount: 290000, vat: 43500, total: 333500, status: 'طلب موافقة مالية', prNumber: 'PR-1029', branch: 'فرع جدة للأعمال' }
  ],

  // Projects Portfolio
  projects: [
    {
      id: 'prj-101',
      code: 'PRJ-MED-01',
      title: 'مشروع التحول الرقمي وحوكمة السجلات لمستشفيات الأمل',
      client: 'مجموعة مستشفيات الأمل الطبية',
      manager: 'م. فيصل المطيري',
      startDate: '2026-01-15',
      endDate: '2026-11-30',
      budget: 1850000,
      spent: 1240000,
      revenue: 1950000,
      progress: 74,
      status: 'in_progress',
      statusText: 'قيد التنفيذ',
      priority: 'عالية',
      teamCount: 9,
      tasksTotal: 28,
      tasksCompleted: 21,
      description: 'نشر البنية السحابية وربط فروع المستشفيات وأتمتة مسارات التحويل الطبي مع التشفير المؤسسي الكامل.'
    },
    {
      id: 'prj-102',
      code: 'PRJ-BLD-02',
      title: 'إشراف وأتمتة أنظمة برج السحاب السكني الذكي',
      client: 'شركة الروابي للتطوير والاستثمار العقاري',
      manager: 'م. ياسر الحربي',
      startDate: '2025-10-01',
      endDate: '2026-12-15',
      budget: 3200000,
      spent: 2180000,
      revenue: 3500000,
      progress: 68,
      status: 'in_progress',
      statusText: 'قيد التنفيذ',
      priority: 'عاجلة',
      teamCount: 14,
      tasksTotal: 42,
      tasksCompleted: 29,
      description: 'أعمال التجهيزات الكهروميكانيكية وأنظمة إدارة المباني الذكية BMS وإشراف السلامة الميداني.'
    },
    {
      id: 'prj-103',
      code: 'PRJ-EDU-03',
      title: 'منصة التعليم الرقمي ونظام الحضور الذكي لأكاديمية المعرفة',
      client: 'أكاديمية المعرفة العالمية للتعليم',
      manager: 'م. ماجد الرشيدي',
      startDate: '2026-03-01',
      endDate: '2026-09-15',
      budget: 950000,
      spent: 890000,
      revenue: 1100000,
      progress: 92,
      status: 'review',
      statusText: 'مرحلة التسليم النهائي',
      priority: 'متوسطة',
      teamCount: 6,
      tasksTotal: 19,
      tasksCompleted: 18,
      description: 'إطلاق النسخة التشغيلية وإتمام التدريب النهائي للكوادر الإدارية والتعليمية.'
    },
    {
      id: 'prj-104',
      code: 'PRJ-LOG-04',
      title: 'تطوير البنية اللوجستية وتتبع الشحنات بالذكاء الاصطناعي',
      client: 'مؤسسة الإنجاز للمقاولات والتشييد',
      manager: 'م. فيصل المطيري',
      startDate: '2026-06-01',
      endDate: '2027-02-28',
      budget: 1400000,
      spent: 310000,
      revenue: 1550000,
      progress: 26,
      status: 'in_progress',
      statusText: 'قيد التنفيذ',
      priority: 'متوسطة',
      teamCount: 7,
      tasksTotal: 34,
      tasksCompleted: 9,
      description: 'تكامل منظومة إنترنت الأشياء IoT لتتبع حركة المعدات الثقيلة والمخزون في مواقع العمل.'
    }
  ],

  // Tasks (Kanban)
  tasks: [
    {
      id: 'tsk-201',
      title: 'اعتماد اختبار الحمل للخوادم السحابية الجديدة',
      description: 'إجراء محاكاة ضغط لأكثر من 50,000 مستخدم متزامن للتأكد من زمن الاستجابة قبل التدشين.',
      column: 'in_progress',
      priority: 'urgent',
      priorityText: 'عاجل جداً',
      project: 'مشروع التحول الرقمي لمستشفيات الأمل',
      assignee: 'م. ماجد الرشيدي',
      avatar: 'م',
      dueDate: '2026-09-10',
      checklist: { done: 3, total: 4 },
      commentsCount: 5
    },
    {
      id: 'tsk-202',
      title: 'تسليم التقرير الجيوتقني للمرحلة الثالثة من برج السحاب',
      description: 'مراجعة نتائج فحص التربة وأساسات المصاعد مع المكتب الاستشاري المستقل.',
      column: 'in_progress',
      priority: 'high',
      priorityText: 'مرتفعة',
      project: 'برج السحاب السكني الذكي',
      assignee: 'م. ياسر الحربي',
      avatar: 'ي',
      dueDate: '2026-09-14',
      checklist: { done: 2, total: 2 },
      commentsCount: 2
    },
    {
      id: 'tsk-203',
      title: 'إعداد عقود الموردين السنوية وتحديث شروط الدفع',
      description: 'تضمين بنود الجزاءات والتأمين الإلزامي وفق معايير هيئة المشتريات الحكومية والمحلية.',
      column: 'new',
      priority: 'medium',
      priorityText: 'متوسطة',
      project: 'الإدارة العامة للمشتريات',
      assignee: 'أ. نورة الدخيل',
      avatar: 'ن',
      dueDate: '2026-09-20',
      checklist: { done: 0, total: 3 },
      commentsCount: 1
    },
    {
      id: 'tsk-204',
      title: 'إغلاق ومراجعة فواتير ضريبة القيمة المضافة لشهر أغسطس',
      description: 'مطابقة الفواتير مع إشعارات الخصم والإيداعات وإعداد الإقرار الربع سنوي لهيئة الزكاة.',
      column: 'review',
      priority: 'urgent',
      priorityText: 'عاجل جداً',
      project: 'الإدارة المالية',
      assignee: 'أ. لمى السبيعي',
      avatar: 'ل',
      dueDate: '2026-09-08',
      checklist: { done: 4, total: 4 },
      commentsCount: 7
    },
    {
      id: 'tsk-205',
      title: 'تدريب كوادر أكاديمية المعرفة على لوحة تحكم الحضور',
      description: 'تنظيم ورشة عمل تدريبية افتراضية مدتها 3 ساعات مع تسليم دليل المستخدم الرقمي.',
      column: 'completed',
      priority: 'low',
      priorityText: 'منخفضة',
      project: 'منصة التعليم الرقمي',
      assignee: 'م. طلال الهذلول',
      avatar: 'ط',
      dueDate: '2026-09-04',
      checklist: { done: 3, total: 3 },
      commentsCount: 4
    },
    {
      id: 'tsk-206',
      title: 'تحديث صلاحيات الموظفين الجدد على نظام ERP',
      description: 'ربط الحسابات بالأدوار الوظيفية المعتمدة وتفعيل التحقق الثنائي OTP.',
      column: 'completed',
      priority: 'medium',
      priorityText: 'متوسطة',
      project: 'الموارد البشرية وتقنية المعلومات',
      assignee: 'أ. هند الشهري',
      avatar: 'هـ',
      dueDate: '2026-09-02',
      checklist: { done: 5, total: 5 },
      commentsCount: 0
    },
    {
      id: 'tsk-207',
      title: 'صياغة العرض الفني النهائي لسلسلة فنادق الواحة',
      description: 'إرفاق جداول الكميات ودراسة العائد على الاستثمار ROI لتسريع الموافقة.',
      column: 'new',
      priority: 'high',
      priorityText: 'مرتفعة',
      project: 'المبيعات وتطوير الأعمال CRM',
      assignee: 'أ. عمر التميمي',
      avatar: 'ع',
      dueDate: '2026-09-12',
      checklist: { done: 1, total: 3 },
      commentsCount: 3
    }
  ],

  // Contracts
  contracts: [
    {
      id: 'CNT-2026-001',
      title: 'عقد تقديم خدمات التحول الرقمي وحفظ السجلات الطبية',
      party: 'مجموعة مستشفيات الأمل الطبية',
      type: 'عقد عميل',
      startDate: '2026-01-15',
      endDate: '2027-01-14',
      value: 3450000,
      paidAmount: 2200000,
      remaining: 1250000,
      status: 'active',
      statusText: 'ساري',
      expiresInDays: 130,
      manager: 'أ. عمر التميمي'
    },
    {
      id: 'CNT-2026-002',
      title: 'عقد إشراف كهروميكانيكي وهندسي لبرج السحاب',
      party: 'شركة الروابي للتطوير والاستثمار العقاري',
      type: 'عقد عميل',
      startDate: '2025-10-01',
      endDate: '2026-10-01',
      value: 5800000,
      paidAmount: 4100000,
      remaining: 1700000,
      status: 'warning',
      statusText: 'ينتهي قريباً (أقل من 30 يوماً)',
      expiresInDays: 25,
      manager: 'م. فيصل المطيري'
    },
    {
      id: 'CNT-2026-003',
      title: 'عقد استضافة وحوسبة سحابية مخصصة Tier-4',
      party: 'شركة الحلول السحابية العالمية المحدودة',
      type: 'عقد مورد',
      startDate: '2026-02-01',
      endDate: '2027-01-31',
      value: 480000,
      paidAmount: 240000,
      remaining: 240000,
      status: 'active',
      statusText: 'ساري',
      expiresInDays: 147,
      manager: 'م. ماجد الرشيدي'
    },
    {
      id: 'CNT-2026-004',
      title: 'عقد إيجار مقر المقر الرئيسي - برج النخبة بالرياض',
      party: 'شركة النخبة لإدارة الأبراج التجارية',
      type: 'عقد تشغيل وإيجار',
      startDate: '2025-10-05',
      endDate: '2026-10-04',
      value: 650000,
      paidAmount: 650000,
      remaining: 0,
      status: 'warning',
      statusText: 'ينتهي قريباً (أقل من 30 يوماً)',
      expiresInDays: 28,
      manager: 'أ. عبدالله القحطاني'
    }
  ],

  // Invoices & Billing
  invoices: [
    {
      id: 'INV-2026-0081',
      client: 'مجموعة مستشفيات الأمل الطبية',
      issueDate: '2026-08-01',
      dueDate: '2026-08-31',
      amount: 450000,
      vat: 67500,
      total: 517500,
      status: 'overdue',
      statusText: 'متأخرة السداد',
      project: 'مشروع التحول الرقمي لمستشفيات الأمل',
      notes: 'الدفعة الثالثة من أعمال تدشين الخوادم المركزية.'
    },
    {
      id: 'INV-2026-0082',
      client: 'شركة الروابي للتطوير العقاري',
      issueDate: '2026-08-15',
      dueDate: '2026-09-15',
      amount: 620000,
      vat: 93000,
      total: 713000,
      status: 'sent',
      statusText: 'مستحقة قريباً',
      project: 'برج السحاب السكني الذكي',
      notes: 'دفعة استحقاق إنجاز 65% من أعمال التمديدات الذكية.'
    },
    {
      id: 'INV-2026-0083',
      client: 'أكاديمية المعرفة العالمية للتعليم',
      issueDate: '2026-08-20',
      dueDate: '2026-09-04',
      amount: 180000,
      vat: 27000,
      total: 207000,
      status: 'paid',
      statusText: 'مدفوعة بالكامل',
      project: 'منصة التعليم الرقمي',
      notes: 'تم السداد عبر تحويل بنكي سريع على مصرف الإنماء.'
    },
    {
      id: 'INV-2026-0084',
      client: 'مؤسسة الإنجاز للمقاولات والتشييد',
      issueDate: '2026-08-28',
      dueDate: '2026-09-28',
      amount: 350000,
      vat: 52500,
      total: 402500,
      status: 'partially_paid',
      statusText: 'مدفوعة جزئياً (50%)',
      project: 'تطوير البنية اللوجستية',
      notes: 'تم سداد 201,250 ريال ومتبقي 201,250 ريال.'
    },
    {
      id: 'INV-2026-0085',
      client: 'سلسلة فنادق الواحة والضيافة',
      issueDate: '2026-09-02',
      dueDate: '2026-10-02',
      amount: 220000,
      vat: 33000,
      total: 253000,
      status: 'draft',
      statusText: 'مسودة',
      project: 'تطوير نقاط البيع',
      notes: 'بانتظار اعتماد مدير المبيعات لإرسالها للعميل.'
    }
  ],

  // Expenses
  expenses: [
    { id: 'EXP-1091', title: 'مسير رواتب موظفي المقر الرئيسي (أغسطس)', category: 'رواتب وأجور', amount: 385000, date: '2026-08-27', paymentMethod: 'تحويل سريع نظام WPS', status: 'معتمد ومدفوع', branch: 'المقر الرئيسي - الرياض' },
    { id: 'EXP-1092', title: 'فواتير خوادم الحوسبة السحابية AWS & Azure', category: 'تقنية وبنية تحتية', amount: 48500, date: '2026-08-30', paymentMethod: 'بطاقة ائتمان مؤسسية', status: 'معتمد ومدفوع', branch: 'المقر الرئيسي - الرياض' },
    { id: 'EXP-1093', title: 'حملة إعلانات رقمية للربع الثالث Q3', category: 'تسويق وإعلان', amount: 35000, date: '2026-09-01', paymentMethod: 'تحويل بنكي', status: 'معتمد ومدفوع', branch: 'فرع جدة للأعمال' },
    { id: 'EXP-1094', title: 'صيانة دورية وتأمين أسطول مركبات الموقع الهندسية', category: 'تشغيل وصيانة', amount: 18400, date: '2026-09-02', paymentMethod: 'شيك بنكي', status: 'معتمد ومدفوع', branch: 'المقر الرئيسي - الرياض' },
    { id: 'EXP-1095', title: 'شراء أجهزة لابتوب حديثة للمهندسين الجدد', category: 'أصول ومعدات', amount: 46000, date: '2026-09-03', paymentMethod: 'تحويل بنكي', status: 'طلب صرف معلق', branch: 'المقر الرئيسي - الرياض' }
  ],

  // Inventory & Fixed Assets
  inventory: [
    { id: 'INV-ITM-01', code: 'ITM-9921', name: 'أجهزة توجيه شبكات مؤسسية Cisco Enterprise Router', category: 'شبكات واتصالات', warehouse: 'مستودع الرياض الرئيسي', qty: 18, reorderLevel: 5, unitPrice: 8400, status: 'متوفر' },
    { id: 'INV-ITM-02', code: 'ITM-8812', name: 'كابلات ألياف ضوئية فائقة السرعة بكرات 500m', category: 'بنية تحتية', warehouse: 'مستودع جدة اللوجستي', qty: 4, reorderLevel: 8, unitPrice: 3200, status: 'تنبيه نقص المخزون' },
    { id: 'INV-ITM-03', code: 'ITM-7734', name: 'حساسات إنترنت الأشياء IoT لقياس التدفق والرطوبة', category: 'أجهزة استشعار', warehouse: 'مستودع الرياض الرئيسي', qty: 160, reorderLevel: 30, unitPrice: 450, status: 'متوفر' }
  ],
  assets: [
    { id: 'AST-01', code: 'AST-CAR-101', name: 'سيارة تويوتا لاندكروزر مهام ميدانية', category: 'مركبات وأسطول', purchaseDate: '2023-05-10', cost: 285000, currentValue: 195000, custodian: 'م. فيصل المطيري', location: 'المقر الرئيسي - الرياض', status: 'نشط ويعمل' },
    { id: 'AST-02', code: 'AST-SRV-202', name: 'حاوية خوادم مبردة Data Center Rack HP', category: 'معدات تقنية', purchaseDate: '2024-01-15', cost: 140000, currentValue: 105000, custodian: 'م. ماجد الرشيدي', location: 'مركز البيانات - الرياض', status: 'نشط ويعمل' },
    { id: 'AST-03', code: 'AST-DRN-303', name: 'طائرة درون مسح هندسي ومطابقة مساحية', category: 'أجهزة مساحة', purchaseDate: '2024-08-01', cost: 52000, currentValue: 48000, custodian: 'م. ياسر الحربي', location: 'فرع جدة للأعمال', status: 'نشط ويعمل' }
  ],

  // Attendance & Leaves
  attendanceSummary: {
    todayTotalStaff: 148,
    presentCount: 139,
    lateCount: 4,
    onLeaveCount: 5,
    attendanceRate: '96.2%'
  },
  leaves: [
    { id: 'LEV-01', employee: 'م. فيصل بن عبدالرحمن المطيري', type: 'إجازة سنوية اعتيادية', startDate: '2026-09-18', endDate: '2026-09-25', days: 6, status: 'approved', approvedBy: 'م. خالد الغامدي' },
    { id: 'LEV-02', employee: 'أ. لمى بنت خالد السبيعي', type: 'إجازة اضطرارية', startDate: '2026-09-08', endDate: '2026-09-09', days: 2, status: 'pending', approvedBy: 'أ. عبدالله القحطاني' },
    { id: 'LEV-03', employee: 'أ. ريان بن فهد الدوسري', type: 'إجازة سنوية اعتيادية', startDate: '2026-10-01', endDate: '2026-10-15', days: 12, status: 'pending', approvedBy: 'أ. عمر التميمي' }
  ],

  // Documents & Folders
  documents: [
    { id: 'doc-01', name: 'السجل_التجاري_الموحد_2026.pdf', folder: 'المستندات القانونية', size: '2.4 MB', updatedAt: '2026-01-10', uploader: 'أ. سارة العتيبي' },
    { id: 'doc-02', name: 'شهادة_الرقم_الضريبي_ZATCA.pdf', folder: 'المالية والفواتير', size: '1.1 MB', updatedAt: '2026-01-12', uploader: 'أ. عبدالله القحطاني' },
    { id: 'doc-03', name: 'المخططات_المعمارية_لبرج_السحاب_V4.dwg', folder: 'المشاريع الهندسية', size: '48.6 MB', updatedAt: '2026-08-28', uploader: 'م. ياسر الحربي' },
    { id: 'doc-04', name: 'دليل_سياسات_الموارد_البشرية_واللائحة_الداخلية.pdf', folder: 'الموظفون والموارد البشرية', size: '4.8 MB', updatedAt: '2026-03-01', uploader: 'أ. سارة العتيبي' },
    { id: 'doc-05', name: 'عقد_مستشفيات_الأمل_الموقع_رسمياً.pdf', folder: 'العقود والاتفاقيات', size: '3.5 MB', updatedAt: '2026-01-20', uploader: 'أ. عمر التميمي' }
  ],

  // Meetings
  meetings: [
    {
      id: 'mtg-01',
      title: 'الاجتماع الدوري للجنة التنفيذية ومراجعة مؤشرات Q3',
      date: '2026-09-07',
      time: '10:00 ص - 11:30 ص',
      location: 'قاعة الاجتماعات الرئيسية (الدور 18) + رابط Teams',
      chair: 'م. خالد الغامدي',
      attendees: ['أ. عبدالله القحطاني', 'أ. سارة العتيبي', 'م. فيصل المطيري', 'أ. عمر التميمي'],
      agenda: '1. استعراض التدفقات النقدية 2. إنجاز مشاريع الربع الثالث 3. خطة التوظيف الجديدة',
      status: 'scheduled'
    },
    {
      id: 'mtg-02',
      title: 'ورشة عمل فنية: اعتماد منصة السجلات لمستشفيات الأمل',
      date: '2026-09-09',
      time: '01:30 م - 03:00 م',
      location: 'مقر العميل - مستشفى الأمل',
      chair: 'م. ماجد الرشيدي',
      attendees: ['م. فيصل المطيري', 'د. وليد البواردي', 'م. طلال الهذلول'],
      agenda: 'مطابقة خطة الطوارئ والتوافق مع متطلبات المركز الوطني للمعلومات الصحية.',
      status: 'scheduled'
    }
  ],

  // Notifications Center
  notifications: [
    { id: 'notif-01', title: 'فاتورة متأخرة السداد', text: 'تجاوزت فاتورة مستشفيات الأمل INV-2026-0081 موعد الاستحقاق بـ 6 أيام بمبلغ 517,500 ر.س.', type: 'danger', icon: 'alert-triangle', time: 'منذ ساعتين', unread: true, linkView: 'invoices' },
    { id: 'notif-02', title: 'طلب موافقة شراء معلق', text: 'قام قسم الهندسة بطلب شراء تجهيزات شبكية بمبلغ 43,500 ر.س بانتظار اعتماد المدير المالي.', type: 'warning', icon: 'clock', time: 'منذ 4 ساعات', unread: true, linkView: 'approvals' },
    { id: 'notif-03', title: 'تنبيه انتهاء عقد خلال 25 يوماً', text: 'عقد إشراف برج السحاب CNT-2026-002 بحاجة لمراجعة التجديد أو إصدار ملحق جديد.', type: 'info', icon: 'file-text', time: 'منذ يوم', unread: true, linkView: 'contracts' },
    { id: 'notif-04', title: 'اكتمال تسليم مهمة مشروع', text: 'أتم م. طلال الهذلول مهمة تدريب الكوادر لمنصة التعليم الرقمي.', type: 'success', icon: 'check-circle', time: 'منذ يومين', unread: false, linkView: 'tasks' }
  ],

  // Approvals Workflow
  approvals: [
    {
      id: 'APP-501',
      title: 'طلب شراء خوادم وتجهيزات أمن سيبراني',
      requester: 'م. ماجد الرشيدي',
      department: 'تقنية المعلومات',
      amount: 48500,
      date: '2026-09-05',
      type: 'طلب شراء PO',
      currentStage: 'بانتظار اعتماد المدير المالي',
      stageIndex: 2,
      stages: ['المدير المباشر (معتمد)', 'المدير المالي (قيد الانتظار)', 'المدير العام'],
      status: 'pending'
    },
    {
      id: 'APP-502',
      title: 'طلب إجازة اضطرارية',
      requester: 'أ. لمى السبيعي',
      department: 'المالية',
      amount: 0,
      date: '2026-09-06',
      type: 'إجازة موظف',
      currentStage: 'بانتظار اعتماد مدير الإدارة',
      stageIndex: 1,
      stages: ['مدير الإدارة (قيد الانتظار)', 'الموارد البشرية'],
      status: 'pending'
    },
    {
      id: 'APP-503',
      title: 'اعتماد سلفة تمويل مشروع برج السحاب',
      requester: 'م. ياسر الحربي',
      department: 'الهندسة والمشاريع',
      amount: 150000,
      date: '2026-09-04',
      type: 'سلفة مالية عاجلة',
      currentStage: 'معتمد نهائياً',
      stageIndex: 3,
      stages: ['مدير المشروع (معتمد)', 'المدير المالي (معتمد)', 'الرئيس التنفيذي (معتمد)'],
      status: 'approved'
    }
  ],

  // Permission Matrix for 7 Roles
  roles: [
    { key: 'super_admin', name: 'Super Admin', desc: 'صلاحيات مطلقة على كافة الشركات والفروع والمستخدمين والإعدادات.' },
    { key: 'ceo', name: 'الرئيس التنفيذي CEO', desc: 'اطلاع كامل على التقارير المالية والتشغيلية واعتماد أعلى المستويات.' },
    { key: 'finance_manager', name: 'المدير المالي CFO', desc: 'إدارة الفواتير والمدفوعات والمصروفات والتقارير المالية والرواتب.' },
    { key: 'hr_manager', name: 'مدير الموارد البشرية', desc: 'إدارة ملفات الموظفين والحضور والرواتب والإجازات والتقييم.' },
    { key: 'sales_manager', name: 'مدير المبيعات والعقود', desc: 'إدارة العملاء CRM والعروض والصفقات ومتابعة الفواتير والتحصيل.' },
    { key: 'project_manager', name: 'مدير المشاريع والهندسة', desc: 'إدارة المشاريع والمهام والفرق الهندسية وتتبع الميزانيات المخصصة.' },
    { key: 'employee', name: 'الموظف / مستخدم عام', desc: 'الوصول لمهامه الشخصية، الحضور، الإجازات، والطلبات الإدارية.' }
  ],

  permissionModules: [
    { name: 'لوحة التحكم والبيانات الإحصائية', key: 'dashboard' },
    { name: 'إدارة الشركة والفروع والمقرات', key: 'companies' },
    { name: 'الموظفون والموارد البشرية HR', key: 'hr' },
    { name: 'العملاء وإدارة العلاقات CRM', key: 'crm' },
    { name: 'المبيعات وعروض الأسعار', key: 'sales' },
    { name: 'المشتريات والموردون', key: 'purchases' },
    { name: 'المشاريع الهندسية وإدارة المحافظ', key: 'projects' },
    { name: 'المهام وكانبان وإسناد العمل', key: 'tasks' },
    { name: 'العقود والاتفاقيات القانونية', key: 'contracts' },
    { name: 'المالية والفواتير والتحصيل', key: 'finance' },
    { name: 'المصروفات والميزانيات التشغيلية', key: 'expenses' },
    { name: 'المخزون ومستودعات الأصول', key: 'inventory' },
    { name: 'مسارات وتدفقات الاعتماد والموافقات', key: 'approvals' },
    { name: 'إدارة المستخدمين والأدوار والصلاحيات', key: 'users' },
    { name: 'إعدادات النظام والنسخ الاحتياطي', key: 'settings' }
  ],

  // System Settings
  settings: {
    systemName: 'منصة العاصمة المؤسسية للإدارة السحابية',
    version: '3.4.0-Enterprise',
    defaultCurrency: 'SAR (ريال سعودي)',
    vatRate: 15,
    timezone: 'Asia/Riyadh (GMT+3)',
    autoBackupDaily: true,
    enforce2FA: true,
    wpsIntegration: true,
    zatcaEInvoicePhase: 'المرحلة الثانية - الربط والتكامل'
  }
};
