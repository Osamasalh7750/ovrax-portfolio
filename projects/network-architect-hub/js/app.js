/**
 * NetworkArchitect Hub - Main Application Controller
 * Orchestrates views, state transitions, interactive controls, and UI binding.
 */

const App = {
  activeView: "topology",
  activeModuleId: 1,
  activeHardwareFilter: "all",
  topologyInstance: null,

  init() {
    this.bindNavigation();
    this.switchView(this.activeView);
    this.bindSearch();
    this.bindCalculators();
    this.bindScriptGenerator();

    console.log("NetworkArchitect Hub initialized successfully in Static Offline Mode.");
  },

  // View Switcher
  switchView(viewName) {
    this.activeView = viewName;
    
    // Update nav tabs active state
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      if (btn.dataset.view === viewName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Hide all view containers
    document.querySelectorAll('.app-view-panel').forEach(panel => {
      panel.style.display = 'none';
    });

    // Show target view
    const target = document.getElementById(`view-${viewName}`);
    if (target) {
      target.style.display = 'block';
    }

    // View specific lifecycle
    if (viewName === "topology") {
      if (!this.topologyInstance) {
        this.topologyInstance = new TopologyEngine("topology-canvas");
      }
    } else if (viewName === "simulators") {
      Simulators.renderWinbox("winbox-container");
      Simulators.renderAiros("airos-container");
    } else if (viewName === "troubleshooter") {
      Troubleshooter.renderLab("troubleshooter-container");
    } else if (viewName === "modules") {
      this.renderModulesView();
    } else if (viewName === "hardware") {
      this.renderHardwareCatalog();
    } else if (viewName === "deployment") {
      this.renderGeographicDeployment();
    }
  },

  bindNavigation() {
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.switchView(btn.dataset.view);
      });
    });
  },

  // NEW REDESIGNED Educational Modules View (Stunning UI, Stepper, Wiring Schemes, Pitfalls)
  renderModulesView() {
    const container = document.getElementById('modules-container');
    if (!container) return;

    const currentModule = NETWORK_DATA.modules.find(m => m.id === this.activeModuleId) || NETWORK_DATA.modules[0];

    container.innerHTML = `
      <div class="edu-module-portal">
        <!-- Modern Visual Progress Stepper -->
        <div class="edu-stepper-container mb-6">
          <div class="edu-stepper-track">
            ${NETWORK_DATA.modules.map(mod => `
              <div class="edu-step-node ${mod.id === this.activeModuleId ? 'active' : (mod.id < this.activeModuleId ? 'completed' : '')}" onclick="App.selectModule(${mod.id})">
                <div class="edu-step-circle">
                  ${mod.id < this.activeModuleId ? '✓' : mod.icon}
                </div>
                <div class="edu-step-label">
                  <span class="edu-step-tag">${mod.tag}</span>
                  <span class="edu-step-name">${mod.title.split('(')[0]}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Module Header Hero Banner -->
        <div class="edu-hero-banner mb-6">
          <div class="edu-hero-content">
            <div class="flex items-center gap-2 mb-2">
              <span class="edu-hero-badge">${currentModule.tag}</span>
              <span class="text-xs text-slate-400 font-mono">⏱️ مدة الجلسة المقترحة: ${currentModule.duration}</span>
            </div>
            <h1 class="edu-hero-title">${currentModule.title}</h1>
            <p class="edu-hero-subtitle">${currentModule.subtitle}</p>
          </div>
          <div class="edu-hero-icon-visual">
            <span class="text-5xl opacity-80">${currentModule.icon}</span>
          </div>
        </div>

        <!-- Specific Visual Engineering Diagrams per Module -->
        ${this.renderModuleVisualWidget(currentModule.id)}

        <!-- Sections Container -->
        <div class="space-y-8">
          ${currentModule.sections.map((sec, idx) => `
            <div class="edu-section-card">
              <!-- Section Header with Number Badge -->
              <div class="edu-section-header">
                <div class="edu-section-badge-num">${idx + 1}</div>
                <h3 class="edu-section-title">${sec.heading}</h3>
              </div>

              <!-- Content Grid: "لماذا" مقابل "كيف نطبق" -->
              <div class="edu-section-body-grid">
                <!-- Why Box (الأساس العلمي والهندسي) -->
                <div class="edu-callout-why">
                  <div class="edu-callout-header text-amber-400">
                    <span class="text-lg">💡</span>
                    <h4>الأساس العلمي والهندسي (لماذا نختار هذا الإجراء؟)</h4>
                  </div>
                  <div class="edu-callout-content">
                    <p class="text-xs leading-relaxed text-slate-300">${sec.whyContent}</p>
                  </div>
                </div>

                <!-- How Box (خطوات التنفيذ والربط الميداني) -->
                <div class="edu-callout-how">
                  <div class="edu-callout-header text-cyan-400">
                    <span class="text-lg">⚙️</span>
                    <h4>طريقة التنفيذ والربط العملي (كيف نطبق ذلك ميدانياً؟)</h4>
                  </div>
                  <div class="edu-callout-content">
                    <p class="text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">${sec.howContent}</p>
                  </div>
                </div>
              </div>

              <!-- Standards & Key Points -->
              <div class="edu-keypoints-box mt-4">
                <h5 class="edu-keypoints-title">القواعد والمعايير القياسية المعتمدة:</h5>
                <div class="edu-keypoints-grid">
                  ${sec.keyPoints.map(kp => `
                    <div class="edu-kp-item">
                      <span class="edu-kp-check">✔</span>
                      <span class="edu-kp-text">${kp}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Module Navigation Footer (Next / Previous) -->
        <div class="edu-footer-nav mt-8 pt-6 border-t border-slate-800 flex justify-between items-center">
          ${currentModule.id > 1 ? `
            <button class="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all" onclick="App.selectModule(${currentModule.id - 1})">
              &larr; الوحدة السابقة (${NETWORK_DATA.modules[currentModule.id - 2].tag})
            </button>
          ` : `<div></div>`}

          ${currentModule.id < NETWORK_DATA.modules.length ? `
            <button class="px-6 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-900/40 transition-all" onclick="App.selectModule(${currentModule.id + 1})">
              الوحدة التالية (${NETWORK_DATA.modules[currentModule.id].tag}) &rarr;
            </button>
          ` : `
            <button class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold" onclick="App.switchView('deployment')">
              الانتقال إلى خطة النشر الجغرافي للمواقع 🗺️ &rarr;
            </button>
          `}
        </div>
      </div>
    `;
  },

  // Helper: Visual Widgets & Wiring Diagrams inside Modules
  renderModuleVisualWidget(moduleId) {
    if (moduleId === 1) {
      return `
        <div class="edu-visual-widget mb-6 p-5 bg-slate-900/90 border border-slate-700/80 rounded-2xl">
          <h4 class="text-xs font-bold text-white mb-3 flex items-center gap-2">
            <span>🔌</span> مخطط المسار الفيزيائي للتوصيل وأنظمة الطاقة (Cabling & Power Flow)
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-2xs text-center">
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span class="text-cyan-400 font-bold block mb-1">1. مودم المزود (ONT)</span>
              <span class="text-slate-400">وضع Bridge Mode</span>
              <div class="mt-2 text-amber-400 font-mono text-3xs">كابل CAT6 UTP قصير</div>
            </div>
            <div class="p-3 bg-slate-950 rounded-xl border border-cyan-800/60 bg-cyan-950/20">
              <span class="text-cyan-300 font-bold block mb-1">2. راوتر ميكروتك CCR</span>
              <span class="text-slate-300">Public IP + NAT + VLANs</span>
              <div class="mt-2 text-cyan-400 font-mono text-3xs">SFP+ 10G Trunk Uplink</div>
            </div>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span class="text-purple-300 font-bold block mb-1">3. سويتش التوزيع المدار</span>
              <span class="text-slate-400">تقسيم الـ VLANs + PoE Out</span>
              <div class="mt-2 text-emerald-400 font-mono text-3xs">ToughCable CAT6 STP</div>
            </div>
            <div class="p-3 bg-slate-950 rounded-xl border border-amber-800/60 bg-amber-950/20">
              <span class="text-amber-400 font-bold block mb-1">4. هوائي البرج (ubnt)</span>
              <span class="text-slate-300">محاقن تأريض ETH-SP-G2 + 24V</span>
              <div class="mt-2 text-green-400 font-mono text-3xs">بث هوائي في الأثير 5GHz</div>
            </div>
          </div>
        </div>
      `;
    } else if (moduleId === 3) {
      return `
        <div class="edu-visual-widget mb-6 p-5 bg-slate-900/90 border border-slate-700/80 rounded-2xl">
          <div class="flex justify-between items-center mb-3">
            <h4 class="text-xs font-bold text-white flex items-center gap-2">
              <span>📡</span> محاكاة خط الرؤية (LOS) وخلو منطقة فرينل الأولى (Fresnel Clearance)
            </h4>
            <span class="text-2xs font-mono text-cyan-400">معادلة ITU-R: r1 = 8.656 * sqrt(d/f)</span>
          </div>
          <img src="assets/svg/fresnel-diagram.svg" alt="Fresnel Diagram" class="w-full rounded-xl border border-slate-800 mb-3">
          <div class="grid grid-cols-3 gap-3 text-2xs">
            <div class="p-2 bg-slate-950 rounded border border-slate-800 text-center">
              <span class="text-slate-400 block">الإشارة المثالية</span>
              <strong class="text-emerald-400 font-mono">-50 dBm إلى -65 dBm</strong>
            </div>
            <div class="p-2 bg-slate-950 rounded border border-slate-800 text-center">
              <span class="text-slate-400 block">أرضية الضجيج (Noise Floor)</span>
              <strong class="text-cyan-400 font-mono">-98 dBm إلى -102 dBm</strong>
            </div>
            <div class="p-2 bg-slate-950 rounded border border-slate-800 text-center">
              <span class="text-slate-400 block">جودة الحزم (Transmit CCQ)</span>
              <strong class="text-green-400 font-mono">&gt; 98% (ممتاز)</strong>
            </div>
          </div>
        </div>
      `;
    } else if (moduleId === 4) {
      return `
        <div class="edu-visual-widget mb-6 p-5 bg-slate-900/90 border border-rose-900/50 rounded-2xl bg-rose-950/10">
          <h4 class="text-xs font-bold text-rose-300 mb-2 flex items-center gap-2">
            <span>⚠️</span> تحذير هندسي حاسم: تجنب كارثة الـ Rogue DHCP Server في المودمات المنزلية
          </h4>
          <p class="text-xs text-slate-300 leading-relaxed mb-3">
            عند إضافة أي راوتر منزلي (TP-Link, D-Link, Netis, Tenda) في مكاتب الشركة، <strong>يجب إلزامياً تعطيل خادم DHCP</strong> وتوصيل الكابل في منفذ <strong>LAN</strong> وليس منفذ WAN، لمنع الراوتر من توزيع بوابات عشوائية تشل اتصال الشبكة.
          </p>
          <div class="wb-table-wrapper">
            <table class="wb-table text-3xs">
              <thead>
                <tr><th>الشركة المصنعة</th><th>عنوان IP الإدارة الافتراضي</th><th>الوضع المطلوب تفعيله</th><th>الخطوة الإلزامية</th><th>المنفذ المستخدم</th></tr>
              </thead>
              <tbody>
                <tr><td class="font-bold text-cyan-400">TP-Link</td><td class="font-mono">192.168.0.1</td><td>Access Point Mode</td><td>Network -> DHCP -> Disable</td><td class="text-emerald-400 font-bold">LAN Port (أصفر)</td></tr>
                <tr><td class="font-bold text-blue-400">D-Link</td><td class="font-mono">192.168.0.1</td><td>Bridge / AP Mode</td><td>Setup -> Network -> DHCP Server: Uncheck</td><td class="text-emerald-400 font-bold">LAN Port</td></tr>
                <tr><td class="font-bold text-amber-400">Netis</td><td class="font-mono">192.168.1.1</td><td>AP Mode / Client</td><td>Network -> LAN -> DHCP: Off</td><td class="text-emerald-400 font-bold">LAN Port</td></tr>
                <tr><td class="font-bold text-orange-400">Tenda</td><td class="font-mono">192.168.0.1</td><td>AP Mode</td><td>Administration -> Disable DHCP</td><td class="text-emerald-400 font-bold">LAN Port</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }
    return '';
  },

  selectModule(id) {
    this.activeModuleId = id;
    this.renderModulesView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  // NEW Geographic Multi-Site Rollout Plan View
  renderGeographicDeployment() {
    const container = document.getElementById('deployment-container');
    if (!container) return;

    const { geographicPlan } = NETWORK_DATA;
    const { masterTower, sites } = geographicPlan;

    container.innerHTML = `
      <div class="geo-deployment-portal">
        <!-- Header -->
        <div class="mb-6">
          <div class="flex items-center gap-2 mb-2">
            <span class="px-2.5 py-1 rounded text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">خطة التوزيع الميداني المؤسسي</span>
            <span class="text-xs text-slate-400">5 مواقع جغرافية متباعدة + العمالة الميدانية</span>
          </div>
          <h2 class="text-2xl font-black text-white mb-1">${geographicPlan.title}</h2>
          <p class="text-xs text-slate-300">${geographicPlan.description}</p>
        </div>

        <!-- Master Tower Card -->
        <div class="p-6 bg-gradient-to-l from-slate-900 via-slate-900 to-amber-950/30 border border-amber-600/40 rounded-2xl mb-8 shadow-2xl">
          <div class="flex justify-between items-start flex-wrap gap-4 mb-4">
            <div>
              <span class="text-2xs font-bold text-amber-400 uppercase font-mono tracking-wider">نواة المنظومة المركزية (MASTER BASE STATION)</span>
              <h3 class="text-xl font-bold text-white flex items-center gap-2 mt-1">
                <span>🗼</span> ${masterTower.site} - ${masterTower.height}
              </h3>
            </div>
            <div class="text-left direction-ltr">
              <span class="px-3 py-1 bg-amber-950/80 border border-amber-700 text-amber-300 text-xs font-mono rounded-lg block mb-1">
                ${masterTower.coordinates}
              </span>
              <span class="text-2xs text-slate-400 font-mono">Backbone: ${masterTower.backboneInternet}</span>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-4">
            <div class="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
              <strong class="text-amber-300 block mb-2">عتاد المقر الرئيسي وأجهزة البث:</strong>
              <ul class="space-y-1.5 text-2xs text-slate-300">
                ${masterTower.equipment.map(eq => `<li class="flex items-start gap-1.5"><span class="text-amber-400">▪</span><span>${eq}</span></li>`).join('')}
              </ul>
            </div>
            <div class="p-4 bg-slate-950/80 rounded-xl border border-slate-800">
              <strong class="text-cyan-300 block mb-2">توزيع قنوات التردد لمنع التداخل (RF Channels Allocation):</strong>
              <div class="space-y-2 text-2xs text-slate-300">
                <div class="flex justify-between p-1.5 bg-slate-900 rounded border border-slate-800">
                  <span>بث السيكتور 120° (الفروع والأكشاك):</span>
                  <strong class="text-cyan-400 font-mono">5785 MHz (40MHz Width)</strong>
                </div>
                <div class="flex justify-between p-1.5 bg-slate-900 rounded border border-slate-800">
                  <span>رابط الصحن المباشر للمصنع 18km:</span>
                  <strong class="text-emerald-400 font-mono">5500 MHz [DFS Clean Band]</strong>
                </div>
                <div class="flex justify-between p-1.5 bg-slate-900 rounded border border-slate-800">
                  <span>رابط المستودع المركزي 12km:</span>
                  <strong class="text-purple-400 font-mono">5240 MHz [UNII-1]</strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Geographic Sites Grid -->
        <h3 class="text-base font-bold text-white mb-4 flex items-center gap-2">
          <span>🏢</span> قائمة المواقع والفروع وعتاد التوصيل الميداني:
        </h3>

        <div class="space-y-6">
          ${sites.map((site, index) => `
            <div class="site-deployment-card p-6 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-xl hover:border-cyan-500/50 transition-all">
              <div class="flex justify-between items-start flex-wrap gap-3 mb-4 pb-3 border-b border-slate-800">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <span class="w-6 h-6 rounded-full bg-cyan-900 text-cyan-300 font-bold text-xs flex items-center justify-center">${index + 1}</span>
                    <h4 class="text-base font-bold text-white">${site.name}</h4>
                  </div>
                  <span class="text-xs text-amber-400 font-mono">المسافة من البرج: ${site.distance} • ${site.losStatus}</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-mono text-xs font-bold">
                    الإشارة: ${site.targetSignal}
                  </span>
                  <span class="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-xs font-bold">
                    السعة: ${site.bandwidthAllocated}
                  </span>
                </div>
              </div>

              <!-- Specs Columns -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-4">
                <!-- Column 1: CPE Receiver -->
                <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div class="flex items-center gap-1.5 text-amber-400 font-bold text-2xs mb-2">
                    <span>📡</span> لاقط الاستقبال الهوائي (CPE / Receiver)
                  </div>
                  <strong class="text-white text-xs block mb-1">${site.cpeReceiver.brand} - ${site.cpeReceiver.model}</strong>
                  <span class="text-2xs text-slate-400 block">${site.cpeReceiver.type} (${site.cpeReceiver.gain})</span>
                  <span class="text-2xs text-cyan-300 font-mono mt-2 block">طريقة التثبيت: ${site.cpeReceiver.mount}</span>
                </div>

                <!-- Column 2: Distribution Switch -->
                <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div class="flex items-center gap-1.5 text-blue-400 font-bold text-2xs mb-2">
                    <span>🔀</span> سويتش التوزيع والـ PoE الداخلي
                  </div>
                  <strong class="text-white text-xs block mb-1">${site.distributionSwitch.brand}</strong>
                  <span class="text-2xs text-slate-300 block">${site.distributionSwitch.model}</span>
                  <span class="text-2xs text-slate-400 mt-2 block">${site.distributionSwitch.role}</span>
                </div>

                <!-- Column 3: Local APs & Modems -->
                <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div class="flex items-center gap-1.5 text-emerald-400 font-bold text-2xs mb-2">
                    <span>📶</span> اللواقط ونقاط الوصول الداخلية (APs & Modems)
                  </div>
                  ${site.localAPs.length > 0 ? site.localAPs.map(ap => `
                    <div class="mb-1.5 pb-1.5 border-b border-slate-900 last:border-0 last:mb-0 last:pb-0">
                      <strong class="text-slate-200 text-2xs">${ap.brand} ${ap.model}</strong>
                      <span class="text-3xs text-slate-400 block">${ap.role} (${ap.mode})</span>
                    </div>
                  `).join('') : '<span class="text-2xs text-slate-400">اتصال مباشر عبر برمجية العميل (Software VPN Client)</span>'}
                </div>
              </div>

              <!-- Footer Wiring Notes & VLAN -->
              <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex justify-between items-center flex-wrap gap-2 text-2xs">
                <div>
                  <span class="text-slate-400">نطاق الشبكة (Subnet / VLAN):</span>
                  <strong class="text-cyan-400 font-mono mr-1">${site.ipSubnet}</strong>
                </div>
                <div>
                  <span class="text-slate-400">ملاحظات التوصيل والتأريض:</span>
                  <span class="text-slate-300 mr-1">${site.wiringNotes}</span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  // NEW Hardware Catalog with Multi-Vendor Filter Tabs
  renderHardwareCatalog() {
    const container = document.getElementById('hardware-container');
    if (!container) return;

    const vendors = ["all", "MikroTik", "Ubiquiti", "Cisco", "TP-Link", "Netis", "D-Link", "Tenda"];
    const filteredHw = this.activeHardwareFilter === "all" 
      ? NETWORK_DATA.hardware 
      : NETWORK_DATA.hardware.filter(h => h.brand.toLowerCase() === this.activeHardwareFilter.toLowerCase());

    container.innerHTML = `
      <div>
        <!-- Vendor Filter Buttons -->
        <div class="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          <span class="text-xs font-bold text-slate-400 ml-2">تصفية حسب الشركة:</span>
          ${vendors.map(v => `
            <button class="px-3.5 py-1.5 rounded-lg text-xs font-bold font-sans transition-all ${this.activeHardwareFilter === v ? 'bg-cyan-600 text-white shadow-md shadow-cyan-900/30' : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'}" onclick="App.filterHardware('${v}')">
              ${v === 'all' ? 'جميع الشركات' : v}
            </button>
          `).join('')}
        </div>

        <!-- Hardware Cards Grid -->
        <div class="hardware-catalog-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          ${filteredHw.map(hw => `
            <div class="hardware-card bg-slate-900 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl hover:border-cyan-500/50 transition-all">
              <!-- Header with SVG -->
              <div class="hw-svg-preview bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-center min-h-[160px]">
                <img src="${hw.svg}" alt="${hw.name}" class="max-h-[140px] w-auto drop-shadow-md">
              </div>

              <!-- Body -->
              <div class="p-5">
                <div class="flex justify-between items-start mb-2">
                  <div>
                    <span class="text-2xs font-bold text-cyan-400 uppercase font-mono tracking-wider">${hw.brand} • ${hw.category}</span>
                    <h3 class="text-base font-bold text-white leading-tight mt-0.5">${hw.name}</h3>
                  </div>
                  <span class="px-2 py-0.5 rounded text-2xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">${hw.badge}</span>
                </div>

                <p class="text-xs text-slate-300 mb-3 leading-relaxed"><strong>الوظيفة في الشبكة:</strong> ${hw.role}</p>

                <!-- Technical Specs Summary -->
                <div class="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-2xs space-y-1 mb-4">
                  ${Object.entries(hw.specs).map(([key, val]) => `
                    <div class="flex justify-between border-b border-slate-900 pb-1 last:border-0">
                      <span class="text-slate-400 capitalize">${key}:</span>
                      <span class="text-slate-200 font-mono text-left direction-ltr">${val}</span>
                    </div>
                  `).join('')}
                </div>

                <!-- Wiring & Deployment -->
                <div class="border-t border-slate-800 pt-3">
                  <h5 class="text-2xs font-bold text-amber-400 mb-1.5">مخطط التوصيل والربط الميداني:</h5>
                  <ul class="space-y-1 text-2xs text-slate-300">
                    ${hw.wiringGuide.map(wg => `<li class="flex items-start gap-1.5"><span class="text-cyan-400">▪</span><span>${wg}</span></li>`).join('')}
                  </ul>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  filterHardware(vendor) {
    this.activeHardwareFilter = vendor;
    this.renderHardwareCatalog();
  },

  // Calculator Event Bindings
  bindCalculators() {
    // 1. Subnet Calculator
    const btnSubnet = document.getElementById('btn-calc-subnet');
    if (btnSubnet) {
      btnSubnet.addEventListener('click', () => {
        const ip = document.getElementById('calc-ip-input').value || "10.10.10.1";
        const prefix = document.getElementById('calc-prefix-input').value || "24";
        const result = Calculators.calculateSubnet(ip, prefix);

        const outContainer = document.getElementById('subnet-results-output');
        if (!outContainer) return;

        if (result.error) {
          outContainer.innerHTML = `<div class="p-3 bg-rose-950 border border-rose-800 text-rose-300 text-xs rounded-lg">${result.error}</div>`;
          return;
        }

        outContainer.innerHTML = `
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span class="text-slate-400 text-2xs block">عنوان الشبكة (Network ID)</span>
              <strong class="text-cyan-400 font-mono">${result.networkId}</strong>
            </div>
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span class="text-slate-400 text-2xs block">عنوان البث (Broadcast)</span>
              <strong class="text-amber-400 font-mono">${result.broadcast}</strong>
            </div>
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span class="text-slate-400 text-2xs block">قناع الشبكة (Subnet Mask)</span>
              <strong class="text-white font-mono">${result.subnetMask}</strong>
            </div>
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span class="text-slate-400 text-2xs block">الأجهزة المتاحة (Usable Hosts)</span>
              <strong class="text-emerald-400 font-mono">${result.usableHosts} جهاز</strong>
            </div>
          </div>

          <div class="bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs mb-4">
            <div class="flex justify-between py-1 border-b border-slate-900">
              <span class="text-slate-400">النطاق المتاح للأجهزة (Usable Range):</span>
              <strong class="text-cyan-300 font-mono">${result.usableRange}</strong>
            </div>
            <div class="flex justify-between py-1 border-b border-slate-900">
              <span class="text-slate-400">قناع الشبكة بالصيغة الثنائية (Binary):</span>
              <strong class="text-slate-300 font-mono">${result.subnetMaskBinary}</strong>
            </div>
            <div class="flex justify-between py-1">
              <span class="text-slate-400">تصنيف الفئة ونوع العنوان:</span>
              <strong class="text-emerald-300">${result.ipClass}</strong>
            </div>
          </div>

          ${result.subnetsBreakdown.length > 0 ? `
            <div class="border-t border-slate-800 pt-3">
              <h4 class="text-xs font-bold text-white mb-2">تجزئة الشبكة المقترحة للـ VLANs (/26 تقسيم تلقائي):</h4>
              <div class="wb-table-wrapper">
                <table class="wb-table text-2xs">
                  <thead>
                    <tr><th>اسم القسم</th><th>CIDR</th><th>عنوان الشبكة</th><th>البوابة (Gateway)</th><th>النطاق</th><th>السعة</th></tr>
                  </thead>
                  <tbody>
                    ${result.subnetsBreakdown.map(sb => `
                      <tr>
                        <td class="font-bold text-white">${sb.subnetName}</td>
                        <td class="font-mono text-cyan-400">${sb.cidr}</td>
                        <td class="font-mono">${sb.network}</td>
                        <td class="font-mono text-emerald-400">${sb.gateway}</td>
                        <td class="font-mono">${sb.range}</td>
                        <td class="font-mono">${sb.capacity} host</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : ''}
        `;
      });
    }

    // 2. Fresnel Zone & Link Budget Calculator
    const btnLink = document.getElementById('btn-calc-link');
    if (btnLink) {
      btnLink.addEventListener('click', () => {
        const d = document.getElementById('link-dist-input').value || 5;
        const f = document.getElementById('link-freq-input').value || 5.8;
        const ptx = document.getElementById('link-txp-input').value || 24;
        const gtx = document.getElementById('link-gtx-input').value || 22;
        const grx = document.getElementById('link-grx-input').value || 22;
        const obs = document.getElementById('link-obs-input').value || 0;

        const res = Calculators.calculateLinkBudget({
          distanceKm: d,
          frequencyGhz: f,
          txPowerDbm: ptx,
          txGainDbi: gtx,
          rxGainDbi: grx,
          obstacleHeightMeters: obs
        });

        const out = document.getElementById('link-budget-results-output');
        if (!out) return;

        out.innerHTML = `
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs mb-4">
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span class="text-slate-400 text-2xs block">فقدان المسار الحر (FSPL)</span>
              <strong class="text-amber-400 font-mono">${res.fspl} dB</strong>
            </div>
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span class="text-slate-400 text-2xs block">إشارة الاستقبال المتوقعة (RSSI)</span>
              <strong class="text-emerald-400 font-mono text-base">${res.rssiDbm} dBm</strong>
            </div>
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span class="text-slate-400 text-2xs block">نصف قطر فرينل r1 (المنتصف)</span>
              <strong class="text-cyan-400 font-mono">${res.fresnelRadiusMid} متر</strong>
            </div>
            <div class="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <span class="text-slate-400 text-2xs block">خلو إلزامي مطلوب 60%</span>
              <strong class="text-white font-mono">${res.clearance60} متر</strong>
            </div>
          </div>

          <div class="p-4 bg-slate-950 rounded-xl border border-slate-800 mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs text-slate-400">تقييم استقرار الرابط اللاسلكي:</span>
              <span class="px-2.5 py-1 rounded text-xs font-bold ${res.status.badgeClass === 'badge-success' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}">${res.status.text}</span>
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">${res.status.desc}</p>
            <div class="flex justify-between text-2xs text-slate-400 mt-2 pt-2 border-t border-slate-900">
              <span>هامش التلاشي للأمطار (Fade Margin): <strong class="text-cyan-300">${res.fadeMargin} dB</strong></span>
              <span>تحدب سطح الأرض: <strong class="text-slate-300">${res.earthCurvatureMeters} متر</strong></span>
            </div>
          </div>
        `;
      });
    }
  },

  // Script Generator Binding
  bindScriptGenerator() {
    const btnGen = document.getElementById('btn-generate-script');
    if (btnGen) {
      btnGen.addEventListener('click', () => {
        const identity = document.getElementById('script-hostname').value || "HQ-CCR2004-CORE";
        const wanMode = document.getElementById('script-wan-mode').value;
        const totalDown = document.getElementById('script-down-speed').value || 200;
        const totalUp = document.getElementById('script-up-speed').value || 50;

        const code = ScriptGenerator.generate({
          identity,
          wanMode,
          totalDownMbps: totalDown,
          totalUpMbps: totalUp,
          enableDualWan: true,
          enableVlans: true,
          enablePcq: true,
          enableHardening: true
        });

        const codeBlock = document.getElementById('generated-script-code');
        if (codeBlock) {
          codeBlock.innerText = code;
        }
      });
    }

    const btnCopy = document.getElementById('btn-copy-script');
    if (btnCopy) {
      btnCopy.addEventListener('click', () => {
        const codeBlock = document.getElementById('generated-script-code');
        if (!codeBlock) return;
        navigator.clipboard.writeText(codeBlock.innerText).then(() => {
          alert("تم نسخ سكربت RouterOS v7 بنجاح إلى الحافظة!");
        });
      });
    }

    const btnDownload = document.getElementById('btn-download-script');
    if (btnDownload) {
      btnDownload.addEventListener('click', () => {
        const codeBlock = document.getElementById('generated-script-code');
        if (!codeBlock) return;
        const blob = new Blob([codeBlock.innerText], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = "enterprise_mikrotik_setup.rsc";
        a.click();
      });
    }
  },

  bindSearch() {
    const searchInput = document.getElementById('global-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) return;

      if (q.includes("نشر") || q.includes("مواقع") || q.includes("موقع") || q.includes("خريطة") || q.includes("جغرافي")) {
        this.switchView("deployment");
      } else if (q.includes("فرينل") || q.includes("fresnel") || q.includes("رابط") || q.includes("هوائي")) {
        this.switchView("calculators");
      } else if (q.includes("سكربت") || q.includes("أوامر") || q.includes("script") || q.includes("كود")) {
        this.switchView("generator");
      } else if (q.includes("عطل") || q.includes("مشكلة") || q.includes("انقطاع") || q.includes("ping")) {
        this.switchView("troubleshooter");
      } else if (q.includes("winbox") || q.includes("airos") || q.includes("محاكي")) {
        this.switchView("simulators");
      } else if (q.includes("راوتر") || q.includes("سويتش") || q.includes("ccr") || q.includes("crs") || q.includes("netis") || q.includes("d-link") || q.includes("tp-link")) {
        this.switchView("hardware");
      }
    });
  },

  printHandbook() {
    window.print();
  }
};

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
