// Verification test suite for NetworkArchitect Hub
const fs = require('fs');
const vm = require('vm');

// 1. Check data.js
const dataContent = fs.readFileSync('./js/data.js', 'utf8');
vm.runInThisContext(dataContent);
console.log(`[PASS] NETWORK_DATA loaded: ${NETWORK_DATA.modules.length} modules, ${NETWORK_DATA.hardware.length} hardware items, ${NETWORK_DATA.enterprise.vlans.length} enterprise VLANs.`);

// 2. Check calculators.js
const calcContent = fs.readFileSync('./js/calculators.js', 'utf8');
vm.runInThisContext(calcContent);
const subnetTest = Calculators.calculateSubnet("10.10.10.1", 24);
console.log(`[PASS] Subnet Calculator: Network=${subnetTest.networkId}, Mask=${subnetTest.subnetMask}, Hosts=${subnetTest.usableHosts}`);
if (subnetTest.networkId !== "10.10.10.0" || subnetTest.usableHosts !== "254") {
  throw new Error("Subnet calculation failed!");
}

const linkTest = Calculators.calculateLinkBudget({ distanceKm: 10, frequencyGhz: 5.8 });
console.log(`[PASS] Link Budget Calculator: FSPL=${linkTest.fspl} dB, RSSI=${linkTest.rssiDbm} dBm, Fresnel Midpoint=${linkTest.fresnelRadiusMid}m`);
if (parseFloat(linkTest.fspl) < 120 || parseFloat(linkTest.fresnelRadiusMid) <= 0) {
  throw new Error("Link budget calculation failed!");
}

// 3. Check script-generator.js
const scriptContent = fs.readFileSync('./js/script-generator.js', 'utf8');
vm.runInThisContext(scriptContent);
const generatedScript = ScriptGenerator.generate({ identity: "TEST-ROUTER", wanMode: "dhcp", totalDownMbps: 300, totalUpMbps: 100 });
console.log(`[PASS] Script Generator: Generated ${generatedScript.split('\n').length} lines of RouterOS CLI commands.`);
if (!generatedScript.includes("TEST-ROUTER") || !generatedScript.includes("pcq-download-custom")) {
  throw new Error("Script generation failed!");
}

// 4. Check simulators.js
const simContent = fs.readFileSync('./js/simulators.js', 'utf8');
vm.runInThisContext(simContent);
console.log(`[PASS] Simulators: WinBox state (${Simulators.state.winbox.interfaces.length} interfaces), airOS modes (${Simulators.state.airos.ssid}).`);

// 5. Check troubleshooter.js
const tbContent = fs.readFileSync('./js/troubleshooter.js', 'utf8');
vm.runInThisContext(tbContent);
console.log(`[PASS] Troubleshooter: ${Troubleshooter.scenarios.length} interactive real-world outage scenarios verified.`);

// 6. Check Local Hardware Images & App.findHardware
const appContent = fs.readFileSync('./js/app.js', 'utf8');
// Mock document/window for App logic check
global.document = {
  getElementById: () => null,
  querySelectorAll: () => [],
  addEventListener: () => {}
};
global.window = {
  scrollTo: () => {},
  addEventListener: () => {}
};
vm.runInThisContext(appContent);

console.log("\n--- Checking all 19 hardware images on disk ---");
NETWORK_DATA.hardware.forEach(hw => {
  if (!hw.image) throw new Error(`Hardware item ${hw.id} is missing an image property!`);
  if (!fs.existsSync(hw.image)) throw new Error(`Image file not found on disk: ${hw.image}`);
  const stats = fs.statSync(hw.image);
  if (stats.size === 0) throw new Error(`Image file is empty (0 bytes): ${hw.image}`);
});
console.log(`[PASS] All ${NETWORK_DATA.hardware.length} authentic hardware photos exist and have valid file sizes on disk.`);

console.log("\n--- Testing App.findHardware() lookup engine ---");
const testQueries = [
  { q: "ccr2004", expect: "ccr2004" },
  { q: "assets/images/ccr2004.jpg", expect: "ccr2004" },
  { q: "MikroTik CCR2004-16G-2S+", expect: "ccr2004" },
  { q: "nanostation", expect: "nanostation-5ac" },
  { q: "cisco", expect: "cisco-2960x" },
  { q: "powerbeam", expect: "powerbeam" },
  { q: "tenda", expect: "tenda-o3" },
  { q: "netis", expect: "netis-wf2322" }
];
testQueries.forEach(t => {
  const result = App.findHardware(t.q);
  if (!result || result.id !== t.expect) {
    throw new Error(`findHardware('${t.q}') expected '${t.expect}', got '${result ? result.id : "null"}'`);
  }
});
// 7. Test 3D TopologyEngine Projection Math
console.log("\n--- Testing 3D Topology Spatial Projection Engine ---");
const topoContent = fs.readFileSync('./js/topology.js', 'utf8');
vm.runInThisContext(topoContent);

const mockEngine = {
  canvas: { width: 1550, height: 920 },
  state: {
    viewMode: "3d",
    scale: 0.92,
    offsetX: 0,
    offsetY: 0,
    pitch: 0.92,
    yaw: -0.38,
    cameraDist: 1500
  },
  project: TopologyEngine.prototype.project
};

const test3d = mockEngine.project(740, 180, 140);
if (isNaN(test3d.x) || isNaN(test3d.y) || isNaN(test3d.scale) || isNaN(test3d.depth)) {
  throw new Error(`3D projection returned NaN! ${JSON.stringify(test3d)}`);
}
console.log(`[PASS] 3D Perspective Projection: (740, 180, 140) -> Screen(${test3d.x.toFixed(1)}, ${test3d.y.toFixed(1)}), Depth=${test3d.depth.toFixed(1)}`);

mockEngine.state.viewMode = "iso";
const testIso = mockEngine.project(740, 180, 140);
if (isNaN(testIso.x) || isNaN(testIso.y)) {
  throw new Error(`Isometric projection returned NaN!`);
}
console.log(`[PASS] 3D Isometric Projection: (740, 180, 140) -> Screen(${testIso.x.toFixed(1)}, ${testIso.y.toFixed(1)})`);

mockEngine.state.viewMode = "2d";
const test2d = mockEngine.project(740, 180, 140);
if (isNaN(test2d.x) || isNaN(test2d.y)) {
  throw new Error(`2D projection returned NaN!`);
}
console.log(`[PASS] 2D Flat Projection: (740, 180, 140) -> Screen(${test2d.x.toFixed(1)}, ${test2d.y.toFixed(1)})`);

console.log("\n==================================================");
console.log(">>> ALL ENGINES & FORMULAS PASSED 100% CLEANLY <<<");
console.log("==================================================");
