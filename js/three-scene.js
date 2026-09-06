/* ==========================================================================
   THREE.JS 3D CYBER CONSTELLATION & HOLOGRAPHIC SCENE
   Inspired by OVRAX Desktop Wallpaper (Cyan #00e5ff & Gold #f59e0b)
   ========================================================================== */

(function init3DScene() {
  const container = document.getElementById('canvas3d-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 80;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group to hold our 3D elements
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // 1. Central Cyber Holographic Polyhedron (Icosahedron wireframe)
  const geomIco = new THREE.IcosahedronGeometry(22, 1);
  const matIco = new THREE.MeshBasicMaterial({
    color: 0x00e5ff,
    wireframe: true,
    transparent: true,
    opacity: 0.25
  });
  const icoMesh = new THREE.Mesh(geomIco, matIco);
  mainGroup.add(icoMesh);

  // 2. Inner Golden Amber Torus Knot
  const geomTorus = new THREE.TorusKnotGeometry(12, 1.8, 64, 16);
  const matTorus = new THREE.MeshBasicMaterial({
    color: 0xf59e0b,
    wireframe: true,
    transparent: true,
    opacity: 0.22
  });
  const torusMesh = new THREE.Mesh(geomTorus, matTorus);
  mainGroup.add(torusMesh);

  // 3. Floating Cyber Particles & Circuit Nodes (Cyan & Amber)
  const particleCount = 280;
  const particlesGeom = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  const cyanColor = new THREE.Color(0x00e5ff);
  const amberColor = new THREE.Color(0xf59e0b);

  for (let i = 0; i < particleCount; i++) {
    const radius = 35 + Math.random() * 60;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);

    positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = radius * Math.cos(phi);

    const c = Math.random() > 0.5 ? cyanColor : amberColor;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  particlesGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeom.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particlesMat = new THREE.PointsMaterial({
    size: 2.2,
    vertexColors: true,
    transparent: true,
    opacity: 0.75
  });

  const particleSystem = new THREE.Points(particlesGeom, particlesMat);
  mainGroup.add(particleSystem);

  // Mouse Interaction Parallax
  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.03;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.03;
  });

  // Window Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    targetX += (mouseX - targetX) * 0.05;
    targetY += (mouseY - targetY) * 0.05;

    icoMesh.rotation.x += 0.002;
    icoMesh.rotation.y += 0.003;

    torusMesh.rotation.x -= 0.003;
    torusMesh.rotation.y -= 0.002;

    particleSystem.rotation.y += 0.001;

    mainGroup.rotation.y = targetX * 0.02;
    mainGroup.rotation.x = -targetY * 0.02;

    renderer.render(scene, camera);
  }

  animate();
})();
