/**
 * NetworkArchitect Hub - Enterprise 3D Spatial Topology Engine
 * Native HTML5 Canvas 3D Perspective & Isometric Spatial Projection Engine.
 * Features 48+ interconnected devices, 3D floating zone platforms, 3D lattice towers,
 * elevated spatial arcs, 3D flying packets with ground shadows, and full 360° orbit controls.
 * 100% Offline-First (No external 3D libraries required).
 */

class TopologyEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');

    // 3D Spatial Camera & Interaction State
    this.state = {
      viewMode: "3d", // "3d" (Perspective), "iso" (Isometric), "2d" (Flat Classic)
      scale: 0.92,
      offsetX: 0,
      offsetY: 0,
      pitch: 0.92, // ~53 degrees tilt down
      yaw: -0.38,  // ~-22 degrees horizontal azimuth
      cameraDist: 1500,
      isDragging: false,
      dragMode: "rotate", // "rotate" or "pan"
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
      { id: "hq", name: "المقر الرئيسي والداتا سنتر (HQ Data Center)", x: 40, y: 30, w: 480, h: 420, color: "rgba(2, 132, 199, 0.12)", border: "rgba(56, 189, 248, 0.5)", icon: "🏛️" },
      { id: "towers", name: "منظومة أبراج البث والربط اللاسلكي (Master Towers)", x: 550, y: 30, w: 380, h: 420, color: "rgba(245, 158, 11, 0.12)", border: "rgba(245, 158, 11, 0.5)", icon: "🗼" },
      { id: "branches", name: "فروع ومكاتب المبيعات (Branch Offices)", x: 960, y: 30, w: 520, h: 420, color: "rgba(34, 197, 94, 0.12)", border: "rgba(34, 197, 94, 0.5)", icon: "🏢" },
      { id: "warehouses", name: "المستودعات والمصنع والإنتاج (Warehouses & Plant)", x: 40, y: 480, w: 720, h: 410, color: "rgba(168, 85, 247, 0.12)", border: "rgba(168, 85, 247, 0.5)", icon: "🏭" },
      { id: "teleworkers", name: "نقاط البيع والعمالة الميدانية (Kiosks & Remote Staff)", x: 790, y: 480, w: 690, h: 410, color: "rgba(236, 72, 153, 0.12)", border: "rgba(236, 72, 153, 0.5)", icon: "🔒" }
    ];

    // 48 INTERCONNECTED NETWORK DEVICES WITH 3D ELEVATION (Z-AXIS)
    this.nodes = [
      // =========================================================================
      // ZONE 1: المقر الرئيسي والداتا سنتر (HQ Data Center & WAN)
      // =========================================================================
      { id: "isp1_fiber", name: "ISP 1 Fiber 10G", role: "خط الفايبر الرئيسي المخصص", x: 90, y: 90, z: 15, icon: "🌐", type: "wan", stage: "hq", status: "online", ip: "197.200.15.21 (Dedicated)", color: "#38bdf8" },
      { id: "isp2_backup", name: "ISP 2 Microwave", role: "خط الميكروويف الاحتياطي", x: 90, y: 190, z: 15, icon: "📡", type: "wan", stage: "hq", status: "standby", ip: "100.64.12.1 (Backup)", color: "#eab308" },
      { id: "ont_modem", name: "Fiber ONT Bridge", role: "مودم الفايبر بنمط الجسر", x: 90, y: 290, z: 20, icon: "📦", type: "modem", stage: "hq", status: "online", ip: "Bridge Mode (No NAT)", color: "#64748b" },
      { id: "core_router_ccr", name: "MikroTik CCR2004", role: "الراوتر المركزي الرئيسي للشركة", x: 230, y: 190, z: 45, icon: "🧠", type: "router", stage: "hq", status: "online", ip: "10.10.10.1 (Gateway)", model: "CCR2004-16G-2S+", color: "#0284c7" },
      { id: "backup_router_rb", name: "MikroTik RB5009", role: "راوتر الطوارئ الرديف VRRP", x: 230, y: 310, z: 40, icon: "🛡️", type: "router", stage: "hq", status: "standby", ip: "10.10.10.254 (Hot Standby)", model: "RB5009UG+S+IN", color: "#38bdf8" },
      { id: "core_switch_crs", name: "MikroTik CRS328", role: "سويتش التوزيع والـ PoE الرئيسي", x: 380, y: 190, z: 40, icon: "🔀", type: "switch", stage: "hq", status: "online", ip: "10.10.10.2 (24P PoE 500W)", model: "CRS328-24P-4S+", color: "#38bdf8" },
      { id: "server_erp", name: "ERP Application Server", role: "خادم إدارة موارد المؤسسة", x: 240, y: 80, z: 50, icon: "🗄️", type: "server", stage: "hq", status: "online", ip: "10.10.20.10 (VLAN 20)", color: "#0284c7" },
      { id: "server_db", name: "Database Cluster", role: "قواعد البيانات المركزية DB", x: 370, y: 80, z: 50, icon: "💾", type: "server", stage: "hq", status: "online", ip: "10.10.20.11 (VLAN 20)", color: "#0284c7" },
      { id: "hq_voip_pbx", name: "Yeastar IP-PBX", role: "مقسم سنترال الهواتف الصوتية", x: 470, y: 100, z: 40, icon: "☎️", type: "device", stage: "hq", status: "online", ip: "10.10.40.10 (VLAN 40)", color: "#c084fc" },
      { id: "hq_nvr_cctv", name: "HQ NVR 64-Channel", role: "مسجل كاميرات المراقبة المركزية", x: 470, y: 200, z: 40, icon: "📹", type: "device", stage: "hq", status: "online", ip: "10.10.50.10 (VLAN 50)", color: "#f87171" },
      { id: "hq_ap_wifi6", name: "MikroTik cAP ax", role: "نقطة وصول Wi-Fi 6 المكاتب", x: 380, y: 340, z: 75, icon: "📶", type: "ap", stage: "hq", status: "online", ip: "10.10.30.2 (VLAN 30,60)", color: "#4ade80" },
      { id: "hq_staff_pcs", name: "HQ Staff Workstations", role: "حواسيب موظفي الإدارة العامة", x: 480, y: 340, z: 15, icon: "💻", type: "client", stage: "hq", status: "online", ip: "10.10.30.100-200", color: "#60a5fa" },
      { id: "hq_ip_phones", name: "HQ VoIP Handsets", role: "هواتف الموظفين المكتبية", x: 480, y: 410, z: 15, icon: "📞", type: "client", stage: "hq", status: "online", ip: "10.10.40.100-150", color: "#c084fc" },

      // =========================================================================
      // ZONE 2: أبراج البث والربط اللاسلكي (Master Towers & RF Backhaul)
      // =========================================================================
      { id: "tower_poe_rack", name: "Tower 24V PoE Rack", role: "راك التغذية الكهربائية للهوائيات", x: 610, y: 140, z: 25, icon: "⚡", type: "power", stage: "towers", status: "online", ip: "24V 1A Gigabit PoE In", color: "#fbbf24" },
      { id: "tower_surge_g2", name: "Ubiquiti ETH-SP-G2", role: "محاقن تأريض وحماية الصواعق", x: 610, y: 260, z: 35, icon: "🛡️", type: "protection", stage: "towers", status: "online", ip: "Gas Discharge Ground", color: "#22c55e" },
      { id: "rocket_sector_1", name: "Rocket Prism 5AC (N)", role: "محطة السيكتور 120° الشمالية", x: 740, y: 100, z: 135, icon: "🗼", type: "tower", stage: "towers", status: "online", ip: "10.10.10.20 (5.8 GHz)", color: "#f59e0b" },
      { id: "rocket_sector_2", name: "Rocket Prism 5AC (S)", role: "محطة السيكتور 120° الجنوبية", x: 740, y: 220, z: 135, icon: "🗼", type: "tower", stage: "towers", status: "online", ip: "10.10.10.21 (5.7 GHz)", color: "#f59e0b" },
      { id: "airfiber_dish_hq", name: "airFiber 5XHD HQ", role: "صحن الربط النقطي الفائق 18km", x: 860, y: 130, z: 145, icon: "🎯", type: "tower", stage: "towers", status: "online", ip: "10.10.10.22 (DFS 5.5G)", color: "#f59e0b" },
      { id: "powerbeam_dish_hq", name: "PowerBeam ISO HQ", role: "صحن الربط المركز 12km للمستودع", x: 860, y: 280, z: 120, icon: "📡", type: "tower", stage: "towers", status: "online", ip: "10.10.10.23 (UNII-1 5.2G)", color: "#f59e0b" },

      // =========================================================================
      // ZONE 3: فروع ومكاتب الإدارة والمبيعات (Branch Offices & Retail Hubs)
      // =========================================================================
      { id: "branch_nano_ap", name: "NanoStation 5AC (ubnt)", role: "محطة استقبال فرع المبيعات", x: 1020, y: 130, z: 75, icon: "📡", type: "tower", stage: "branches", status: "online", ip: "10.10.10.31 (NS-5AC 16dBi)", color: "#f59e0b" },
      { id: "branch_poe_inj", name: "Passive PoE 24V", role: "محقن كهرباء النانو الداخلي", x: 1020, y: 260, z: 25, icon: "🔌", type: "power", stage: "branches", status: "online", ip: "24V 0.5A Gigabit", color: "#fbbf24" },
      { id: "branch_sw_cisco", name: "Cisco Catalyst 2960-X", role: "سويتش فرع الإدارة المدار", x: 1160, y: 130, z: 35, icon: "🔀", type: "switch", stage: "branches", status: "online", ip: "10.10.10.32 (PoE+ L2)", color: "#38bdf8" },
      { id: "branch_sw_tplink", name: "TP-Link JetStream PoE", role: "سويتش فرع المبيعات وكاميراته", x: 1160, y: 260, z: 35, icon: "🔀", type: "switch", stage: "branches", status: "online", ip: "10.10.10.33 (TL-SG3428MP)", color: "#38bdf8" },
      { id: "branch_router_tplink", name: "TP-Link Archer C6", role: "راوتر واي فاي بوضع Pure AP", x: 1320, y: 80, z: 30, icon: "📶", type: "ap", stage: "branches", status: "online", ip: "10.10.30.5 (DHCP Off)", color: "#4ade80" },
      { id: "branch_ap_dlink", name: "D-Link DAP-3320", role: "لاقط ونقطة وصول باحة الفرع", x: 1320, y: 190, z: 65, icon: "📶", type: "ap", stage: "branches", status: "online", ip: "10.10.30.6 (Outdoor AP)", color: "#4ade80" },
      { id: "branch_staff_pcs", name: "Branch Staff PCs", role: "حواسيب موظفي المبيعات والعملاء", x: 1440, y: 80, z: 15, icon: "💻", type: "client", stage: "branches", status: "online", ip: "10.10.30.50-90", color: "#60a5fa" },
      { id: "branch_ip_phones", name: "Branch IP Telephony", role: "هواتف فرع المبيعات الصوتية", x: 1440, y: 190, z: 15, icon: "☎️", type: "client", stage: "branches", status: "online", ip: "10.10.40.50-70", color: "#c084fc" },
      { id: "branch_cams_poe", name: "Branch CCTV Cams", role: "كاميرات مراقبة الفرع PoE", x: 1320, y: 310, z: 50, icon: "📹", type: "device", stage: "branches", status: "online", ip: "10.10.50.30-40", color: "#f87171" },

      // =========================================================================
      // ZONE 4: المستودعات والمصنع والإنتاج (Warehouses, Plant & SCADA)
      // =========================================================================
      { id: "wh_dish_pbeam", name: "PowerBeam ISO 400mm", role: "محطة استقبال المستودع (12km)", x: 100, y: 560, z: 95, icon: "🎯", type: "tower", stage: "warehouses", status: "online", ip: "10.10.10.41 (25 dBi Dish)", color: "#f59e0b" },
      { id: "wh_surge_g2", name: "Warehouse ETH-SP-G2", role: "حماية وتأريض برج المستودع", x: 100, y: 690, z: 25, icon: "🛡️", type: "protection", stage: "warehouses", status: "online", ip: "Ground Rod Protection", color: "#22c55e" },
      { id: "wh_switch_dlink", name: "D-Link DGS-1210-28P", role: "سويتش المستودع والكاميرات", x: 260, y: 580, z: 35, icon: "🔀", type: "switch", stage: "warehouses", status: "online", ip: "10.10.10.42 (PoE+ L2)", color: "#38bdf8" },
      { id: "wh_netis_cpe", name: "Netis WF2322 Outdoor", role: "لاقط ونقطة وصول لهناجر التخزين", x: 400, y: 540, z: 65, icon: "📶", type: "ap", stage: "warehouses", status: "online", ip: "10.10.30.20 (High Power)", color: "#4ade80" },
      { id: "wh_tplink_cpe", name: "TP-Link Pharos CPE510", role: "لاقط ساحات الشاحنات والموازين", x: 400, y: 640, z: 65, icon: "📡", type: "cpe", stage: "warehouses", status: "online", ip: "10.10.30.21 (Outdoor CPE)", color: "#4ade80" },
      { id: "wh_scanners", name: "Zebra Barcode Scanners", role: "قارئات الباركود اللاسلكية للعمال", x: 540, y: 540, z: 15, icon: "📦", type: "client", stage: "warehouses", status: "online", ip: "10.10.30.200-240", color: "#60a5fa" },
      { id: "wh_cctv_poe", name: "Warehouse CCTV Network", role: "كاميرات تغطية الأرصفة والأسوار", x: 540, y: 640, z: 50, icon: "📹", type: "device", stage: "warehouses", status: "online", ip: "10.10.50.60-80", color: "#f87171" },

      // Factory Sub-section inside Zone 4
      { id: "factory_dish_af", name: "airFiber 5XHD (Plant)", role: "محطة استقبال المصنع (18km)", x: 260, y: 760, z: 110, icon: "🎯", type: "tower", stage: "warehouses", status: "online", ip: "10.10.10.51 (30 dBi Slant)", color: "#f59e0b" },
      { id: "factory_sw_cisco", name: "Cisco Industrial Switch", role: "سويتش المصنع المعزول OT/SCADA", x: 420, y: 760, z: 40, icon: "🔀", type: "switch", stage: "warehouses", status: "online", ip: "10.10.10.52 (Ruggedized)", color: "#38bdf8" },
      { id: "factory_scada_plc", name: "Siemens SCADA / PLCs", role: "وحدات التحكم وخطوط الإنتاج", x: 580, y: 740, z: 25, icon: "⚙️", type: "device", stage: "warehouses", status: "online", ip: "10.10.20.50-60 (Critical)", color: "#0284c7" },
      { id: "factory_ap_tenda", name: "Tenda AC10 Wi-Fi", role: "موزع واي فاي مهندسي الصيانة", x: 580, y: 830, z: 55, icon: "📶", type: "ap", stage: "warehouses", status: "online", ip: "10.10.30.25 (AP Mode)", color: "#4ade80" },

      // =========================================================================
      // ZONE 5: نقاط البيع والعمالة الميدانية (Retail Kiosks & Mobile Staff)
      // =========================================================================
      { id: "kiosk_loco_1", name: "NanoStation Loco5AC (K1)", role: "لاقط نقطة البيع 1 (1.8km)", x: 880, y: 550, z: 55, icon: "📡", type: "cpe", stage: "teleworkers", status: "online", ip: "10.10.10.61 (ubnt Loco)", color: "#f59e0b" },
      { id: "kiosk_router_1", name: "TP-Link WR840N (K1)", role: "راوتر نقطة البيع 1 في وضع AP", x: 1040, y: 550, z: 20, icon: "📶", type: "ap", stage: "teleworkers", status: "online", ip: "10.10.30.30 (DHCP Off)", color: "#4ade80" },
      { id: "kiosk_pos_1", name: "POS Cashier Terminal 1", role: "كاشير ونظام دفع الفواتير", x: 1200, y: 550, z: 15, icon: "💳", type: "client", stage: "teleworkers", status: "online", ip: "10.10.30.31 (Static IP)", color: "#60a5fa" },

      { id: "kiosk_loco_2", name: "Netis WF2322 (Kiosk 2)", role: "لاقط نقطة البيع 2 (2.4km)", x: 880, y: 670, z: 55, icon: "📡", type: "cpe", stage: "teleworkers", status: "online", ip: "10.10.10.62 (Netis CPE)", color: "#f59e0b" },
      { id: "kiosk_router_2", name: "Tenda F3 AP (Kiosk 2)", role: "راوتر نقطة البيع 2 في وضع AP", x: 1040, y: 670, z: 20, icon: "📶", type: "ap", stage: "teleworkers", status: "online", ip: "10.10.30.35 (DHCP Off)", color: "#4ade80" },
      { id: "kiosk_pos_2", name: "POS Cashier Terminal 2", role: "كاشير نقطة البيع 2 ومحطة البطاقات", x: 1200, y: 670, z: 15, icon: "💳", type: "client", stage: "teleworkers", status: "online", ip: "10.10.30.36 (Static IP)", color: "#60a5fa" },

      { id: "remote_vpn_gw", name: "WireGuard VPN Gateway", role: "بوابة المصادقة والتشفير المركزية", x: 880, y: 780, z: 45, icon: "🔒", type: "vpn", stage: "teleworkers", status: "online", ip: "10.10.90.1 (CCR Interface)", color: "#e879f9" },
      { id: "remote_laptops", name: "Field Sales Laptops", role: "حواسيب مندوبي المبيعات المتنقلين", x: 1080, y: 780, z: 15, icon: "💻", type: "client", stage: "teleworkers", status: "online", ip: "10.10.90.10-50 (Encrypted)", color: "#e879f9" },
      { id: "remote_tablets", name: "Site Engineers Tablets", role: "أجهزة لوحية للمهندسين والمشرفين", x: 1280, y: 780, z: 15, icon: "📱", type: "client", stage: "teleworkers", status: "online", ip: "10.10.90.51-90 (Encrypted)", color: "#e879f9" }
    ];

    // COMPREHENSIVE INTERCONNECT LINKS
    this.links = [
      // HQ Internal & WAN Links
      { from: "isp1_fiber", to: "ont_modem", type: "fiber", label: "10G Fiber Leased", speed: "10 Gbps" },
      { from: "ont_modem", to: "core_router_ccr", type: "fiber", label: "sfp-sfpplus1 (WAN1)", speed: "10 Gbps" },
      { from: "isp2_backup", to: "core_router_ccr", type: "copper", label: "ether1 (WAN2 Backup)", speed: "1 Gbps" },
      { from: "core_router_ccr", to: "backup_router_rb", type: "copper", label: "VRRP Heartbeat", speed: "1 Gbps" },
      { from: "core_router_ccr", to: "core_switch_crs", type: "fiber", label: "10G SFP+ Trunk (VLANs)", speed: "10 Gbps" },
      { from: "core_switch_crs", to: "server_erp", type: "copper", label: "VLAN 20 (ERP App)", speed: "1 Gbps" },
      { from: "core_switch_crs", to: "server_db", type: "copper", label: "VLAN 20 (DB Cluster)", speed: "1 Gbps" },
      { from: "core_switch_crs", to: "hq_voip_pbx", type: "copper", label: "VLAN 40 (IP-PBX)", speed: "1 Gbps" },
      { from: "core_switch_crs", to: "hq_nvr_cctv", type: "copper", label: "VLAN 50 (NVR 64CH)", speed: "1 Gbps" },
      { from: "core_switch_crs", to: "hq_ap_wifi6", type: "copper", label: "PoE+ Trunk (VLAN 30/60)", speed: "1 Gbps" },
      { from: "hq_ap_wifi6", to: "hq_staff_pcs", type: "copper", label: "Wi-Fi 6 Clients", speed: "1.2 Gbps" },
      { from: "core_switch_crs", to: "hq_ip_phones", type: "copper", label: "PoE Voice", speed: "100 Mbps" },

      // Tower Backhaul Links
      { from: "core_switch_crs", to: "tower_poe_rack", type: "copper", label: "Gigabit PoE Feed", speed: "1 Gbps" },
      { from: "tower_poe_rack", to: "tower_surge_g2", type: "copper", label: "STP Drain & Surge", speed: "1 Gbps" },
      { from: "tower_surge_g2", to: "rocket_sector_1", type: "copper", label: "Passive 24V PoE", speed: "1 Gbps" },
      { from: "tower_surge_g2", to: "rocket_sector_2", type: "copper", label: "Passive 24V PoE", speed: "1 Gbps" },
      { from: "tower_surge_g2", to: "airfiber_dish_hq", type: "copper", label: "50V PoE Backhaul", speed: "1 Gbps" },
      { from: "tower_surge_g2", to: "powerbeam_dish_hq", type: "copper", label: "24V PoE PtP", speed: "1 Gbps" },

      // Wireless RF Distribution Links
      { from: "rocket_sector_1", to: "branch_nano_ap", type: "rf", label: "5.8GHz PtMP (150 Mbps)", speed: "150 Mbps" },
      { from: "rocket_sector_1", to: "kiosk_loco_1", type: "rf", label: "5.8GHz airMAX (30 Mbps)", speed: "30 Mbps" },
      { from: "rocket_sector_2", to: "kiosk_loco_2", type: "rf", label: "5.7GHz airMAX (30 Mbps)", speed: "30 Mbps" },
      { from: "powerbeam_dish_hq", to: "wh_dish_pbeam", type: "rf_long", label: "PtP 12km UNII-1 5.2G", speed: "200 Mbps" },
      { from: "airfiber_dish_hq", to: "factory_dish_af", type: "rf_long", label: "PtP 18km Slant45 5.5G", speed: "300 Mbps" },

      // Branch Internal Links
      { from: "branch_nano_ap", to: "branch_poe_inj", type: "copper", label: "PoE In (Outdoor STP)", speed: "1 Gbps" },
      { from: "branch_poe_inj", to: "branch_sw_cisco", type: "copper", label: "Trunk (VLAN 30,40,50)", speed: "1 Gbps" },
      { from: "branch_sw_cisco", to: "branch_sw_tplink", type: "copper", label: "802.1Q Switch Uplink", speed: "1 Gbps" },
      { from: "branch_sw_cisco", to: "branch_router_tplink", type: "copper", label: "Pure AP Mode (LAN Port)", speed: "1 Gbps" },
      { from: "branch_sw_cisco", to: "branch_ap_dlink", type: "copper", label: "Outdoor PoE AP", speed: "1 Gbps" },
      { from: "branch_sw_cisco", to: "branch_staff_pcs", type: "copper", label: "Access VLAN 30", speed: "1 Gbps" },
      { from: "branch_sw_cisco", to: "branch_ip_phones", type: "copper", label: "Access VLAN 40 (VoIP)", speed: "100 Mbps" },
      { from: "branch_sw_tplink", to: "branch_cams_poe", type: "copper", label: "PoE+ VLAN 50 CCTV", speed: "100 Mbps" },

      // Warehouse Internal Links
      { from: "wh_dish_pbeam", to: "wh_surge_g2", type: "copper", label: "Shielded STP Ground", speed: "1 Gbps" },
      { from: "wh_surge_g2", to: "wh_switch_dlink", type: "copper", label: "PoE Uplink", speed: "1 Gbps" },
      { from: "wh_switch_dlink", to: "wh_netis_cpe", type: "copper", label: "High-Power Outdoor AP", speed: "100 Mbps" },
      { from: "wh_switch_dlink", to: "wh_tplink_cpe", type: "copper", label: "Pharos AP Yards", speed: "100 Mbps" },
      { from: "wh_netis_cpe", to: "wh_scanners", type: "rf", label: "2.4GHz Barcode Wi-Fi", speed: "54 Mbps" },
      { from: "wh_switch_dlink", to: "wh_cctv_poe", type: "copper", label: "VLAN 50 CCTV Stream", speed: "100 Mbps" },

      // Factory Internal Links
      { from: "factory_dish_af", to: "factory_sw_cisco", type: "copper", label: "Carrier Uplink", speed: "1 Gbps" },
      { from: "factory_sw_cisco", to: "factory_scada_plc", type: "copper", label: "Isolated SCADA VLAN", speed: "100 Mbps" },
      { from: "factory_sw_cisco", to: "factory_ap_tenda", type: "copper", label: "Maintenance Wi-Fi", speed: "1 Gbps" },

      // Kiosks Internal Links
      { from: "kiosk_loco_1", to: "kiosk_router_1", type: "copper", label: "LAN Port (No DHCP)", speed: "100 Mbps" },
      { from: "kiosk_router_1", to: "kiosk_pos_1", type: "copper", label: "Static POS VLAN 30", speed: "100 Mbps" },
      { from: "kiosk_loco_2", to: "kiosk_router_2", type: "copper", label: "LAN Port (No DHCP)", speed: "100 Mbps" },
      { from: "kiosk_router_2", to: "kiosk_pos_2", type: "copper", label: "Static POS VLAN 30", speed: "100 Mbps" },

      // Remote Teleworkers VPN Links
      { from: "core_router_ccr", to: "remote_vpn_gw", type: "vpn", label: "WireGuard Interface", speed: "500 Mbps" },
      { from: "remote_vpn_gw", to: "remote_laptops", type: "vpn", label: "Encrypted Tunnel 1", speed: "50 Mbps" },
      { from: "remote_vpn_gw", to: "remote_tablets", type: "vpn", label: "Encrypted Tunnel 2", speed: "30 Mbps" }
    ];

    // Flying Packets Pool
    this.packets = [];
    this.initPackets();

    // Bind canvas event listeners
    this.bindEvents();

    // Canvas size initialization
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());

    // Start 60 FPS animation loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initPackets() {
    this.packets = [];
    for (let link of this.links) {
      let pType = "web";
      if (link.type === "fiber") pType = "web";
      else if (link.label.includes("VoIP") || link.label.includes("Voice")) pType = "voip";
      else if (link.label.includes("CCTV") || link.label.includes("NVR")) pType = "cctv";
      else if (link.type === "vpn") pType = "vpn";

      this.packets.push({
        link: link,
        progress: Math.random(),
        speed: (0.003 + Math.random() * 0.005) * this.state.speedMultiplier,
        type: pType
      });

      if (link.speed.includes("10 Gbps") || link.type === "fiber" || link.type === "rf_long") {
        this.packets.push({
          link: link,
          progress: Math.random(),
          speed: (0.004 + Math.random() * 0.006) * this.state.speedMultiplier,
          type: pType
        });
      }
    }
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const container = this.canvas.parentElement;
    if (container) {
      this.canvas.width = container.clientWidth || 1550;
      this.canvas.height = container.clientHeight || 920;
    }
  }

  // =========================================================================
  // 3D PROJECTION & SPATIAL MATH ENGINE
  // =========================================================================
  project(x, y, z = 0) {
    if (this.state.viewMode === "2d") {
      return {
        x: this.state.offsetX + x * this.state.scale,
        y: this.state.offsetY + y * this.state.scale,
        scale: this.state.scale,
        depth: 0,
        visible: true
      };
    }

    // Universe center of gravity
    const cx = 760;
    const cy = 460;
    const dx = x - cx;
    const dy = y - cy;
    const dz = z || 0;

    // 1. Azimuth Rotation (Yaw around Z-axis)
    const cosY = Math.cos(this.state.yaw);
    const sinY = Math.sin(this.state.yaw);
    const x1 = dx * cosY - dy * sinY;
    const y1 = dx * sinY + dy * cosY;
    const z1 = dz;

    // 2. Elevation Tilt (Pitch around X-axis)
    const cosP = Math.cos(this.state.pitch);
    const sinP = Math.sin(this.state.pitch);
    const x2 = x1;
    const y2 = y1 * cosP - z1 * sinP;
    const z2 = y1 * sinP + z1 * cosP;

    // 3. Perspective or Isometric projection
    let persp = 1;
    if (this.state.viewMode === "3d") {
      const fov = this.state.cameraDist;
      persp = fov / Math.max(150, fov - z2);
    }

    const screenCenterX = this.canvas.width / 2;
    const screenCenterY = this.canvas.height / 2;

    const px = screenCenterX + (x2 * this.state.scale * persp) + this.state.offsetX;
    const py = screenCenterY + (y2 * this.state.scale * persp) + this.state.offsetY;

    return {
      x: px,
      y: py,
      scale: this.state.scale * persp,
      depth: z2,
      persp: persp,
      visible: true
    };
  }

  // =========================================================================
  // INTERACTION & 3D ORBIT CONTROLS
  // =========================================================================
  bindEvents() {
    if (!this.canvas) return;

    // Mouse Down
    this.canvas.addEventListener('mousedown', (e) => {
      this.state.isDragging = true;
      this.state.lastMouseX = e.clientX;
      this.state.lastMouseY = e.clientY;

      // Right click or Shift key enables Pan mode; Left click rotates
      if (e.button === 2 || e.shiftKey) {
        this.state.dragMode = "pan";
      } else {
        this.state.dragMode = "rotate";
      }
    });

    // Mouse Move (3D Orbit & Pan)
    window.addEventListener('mousemove', (e) => {
      if (!this.state.isDragging) return;

      const deltaX = e.clientX - this.state.lastMouseX;
      const deltaY = e.clientY - this.state.lastMouseY;

      this.state.lastMouseX = e.clientX;
      this.state.lastMouseY = e.clientY;

      if (this.state.viewMode === "2d" || this.state.dragMode === "pan") {
        this.state.offsetX += deltaX;
        this.state.offsetY += deltaY;
      } else {
        // 3D Orbit: Horizontal mouse movement controls Yaw; Vertical controls Pitch
        this.state.yaw += deltaX * 0.0055;
        this.state.pitch = Math.max(0.25, Math.min(1.48, this.state.pitch + deltaY * 0.0055));
        this.update3DAngleBadge();
      }
    });

    // Mouse Up
    window.addEventListener('mouseup', () => {
      this.state.isDragging = false;
    });

    // Prevent default context menu on right click for panning
    this.canvas.addEventListener('contextmenu', (e) => e.preventDefault());

    // Click Node Selection (3D Hit Testing)
    this.canvas.addEventListener('click', (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      let foundNode = null;
      let minDistance = 35; // Selection hit radius

      for (let node of this.nodes) {
        const p = this.project(node.x, node.y, node.z);
        const dist = Math.hypot(clickX - p.x, clickY - p.y);
        if (dist < minDistance * p.scale) {
          minDistance = dist;
          foundNode = node;
        }
      }

      if (foundNode) {
        this.state.selectedNode = foundNode;
        this.renderNodeHUD(foundNode);
      } else {
        // Check if clicked outside
        const hud = document.getElementById('topology-hud');
        if (hud && !hud.contains(e.target) && !e.target.closest('.hud-card')) {
          // Keep hud open if node was clicked, otherwise keep previous
        }
      }
    });

    // Touch Support for Mobile / Tablet 3D gestures
    let initialTouchDist = 0;
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        this.state.isDragging = true;
        this.state.dragMode = "rotate";
        this.state.lastMouseX = e.touches[0].clientX;
        this.state.lastMouseY = e.touches[0].clientY;
      } else if (e.touches.length === 2) {
        this.state.isDragging = false;
        initialTouchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }, { passive: true });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches.length === 1 && this.state.isDragging) {
        const deltaX = e.touches[0].clientX - this.state.lastMouseX;
        const deltaY = e.touches[0].clientY - this.state.lastMouseY;
        this.state.lastMouseX = e.touches[0].clientX;
        this.state.lastMouseY = e.touches[0].clientY;

        if (this.state.viewMode === "2d") {
          this.state.offsetX += deltaX;
          this.state.offsetY += deltaY;
        } else {
          this.state.yaw += deltaX * 0.007;
          this.state.pitch = Math.max(0.25, Math.min(1.48, this.state.pitch + deltaY * 0.007));
          this.update3DAngleBadge();
        }
      } else if (e.touches.length === 2) {
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = currentDist / (initialTouchDist || 1);
        if (factor > 1.05) { this.zoomIn(); initialTouchDist = currentDist; }
        else if (factor < 0.95) { this.zoomOut(); initialTouchDist = currentDist; }
      }
    }, { passive: true });

    this.canvas.addEventListener('touchend', () => {
      this.state.isDragging = false;
    });

    // Mouse wheel zoom
    this.canvas.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY < 0) this.zoomIn();
      else this.zoomOut();
    }, { passive: false });
  }

  // =========================================================================
  // CAMERA CONTROLS & 3D VIEW MODES
  // =========================================================================
  setViewMode(mode) {
    this.state.viewMode = mode;
    const container = this.canvas.parentElement;

    if (mode === "3d") {
      this.state.pitch = 0.92; // ~53 degrees
      this.state.yaw = -0.38;  // ~-22 degrees
      if (container) container.classList.add('is-3d');
    } else if (mode === "iso") {
      this.state.pitch = 0.615; // 35.26 degrees (True Isometric)
      this.state.yaw = 0.785;  // 45 degrees
      if (container) container.classList.add('is-3d');
    } else {
      this.state.pitch = 0;
      this.state.yaw = 0;
      if (container) container.classList.remove('is-3d');
    }

    // Update buttons in toolbar
    document.querySelectorAll('#btn-view-3d, #btn-view-iso, #btn-view-2d').forEach(b => b.classList.remove('active'));
    const activeBtn = document.getElementById(`btn-view-${mode}`);
    if (activeBtn) activeBtn.classList.add('active');

    this.update3DAngleBadge();
  }

  rotateYaw(degrees) {
    this.state.yaw += (degrees * Math.PI) / 180;
    this.update3DAngleBadge();
  }

  togglePitch() {
    if (this.state.pitch > 0.8) {
      this.state.pitch = 0.55; // Low dramatic view
    } else {
      this.state.pitch = 1.05; // High overhead view
    }
    this.update3DAngleBadge();
  }

  reset3DView() {
    this.state.scale = 0.92;
    this.state.offsetX = 0;
    this.state.offsetY = 0;
    this.state.pitch = 0.92;
    this.state.yaw = -0.38;
    this.state.selectedNode = null;
    this.update3DAngleBadge();
  }

  update3DAngleBadge() {
    const badge = document.getElementById('topo-3d-angle-badge');
    if (!badge) return;
    const pDeg = Math.round((this.state.pitch * 180) / Math.PI);
    const yDeg = Math.round((this.state.yaw * 180) / Math.PI);
    badge.innerHTML = `📐 3D: ${pDeg}° / ${yDeg}°`;
  }

  zoomIn() {
    this.state.scale = Math.min(this.state.scale + 0.12, 2.4);
  }

  zoomOut() {
    this.state.scale = Math.max(this.state.scale - 0.12, 0.4);
  }

  resetView() {
    this.reset3DView();
  }

  setSpeed(factor) {
    this.state.speedMultiplier = factor;
    for (let p of this.packets) {
      p.speed = (0.003 + Math.random() * 0.005) * factor;
    }
    document.querySelectorAll('.speed-seg-btn').forEach(btn => {
      const spd = parseFloat(btn.dataset.speed);
      if (spd === factor) btn.classList.add('active');
      else btn.classList.remove('active');
    });
  }

  toggleTheaterMode() {
    const wrapper = document.querySelector('.topology-wrapper');
    if (!wrapper) return;
    wrapper.classList.toggle('theater-mode');
    setTimeout(() => this.resizeCanvas(), 350);
  }

  focusStage(stageKey) {
    const targetNode = this.nodes.find(n => n.stage === stageKey);
    if (targetNode) {
      this.state.selectedNode = targetNode;
      this.renderNodeHUD(targetNode);

      // In 3D mode, smoothly steer camera toward the zone
      const p = this.project(targetNode.x, targetNode.y, targetNode.z);
      const cx = this.canvas.width / 2;
      const cy = this.canvas.height / 2;
      this.state.offsetX += (cx - p.x) * 0.6;
      this.state.offsetY += (cy - p.y) * 0.6;
    }

    document.querySelectorAll('.pipeline-stage-card').forEach(card => {
      if (card.dataset.stage === stageKey) card.classList.add('active');
      else card.classList.remove('active');
    });
  }

  // =========================================================================
  // ANIMATION & 3D RENDERING LOOP
  // =========================================================================
  animate() {
    this.render();
    requestAnimationFrame(this.animate);
  }

  render() {
    const { ctx, canvas } = this;
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 1. Draw 3D Ground Cyber Grid
    this.drawGrid3D();

    // 2. Draw 3D Floating Zone Platforms (Extruded Plazas)
    this.drawZones3D();

    // 3. Draw 3D Lattice Master Tower in Zone 2
    this.drawTower3D();

    // 4. Draw 3D Interconnect Links & Spatial RF Arcs
    this.drawLinks3D();

    // 5. Draw 3D Flying Packets & Ground Shadows
    this.drawPackets3D();

    // 6. Draw 3D Devices with Extruded Pedestals & Billboards (Depth Sorted)
    this.drawNodes3D();
  }

  // Draw 3D Ground Cyber Grid
  drawGrid3D() {
    const { ctx } = this;
    ctx.save();
    ctx.strokeStyle = "rgba(30, 41, 59, 0.35)";
    ctx.lineWidth = 1;

    const step = 90;
    const minX = -100;
    const maxX = 1600;
    const minY = -100;
    const maxY = 1000;

    // Horizontal grid lines on Z=0
    for (let y = minY; y <= maxY; y += step) {
      const pStart = this.project(minX, y, 0);
      const pEnd = this.project(maxX, y, 0);
      ctx.beginPath();
      ctx.moveTo(pStart.x, pStart.y);
      ctx.lineTo(pEnd.x, pEnd.y);
      ctx.stroke();
    }

    // Vertical grid lines on Z=0
    for (let x = minX; x <= maxX; x += step) {
      const pStart = this.project(x, minY, 0);
      const pEnd = this.project(x, maxY, 0);
      ctx.beginPath();
      ctx.moveTo(pStart.x, pStart.y);
      ctx.lineTo(pEnd.x, pEnd.y);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Draw 3D Floating Zone Platforms
  drawZones3D() {
    const { ctx } = this;
    ctx.save();

    for (let zone of this.zones) {
      const elevation = 0;
      const thickness = 18; // Platform vertical extrusion height

      // 4 corners of platform at Z = elevation (Top Surface)
      const p0 = this.project(zone.x, zone.y, elevation);
      const p1 = this.project(zone.x + zone.w, zone.y, elevation);
      const p2 = this.project(zone.x + zone.w, zone.y + zone.h, elevation);
      const p3 = this.project(zone.x, zone.y + zone.h, elevation);

      // 4 corners at Z = elevation - thickness (Bottom Base)
      const b0 = this.project(zone.x, zone.y, elevation - thickness);
      const b1 = this.project(zone.x + zone.w, zone.y, elevation - thickness);
      const b2 = this.project(zone.x + zone.w, zone.y + zone.h, elevation - thickness);
      const b3 = this.project(zone.x, zone.y + zone.h, elevation - thickness);

      // Front & Side Extruded Walls (3D Bevel depth)
      ctx.fillStyle = "rgba(10, 16, 30, 0.85)";
      ctx.strokeStyle = "rgba(30, 41, 59, 0.7)";
      ctx.lineWidth = 1;

      // Front face
      ctx.beginPath();
      ctx.moveTo(p3.x, p3.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(b2.x, b2.y);
      ctx.lineTo(b3.x, b3.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Right side face
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(b2.x, b2.y);
      ctx.lineTo(b1.x, b1.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Top Surface
      ctx.fillStyle = zone.color;
      ctx.strokeStyle = zone.border;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.lineTo(p3.x, p3.y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Floating Zone Label Plate in 3D
      const labelPos = this.project(zone.x + 18, zone.y + 24, elevation + 5);
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 13px 'Segoe UI', Cairo, sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(`${zone.icon} ${zone.name}`, labelPos.x, labelPos.y);
    }

    ctx.restore();
  }

  // Draw 3D Lattice Master Tower in Zone 2
  drawTower3D() {
    const { ctx } = this;
    ctx.save();

    // Tower base location and height
    const tx = 740;
    const ty = 180;
    const baseW = 55;
    const topW = 16;
    const towerH = 140;

    // 4 base points at ground Z=0
    const b1 = this.project(tx - baseW, ty - baseW, 0);
    const b2 = this.project(tx + baseW, ty - baseW, 0);
    const b3 = this.project(tx + baseW, ty + baseW, 0);
    const b4 = this.project(tx - baseW, ty + baseW, 0);

    // 4 top points at tower platform Z=towerH
    const t1 = this.project(tx - topW, ty - topW, towerH);
    const t2 = this.project(tx + topW, ty - topW, towerH);
    const t3 = this.project(tx + topW, ty + topW, towerH);
    const t4 = this.project(tx - topW, ty + topW, towerH);

    // Tower peak mast Z=towerH+35
    const peak = this.project(tx, ty, towerH + 35);

    // Draw Steel Legs
    ctx.strokeStyle = "rgba(245, 158, 11, 0.75)";
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(b1.x, b1.y); ctx.lineTo(t1.x, t1.y);
    ctx.moveTo(b2.x, b2.y); ctx.lineTo(t2.x, t2.y);
    ctx.moveTo(b3.x, b3.y); ctx.lineTo(t3.x, t3.y);
    ctx.moveTo(b4.x, b4.y); ctx.lineTo(t4.x, t4.y);
    ctx.stroke();

    // Diagonal Cross-Bracing Struts (X-trusses)
    ctx.strokeStyle = "rgba(245, 158, 11, 0.4)";
    ctx.lineWidth = 1;
    const tiers = 4;
    for (let i = 1; i <= tiers; i++) {
      const zRatio = i / tiers;
      const wCur = baseW - (baseW - topW) * zRatio;
      const zCur = towerH * zRatio;

      const pFrontL = this.project(tx - wCur, ty + wCur, zCur);
      const pFrontR = this.project(tx + wCur, ty + wCur, zCur);
      const pBackL = this.project(tx - wCur, ty - wCur, zCur);
      const pBackR = this.project(tx + wCur, ty - wCur, zCur);

      ctx.beginPath();
      ctx.moveTo(pFrontL.x, pFrontL.y); ctx.lineTo(pFrontR.x, pFrontR.y);
      ctx.moveTo(pFrontL.x, pFrontL.y); ctx.lineTo(pBackL.x, pBackL.y);
      ctx.moveTo(pFrontR.x, pFrontR.y); ctx.lineTo(pBackR.x, pBackR.y);
      ctx.stroke();
    }

    // Top Platform Deck
    ctx.fillStyle = "rgba(245, 158, 11, 0.25)";
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(t1.x, t1.y); ctx.lineTo(t2.x, t2.y);
    ctx.lineTo(t3.x, t3.y); ctx.lineTo(t4.x, t4.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Peak Antenna Mast & Obstruction Beacon
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo((t1.x + t3.x) / 2, (t1.y + t3.y) / 2);
    ctx.lineTo(peak.x, peak.y);
    ctx.stroke();

    // Blinking FAA Obstruction Beacon Light
    const now = Date.now();
    const isBeaconOn = (now % 1200) < 600;
    if (isBeaconOn) {
      ctx.fillStyle = "#ef4444";
      ctx.shadowColor = "#ef4444";
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(peak.x, peak.y, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // Draw 3D Spatial Links & Elevated RF Arcs
  drawLinks3D() {
    const { ctx } = this;
    ctx.save();

    for (let link of this.links) {
      const fromNode = this.nodes.find(n => n.id === link.from);
      const toNode = this.nodes.find(n => n.id === link.to);
      if (!fromNode || !toNode) continue;

      // Color and line styling
      if (this.state.simState.wan1Down && link.from === "isp1_fiber") {
        ctx.strokeStyle = "#ef4444";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([5, 5]);
      } else if (this.state.simState.rfInterference && (link.type === "rf" || link.type === "rf_long")) {
        ctx.strokeStyle = "#eab308";
        ctx.lineWidth = 3.5;
        ctx.setLineDash([6, 3]);
      } else if (link.type === "fiber") {
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 3.5;
        ctx.shadowColor = "#38bdf8";
        ctx.shadowBlur = 7;
        ctx.setLineDash([]);
      } else if (link.type === "rf" || link.type === "rf_long") {
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 2.5;
        ctx.shadowColor = "#f59e0b";
        ctx.shadowBlur = 5;
        ctx.setLineDash([5, 4]);
      } else if (link.type === "vpn") {
        ctx.strokeStyle = "#e879f9";
        ctx.lineWidth = 2.5;
        ctx.setLineDash([6, 3]);
      } else {
        ctx.strokeStyle = "#475569";
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
      }

      // Parabolic 3D Arc for RF Links; Straight 3D path for cables
      if (link.type === "rf" || link.type === "rf_long") {
        ctx.beginPath();
        const segments = 12;
        const arcHeight = link.type === "rf_long" ? 90 : 50;

        for (let i = 0; i <= segments; i++) {
          const t = i / segments;
          const curX = fromNode.x + (toNode.x - fromNode.x) * t;
          const curY = fromNode.y + (toNode.y - fromNode.y) * t;
          const curZ = fromNode.z + (toNode.z - fromNode.z) * t + arcHeight * Math.sin(Math.PI * t);

          const proj = this.project(curX, curY, curZ);
          if (i === 0) ctx.moveTo(proj.x, proj.y);
          else ctx.lineTo(proj.x, proj.y);
        }
        ctx.stroke();
      } else {
        const pFrom = this.project(fromNode.x, fromNode.y, fromNode.z);
        const pTo = this.project(toNode.x, toNode.y, toNode.z);
        ctx.beginPath();
        ctx.moveTo(pFrom.x, pFrom.y);
        ctx.lineTo(pTo.x, pTo.y);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // Draw 3D Flying Packets & Projected Ground Shadows
  drawPackets3D() {
    const { ctx } = this;
    const { wan1Down } = this.state.simState;
    ctx.save();

    for (let p of this.packets) {
      if (wan1Down && p.link.from === "isp1_fiber") {
        p.link = this.links.find(l => l.from === "isp2_backup") || p.link;
      }

      const fromNode = this.nodes.find(n => n.id === p.link.from);
      const toNode = this.nodes.find(n => n.id === p.link.to);
      if (!fromNode || !toNode) continue;

      p.progress += p.speed;
      if (p.progress > 1) p.progress = 0;

      const t = p.progress;
      let curX = fromNode.x + (toNode.x - fromNode.x) * t;
      let curY = fromNode.y + (toNode.y - fromNode.y) * t;
      let curZ = fromNode.z + (toNode.z - fromNode.z) * t;

      if (p.link.type === "rf" || p.link.type === "rf_long") {
        const arcH = p.link.type === "rf_long" ? 90 : 50;
        curZ += arcH * Math.sin(Math.PI * t);
      }

      // Projected packet position in 3D
      const proj = this.project(curX, curY, curZ);

      // Projected ground shadow on Z=0
      const shadow = this.project(curX, curY, 0);

      // Draw Ground Shadow
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      ctx.beginPath();
      ctx.ellipse(shadow.x, shadow.y, 4 * shadow.scale, 2 * shadow.scale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Packet Color
      if (p.type === "voip") ctx.fillStyle = "#c084fc";
      else if (p.type === "cctv") ctx.fillStyle = "#f87171";
      else if (p.type === "vpn") ctx.fillStyle = "#fbbf24";
      else ctx.fillStyle = "#38bdf8";

      // Glowing Packet Head
      ctx.shadowColor = ctx.fillStyle;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, 5 * proj.scale, 0, Math.PI * 2);
      ctx.fill();

      // White Specular Core
      ctx.fillStyle = "#ffffff";
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(proj.x, proj.y, 1.8 * proj.scale, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }

  // Draw 3D Devices with Extruded Pedestals & Depth Sorting
  drawNodes3D() {
    const { ctx } = this;
    ctx.save();

    // Depth sort all nodes back-to-front (Painter's Algorithm)
    const sortedNodes = [...this.nodes].map(node => {
      const proj = this.project(node.x, node.y, node.z);
      const ground = this.project(node.x, node.y, 0);
      return { node, proj, ground };
    }).sort((a, b) => a.proj.depth - b.proj.depth);

    for (let { node, proj, ground } of sortedNodes) {
      const isSelected = this.state.selectedNode && this.state.selectedNode.id === node.id;
      const r = 24 * proj.scale;

      // 1. Drop Shadow on ground plane
      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.beginPath();
      ctx.ellipse(ground.x, ground.y, r * 1.1, r * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();

      // 2. Vertical Stalk / Stand connecting ground to device
      if (node.z > 20) {
        ctx.strokeStyle = "rgba(56, 189, 248, 0.35)";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(ground.x, ground.y);
        ctx.lineTo(proj.x, proj.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 3. 3D Pedestal Body (Extruded Cylinder)
      const h3d = 8 * proj.scale;

      // Side extrusion wall
      ctx.fillStyle = "#090e1a";
      ctx.beginPath();
      ctx.ellipse(proj.x, proj.y + h3d, r, r * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.rect(proj.x - r, proj.y, r * 2, h3d);
      ctx.fill();

      // Top Face Disk
      ctx.fillStyle = isSelected ? "#0369a1" : "#0f172a";
      ctx.strokeStyle = isSelected ? "#ffffff" : node.color;
      ctx.lineWidth = isSelected ? 3 : 2;
      ctx.shadowColor = node.color;
      ctx.shadowBlur = isSelected ? 20 : 8;

      ctx.beginPath();
      ctx.ellipse(proj.x, proj.y, r, r * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Selected Pulsing Beacon Ring
      if (isSelected) {
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(proj.x, proj.y, r * 1.45, r * 0.8, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Node Icon
      ctx.font = `${Math.round(15 * proj.scale)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(node.icon, proj.x, proj.y - 2);

      // Billboard Text Label
      ctx.fillStyle = isSelected ? "#38bdf8" : "#f8fafc";
      ctx.font = `bold ${Math.max(9, Math.round(10.5 * proj.scale))}px 'Segoe UI', Cairo, sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText(node.name, proj.x, proj.y + r * 0.9 + 10);

      ctx.fillStyle = "#94a3b8";
      ctx.font = `${Math.max(8, Math.round(8.5 * proj.scale))}px monospace`;
      ctx.fillText(node.role, proj.x, proj.y + r * 0.9 + 22);
    }

    ctx.restore();
  }

  // =========================================================================
  // SIMULATION CONTROLS & HUD
  // =========================================================================
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

  renderNodeHUD(node) {
    const hud = document.getElementById('topology-hud');
    if (!hud) return;

    // Node to authentic product ID lookup
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
      "kiosk_loco_1": "nanostation-loco5ac",
      "kiosk_router_1": "tplink-wr840n",
      "kiosk_loco_2": "netis-wf2322",
      "kiosk_router_2": "tplink-archer-c6",
      "remote_vpn_gw": "ccr2004"
    };

    const hwId = mapping[node.id];
    let hwItem = null;
    if (typeof NETWORK_DATA !== 'undefined' && NETWORK_DATA.hardware) {
      hwItem = hwId ? NETWORK_DATA.hardware.find(h => h.id === hwId) : null;
    }

    hud.innerHTML = `
      <div class="hud-card p-4 sm:p-5 bg-slate-900/95 border border-cyan-500/50 rounded-2xl shadow-2xl backdrop-blur-md">
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-slate-700 pb-2.5 mb-2.5">
          <div class="flex items-center gap-2.5">
            <span class="text-2xl sm:text-3xl">${node.icon}</span>
            <div>
              <h4 class="font-bold text-white text-sm sm:text-base leading-tight">${node.name}</h4>
              <span class="text-2xs font-mono text-cyan-400">${node.ip}</span>
            </div>
          </div>
          <span class="px-2 py-0.5 rounded text-3xs font-bold font-mono ${node.status === 'online' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-amber-950 text-amber-300 border border-amber-800'}">
            ${node.status.toUpperCase()}
          </span>
        </div>

        <!-- Node Real Photo Thumbnail & Quick Info -->
        ${hwItem ? `
          <div class="flex items-center gap-3 p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 mb-2.5 cursor-pointer hover:border-cyan-500 transition-all" onclick="App.openProductModal('${hwItem.id}')" title="انقر لعرض المواصفات الكاملة">
            <div class="w-16 h-12 flex-shrink-0 bg-slate-900 rounded-lg p-1 flex items-center justify-center border border-slate-800">
              <img src="${hwItem.image || hwItem.svg}" alt="${hwItem.name}" class="max-h-full max-w-full object-contain">
            </div>
            <div class="flex-1 min-w-0">
              <span class="text-3xs font-bold text-cyan-400 font-mono block">${hwItem.brand} • ${hwItem.category}</span>
              <span class="text-xs text-white font-bold block truncate">${hwItem.name}</span>
              <span class="text-3xs text-emerald-400 flex items-center gap-1 font-mono">📸 صورة حقيقية معتمدة</span>
            </div>
          </div>
        ` : ''}

        <!-- Details -->
        <div class="space-y-1.5 text-xs text-slate-300 mb-3 font-sans">
          <div class="flex justify-between">
            <span class="text-slate-400">الوظيفة في المنظومة:</span>
            <span class="text-slate-200 font-medium">${node.role}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">المنطقة والارتفاع:</span>
            <span class="text-cyan-300 font-mono">${node.stage} (Z: ${node.z || 0}m)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-400">فقدان الحزم (Loss):</span>
            <span class="text-green-400 font-mono font-bold">0.00%</span>
          </div>
        </div>

        <!-- Prominent Inspect Button -->
        <button class="w-full py-2 px-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-cyan-900/30 flex items-center justify-center gap-2" onclick="App.openProductModalByNode('${node.id}')">
          <span>📸</span> عرض صورة الجهاز الحقيقية والبيانات والمواصفات
        </button>
      </div>
    `;
    hud.style.display = 'block';
  }
}
