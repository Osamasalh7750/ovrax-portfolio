/**
 * NetworkArchitect Hub - Enterprise Interactive Topology Engine (MEGA MULTI-DEVICE EDITION)
 * Features 48+ interconnected devices spanning HQ, Towers, Branches, Warehouses, Factory, Kiosks & Field Staff.
 */

class TopologyEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.state = {
      scale: 0.95,
      offsetX: 40,
      offsetY: 20,
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0,
      selectedNode: null,
      selectedLink: null,
      filterPacketType: "all",
      speedMultiplier: 1.0,
      simState: {
        wan1Down: false,
        rfInterference: false,
        trafficSpike: false
      }
    };

    // 5 Strategic Visual Regions (المناطق الجغرافية الخمس)
    this.zones = [
      { id: "hq", name: "المقر الرئيسي والداتا سنتر (HQ Data Center & WAN)", x: 40, y: 30, w: 480, h: 420, color: "rgba(2, 132, 199, 0.08)", border: "rgba(56, 189, 248, 0.35)", icon: "🏛️" },
      { id: "towers", name: "منظومة أبراج البث والربط اللاسلكي (Master Towers & RF Backhaul)", x: 550, y: 30, w: 380, h: 420, color: "rgba(245, 158, 11, 0.08)", border: "rgba(245, 158, 11, 0.35)", icon: "🗼" },
      { id: "branches", name: "فروع ومكاتب الإدارة والمبيعات (Branch Offices & Retail Hubs)", x: 960, y: 30, w: 520, h: 420, color: "rgba(34, 197, 94, 0.08)", border: "rgba(34, 197, 94, 0.35)", icon: "🏢" },
      { id: "warehouses", name: "المستودعات والمصنع والإنتاج (Warehouses, Plant & SCADA)", x: 40, y: 480, w: 720, h: 410, color: "rgba(168, 85, 247, 0.08)", border: "rgba(168, 85, 247, 0.35)", icon: "🏭" },
      { id: "teleworkers", name: "نقاط البيع والعمالة الميدانية (Retail Kiosks & Mobile Staff)", x: 790, y: 480, w: 690, h: 410, color: "rgba(236, 72, 153, 0.08)", border: "rgba(236, 72, 153, 0.35)", icon: "🔒" }
    ];

    // 48 INTERCONNECTED NETWORK DEVICES (أجهزة المنظومة الكاملة)
    this.nodes = [
      // =========================================================================
      // ZONE 1: المقر الرئيسي والداتا سنتر (HQ Data Center & WAN)
      // =========================================================================
      { id: "isp1_fiber", name: "ISP 1 Fiber 10G", role: "خط الفايبر الرئيسي المخصص", x: 90, y: 90, icon: "🌐", type: "wan", stage: "hq", status: "online", ip: "197.200.15.21 (Dedicated)", color: "#38bdf8" },
      { id: "isp2_backup", name: "ISP 2 Microwave", role: "خط الميكروويف الاحتياطي", x: 90, y: 190, icon: "📡", type: "wan", stage: "hq", status: "standby", ip: "100.64.12.1 (Backup)", color: "#eab308" },
      { id: "ont_modem", name: "Fiber ONT Bridge", role: "مودم الفايبر بنمط الجسر", x: 90, y: 290, icon: "📦", type: "modem", stage: "hq", status: "online", ip: "Bridge Mode (No NAT)", color: "#64748b" },
      { id: "core_router_ccr", name: "MikroTik CCR2004", role: "الراوتر المركزي الرئيسي للشركة", x: 230, y: 190, icon: "🧠", type: "router", stage: "hq", status: "online", ip: "10.10.10.1 (Gateway)", model: "CCR2004-16G-2S+", color: "#0284c7" },
      { id: "backup_router_rb", name: "MikroTik RB5009", role: "راوتر الطوارئ الرديف VRRP", x: 230, y: 310, icon: "🛡️", type: "router", stage: "hq", status: "standby", ip: "10.10.10.254 (Hot Standby)", model: "RB5009UG+S+IN", color: "#38bdf8" },
      { id: "core_switch_crs", name: "MikroTik CRS328", role: "سويتش التوزيع والـ PoE الرئيسي", x: 380, y: 190, icon: "🔀", type: "switch", stage: "hq", status: "online", ip: "10.10.10.2 (24P PoE 500W)", model: "CRS328-24P-4S+", color: "#38bdf8" },
      { id: "server_erp", name: "ERP Application Server", role: "خادم إدارة موارد المؤسسة", x: 240, y: 80, icon: "🗄️", type: "server", stage: "hq", status: "online", ip: "10.10.20.10 (VLAN 20)", color: "#0284c7" },
      { id: "server_db", name: "Database Cluster", role: "قواعد البيانات المركزية DB", x: 370, y: 80, icon: "💾", type: "server", stage: "hq", status: "online", ip: "10.10.20.11 (VLAN 20)", color: "#0284c7" },
      { id: "hq_voip_pbx", name: "Yeastar IP-PBX", role: "مقسم سنترال الهواتف الصوتية", x: 470, y: 100, icon: "☎️", type: "device", stage: "hq", status: "online", ip: "10.10.40.10 (VLAN 40)", color: "#c084fc" },
      { id: "hq_nvr_cctv", name: "HQ NVR 64-Channel", role: "مسجل كاميرات المراقبة المركزية", x: 470, y: 200, icon: "📹", type: "device", stage: "hq", status: "online", ip: "10.10.50.10 (VLAN 50)", color: "#f87171" },
      { id: "hq_ap_wifi6", name: "MikroTik cAP ax", role: "نقطة وصول Wi-Fi 6 المكاتب", x: 380, y: 340, icon: "📶", type: "ap", stage: "hq", status: "online", ip: "10.10.30.2 (VLAN 30,60)", color: "#4ade80" },
      { id: "hq_staff_pcs", name: "HQ Staff Workstations", role: "حواسيب موظفي الإدارة العامة", x: 480, y: 340, icon: "💻", type: "client", stage: "hq", status: "online", ip: "10.10.30.100-200", color: "#60a5fa" },
      { id: "hq_ip_phones", name: "HQ VoIP Handsets", role: "هواتف الموظفين المكتبية", x: 480, y: 410, icon: "📞", type: "client", stage: "hq", status: "online", ip: "10.10.40.100-150", color: "#c084fc" },

      // =========================================================================
      // ZONE 2: أبراج البث والربط اللاسلكي (Master Towers & RF Backhaul)
      // =========================================================================
      { id: "tower_poe_rack", name: "Tower 24V PoE Rack", role: "راك التغذية الكهربائية للهوائيات", x: 610, y: 140, icon: "⚡", type: "power", stage: "towers", status: "online", ip: "24V 1A Gigabit PoE In", color: "#fbbf24" },
      { id: "tower_surge_g2", name: "Ubiquiti ETH-SP-G2", role: "محاقن تأريض وحماية الصواعق", x: 610, y: 260, icon: "🛡️", type: "protection", stage: "towers", status: "online", ip: "Gas Discharge Ground", color: "#22c55e" },
      { id: "rocket_sector_1", name: "Rocket Prism 5AC (N)", role: "محطة السيكتور 120° الشمالية", x: 740, y: 100, icon: "🗼", type: "tower", stage: "towers", status: "online", ip: "10.10.10.20 (5.8 GHz)", color: "#f59e0b" },
      { id: "rocket_sector_2", name: "Rocket Prism 5AC (S)", role: "محطة السيكتور 120° الجنوبية", x: 740, y: 220, icon: "🗼", type: "tower", stage: "towers", status: "online", ip: "10.10.10.21 (5.7 GHz)", color: "#f59e0b" },
      { id: "airfiber_dish_hq", name: "airFiber 5XHD HQ", role: "صحن الربط النقطي الفائق 18km", x: 860, y: 130, icon: "🎯", type: "tower", stage: "towers", status: "online", ip: "10.10.10.22 (DFS 5.5G)", color: "#f59e0b" },
      { id: "powerbeam_dish_hq", name: "PowerBeam ISO HQ", role: "صحن الربط المركز 12km للمستودع", x: 860, y: 280, icon: "📡", type: "tower", stage: "towers", status: "online", ip: "10.10.10.23 (UNII-1 5.2G)", color: "#f59e0b" },

      // =========================================================================
      // ZONE 3: فروع ومكاتب الإدارة والمبيعات (Branch Offices & Retail Hubs)
      // =========================================================================
      { id: "branch_nano_ap", name: "NanoStation 5AC (ubnt)", role: "محطة استقبال فرع المبيعات", x: 1020, y: 130, icon: "📡", type: "tower", stage: "branches", status: "online", ip: "10.10.10.31 (NS-5AC 16dBi)", color: "#f59e0b" },
      { id: "branch_poe_inj", name: "Passive PoE 24V", role: "محقن كهرباء النانو الداخلي", x: 1020, y: 260, icon: "🔌", type: "power", stage: "branches", status: "online", ip: "24V 0.5A Gigabit", color: "#fbbf24" },
      { id: "branch_sw_cisco", name: "Cisco Catalyst 2960-X", role: "سويتش فرع الإدارة المدار", x: 1160, y: 130, icon: "🔀", type: "switch", stage: "branches", status: "online", ip: "10.10.10.32 (PoE+ L2)", color: "#38bdf8" },
      { id: "branch_sw_tplink", name: "TP-Link JetStream PoE", role: "سويتش فرع المبيعات وكاميراته", x: 1160, y: 260, icon: "🔀", type: "switch", stage: "branches", status: "online", ip: "10.10.10.33 (TL-SG3428MP)", color: "#38bdf8" },
      { id: "branch_router_tplink", name: "TP-Link Archer C6", role: "راوتر واي فاي بوضع Pure AP", x: 1320, y: 80, icon: "📶", type: "ap", stage: "branches", status: "online", ip: "10.10.30.5 (DHCP Off)", color: "#4ade80" },
      { id: "branch_ap_dlink", name: "D-Link DAP-3320", role: "لاقط ونقطة وصول باحة الفرع", x: 1320, y: 190, icon: "📶", type: "ap", stage: "branches", status: "online", ip: "10.10.30.6 (Outdoor AP)", color: "#4ade80" },
      { id: "branch_staff_pcs", name: "Branch Staff PCs", role: "حواسيب موظفي المبيعات والعملاء", x: 1440, y: 80, icon: "💻", type: "client", stage: "branches", status: "online", ip: "10.10.30.50-90", color: "#60a5fa" },
      { id: "branch_ip_phones", name: "Branch IP Telephony", role: "هواتف فرع المبيعات الصوتية", x: 1440, y: 190, icon: "☎️", type: "client", stage: "branches", status: "online", ip: "10.10.40.50-70", color: "#c084fc" },
      { id: "branch_cams_poe", name: "Branch CCTV Cams", role: "كاميرات مراقبة الفرع PoE", x: 1320, y: 310, icon: "📹", type: "device", stage: "branches", status: "online", ip: "10.10.50.30-40", color: "#f87171" },

      // =========================================================================
      // ZONE 4: المستودعات والمصنع والإنتاج (Warehouses, Plant & SCADA)
      // =========================================================================
      { id: "wh_dish_pbeam", name: "PowerBeam ISO 400mm", role: "محطة استقبال المستودع (12km)", x: 100, y: 560, icon: "🎯", type: "tower", stage: "warehouses", status: "online", ip: "10.10.10.41 (25 dBi Dish)", color: "#f59e0b" },
      { id: "wh_surge_g2", name: "Warehouse ETH-SP-G2", role: "حماية وتأريض برج المستودع", x: 100, y: 690, icon: "🛡️", type: "protection", stage: "warehouses", status: "online", ip: "Ground Rod Protection", color: "#22c55e" },
      { id: "wh_switch_dlink", name: "D-Link DGS-1210-28P", role: "سويتش المستودع والكاميرات", x: 260, y: 580, icon: "🔀", type: "switch", stage: "warehouses", status: "online", ip: "10.10.10.42 (PoE+ L2)", color: "#38bdf8" },
      { id: "wh_netis_cpe", name: "Netis WF2322 Outdoor", role: "لاقط ونقطة وصول لهناجر التخزين", x: 400, y: 540, icon: "📶", type: "ap", stage: "warehouses", status: "online", ip: "10.10.30.20 (High Power)", color: "#4ade80" },
      { id: "wh_tplink_cpe", name: "TP-Link Pharos CPE510", role: "لاقط ساحات الشاحنات والموازين", x: 400, y: 640, icon: "📡", type: "cpe", stage: "warehouses", status: "online", ip: "10.10.30.21 (Outdoor CPE)", color: "#4ade80" },
      { id: "wh_scanners", name: "Zebra Barcode Scanners", role: "قارئات الباركود اللاسلكية للعمال", x: 540, y: 540, icon: "📦", type: "client", stage: "warehouses", status: "online", ip: "10.10.30.200-240", color: "#60a5fa" },
      { id: "wh_cctv_poe", name: "Warehouse CCTV Network", role: "كاميرات تغطية الأرصفة والأسوار", x: 540, y: 640, icon: "📹", type: "device", stage: "warehouses", status: "online", ip: "10.10.50.60-80", color: "#f87171" },
      
      // Factory Sub-section inside Zone 4
      { id: "factory_dish_af", name: "airFiber 5XHD (Plant)", role: "محطة استقبال المصنع (18km)", x: 260, y: 760, icon: "🎯", type: "tower", stage: "warehouses", status: "online", ip: "10.10.10.51 (30 dBi Slant)", color: "#f59e0b" },
      { id: "factory_sw_cisco", name: "Cisco Industrial Switch", role: "سويتش المصنع المعزول OT/SCADA", x: 420, y: 760, icon: "🔀", type: "switch", stage: "warehouses", status: "online", ip: "10.10.10.52 (Ruggedized)", color: "#38bdf8" },
      { id: "factory_scada_plc", name: "Siemens SCADA / PLCs", role: "وحدات التحكم وخطوط الإنتاج", x: 580, y: 740, icon: "⚙️", type: "device", stage: "warehouses", status: "online", ip: "10.10.20.50-60 (Critical)", color: "#0284c7" },
      { id: "factory_ap_tenda", name: "Tenda AC10 Wi-Fi", role: "موزع واي فاي مهندسي الصيانة", x: 580, y: 830, icon: "📶", type: "ap", stage: "warehouses", status: "online", ip: "10.10.30.25 (AP Mode)", color: "#4ade80" },

      // =========================================================================
      // ZONE 5: نقاط البيع والعمالة الميدانية (Retail Kiosks & Mobile Staff)
      // =========================================================================
      { id: "kiosk_loco_1", name: "NanoStation Loco5AC (K1)", role: "لاقط نقطة البيع 1 (1.8km)", x: 880, y: 550, icon: "📡", type: "cpe", stage: "teleworkers", status: "online", ip: "10.10.10.61 (ubnt Loco)", color: "#f59e0b" },
      { id: "kiosk_router_1", name: "TP-Link WR840N (K1)", role: "راوتر نقطة البيع 1 في وضع AP", x: 1040, y: 550, icon: "📶", type: "ap", stage: "teleworkers", status: "online", ip: "10.10.30.30 (DHCP Off)", color: "#4ade80" },
      { id: "kiosk_pos_1", name: "POS Cashier Terminal 1", role: "كاشير ونظام دفع الفواتير", x: 1200, y: 550, icon: "💳", type: "client", stage: "teleworkers", status: "online", ip: "10.10.30.31 (Static IP)", color: "#60a5fa" },

      { id: "kiosk_loco_2", name: "Netis WF2322 (Kiosk 2)", role: "لاقط نقطة البيع 2 (2.4km)", x: 880, y: 670, icon: "📡", type: "cpe", stage: "teleworkers", status: "online", ip: "10.10.10.62 (Netis CPE)", color: "#f59e0b" },
      { id: "kiosk_router_2", name: "Tenda F3 AP (Kiosk 2)", role: "راوتر نقطة البيع 2 في وضع AP", x: 1040, y: 670, icon: "📶", type: "ap", stage: "teleworkers", status: "online", ip: "10.10.30.35 (DHCP Off)", color: "#4ade80" },
      { id: "kiosk_pos_2", name: "POS Cashier Terminal 2", role: "كاشير نقطة البيع 2 ومحطة البطاقات", x: 1200, y: 670, icon: "💳", type: "client", stage: "teleworkers", status: "online", ip: "10.10.30.36 (Static IP)", color: "#60a5fa" },

      { id: "remote_vpn_gw", name: "WireGuard VPN Gateway", role: "بوابة المصادقة والتشفير المركزية", x: 880, y: 780, icon: "🔒", type: "vpn", stage: "teleworkers", status: "online", ip: "10.10.90.1 (CCR Interface)", color: "#e879f9" },
      { id: "remote_laptops", name: "Field Sales Laptops", role: "حواسيب مندوبي المبيعات المتنقلين", x: 1080, y: 780, icon: "💻", type: "client", stage: "teleworkers", status: "online", ip: "10.10.90.10-50 (Encrypted)", color: "#e879f9" },
      { id: "remote_tablets", name: "Site Engineers Tablets", role: "أجهزة لوحية للمهندسين والمشرفين", x: 1280, y: 780, icon: "📱", type: "client", stage: "teleworkers", status: "online", ip: "10.10.90.51-90 (Encrypted)", color: "#e879f9" }
    ];

    // COMPREHENSIVE INTERCONNECT LINKS (جميع مسارات الربط بين الـ 48 جهاز)
    this.links = [
      // HQ Internal & WAN Links
      { from: "isp1_fiber", to: "ont_modem", type: "fiber", label: "10G Fiber Leased", speed: "10 Gbps" },
      { from: "ont_modem", to: "core_router_ccr", type: "fiber", label: "sfp-sfpplus1 (WAN1)", speed: "10 Gbps" },
      { from: "isp2_backup", to: "core_router_ccr", type: "copper", label: "ether1 (WAN2 Backup)", speed: "1 Gbps" },
      { from: "core_router_ccr", to: "backup_router_rb", type: "copper", label: "VRRP Heartbeat", speed: "1 Gbps" },
      { from: "core_router_ccr", to: "core_switch_crs", type: "fiber", label: "10G Trunk Uplink", speed: "10 Gbps" },
      { from: "core_switch_crs", to: "server_erp", type: "copper", label: "VLAN 20 (ERP)", speed: "1 Gbps" },
      { from: "core_switch_crs", to: "server_db", type: "copper", label: "VLAN 20 (DB)", speed: "1 Gbps" },
      { from: "core_switch_crs", to: "hq_voip_pbx", type: "copper", label: "VLAN 40 (VoIP)", speed: "1 Gbps" },
      { from: "core_switch_crs", to: "hq_nvr_cctv", type: "copper", label: "VLAN 50 (NVR)", speed: "1 Gbps" },
      { from: "core_switch_crs", to: "hq_ap_wifi6", type: "copper", label: "PoE+ Wi-Fi 6", speed: "1 Gbps" },
      { from: "hq_ap_wifi6", to: "hq_staff_pcs", type: "wireless", label: "802.11ax 5GHz", speed: "1200 Mbps" },
      { from: "core_switch_crs", to: "hq_ip_phones", type: "copper", label: "PoE Telephony", speed: "1 Gbps" },

      // Tower Uplinks
      { from: "core_router_ccr", to: "tower_poe_rack", type: "shielded", label: "ToughCable Cat6 STP", speed: "1 Gbps" },
      { from: "tower_poe_rack", to: "tower_surge_g2", type: "shielded", label: "ETH-SP-G2 Protection", speed: "1 Gbps" },
      { from: "tower_surge_g2", to: "rocket_sector_1", type: "shielded", label: "PoE 24V Sector N", speed: "1 Gbps" },
      { from: "tower_surge_g2", to: "rocket_sector_2", type: "shielded", label: "PoE 24V Sector S", speed: "1 Gbps" },
      { from: "tower_surge_g2", to: "airfiber_dish_hq", type: "shielded", label: "airFiber 5XHD (18km)", speed: "1 Gbps" },
      { from: "tower_surge_g2", to: "powerbeam_dish_hq", type: "shielded", label: "PowerBeam ISO (12km)", speed: "1 Gbps" },

      // Branch Wireless Links (From Rocket Sector 1)
      { from: "rocket_sector_1", to: "branch_nano_ap", type: "rf", label: "airMAX PtMP 5.8G (-54dBm)", speed: "350 Mbps" },
      { from: "branch_nano_ap", to: "branch_poe_inj", type: "shielded", label: "ToughCable STP", speed: "1 Gbps" },
      { from: "branch_poe_inj", to: "branch_sw_cisco", type: "copper", label: "Cisco L2 Trunk", speed: "1 Gbps" },
      { from: "branch_sw_cisco", to: "branch_sw_tplink", type: "copper", label: "Gigabit Link", speed: "1 Gbps" },
      { from: "branch_sw_cisco", to: "branch_router_tplink", type: "copper", label: "Pure AP Mode LAN", speed: "1 Gbps" },
      { from: "branch_sw_cisco", to: "branch_ap_dlink", type: "copper", label: "D-Link Outdoor AP", speed: "1 Gbps" },
      { from: "branch_router_tplink", to: "branch_staff_pcs", type: "wireless", label: "Wi-Fi LAN", speed: "867 Mbps" },
      { from: "branch_sw_tplink", to: "branch_ip_phones", type: "copper", label: "PoE Phones", speed: "1 Gbps" },
      { from: "branch_sw_tplink", to: "branch_cams_poe", type: "copper", label: "CCTV Stream", speed: "1 Gbps" },

      // Warehouse Links (From PowerBeam Dish HQ)
      { from: "powerbeam_dish_hq", to: "wh_dish_pbeam", type: "rf_long", label: "PtP Link 12km (-58dBm)", speed: "280 Mbps" },
      { from: "wh_dish_pbeam", to: "wh_surge_g2", type: "shielded", label: "ETH-SP-G2 Ground", speed: "1 Gbps" },
      { from: "wh_surge_g2", to: "wh_switch_dlink", type: "copper", label: "DGS-1210 PoE In", speed: "1 Gbps" },
      { from: "wh_switch_dlink", to: "wh_netis_cpe", type: "copper", label: "Netis WF2322 PoE", speed: "100 Mbps" },
      { from: "wh_switch_dlink", to: "wh_tplink_cpe", type: "copper", label: "Pharos CPE510 PoE", speed: "100 Mbps" },
      { from: "wh_netis_cpe", to: "wh_scanners", type: "wireless", label: "Barcode Wi-Fi", speed: "300 Mbps" },
      { from: "wh_switch_dlink", to: "wh_cctv_poe", type: "copper", label: "Perimeter CCTV", speed: "1 Gbps" },

      // Factory Links (From airFiber Dish HQ)
      { from: "airfiber_dish_hq", to: "factory_dish_af", type: "rf_long", label: "Dedicated airFiber 18km", speed: "450 Mbps" },
      { from: "factory_dish_af", to: "factory_sw_cisco", type: "copper", label: "Cisco Industrial L3", speed: "1 Gbps" },
      { from: "factory_sw_cisco", to: "factory_scada_plc", type: "copper", label: "Isolated SCADA PLC", speed: "100 Mbps" },
      { from: "factory_sw_cisco", to: "factory_ap_tenda", type: "copper", label: "Tenda AC10 AP", speed: "1 Gbps" },

      // Kiosk Links (From Rocket Sector 2)
      { from: "rocket_sector_2", to: "kiosk_loco_1", type: "rf", label: "5GHz PtMP (Loco 1)", speed: "150 Mbps" },
      { from: "kiosk_loco_1", to: "kiosk_router_1", type: "copper", label: "TP-Link AP LAN", speed: "100 Mbps" },
      { from: "kiosk_router_1", to: "kiosk_pos_1", type: "copper", label: "POS Terminal 1", speed: "100 Mbps" },

      { from: "rocket_sector_2", to: "kiosk_loco_2", type: "rf", label: "5GHz PtMP (Netis K2)", speed: "150 Mbps" },
      { from: "kiosk_loco_2", to: "kiosk_router_2", type: "copper", label: "Tenda AP LAN", speed: "100 Mbps" },
      { from: "kiosk_router_2", to: "kiosk_pos_2", type: "copper", label: "POS Terminal 2", speed: "100 Mbps" },

      // Remote Teleworkers VPN Links
      { from: "core_router_ccr", to: "remote_vpn_gw", type: "vpn", label: "WireGuard Endpoint", speed: "1 Gbps" },
      { from: "remote_vpn_gw", to: "remote_laptops", type: "vpn", label: "ChaCha20 Encrypted", speed: "100 Mbps" },
      { from: "remote_vpn_gw", to: "remote_tablets", type: "vpn", label: "IPsec Encrypted", speed: "50 Mbps" }
    ];

    // Dynamic Packets Simulation (65+ glowing packets)
    this.packets = [];
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.initPackets();
    this.initEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  resizeCanvas() {
    if (!this.canvas || !this.canvas.parentElement) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    if (rect.width > 0) {
      this.canvas.width = Math.max(rect.width, 1550);
      this.canvas.height = 920;
    }
  }

  initPackets() {
    this.packets = [];
    // Spawn 65 glowing packets across active links
    for (let i = 0; i < 65; i++) {
      const link = this.links[Math.floor(Math.random() * this.links.length)];
      const types = ["web", "voip", "cctv", "vpn"];
      const type = types[Math.floor(Math.random() * types.length)];
      this.packets.push({
        link,
        progress: Math.random(),
        speed: (0.003 + Math.random() * 0.005) * this.state.speedMultiplier,
        type
      });
    }
  }

  initEvents() {
    this.canvas.addEventListener('mousedown', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = (e.clientX - rect.left - this.state.offsetX) / this.state.scale;
      const mouseY = (e.clientY - rect.top - this.state.offsetY) / this.state.scale;

      // Check node hit with 26px radius
      let hitNode = null;
      for (let n of this.nodes) {
        const dx = mouseX - n.x;
        const dy = mouseY - n.y;
        if (Math.sqrt(dx * dx + dy * dy) <= 30) {
          hitNode = n;
          break;
        }
      }

      if (hitNode) {
        this.state.selectedNode = hitNode;
        this.renderNodeHUD(hitNode);
      } else {
        this.state.isDragging = true;
        this.state.lastMouseX = e.clientX;
        this.state.lastMouseY = e.clientY;
      }
    });

    window.addEventListener('mouseup', () => {
      this.state.isDragging = false;
    });

    window.addEventListener('mousemove', (e) => {
      if (this.state.isDragging) {
        const dx = e.clientX - this.state.lastMouseX;
        const dy = e.clientY - this.state.lastMouseY;
        this.state.lastMouseX = e.clientX;
        this.state.lastMouseY = e.clientY;
        this.state.offsetX += dx;
        this.state.offsetY += dy;
      }
    });

    // Mouse wheel zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        this.zoomIn();
      } else {
        this.zoomOut();
      }
    }, { passive: false });
  }

  // Zoom Controls
  zoomIn() {
    this.state.scale = Math.min(this.state.scale + 0.12, 2.2);
  }

  zoomOut() {
    this.state.scale = Math.max(this.state.scale - 0.12, 0.45);
  }

  resetView() {
    this.state.scale = 0.95;
    this.state.offsetX = 40;
    this.state.offsetY = 20;
    this.state.selectedNode = null;
  }

  setSpeed(factor) {
    this.state.speedMultiplier = factor;
    for (let p of this.packets) {
      p.speed = (0.003 + Math.random() * 0.005) * factor;
    }
  }

  toggleTheaterMode() {
    const wrapper = document.querySelector('.topology-wrapper');
    if (!wrapper) return;
    wrapper.classList.toggle('theater-mode');
    setTimeout(() => this.resizeCanvas(), 350);
  }

  // Focus on one of the 5 Grand Pipeline Stages
  focusStage(stageKey) {
    const targetNode = this.nodes.find(n => n.stage === stageKey);
    if (targetNode) {
      this.state.selectedNode = targetNode;
      this.renderNodeHUD(targetNode);

      const canvasWidth = this.canvas.width;
      const canvasHeight = this.canvas.height;
      this.state.offsetX = (canvasWidth / 2) - (targetNode.x * this.state.scale);
      this.state.offsetY = (canvasHeight / 2) - (targetNode.y * this.state.scale);
    }

    document.querySelectorAll('.pipeline-stage-card').forEach(card => {
      if (card.dataset.stage === stageKey) {
        card.classList.add('active');
      } else {
        card.classList.remove('active');
      }
    });
  }

  renderNodeHUD(node) {
    const hud = document.getElementById('topology-hud');
    if (!hud) return;

    hud.innerHTML = `
      <div class="hud-card p-5 bg-slate-900/95 border border-cyan-500/50 rounded-2xl shadow-2xl backdrop-blur-md">
        <div class="flex items-center justify-between border-b border-slate-700 pb-3 mb-3">
          <div class="flex items-center gap-3">
            <span class="text-3xl">${node.icon}</span>
            <div>
              <h4 class="font-bold text-white text-sm leading-tight">${node.name}</h4>
              <span class="text-xs text-cyan-400 font-mono">${node.role}</span>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded text-2xs font-mono font-bold ${node.status === 'online' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300'}">${node.status.toUpperCase()}</span>
        </div>

        <div class="grid grid-cols-2 gap-2 text-xs mb-3">
          <div class="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
            <span class="text-slate-400 text-3xs block">عنوان الـ IP / المنفذ</span>
            <span class="font-mono text-cyan-300 font-bold text-2xs">${node.ip}</span>
          </div>
          <div class="bg-slate-950/80 p-2 rounded-xl border border-slate-800">
            <span class="text-slate-400 text-3xs block">المنطقة الجغرافية</span>
            <span class="font-mono text-amber-300 font-bold text-2xs uppercase">${node.stage}</span>
          </div>
        </div>

        <div class="text-xs text-slate-300 space-y-1 bg-slate-950/50 p-2.5 rounded-xl border border-slate-800 text-2xs">
          <div class="flex justify-between">
            <span class="text-slate-400">حركة البيانات الحية:</span>
            <span class="text-emerald-400 font-mono font-bold">142 Mbps Rx / 38 Mbps Tx</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">زمن الاستجابة (Latency):</span>
            <span class="text-cyan-300 font-mono">&lt; 1 ms (Jitter: 0.1ms)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">فقدان الحزم (Loss):</span>
            <span class="text-green-400 font-mono font-bold">0.00%</span>
          </div>
        </div>
      </div>
    `;
    hud.style.display = 'block';
  }

  animate() {
    this.render();
    requestAnimationFrame(this.animate);
  }

  render() {
    const { ctx, canvas } = this;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(this.state.offsetX, this.state.offsetY);
    ctx.scale(this.state.scale, this.state.scale);

    // Draw Grid background
    this.drawGrid();

    // Draw 5 Strategic Geographic Zones
    this.drawZones();

    // Draw Links
    for (let link of this.links) {
      this.drawLink(link);
    }

    // Draw Packets
    this.drawPackets();

    // Draw Nodes
    for (let node of this.nodes) {
      this.drawNode(node);
    }

    ctx.restore();
  }

  drawGrid() {
    const { ctx } = this;
    ctx.strokeStyle = "rgba(30, 41, 59, 0.25)";
    ctx.lineWidth = 1;

    const step = 45;
    for (let x = -500; x < 2500; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, -500);
      ctx.lineTo(x, 1500);
      ctx.stroke();
    }
    for (let y = -500; y < 1500; y += step) {
      ctx.beginPath();
      ctx.moveTo(-500, y);
      ctx.lineTo(2500, y);
      ctx.stroke();
    }
  }

  drawZones() {
    const { ctx } = this;
    ctx.save();
    for (let zone of this.zones) {
      // Zone background box
      ctx.fillStyle = zone.color;
      ctx.strokeStyle = zone.border;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([6, 4]);

      ctx.beginPath();
      ctx.roundRect(zone.x, zone.y, zone.w, zone.h, 16);
      ctx.fill();
      ctx.stroke();

      // Zone Title Header
      ctx.setLineDash([]);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px Segoe UI, Cairo, sans-serif";
      ctx.fillText(`${zone.icon} ${zone.name}`, zone.x + 18, zone.y + 26);
    }
    ctx.restore();
  }

  drawLink(link) {
    const fromNode = this.nodes.find(n => n.id === link.from);
    const toNode = this.nodes.find(n => n.id === link.to);
    if (!fromNode || !toNode) return;

    const { ctx } = this;
    ctx.save();

    if (this.state.simState.wan1Down && link.from === "isp1_fiber") {
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
    } else if (this.state.simState.rfInterference && (link.type === "rf" || link.type === "rf_long")) {
      ctx.strokeStyle = "#eab308";
      ctx.lineWidth = 3.5;
      ctx.setLineDash([6, 3]);
    } else if (link.type === "fiber") {
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 4;
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 6;
      ctx.setLineDash([]);
    } else if (link.type === "rf" || link.type === "rf_long") {
      ctx.strokeStyle = "#f59e0b";
      ctx.lineWidth = 3;
      ctx.shadowColor = "#f59e0b";
      ctx.shadowBlur = 5;
      ctx.setLineDash([5, 5]);
    } else if (link.type === "vpn") {
      ctx.strokeStyle = "#e879f9";
      ctx.lineWidth = 2.5;
      ctx.setLineDash([6, 3]);
    } else {
      ctx.strokeStyle = "#475569";
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
    }

    ctx.beginPath();
    ctx.moveTo(fromNode.x, fromNode.y);
    ctx.lineTo(toNode.x, toNode.y);
    ctx.stroke();

    ctx.restore();
  }

  drawPackets() {
    const { ctx } = this;
    const { wan1Down } = this.state.simState;

    for (let p of this.packets) {
      if (wan1Down && p.link.from === "isp1_fiber") {
        p.link = this.links.find(l => l.from === "isp2_backup") || p.link;
      }

      const fromNode = this.nodes.find(n => n.id === p.link.from);
      const toNode = this.nodes.find(n => n.id === p.link.to);
      if (!fromNode || !toNode) continue;

      p.progress += p.speed;
      if (p.progress > 1) p.progress = 0;

      const px = fromNode.x + (toNode.x - fromNode.x) * p.progress;
      const py = fromNode.y + (toNode.y - fromNode.y) * p.progress;

      ctx.save();
      if (p.type === "voip") ctx.fillStyle = "#c084fc";
      else if (p.type === "cctv") ctx.fillStyle = "#f87171";
      else if (p.type === "vpn") ctx.fillStyle = "#fbbf24";
      else ctx.fillStyle = "#38bdf8";

      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(px, py, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  drawNode(node) {
    const { ctx } = this;
    const isSelected = this.state.selectedNode && this.state.selectedNode.id === node.id;

    ctx.save();
    ctx.shadowColor = node.color;
    ctx.shadowBlur = isSelected ? 20 : 8;

    ctx.fillStyle = "#0f172a";
    ctx.strokeStyle = isSelected ? "#ffffff" : node.color;
    ctx.lineWidth = isSelected ? 3.5 : 2;

    ctx.beginPath();
    ctx.arc(node.x, node.y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Node Icon
    ctx.font = "16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(node.icon, node.x, node.y);

    // Node Name
    ctx.shadowBlur = 0;
    ctx.fillStyle = isSelected ? "#38bdf8" : "#f8fafc";
    ctx.font = "bold 10px Segoe UI, Cairo, sans-serif";
    ctx.fillText(node.name, node.x, node.y + 36);

    // Node Role
    ctx.fillStyle = "#94a3b8";
    ctx.font = "8px monospace";
    ctx.fillText(node.role, node.x, node.y + 48);

    ctx.restore();
  }

  simulateFailover() {
    this.state.simState.wan1Down = !this.state.simState.wan1Down;
    const btn = document.getElementById('btn-sim-wan');
    if (btn) {
      if (this.state.simState.wan1Down) {
        btn.classList.add('bg-rose-600');
        btn.innerText = "❌ خط الفايبر WAN1 مقطوع! (تم التحول للرديف WAN2)";
      } else {
        btn.classList.remove('bg-rose-600');
        btn.innerText = "⚡ محاكاة انقطاع الفايبر (WAN1 Cut)";
      }
    }
  }

  simulateRFInterference() {
    this.state.simState.rfInterference = !this.state.simState.rfInterference;
    const btn = document.getElementById('btn-sim-rf');
    if (btn) {
      if (this.state.simState.rfInterference) {
        btn.classList.add('bg-amber-600');
        btn.innerText = "⚠️ تشويش راديوي نشط! (هبوط CCQ إلى 55%)";
      } else {
        btn.classList.remove('bg-amber-600');
        btn.innerText = "📡 محاكاة تشويش راديوي (RF Noise)";
      }
    }
  }
};
