/**
 * NetworkArchitect Hub - Main Application Controller
 * Orchestrates views, state transitions, interactive controls, and UI binding.
 */

const App = {
  activeView: "topology",
  activeModuleId: 1,
  activeHardwareFilter: "all",
  activeHardwareTab: "catalog",
  activeHardwareCategory: "all",
  hardwareSearchQuery: "",
  cablingPinoutStandard: "T568B",
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
        <div class="edu-footer-nav mt-8 pt-6 border-t border-slate-800 flex justify-between items-center gap-3 flex-wrap">
          ${currentModule.id > 1 ? `
            <button class="h-11 px-5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition-all border border-slate-700 flex items-center gap-2 shadow-sm" onclick="App.selectModule(${currentModule.id - 1})">
              <span>&larr;</span> الوحدة السابقة (${NETWORK_DATA.modules[currentModule.id - 2].tag})
            </button>
          ` : `<div></div>`}

          ${currentModule.id < NETWORK_DATA.modules.length ? `
            <button class="h-11 px-6 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-cyan-900/40 transition-all flex items-center gap-2" onclick="App.selectModule(${currentModule.id + 1})">
              الوحدة التالية (${NETWORK_DATA.modules[currentModule.id].tag}) <span>&rarr;</span>
            </button>
          ` : `
            <button class="h-11 px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/40 transition-all flex items-center gap-2" onclick="App.switchView('deployment')">
              الانتقال إلى خطة النشر الجغرافي للمواقع 🗺️ <span>&rarr;</span>
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

          <!-- Master Tower Real Photos Gallery Preview -->
          <div class="mb-5 p-4 bg-slate-950/90 rounded-xl border border-slate-800">
            <div class="flex items-center justify-between mb-3">
              <span class="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                <span>📷</span> صور عتاد البرج الرئيسي الحقيقي المعتمد:
              </span>
              <span class="text-3xs text-slate-400">انقر على أي صورة لتكبيرها</span>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center cursor-pointer group hover:border-cyan-500 transition-all flex flex-col justify-between" onclick="App.openProductModal('ccr2004')" title="انقر لعرض المواصفات والصورة">
                <div class="h-24 sm:h-28 w-full flex items-center justify-center mb-2 bg-slate-950/60 rounded-lg p-1.5">
                  <img src="assets/images/ccr2004.jpg" alt="CCR2004" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform">
                </div>
                <div>
                  <span class="text-xs text-slate-200 font-bold block truncate">CCR2004 Core</span>
                  <span class="text-3xs text-cyan-400 block font-mono">MikroTik 10G</span>
                </div>
                <span class="text-3xs text-slate-400 group-hover:text-cyan-300 font-bold mt-1.5">🔍 فحص المواصفات</span>
              </div>

              <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center cursor-pointer group hover:border-cyan-500 transition-all flex flex-col justify-between" onclick="App.openProductModal('crs328')" title="انقر لعرض المواصفات والصورة">
                <div class="h-24 sm:h-28 w-full flex items-center justify-center mb-2 bg-slate-950/60 rounded-lg p-1.5">
                  <img src="assets/images/crs328.jpg" alt="CRS328" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform">
                </div>
                <div>
                  <span class="text-xs text-slate-200 font-bold block truncate">CRS328 500W</span>
                  <span class="text-3xs text-cyan-400 block font-mono">MikroTik PoE</span>
                </div>
                <span class="text-3xs text-slate-400 group-hover:text-cyan-300 font-bold mt-1.5">🔍 فحص المواصفات</span>
              </div>

              <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center cursor-pointer group hover:border-cyan-500 transition-all flex flex-col justify-between" onclick="App.openProductModal('rocket-prism')" title="انقر لعرض المواصفات والصورة">
                <div class="h-24 sm:h-28 w-full flex items-center justify-center mb-2 bg-slate-950/60 rounded-lg p-1.5">
                  <img src="assets/images/rocket-prism.jpg" alt="Rocket Prism" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform">
                </div>
                <div>
                  <span class="text-xs text-slate-200 font-bold block truncate">Rocket Prism</span>
                  <span class="text-3xs text-amber-400 block font-mono">Ubiquiti PtMP</span>
                </div>
                <span class="text-3xs text-slate-400 group-hover:text-cyan-300 font-bold mt-1.5">🔍 فحص المواصفات</span>
              </div>

              <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center cursor-pointer group hover:border-cyan-500 transition-all flex flex-col justify-between" onclick="App.openProductModal('powerbeam')" title="انقر لعرض المواصفات والصورة">
                <div class="h-24 sm:h-28 w-full flex items-center justify-center mb-2 bg-slate-950/60 rounded-lg p-1.5">
                  <img src="assets/images/powerbeam.jpg" alt="PowerBeam ISO" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform">
                </div>
                <div>
                  <span class="text-xs text-slate-200 font-bold block truncate">PowerBeam ISO</span>
                  <span class="text-3xs text-amber-400 block font-mono">Ubiquiti 25dBi</span>
                </div>
                <span class="text-3xs text-slate-400 group-hover:text-cyan-300 font-bold mt-1.5">🔍 فحص المواصفات</span>
              </div>

              <div class="p-3 bg-slate-900 rounded-xl border border-slate-800 text-center cursor-pointer group hover:border-cyan-500 transition-all flex flex-col justify-between" onclick="App.openProductModal('cable-stp')" title="انقر لعرض المواصفات والصورة">
                <div class="h-24 sm:h-28 w-full flex items-center justify-center mb-2 bg-slate-950/60 rounded-lg p-1.5">
                  <img src="assets/images/cable-stp.png" alt="ETH-SP-G2" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform">
                </div>
                <div>
                  <span class="text-xs text-slate-200 font-bold block truncate">ETH-SP-G2</span>
                  <span class="text-3xs text-emerald-400 block font-mono">Surge Protection</span>
                </div>
                <span class="text-3xs text-slate-400 group-hover:text-cyan-300 font-bold mt-1.5">🔍 فحص المواصفات</span>
              </div>
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
          ${sites.map((site, index) => {
            const siteConfig = [
              { cpeId: "nanostation-5ac", swId: "tplink-sg3428mp", cpeImg: "assets/images/nanostation-5ac.jpg", swImg: "assets/images/tplink-sg3428mp.jpg" },
              { cpeId: "powerbeam", swId: "dlink-dgs1210", cpeImg: "assets/images/powerbeam.jpg", swImg: "assets/images/dlink-dgs1210.jpg" },
              { cpeId: "powerbeam", swId: "cisco-2960x", cpeImg: "assets/images/powerbeam.jpg", swImg: "assets/images/cisco-2960x.jpg" },
              { cpeId: "nanostation-loco5ac", swId: "tplink-wr840n", cpeImg: "assets/images/nanostation-loco5ac.jpg", swImg: "assets/images/tplink-wr840n.jpg" },
              { cpeId: "ccr2004", swId: "hex-s", cpeImg: "assets/images/ccr2004.jpg", swImg: "assets/images/hex-s.jpg" }
            ][index] || { cpeId: "nanostation-5ac", swId: "tplink-sg3428mp", cpeImg: "assets/images/nanostation-5ac.jpg", swImg: "assets/images/tplink-sg3428mp.jpg" };

            return `
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

              <!-- Specs Columns with Real Product Photos -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-4">
                <!-- Column 1: CPE Receiver -->
                <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between text-amber-400 font-bold text-2xs mb-2">
                      <span class="flex items-center gap-1.5"><span>📡</span> لاقط الاستقبال الهوائي (CPE)</span>
                      <span class="text-3xs text-emerald-400 font-bold">📷 صورة حقيقية</span>
                    </div>
                    <div class="mb-2 p-2 bg-slate-900 rounded-lg border border-slate-800/80 text-center cursor-pointer group hover:border-amber-400 transition-all flex flex-col items-center justify-center h-28 sm:h-32" onclick="App.openProductModal('${siteConfig.cpeId}')" title="انقر لعرض المواصفات والصورة">
                      <img src="${siteConfig.cpeImg}" alt="CPE" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform">
                    </div>
                    <strong class="text-white text-xs block mb-1">${site.cpeReceiver.brand} - ${site.cpeReceiver.model}</strong>
                    <span class="text-2xs text-slate-400 block">${site.cpeReceiver.type} (${site.cpeReceiver.gain})</span>
                  </div>
                  <div class="mt-2 pt-2 border-t border-slate-900 flex justify-between items-center">
                    <span class="text-3xs text-cyan-300 font-mono">${site.cpeReceiver.mount || 'تثبيت مباشر'}</span>
                    <button class="text-3xs text-amber-400 font-bold hover:underline" onclick="App.openProductModal('${siteConfig.cpeId}')">🔍 فحص اللاقط</button>
                  </div>
                </div>

                <!-- Column 2: Distribution Switch -->
                <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center justify-between text-blue-400 font-bold text-2xs mb-2">
                      <span class="flex items-center gap-1.5"><span>🔀</span> سويتش التوزيع والـ PoE</span>
                      <span class="text-3xs text-emerald-400 font-bold">📷 صورة حقيقية</span>
                    </div>
                    <div class="mb-2 p-2 bg-slate-900 rounded-lg border border-slate-800/80 text-center cursor-pointer group hover:border-cyan-400 transition-all flex flex-col items-center justify-center h-28 sm:h-32" onclick="App.openProductModal('${siteConfig.swId}')" title="انقر لعرض المواصفات والصورة">
                      <img src="${siteConfig.swImg}" alt="Switch" class="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform">
                    </div>
                    <strong class="text-white text-xs block mb-1">${site.distributionSwitch.brand}</strong>
                    <span class="text-2xs text-slate-300 block">${site.distributionSwitch.model}</span>
                  </div>
                  <div class="mt-2 pt-2 border-t border-slate-900 flex justify-between items-center">
                    <span class="text-3xs text-slate-400 truncate max-w-[60%]">${site.distributionSwitch.role}</span>
                    <button class="text-3xs text-cyan-400 font-bold hover:underline" onclick="App.openProductModal('${siteConfig.swId}')">🔍 فحص السويتش</button>
                  </div>
                </div>

                <!-- Column 3: Local APs & Modems -->
                <div class="p-3.5 bg-slate-950 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <div class="flex items-center gap-1.5 text-emerald-400 font-bold text-2xs mb-2">
                      <span>📶</span> اللواقط ونقاط الوصول الداخلية (APs & Modems)
                    </div>
                    ${site.localAPs.length > 0 ? site.localAPs.map(ap => `
                      <div class="mb-2 pb-2 border-b border-slate-900 last:border-0 last:mb-0 last:pb-0">
                        <strong class="text-slate-200 text-2xs">${ap.brand} ${ap.model}</strong>
                        <span class="text-3xs text-slate-400 block">${ap.role} (${ap.mode})</span>
                      </div>
                    `).join('') : '<span class="text-2xs text-slate-400">اتصال مباشر عبر برمجية العميل (Software VPN Client) مع تشفير ChaCha20</span>'}
                  </div>
                  <span class="text-3xs text-slate-400 mt-2 block">عزل تلقائي للـ Broadcast</span>
                </div>
              </div>

              <!-- Footer Wiring Notes & VLAN -->
              <div class="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 flex justify-between items-center flex-wrap gap-2 text-2xs">
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
            `;
          }).join('')}
        </div>
      </div>
    `;
  },

  // Switch between the 3 Sub-tabs in Hardware & Cabling Hub
  switchHardwareTab(tabName) {
    this.activeHardwareTab = tabName;
    document.querySelectorAll('.hw-subnav-btn').forEach(btn => {
      if (btn.dataset.hwtab === tabName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
    this.renderHardwareCatalog();
  },

  filterHardware(vendor) {
    this.activeHardwareFilter = vendor;
    this.renderHardwareCatalog();
  },

  filterHardwareCategory(category) {
    this.activeHardwareCategory = category;
    this.renderHardwareCatalog();
  },

  searchHardware(query) {
    this.hardwareSearchQuery = (query || "").trim().toLowerCase();
    this.renderHardwareCatalog();
  },

  togglePinoutStandard(standard) {
    this.cablingPinoutStandard = standard;
    this.renderHardwareCatalog();
  },

  copySpecsToClipboard(hwId) {
    const hw = this.findHardware(hwId);
    if (!hw) return;
    const text = `[بطاقة مواصفات الجهاز: ${hw.name}]\nالشركة: ${hw.brand}\nالفئة: ${hw.category}\nالوظيفة: ${hw.role}\nالمواصفات:\n${Object.entries(hw.specs).map(([k, v]) => ` - ${k}: ${v}`).join('\n')}`;
    navigator.clipboard.writeText(text).then(() => {
      alert(`تم نسخ مواصفات الجهاز (${hw.name}) إلى الحافظة بنجاح!`);
    });
  },

  // Main Hardware & Cabling Hub View Router
  renderHardwareCatalog() {
    const container = document.getElementById('hardware-container');
    if (!container) return;

    document.querySelectorAll('.hw-subnav-btn').forEach(btn => {
      if (btn.dataset.hwtab === this.activeHardwareTab) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    if (this.activeHardwareTab === "cabling") {
      container.innerHTML = this.renderCablingEngineeringTab();
    } else if (this.activeHardwareTab === "matrix") {
      container.innerHTML = this.renderComparisonMatrixTab();
    } else {
      container.innerHTML = this.renderHardwareCatalogTab();
    }
  },

  // TAB 1: Enterprise Hardware Catalog with Dual Filters & Search
  renderHardwareCatalogTab() {
    const vendors = ["all", "MikroTik", "Ubiquiti", "Cisco", "TP-Link", "Netis", "D-Link", "Tenda"];
    const categories = [
      { id: "all", name: "جميع الفئات" },
      { id: "Core Routing", name: "راوترات مركزية" },
      { id: "Switching & PoE", name: "سويتشات توزيع" },
      { id: "Wireless Long-Range", name: "أبراج وربط لاسلكي" },
      { id: "Receivers & CPEs", name: "لواقط وهوائيات CPE" },
      { id: "Access Points", name: "نقاط وصول Wi-Fi" },
      { id: "Infrastructure & Protection", name: "كابلات وتأريض" }
    ];

    let filteredHw = NETWORK_DATA.hardware || [];

    // Filter by Brand
    if (this.activeHardwareFilter !== "all") {
      filteredHw = filteredHw.filter(h => h.brand.toLowerCase() === this.activeHardwareFilter.toLowerCase());
    }

    // Filter by Category
    if (this.activeHardwareCategory !== "all") {
      filteredHw = filteredHw.filter(h => h.category.toLowerCase().includes(this.activeHardwareCategory.toLowerCase()));
    }

    // Filter by Search Query
    if (this.hardwareSearchQuery) {
      filteredHw = filteredHw.filter(h => 
        h.name.toLowerCase().includes(this.hardwareSearchQuery) ||
        h.brand.toLowerCase().includes(this.hardwareSearchQuery) ||
        h.role.toLowerCase().includes(this.hardwareSearchQuery) ||
        h.badge.toLowerCase().includes(this.hardwareSearchQuery) ||
        Object.values(h.specs).some(val => String(val).toLowerCase().includes(this.hardwareSearchQuery))
      );
    }

    return `
      <div>
        <!-- Toolbar Panel (Search & Dual Filter Tabs) -->
        <div class="hw-toolbar-panel">
          <!-- Search Row -->
          <div class="hw-search-row">
            <div class="hw-search-box">
              <input type="text" class="hw-search-input" placeholder="ابحث عن: SFP+, PoE, Gigabit, Wi-Fi 6, 5GHz, CCR..." value="${this.hardwareSearchQuery}" oninput="App.searchHardware(this.value)">
              <span class="absolute right-3 top-2.5 text-sm text-slate-400">🔍</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs font-mono font-bold text-cyan-400">
                مطابق: ${filteredHw.length} من أصل 19 جهاز
              </span>
              ${this.hardwareSearchQuery || this.activeHardwareFilter !== 'all' || this.activeHardwareCategory !== 'all' ? `
                <button class="px-2.5 py-1 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs font-bold hover:bg-rose-900 transition-all" onclick="App.activeHardwareFilter='all'; App.activeHardwareCategory='all'; App.hardwareSearchQuery=''; App.renderHardwareCatalog();">
                  ✕ مسح الفلاتر
                </button>
              ` : ''}
            </div>
          </div>

          <!-- Vendor Filter Row -->
          <div class="hw-filter-group">
            <span class="text-2xs font-bold text-slate-400 ml-1 whitespace-nowrap">الشركة:</span>
            ${vendors.map(v => `
              <button class="hw-pill-btn ${this.activeHardwareFilter === v ? 'active' : ''}" onclick="App.filterHardware('${v}')">
                ${v === 'all' ? 'جميع الشركات' : v}
              </button>
            `).join('')}
          </div>

          <!-- Category Filter Row -->
          <div class="hw-filter-group">
            <span class="text-2xs font-bold text-slate-400 ml-1 whitespace-nowrap">التصنيف:</span>
            ${categories.map(c => `
              <button class="hw-pill-btn ${this.activeHardwareCategory === c.id ? 'active' : ''}" onclick="App.filterHardwareCategory('${c.id}')">
                ${c.name}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Hardware Cards Grid -->
        ${filteredHw.length === 0 ? `
          <div class="p-12 text-center bg-slate-900/60 rounded-2xl border border-slate-800">
            <div class="text-4xl mb-3">🔍</div>
            <h3 class="text-base font-bold text-white mb-1">لم يتم العثور على أجهزة مطابقة للبحث</h3>
            <p class="text-xs text-slate-400 mb-4">جرب البحث بكلمات أخرى أو قم بإلغاء بعض الفلاتر لعرض الأجهزة</p>
            <button class="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold" onclick="App.activeHardwareFilter='all'; App.activeHardwareCategory='all'; App.hardwareSearchQuery=''; App.renderHardwareCatalog();">
              إعادة تعيين جميع الفلاتر
            </button>
          </div>
        ` : `
          <div class="hardware-catalog-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${filteredHw.map(hw => `
              <div class="hw-card-v2" data-brand="${hw.brand}">
                <div>
                  <!-- High-Res Photo Pedestal -->
                  <div class="hw-photo-pedestal" onclick="App.openProductModal('${hw.id}')" title="انقر لتكبير الصورة والمواصفات الكاملة">
                    <img src="${hw.image || hw.svg}" alt="${hw.name}" onerror="this.src='${hw.svg}'">
                    
                    <div class="hw-verified-badge">
                      <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>صورة حقيقية معتمدة</span>
                    </div>

                    <div class="hw-inspect-hint">
                      <span>🔍</span> انقر للمواصفات
                    </div>
                  </div>

                  <!-- Body -->
                  <div class="hw-card-body">
                    <div class="hw-header-row">
                      <div>
                        <span class="hw-brand-tag">${hw.brand} • ${hw.category}</span>
                        <h4 class="hw-device-title">${hw.name}</h4>
                      </div>
                      <span class="hw-badge-pill">${hw.badge}</span>
                    </div>

                    <p class="hw-role-text"><strong>الدور:</strong> ${hw.role}</p>

                    <!-- Specs Summary Grid -->
                    <div class="hw-specs-chips">
                      ${Object.entries(hw.specs).slice(0, 4).map(([key, val]) => `
                        <div class="hw-chip-item">
                          <span class="hw-chip-label">${key}</span>
                          <span class="hw-chip-val" title="${val}">${val}</span>
                        </div>
                      `).join('')}
                    </div>

                    <!-- Wiring Guide Snippet -->
                    <div class="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/80 text-3xs text-slate-300">
                      <strong class="text-amber-400 block mb-1">🔌 إرشاد التوصيل:</strong>
                      <span class="line-clamp-2">${hw.wiringGuide[0] || 'توصيل مباشر عبر كابل STP محمي ومؤرض.'}</span>
                    </div>
                  </div>
                </div>

                <!-- Footer Actions -->
                <div class="hw-card-footer">
                  <button class="btn-hw-inspect" onclick="App.openProductModal('${hw.id}')">
                    <span>📸</span> فحص المواصفات الكاملة
                  </button>
                  <button class="btn-hw-copy" onclick="App.copySpecsToClipboard('${hw.id}')" title="نسخ بطاقة المواصفات">
                    <span>📋</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        `}
      </div>
    `;
  },

  // TAB 2: Cabling & Physical Wiring Engineering Masterclass
  renderCablingEngineeringTab() {
    const isB = (this.cablingPinoutStandard || "T568B") === "T568B";

    const pinoutDataB = [
      { pin: 1, name: "أبيض-برتقالي", class: "wire-white-orange", signal: "TX+ (إرسال)", poe: "PoE+", gigabit: "DA+" },
      { pin: 2, name: "برتقالي", class: "wire-orange", signal: "TX- (إرسال)", poe: "PoE+", gigabit: "DA-" },
      { pin: 3, name: "أبيض-أخضر", class: "wire-white-green", signal: "RX+ (استقبال)", poe: "PoE-", gigabit: "DB+" },
      { pin: 4, name: "أزرق", class: "wire-blue", signal: "PoE DC+", poe: "+48V / +24V", gigabit: "DC+" },
      { pin: 5, name: "أبيض-أزرق", class: "wire-white-blue", signal: "PoE DC+", poe: "+48V / +24V", gigabit: "DC-" },
      { pin: 6, name: "أخضر", class: "wire-green", signal: "RX- (استقبال)", poe: "PoE-", gigabit: "DB-" },
      { pin: 7, name: "أبيض-بني", class: "wire-white-brown", signal: "PoE DC- (Return)", poe: "GND / 0V", gigabit: "DD+" },
      { pin: 8, name: "بني", class: "wire-brown", signal: "PoE DC- (Return)", poe: "GND / 0V", gigabit: "DD-" }
    ];

    const pinoutDataA = [
      { pin: 1, name: "أبيض-أخضر", class: "wire-white-green", signal: "TX+ (إرسال)", poe: "PoE+", gigabit: "DA+" },
      { pin: 2, name: "أخضر", class: "wire-green", signal: "TX- (إرسال)", poe: "PoE+", gigabit: "DA-" },
      { pin: 3, name: "أبيض-برتقالي", class: "wire-white-orange", signal: "RX+ (استقبال)", poe: "PoE-", gigabit: "DB+" },
      { pin: 4, name: "أزرق", class: "wire-blue", signal: "PoE DC+", poe: "+48V / +24V", gigabit: "DC+" },
      { pin: 5, name: "أبيض-أزرق", class: "wire-white-blue", signal: "PoE DC+", poe: "+48V / +24V", gigabit: "DC-" },
      { pin: 6, name: "برتقالي", class: "wire-orange", signal: "RX- (استقبال)", poe: "PoE-", gigabit: "DB-" },
      { pin: 7, name: "أبيض-بني", class: "wire-white-brown", signal: "PoE DC- (Return)", poe: "GND / 0V", gigabit: "DD+" },
      { pin: 8, name: "بني", class: "wire-brown", signal: "PoE DC- (Return)", poe: "GND / 0V", gigabit: "DD-" }
    ];

    const currentPins = isB ? pinoutDataB : pinoutDataA;

    return `
      <div class="cabling-masterclass-portal">
        <!-- Hero Banner -->
        <div class="cabling-hero-card">
          <div class="flex items-center justify-between flex-wrap gap-3 mb-3">
            <span class="px-3 py-1 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono text-xs font-bold">
              PHYSICAL LAYER 1 STANDARDS
            </span>
            <span class="text-xs text-slate-400 font-mono">IEEE 802.3ab 1000BASE-T • TIA/EIA-568-B.2</span>
          </div>
          <h2 class="text-xl font-black text-white mb-2">الدليل الهندسي الشامل للكابلات الفيزيائية، الألياف الضوئية، والتأريض</h2>
          <p class="text-xs text-slate-300 leading-relaxed max-w-4xl">
            تُعزى 70% من أعطال الشبكات الميدانية إلى رداءة التوصيل الفيزيائي، غياب التأريض في الأبراج، أو استخدام كابلات UTP رخيصة بدلاً من STP المحمية. يقدم هذا الدليل المخططات الهندسية المعتمدة لضمان استقرار الشبكة وعزل التشويش الكهرومغناطيسي لسنوات طويلة.
          </p>
        </div>

        <!-- 1. RJ45 COLOR PINOUT VISUALIZER -->
        <div class="rj45-connector-wrapper">
          <div class="flex justify-between items-center flex-wrap gap-4 border-b border-slate-800 pb-3 mb-4">
            <div>
              <span class="text-2xs font-bold text-cyan-400 font-mono">STANDARDIZED COLOR SCHEME</span>
              <h3 class="text-base font-bold text-white flex items-center gap-2 mt-0.5">
                <span>🔌</span> مخطط ألوان كابلات الشبكة المعيارية (RJ45 Pinout Visualizer)
              </h3>
            </div>
            <!-- Standard Toggle -->
            <div class="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
              <button class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${isB ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}" onclick="App.togglePinoutStandard('T568B')">
                معيار T568B (المعتمد عالمياً)
              </button>
              <button class="px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${!isB ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}" onclick="App.togglePinoutStandard('T568A')">
                معيار T568A
              </button>
            </div>
          </div>

          <p class="text-xs text-slate-300 mb-4">
            الترتيب المعتمد عالمياً ومؤسسياً لربط جميع أجهزة الراوترات، السويتشات، ومحطات الأبراج هو <strong>T568B</strong>. يجب تأريض رأس الكابل المعدني (RJ45 Shielded) وربط سلك التصريف الأرضي (ESD Drain Wire) لضمان تفريغ الشحنات.
          </p>

          <!-- 8 Visual Wire Bars -->
          <div class="rj45-pin-row">
            ${currentPins.map(p => `
              <div class="rj45-pin-col">
                <span class="rj45-pin-number">PIN ${p.pin}</span>
                <div class="rj45-wire-color-bar ${p.class}" title="${p.name}"></div>
                <span class="rj45-wire-name">${p.name}</span>
                <span class="rj45-signal-role">${p.signal}</span>
                <span class="text-3xs font-mono text-slate-400 mt-1">${p.poe}</span>
                <span class="text-3xs font-mono text-emerald-400 mt-0.5">${p.gigabit}</span>
              </div>
            `).join('')}
          </div>

          <div class="mt-4 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-2xs text-slate-300 flex justify-between items-center flex-wrap gap-2">
            <div>
              <strong class="text-emerald-400">💡 الكابل المباشر (Straight-Through):</strong> ينتهي كلا الطرفين بمعيار T568B، ويُستخدم لربط الحاسوب بالسويتش، والراوتر بالمودم، والهوائي بمحقن الـ PoE.
            </div>
            <div class="text-amber-300">
              * ميزة Auto-MDI/MDIX الحديثة في سويتشات ميكروتك وسيسكو تعكس الأقطاب برمجياً تلقائياً.
            </div>
          </div>
        </div>

        <!-- 2. CABLE LAYERS ANATOMICAL DIAGRAM (STP vs UTP) -->
        <div class="cable-layers-diagram">
          <div class="mb-4">
            <span class="text-2xs font-bold text-amber-400 font-mono">MILITARY GRADE SHIELDING</span>
            <h3 class="text-base font-bold text-white flex items-center gap-2 mt-0.5">
              <span>🛡️</span> التشريح الفيزيائي لكابل الأبراج المحمي (ToughCable Carrier SF/FTP vs UTP)
            </h3>
            <p class="text-xs text-slate-300 mt-1">
              لماذا يُحظر تركيب كابلات UTP البلاستيكية العادية في أبراج البث وأسطح المباني؟ التشريح التالي يوضح الطبقات الست التي تحمي المنظومة:
            </p>
          </div>

          <div class="space-y-2.5">
            <div class="cable-layer-item">
              <div class="layer-icon-box bg-slate-900 border border-slate-700 text-cyan-400">1</div>
              <div class="flex-1">
                <strong class="text-sm text-white block">الغلاف الخارجي المقاوم للشمس (Weatherproof UV-Resistant PE Jacket)</strong>
                <p class="text-xs text-slate-400">غلاف بولي إيثيلين أسود عالي الكثافة يحمي الأسلاك من التفتت والتشقق تحت أشعة الشمس المباشرة والأمطار ودرجات حرارة تصل إلى 80°C.</p>
              </div>
              <span class="px-2.5 py-1 rounded bg-slate-900 text-3xs font-mono text-cyan-300 border border-slate-800">الطبقة الخارجية</span>
            </div>

            <div class="cable-layer-item">
              <div class="layer-icon-box bg-slate-900 border border-slate-700 text-amber-400">2</div>
              <div class="flex-1">
                <strong class="text-sm text-white block">شبكة التضفير المعدنية (Tinned Copper Braid Shield)</strong>
                <p class="text-xs text-slate-400">شبكة من ألياف النحاس المغلف بالقصدير تعطي الكابل مرونة ومقاومة شد ميكانيكية ضد الرياح الشديدة وتعمل كدرع كهرومغناطيسي أرضي.</p>
              </div>
              <span class="px-2.5 py-1 rounded bg-slate-900 text-3xs font-mono text-amber-300 border border-slate-800">حماية ميكانيكية</span>
            </div>

            <div class="cable-layer-item">
              <div class="layer-icon-box bg-slate-900 border border-slate-700 text-blue-400">3</div>
              <div class="flex-1">
                <strong class="text-sm text-white block">الدرع القصديري العازل (Aluminum Mylar Foil Shield 100%)</strong>
                <p class="text-xs text-slate-400">تغليف قصديري كامل 100% يمنع تسرب وتداخل الترددات الراديوية (RFI/EMI) القادمة من هوائيات البث ومحطات الراديو المجاورة على البرج.</p>
              </div>
              <span class="px-2.5 py-1 rounded bg-slate-900 text-3xs font-mono text-blue-300 border border-slate-800">حجب التشويش EMI</span>
            </div>

            <div class="cable-layer-item">
              <div class="layer-icon-box bg-slate-900 border border-slate-700 text-emerald-400">4</div>
              <div class="flex-1">
                <strong class="text-sm text-white block">سلك تصريف الشحنات الأرضي النحاسي (ESD Drain Wire)</strong>
                <p class="text-xs text-slate-400">سلك نحاسي غير معزول يمتد ملامساً للدرع القصديري على طول الكابل، وظيفته امتصاص وتفريغ أي جهد كهروستاتيكي ناتج عن الصواعق والرياح وتوجيهه إلى رأس RJ45 المعدني المؤرض.</p>
              </div>
              <span class="px-2.5 py-1 rounded bg-emerald-950 text-3xs font-mono text-emerald-300 border border-emerald-800">سلك الأمان الحرج</span>
            </div>

            <div class="cable-layer-item">
              <div class="layer-icon-box bg-slate-900 border border-slate-700 text-purple-400">5</div>
              <div class="flex-1">
                <strong class="text-sm text-white block">العازل البلاستيكي المتصالب (Internal Cross Spline Separator)</strong>
                <p class="text-xs text-slate-400">حشوة بلاستيكية صليبية الشكل تفصل كل زوج من الأزواج الأربعة في غرفة مستقلة لمنع التداخل الكهرومغناطيسي البيني (Near-End Crosstalk NEXT).</p>
              </div>
              <span class="px-2.5 py-1 rounded bg-slate-900 text-3xs font-mono text-purple-300 border border-slate-800">عزل الأزواج</span>
            </div>

            <div class="cable-layer-item">
              <div class="layer-icon-box bg-slate-900 border border-slate-700 text-rose-400">6</div>
              <div class="flex-1">
                <strong class="text-sm text-white block">الأزواج النحاسية النقية (4x 23 AWG Solid Bare Copper Pairs)</strong>
                <p class="text-xs text-slate-400">أزواج من النحاس الصافي النقي 100% (Solid Copper) بدون خلط بالألمنيوم (CCA)، لنقل طاقة الـ PoE وتيارات الـ 1000Mbps دون هبوط الجهد الكهربائي عبر المسافات الطويلة حتى 100 متر.</p>
              </div>
              <span class="px-2.5 py-1 rounded bg-rose-950 text-3xs font-mono text-rose-300 border border-rose-800">نواة البيانات والطاقة</span>
            </div>
          </div>
        </div>

        <!-- 3. FIBER OPTICS & SFP+ TRANSCEIVERS -->
        <div class="mb-8">
          <div class="mb-4">
            <span class="text-2xs font-bold text-cyan-400 font-mono">HIGH-SPEED OPTICAL INFRASTRUCTURE</span>
            <h3 class="text-base font-bold text-white flex items-center gap-2 mt-0.5">
              <span>💡</span> هندسة كابلات الألياف الضوئية وموديولات الـ 10G SFP+
            </h3>
          </div>

          <div class="fiber-grid">
            <div class="fiber-card border-amber-500/40">
              <div class="flex justify-between items-start mb-2">
                <span class="px-2 py-0.5 rounded text-3xs font-bold bg-amber-950 text-amber-300 border border-amber-800 font-mono">SINGLE-MODE (OS2)</span>
                <span class="text-xl">🟡</span>
              </div>
              <h4 class="text-sm font-bold text-white mb-1">الألياف أحادية النمط (Single Mode Fiber)</h4>
              <p class="text-xs text-slate-300 mb-3 leading-relaxed">
                قطر النواة <strong>9/125 µm</strong> رقيق جداً يمرر شعاع ليزري واحد فقط، مما يمنع التشتت الضوئي تماماً عبر المسافات الطويلة.
              </p>
              <div class="space-y-1 text-2xs text-slate-300 border-t border-slate-800 pt-2">
                <div class="flex justify-between"><span>لون الغلاف المعياري:</span><strong class="text-amber-400">أصفر فاقع (Yellow)</strong></div>
                <div class="flex justify-between"><span>طول الموجة:</span><strong class="font-mono text-cyan-300">1310nm / 1550nm Laser</strong></div>
                <div class="flex justify-between"><span>المسافة التشغيلية:</span><strong class="font-mono text-emerald-400">10 كم إلى 40 كم (Long Haul)</strong></div>
                <div class="flex justify-between"><span>الموديول المستخدم:</span><strong class="font-mono text-slate-200">10G SFP+ LR (Long Range)</strong></div>
              </div>
            </div>

            <div class="fiber-card border-cyan-500/40">
              <div class="flex justify-between items-start mb-2">
                <span class="px-2 py-0.5 rounded text-3xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono">MULTI-MODE (OM3 / OM4)</span>
                <span class="text-xl">🔷</span>
              </div>
              <h4 class="text-sm font-bold text-white mb-1">الألياف متعددة النمط (Multi Mode Fiber)</h4>
              <p class="text-xs text-slate-300 mb-3 leading-relaxed">
                قطر النواة <strong>50/125 µm</strong> أوسع يسمح بانعكاس مسارات متعددة للضوء (VCSEL Laser)، مثالي للربط الداخلي في الداتا سنتر.
              </p>
              <div class="space-y-1 text-2xs text-slate-300 border-t border-slate-800 pt-2">
                <div class="flex justify-between"><span>لون الغلاف المعياري:</span><strong class="text-cyan-400">فيروزي Aqua (OM3) أو بنفسجي (OM4)</strong></div>
                <div class="flex justify-between"><span>طول الموجة:</span><strong class="font-mono text-cyan-300">850nm VCSEL</strong></div>
                <div class="flex justify-between"><span>المسافة التشغيلية:</span><strong class="font-mono text-emerald-400">حتى 300م (OM3) أو 550م (OM4)</strong></div>
                <div class="flex justify-between"><span>الموديول المستخدم:</span><strong class="font-mono text-slate-200">10G SFP+ SR (Short Range)</strong></div>
              </div>
            </div>

            <div class="fiber-card border-purple-500/40">
              <div class="flex justify-between items-start mb-2">
                <span class="px-2 py-0.5 rounded text-3xs font-bold bg-purple-950 text-purple-300 border border-purple-800 font-mono">10G DAC TWINAX</span>
                <span class="text-xl">🔌</span>
              </div>
              <h4 class="text-sm font-bold text-white mb-1">كابلات النحاس المباشرة (Direct Attach SFP+)</h4>
              <p class="text-xs text-slate-300 mb-3 leading-relaxed">
                كابل نحاسي مزود بموديولي SFP+ مدمجين بالطرفين، يربط مباشرة راوتر CCR2004 بسويتش CRS328 في نفس الراك بدون استهلاك طاقة ضوئية.
              </p>
              <div class="space-y-1 text-2xs text-slate-300 border-t border-slate-800 pt-2">
                <div class="flex justify-between"><span>أقصى طول عملي:</span><strong class="text-purple-400">1 متر إلى 3 أمتار داخل الراك</strong></div>
                <div class="flex justify-between"><span>زمن التأخير (Latency):</span><strong class="font-mono text-emerald-400">&lt; 0.1 ميكروثانية (شبه معدوم)</strong></div>
                <div class="flex justify-between"><span>استهلاك الطاقة:</span><strong class="font-mono text-cyan-300">0.1W فقط (أقل بـ 90% من الفايبر)</strong></div>
                <div class="flex justify-between"><span>التكلفة:</span><strong class="text-emerald-300">اقتصادية جداً (لا تتطلب موديولات)</strong></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. POE STANDARDS & VOLTAGE DANGER MATRIX -->
        <div class="mb-8">
          <div class="mb-4">
            <span class="text-2xs font-bold text-rose-400 font-mono">POWER OVER ETHERNET MATRIX</span>
            <h3 class="text-base font-bold text-white flex items-center gap-2 mt-0.5">
              <span>⚡</span> معايير التغذية بالطاقة (PoE) وصدمة الـ 24V مقابل 48V
            </h3>
          </div>

          <!-- Crucial Danger Callout -->
          <div class="p-4 bg-rose-950/40 border border-rose-600/70 rounded-2xl mb-4 text-xs">
            <div class="flex items-center gap-2 text-rose-400 font-bold text-sm mb-1.5">
              <span>⚠️</span> تحذير هندسي صارم: تجنب حرق أجهزة النانو والروكت فوراً!
            </div>
            <p class="text-slate-200 leading-relaxed">
              أجهزة <strong>Ubiquiti NanoStation و Rocket و PowerBeam</strong> تعمل بنظام <strong>Passive PoE 24V</strong> (جهد ثابت دائم). إذا قمت بتوصيلها مباشرة في سويتش سيسكو أو تي بي لينك يخرج <strong>48V-54V Active PoE</strong> بدون محول تحويل، فإن الجهد العالي سيحرق المعالج والراديو في أقل من ثانية! للربط الآمن: استخدم محول <strong>Ubiquiti Instant 802.3af to 24V Adapter (INS-3AF-I-G)</strong> أو استخدم سويتش <strong>MikroTik CRS328</strong> الذي يسمح باختيار 24V يدوياً.
            </p>
          </div>

          <div class="poe-matrix-grid">
            <div class="poe-card">
              <span class="text-2xs font-bold text-cyan-400 font-mono block mb-1">IEEE 802.3af (PoE Type 1)</span>
              <h4 class="text-sm font-bold text-white mb-2">PoE القياسي (15.4W)</h4>
              <ul class="space-y-1.5 text-2xs text-slate-300">
                <div class="flex justify-between"><span>الجهد الكهربائي:</span><strong class="font-mono text-cyan-400">44V - 57V DC</strong></div>
                <div class="flex justify-between"><span>القدرة عند المنفذ:</span><strong class="font-mono text-white">15.4 واط</strong></div>
                <div class="flex justify-between"><span>القدرة المستلمة:</span><strong class="font-mono text-emerald-400">12.95 واط</strong></div>
                <div class="flex justify-between"><span>الأجهزة المدعومة:</span><span>هواتف VoIP وكاميرات IP الثابتة</span></div>
              </ul>
            </div>

            <div class="poe-card">
              <span class="text-2xs font-bold text-emerald-400 font-mono block mb-1">IEEE 802.3at (PoE+ Type 2)</span>
              <h4 class="text-sm font-bold text-white mb-2">PoE+ عالي القدرة (30W)</h4>
              <ul class="space-y-1.5 text-2xs text-slate-300">
                <div class="flex justify-between"><span>الجهد الكهربائي:</span><strong class="font-mono text-emerald-400">50V - 57V DC</strong></div>
                <div class="flex justify-between"><span>القدرة عند المنفذ:</span><strong class="font-mono text-white">30 واط</strong></div>
                <div class="flex justify-between"><span>القدرة المستلمة:</span><strong class="font-mono text-emerald-400">25.5 واط</strong></div>
                <div class="flex justify-between"><span>الأجهزة المدعومة:</span><span>نقاط Wi-Fi 6 وكاميرات PTZ المتحركة</span></div>
              </ul>
            </div>

            <div class="poe-card">
              <span class="text-2xs font-bold text-purple-400 font-mono block mb-1">IEEE 802.3bt (PoE++ Type 4)</span>
              <h4 class="text-sm font-bold text-white mb-2">Ultra PoE فائق (90W)</h4>
              <ul class="space-y-1.5 text-2xs text-slate-300">
                <div class="flex justify-between"><span>الجهد الكهربائي:</span><strong class="font-mono text-purple-400">52V - 57V DC</strong></div>
                <div class="flex justify-between"><span>القدرة عند المنفذ:</span><strong class="font-mono text-white">90 واط</strong></div>
                <div class="flex justify-between"><span>القدرة المستلمة:</span><strong class="font-mono text-emerald-400">71.3 واط</strong></div>
                <div class="flex justify-between"><span>الأجهزة المدعومة:</span><span>شاشات المؤتمرات وأجهزة الـ airFiber</span></div>
              </ul>
            </div>

            <div class="poe-card danger-card">
              <span class="text-2xs font-bold text-amber-400 font-mono block mb-1">PASSIVE POE (24V FIXED)</span>
              <h4 class="text-sm font-bold text-white mb-2">24V السلبي (غير مفاوض)</h4>
              <ul class="space-y-1.5 text-2xs text-slate-300">
                <div class="flex justify-between"><span>الجهد الكهربائي:</span><strong class="font-mono text-amber-400">24V DC مستمر دائم</strong></div>
                <div class="flex justify-between"><span>الأقطاب:</span><strong class="font-mono text-white">(4,5 موجب) و (7,8 سالب)</strong></div>
                <div class="flex justify-between"><span>القدرة القياسية:</span><strong class="font-mono text-emerald-400">12W - 24W</strong></div>
                <div class="flex justify-between"><span>الأجهزة المدعومة:</span><span>NanoStation 5AC, Rocket Prism, PowerBeam</span></div>
              </ul>
            </div>
          </div>
        </div>

        <!-- 5. TOWER LIGHTNING & GROUNDING BLUEPRINT -->
        <div class="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
          <div class="mb-3">
            <span class="text-2xs font-bold text-emerald-400 font-mono">TOWER GROUNDING BLUEPRINT</span>
            <h3 class="text-base font-bold text-white flex items-center gap-2 mt-0.5">
              <span>🗼</span> المخطط الانسيابي لتأريض أبراج الاتصالات وحماية الصواعق
            </h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong class="text-cyan-400 block mb-1">1. أعلى البرج:</strong>
              <p class="text-2xs text-slate-300">تركيب مانع صواعق ETH-SP-G2 على بعد متر واحد من الهوائي وربط سلك أرضي بجسم البرج مباشرة.</p>
            </div>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong class="text-cyan-400 block mb-1">2. المسار النازل:</strong>
              <p class="text-2xs text-slate-300">تثبيت كابل ToughCable Carrier برباطات مقاومة للحرارة (UV Ties) موازياً لساق البرج المعدنية.</p>
            </div>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong class="text-cyan-400 block mb-1">3. مدخل المبنى:</strong>
              <p class="text-2xs text-slate-300">تركيب محقن حماية ثانٍ ETH-SP-G2 عند نقطة اختراق جدار غرفة السيرفرات لتفريغ أي شحنة متبقية.</p>
            </div>
            <div class="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <strong class="text-emerald-400 block mb-1">4. بئر التأريض:</strong>
              <p class="text-2xs text-slate-300">قضيب نحاسي صلب بطول 2.4 متر مدفون في التربة، مع قياس المقاومة الأرضية لتكون أقل من <strong>5 أوم (5Ω)</strong>.</p>
            </div>
          </div>
        </div>
      </div>
    `;
  },

  // TAB 3: Side-by-side Technical Comparison Matrix
  renderComparisonMatrixTab() {
    return `
      <div class="hw-matrix-portal">
        <!-- Table 1: Core Routers -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <span>🧠</span> مقارنة الراوترات المركزية (Core Routers Comparison)
            </h3>
            <span class="text-3xs text-cyan-400 font-mono">MikroTik RouterOS v7 Core Engine</span>
          </div>

          <div class="hw-table-container">
            <table class="hw-comparison-table">
              <thead>
                <tr>
                  <th>الجهاز</th>
                  <th>المعالج (CPU)</th>
                  <th>الذاكرة (RAM)</th>
                  <th>منافذ الـ SFP+ 10G</th>
                  <th>منافذ الـ Gigabit</th>
                  <th>قوة المعالجة (Throughput)</th>
                  <th>الاستخدام الميداني الموصى به</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-bold text-white flex items-center gap-1.5"><span class="text-cyan-400">▪</span> CCR2004-16G-2S+</td>
                  <td class="font-mono">Annapurna AL32400 (4-Core 1.7GHz ARM64)</td>
                  <td class="font-mono text-emerald-400">4 GB DDR4</td>
                  <td class="hw-table-hl">2x SFP+ (10 Gbps)</td>
                  <td class="font-mono">16x Gigabit RJ45</td>
                  <td class="hw-table-hl">15+ Gbps Routing</td>
                  <td>الراوتر المركزي الرئيسي لمقر الشركة وسيرفرات الـ ERP والـ BGP</td>
                </tr>
                <tr>
                  <td class="font-bold text-white flex items-center gap-1.5"><span class="text-blue-400">▪</span> RB5009UG+S+IN</td>
                  <td class="font-mono">Marvell Armada 7040 (4-Core 1.4GHz)</td>
                  <td class="font-mono text-emerald-400">1 GB DDR4</td>
                  <td class="hw-table-hl">1x SFP+ (10 Gbps)</td>
                  <td class="font-mono">7x 1G + 1x 2.5G</td>
                  <td class="hw-table-hl">10 Gbps Routing</td>
                  <td>راوتر الطوارئ والـ VRRP الرديف وراوتر الفروع الكبرى</td>
                </tr>
                <tr>
                  <td class="font-bold text-white flex items-center gap-1.5"><span class="text-slate-400">▪</span> hEX S (RB760iGS)</td>
                  <td class="font-mono">MediaTek MT7621A (2-Core 880MHz)</td>
                  <td class="font-mono">256 MB RAM</td>
                  <td class="font-mono text-slate-400">1x SFP (1 Gbps)</td>
                  <td class="font-mono">5x Gigabit RJ45</td>
                  <td class="font-mono">1.9 Gbps Routing</td>
                  <td>راوتر مكاتب الفروع الصغيرة ونقاط البيع المعزولة</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Table 2: Distribution & PoE Switches -->
        <div class="mb-8">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <span>🔀</span> مقارنة سويتشات التوزيع والـ PoE المدارة (Multi-Vendor Switches)
            </h3>
            <span class="text-3xs text-emerald-400 font-mono">Layer 2+ / Layer 3 Enterprise Switching</span>
          </div>

          <div class="hw-table-container">
            <table class="hw-comparison-table">
              <thead>
                <tr>
                  <th>طراز السويتش</th>
                  <th>الشركة</th>
                  <th>المنافذ والمنافذ الصاعدة (Uplinks)</th>
                  <th>ميزانية الـ PoE (Budget)</th>
                  <th>نوع الـ PoE</th>
                  <th>الميزة التشغيلية الأبرز</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-bold text-white">MikroTik CRS328-24P-4S+</td>
                  <td class="font-bold text-rose-400 font-mono">MikroTik</td>
                  <td class="font-mono">24x Gigabit + <span class="hw-table-hl">4x SFP+ 10G</span></td>
                  <td class="font-mono text-emerald-400 font-bold">500 واط (W)</td>
                  <td class="text-cyan-300">مزدوج: 802.3af/at + Passive 24V</td>
                  <td>الوحيد القادر على تغذية النانو (24V) والكاميرات (48V) معاً</td>
                </tr>
                <tr>
                  <td class="font-bold text-white">Cisco Catalyst 2960-X</td>
                  <td class="font-bold text-blue-400 font-mono">Cisco</td>
                  <td class="font-mono">24/48x Gigabit + 4x 1G SFP</td>
                  <td class="font-mono text-amber-400">370 واط (W)</td>
                  <td class="text-slate-300">Active PoE+ (802.3at)</td>
                  <td>استقرار وموثوقية عسكرية في مصانع الإنتاج وشبكات الـ SCADA</td>
                </tr>
                <tr>
                  <td class="font-bold text-white">TP-Link JetStream SG3428MP</td>
                  <td class="font-bold text-emerald-400 font-mono">TP-Link</td>
                  <td class="font-mono">24x Gigabit PoE+ + 4x SFP</td>
                  <td class="font-mono text-emerald-400">384 واط (W)</td>
                  <td class="text-slate-300">PoE+ (802.3af/at)</td>
                  <td>إدارة سحابية Omada وتغذية كاميرات المراقبة في فروع المبيعات</td>
                </tr>
                <tr>
                  <td class="font-bold text-white">D-Link DGS-1210-28P</td>
                  <td class="font-bold text-orange-400 font-mono">D-Link</td>
                  <td class="font-mono">24x Gigabit PoE + 4x Combo SFP</td>
                  <td class="font-mono text-amber-400">193 واط (قابلة للزيادة)</td>
                  <td class="text-slate-300">PoE+ (802.3at)</td>
                  <td>Auto Surveillance VLAN لعزل ومنح أولوية فورية لكاميرات NVR</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Table 3: Wireless Backhauls & CPEs -->
        <div>
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-base font-bold text-white flex items-center gap-2">
              <span>📡</span> مقارنة الهوائيات واللواقط اللاسلكية (Wireless PtP & PtMP)
            </h3>
            <span class="text-3xs text-amber-400 font-mono">airMAX AC / High Power Outdoor</span>
          </div>

          <div class="hw-table-container">
            <table class="hw-comparison-table">
              <thead>
                <tr>
                  <th>الجهاز</th>
                  <th>الشركة</th>
                  <th>التردد (Frequency)</th>
                  <th>كسب الهوائي (Gain)</th>
                  <th>أقصى مدى عملي</th>
                  <th>السرعة القصوى</th>
                  <th>نوع الحزمة والتوجيه</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="font-bold text-white">Rocket Prism 5AC Gen2</td>
                  <td class="font-bold text-cyan-400 font-mono">Ubiquiti</td>
                  <td class="font-mono">5150 - 5875 MHz</td>
                  <td class="font-mono text-amber-400">22 dBi (مع سيكتور)</td>
                  <td class="font-mono text-emerald-400">15 كم (PtMP)</td>
                  <td class="hw-table-hl">500+ Mbps</td>
                  <td>قطاعية عريضة 120° لبث الإنترنت لكافة الفروع</td>
                </tr>
                <tr>
                  <td class="font-bold text-white">PowerBeam 5AC ISO 400</td>
                  <td class="font-bold text-cyan-400 font-mono">Ubiquiti</td>
                  <td class="font-mono">5150 - 5875 MHz</td>
                  <td class="font-mono text-amber-400">25 dBi (صحن مقعر)</td>
                  <td class="font-mono text-emerald-400">25 كم (PtP)</td>
                  <td class="hw-table-hl">450+ Mbps</td>
                  <td>حزمة قلمية ضيقة جداً 8° لعزل التشويش بين نقطتين</td>
                </tr>
                <tr>
                  <td class="font-bold text-white">NanoStation 5AC (NS-5AC)</td>
                  <td class="font-bold text-cyan-400 font-mono">Ubiquiti</td>
                  <td class="font-mono">5150 - 5875 MHz</td>
                  <td class="font-mono text-amber-400">16 dBi لوحي</td>
                  <td class="font-mono text-emerald-400">5 كم</td>
                  <td class="hw-table-hl">450+ Mbps</td>
                  <td>زاوية استقبال 45° مع منفذين Gigabit لتمرير PoE للكاميرا</td>
                </tr>
                <tr>
                  <td class="font-bold text-white">Netis WF2322 Outdoor</td>
                  <td class="font-bold text-amber-400 font-mono">Netis</td>
                  <td class="font-mono">2.4 - 2.4835 GHz</td>
                  <td class="font-mono text-amber-400">12 dBi اتجاهي</td>
                  <td class="font-mono">3 كم</td>
                  <td class="font-mono">300 Mbps</td>
                  <td>تغطية الساحات الخارجية والمستودعات لقارئات الباركود</td>
                </tr>
                <tr>
                  <td class="font-bold text-white">TP-Link Pharos CPE510</td>
                  <td class="font-bold text-emerald-400 font-mono">TP-Link</td>
                  <td class="font-mono">5150 - 5850 MHz</td>
                  <td class="font-mono text-amber-400">13 dBi لوحي</td>
                  <td class="font-mono">5 كم</td>
                  <td class="font-mono">300 Mbps</td>
                  <td>بديل اقتصادي لربط المكاتب والموازين الشاحنات بالبرج</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  },

  // Intelligent Hardware Finder (Supports ID, image path, name, or keywords)
  findHardware(identifier) {
    if (!identifier || !NETWORK_DATA || !NETWORK_DATA.hardware) return null;
    const idStr = String(identifier).trim().toLowerCase();
    
    // 1. Direct ID match
    let hw = NETWORK_DATA.hardware.find(h => h.id.toLowerCase() === idStr);
    if (hw) return hw;

    // 2. Direct Image match or SVG match
    hw = NETWORK_DATA.hardware.find(h => 
      (h.image && h.image.toLowerCase().includes(idStr)) ||
      (h.svg && h.svg.toLowerCase().includes(idStr)) ||
      idStr.includes((h.image || '').toLowerCase())
    );
    if (hw) return hw;

    // 3. Exact Name match
    hw = NETWORK_DATA.hardware.find(h => h.name.toLowerCase() === idStr);
    if (hw) return hw;

    // 4. Name contains or is contained in identifier
    hw = NETWORK_DATA.hardware.find(h => 
      h.name.toLowerCase().includes(idStr) || idStr.includes(h.name.toLowerCase())
    );
    if (hw) return hw;

    // 5. Keyword token match
    const keywords = [
      { keys: ["ccr", "2004"], id: "ccr2004" },
      { keys: ["hex", "760"], id: "hex-s" },
      { keys: ["crs", "328"], id: "crs328" },
      { keys: ["cap", "ax"], id: "cap-ax" },
      { keys: ["rocket", "prism"], id: "rocket-prism" },
      { keys: ["powerbeam", "iso"], id: "powerbeam" },
      { keys: ["nanostation", "loco"], id: "nanostation-loco5ac" },
      { keys: ["nanostation", "5ac"], id: "nanostation-5ac" },
      { keys: ["nanostation"], id: "nanostation-5ac" },
      { keys: ["cisco", "2960"], id: "cisco-2960x" },
      { keys: ["sg3428", "jetstream"], id: "tplink-sg3428mp" },
      { keys: ["tplink", "switch"], id: "tplink-sg3428mp" },
      { keys: ["dgs", "1210"], id: "dlink-dgs1210" },
      { keys: ["dir", "842"], id: "dlink-dir842" },
      { keys: ["archer", "c6"], id: "tplink-archer-c6" },
      { keys: ["wr840"], id: "tplink-wr840n" },
      { keys: ["cpe510", "pharos"], id: "tplink-cpe510" },
      { keys: ["netis", "2322"], id: "netis-wf2322" },
      { keys: ["tenda", "o3"], id: "tenda-o3" },
      { keys: ["cable", "stp", "toughcable", "surge", "eth-sp"], id: "cable-stp" },
      { keys: ["poe", "injector", "24v"], id: "poe-inj" }
    ];

    for (const kw of keywords) {
      if (kw.keys.some(k => idStr.includes(k))) {
        const found = NETWORK_DATA.hardware.find(h => h.id === kw.id);
        if (found) return found;
      }
    }

    return null;
  },

  // ENTERPRISE PRODUCT DETAIL MODAL (عرض الصورة الحقيقية مع كافة البيانات والمواصفات)
  openProductModal(identifier) {
    const hw = this.findHardware(identifier);

    // If not a hardware product, but an image URL, open Lightbox
    if (!hw) {
      if (typeof identifier === 'string' && (identifier.endsWith('.jpg') || identifier.endsWith('.png') || identifier.endsWith('.svg'))) {
        this.openImageLightbox(identifier, 'معاينة الصورة');
        return;
      }
      return;
    }

    let modal = document.getElementById('product-details-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'product-details-modal';
      modal.className = 'fixed inset-0 z-[2000] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto';
      modal.onclick = (e) => {
        if (e.target === modal || e.target.classList.contains('product-modal-close-btn')) {
          modal.remove();
        }
      };
      // ESC key closes modal
      window.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
          modal.remove();
          window.removeEventListener('keydown', escHandler);
        }
      });
      document.body.appendChild(modal);
    }

    const specsEntries = Object.entries(hw.specs || {});

    modal.innerHTML = `
      <div class="relative w-full max-w-4xl bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl overflow-hidden my-auto animate-fade-in text-right" dir="rtl" onclick="event.stopPropagation()">
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-950/90">
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-xl">📦</span>
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded text-3xs font-bold font-mono uppercase bg-cyan-950 text-cyan-300 border border-cyan-800">${hw.brand}</span>
                <span class="text-3xs text-slate-400 font-mono">${hw.category}</span>
              </div>
              <h2 class="text-base sm:text-lg font-black text-white leading-tight mt-0.5">${hw.name}</h2>
            </div>
          </div>
          <button class="product-modal-close-btn w-9 h-9 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center font-bold text-base transition-all border border-slate-700" onclick="document.getElementById('product-details-modal')?.remove()" title="إغلاق (Esc)">✕</button>
        </div>

        <!-- Modal Body (Two columns on desktop, stacked on mobile) -->
        <div class="grid grid-cols-1 md:grid-cols-12 gap-0 max-h-[78vh] overflow-y-auto">
          <!-- Left Column: Large Image & Badges -->
          <div class="md:col-span-5 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-l border-slate-800 relative">
            <div class="w-full flex justify-center items-center py-4 min-h-[260px] h-[300px] sm:h-[350px] max-h-[380px] cursor-pointer group" onclick="App.openImageLightbox('${hw.image || hw.svg}', '${hw.name} (${hw.brand})', '${hw.role}')" title="انقر لتكبير الصورة بملء الشاشة">
              <img src="${hw.image || hw.svg}" alt="${hw.name}" onerror="this.src='${hw.svg}'" class="max-h-full max-w-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300">
            </div>

            <button class="w-full mt-2 py-2 px-3 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-3xs font-bold border border-slate-800 transition-all flex items-center justify-center gap-1.5 shadow-sm" onclick="App.openImageLightbox('${hw.image || hw.svg}', '${hw.name} (${hw.brand})', '${hw.role}')">
              <span>🔍</span> عرض الصورة بملء الشاشة فائق الدقة
            </button>

            <div class="w-full mt-3 flex items-center justify-between text-3xs border-t border-slate-800/80 pt-3">
              <span class="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800 px-2.5 py-1 rounded-full">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> صورة حقيقية للمنتج
              </span>
              <span class="text-slate-400 font-mono">${hw.badge || ''}</span>
            </div>
          </div>

          <!-- Right Column: Full Technical Data -->
          <div class="md:col-span-7 p-5 sm:p-6 space-y-4">
            <!-- Enterprise Role -->
            <div class="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
              <h4 class="text-xs font-bold text-cyan-400 mb-1 flex items-center gap-1.5">
                <span>🎯</span> الدور والوظيفة الهندسية في منظومة الشبكة:
              </h4>
              <p class="text-xs text-slate-200 leading-relaxed">${hw.role}</p>
            </div>

            <!-- Technical Specifications -->
            <div>
              <h4 class="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                <span>⚙️</span> المواصفات والخصائص العتادية التفصيلية:
              </h4>
              <div class="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800/80 text-2xs">
                ${specsEntries.map(([k, v]) => `
                  <div class="flex justify-between items-center px-3.5 py-2">
                    <span class="text-slate-400 font-medium capitalize">${k}:</span>
                    <strong class="text-slate-100 font-mono text-left direction-ltr text-3xs sm:text-2xs max-w-[65%]">${v}</strong>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Field Deployment Notes -->
            <div class="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800">
              <h4 class="text-xs font-bold text-amber-400 mb-1 flex items-center gap-1.5">
                <span>📍</span> مكان وكيفية النشر والتثبيت الميداني:
              </h4>
              <p class="text-2xs text-slate-300 leading-relaxed">${hw.deployment}</p>
            </div>

            <!-- Wiring Guide -->
            ${hw.wiringGuide && hw.wiringGuide.length > 0 ? `
              <div>
                <h4 class="text-xs font-bold text-emerald-400 mb-2 flex items-center gap-1.5">
                  <span>🔌</span> إرشادات التوصيل والتأريض (Wiring & Ports):
                </h4>
                <ul class="space-y-1.5 bg-slate-950/90 p-3 rounded-xl border border-slate-800 text-2xs text-slate-300">
                  ${hw.wiringGuide.map(g => `<li class="flex items-start gap-1.5"><span class="text-emerald-400">▪</span><span>${g}</span></li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="flex items-center justify-between px-5 py-3.5 border-t border-slate-800 bg-slate-950 flex-wrap gap-2">
          <button class="h-10 px-4 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-cyan-900/30" onclick="App.copyProductSpecs('${hw.id}')">
            <span>📋</span> نسخ بطاقة مواصفات الجهاز
          </button>
          <button class="h-10 px-5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700" onclick="document.getElementById('product-details-modal')?.remove()">
            إغلاق النافذة
          </button>
        </div>
      </div>
    `;
  },

  // Standalone High-Res Image Lightbox Modal
  openImageLightbox(src, title, desc) {
    let lb = document.getElementById('global-image-lightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'global-image-lightbox';
      lb.className = 'fixed inset-0 z-[3000] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4';
      lb.onclick = (e) => {
        if (e.target === lb || e.target.classList.contains('lightbox-close-btn')) {
          lb.remove();
        }
      };
      window.addEventListener('keydown', function escLbHandler(e) {
        if (e.key === 'Escape') {
          lb.remove();
          window.removeEventListener('keydown', escLbHandler);
        }
      });
      document.body.appendChild(lb);
    }
    lb.innerHTML = `
      <div class="relative max-w-5xl w-full max-h-[92vh] flex flex-col items-center my-auto animate-fade-in text-right" dir="rtl" onclick="event.stopPropagation()">
        <div class="w-full flex justify-between items-center mb-3 px-2">
          <div>
            <h3 class="text-white text-base sm:text-lg font-bold">${title || 'معاينة الصورة الحقيقية فائق الدقة'}</h3>
            ${desc ? `<p class="text-xs text-slate-400 mt-0.5">${desc}</p>` : ''}
          </div>
          <button class="lightbox-close-btn w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center font-bold text-lg border border-slate-700 transition-all" onclick="document.getElementById('global-image-lightbox')?.remove()" title="إغلاق (Esc)">✕</button>
        </div>
        <div class="w-full p-4 bg-slate-950/80 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-center max-h-[80vh] overflow-hidden">
          <img src="${src}" alt="${title || 'Preview'}" class="max-h-[75vh] max-w-full object-contain rounded-xl drop-shadow-2xl">
        </div>
      </div>
    `;
  },

  openProductModalByNode(nodeId) {
    const mapping = {
      "core_router_ccr": "ccr2004",
      "backup_router_rb": "hex-s",
      "core_switch_crs": "crs328",
      "hq_ap_wifi6": "cap-ax",
      "rocket_sector_1": "rocket-prism",
      "rocket_sector_2": "rocket-prism",
      "airfiber_dish_hq": "powerbeam",
      "powerbeam_dish_hq": "powerbeam",
      "tower_poe_rack": "poe-inj",
      "tower_surge_g2": "cable-stp",
      "branch_nano_ap": "nanostation-5ac",
      "branch_poe_inj": "poe-inj",
      "branch_sw_cisco": "cisco-2960x",
      "branch_sw_tplink": "tplink-sg3428mp",
      "branch_router_tplink": "tplink-archer-c6",
      "branch_ap_dlink": "dlink-dir842",
      "wh_dish_pbeam": "powerbeam",
      "wh_surge_g2": "cable-stp",
      "wh_switch_dlink": "dlink-dgs1210",
      "wh_netis_cpe": "netis-wf2322",
      "wh_tplink_cpe": "tplink-cpe510",
      "factory_dish_af": "powerbeam",
      "factory_sw_cisco": "cisco-2960x",
      "factory_ap_tenda": "tenda-o3",
      "cpe_nano_br1": "nanostation-5ac",
      "sw_cisco_br1": "cisco-2960x",
      "cpe_nano_br2": "nanostation-5ac",
      "sw_tplink_br2": "tplink-sg3428mp",
      "ap_dlink_br2": "dlink-dir842",
      "cpe_powerbeam_wh": "powerbeam",
      "sw_dlink_wh": "dlink-dgs1210",
      "cpe_netis_wh": "netis-wf2322",
      "cpe_tenda_wh": "tenda-o3",
      "cpe_nano_kiosk1": "nanostation-loco5ac",
      "ap_tplink_kiosk1": "tplink-wr840n",
      "cpe_tplink_kiosk2": "tplink-cpe510",
      "ap_archer_kiosk2": "tplink-archer-c6",
      "remote_vpn_gw": "ccr2004"
    };
    const hwId = mapping[nodeId] || "ccr2004";
    this.openProductModal(hwId);
  },

  copyProductSpecs(hwId) {
    const hw = this.findHardware(hwId);
    if (!hw) return;
    const text = `=== بطاقة مواصفات الجهاز: ${hw.name} (${hw.brand}) ===\nالوظيفة في الشبكة: ${hw.role}\nالتصنيف: ${hw.category}\n` +
      Object.entries(hw.specs || {}).map(([k,v]) => `${k}: ${v}`).join('\n') +
      `\nملاحظات النشر: ${hw.deployment}\nإرشادات التوصيل:\n` + (hw.wiringGuide || []).join('\n');
    navigator.clipboard.writeText(text).then(() => {
      alert(`تم نسخ مواصفات الجهاز [${hw.name}] بنجاح إلى الحافظة! 📋`);
    });
  },

  previewImage(imgSrc, title) {
    const hw = this.findHardware(title || imgSrc);
    if (hw) {
      this.openProductModal(hw.id);
    } else {
      this.openImageLightbox(imgSrc, title);
    }
  },

  filterHardware(vendor) {
    this.activeHardwareFilter = vendor;
    this.renderHardwareCatalog();
  },

  // Preset Handlers for One-Click Calculator Demos
  setSubnetPreset(ip, prefix) {
    const ipInput = document.getElementById('calc-ip-input');
    const prefixInput = document.getElementById('calc-prefix-input');
    if (ipInput) ipInput.value = ip;
    if (prefixInput) prefixInput.value = prefix;
    const btn = document.getElementById('btn-calc-subnet');
    if (btn) btn.click();
  },

  setLinkPreset(d, f, ptx, gtx, grx, obs) {
    const distInput = document.getElementById('link-dist-input');
    const freqInput = document.getElementById('link-freq-input');
    const txpInput = document.getElementById('link-txp-input');
    const gtxInput = document.getElementById('link-gtx-input');
    const grxInput = document.getElementById('link-grx-input');
    const obsInput = document.getElementById('link-obs-input');

    if (distInput) distInput.value = d;
    if (freqInput) freqInput.value = f;
    if (txpInput) txpInput.value = ptx;
    if (gtxInput) gtxInput.value = gtx;
    if (grxInput) grxInput.value = grx;
    if (obsInput) obsInput.value = obs;

    const btn = document.getElementById('btn-calc-link');
    if (btn) btn.click();
  },

  setScriptPreset(hostname, wanMode, down, up) {
    const hostInput = document.getElementById('script-hostname');
    const wanInput = document.getElementById('script-wan-mode');
    const downInput = document.getElementById('script-down-speed');
    const upInput = document.getElementById('script-up-speed');

    if (hostInput) hostInput.value = hostname;
    if (wanInput) wanInput.value = wanMode;
    if (downInput) downInput.value = down;
    if (upInput) upInput.value = up;

    const btn = document.getElementById('btn-generate-script');
    if (btn) btn.click();
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
