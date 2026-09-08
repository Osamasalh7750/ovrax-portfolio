/**
 * SMART VILLA 3D ENGINE
 * محرك المحاكاة والنمذجة ثلاثية الأبعاد التفاعلية للفيلا الذكية
 * مبني باستخدام Three.js ويعمل محلياً 100% دون أي CORS أو اتصال خارجي
 */

class SmartVilla3D {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            console.error("Villa3D: Container not found", containerId);
            return;
        }

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.controls = null;
        this.raycaster = new THREE.Raycaster();
        this.mouse = new THREE.Vector2();

        // Layer groups
        this.layers = {
            architecture: new THREE.Group(),
            furniture: new THREE.Group(),
            lighting: new THREE.Group(),
            security: new THREE.Group(),
            hvac: new THREE.Group(),
            network: new THREE.Group(),
            automation: new THREE.Group(),
            wiring: new THREE.Group()
        };

        // Floor groups
        this.floorGround = new THREE.Group();
        this.floorFirst = new THREE.Group();
        this.roofGroup = new THREE.Group();
        this.outdoorGroup = new THREE.Group();

        // Interactive devices map & meshes
        this.deviceMeshes = [];
        this.roomLights = {};
        this.activeRoom = null;
        this.currentFloor = "all";
        this.isXRayWiring = false;
        this.fireEmergencyActive = false;

        // Dynamic elements
        this.vacuumMesh = null;
        this.vacuumAngle = 0;
        this.vacuumCleaning = false;
        this.fireParticles = [];

        // Lighting elements
        this.dirLight = null;
        this.hemiLight = null;

        // Camera animation
        this.cameraTargetPos = null;
        this.controlsTargetPos = null;
        this.isTransitioningCamera = false;

        this.init();
    }

    init() {
        const width = this.container.clientWidth || 800;
        const height = this.container.clientHeight || 500;

        // Scene
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xf1f5f9); // Clean slate background

        // Camera
        this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        this.camera.position.set(16, 16, 24);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.05;
        this.container.appendChild(this.renderer.domElement);

        // Controls
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.08;
        this.controls.maxPolarAngle = Math.PI / 2.05; // Don't go below ground
        this.controls.minDistance = 3;
        this.controls.maxDistance = 75;
        this.controls.target.set(0, 3, 0);

        // Setup Scene Lighting
        this.setupSunlight();

        // Register Layers into Scene
        Object.values(this.layers).forEach(group => this.scene.add(group));

        // Build Villa Structure
        this.buildOutdoor();
        this.buildGroundFloor();
        this.buildFirstFloor();
        this.buildRoof();
        this.buildFurniture();
        this.buildWiringConduits();
        this.buildSmartDevices();

        // Event listeners
        window.addEventListener("resize", () => this.onResize());
        this.renderer.domElement.addEventListener("pointermove", (e) => this.onPointerMove(e));
        this.renderer.domElement.addEventListener("click", (e) => this.onClick(e));

        // Render loop
        this.animate = this.animate.bind(this);
        requestAnimationFrame(this.animate);
    }

    setupSunlight() {
        this.hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 0.7);
        this.hemiLight.position.set(0, 50, 0);
        this.scene.add(this.hemiLight);

        this.dirLight = new THREE.DirectionalLight(0xfffaed, 1.1);
        this.dirLight.position.set(22, 35, 18);
        this.dirLight.castShadow = true;
        this.dirLight.shadow.mapSize.width = 2048;
        this.dirLight.shadow.mapSize.height = 2048;
        this.dirLight.shadow.camera.near = 0.5;
        this.dirLight.shadow.camera.far = 100;
        const d = 25;
        this.dirLight.shadow.camera.left = -d;
        this.dirLight.shadow.camera.right = d;
        this.dirLight.shadow.camera.top = d;
        this.dirLight.shadow.camera.bottom = -d;
        this.dirLight.shadow.bias = -0.0005;
        this.scene.add(this.dirLight);

        // Soft ambient floor reflection
        const amb = new THREE.AmbientLight(0xf8fafc, 0.35);
        this.scene.add(amb);
    }

    // --- ARCHITECTURAL MODELING ---
    buildOutdoor() {
        const outdoorMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.8 }); // Driveway / Stone
        const grassMat = new THREE.MeshStandardMaterial({ color: 0x86efac, roughness: 0.9 });   // Garden Lawn
        const poolWaterMat = new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            roughness: 0.1,
            metalness: 0.1,
            transparent: true,
            opacity: 0.85
        });

        // Main Site Plot Slab (28m x 26m)
        const siteGeo = new THREE.BoxGeometry(28, 0.4, 26);
        const siteMesh = new THREE.Mesh(siteGeo, outdoorMat);
        siteMesh.position.set(0, -0.2, 0);
        siteMesh.receiveShadow = true;
        this.outdoorGroup.add(siteMesh);

        // Garden Grass Patches
        const grassGeo1 = new THREE.BoxGeometry(10, 0.42, 10);
        const grass1 = new THREE.Mesh(grassGeo1, grassMat);
        grass1.position.set(7.5, -0.18, -6.5);
        grass1.receiveShadow = true;
        this.outdoorGroup.add(grass1);

        const grassGeo2 = new THREE.BoxGeometry(7, 0.42, 8);
        const grass2 = new THREE.Mesh(grassGeo2, grassMat);
        grass2.position.set(8.5, -0.18, 5.5);
        grass2.receiveShadow = true;
        this.outdoorGroup.add(grass2);

        // Swimming Pool
        const poolBorderGeo = new THREE.BoxGeometry(6.4, 0.45, 4.4);
        const poolBorderMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });
        const poolBorder = new THREE.Mesh(poolBorderGeo, poolBorderMat);
        poolBorder.position.set(7.5, -0.16, -6.5);
        this.outdoorGroup.add(poolBorder);

        const waterGeo = new THREE.BoxGeometry(5.8, 0.46, 3.8);
        const water = new THREE.Mesh(waterGeo, poolWaterMat);
        water.position.set(7.5, -0.15, -6.5);
        this.outdoorGroup.add(water);

        // Perimeter Boundary Walls (Low Decorative Walls)
        const wallMat = new THREE.MeshStandardMaterial({ color: 0xcfd8dc, roughness: 0.8 });
        const createBoundary = (w, h, d, x, y, z) => {
            const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
            m.position.set(x, y, z);
            m.castShadow = true;
            m.receiveShadow = true;
            this.outdoorGroup.add(m);
        };
        createBoundary(27.6, 1.2, 0.3, 0, 0.6, -12.8); // Back
        createBoundary(0.3, 1.2, 25.6, 13.8, 0.6, 0);   // Right
        createBoundary(0.3, 1.2, 25.6, -13.8, 0.6, 0);  // Left
        createBoundary(16, 1.2, 0.3, 5.5, 0.6, 12.8);   // Front (with gate opening)

        this.layers.architecture.add(this.outdoorGroup);
    }

    buildGroundFloor() {
        const floorMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.5 });
        const wallMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 });
        const glassMat = new THREE.MeshStandardMaterial({
            color: 0x93c5fd,
            transparent: true,
            opacity: 0.35,
            roughness: 0.1,
            metalness: 0.8
        });

        // Floor Slab (18m x 15m)
        const floorGeo = new THREE.BoxGeometry(18, 0.3, 15);
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.position.set(-1.0, 0.15, 0.5);
        floor.receiveShadow = true;
        this.floorGround.add(floor);

        // Helper to add walls
        const addWall = (w, h, d, x, y, z, mat = wallMat) => {
            const geo = new THREE.BoxGeometry(w, h, d);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(x, y, z);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.floorGround.add(mesh);
            return mesh;
        };

        const H = 3.0; // Wall height
        const Y = H / 2 + 0.3;

        // Outer Walls
        addWall(0.3, H, 15, -10.0, Y, 0.5);  // West exterior wall
        addWall(0.3, H, 15, 8.0, Y, 0.5);    // East exterior wall
        addWall(18.3, H, 0.3, -1.0, Y, -7.0); // North exterior wall
        addWall(8.0, H, 0.3, -6.0, Y, 8.0);  // South (Garage/Entrance left)
        addWall(6.0, H, 0.3, 5.0, Y, 8.0);   // South (Majlis right)

        // Glass Front Windows / Facade
        addWall(4.0, H - 0.2, 0.1, -0.5, Y, 8.0, glassMat); // Glass main door foyer
        addWall(5.0, H - 0.4, 0.1, 5.0, Y, 2.5, glassMat);  // Majlis garden window

        // Interior Partition Walls
        // Garage divider
        addWall(0.25, H, 6.5, -5.0, Y, 4.75);
        // Entrance Hallway dividers
        addWall(4.5, H, 0.25, -2.5, Y, 3.5);
        addWall(0.25, H, 4.0, 1.5, Y, 5.5);
        // Living Room vs Kitchen
        addWall(0.25, H, 6.0, -1.5, Y, -3.5);
        // Majlis vs Dining
        addWall(7.5, H, 0.25, 4.25, Y, 2.5);
        // Tech Room Walls (Behind kitchen/hall)
        addWall(3.2, H, 0.25, -3.0, Y, -1.5);
        addWall(0.25, H, 3.0, -4.6, Y, -3.0);

        this.layers.architecture.add(this.floorGround);
    }

    buildFirstFloor() {
        const floorMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.5 });
        const wallMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 });
        const glassMat = new THREE.MeshStandardMaterial({
            color: 0x93c5fd,
            transparent: true,
            opacity: 0.35,
            roughness: 0.1,
            metalness: 0.8
        });

        const slabY = 3.3;
        // First Floor Slab (18m x 15m)
        const floorGeo = new THREE.BoxGeometry(18, 0.3, 15);
        const floor = new THREE.Mesh(floorGeo, floorMat);
        floor.position.set(-1.0, slabY + 0.15, 0.5);
        floor.receiveShadow = true;
        this.floorFirst.add(floor);

        const H = 2.8;
        const Y = slabY + 0.3 + H / 2;

        const addWall1F = (w, h, d, x, y, z, mat = wallMat) => {
            const geo = new THREE.BoxGeometry(w, h, d);
            const mesh = new THREE.Mesh(geo, mat);
            mesh.position.set(x, y, z);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            this.floorFirst.add(mesh);
            return mesh;
        };

        // Exterior Walls 1F
        addWall1F(0.3, H, 15, -10.0, Y, 0.5);
        addWall1F(0.3, H, 15, 8.0, Y, 0.5);
        addWall1F(18.3, H, 0.3, -1.0, Y, -7.0);
        addWall1F(12.0, H, 0.3, -4.0, Y, 8.0);
        addWall1F(6.0, H, 0.3, 5.0, Y, 8.0);

        // Balcony Glass Railing
        addWall1F(4.0, 1.1, 0.1, -1.0, slabY + 0.3 + 0.55, 8.0, glassMat);

        // Interior Partitions 1F
        // Master Bedroom Suite (Left wing)
        addWall1F(8.0, H, 0.25, -6.0, Y, 1.5);
        addWall1F(0.25, H, 5.0, -5.5, Y, -4.0); // Master bathroom partition
        // Office & Study Room
        addWall1F(0.25, H, 5.5, 2.0, Y, 4.5);
        // Bedroom 2 & 3 partitions (Right wing)
        addWall1F(6.0, H, 0.25, 5.0, Y, -1.0);
        addWall1F(0.25, H, 5.5, 2.0, Y, -4.0);

        this.layers.architecture.add(this.floorFirst);
    }

    buildRoof() {
        const roofMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.6 });
        const roofGeo = new THREE.BoxGeometry(18.4, 0.35, 15.4);
        const roof = new THREE.Mesh(roofGeo, roofMat);
        roof.position.set(-1.0, 6.55, 0.5);
        roof.castShadow = true;
        roof.receiveShadow = true;
        this.roofGroup.add(roof);

        // Parapet / low roof border wall
        const parapetMat = new THREE.MeshStandardMaterial({ color: 0xcfd8dc });
        const addParapet = (w, h, d, x, y, z) => {
            const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), parapetMat);
            m.position.set(x, y, z);
            this.roofGroup.add(m);
        };
        addParapet(18.4, 0.6, 0.3, -1.0, 6.85 + 0.15, -7.1);
        addParapet(18.4, 0.6, 0.3, -1.0, 6.85 + 0.15, 8.1);
        addParapet(0.3, 0.6, 15.4, -10.1, 6.85 + 0.15, 0.5);
        addParapet(0.3, 0.6, 15.4, 8.1, 6.85 + 0.15, 0.5);

        this.layers.architecture.add(this.roofGroup);
    }

    buildFurniture() {
        const sofaMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 });
        const woodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.6 });
        const bedMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.8 });
        const metalMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 });

        // Helper
        const addBlock = (parent, w, h, d, x, y, z, mat) => {
            const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
            m.position.set(x, y, z);
            m.castShadow = true;
            m.receiveShadow = true;
            parent.add(m);
            return m;
        };

        // --- GROUND FLOOR FURNITURE ---
        // Living Room L-Sofa
        addBlock(this.layers.furniture, 3.5, 0.65, 0.9, -3.2, 0.6, 1.2, sofaMat);
        addBlock(this.layers.furniture, 0.9, 0.65, 2.5, -4.5, 0.6, 2.0, sofaMat);
        // Living Room Coffee Table
        addBlock(this.layers.furniture, 1.6, 0.4, 0.9, -3.2, 0.45, 2.5, woodMat);
        // TV Console
        addBlock(this.layers.furniture, 3.2, 0.5, 0.45, -3.2, 0.5, -1.2, woodMat);
        // TV Screen
        addBlock(this.layers.furniture, 2.4, 1.3, 0.08, -3.2, 1.6, -1.15, metalMat);

        // Majlis Luxury Seating (U-Shaped)
        const majlisSofaMat = new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.8 });
        addBlock(this.layers.furniture, 4.5, 0.6, 0.85, 4.8, 0.55, 3.8, majlisSofaMat);
        addBlock(this.layers.furniture, 0.85, 0.6, 3.5, 7.2, 0.55, 5.2, majlisSofaMat);
        addBlock(this.layers.furniture, 0.85, 0.6, 3.5, 2.4, 0.55, 5.2, majlisSofaMat);
        addBlock(this.layers.furniture, 2.2, 0.4, 1.4, 4.8, 0.45, 5.2, woodMat); // Center table

        // Dining Table & Chairs
        addBlock(this.layers.furniture, 3.2, 0.75, 1.4, 4.5, 0.65, -3.5, woodMat);

        // Kitchen Island & Cabinets
        const kitchenMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3 });
        addBlock(this.layers.furniture, 3.6, 0.9, 0.8, -3.5, 0.75, -6.2, kitchenMat); // Wall counter
        addBlock(this.layers.furniture, 2.5, 0.9, 1.2, -3.5, 0.75, -3.8, kitchenMat); // Center Island

        // Smart Refrigerator Model (Kitchen)
        const fridgeMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.2 });
        const fridge = addBlock(this.layers.furniture, 1.1, 2.0, 0.9, -4.5, 1.3, -2.8, fridgeMat);
        // Fridge Screen
        const screenMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
        addBlock(this.layers.furniture, 0.35, 0.5, 0.02, -4.5, 1.5, -2.33, screenMat);

        // Tech Room Server Rack (19" 12U Enclosure)
        const rackFrameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
        addBlock(this.layers.furniture, 0.8, 1.6, 0.8, -1.0, 1.1, -4.8, rackFrameMat);
        // Rack Glass & Blinking LEDs
        const rackGlassMat = new THREE.MeshBasicMaterial({ color: 0x0284c7 });
        addBlock(this.layers.furniture, 0.65, 1.3, 0.05, -1.0, 1.1, -4.38, rackGlassMat);

        // Garage EV Car Silhouette
        const carMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.8, roughness: 0.2 });
        addBlock(this.layers.furniture, 2.1, 1.4, 4.4, -7.5, 1.0, 4.5, carMat);

        // Robot Vacuum 3D Mesh in Living Room
        const vacuumGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.09, 24);
        const vacMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.5, roughness: 0.3 });
        this.vacuumMesh = new THREE.Mesh(vacuumGeo, vacMat);
        this.vacuumMesh.position.set(-4.2, 0.35, 2.5);
        this.vacuumMesh.castShadow = true;
        this.layers.furniture.add(this.vacuumMesh);

        // --- FIRST FLOOR FURNITURE ---
        const slabY = 3.6;
        // Master Bed (King Size)
        addBlock(this.layers.furniture, 2.2, 0.6, 2.2, -4.0, slabY + 0.6, 2.0, bedMat);
        addBlock(this.layers.furniture, 2.4, 1.2, 0.25, -4.0, slabY + 0.9, 0.8, woodMat); // Headboard

        // Office Desk
        addBlock(this.layers.furniture, 2.0, 0.75, 0.9, 4.5, slabY + 0.65, 3.5, woodMat);
        addBlock(this.layers.furniture, 0.8, 0.5, 0.05, 4.5, slabY + 1.25, 3.5, metalMat); // Monitor
    }

    // --- WIRING & CONDUIT INFRASTRUCTURE ---
    buildWiringConduits() {
        // Glowing wires routing from Tech Room (-1.0, 1.5, -4.8) to various zones
        const rackPos = new THREE.Vector3(-1.0, 2.4, -4.8);

        const makeConduit = (points, colorHex) => {
            const curve = new THREE.CatmullRomCurve3(points);
            const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.04, 8, false);
            const tubeMat = new THREE.MeshBasicMaterial({
                color: colorHex,
                transparent: true,
                opacity: 0.85
            });
            const tube = new THREE.Mesh(tubeGeo, tubeMat);
            this.layers.wiring.add(tube);
            return tube;
        };

        // 1. Blue Cat6A Cable to Ground Wi-Fi 6 AP (Entrance Ceiling)
        makeConduit([
            rackPos,
            new THREE.Vector3(-1.0, 2.8, -3.0),
            new THREE.Vector3(0.0, 2.8, 0.0),
            new THREE.Vector3(0.0, 2.8, 2.0)
        ], 0x2563eb);

        // 2. Blue Cat6A to Outdoor Garden Camera (4K PoE)
        makeConduit([
            rackPos,
            new THREE.Vector3(3.0, 2.8, -4.8),
            new THREE.Vector3(6.0, 2.8, 0.0),
            new THREE.Vector3(6.0, 3.5, 6.0)
        ], 0x0284c7);

        // 3. Blue Cat6A to First Floor Wi-Fi 6 AP & Office
        makeConduit([
            rackPos,
            new THREE.Vector3(-1.0, 5.8, -4.8),
            new THREE.Vector3(0.0, 5.8, 0.0)
        ], 0x38bdf8);

        // 4. Yellow/Orange Power & Dimmer line to Living Room & Majlis
        makeConduit([
            new THREE.Vector3(-1.0, 1.2, -4.8),
            new THREE.Vector3(-2.0, 1.2, -1.0),
            new THREE.Vector3(-2.0, 1.2, 2.5),
            new THREE.Vector3(-3.0, 2.8, 1.0)
        ], 0xf59e0b);

        makeConduit([
            new THREE.Vector3(-1.0, 1.2, -4.8),
            new THREE.Vector3(2.0, 1.2, 0.0),
            new THREE.Vector3(4.0, 2.8, 1.0)
        ], 0xfbbf24);

        // 5. Red Fire Alarm Hardwire Interconnect (Kitchen Smoke -> Siren)
        makeConduit([
            new THREE.Vector3(-3.5, 2.8, -3.5),
            new THREE.Vector3(-1.0, 2.6, -3.2)
        ], 0xef4444);

        // 6. Green Sensor Bus (Water Valve Actuator & Kitchen Sink)
        makeConduit([
            new THREE.Vector3(-4.2, 0.2, -5.0),
            new THREE.Vector3(-3.5, 0.8, -4.8),
            new THREE.Vector3(-1.0, 1.5, -4.8)
        ], 0x10b981);
    }

    // --- SMART DEVICES PINS & HOTSPOTS ---
    buildSmartDevices() {
        const categoryColors = {
            lighting: 0xfacc15,  // Bright Yellow
            sensors: 0x10b981,   // Green
            security: 0xef4444,  // Red
            hvac: 0x06b6d4,      // Cyan
            network: 0x3b82f6,   // Blue
            automation: 0x8b5cf6,// Purple
            appliances: 0xf97316 // Orange
        };

        DEVICES_DATA.forEach(device => {
            const color = categoryColors[device.category] || 0x64748b;
            const p = device.pos3d;

            // Device Pin Container
            const pinGroup = new THREE.Group();
            pinGroup.position.set(p.x, p.y, p.z);
            pinGroup.userData = {
                type: "device",
                deviceId: device.id,
                deviceData: device
            };

            // Hotspot Marker: Glowing Orb + Floating Pulse Ring
            const sphereGeo = new THREE.SphereGeometry(0.14, 16, 16);
            const sphereMat = new THREE.MeshStandardMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.6,
                roughness: 0.2
            });
            const sphere = new THREE.Mesh(sphereGeo, sphereMat);
            pinGroup.add(sphere);

            // Ring
            const ringGeo = new THREE.RingGeometry(0.18, 0.25, 24);
            const ringMat = new THREE.MeshBasicMaterial({
                color: color,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.65
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.PI / 2;
            pinGroup.add(ring);

            // Place in proper system layer
            if (this.layers[device.category]) {
                this.layers[device.category].add(pinGroup);
            } else {
                this.layers.automation.add(pinGroup);
            }

            this.deviceMeshes.push(sphere);

            // If it's a lighting device, create an actual Three.js PointLight in the room
            if (device.category === "lighting" && (device.id.includes("living") || device.id.includes("entrance") || device.id.includes("majlis") || device.id.includes("kitchen") || device.id.includes("master"))) {
                const roomLight = new THREE.PointLight(0xfffaed, 0.9, 12, 2);
                roomLight.position.set(p.x, p.y - 0.2, p.z);
                roomLight.castShadow = true;
                this.scene.add(roomLight);
                this.roomLights[device.room] = roomLight;
            }
        });
    }

    // --- INTERACTION & RAYCASTING ---
    onPointerMove(e) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.deviceMeshes, true);

        if (intersects.length > 0) {
            this.renderer.domElement.style.cursor = "pointer";
            const mesh = intersects[0].object;
            const parent = mesh.parent;
            if (parent && parent.userData.deviceData) {
                this.showTooltip(e.clientX, e.clientY, parent.userData.deviceData);
            }
        } else {
            this.renderer.domElement.style.cursor = "default";
            this.hideTooltip();
        }
    }

    onClick(e) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.deviceMeshes, true);

        if (intersects.length > 0) {
            const mesh = intersects[0].object;
            const parent = mesh.parent;
            if (parent && parent.userData.deviceData) {
                // Pulse animation on click
                this.highlightMesh(mesh);
                if (window.app && window.app.selectDevice) {
                    window.app.selectDevice(parent.userData.deviceData.id);
                }
            }
        }
    }

    highlightMesh(mesh) {
        const originalScale = mesh.scale.clone();
        mesh.scale.set(1.6, 1.6, 1.6);
        setTimeout(() => {
            mesh.scale.copy(originalScale);
        }, 300);
    }

    showTooltip(x, y, device) {
        let tooltip = document.getElementById("villa-3d-tooltip");
        if (!tooltip) {
            tooltip = document.createElement("div");
            tooltip.id = "villa-3d-tooltip";
            tooltip.className = "villa-tooltip";
            document.body.appendChild(tooltip);
        }
        tooltip.innerHTML = `
            <div class="tt-header">
                <span class="tt-cat">${device.category.toUpperCase()}</span>
                <span class="tt-status ${device.status}">${device.status.toUpperCase()}</span>
            </div>
            <div class="tt-title">${device.name}</div>
            <div class="tt-meta">${device.roomName} | ${device.communication}</div>
        `;
        tooltip.style.left = `${x + 14}px`;
        tooltip.style.top = `${y - 12}px`;
        tooltip.style.display = "block";
    }

    hideTooltip() {
        const tooltip = document.getElementById("villa-3d-tooltip");
        if (tooltip) tooltip.style.display = "none";
    }

    // --- CAMERA JUMP & ROOM FOCUS ---
    focusRoom(roomId) {
        const room = ROOMS_DATA.find(r => r.id === roomId);
        if (!room) return;

        this.activeRoom = roomId;
        this.animateCameraTo(room.cameraPos, room.targetPos);

        // Auto floor adjustment
        if (room.floor === "first" && this.currentFloor === "ground") {
            this.setFloor("first");
        } else if (room.floor === "ground" && this.currentFloor === "first") {
            this.setFloor("ground");
        }
    }

    setCameraPreset(preset) {
        switch (preset) {
            case "isometric":
                this.animateCameraTo({ x: 18, y: 16, z: 22 }, { x: 0, y: 3, z: 0 });
                break;
            case "top":
                this.animateCameraTo({ x: 0.1, y: 35, z: 0.1 }, { x: 0, y: 2, z: 0 });
                break;
            case "entrance":
                this.animateCameraTo({ x: 0, y: 3.5, z: 12 }, { x: 0, y: 1.5, z: 5.5 });
                break;
            case "living":
                this.focusRoom("living");
                break;
            case "majlis":
                this.focusRoom("majlis");
                break;
            case "master":
                this.focusRoom("master_bed");
                break;
            case "tech":
                this.focusRoom("tech_room");
                break;
        }
    }

    animateCameraTo(camPos, targetPos) {
        this.cameraTargetPos = new THREE.Vector3(camPos.x, camPos.y, camPos.z);
        this.controlsTargetPos = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z);
        this.isTransitioningCamera = true;
    }

    // --- FLOOR ISOLATION & X-RAY ---
    setFloor(floor) {
        this.currentFloor = floor;
        if (floor === "all") {
            this.floorGround.visible = true;
            this.floorFirst.visible = true;
            this.roofGroup.visible = true;
        } else if (floor === "ground") {
            this.floorGround.visible = true;
            this.floorFirst.visible = false;
            this.roofGroup.visible = false;
        } else if (floor === "first") {
            this.floorGround.visible = false;
            this.floorFirst.visible = true;
            this.roofGroup.visible = false;
        }
    }

    toggleRoof(show) {
        this.roofGroup.visible = show;
    }

    setXRayWiringMode(enable) {
        this.isXRayWiring = enable;
        const opacity = enable ? 0.22 : 1.0;
        const transparent = enable;

        const updateMat = (obj) => {
            if (obj.isMesh && obj.material && obj.material.color) {
                // Keep glass and wiring untouched
                if (obj.material.color.getHex() !== 0x93c5fd && !obj.geometry.type.includes("Tube")) {
                    obj.material.transparent = transparent;
                    obj.material.opacity = opacity;
                    obj.material.needsUpdate = true;
                }
            }
        };

        this.floorGround.traverse(updateMat);
        this.floorFirst.traverse(updateMat);
        this.layers.furniture.traverse(updateMat);
    }

    toggleLayer(layerName, visible) {
        if (this.layers[layerName]) {
            this.layers[layerName].visible = visible;
        }
        if (layerName === "wiring") {
            this.setXRayWiringMode(visible);
        }
    }

    // --- SIMULATION EFFECTS ---
    setRoomLightState(roomId, isOn, brightness = 80) {
        const light = this.roomLights[roomId];
        if (light) {
            light.visible = isOn;
            light.intensity = isOn ? (brightness / 100) * 1.2 : 0;
        }
    }

    triggerFireEmergency(isEmergency) {
        this.fireEmergencyActive = isEmergency;
        const kitchenLight = this.roomLights["kitchen"];

        if (isEmergency) {
            // Flash red
            if (kitchenLight) {
                kitchenLight.visible = true;
                kitchenLight.color.setHex(0xff1100);
                kitchenLight.intensity = 2.5;
            }
            // Move camera to kitchen
            this.focusRoom("kitchen");
        } else {
            if (kitchenLight) {
                kitchenLight.color.setHex(0xfffaed);
                kitchenLight.intensity = 1.0;
            }
        }
    }

    setVacuumState(isCleaning) {
        this.vacuumCleaning = isCleaning;
    }

    setDayNight(schedule) {
        if (!schedule) return;

        // Animate sun position & sky color
        const phi = (90 - schedule.sunElevation) * (Math.PI / 180);
        const theta = 0.5 * Math.PI;

        const sunDistance = 45;
        this.dirLight.position.x = sunDistance * Math.sin(phi) * Math.cos(theta);
        this.dirLight.position.y = Math.max(sunDistance * Math.cos(phi), 2);
        this.dirLight.position.z = sunDistance * Math.sin(phi) * Math.sin(theta);

        this.dirLight.intensity = schedule.sunIntensity;
        this.dirLight.color.set(schedule.ambientColor);

        this.scene.background = new THREE.Color(schedule.skyColor);

        // Turn on/off room lights matching schedule
        if (schedule.lightsState) {
            Object.entries(schedule.lightsState).forEach(([room, val]) => {
                this.setRoomLightState(room, val > 0, val);
            });
        }
    }

    // --- ANIMATION LOOP ---
    animate() {
        requestAnimationFrame(this.animate);

        // Smooth camera transition
        if (this.isTransitioningCamera && this.cameraTargetPos && this.controlsTargetPos) {
            this.camera.position.lerp(this.cameraTargetPos, 0.06);
            this.controls.target.lerp(this.controlsTargetPos, 0.06);

            if (this.camera.position.distanceTo(this.cameraTargetPos) < 0.1) {
                this.isTransitioningCamera = false;
            }
        }

        this.controls.update();

        // Fire strobe effect
        if (this.fireEmergencyActive) {
            const kitchenLight = this.roomLights["kitchen"];
            if (kitchenLight) {
                kitchenLight.intensity = Math.sin(Date.now() * 0.015) > 0 ? 3.0 : 0.4;
            }
        }

        // Robot vacuum movement animation
        if (this.vacuumCleaning && this.vacuumMesh) {
            this.vacuumAngle += 0.015;
            this.vacuumMesh.position.x = -3.5 + Math.cos(this.vacuumAngle) * 1.8;
            this.vacuumMesh.position.z = 2.0 + Math.sin(this.vacuumAngle * 1.3) * 1.4;
            this.vacuumMesh.rotation.y = this.vacuumAngle;
        }

        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        if (!this.container || !this.renderer || !this.camera) return;
        const width = this.container.clientWidth;
        const height = this.container.clientHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }
}
