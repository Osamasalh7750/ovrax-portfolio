/**
 * NetworkArchitect Hub - WinBox & airOS Simulators Engine
 * Provides interactive, high-fidelity simulations of RouterOS v7 WinBox
 * and Ubiquiti airOS 8 interfaces with live state, traffic graphs, and terminal.
 */

const Simulators = {
  // Simulator State
  state: {
    winbox: {
      activeTab: "interfaces",
      activeInterface: "sfp-sfpplus1",
      terminalHistory: [
        "  MMM      MMM       KKK                          TTTTTTTTTTT      KKK",
        "  MMMM    MMMM       KKK                              TTT          KKK",
        "  MMM MMMM MMM  III  KKK  KKK  RRRRRR     OOOOOO      TTT    III   KKK  KKK",
        "  MMM  MM  MMM  III  KKKKK     RRR  RRR  OOO  OOO     TTT    III   KKKKK",
        "  MMM      MMM  III  KKK KKK   RRRRRR    OOO  OOO     TTT    III   KKK KKK",
        "  MMM      MMM  III  KKK  KKK  RRR  RRR   OOOOOO      TTT    III   KKK  KKK",
        "",
        "MikroTik RouterOS 7.14 (c) 1999-2026       https://mikrotik.com/",
        "Press F1 or 'help' for available commands. Try 'ip address print' or 'ping 8.8.8.8'."
      ],
      terminalInput: "",
      interfaces: [
        { name: "sfp-sfpplus1", type: "Ethernet (10G Fiber)", role: "WAN1 Primary", status: "R", rxBytes: 48921000, txBytes: 12450000, rxRate: "142 Mbps", txRate: "38 Mbps" },
        { name: "sfp-sfpplus2", type: "Ethernet (10G Fiber)", role: "Trunk to CRS328", status: "R", rxBytes: 18450000, txBytes: 39500000, rxRate: "45 Mbps", txRate: "128 Mbps" },
        { name: "ether1", type: "Ethernet (1G)", role: "WAN2 Backup LTE", status: "R", rxBytes: 120000, txBytes: 45000, rxRate: "0.2 Mbps", txRate: "0.1 Mbps" },
        { name: "ether2", type: "Ethernet (1G)", role: "Master Tower AP", status: "R", rxBytes: 15400000, txBytes: 28900000, rxRate: "35 Mbps", txRate: "85 Mbps" },
        { name: "ether3", type: "Ethernet (1G)", role: "ERP & Servers", status: "R", rxBytes: 8200000, txBytes: 14100000, rxRate: "22 Mbps", txRate: "40 Mbps" },
        { name: "bridge-core", type: "Bridge (Hardware)", role: "VLAN Master", status: "R", rxBytes: 42050000, txBytes: 82500000, rxRate: "102 Mbps", txRate: "253 Mbps" }
      ],
      leases: [
        { ip: "10.10.30.105", mac: "DC:A6:32:8B:11:4F", host: "PC-FINANCE-01", vlan: "VLAN30", status: "bound", time: "2d 14h" },
        { ip: "10.10.30.106", mac: "74:D4:35:E1:90:22", host: "MACBOOK-CEO", vlan: "VLAN30", status: "bound", time: "1d 08h" },
        { ip: "10.10.40.12", mac: "00:08:5D:88:14:AA", host: "YEALINK-T46U", vlan: "VLAN40", status: "bound", time: "6d 22h" },
        { ip: "10.10.50.44", mac: "BC:BA:C7:99:43:01", host: "HIKVISION-CAM-01", vlan: "VLAN50", status: "bound", time: "12d 04h" },
        { ip: "10.10.60.85", mac: "FE:33:41:A2:7C:99", host: "GUEST-IPHONE15", vlan: "VLAN60", status: "bound", time: "01h 12m" }
      ]
    },
    airos: {
      activeTab: "dashboard",
      mode: "ap-ptmp", // ap-ptmp, station-ptp
      ssid: "CORP_TOWER_BACKHAUL_5G",
      frequency: "5785",
      channelWidth: "40",
      txPower: "24",
      security: "WPA2-AES",
      psk: "EnterpriseMasterKey#2026",
      signalDbm: -54,
      chain0: -54,
      chain1: -55,
      noiseFloor: -101,
      ccq: 99.4,
      airmaxQuality: 98,
      airmaxCapacity: 86,
      throughput: "348 Mbps",
      surveyScanning: false,
      surveyResults: [
        { ssid: "CORP_TOWER_BACKHAUL_5G", mac: "B4:FB:E4:3A:90:12", signal: -54, freq: "5785 MHz", width: "40 MHz", sec: "WPA2" },
        { ssid: "ISP_RELAY_TOWER_SOUTH", mac: "44:D9:E7:12:44:88", signal: -79, freq: "5240 MHz", width: "20 MHz", sec: "WPA2" },
        { ssid: "NEIGHBOR_FARM_PTP", mac: "00:27:22:90:81:AA", signal: -86, freq: "5820 MHz", width: "40 MHz", sec: "WPA2" }
      ]
    }
  },

  // WinBox Render Functions
  renderWinbox(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { activeTab, interfaces, leases, terminalHistory } = this.state.winbox;

    container.innerHTML = `
      <div class="winbox-window">
        <!-- WinBox Titlebar -->
        <div class="winbox-titlebar">
          <div class="winbox-title-left">
            <span class="winbox-logo-badge">ROUTEROS</span>
            <span class="winbox-session-name">admin@HQ-CCR2004-CORE (10.10.10.1) - RouterOS v7.14 [x86_64]</span>
          </div>
          <div class="winbox-controls">
            <button class="winbox-btn-safe">Safe Mode [OFF]</button>
            <span class="winbox-window-btn minimize">_</span>
            <span class="winbox-window-btn maximize">□</span>
            <span class="winbox-window-btn close">✕</span>
          </div>
        </div>

        <!-- WinBox Workspace Body -->
        <div class="winbox-body">
          <!-- Left Navigation Menu -->
          <div class="winbox-menu">
            <button class="wb-menu-item ${activeTab === 'interfaces' ? 'active' : ''}" onclick="Simulators.setWinboxTab('interfaces')">
              <span class="wb-icon">🔌</span> Interfaces
            </button>
            <button class="wb-menu-item ${activeTab === 'addresses' ? 'active' : ''}" onclick="Simulators.setWinboxTab('addresses')">
              <span class="wb-icon">🌐</span> IP -> Addresses
            </button>
            <button class="wb-menu-item ${activeTab === 'dhcp' ? 'active' : ''}" onclick="Simulators.setWinboxTab('dhcp')">
              <span class="wb-icon">📋</span> IP -> DHCP Server
            </button>
            <button class="wb-menu-item ${activeTab === 'firewall' ? 'active' : ''}" onclick="Simulators.setWinboxTab('firewall')">
              <span class="wb-icon">🛡️</span> IP -> Firewall
            </button>
            <button class="wb-menu-item ${activeTab === 'queues' ? 'active' : ''}" onclick="Simulators.setWinboxTab('queues')">
              <span class="wb-icon">⚡</span> Queues (PCQ)
            </button>
            <button class="wb-menu-item ${activeTab === 'terminal' ? 'active' : ''}" onclick="Simulators.setWinboxTab('terminal')">
              <span class="wb-icon">💻</span> New Terminal
            </button>
            <div class="wb-menu-divider"></div>
            <button class="wb-menu-item" onclick="Simulators.rebootRouter()">
              <span class="wb-icon">🔄</span> System Reboot
            </button>
          </div>

          <!-- Main Content Area -->
          <div class="winbox-content">
            ${this.renderWinboxTabContent(activeTab)}
          </div>
        </div>

        <!-- WinBox Statusbar -->
        <div class="winbox-statusbar">
          <span>CPU: 8% (4x 1.7GHz)</span>
          <span>Free Memory: 3.6 GB / 4 GB</span>
          <span>Uptime: 48d 16:32:10</span>
          <span>RouterOS v7.14 (stable)</span>
        </div>
      </div>
    `;

    // Hook terminal key handler if active
    if (activeTab === 'terminal') {
      const termInput = document.getElementById('wb-term-input');
      if (termInput) {
        termInput.focus();
        termInput.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            this.handleTerminalCommand(termInput.value);
            termInput.value = '';
          }
        });
      }
    }
  },

  renderWinboxTabContent(tab) {
    const { interfaces, leases, terminalHistory } = this.state.winbox;

    if (tab === "interfaces") {
      return `
        <div class="wb-panel">
          <div class="wb-panel-header">
            <h3>قائمة واجهات الشبكة (Interface List)</h3>
            <span class="wb-badge">6 واجهات نشطة</span>
          </div>
          <div class="wb-table-wrapper">
            <table class="wb-table">
              <thead>
                <tr>
                  <th>الحالة</th>
                  <th>اسم المنفذ</th>
                  <th>النوع</th>
                  <th>الدور في الشبكة</th>
                  <th>معدل الاستقبال (Rx)</th>
                  <th>معدل الإرسال (Tx)</th>
                </tr>
              </thead>
              <tbody>
                ${interfaces.map(iface => `
                  <tr class="wb-table-row" onclick="Simulators.selectInterface('${iface.name}')">
                    <td><span class="status-indicator running">${iface.status}</span></td>
                    <td class="font-bold font-mono text-cyan-400">${iface.name}</td>
                    <td>${iface.type}</td>
                    <td><span class="wb-role-tag">${iface.role}</span></td>
                    <td class="font-mono text-emerald-400">${iface.rxRate}</td>
                    <td class="font-mono text-sky-400">${iface.txRate}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          <div class="wb-callout mt-4">
            <p class="text-xs text-slate-400">💡 <strong>معلومة هندسية:</strong> الرمز <code>R</code> يرمز إلى (Running) ويعني أن الطبقة الفيزيائية (Layer 1 Link) نشطة والجهاز موصول كهربائياً بنجاح.</p>
          </div>
        </div>
      `;
    }

    if (tab === "addresses") {
      return `
        <div class="wb-panel">
          <div class="wb-panel-header">
            <h3>جدول العناوين الافتراضية والـ VLANs (IP Addresses)</h3>
          </div>
          <div class="wb-table-wrapper">
            <table class="wb-table">
              <thead>
                <tr>
                  <th>عنوان الـ IP / النطاق</th>
                  <th>عنوان الشبكة (Network)</th>
                  <th>الواجهة (Interface)</th>
                  <th>الوصف (Comment)</th>
                </tr>
              </thead>
              <tbody>
                <tr><td class="font-mono text-amber-400">197.200.15.22/29</td><td class="font-mono">197.200.15.20</td><td>sfp-sfpplus1</td><td>WAN1 Fiber Public IP</td></tr>
                <tr><td class="font-mono text-cyan-400">10.10.10.1/24</td><td class="font-mono">10.10.10.0</td><td>VLAN10_MGMT</td><td>إدارة الراوترات والسويتشات</td></tr>
                <tr><td class="font-mono text-blue-400">10.10.20.1/24</td><td class="font-mono">10.10.20.0</td><td>VLAN20_SRV</td><td>مزرعة خوادم الـ ERP والـ NVR</td></tr>
                <tr><td class="font-mono text-emerald-400">10.10.30.1/23</td><td class="font-mono">10.10.30.0</td><td>VLAN30_STAFF</td><td>شبكة حواسيب الموظفين (508 جهاز)</td></tr>
                <tr><td class="font-mono text-purple-400">10.10.40.1/24</td><td class="font-mono">10.10.40.0</td><td>VLAN40_VOIP</td><td>هواتف IP ومقسم السنترال</td></tr>
                <tr><td class="font-mono text-rose-400">10.10.50.1/24</td><td class="font-mono">10.10.50.0</td><td>VLAN50_CCTV</td><td>كاميرات المراقبة الأمنية</td></tr>
                <tr><td class="font-mono text-green-400">10.10.60.1/23</td><td class="font-mono">10.10.60.0</td><td>VLAN60_GUEST</td><td>شبكة الزوار والضيوف المعزولة</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (tab === "dhcp") {
      return `
        <div class="wb-panel">
          <div class="wb-panel-header">
            <h3>أجهزة الموظفين المتصلة لحظياً (Active DHCP Leases)</h3>
            <span class="wb-badge text-emerald-400">5 أجهزة متصلة في العرض</span>
          </div>
          <div class="wb-table-wrapper">
            <table class="wb-table">
              <thead>
                <tr>
                  <th>عنوان IP الموزع</th>
                  <th>عنوان الماك (MAC Address)</th>
                  <th>اسم الحاسوب المضيف</th>
                  <th>الشبكة الفرعية</th>
                  <th>الحالة</th>
                  <th>وقت التأجير المتبقي</th>
                </tr>
              </thead>
              <tbody>
                ${leases.map(lease => `
                  <tr>
                    <td class="font-mono text-cyan-400 font-bold">${lease.ip}</td>
                    <td class="font-mono text-slate-300">${lease.mac}</td>
                    <td class="text-white">${lease.host}</td>
                    <td><span class="wb-vlan-tag">${lease.vlan}</span></td>
                    <td><span class="status-indicator running">${lease.status}</span></td>
                    <td class="font-mono text-slate-400">${lease.time}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (tab === "firewall") {
      return `
        <div class="wb-panel">
          <div class="wb-panel-header">
            <h3>قواعد جدار الحماية والـ NAT (Firewall Rules)</h3>
          </div>
          <div class="wb-table-wrapper">
            <table class="wb-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>السلسلة (Chain)</th>
                  <th>الإجراء (Action)</th>
                  <th>الواجهة / البروتوكول</th>
                  <th>الحزم التي طوبقت</th>
                  <th>الوصف الأمني</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>0</td><td class="font-mono">srcnat</td><td><span class="wb-action-tag masquerade">masquerade</span></td><td>out: WAN</td><td class="font-mono text-emerald-400">1.8M pkts</td><td>ترجمة العناوين الافتراضية للإنترنت</td></tr>
                <tr><td>1</td><td class="font-mono">input</td><td><span class="wb-action-tag drop">drop</span></td><td>state: invalid</td><td class="font-mono text-rose-400">14.2K pkts</td><td>إسقاط الحزم التالفة والمزورة</td></tr>
                <tr><td>2</td><td class="font-mono">input</td><td><span class="wb-action-tag accept">accept</span></td><td>state: established,related</td><td class="font-mono text-emerald-400">8.4M pkts</td><td>السماح بالاتصالات القائمة والموثوقة</td></tr>
                <tr><td>3</td><td class="font-mono">input</td><td><span class="wb-action-tag drop">drop</span></td><td>in: WAN, port 53 (DNS)</td><td class="font-mono text-rose-400">2.1K pkts</td><td>منع استغلال الـ DNS في هجمات DDoS</td></tr>
                <tr><td>4</td><td class="font-mono">forward</td><td><span class="wb-action-tag drop">drop</span></td><td>VLAN60_GUEST -> VLAN20_SRV</td><td class="font-mono text-rose-400">42 pkts</td><td>عزل الضيوف عن خوادم الشركة</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (tab === "queues") {
      return `
        <div class="wb-panel">
          <div class="wb-panel-header">
            <h3>طابور التوزيع العادل الذكي (PCQ Dynamic Queues)</h3>
          </div>
          <div class="wb-queue-card">
            <div class="flex justify-between items-center mb-2">
              <span class="font-bold text-white text-sm">TOTAL-BANDWIDTH-FAIR (10.10.0.0/16)</span>
              <span class="font-mono text-xs text-emerald-400">Max: 50M Up / 200M Down</span>
            </div>
            <div class="wb-progress-bar-bg">
              <div class="wb-progress-bar-fill" style="width: 68%;">68% استهلاك لحظي (136 Mbps)</div>
            </div>
            <div class="mt-4 grid grid-cols-3 gap-2 text-xs">
              <div class="p-2 bg-slate-900 rounded border border-slate-700">
                <span class="text-slate-400 block">الخوارزمية المطبقة</span>
                <strong class="text-cyan-400">PCQ (Per Connection Queue)</strong>
              </div>
              <div class="p-2 bg-slate-900 rounded border border-slate-700">
                <span class="text-slate-400 block">حصة كل مستخدم نشط</span>
                <strong class="text-emerald-400">ديناميكية متساوية (12.4 Mbps)</strong>
              </div>
              <div class="p-2 bg-slate-900 rounded border border-slate-700">
                <span class="text-slate-400 block">اختناق الطوابير (Bufferbloat)</span>
                <strong class="text-green-400">0% معدوم</strong>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (tab === "terminal") {
      return `
        <div class="wb-terminal-container">
          <div class="wb-term-output" id="wb-term-logs">
            ${terminalHistory.map(line => `<div class="wb-term-line">${line}</div>`).join('')}
          </div>
          <div class="wb-term-prompt-line">
            <span class="wb-term-prompt">[admin@HQ-CCR2004] &gt;&nbsp;</span>
            <input type="text" id="wb-term-input" class="wb-term-input" autocomplete="off" spellcheck="false" placeholder="اكتب أمراً واضغط Enter...">
          </div>
        </div>
      `;
    }

    return "";
  },

  setWinboxTab(tab) {
    this.state.winbox.activeTab = tab;
    this.renderWinbox("winbox-container");
  },

  handleTerminalCommand(cmd) {
    cmd = cmd.trim();
    if (!cmd) return;

    this.state.winbox.terminalHistory.push(`[admin@HQ-CCR2004] > ${cmd}`);

    const lower = cmd.toLowerCase();
    if (lower === "help" || lower === "?") {
      this.state.winbox.terminalHistory.push(
        "Available commands in simulator:",
        "  ip address print      - عرض قائمة العناوين والـ VLANs",
        "  interface print       - عرض جميع المنافذ وحالتها",
        "  ping 8.8.8.8          - فحص الوصول للإنترنت الخارجي",
        "  system resource print - عرض بيانات المعالج والذاكرة",
        "  clear                 - مسح الشاشة"
      );
    } else if (lower === "clear") {
      this.state.winbox.terminalHistory = [];
    } else if (lower.includes("ip address print")) {
      this.state.winbox.terminalHistory.push(
        "Flags: X - disabled, I - invalid, D - dynamic",
        " #   ADDRESS            NETWORK         INTERFACE",
        " 0   197.200.15.22/29   197.200.15.20   sfp-sfpplus1",
        " 1   10.10.10.1/24      10.10.10.0      VLAN10_MGMT",
        " 2   10.10.20.1/24      10.10.20.0      VLAN20_SRV",
        " 3   10.10.30.1/23      10.10.30.0      VLAN30_STAFF",
        " 4   10.10.40.1/24      10.10.40.0      VLAN40_VOIP",
        " 5   10.10.50.1/24      10.10.50.0      VLAN50_CCTV",
        " 6   10.10.60.1/23      10.10.60.0      VLAN60_GUEST"
      );
    } else if (lower.includes("interface print")) {
      this.state.winbox.terminalHistory.push(
        "Flags: R - running, S - slave, D - dynamic",
        " #    NAME           TYPE       ACTUAL-MTU  MAC-ADDRESS",
        " 0 R  sfp-sfpplus1   ether      1500        B8:69:F4:11:A0:01",
        " 1 R  sfp-sfpplus2   ether      1500        B8:69:F4:11:A0:02",
        " 2 R  ether1         ether      1500        B8:69:F4:11:A0:03",
        " 3 R  ether2         ether      1500        B8:69:F4:11:A0:04",
        " 4 R  bridge-core    bridge     1500        B8:69:F4:11:A0:05"
      );
    } else if (lower.includes("ping")) {
      this.state.winbox.terminalHistory.push(
        "  SEQ HOST                                     SIZE TTL TIME  STATUS",
        "    0 8.8.8.8                                    56 118 12ms",
        "    1 8.8.8.8                                    56 118 11ms",
        "    2 8.8.8.8                                    56 118 13ms",
        "    3 8.8.8.8                                    56 118 12ms",
        "    sent=4 received=4 packet-loss=0% min-rtt=11ms avg-rtt=12ms max-rtt=13ms"
      );
    } else if (lower.includes("system resource print")) {
      this.state.winbox.terminalHistory.push(
        "                   uptime: 48d16h32m10s",
        "                  version: 7.14 (stable)",
        "               build-time: 2026-03-02",
        "              cpu-count: 4",
        "                cpu-load: 8%",
        "          free-memory: 3784.2MiB",
        "         total-memory: 4096.0MiB",
        "               board-name: CCR2004-16G-2S+"
      );
    } else {
      this.state.winbox.terminalHistory.push(`bad command name '${cmd}' (type 'help' for commands)`);
    }

    this.renderWinbox("winbox-container");
  },

  rebootRouter() {
    alert("جارٍ إعادة تشغيل الراوتر الافتراضي... (Rebooting Simulated Router)");
  },

  // Ubiquiti airOS 8 Render Functions
  renderAiros(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { activeTab, mode, ssid, frequency, channelWidth, txPower, signalDbm, chain0, chain1, noiseFloor, ccq, airmaxCapacity, airmaxQuality, surveyScanning, surveyResults } = this.state.airos;

    container.innerHTML = `
      <div class="airos-window">
        <!-- airOS Header -->
        <div class="airos-header">
          <div class="airos-header-left">
            <span class="airos-ubnt-logo">U</span>
            <span class="airos-device-name">Rocket Prism 5AC Gen2 - HQ Master Tower</span>
          </div>
          <div class="airos-header-tabs">
            <button class="airos-tab ${activeTab === 'dashboard' ? 'active' : ''}" onclick="Simulators.setAirosTab('dashboard')">Dashboard</button>
            <button class="airos-tab ${activeTab === 'wireless' ? 'active' : ''}" onclick="Simulators.setAirosTab('wireless')">Wireless</button>
            <button class="airos-tab ${activeTab === 'network' ? 'active' : ''}" onclick="Simulators.setAirosTab('network')">Network</button>
            <button class="airos-tab ${activeTab === 'tools' ? 'active' : ''}" onclick="Simulators.setAirosTab('tools')">Tools: Site Survey</button>
          </div>
          <div class="airos-header-right">
            <span class="airos-clock">5.8 GHz | airMAX AC</span>
          </div>
        </div>

        <!-- airOS Body -->
        <div class="airos-body">
          ${this.renderAirosTabContent(activeTab)}
        </div>
      </div>
    `;
  },

  renderAirosTabContent(tab) {
    const { mode, ssid, frequency, channelWidth, txPower, signalDbm, chain0, chain1, noiseFloor, ccq, airmaxCapacity, airmaxQuality, surveyResults } = this.state.airos;

    if (tab === "dashboard") {
      return `
        <div class="airos-dashboard-grid">
          <!-- Signal Gauge Box -->
          <div class="airos-metric-card">
            <div class="airos-card-title">إشارة الاستقبال (Signal Strength)</div>
            <div class="airos-big-metric text-emerald-400 font-mono">
              ${signalDbm} <span class="text-sm text-slate-400">dBm</span>
            </div>
            <div class="airos-chains-row">
              <span>Chain 0: <strong>${chain0} dBm</strong></span>
              <span>Chain 1: <strong>${chain1} dBm</strong></span>
            </div>
            <div class="airos-bar-bg mt-2">
              <div class="airos-bar-fill bg-emerald-500" style="width: 88%;"></div>
            </div>
            <p class="text-xs text-slate-400 mt-2">المستوى المثالي هندسياً (بين -50 إلى -65 dBm).</p>
          </div>

          <!-- Noise & SNR Box -->
          <div class="airos-metric-card">
            <div class="airos-card-title">أرضية الضجيج ونسبة الإشارة (Noise & SNR)</div>
            <div class="airos-big-metric text-cyan-400 font-mono">
              ${noiseFloor} <span class="text-sm text-slate-400">dBm</span>
            </div>
            <div class="airos-chains-row">
              <span>SNR: <strong class="text-emerald-400">${signalDbm - noiseFloor} dB</strong> (ممتاز &gt; 30dB)</span>
            </div>
            <div class="airos-bar-bg mt-2">
              <div class="airos-bar-fill bg-cyan-500" style="width: 95%;"></div>
            </div>
            <p class="text-xs text-slate-400 mt-2">تصفية الضوضاء النشطة airPrism تعمل بكفاءة.</p>
          </div>

          <!-- CCQ & Capacity Box -->
          <div class="airos-metric-card">
            <div class="airos-card-title">جودة نقل البيانات (Transmit CCQ)</div>
            <div class="airos-big-metric text-emerald-400 font-mono">
              ${ccq}%
            </div>
            <div class="airos-chains-row">
              <span>airMAX Quality: <strong>${airmaxQuality}%</strong></span>
              <span>Capacity: <strong>${airmaxCapacity}% (348M)</strong></span>
            </div>
            <div class="airos-bar-bg mt-2">
              <div class="airos-bar-fill bg-emerald-500" style="width: ${ccq}%;"></div>
            </div>
            <p class="text-xs text-slate-400 mt-2">معدل إعادة إرسال الحزم منخفض جداً (&lt; 1%).</p>
          </div>
        </div>

        <!-- RF Spectrum waterfall banner -->
        <div class="airos-spectrum-banner mt-4">
          <div class="flex justify-between items-center mb-2">
            <span class="font-bold text-xs text-slate-300">طيف التردد المباشر (airView Spectrum Real-time)</span>
            <span class="font-mono text-xs text-cyan-400">${frequency} MHz (عرض القناة: ${channelWidth} MHz)</span>
          </div>
          <div class="spectrum-visualizer-bar"></div>
        </div>
      `;
    }

    if (tab === "wireless") {
      return `
        <div class="airos-form-card">
          <h3 class="text-base font-bold text-white mb-4">إعدادات الراديو والتردد اللاسلكي (Wireless Settings)</h3>
          
          <div class="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block text-slate-400 mb-1">الوضع اللاسلكي (Wireless Mode)</label>
              <select class="airos-input" id="airos-mode-select" onchange="Simulators.updateAirosConfig()">
                <option value="ap-ptmp" ${mode === 'ap-ptmp' ? 'selected' : ''}>Access Point PtMP airMAX AC (محطة بث رئيسية)</option>
                <option value="station-ptp" ${mode === 'station-ptp' ? 'selected' : ''}>Station PtP (محطة استقبال للفرع)</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-400 mb-1">اسم شبكة البرج (SSID)</label>
              <input type="text" id="airos-ssid-input" class="airos-input" value="${ssid}" onchange="Simulators.updateAirosConfig()">
            </div>

            <div>
              <label class="block text-slate-400 mb-1">عرض القناة (Channel Width)</label>
              <select class="airos-input" id="airos-width-select" onchange="Simulators.updateAirosConfig()">
                <option value="20" ${channelWidth === '20' ? 'selected' : ''}>20 MHz (أفضل مقاومة للتشويش)</option>
                <option value="40" ${channelWidth === '40' ? 'selected' : ''}>40 MHz (الخيار المتوازن 300+ Mbps)</option>
                <option value="80" ${channelWidth === '80' ? 'selected' : ''}>80 MHz (سعات فائقة في الأجواء الهادئة)</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-400 mb-1">التردد التشغيلي (Operating Frequency)</label>
              <select class="airos-input" id="airos-freq-select" onchange="Simulators.updateAirosConfig()">
                <option value="5180" ${frequency === '5180' ? 'selected' : ''}>5180 MHz [UNII-1]</option>
                <option value="5500" ${frequency === '5500' ? 'selected' : ''}>5500 MHz [DFS Clean Band]</option>
                <option value="5785" ${frequency === '5785' ? 'selected' : ''}>5785 MHz [UNII-3 Recommended]</option>
                <option value="5825" ${frequency === '5825' ? 'selected' : ''}>5825 MHz [UNII-3 Upper]</option>
              </select>
            </div>

            <div>
              <label class="block text-slate-400 mb-1">قدرة الإرسال (Output Power): <strong id="airos-power-val">${txPower} dBm</strong></label>
              <input type="range" id="airos-power-range" min="0" max="27" value="${txPower}" class="w-full accent-cyan-400" oninput="document.getElementById('airos-power-val').innerText = this.value + ' dBm'; Simulators.updateAirosConfig()">
            </div>

            <div>
              <label class="block text-slate-400 mb-1">تشفير الأمان (Security)</label>
              <select class="airos-input">
                <option>WPA2-AES (موصى به هندسياً)</option>
              </select>
            </div>
          </div>

          <div class="mt-6 flex justify-end gap-3">
            <button class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs">تجاهل التغييرات</button>
            <button class="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded text-xs" onclick="alert('تم تطبيق إعدادات الراديو في جهاز airOS بنجاح!')">حفظ وتطبيق (Apply Changes)</button>
          </div>
        </div>
      `;
    }

    if (tab === "network") {
      return `
        <div class="airos-form-card">
          <h3 class="text-base font-bold text-white mb-4">إعدادات الشبكة وإدارة الجهاز (Network Configuration)</h3>
          <div class="grid grid-cols-2 gap-4 text-xs">
            <div>
              <label class="block text-slate-400 mb-1">نمط الشبكة (Network Role)</label>
              <select class="airos-input">
                <option selected>Bridge (جسر شفاف لنقل الـ VLANs دون تعديل)</option>
                <option>Router (توجيه و NAT خاص)</option>
              </select>
            </div>
            <div>
              <label class="block text-slate-400 mb-1">آي بي إدارة الجهاز (Management IP)</label>
              <input type="text" class="airos-input" value="10.10.10.25">
            </div>
            <div>
              <label class="block text-slate-400 mb-1">قناع الشبكة (Subnet Mask)</label>
              <input type="text" class="airos-input" value="255.255.255.0">
            </div>
            <div>
              <label class="block text-slate-400 mb-1">بوابة الميكروتك (Gateway IP)</label>
              <input type="text" class="airos-input" value="10.10.10.1">
            </div>
          </div>
          <div class="wb-callout mt-4">
            <p class="text-xs text-slate-300">💡 <strong>تنبيه هندسي:</strong> أجهزة الأبراج (NanoStation / Rocket) يجب أن تعمل دائماً بنمط <strong>Bridge</strong> لتمرير الـ VLANs وخوادم الـ DHCP من راوتر ميكروتك الرئيسي إلى أجهزة الفروع مباشرة دون عزل.</p>
          </div>
        </div>
      `;
    }

    if (tab === "tools") {
      return `
        <div class="airos-form-card">
          <div class="flex justify-between items-center mb-4">
            <div>
              <h3 class="text-base font-bold text-white">أداة مسح الأثير اللاسلكي (Site Survey Tool)</h3>
              <p class="text-xs text-slate-400">فحص البيئة المحيطة لكشف شبكات الأبراج المجاورة ومستوى الإشارة والترددات</p>
            </div>
            <button class="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded text-xs" onclick="Simulators.scanSiteSurvey()">
              🔍 بدء المسح (Scan Now)
            </button>
          </div>

          <div class="wb-table-wrapper">
            <table class="wb-table text-xs">
              <thead>
                <tr>
                  <th>اسم الشبكة (SSID)</th>
                  <th>عنوان الماك (BSSID)</th>
                  <th>قوة الإشارة</th>
                  <th>التردد المستخدم</th>
                  <th>عرض القناة</th>
                  <th>التشفير</th>
                  <th>الإجراء</th>
                </tr>
              </thead>
              <tbody>
                ${surveyResults.map(res => `
                  <tr>
                    <td class="font-bold text-white">${res.ssid}</td>
                    <td class="font-mono text-slate-400">${res.mac}</td>
                    <td class="font-mono ${res.signal > -65 ? 'text-emerald-400' : 'text-amber-400'} font-bold">${res.signal} dBm</td>
                    <td class="font-mono text-cyan-300">${res.freq}</td>
                    <td class="font-mono">${res.width}</td>
                    <td>${res.sec}</td>
                    <td>
                      <button class="px-2 py-1 bg-cyan-900 hover:bg-cyan-700 text-cyan-200 rounded text-xs" onclick="alert('تم قفل المحطة على برج: ${res.ssid} (${res.mac})!')">قفل بالماك (Lock)</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    return "";
  },

  setAirosTab(tab) {
    this.state.airos.activeTab = tab;
    this.renderAiros("airos-container");
  },

  updateAirosConfig() {
    const modeEl = document.getElementById('airos-mode-select');
    const ssidEl = document.getElementById('airos-ssid-input');
    const widthEl = document.getElementById('airos-width-select');
    const freqEl = document.getElementById('airos-freq-select');
    const powerEl = document.getElementById('airos-power-range');

    if (modeEl) this.state.airos.mode = modeEl.value;
    if (ssidEl) this.state.airos.ssid = ssidEl.value;
    if (widthEl) this.state.airos.channelWidth = widthEl.value;
    if (freqEl) this.state.airos.frequency = freqEl.value;
    if (powerEl) this.state.airos.txPower = powerEl.value;
  },

  scanSiteSurvey() {
    alert("جارٍ فحص الأثير اللاسلكي والتقاط الأبراج... تم العثور على 3 شبكات.");
  }
};
