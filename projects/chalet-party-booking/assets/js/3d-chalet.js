/* ==========================================================================
   3D-CHALET.JS - العارض ثلاثي الأبعاد التفاعلي للشاليهات وقاعات المناسبات
   باستخدام Three.js و OrbitControls مع إضاءات ديناميكية ونقاط استكشاف ساخنة
   ========================================================================== */

(function () {
  'use strict';

  let scene, camera, renderer, controls;
  let chaletGroup, poolGroup, stageGroup, tablesGroup, lightsGroup;
  let fairyLights = [];
  let raycaster, mouse;
  let interactiveHotspots = [];
  let currentLightingMode = 'sunset'; // 'day', 'sunset', 'night'

  const container = document.getElementById('chalet-3d-canvas');
  if (!container) return;

  // بيانات النقاط الساخنة التفاعلية (3D Hotspots)
  const hotspotsData = [
    {
      id: 'kosha-stage',
      title: 'مسرح وكوشة العروس VIP',
      position: { x: -8, y: 1.8, z: -4 },
      desc: 'مسرح فندقي مرتفع مجهز بخلفيات زهور طبيعية فاخرة، إضاءة سبوت لايت مسرحية متقدمة، وأحدث أجهزة الدخان الخفيف لزفة لا تُنسى.',
      camTarget: { x: -7, y: 2.2, z: -1 }
    },
    {
      id: 'pool-area',
      title: 'حوض السباحة والجلسات الخارجية',
      position: { x: 5, y: 0.8, z: 2 },
      desc: 'مسبح بتصميم إنفنتي مزود بإضاءات مائية هادئة، محاط بجلسات خيزران ملكية ومظلات فاخرة مع رذاذ تلطيف الأجواء صيفاً.',
      camTarget: { x: 4, y: 3, z: 7 }
    },
    {
      id: 'indoor-hall',
      title: 'الصالة الداخلية الفاخرة',
      position: { x: -3, y: 2.5, z: -9 },
      desc: 'صالة مغلقة مكيفة مركزياً بواجهات زجاجية بانورامية مطلة على المسبح والحديقة، مؤثثة بأرقى الكنب وتجهيزات الضيافة المتكاملة.',
      camTarget: { x: -3, y: 3, z: -4 }
    },
    {
      id: 'dining-banquet',
      title: 'منطقة طاولات الضيافة والبوفيه',
      position: { x: 7, y: 1.2, z: -6 },
      desc: 'طاولات دائرية ملكية مجهزة بمفارش ساتان راقية وسناتر زهور طبيعية، بجانب بوفيه مفتوح متكامل ومحطة قهوة ومشروبات.',
      camTarget: { x: 6, y: 3, z: -2 }
    }
  ];

  // إعدادات الإضاءة حسب الوقت
  const lightingConfigs = {
    day: {
      background: 0xf3f5f8,
      ambientColor: 0xffffff,
      ambientIntensity: 0.85,
      sunColor: 0xfffaed,
      sunIntensity: 1.3,
      sunPosition: [18, 28, 15],
      fogColor: 0xf3f5f8,
      fairyEmissive: 0x333333
    },
    sunset: {
      background: 0xfbeee2,
      ambientColor: 0xffd5b3,
      ambientIntensity: 0.75,
      sunColor: 0xffa043,
      sunIntensity: 1.1,
      sunPosition: [25, 12, 18],
      fogColor: 0xfbeee2,
      fairyEmissive: 0xffd280
    },
    night: {
      background: 0x181d2e,
      ambientColor: 0x4a5578,
      ambientIntensity: 0.45,
      sunColor: 0x6e8cdb,
      sunIntensity: 0.35,
      sunPosition: [-15, 20, -10],
      fogColor: 0x181d2e,
      fairyEmissive: 0xfff0aa
    }
  };

  let dirLight, ambLight, poolLight, stageSpotLight;

  function init3D() {
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    // 1. المشهد والكاميرا
    scene = new THREE.Scene();
    scene.background = new THREE.Color(lightingConfigs.sunset.background);
    scene.fog = new THREE.FogExp2(lightingConfigs.sunset.fogColor, 0.015);

    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 150);
    camera.position.set(20, 15, 22);

    // 2. المحير (Renderer)
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 3. أدوات التحكم (OrbitControls)
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // منع النزول تحت الأرض
    controls.minDistance = 8;
    controls.maxDistance = 50;
    controls.target.set(0, 2, 0);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    // 4. بناء الإضاءة والعناصر
    setupLighting();
    buildEnvironment();
    buildChaletVilla();
    buildSwimmingPool();
    buildKoshaStage();
    buildBanquetTables();
    buildFairyLights();
    buildHotspotMarkers();

    // 5. الأحداث
    window.addEventListener('resize', onWindowResize);
    renderer.domElement.addEventListener('click', onCanvasClick);

    setupUIEventListeners();

    // 6. حلقة التحديث
    animate();
  }

  function setupLighting() {
    lightsGroup = new THREE.Group();
    const config = lightingConfigs[currentLightingMode];

    ambLight = new THREE.AmbientLight(config.ambientColor, config.ambientIntensity);
    lightsGroup.add(ambLight);

    dirLight = new THREE.DirectionalLight(config.sunColor, config.sunIntensity);
    dirLight.position.set(...config.sunPosition);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 80;
    dirLight.shadow.camera.left = -22;
    dirLight.shadow.camera.right = 22;
    dirLight.shadow.camera.top = 22;
    dirLight.shadow.camera.bottom = -22;
    dirLight.shadow.bias = -0.0005;
    lightsGroup.add(dirLight);

    // سبوت لايت مسرح الكوشة
    stageSpotLight = new THREE.SpotLight(0xffeedd, 2.5, 30, Math.PI / 5, 0.4, 1);
    stageSpotLight.position.set(-8, 12, 5);
    stageSpotLight.target.position.set(-8, 1, -4);
    stageSpotLight.castShadow = true;
    lightsGroup.add(stageSpotLight);
    lightsGroup.add(stageSpotLight.target);

    // إضاءة المسبح الزرقاء اللطيفة
    poolLight = new THREE.PointLight(0x38bdf8, 2, 14);
    poolLight.position.set(5, 0.5, 2);
    lightsGroup.add(poolLight);

    scene.add(lightsGroup);
  }

  function buildEnvironment() {
    // الأرضية الخضراء الفاخرة للحديقة
    const lawnGeo = new THREE.PlaneGeometry(60, 60);
    const lawnMat = new THREE.MeshStandardMaterial({
      color: 0x82a878,
      roughness: 0.9,
      metalness: 0.05
    });
    const lawn = new THREE.Mesh(lawnGeo, lawnMat);
    lawn.rotation.x = -Math.PI / 2;
    lawn.receiveShadow = true;
    scene.add(lawn);

    // الرصيف الحجري/الرخام الفاتح المريح للعين
    const terraceGeo = new THREE.BoxGeometry(32, 0.3, 30);
    const terraceMat = new THREE.MeshStandardMaterial({
      color: 0xf5eee4,
      roughness: 0.4,
      metalness: 0.1
    });
    const terrace = new THREE.Mesh(terraceGeo, terraceMat);
    terrace.position.set(0, 0.15, -1);
    terrace.receiveShadow = true;
    scene.add(terrace);

    // ممشى رخامي أنيق
    const walkGeo = new THREE.BoxGeometry(6, 0.08, 14);
    const walkMat = new THREE.MeshStandardMaterial({
      color: 0xfaf6ef,
      roughness: 0.2
    });
    const walkway = new THREE.Mesh(walkGeo, walkMat);
    walkway.position.set(0, 0.35, 10);
    walkway.receiveShadow = true;
    scene.add(walkway);

    // أشجار النخيل وسياج أخضر في المحيط
    createPalmTree(-14, 12);
    createPalmTree(14, 12);
    createPalmTree(-14, -14);
    createPalmTree(14, -14);
  }

  function createPalmTree(x, z) {
    const palm = new THREE.Group();

    // الجذع المنحني قليلاً
    const trunkGeo = new THREE.CylinderGeometry(0.25, 0.4, 6, 8);
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x7c5d3b, roughness: 0.9 });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = 3;
    trunk.castShadow = true;
    trunk.rotation.z = (Math.random() - 0.5) * 0.1;
    palm.add(trunk);

    // أوراق النخيل العلوية
    for (let i = 0; i < 7; i++) {
      const frondGeo = new THREE.ConeGeometry(1.2, 3.5, 5);
      const frondMat = new THREE.MeshStandardMaterial({ color: 0x4f7743, roughness: 0.7 });
      const frond = new THREE.Mesh(frondGeo, frondMat);
      frond.position.set(0, 6, 0);
      frond.rotation.x = 1.1;
      frond.rotation.y = (i * Math.PI) / 3.5;
      frond.castShadow = true;
      palm.add(frond);
    }

    palm.position.set(x, 0, z);
    scene.add(palm);
  }

  function buildChaletVilla() {
    chaletGroup = new THREE.Group();

    // الهيكل الرئيسي للشاليه الأبيض اللؤلؤي
    const buildingGeo = new THREE.BoxGeometry(16, 5.5, 9);
    const buildingMat = new THREE.MeshStandardMaterial({
      color: 0xfcf9f4,
      roughness: 0.35,
      metalness: 0.05
    });
    const building = new THREE.Mesh(buildingGeo, buildingMat);
    building.position.set(-2, 2.75, -10);
    building.castShadow = true;
    building.receiveShadow = true;
    chaletGroup.add(building);

    // الواجهة الزجاجية الكبيرة العصرية
    const glassGeo = new THREE.PlaneGeometry(12, 4);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xdff1f8,
      transparent: true,
      opacity: 0.65,
      roughness: 0.1,
      metalness: 0.1,
      reflectivity: 0.9
    });
    const glassFacade = new THREE.Mesh(glassGeo, glassMat);
    glassFacade.position.set(-2, 2.5, -5.48);
    chaletGroup.add(glassFacade);

    // سقف علوي عصري مسطح مع إضاءة دافئة داخلية
    const roofOverhangGeo = new THREE.BoxGeometry(18, 0.4, 11);
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x3d352e, roughness: 0.5 });
    const roof = new THREE.Mesh(roofOverhangGeo, roofMat);
    roof.position.set(-2, 5.65, -10);
    roof.castShadow = true;
    chaletGroup.add(roof);

    // إضاءة دافئة من داخل الصالة
    const interiorLight = new THREE.PointLight(0xffe6b8, 2, 12);
    interiorLight.position.set(-2, 3, -9);
    chaletGroup.add(interiorLight);

    // برجولا خشبية أمامية فاخرة
    for (let i = 0; i < 6; i++) {
      const beamGeo = new THREE.BoxGeometry(0.2, 0.3, 5);
      const beamMat = new THREE.MeshStandardMaterial({ color: 0xc89d58 });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(-6 + i * 1.8, 4.8, -3);
      beam.castShadow = true;
      chaletGroup.add(beam);
    }

    scene.add(chaletGroup);
  }

  function buildSwimmingPool() {
    poolGroup = new THREE.Group();

    // حوض السباحة الداخلي (انخفاض أرضي)
    const borderGeo = new THREE.BoxGeometry(10.5, 0.5, 7.5);
    const borderMat = new THREE.MeshStandardMaterial({ color: 0xf5ecdf, roughness: 0.3 });
    const border = new THREE.Mesh(borderGeo, borderMat);
    border.position.set(6, 0.25, 2.5);
    border.receiveShadow = true;
    poolGroup.add(border);

    // ماء المسبح اللامع المتلألئ
    const waterGeo = new THREE.PlaneGeometry(9.5, 6.5);
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x14b8a6,
      roughness: 0.15,
      metalness: 0.3,
      transparent: true,
      opacity: 0.85
    });
    const water = new THREE.Mesh(waterGeo, waterMat);
    water.rotation.x = -Math.PI / 2;
    water.position.set(6, 0.42, 2.5);
    poolGroup.add(water);

    // كراسي استرخاء ومظلة فاخرة بجانب المسبح
    for (let i = 0; i < 2; i++) {
      const loungerGeo = new THREE.BoxGeometry(1, 0.25, 2.2);
      const loungerMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const lounger = new THREE.Mesh(loungerGeo, loungerMat);
      lounger.position.set(2.5, 0.4, 1.5 + i * 2);
      lounger.rotation.y = Math.PI / 2;
      lounger.castShadow = true;
      poolGroup.add(lounger);
    }

    scene.add(poolGroup);
  }

  function buildKoshaStage() {
    stageGroup = new THREE.Group();

    // منصة المسرح المرتفعة
    const stagePodiumGeo = new THREE.CylinderGeometry(4.2, 4.5, 0.6, 32);
    const stagePodiumMat = new THREE.MeshStandardMaterial({
      color: 0xfefaf2,
      roughness: 0.2,
      metalness: 0.1
    });
    const podium = new THREE.Mesh(stagePodiumGeo, stagePodiumMat);
    podium.position.set(-8, 0.6, -3.5);
    podium.receiveShadow = true;
    stageGroup.add(podium);

    // قوس الورد والخلفية الملكية للكوشة
    const archGeo = new THREE.TorusGeometry(2.4, 0.15, 12, 32, Math.PI);
    const archMat = new THREE.MeshStandardMaterial({
      color: 0xd8ad64,
      metalness: 0.6,
      roughness: 0.2
    });
    const arch = new THREE.Mesh(archGeo, archMat);
    arch.position.set(-8, 2.8, -4.8);
    stageGroup.add(arch);

    // زهور الباستيل على القوس
    for (let i = 0; i < 18; i++) {
      const flowerGeo = new THREE.DodecahedronGeometry(0.18);
      const flowerMat = new THREE.MeshStandardMaterial({
        color: i % 2 === 0 ? 0xffdfd3 : 0xffffff,
        roughness: 0.6
      });
      const flower = new THREE.Mesh(flowerGeo, flowerMat);
      const angle = (i / 18) * Math.PI;
      flower.position.set(
        -8 + Math.cos(angle) * 2.4,
        2.8 + Math.sin(angle) * 2.4,
        -4.7 + (Math.random() - 0.5) * 0.2
      );
      stageGroup.add(flower);
    }

    // كنب كوشة العروس الملكي VIP
    const sofaGeo = new THREE.BoxGeometry(2.4, 0.8, 0.9);
    const sofaMat = new THREE.MeshStandardMaterial({ color: 0xfffcf5, roughness: 0.7 });
    const sofa = new THREE.Mesh(sofaGeo, sofaMat);
    sofa.position.set(-8, 1.2, -4.2);
    sofa.castShadow = true;
    stageGroup.add(sofa);

    scene.add(stageGroup);
  }

  function buildBanquetTables() {
    tablesGroup = new THREE.Group();

    const tablePositions = [
      { x: 5, z: -5 },
      { x: 8.5, z: -5 },
      { x: 5, z: -8.5 },
      { x: 8.5, z: -8.5 }
    ];

    tablePositions.forEach((pos) => {
      // طاولة دائرية مع مفرش أبيض
      const tableGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.9, 20);
      const tableMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
      const table = new THREE.Mesh(tableGeo, tableMat);
      table.position.set(pos.x, 0.75, pos.z);
      table.castShadow = true;
      table.receiveShadow = true;
      tablesGroup.add(table);

      // سنتر بيس (فازة ورد ذهبية في المنتصف)
      const vaseGeo = new THREE.CylinderGeometry(0.15, 0.1, 0.5, 12);
      const vaseMat = new THREE.MeshStandardMaterial({ color: 0xd8ad64, metalness: 0.8 });
      const vase = new THREE.Mesh(vaseGeo, vaseMat);
      vase.position.set(pos.x, 1.4, pos.z);
      tablesGroup.add(vase);

      // كراسي ذهبية شامبين حول الطاولة
      for (let j = 0; j < 5; j++) {
        const chairAngle = (j * 2 * Math.PI) / 5;
        const chairGeo = new THREE.BoxGeometry(0.4, 0.5, 0.4);
        const chairMat = new THREE.MeshStandardMaterial({ color: 0xc89a4b, metalness: 0.5 });
        const chair = new THREE.Mesh(chairGeo, chairMat);
        chair.position.set(
          pos.x + Math.cos(chairAngle) * 1.6,
          0.55,
          pos.z + Math.sin(chairAngle) * 1.6
        );
        chair.castShadow = true;
        tablesGroup.add(chair);
      }
    });

    scene.add(tablesGroup);
  }

  function buildFairyLights() {
    // شبكة أضواء السهرة المعلقة في الهواء
    const lightGeo = new THREE.SphereGeometry(0.1, 8, 8);
    const config = lightingConfigs[currentLightingMode];

    for (let i = 0; i < 28; i++) {
      const lightMat = new THREE.MeshStandardMaterial({
        color: 0xfff0aa,
        emissive: config.fairyEmissive,
        emissiveIntensity: 0.8,
        roughness: 0.2
      });
      const fairy = new THREE.Mesh(lightGeo, lightMat);
      const t = i / 28;
      fairy.position.set(
        -8 + t * 16 + (Math.random() - 0.5) * 0.5,
        5.2 - Math.sin(t * Math.PI) * 0.8,
        -1 + Math.sin(t * 3) * 2.5
      );
      fairyLights.push(fairy);
      scene.add(fairy);
    }
  }

  function buildHotspotMarkers() {
    interactiveHotspots = [];

    hotspotsData.forEach((data) => {
      const group = new THREE.Group();

      // حلقة دائرية نابضة
      const ringGeo = new THREE.RingGeometry(0.4, 0.55, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xc99a4c,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.85
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      group.add(ring);

      // كرة مركزية متوهجة
      const sphereGeo = new THREE.SphereGeometry(0.28, 16, 16);
      const sphereMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xc99a4c,
        emissiveIntensity: 0.7
      });
      const sphere = new THREE.Mesh(sphereGeo, sphereMat);
      sphere.position.y = 0.3;
      group.add(sphere);

      group.position.set(data.position.x, data.position.y, data.position.z);
      group.userData = data;

      interactiveHotspots.push(group);
      scene.add(group);
    });
  }

  // تبديل أوضاع الإضاءة (نهار / غروب / ليل)
  window.set3DLightingMode = function (mode) {
    if (!lightingConfigs[mode]) return;
    currentLightingMode = mode;
    const config = lightingConfigs[mode];

    scene.background.setHex(config.background);
    scene.fog.color.setHex(config.fogColor);

    ambLight.color.setHex(config.ambientColor);
    ambLight.intensity = config.ambientIntensity;

    dirLight.color.setHex(config.sunColor);
    dirLight.intensity = config.sunIntensity;
    dirLight.position.set(...config.sunPosition);

    fairyLights.forEach((light) => {
      light.material.emissive.setHex(config.fairyEmissive);
    });

    // تحديث الأزرار في الواجهة
    document.querySelectorAll('.lighting-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
  };

  // انتقال سلس للكاميرا إلى زوايا محددة
  window.focus3DZone = function (zoneId) {
    const targetData = hotspotsData.find((h) => h.id === zoneId);
    if (!targetData) return;

    smoothCameraTransition(targetData.camTarget, targetData.position);
    showHotspotDetails(targetData);
  };

  function smoothCameraTransition(newPos, newLookAt) {
    const startPos = camera.position.clone();
    const startTarget = controls.target.clone();
    const startTime = performance.now();
    const duration = 1000; // 1 ثانية

    function updateCamera(time) {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      camera.position.lerpVectors(startPos, new THREE.Vector3(newPos.x, newPos.y, newPos.z), ease);
      controls.target.lerpVectors(
        startTarget,
        new THREE.Vector3(newLookAt.x, newLookAt.y, newLookAt.z),
        ease
      );

      if (progress < 1) {
        requestAnimationFrame(updateCamera);
      }
    }

    requestAnimationFrame(updateCamera);
  }

  function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }

  function onCanvasClick(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const checkObjects = [];
    interactiveHotspots.forEach((h) => checkObjects.push(...h.children));

    const intersects = raycaster.intersectObjects(checkObjects);
    if (intersects.length > 0) {
      const parentHotspot = intersects[0].object.parent;
      if (parentHotspot && parentHotspot.userData) {
        const data = parentHotspot.userData;
        smoothCameraTransition(data.camTarget, data.position);
        showHotspotDetails(data);
      }
    }
  }

  function showHotspotDetails(data) {
    let card = document.getElementById('hotspot-details-box');
    if (!card) return;

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <h4><i class="fa-solid fa-gem" style="color:var(--champagne-primary);"></i> ${data.title}</h4>
        <button type="button" onclick="this.parentElement.parentElement.style.display='none'" style="background:none; border:none; cursor:pointer; font-size:1.1rem; color:#888;">&times;</button>
      </div>
      <p style="margin-top:6px; font-size:0.88rem; color:var(--text-muted);">${data.desc}</p>
      <div style="margin-top:10px; display:flex; gap:8px;">
        <button class="btn btn-champagne" style="padding:5px 14px; font-size:0.8rem;" onclick="document.getElementById('calculator').scrollIntoView({behavior:'smooth'})">
          <i class="fa-solid fa-calendar-check"></i> احجز هذا الشاليه
        </button>
      </div>
    `;
    card.style.display = 'block';
  }

  function setupUIEventListeners() {
    // أزرار الإضاءة
    document.querySelectorAll('.lighting-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.dataset.mode;
        window.set3DLightingMode(mode);
      });
    });

    // أزرار زوايا الكاميرا
    document.querySelectorAll('.camera-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        if (view === 'overview') {
          smoothCameraTransition({ x: 20, y: 15, z: 22 }, { x: 0, y: 2, z: 0 });
        } else if (view === 'kosha') {
          window.focus3DZone('kosha-stage');
        } else if (view === 'pool') {
          window.focus3DZone('pool-area');
        } else if (view === 'banquet') {
          window.focus3DZone('dining-banquet');
        }
      });
    });
  }

  function onWindowResize() {
    if (!container) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function animate() {
    requestAnimationFrame(animate);

    // حركة خفيفة لتموج حلقات النقاط الساخنة
    const time = performance.now() * 0.002;
    interactiveHotspots.forEach((h, index) => {
      const ring = h.children[0];
      if (ring) {
        const scale = 1 + Math.sin(time + index) * 0.12;
        ring.scale.set(scale, scale, scale);
      }
    });

    controls.update();
    renderer.render(scene, camera);
  }

  // بدء التهيئة عند تحميل DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init3D);
  } else {
    init3D();
  }
})();
