/**
 * NetworkArchitect Hub - MikroTik RouterOS Script Generator Engine
 * Generates enterprise-grade RouterOS v7 scripts with security hardening,
 * VLAN filtering, Dual-WAN failover, and PCQ bandwidth fairness.
 */

const ScriptGenerator = {
  generate(config) {
    const {
      identity = "HQ-CCR2004-CORE",
      wanMode = "dhcp", // dhcp, static, pppoe
      wanStaticIp = "197.200.15.22/29",
      wanGateway = "197.200.15.21",
      pppoeUser = "enterprise_fiber@corp.isp",
      pppoePass = "SecureP@ss2026",
      enableDualWan = true,
      lanIp = "10.10.10.1/24",
      dnsServers = "1.1.1.1, 8.8.8.8",
      enableVlans = true,
      totalDownMbps = 200,
      totalUpMbps = 50,
      enablePcq = true,
      enableHardening = true,
      enableFastTrack = true
    } = config;

    const dateStr = new Date().toISOString().split('T')[0];
    let script = [];

    // Header
    script.push(`# =====================================================================`);
    script.push(`# MikroTik RouterOS v7 Enterprise Infrastructure Configuration Script`);
    script.push(`# Generated via NetworkArchitect Hub - Engineering Automation Tool`);
    script.push(`# Generated on: ${dateStr} | Device Identity: ${identity}`);
    script.push(`# =====================================================================\n`);

    // 1. Identity & System Services Hardening
    script.push(`# ---------------------------------------------------------------------`);
    script.push(`# [الخطوة 1]: هوية النظام وتحصين الخدمات وتغيير المنافذ غير المشفرة`);
    script.push(`# ---------------------------------------------------------------------`);
    script.push(`/system identity set name="${identity}"`);
    
    if (enableHardening) {
      script.push(`/ip service disable telnet`);
      script.push(`/ip service disable ftp`);
      script.push(`/ip service disable www`);
      script.push(`/ip service disable api`);
      script.push(`/ip service disable api-ssl`);
      script.push(`/ip service set winbox port=8291`);
      script.push(`/ip service set ssh port=2222`);
      script.push(`/ip neighbor discovery-settings set discover-interface-list=none`);
      script.push(`/tool mac-server set allowed-interface-list=none`);
      script.push(`/tool mac-server mac-winbox set allowed-interface-list=none\n`);
    }

    // 2. Interface Lists & Bridge
    script.push(`# ---------------------------------------------------------------------`);
    script.push(`# [الخطوة 2]: تجميع الواجهات في قوائم (Interface Lists) وإنشاء الجسر المدار`);
    script.push(`# ---------------------------------------------------------------------`);
    script.push(`/interface list add name=WAN`);
    script.push(`/interface list add name=LAN`);
    script.push(`/interface list add name=MGMT`);
    script.push(`/interface list member add list=WAN interface=sfp-sfpplus1`);
    if (enableDualWan) {
      script.push(`/interface list member add list=WAN interface=ether1`);
    }

    if (enableVlans) {
      script.push(`\n# تفعيل الجسر المركزي مع خاصية عزل الشبكات الافتراضية Hardware VLAN Filtering`);
      script.push(`/interface bridge add name=bridge-core vlan-filtering=yes protocol-mode=rstp`);
      script.push(`/interface list member add list=LAN interface=bridge-core`);
      
      // Add ports to bridge
      script.push(`/interface bridge port add bridge=bridge-core interface=sfp-sfpplus2 comment="10G Trunk to Core Switch CRS328"`);
      script.push(`/interface bridge port add bridge=bridge-core interface=ether2 comment="Tower Master Radio AP"`);
      script.push(`/interface bridge port add bridge=bridge-core interface=ether3 comment="HQ Servers Uplink"`);

      // Define VLAN Interfaces
      script.push(`\n# إنشاء واجهات الـ VLANs فوق الجسر المركزي`);
      script.push(`/interface vlan add name=VLAN10_MGMT vlan-id=10 interface=bridge-core`);
      script.push(`/interface vlan add name=VLAN20_SRV vlan-id=20 interface=bridge-core`);
      script.push(`/interface vlan add name=VLAN30_STAFF vlan-id=30 interface=bridge-core`);
      script.push(`/interface vlan add name=VLAN40_VOIP vlan-id=40 interface=bridge-core`);
      script.push(`/interface vlan add name=VLAN50_CCTV vlan-id=50 interface=bridge-core`);
      script.push(`/interface vlan add name=VLAN60_GUEST vlan-id=60 interface=bridge-core`);

      // Bridge VLAN Table
      script.push(`\n# جدول تمرير الـ Tags في الجسر (Trunk & Access)`);
      script.push(`/interface bridge vlan add bridge=bridge-core tagged=bridge-core,sfp-sfpplus2 vlan-ids=10,20,30,40,50,60`);
    } else {
      script.push(`/interface bridge add name=bridge-core protocol-mode=rstp`);
      script.push(`/interface bridge port add bridge=bridge-core interface=ether2`);
      script.push(`/interface bridge port add bridge=bridge-core interface=ether3`);
      script.push(`/interface bridge port add bridge=bridge-core interface=sfp-sfpplus2`);
      script.push(`/interface list member add list=LAN interface=bridge-core`);
    }

    // 3. WAN Configuration
    script.push(`\n# ---------------------------------------------------------------------`);
    script.push(`# [الخطوة 3]: تهيئة اتصالات مزود الخدمة (WAN Interfaces & Failover)`);
    script.push(`# ---------------------------------------------------------------------`);
    if (wanMode === "dhcp") {
      script.push(`/ip dhcp-client add interface=sfp-sfpplus1 disabled=no use-peer-dns=no use-peer-ntp=yes default-route-distance=1 comment="WAN1 Fiber Primary"`);
    } else if (wanMode === "static") {
      script.push(`/ip address add address=${wanStaticIp} interface=sfp-sfpplus1 comment="WAN1 Fiber Static"`);
      script.push(`/ip route add dst-address=0.0.0.0/0 gateway=${wanGateway} distance=1 check-gateway=ping comment="Default Route WAN1"`);
    } else if (wanMode === "pppoe") {
      script.push(`/interface pppoe-client add name=pppoe-out1 interface=sfp-sfpplus1 user="${pppoeUser}" password="${pppoePass}" disabled=no default-route-distance=1 comment="WAN1 Fiber PPPoE"`);
    }

    if (enableDualWan) {
      script.push(`\n# إعداد خط الطوارئ الاحتياطي (WAN2 Backup via ether1 - Distance 2)`);
      script.push(`/ip dhcp-client add interface=ether1 disabled=no use-peer-dns=no default-route-distance=2 comment="WAN2 Backup Link Failover"`);
    }

    // 4. IP Addressing, Pools & DHCP Servers
    script.push(`\n# ---------------------------------------------------------------------`);
    script.push(`# [الخطوة 4]: توزيع العناوين وخوادم الـ DHCP`);
    script.push(`# ---------------------------------------------------------------------`);
    if (enableVlans) {
      script.push(`/ip address add address=10.10.10.1/24 interface=VLAN10_MGMT comment="Gateway MGMT"`);
      script.push(`/ip address add address=10.10.20.1/24 interface=VLAN20_SRV comment="Gateway Servers"`);
      script.push(`/ip address add address=10.10.30.1/23 interface=VLAN30_STAFF comment="Gateway Staff"`);
      script.push(`/ip address add address=10.10.40.1/24 interface=VLAN40_VOIP comment="Gateway VoIP"`);
      script.push(`/ip address add address=10.10.50.1/24 interface=VLAN50_CCTV comment="Gateway CCTV"`);
      script.push(`/ip address add address=10.10.60.1/23 interface=VLAN60_GUEST comment="Gateway Guest"`);

      script.push(`\n# خزانات العناوين (IP Pools)`);
      script.push(`/ip pool add name=pool-staff ranges=10.10.30.50-10.10.31.250`);
      script.push(`/ip pool add name=pool-voip ranges=10.10.40.10-10.10.40.200`);
      script.push(`/ip pool add name=pool-guest ranges=10.10.60.10-10.10.61.250`);

      script.push(`\n# خوادم الـ DHCP`);
      script.push(`/ip dhcp-server add name=dhcp-staff interface=VLAN30_STAFF address-pool=pool-staff lease-time=3d disabled=no`);
      script.push(`/ip dhcp-server add name=dhcp-voip interface=VLAN40_VOIP address-pool=pool-voip lease-time=7d disabled=no`);
      script.push(`/ip dhcp-server add name=dhcp-guest interface=VLAN60_GUEST address-pool=pool-guest lease-time=2h disabled=no`);

      script.push(`\n# شبكات الـ DHCP وموزعات الـ DNS`);
      script.push(`/ip dhcp-server network add address=10.10.30.0/23 gateway=10.10.30.1 dns-server=${dnsServers} comment="Staff Network"`);
      script.push(`/ip dhcp-server network add address=10.10.40.0/24 gateway=10.10.40.1 dns-server=${dnsServers} comment="VoIP Network"`);
      script.push(`/ip dhcp-server network add address=10.10.60.0/23 gateway=10.10.60.1 dns-server=${dnsServers} comment="Guest Network"`);
    } else {
      script.push(`/ip address add address=${lanIp} interface=bridge-core comment="Core LAN Gateway"`);
      script.push(`/ip pool add name=pool-lan ranges=10.10.10.50-10.10.10.250`);
      script.push(`/ip dhcp-server add name=dhcp-lan interface=bridge-core address-pool=pool-lan lease-time=1d disabled=no`);
      script.push(`/ip dhcp-server network add address=10.10.10.0/24 gateway=10.10.10.1 dns-server=${dnsServers}`);
    }

    // DNS Settings
    script.push(`\n# مخدم الأسماء وتسريع التصفح (Local DNS Cache)`);
    script.push(`/ip dns set allow-remote-requests=yes servers=${dnsServers} cache-size=8192KiB`);

    // 5. Firewall & NAT
    script.push(`\n# ---------------------------------------------------------------------`);
    script.push(`# [الخطوة 5]: جدار الحماية المؤسسي وترجمة العناوين (Firewall NAT & Security)`);
    script.push(`# ---------------------------------------------------------------------`);
    script.push(`/ip firewall nat add chain=srcnat out-interface-list=WAN action=masquerade comment="Default NAT Masquerade to WAN"`);

    if (enableHardening) {
      script.push(`\n# إسقاط الحزم التالفة والمزيفة`);
      script.push(`/ip firewall filter add chain=input connection-state=invalid action=drop comment="Drop Invalid Input Packets"`);
      script.push(`/ip firewall filter add chain=input connection-state=established,related action=accept comment="Accept Established/Related Input"`);
      
      script.push(`\n# حماية الراوتر من هجمات تخمين كلمة السر (Brute-Force Protection)`);
      script.push(`/ip firewall filter add chain=input protocol=tcp dst-port=8291 src-address-list=black_list action=drop comment="Drop Blacklisted Attackers"`);
      script.push(`/ip firewall filter add chain=input protocol=tcp dst-port=8291 connection-state=new src-address-list=winbox_stage3 action=add-src-to-address-list address-list=black_list address-list-timeout=1d comment="Add Attacker to 24h Blacklist"`);
      script.push(`/ip firewall filter add chain=input protocol=tcp dst-port=8291 connection-state=new src-address-list=winbox_stage2 action=add-src-to-address-list address-list=winbox_stage3 address-list-timeout=1m`);
      script.push(`/ip firewall filter add chain=input protocol=tcp dst-port=8291 connection-state=new src-address-list=winbox_stage1 action=add-src-to-address-list address-list=winbox_stage2 address-list-timeout=1m`);
      script.push(`/ip firewall filter add chain=input protocol=tcp dst-port=8291 connection-state=new action=add-src-to-address-list address-list=winbox_stage1 address-list-timeout=1m`);
      
      script.push(`\n# منع هجمات استغلال الـ DNS من الإنترنت الخارجي (DNS Amplification)`);
      script.push(`/ip firewall filter add chain=input in-interface-list=WAN protocol=udp dst-port=53 action=drop comment="Block External DNS Requests"`);
      script.push(`/ip firewall filter add chain=input in-interface-list=WAN protocol=tcp dst-port=53 action=drop`);

      if (enableFastTrack) {
        script.push(`\n# تسريع معالجة الحزم FastTrack لتقليل الحمل على المعالج بنسبة 70%`);
        script.push(`/ip firewall filter add chain=forward connection-state=established,related action=fasttrack-connection comment="FastTrack Established Connections"`);
      }
      script.push(`/ip firewall filter add chain=forward connection-state=established,related action=accept`);
      script.push(`/ip firewall filter add chain=forward connection-state=invalid action=drop comment="Drop Invalid Forwarded Packets"`);

      if (enableVlans) {
        script.push(`\n# حظر تداخل شبكة الضيوف مع السيرفرات وشبكة الموظفين (VLAN Isolation)`);
        script.push(`/ip firewall filter add chain=forward in-interface=VLAN60_GUEST out-interface=VLAN20_SRV action=drop comment="Block Guest from Servers"`);
        script.push(`/ip firewall filter add chain=forward in-interface=VLAN60_GUEST out-interface=VLAN30_STAFF action=drop comment="Block Guest from Staff"`);
      }
    }

    // 6. Bandwidth Traffic Shaping (PCQ Fair Queue)
    if (enablePcq) {
      script.push(`\n# ---------------------------------------------------------------------`);
      script.push(`# [الخطوة 6]: التحكم الذكي بالباندويث (PCQ Dynamic Fair Allocation)`);
      script.push(`# يضمن توزيع سرعة خط الـ ${totalDownMbps}M / ${totalUpMbps}M بالتساوي الدقيق ومنع احتكار الخط`);
      script.push(`# ---------------------------------------------------------------------`);
      script.push(`/queue type add name=pcq-download-custom kind=pcq pcq-classifier=dst-address pcq-total-limit=4000 pcq-limit=100`);
      script.push(`/queue type add name=pcq-upload-custom kind=pcq pcq-classifier=src-address pcq-total-limit=4000 pcq-limit=100`);
      
      script.push(`/queue simple add name="TOTAL-BANDWIDTH-FAIR" target=10.10.0.0/16 max-limit=${totalUpMbps}M/${totalDownMbps}M queue=pcq-upload-custom/pcq-download-custom comment="Auto-Fair PCQ Bandwidth Distribution for All Staff"`);
    }

    script.push(`\n# =====================================================================`);
    script.push(`# اكتمل التكوين بنجاح! يتم تشغيل السكربت عبر Winbox -> New Terminal ولصق الأكواد.`);
    script.push(`# =====================================================================`);

    return script.join('\n');
  }
};
