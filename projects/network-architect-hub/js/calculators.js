/**
 * NetworkArchitect Hub - Network & RF Calculators Engine
 * Implements standard IEEE, IETF, and ITU-R formulas for IP Subnetting and RF Link Budgets.
 */

const Calculators = {
  // 1. IP Subnetting & CIDR Calculator
  calculateSubnet(ipStr, prefix) {
    prefix = parseInt(prefix, 10);
    if (isNaN(prefix) || prefix < 1 || prefix > 32) prefix = 24;

    const parts = ipStr.trim().split('.').map(p => parseInt(p, 10));
    if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255)) {
      return { error: "يرجى إدخال عنوان IP صالح بصيغة IPv4 (مثل 10.10.10.1 أو 192.168.88.1)" };
    }

    // Convert IP to 32-bit integer
    const ipInt = ((parts[0] << 24) >>> 0) + ((parts[1] << 16) >>> 0) + ((parts[2] << 8) >>> 0) + (parts[3] >>> 0);

    // Calculate Subnet Mask
    const maskInt = prefix === 0 ? 0 : (((0xFFFFFFFF << (32 - prefix)) >>> 0));
    const wildcardInt = (~maskInt) >>> 0;

    const networkInt = (ipInt & maskInt) >>> 0;
    const broadcastInt = (networkInt | wildcardInt) >>> 0;

    const intToIp = (num) => [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');

    const intToBin = (num) => [
      ((num >>> 24) & 255).toString(2).padStart(8, '0'),
      ((num >>> 16) & 255).toString(2).padStart(8, '0'),
      ((num >>> 8) & 255).toString(2).padStart(8, '0'),
      (num & 255).toString(2).padStart(8, '0')
    ].join('.');

    const totalHosts = Math.pow(2, 32 - prefix);
    let usableHosts = totalHosts > 2 ? totalHosts - 2 : (prefix === 31 ? 2 : 1);
    let firstUsableInt = prefix >= 31 ? networkInt : networkInt + 1;
    let lastUsableInt = prefix >= 31 ? broadcastInt : broadcastInt - 1;

    // IP Class determination
    let ipClass = "A";
    let isPrivate = false;
    if (parts[0] >= 1 && parts[0] <= 126) ipClass = "Class A";
    else if (parts[0] === 127) ipClass = "Loopback";
    else if (parts[0] >= 128 && parts[0] <= 191) ipClass = "Class B";
    else if (parts[0] >= 192 && parts[0] <= 223) ipClass = "Class C";
    else if (parts[0] >= 224 && parts[0] <= 239) ipClass = "Class D (Multicast)";
    else ipClass = "Class E (Experimental)";

    // RFC 1918 Private Check
    if (parts[0] === 10) isPrivate = true;
    else if (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) isPrivate = true;
    else if (parts[0] === 192 && parts[1] === 168) isPrivate = true;

    // Generate Subnet Partitioning suggestions (/24 -> /26, /27, etc.)
    const subnetsBreakdown = [];
    if (prefix <= 28) {
      const splitPrefix = prefix + 2; // e.g. /24 into 4x /26
      const splitStep = Math.pow(2, 32 - splitPrefix);
      for (let i = 0; i < 4; i++) {
        const subNet = (networkInt + i * splitStep) >>> 0;
        const subBc = (subNet + splitStep - 1) >>> 0;
        subnetsBreakdown.push({
          subnetName: `شبكة فرعية VLAN ${i + 1}`,
          cidr: `/${splitPrefix}`,
          network: intToIp(subNet),
          gateway: intToIp(subNet + 1),
          range: `${intToIp(subNet + 1)} - ${intToIp(subBc - 1)}`,
          broadcast: intToIp(subBc),
          capacity: splitStep - 2
        });
      }
    }

    return {
      ip: ipStr,
      prefix: `/${prefix}`,
      subnetMask: intToIp(maskInt),
      subnetMaskBinary: intToBin(maskInt),
      wildcard: intToIp(wildcardInt),
      networkId: intToIp(networkInt),
      broadcast: intToIp(broadcastInt),
      usableRange: `${intToIp(firstUsableInt)} — ${intToIp(lastUsableInt)}`,
      totalHosts: totalHosts.toLocaleString('en-US'),
      usableHosts: usableHosts.toLocaleString('en-US'),
      ipClass: `${ipClass} (${isPrivate ? 'خاص محلي RFC 1918' : 'عام Public'})`,
      isPrivate,
      subnetsBreakdown
    };
  },

  // 2. Fresnel Zone & Wireless Link Budget Calculator
  calculateLinkBudget(params) {
    const {
      distanceKm = 5,
      frequencyGhz = 5.8,
      txPowerDbm = 24,
      txGainDbi = 22,
      txCableLossDb = 1,
      rxGainDbi = 22,
      rxCableLossDb = 1,
      rxSensitivityDbm = -75,
      obstacleHeightMeters = 0,
      obstacleDistanceKm = distanceKm / 2
    } = params;

    const d = parseFloat(distanceKm);
    const f = parseFloat(frequencyGhz);
    const Ptx = parseFloat(txPowerDbm);
    const Gtx = parseFloat(txGainDbi);
    const Ltx = parseFloat(txCableLossDb);
    const Grx = parseFloat(rxGainDbi);
    const Lrx = parseFloat(rxCableLossDb);
    const Sens = parseFloat(rxSensitivityDbm);
    const obsHeight = parseFloat(obstacleHeightMeters);
    const d1 = parseFloat(obstacleDistanceKm) || (d / 2);
    const d2 = d - d1;

    // Free Space Path Loss (FSPL):
    // FSPL (dB) = 20*log10(d) + 20*log10(f_GHz) + 92.45
    const fspl = 20 * Math.log10(d) + 20 * Math.log10(f) + 92.45;

    // Effective Isotropic Radiated Power (EIRP):
    const eirp = Ptx - Ltx + Gtx;

    // Received Signal Level (RSSI):
    // Prx = Ptx - Ltx + Gtx - FSPL + Grx - Lrx
    const rssiDbm = Ptx - Ltx + Gtx - fspl + Grx - Lrx;

    // Fade Margin:
    const fadeMargin = rssiDbm - Sens;

    // 1st Fresnel Zone Radius at Midpoint: r1 = 8.656 * sqrt(d / f)
    const fresnelRadiusMid = 8.656 * Math.sqrt(d / f);

    // Fresnel Zone Radius at custom obstacle distance d1:
    // r_obs = 17.32 * sqrt( (d1 * d2) / (f * d) )
    const fresnelRadiusAtObs = (d1 > 0 && d2 > 0)
      ? 17.32 * Math.sqrt((d1 * d2) / (f * d))
      : fresnelRadiusMid;

    // 60% Clearance required (ITU-R recommendation):
    const clearance60 = 0.6 * fresnelRadiusAtObs;

    // Earth Curvature Bulge at distance d1: h_earth = (d1 * d2) / (12.75 * (4/3)) approx:
    const earthCurvatureMeters = (d1 * d2) / 17.0;

    // Total effective clearance available if obstacle is present:
    const effectiveClearance = fresnelRadiusAtObs - (obsHeight + earthCurvatureMeters);

    // Status evaluation
    let status = { text: "ممتاز (Excellent)", badgeClass: "badge-success", desc: "إشارة قوية وثابتة جداً مع هامش أمان عالي ضد الأمطار والعواصف." };
    if (rssiDbm > -45) {
      status = { text: "إشارة قوية جداً (Overload Risk)", badgeClass: "badge-warning", desc: "الإشارة أعلى من -45 dBm مما قد يشبع معالج الراديو ويسبب تشويشاً، خفض طاقة الإرسال قليلاً." };
    } else if (rssiDbm < -78 || fadeMargin < 10) {
      status = { text: "إشارة ضعيفة / غير مستقرة", badgeClass: "badge-danger", desc: "مستوى الإشارة حرج وسيهبط التعديل إلى BPSK أو تنقطع الحزم مع أول غبار أو مطر." };
    } else if (effectiveClearance < clearance60 && obsHeight > 0) {
      status = { text: "اختراق منطقة فرينل (Fresnel Incursion)", badgeClass: "badge-warning", desc: "العائق يحجب أكثر من 40% من منطقة فرينل، ارفع الأبراج لتفادي تشتت الموجات." };
    } else if (rssiDbm >= -65 && rssiDbm <= -50) {
      status = { text: "المثالي هندسياً (Sweet Spot)", badgeClass: "badge-success", desc: "النطاق الذهبي بين -50 إلى -65 dBm يوفر أقصى سعة تعديل 256QAM واستقرار كامل." };
    }

    return {
      distanceKm: d,
      frequencyGhz: f,
      fspl: fspl.toFixed(2),
      eirp: eirp.toFixed(2),
      rssiDbm: rssiDbm.toFixed(1),
      fadeMargin: fadeMargin.toFixed(1),
      fresnelRadiusMid: fresnelRadiusMid.toFixed(2),
      fresnelRadiusAtObs: fresnelRadiusAtObs.toFixed(2),
      clearance60: clearance60.toFixed(2),
      earthCurvatureMeters: earthCurvatureMeters.toFixed(2),
      effectiveClearance: effectiveClearance.toFixed(2),
      status
    };
  }
};
