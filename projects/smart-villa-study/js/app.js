/**
 * SMART VILLA STUDY - MAIN APPLICATION CONTROLLER
 * المنطق التفاعلي الرئيسي للموقع، التنقل، إدارة الحالات، المحاكاة، والإشعارات
 */

class SmartVillaApp {
    constructor() {
        this.currentSection = "overview";
        this.villa3d = null;
        this.notifications = [];
        this.unreadNotifsCount = 0;
        this.fullDayTimer = null;
        this.fullDayIndex = 0;
        this.isDaySimPlaying = false;
        this.selectedDeviceId = null;

        // Device states dictionary
        this.deviceStates = {};
        DEVICES_DATA.forEach(d => {
            this.deviceStates[d.id] = {
                status: d.status,
                brightness: d.brightness !== undefined ? d.brightness : 100,
                targetTemp: d.targetTemp !== undefined ? d.targetTemp : 22,
                currentTemp: d.currentTemp !== undefined ? d.currentTemp : 22.5,
                stateValue: d.stateValue
            };
        });

        // Refrigerator state
        this.fridgeState = {
            temp: 4.0,
            foodLevel: 78,
            door: "Closed"
        };

        // Robot vacuum state
        this.vacuumState = {
            battery: 85,
            dustBin: 25,
            waterTank: 90,
            status: "Docked"
        };

        // Presentation Mode
        this.isPresentationMode = false;
        this.slides = [
            "overview", "concept", "layout", "villa3d", "devices", 
            "rooms", "electrical", "network", "wiring", "architecture", 
            "control", "simulation", "security", "energy", "bom", "recommendations"
        ];
    }

    init() {
        // Initialize 3D Engine
        this.villa3d = new SmartVilla3D("villa-3d-canvas");

        // Bind Navigation
        this.bindNavigation();

        // Render Dynamic Views
        this.renderOverviewStats();
        this.renderConceptDiagrams();
        this.renderHouseLayout();
        this.renderDevicesLibrary();
        this.renderRoomByRoom();
        this.renderElectrical();
        this.renderNetwork();
        this.renderWiring();
        this.renderArchitecture();
        this.renderControlPanel();
        this.renderSimulationLab();
        this.renderSecurity();
        this.renderEnergy();
        this.renderBOM();
        this.renderRecommendations();

        // Bind 3D Controls
        this.bind3DControls();

        // Bind Full Day Demo controls
        this.bindDaySimulation();

        // Bind Notifications Drawer
        this.bindNotificationCenter();

        // Bind Presentation Mode
        this.bindPresentationMode();

        // Initial welcome notification
        setTimeout(() => {
            this.notify("info", "مرحبًا بك في دراسة الفيلا الذكية التفاعلية. استكشف النموذج ثلاثي الأبعاد أو ابدأ تصفح أقسام الدراسة الهندسية.");
        }, 800);
    }

    // --- NAVIGATION & TABS ---
    bindNavigation() {
        const navLinks = document.querySelectorAll("[data-section]");
        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault();
                const section = link.getAttribute("data-section");
                this.switchSection(section);
            });
        });

        // Mobile drawer toggles
        const menuToggle = document.getElementById("sidebar-toggle");
        const sidebar = document.getElementById("main-sidebar");
        if (menuToggle && sidebar) {
            menuToggle.addEventListener("click", () => {
                sidebar.classList.toggle("open");
            });
        }
    }

    switchSection(sectionId) {
        this.currentSection = sectionId;

        // Update active class on nav links
        document.querySelectorAll("[data-section]").forEach(link => {
            if (link.getAttribute("data-section") === sectionId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // Show target section, hide others
        document.querySelectorAll(".study-section").forEach(sec => {
            sec.style.display = "none";
        });

        const target = document.getElementById(`sec-${sectionId}`);
        if (target) {
            target.style.display = "block";
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        // Update breadcrumbs
        this.updateBreadcrumbs(sectionId);

        // Relocate 3D viewer if switching to 3d section or overview
        if (sectionId === "overview" || sectionId === "villa3d") {
            const viewer = document.getElementById("main-3d-viewer");
            const mount = document.getElementById(sectionId === "villa3d" ? "sec-villa3d-mount" : "sec-overview-mount");
            if (viewer && mount && viewer.parentElement !== mount) {
                mount.appendChild(viewer);
            }
            setTimeout(() => {
                if (this.villa3d) this.villa3d.onResize();
            }, 100);
        }

        // Close mobile sidebar if open
        const sidebar = document.getElementById("main-sidebar");
        if (sidebar) sidebar.classList.remove("open");
    }

    updateBreadcrumbs(sectionId) {
        const bc = document.getElementById("page-breadcrumb");
        if (!bc) return;

        const titles = {
            overview: "نظرة عامة على المشروع (Project Overview)",
            concept: "مفهوم المنزل الذكي والـ IoT (Smart Home Concept)",
            layout: "المخططات المعمارية وتوزيع الفراغات (House Layout)",
            villa3d: "المنزل الذكي ثلاثي الأبعاد (3D Smart Villa)",
            devices: "مكتبة أجهزة الـ IoT والتقنيات (IoT Devices Library)",
            rooms: "الدراسة التفصيلية لكل فراغ (Room-by-Room Study)",
            electrical: "البنية التحتية الكهربائية (Electrical Infrastructure)",
            network: "البنية الشبكية والاتصالات (Network Infrastructure)",
            wiring: "دليل التمديدات والمسارات (Wiring & Cabling Guide)",
            architecture: "الهندسة البنائية وتكامل الأنظمة (System Architecture)",
            control: "لوحة التحكم الافتراضية (Smart Home Control)",
            simulation: "مختبر المحاكاة والسيناريوهات (Simulation Lab)",
            security: "دراسة منظومة الأمان والتحكم بالدخول (Security Study)",
            energy: "إدارة الطاقة والاستدامة (Energy Management)",
            bom: "جدول الكميات والمواصفات التقديرية (Bill of Materials)",
            recommendations: "التوصيات الهندسية وخطة التنفيذ (Final Recommendations)"
        };

        bc.innerHTML = `<span>الدراسة الرئيسية</span> &rsaquo; <span class="current">${titles[sectionId] || sectionId}</span>`;
    }

    // --- 3D VIEWPORT CONTROLS ---
    bind3DControls() {
        // Floor selectors
        const floorBtns = document.querySelectorAll("[data-floor]");
        floorBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                floorBtns.forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                const floor = btn.getAttribute("data-floor");
                if (this.villa3d) this.villa3d.setFloor(floor);
            });
        });

        // Layer toggles
        const layerCheckboxes = document.querySelectorAll("[data-layer]");
        layerCheckboxes.forEach(cb => {
            cb.addEventListener("change", (e) => {
                const layer = cb.getAttribute("data-layer");
                if (this.villa3d) this.villa3d.toggleLayer(layer, e.target.checked);
            });
        });

        // Camera Presets
        const camBtns = document.querySelectorAll("[data-campreset]");
        camBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                const preset = btn.getAttribute("data-campreset");
                if (this.villa3d) this.villa3d.setCameraPreset(preset);
            });
        });

        // Roof Toggle
        const roofToggle = document.getElementById("btn-toggle-roof");
        if (roofToggle) {
            let roofVisible = true;
            roofToggle.addEventListener("click", () => {
                roofVisible = !roofVisible;
                roofToggle.classList.toggle("active", roofVisible);
                if (this.villa3d) this.villa3d.toggleRoof(roofVisible);
            });
        }

        // Wiring X-Ray Quick Button
        const wiringBtn = document.getElementById("btn-quick-wiring");
        if (wiringBtn) {
            let wiringActive = false;
            wiringBtn.addEventListener("click", () => {
                wiringActive = !wiringActive;
                wiringBtn.classList.toggle("active", wiringActive);
                const cb = document.querySelector("[data-layer='wiring']");
                if (cb) cb.checked = wiringActive;
                if (this.villa3d) this.villa3d.toggleLayer("wiring", wiringActive);
                this.notify(wiringActive ? "info" : "info", wiringActive ? "تم تفعيل وضع التمديدات السلكية X-Ray" : "تم إلغاء وضع التمديدات");
            });
        }
    }

    // --- DEVICE INSPECTION MODAL ---
    selectDevice(deviceId) {
        const device = DEVICES_DATA.find(d => d.id === deviceId);
        if (!device) return;

        this.selectedDeviceId = deviceId;
        const modal = document.getElementById("device-modal");
        const body = document.getElementById("device-modal-body");
        if (!modal || !body) return;

        const state = this.deviceStates[deviceId] || { status: device.status };

        const imgPath = (device.category === 'lighting') ? 'assets/devices/smart-switch-2gang.svg'
            : (device.category === 'sensors' && device.id.includes('smoke')) ? 'assets/devices/smoke-detector.svg'
            : (device.category === 'sensors' && device.id.includes('water')) ? 'assets/devices/water-leak-valve.svg'
            : (device.category === 'sensors' && device.id.includes('gas')) ? 'assets/devices/gas-detector.svg'
            : (device.category === 'sensors' && device.id.includes('door')) ? 'assets/devices/door-sensor.svg'
            : (device.category === 'sensors') ? 'assets/devices/mmwave-sensor.svg'
            : (device.id.includes('lock')) ? 'assets/devices/smart-lock.svg'
            : (device.id.includes('doorbell')) ? 'assets/devices/video-doorbell.svg'
            : (device.category === 'security') ? 'assets/devices/bullet-camera.svg'
            : (device.category === 'hvac') ? 'assets/devices/smart-thermostat.svg'
            : (device.id.includes('rack')) ? 'assets/devices/network-rack.svg'
            : (device.id.includes('switch')) ? 'assets/devices/poe-switch.svg'
            : (device.id.includes('ap')) ? 'assets/devices/wifi6-ap.svg'
            : (device.id.includes('nvr')) ? 'assets/devices/nvr-recorder.svg'
            : (device.id.includes('hub')) ? 'assets/devices/edge-hub.svg'
            : 'assets/devices/smart-switch-2gang.svg';

        body.innerHTML = `
            <div class="modal-device-header" style="display: flex; gap: 20px; align-items: center;">
                <div class="bom-device-thumb-wrap" style="width: 72px; height: 72px; flex-shrink: 0;" onclick="app.previewImage('${imgPath}', '${device.name}')" title="انقر لتكبير الصورة">
                    <img src="${imgPath}" alt="${device.name}">
                </div>
                <div>
                    <div class="modal-device-badge ${device.category}">${device.category.toUpperCase()}</div>
                    <h3>${device.name}</h3>
                    <div class="modal-device-en">${device.nameEn}</div>
                </div>
            </div>

            <div class="modal-device-grid">
                <div class="spec-card">
                    <span class="spec-label">الموقع / الفراغ:</span>
                    <span class="spec-val">${device.roomName}</span>
                </div>
                <div class="spec-card">
                    <span class="spec-label">بروتوكول الاتصال:</span>
                    <span class="spec-val">${device.communication}</span>
                </div>
                <div class="spec-card">
                    <span class="spec-label">نوع التغذية والطاقة:</span>
                    <span class="spec-val">${device.power}</span>
                </div>
                <div class="spec-card">
                    <span class="spec-label">طريقة ومستوى التركيب:</span>
                    <span class="spec-val">${device.installation}</span>
                </div>
                <div class="spec-card full-width">
                    <span class="spec-label">متطلبات التمديدات السلكية:</span>
                    <span class="spec-val">${device.wiring}</span>
                </div>
                <div class="spec-card full-width">
                    <span class="spec-label">الهدف الوظيفي في الدراسة:</span>
                    <span class="spec-val">${device.purpose}</span>
                </div>
                <div class="spec-card full-width">
                    <span class="spec-label">المواصفات الفنية المعتمدة:</span>
                    <span class="spec-val">${device.technicalSpecs}</span>
                </div>
            </div>

            <div class="modal-device-actions">
                <div class="state-indicator">
                    الحالة الحالية: <strong class="badge-status ${state.status}">${state.status.toUpperCase()}</strong>
                </div>
                <div class="action-buttons">
                    <button class="btn btn-primary" onclick="app.toggleDeviceState('${device.id}')">
                        تبديل الحالة (Toggle State)
                    </button>
                    <button class="btn btn-secondary" onclick="app.focusDeviceIn3D('${device.id}')">
                        تكبير في الـ 3D
                    </button>
                </div>
            </div>
        `;

        modal.classList.add("open");
    }

    closeDeviceModal() {
        const modal = document.getElementById("device-modal");
        if (modal) modal.classList.remove("open");
    }

    focusDeviceIn3D(deviceId) {
        const device = DEVICES_DATA.find(d => d.id === deviceId);
        if (!device) return;

        this.closeDeviceModal();
        this.switchSection("villa3d");

        setTimeout(() => {
            if (this.villa3d) {
                this.villa3d.focusRoom(device.room);
            }
        }, 150);
    }

    toggleDeviceState(deviceId) {
        const device = DEVICES_DATA.find(d => d.id === deviceId);
        if (!device) return;

        const current = this.deviceStates[deviceId] || { status: device.status };
        const newStatus = (current.status === "on" || current.status === "locked" || current.status === "normal") ? "off" : "on";
        current.status = newStatus;
        this.deviceStates[deviceId] = current;

        // Synchronize with 3D model
        if (device.category === "lighting" && this.villa3d) {
            this.villa3d.setRoomLightState(device.room, newStatus === "on", current.brightness || 80);
        }

        this.notify("info", `تم تحديث حالة [${device.name}] إلى: ${newStatus.toUpperCase()}`);
        this.renderControlPanel(); // Re-render controls

        // If modal open, refresh it
        if (this.selectedDeviceId === deviceId) {
            this.selectDevice(deviceId);
        }
    }

    // --- SECTION RENDERERS ---
    renderOverviewStats() {
        const container = document.getElementById("overview-metrics-grid");
        if (!container) return;

        const metrics = [
            { label: "مساحة البناء", val: VILLA_SPECS.builtUpArea, icon: "📐", note: "طابقين و 14 فراغًا" },
            { label: "إجمالي الأجهزة الذكية", val: VILLA_SPECS.totalDevices, icon: "💡", note: "إضاءة ومفاتيح وتحكم" },
            { label: "الحساسات المتصلة", val: VILLA_SPECS.sensorsCount, icon: "📡", note: "حركة، أمان، وبيئة" },
            { label: "كاميرات المراقبة", val: VILLA_SPECS.camerasCount, icon: "📹", note: "4K AI مع تسجيل NVR" },
            { label: "نقاط الشبكة السلكية", val: VILLA_SPECS.networkDrops, icon: "🔌", note: "Cat6A 10Gbps Direct" },
            { label: "نقاط الوصول Wi-Fi 6", val: VILLA_SPECS.accessPointsCount, icon: "📶", note: "تغطية كاملة بدون انقطاع" }
        ];

        container.innerHTML = metrics.map(m => `
            <div class="metric-card">
                <div class="metric-icon">${m.icon}</div>
                <div class="metric-val">${m.val}</div>
                <div class="metric-label">${m.label}</div>
                <div class="metric-note">${m.note}</div>
            </div>
        `).join("");
    }

    renderConceptDiagrams() {
        const protocols = [
            { name: "Matter over Thread", role: "بروتوكول المستقبل القياسي", speed: "فائق الاستقرار", power: "منخفض جدًا", use: "الحساسات، أقفال الأمان، منظمات التكييف" },
            { name: "Zigbee 3.0", role: "شبكة تكرار محلية (Local Mesh)", speed: "زمن استجابة < 20ms", power: "بطاريات تدوم 3-5 سنوات", use: "المفاتيح الذكية، الحساسات الدقيقة" },
            { name: "PoE (Power over Ethernet)", role: "تغذية وبيانات بسلك واحد", speed: "1 Gbps إلى 10 Gbps", power: "حتى 30W لكل منفذ", use: "كاميرات 4K، نقاط وصول Wi-Fi 6" },
            { name: "Wi-Fi 6 (802.11ax)", role: "نطاق ترددي عريض", speed: "حتى 3 Gbps", power: "تغذية كهربائية مستمرة", use: "الثلاجة الذكية، المكنسة، الشاشات" }
        ];

        const tableBody = document.getElementById("protocols-table-body");
        if (tableBody) {
            tableBody.innerHTML = protocols.map(p => `
                <tr>
                    <td><strong>${p.name}</strong></td>
                    <td>${p.role}</td>
                    <td><span class="badge-tech">${p.speed}</span></td>
                    <td>${p.power}</td>
                    <td>${p.use}</td>
                </tr>
            `).join("");
        }
    }

    renderHouseLayout() {
        const roomsListContainer = document.getElementById("layout-rooms-list");
        if (!roomsListContainer) return;

        roomsListContainer.innerHTML = ROOMS_DATA.map(r => `
            <div class="layout-room-card" onclick="app.onSelectRoomCard('${r.id}')">
                <div class="room-card-header">
                    <h4>${r.name}</h4>
                    <span class="room-floor-tag ${r.floor}">${r.floorName}</span>
                </div>
                <div class="room-card-sub">${r.nameEn} | ${r.area}</div>
                <p class="room-card-desc">${r.description}</p>
                <div class="room-card-footer">
                    <span>${r.deviceCount} أجهزة ذكية</span>
                    <button class="btn-sm btn-outline">استعراض في الـ 3D &larr;</button>
                </div>
            </div>
        `).join("");
    }

    onSelectRoomCard(roomId) {
        this.switchSection("villa3d");
        setTimeout(() => {
            if (this.villa3d) {
                this.villa3d.focusRoom(roomId);
            }
        }, 150);
    }

    renderDevicesLibrary() {
        const container = document.getElementById("devices-catalog-grid");
        const filterBtnsContainer = document.getElementById("devices-category-filters");
        if (!container) return;

        // Render Filters
        if (filterBtnsContainer) {
            filterBtnsContainer.innerHTML = `
                <button class="btn btn-sm btn-filter active" data-cat="all">الكل (All)</button>
                ${DEVICE_CATEGORIES.map(c => `
                    <button class="btn btn-sm btn-filter" data-cat="${c.id}">${c.icon} ${c.name}</button>
                `).join("")}
            `;

            filterBtnsContainer.querySelectorAll(".btn-filter").forEach(btn => {
                btn.addEventListener("click", () => {
                    filterBtnsContainer.querySelectorAll(".btn-filter").forEach(b => b.classList.remove("active"));
                    btn.classList.add("active");
                    this.filterDevices(btn.getAttribute("data-cat"));
                });
            });
        }

        this.filterDevices("all");
    }

    filterDevices(cat) {
        const container = document.getElementById("devices-catalog-grid");
        if (!container) return;

        const filtered = cat === "all" ? DEVICES_DATA : DEVICES_DATA.filter(d => d.category === cat);

        container.innerHTML = filtered.map(d => `
            <div class="device-catalog-card" onclick="app.selectDevice('${d.id}')">
                <div class="dev-card-header">
                    <span class="dev-cat-badge ${d.category}">${d.category.toUpperCase()}</span>
                    <span class="dev-room-tag">${d.roomName}</span>
                </div>
                <h4 class="dev-title">${d.name}</h4>
                <div class="dev-en">${d.nameEn}</div>
                <div class="dev-specs-summary">
                    <div><span>البروتوكول:</span> ${d.communication}</div>
                    <div><span>الطاقة:</span> ${d.power}</div>
                    <div><span>التركيب:</span> ${d.installation}</div>
                </div>
                <div class="dev-card-action">
                    <span>انقر لعرض المواصفات الهندسية</span>
                    <span class="dev-arrow">&larr;</span>
                </div>
            </div>
        `).join("");
    }

    renderRoomByRoom() {
        const container = document.getElementById("room-study-accordion");
        if (!container) return;

        container.innerHTML = ROOMS_DATA.map(r => {
            const roomDevices = DEVICES_DATA.filter(d => d.room === r.id);
            return `
                <div class="room-study-item">
                    <div class="room-study-header" onclick="this.parentElement.classList.toggle('expanded')">
                        <div class="room-study-title">
                            <h3>${r.name} (${r.nameEn})</h3>
                            <span class="room-study-sub">${r.floorName} &bull; ${r.area} (${r.dimensions}) &bull; ${roomDevices.length} أجهزة ذكية</span>
                        </div>
                        <div class="room-study-actions">
                            <button class="btn btn-sm btn-outline" onclick="event.stopPropagation(); app.onSelectRoomCard('${r.id}')">
                                استعراض ثلاثي الأبعاد
                            </button>
                            <span class="accordion-arrow">&darr;</span>
                        </div>
                    </div>
                    <div class="room-study-content">
                        <div class="room-study-intro">
                            <strong>التحليل المعماري والوظيفي:</strong>
                            <p>${r.description}</p>
                        </div>
                        <div class="room-study-wiring">
                            <strong>المسارات والتمديدات المطلوبة:</strong>
                            <p>${r.wiringNotes}</p>
                        </div>
                        <div class="room-study-devices-table">
                            <strong>الأجهزة الذكية المعتمدة في هذا الفراغ:</strong>
                            <table class="engineering-table">
                                <thead>
                                    <tr>
                                        <th>الجهاز</th>
                                        <th>الفئة</th>
                                        <th>بروتوكول الاتصال</th>
                                        <th>متطلب التغذية</th>
                                        <th>الهدف والوظيفة</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${roomDevices.map(d => `
                                        <tr onclick="app.selectDevice('${d.id}')" style="cursor: pointer;">
                                            <td><strong>${d.name}</strong></td>
                                            <td><span class="badge-tech">${d.category}</span></td>
                                            <td>${d.communication}</td>
                                            <td>${d.power}</td>
                                            <td>${d.purpose}</td>
                                        </tr>
                                    `).join("")}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            `;
        }).join("");
    }

    renderElectrical() {
        const panelsContainer = document.getElementById("electrical-panels-list");
        if (!panelsContainer) return;

        panelsContainer.innerHTML = ELECTRICAL_DATA.panels.map(p => `
            <div class="elec-panel-card">
                <div class="elec-panel-title">
                    <h4>${p.name}</h4>
                    <span class="elec-panel-loc">${p.location}</span>
                </div>
                <div class="elec-panel-specs">
                    <strong>المواصفات:</strong> ${p.specs}
                </div>
                <div class="elec-panel-role">
                    <strong>الدور الهندسي:</strong> ${p.role}
                </div>
            </div>
        `).join("");
    }

    renderNetwork() {
        const vlanContainer = document.getElementById("network-vlans-list");
        if (!vlanContainer) return;

        vlanContainer.innerHTML = NETWORK_DATA.vlans.map(v => `
            <div class="vlan-card">
                <div class="vlan-id">${v.id}</div>
                <div class="vlan-name">${v.name}</div>
                <div class="vlan-subnet">${v.subnet}</div>
                <div class="vlan-purpose">${v.purpose}</div>
            </div>
        `).join("");

        const flowContainer = document.getElementById("network-flow-steps");
        if (flowContainer) {
            flowContainer.innerHTML = NETWORK_DATA.topologyFlow.map(f => `
                <div class="flow-step">
                    <div class="flow-num">${f.step}</div>
                    <div class="flow-body">
                        <h5>${f.title}</h5>
                        <p>${f.desc}</p>
                    </div>
                </div>
            `).join("");
        }
    }

    renderWiring() {
        const principlesContainer = document.getElementById("wiring-principles-grid");
        if (!principlesContainer) return;

        principlesContainer.innerHTML = WIRING_GUIDE.principles.map(p => `
            <div class="wiring-card">
                <h5>${p.title}</h5>
                <p>${p.desc}</p>
            </div>
        `).join("");
    }

    renderArchitecture() {
        const tiersContainer = document.getElementById("architecture-tiers-container");
        if (!tiersContainer) return;

        tiersContainer.innerHTML = SYSTEM_ARCHITECTURE.tiers.map(t => `
            <div class="arch-tier-card">
                <div class="arch-tier-badge">${t.level}</div>
                <h4>${t.title}</h4>
                <p>${t.desc}</p>
            </div>
        `).join("");
    }

    // --- VIRTUAL CONTROL PANEL ---
    renderControlPanel() {
        const container = document.getElementById("control-panel-grid");
        if (!container) return;

        // Group lighting devices
        const lights = DEVICES_DATA.filter(d => d.category === "lighting");
        const hvacs = DEVICES_DATA.filter(d => d.category === "hvac");

        container.innerHTML = `
            <div class="control-group-card">
                <h3>💡 أنظمة الإضاءة الذكية (Smart Lighting)</h3>
                <div class="controls-list">
                    ${lights.map(l => {
                        const st = this.deviceStates[l.id] || { status: "off", brightness: 80 };
                        const isOn = st.status === "on";
                        return `
                            <div class="control-item">
                                <div class="control-info">
                                    <span class="control-name">${l.name}</span>
                                    <span class="control-loc">${l.roomName}</span>
                                </div>
                                <div class="control-actions">
                                    <button class="btn-toggle ${isOn ? 'on' : 'off'}" onclick="app.toggleLightControl('${l.id}', '${l.room}')">
                                        ${isOn ? 'تشغيل (ON)' : 'إطفاء (OFF)'}
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join("")}
                </div>
            </div>

            <div class="control-group-card">
                <h3>❄️ التكييف والتحكم بالمناخ (Climate Control)</h3>
                <div class="controls-list">
                    ${hvacs.map(h => {
                        const st = this.deviceStates[h.id] || { status: "on", targetTemp: 22 };
                        return `
                            <div class="control-item">
                                <div class="control-info">
                                    <span class="control-name">${h.name}</span>
                                    <span class="control-loc">${h.roomName}</span>
                                </div>
                                <div class="control-temp-adjust">
                                    <button class="btn-temp" onclick="app.adjustTemp('${h.id}', -0.5)">-</button>
                                    <span class="temp-val">${st.targetTemp}°C</span>
                                    <button class="btn-temp" onclick="app.adjustTemp('${h.id}', 0.5)">+</button>
                                </div>
                            </div>
                        `;
                    }).join("")}
                </div>
            </div>

            <div class="control-group-card">
                <h3>🛡️ الأمان والتحكم بالأبواب (Access & Security)</h3>
                <div class="controls-list">
                    <div class="control-item">
                        <div class="control-info">
                            <span class="control-name">قفل الباب الرئيسي البيومتري</span>
                            <span class="control-loc">المدخل الرئيسي</span>
                        </div>
                        <button class="btn-toggle ${this.deviceStates['lock_entrance'].status === 'locked' ? 'on' : 'off'}" onclick="app.toggleLock()">
                            ${this.deviceStates['lock_entrance'].status === 'locked' ? 'مقفل (LOCKED)' : 'مفتوح (UNLOCKED)'}
                        </button>
                    </div>
                    <div class="control-item">
                        <div class="control-info">
                            <span class="control-name">بوابة المرآب الذكية</span>
                            <span class="control-loc">المرآب الخارجي</span>
                        </div>
                        <button class="btn-toggle on" onclick="app.notify('info', 'تم إصدار أمر حركة بوابة المرآب الآلية')">
                            مغلقة (CLOSED)
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    toggleLightControl(deviceId, roomId) {
        const st = this.deviceStates[deviceId] || { status: "off", brightness: 80 };
        st.status = st.status === "on" ? "off" : "on";
        this.deviceStates[deviceId] = st;

        if (this.villa3d) {
            this.villa3d.setRoomLightState(roomId, st.status === "on", st.brightness);
        }

        this.notify("info", `إضاءة [${roomId}]: ${st.status.toUpperCase()}`);
        this.renderControlPanel();
    }

    adjustTemp(deviceId, delta) {
        const st = this.deviceStates[deviceId] || { targetTemp: 22 };
        st.targetTemp = Math.max(18, Math.min(28, parseFloat((st.targetTemp + delta).toFixed(1))));
        this.deviceStates[deviceId] = st;
        this.notify("info", `تم تعديل درجة حرارة التكييف إلى: ${st.targetTemp}°C`);
        this.renderControlPanel();
    }

    toggleLock() {
        const st = this.deviceStates['lock_entrance'];
        st.status = st.status === "locked" ? "unlocked" : "locked";
        this.notify(st.status === "locked" ? "success" : "warning", `الباب الرئيسي: ${st.status === 'locked' ? 'تم القفل وتأمين المدخل' : 'تم فتح القفل'}`);
        this.renderControlPanel();
    }

    // --- SIMULATION LAB ---
    renderSimulationLab() {
        const container = document.getElementById("simulation-lab-content");
        if (!container) return;

        container.innerHTML = `
            <!-- FIRE SIMULATION -->
            <div class="sim-card ${this.isFireActive ? 'sim-danger' : ''}">
                <div class="sim-header">
                    <h4>🔥 محاكاة إنذار الحريق (Fire Emergency Scenario)</h4>
                    <span class="badge-status ${this.isFireActive ? 'alert' : 'normal'}">
                        ${this.isFireActive ? 'حريق مفعل (ACTIVE ALARM)' : 'الوضع طبيعي (STANDBY)'}
                    </span>
                </div>
                <p>يحاكي انتشار الدخان في المطبخ الذكي، تشغيل الإنذار 110dB، إيقاف التكييف لمنع سحب الدخان، إضاءة الطوارئ، وفتح الأقفال تلقائيًا.</p>
                <div class="sim-actions">
                    <button class="btn btn-danger" onclick="app.triggerFireSimulation()">
                        ${this.isFireActive ? '🔴 إعادة تشغيل التنبيه' : 'تشغيل محاكاة الحريق (Simulate Fire)'}
                    </button>
                    ${this.isFireActive ? `
                        <button class="btn btn-secondary" onclick="app.resetFireSimulation()">
                            إعادة ضبط النظام (Reset System)
                        </button>
                    ` : ''}
                </div>
            </div>

            <!-- REFRIGERATOR SIMULATION -->
            <div class="sim-card">
                <div class="sim-header">
                    <h4>🧊 محاكاة الثلاجة الذكية (Smart Refrigerator Simulation)</h4>
                    <span class="badge-tech">المطبخ الذكي</span>
                </div>
                <p>مراقبة درجة الحرارة الداخلية ومخزون الأغذية وتنبيهات النقص وإغلاق الباب.</p>
                <div class="sim-slider-row">
                    <span>مستوى مخزون الأغذية: <strong>${this.fridgeState.foodLevel}%</strong></span>
                    <input type="range" min="5" max="100" value="${this.fridgeState.foodLevel}" oninput="app.updateFridgeFood(this.value)">
                </div>
                <div class="sim-actions">
                    <button class="btn btn-warning" onclick="app.simulateLowFood()">
                        محاكاة نقص الأغذية (Simulate Low Food)
                    </button>
                    <button class="btn btn-outline" onclick="app.restockFridge()">
                        إعادة تموين الثلاجة (Restock)
                    </button>
                </div>
            </div>

            <!-- ROBOT VACUUM SIMULATION -->
            <div class="sim-card">
                <div class="sim-header">
                    <h4>🤖 محاكاة المكنسة الروبوتية (Robot Vacuum & Mop)</h4>
                    <span class="badge-status normal">${this.vacuumState.status.toUpperCase()}</span>
                </div>
                <p>مستوى شحن البطارية وحاوية الغبار مع حركة تفاعلية في صالة المعيشة داخل الـ 3D.</p>
                <div class="sim-stats-row">
                    <div>البطارية: <strong>${this.vacuumState.battery}%</strong></div>
                    <div>حاوية الغبار: <strong>${this.vacuumState.dustBin}%</strong></div>
                    <div>خزان المياه: <strong>${this.vacuumState.waterTank}%</strong></div>
                </div>
                <div class="sim-actions">
                    <button class="btn btn-primary" onclick="app.toggleVacuumCleaning()">
                        ${this.vacuumState.status === 'Cleaning' ? 'إعادة للقاعدة (Dock)' : 'بدء دورة التنظيف (Start Cleaning)'}
                    </button>
                    <button class="btn btn-warning" onclick="app.simulateFullDustBin()">
                        محاكاة امتلاء الغبار (Full Dust Alert)
                    </button>
                </div>
            </div>

            <!-- WATER LEAK SIMULATION -->
            <div class="sim-card">
                <div class="sim-header">
                    <h4>💧 محاكاة كشف تسرب المياه (Water Leak & Auto-Shutoff)</h4>
                    <span class="badge-tech">محبس 1 بوصة كهرومغناطيسي</span>
                </div>
                <p>عند ملامسة الماء لمجسات الحساس الأرضي، يصدر أمر فوري للمحبس بإغلاق المياه الرئيسية خلال ثانيتين لمنع تلف الأرضيات.</p>
                <div class="sim-actions">
                    <button class="btn btn-warning" onclick="app.simulateWaterLeak()">
                        محاكاة تسرب المياه في المطبخ
                    </button>
                </div>
            </div>
        `;
    }

    triggerFireSimulation() {
        this.isFireActive = true;
        if (this.villa3d) {
            this.villa3d.triggerFireEmergency(true);
        }
        this.notify("danger", "🚨 إنذار حريق طارئ! تم رصد دخان في المطبخ، إيقاف التكييف، وتشغيل مسار الإخلاء.");
        this.renderSimulationLab();
    }

    resetFireSimulation() {
        this.isFireActive = false;
        if (this.villa3d) {
            this.villa3d.triggerFireEmergency(false);
        }
        this.notify("success", "تمت استعادة حالة الأمان وإعادة ضبط نظام إنذار الحريق.");
        this.renderSimulationLab();
    }

    updateFridgeFood(val) {
        this.fridgeState.foodLevel = parseInt(val);
        this.renderSimulationLab();
        if (this.fridgeState.foodLevel < 20) {
            this.notify("warning", "⚠️ تنبيه الثلاجة الذكية: مخزون الأغذية شارف على النفاد!");
        }
    }

    simulateLowFood() {
        this.fridgeState.foodLevel = 12;
        this.renderSimulationLab();
        this.notify("warning", "⚠️ تنبيه الثلاجة الذكية: مخزون الأغذية منخفض (12%)، تمت إضافة قائمة التسوق التلقائية.");
    }

    restockFridge() {
        this.fridgeState.foodLevel = 90;
        this.renderSimulationLab();
        this.notify("success", "تم تحديث بيانات الثلاجة الذكية: تم التموين بنجاح (90%).");
    }

    toggleVacuumCleaning() {
        if (this.vacuumState.status === "Cleaning") {
            this.vacuumState.status = "Docked";
            if (this.villa3d) this.villa3d.setVacuumState(false);
            this.notify("info", "عادت المكنسة الروبوتية إلى محطة التفريغ التلقائي والشحن.");
        } else {
            this.vacuumState.status = "Cleaning";
            if (this.villa3d) this.villa3d.setVacuumState(true);
            this.notify("info", "بدأت المكنسة الروبوتية دورة مسح وتنظيف صالة المعيشة والمجلس.");
        }
        this.renderSimulationLab();
    }

    simulateFullDustBin() {
        this.vacuumState.dustBin = 100;
        this.vacuumState.status = "Maintenance Required";
        if (this.villa3d) this.villa3d.setVacuumState(false);
        this.notify("warning", "⚠️ تنبيه المكنسة الذكية: حاوية الغبار ممتلئة بنسبة 100% وتحتاج للتفريغ.");
        this.renderSimulationLab();
    }

    simulateWaterLeak() {
        this.notify("danger", "💧 تنبيه تسرب مياه! رُصد ماء تحت حوض المطبخ. تم إغلاق محبس التغذية الرئيسي تلقائيًا.");
    }

    // --- FULL DAY DEMO SIMULATION ---
    bindDaySimulation() {
        const playBtn = document.getElementById("btn-day-sim-play");
        const slider = document.getElementById("day-sim-slider");
        const label = document.getElementById("day-sim-label");

        if (playBtn) {
            playBtn.addEventListener("click", () => {
                this.isDaySimPlaying = !this.isDaySimPlaying;
                playBtn.innerHTML = this.isDaySimPlaying ? "إيقاف مؤقت (Pause)" : "تشغيل العرض (Play Demo)";
                playBtn.classList.toggle("btn-danger", this.isDaySimPlaying);

                if (this.isDaySimPlaying) {
                    this.runDaySimulationStep();
                } else {
                    clearTimeout(this.fullDayTimer);
                }
            });
        }

        if (slider) {
            slider.addEventListener("input", (e) => {
                this.fullDayIndex = parseInt(e.target.value);
                this.applyDaySchedule(this.fullDayIndex);
            });
        }
    }

    runDaySimulationStep() {
        if (!this.isDaySimPlaying) return;

        this.applyDaySchedule(this.fullDayIndex);

        this.fullDayTimer = setTimeout(() => {
            this.fullDayIndex = (this.fullDayIndex + 1) % FULL_DAY_SCHEDULE.length;
            const slider = document.getElementById("day-sim-slider");
            if (slider) slider.value = this.fullDayIndex;
            this.runDaySimulationStep();
        }, 5000); // 5 seconds per scene
    }

    applyDaySchedule(index) {
        const item = FULL_DAY_SCHEDULE[index];
        if (!item) return;

        const timeDisplay = document.getElementById("day-sim-time");
        const labelDisplay = document.getElementById("day-sim-label");
        const descDisplay = document.getElementById("day-sim-desc");

        if (timeDisplay) timeDisplay.innerText = item.time;
        if (labelDisplay) labelDisplay.innerText = item.label;
        if (descDisplay) descDisplay.innerText = item.desc;

        if (this.villa3d) {
            this.villa3d.setDayNight(item);
        }

        this.notify("info", item.notification);
    }

    // --- BILL OF MATERIALS (BOM) ---
    renderBOM() {
        const tableBody = document.getElementById("bom-table-body");
        const totalSAR = document.getElementById("bom-total-sar");
        const totalUSD = document.getElementById("bom-total-usd");
        if (!tableBody) return;

        let sumSAR = 0;
        tableBody.innerHTML = BILL_OF_MATERIALS.map((b, idx) => {
            sumSAR += b.totalPriceSAR;
            return `
                <tr>
                    <td><code>${b.id}</code></td>
                    <td style="text-align: center; width: 68px;">
                        <div class="bom-device-thumb-wrap" onclick="app.previewImage('${b.image}', '${b.item}')" title="انقر لتكبير الصورة">
                            <img src="${b.image}" alt="${b.item}" loading="lazy">
                        </div>
                    </td>
                    <td><strong>${b.item}</strong></td>
                    <td><span class="badge-tech">${b.categoryAr}</span></td>
                    <td>${b.roomAr}</td>
                    <td>${b.qty} ${b.unit}</td>
                    <td>${b.protocol}</td>
                    <td>${b.unitPriceSAR.toLocaleString()} ر.س</td>
                    <td><strong>${b.totalPriceSAR.toLocaleString()} ر.س</strong></td>
                    <td><small>${b.wiringNote}</small></td>
                </tr>
            `;
        }).join("");

        if (totalSAR) totalSAR.innerText = `${sumSAR.toLocaleString()} ر.س`;
        if (totalUSD) {
            const sumUSD = Math.round(sumSAR / 3.75);
            totalUSD.innerText = `$${sumUSD.toLocaleString()} USD`;
        }
    }

    filterBOM(category) {
        const rows = document.querySelectorAll("#bom-table-body tr");
        rows.forEach(r => {
            if (category === "all" || r.innerText.includes(category)) {
                r.style.display = "";
            } else {
                r.style.display = "none";
            }
        });
    }

    // --- OTHER STUDY SECTIONS ---
    renderSecurity() {
        // Rendered via static HTML cards with interactive data points
    }

    renderEnergy() {
        // Energy calculations and solar readiness
    }

    renderRecommendations() {
        // Final Roadmap
    }

    // --- NOTIFICATIONS SYSTEM ---
    bindNotificationCenter() {
        const bellBtn = document.getElementById("btn-notifications-bell");
        const drawer = document.getElementById("notifications-drawer");
        const closeBtn = document.getElementById("btn-close-notifs");

        if (bellBtn && drawer) {
            bellBtn.addEventListener("click", () => {
                drawer.classList.toggle("open");
                this.unreadNotifsCount = 0;
                this.updateNotifsBadge();
            });
        }

        if (closeBtn && drawer) {
            closeBtn.addEventListener("click", () => {
                drawer.classList.remove("open");
            });
        }
    }

    notify(type, message) {
        const timeStr = new Date().toLocaleTimeString("ar-SA", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
        const notif = { type, message, time: timeStr, id: Date.now() };
        this.notifications.unshift(notif);
        this.unreadNotifsCount++;
        this.updateNotifsBadge();

        // Show Toast
        this.showToast(notif);

        // Update Drawer list
        this.renderNotifsList();
    }

    updateNotifsBadge() {
        const badge = document.getElementById("notifs-badge");
        if (badge) {
            badge.innerText = this.unreadNotifsCount;
            badge.style.display = this.unreadNotifsCount > 0 ? "inline-block" : "none";
        }
    }

    showToast(notif) {
        const container = document.getElementById("toast-container");
        if (!container) return;

        const toast = document.createElement("div");
        toast.className = `toast-item toast-${notif.type}`;
        const icons = { info: "ℹ️", success: "✅", warning: "⚠️", danger: "🚨" };
        toast.innerHTML = `
            <div class="toast-icon">${icons[notif.type] || "🔔"}</div>
            <div class="toast-content">
                <div class="toast-msg">${notif.message}</div>
                <div class="toast-time">${notif.time}</div>
            </div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add("fade-out");
            setTimeout(() => toast.remove(), 400);
        }, 4500);
    }

    renderNotifsList() {
        const list = document.getElementById("notifs-drawer-list");
        if (!list) return;

        if (this.notifications.length === 0) {
            list.innerHTML = `<div class="empty-notifs">لا توجد إشعارات حاليًا.</div>`;
            return;
        }

        const icons = { info: "ℹ️", success: "✅", warning: "⚠️", danger: "🚨" };
        list.innerHTML = this.notifications.map(n => `
            <div class="drawer-notif-item ${n.type}">
                <div class="dn-icon">${icons[n.type] || "🔔"}</div>
                <div class="dn-content">
                    <div class="dn-msg">${n.message}</div>
                    <div class="dn-time">${n.time}</div>
                </div>
            </div>
        `).join("");
    }

    // --- IMAGE LIGHTBOX ---
    previewImage(src, title) {
        let lightbox = document.getElementById("img-lightbox");
        if (!lightbox) {
            lightbox = document.createElement("div");
            lightbox.id = "img-lightbox";
            lightbox.className = "img-lightbox-overlay";
            lightbox.innerHTML = `
                <div class="img-lightbox-box">
                    <button class="modal-close-btn" onclick="app.closeLightbox()">&times;</button>
                    <img id="lightbox-target-img" class="img-lightbox-img" src="" alt="">
                    <h4 id="lightbox-target-title" style="margin-bottom: 8px; font-weight: 800; color: var(--text-primary);"></h4>
                    <p style="font-size: 0.82rem; color: var(--text-muted);">رسم توضيحي هندسي للمواصفة الفنية للجهاز (Vector Technical Render)</p>
                </div>
            `;
            document.body.appendChild(lightbox);
        }
        document.getElementById("lightbox-target-img").src = src;
        document.getElementById("lightbox-target-title").innerText = title;
        lightbox.classList.add("open");
    }

    closeLightbox() {
        const lightbox = document.getElementById("img-lightbox");
        if (lightbox) lightbox.classList.remove("open");
    }

    // --- PRESENTATION MODE CONTROLS ---
    bindPresentationMode() {
        const toggleBtn = document.getElementById("btn-presentation-mode");
        if (toggleBtn) {
            toggleBtn.addEventListener("click", () => this.togglePresentationMode());
        }

        const exitBtn = document.getElementById("btn-exit-presentation");
        if (exitBtn) {
            exitBtn.addEventListener("click", () => this.togglePresentationMode(false));
        }

        const nextBtn = document.getElementById("btn-pres-next");
        if (nextBtn) {
            nextBtn.addEventListener("click", () => this.nextPresentationSlide());
        }

        const prevBtn = document.getElementById("btn-pres-prev");
        if (prevBtn) {
            prevBtn.addEventListener("click", () => this.prevPresentationSlide());
        }

        // Keyboard navigation
        window.addEventListener("keydown", (e) => {
            if (this.isPresentationMode) {
                if (e.key === "ArrowLeft") {
                    this.nextPresentationSlide();
                } else if (e.key === "ArrowRight") {
                    this.prevPresentationSlide();
                } else if (e.key === "Escape") {
                    this.togglePresentationMode(false);
                }
            }
        });
    }

    togglePresentationMode(forceState) {
        this.isPresentationMode = forceState !== undefined ? forceState : !this.isPresentationMode;
        document.body.classList.toggle("presentation-mode", this.isPresentationMode);
        this.updatePresentationDock();

        if (this.isPresentationMode) {
            this.notify("info", "تم تفعيل وضع العرض التقديمي (Presentation Mode). استخدم مفاتيح الأسهم للتنقل و ESC للخروج.");
            // Request browser fullscreen if available
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(() => {});
            }
        } else {
            if (document.exitFullscreen && document.fullscreenElement) {
                document.exitFullscreen().catch(() => {});
            }
        }

        // Resize 3D viewer
        setTimeout(() => {
            if (this.villa3d) this.villa3d.onResize();
        }, 150);
    }

    nextPresentationSlide() {
        const currentIndex = this.slides.indexOf(this.currentSection);
        if (currentIndex < this.slides.length - 1) {
            this.switchSection(this.slides[currentIndex + 1]);
            this.updatePresentationDock();
        }
    }

    prevPresentationSlide() {
        const currentIndex = this.slides.indexOf(this.currentSection);
        if (currentIndex > 0) {
            this.switchSection(this.slides[currentIndex - 1]);
            this.updatePresentationDock();
        }
    }

    updatePresentationDock() {
        const counter = document.getElementById("pres-dock-counter");
        if (counter) {
            const idx = this.slides.indexOf(this.currentSection) + 1;
            counter.innerText = `${idx.toString().padStart(2, '0')} / ${this.slides.length.toString().padStart(2, '0')}`;
        }
    }
}

// Global App Instance
window.addEventListener("DOMContentLoaded", () => {
    window.app = new SmartVillaApp();
    window.app.init();
});
