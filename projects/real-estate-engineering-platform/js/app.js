/**
 * منصة صروح - منطق التطبيق التفاعلي (Main Application Controller)
 * يعمل كـ Single Page Application (SPA) فائق السرعة وبدون أي خادم
 */

const App = {
    currentSection: "home",
    currentDashTab: "overview",
    activeChatId: "CHAT-01",
    activeProperty: null,
    uploadedSellImages: [],
    uploadedRenoImages: [],

    // حالة حاسبة البناء
    calcState: {
        type: "villa",
        area: 450,
        floors: 2,
        tier: "vip",
        services: ["arch_design", "struct_design", "mep_design", "structure_build", "finishing_turnkey", "supervision"]
    },

    // حالة معالج الترميم
    renoState: {
        scope: "full_house",
        condition: "medium",
        estimatedCost: 150000
    },

    init() {
        this.bindEvents();
        this.renderAll();

        // قراءة الـ Hash للتنقل المباشر إن وجد
        const hash = window.location.hash.replace("#", "");
        if (hash) {
            this.navigate(hash);
        } else {
            this.navigate("home");
        }

        // الاشتراك في تحديثات الـ Store
        Store.subscribe((event, data) => {
            this.handleStoreUpdate(event, data);
        });
    },

    bindEvents() {
        // تحديث شريط التمرير وموضع الـ Navbar
        window.addEventListener("scroll", () => {
            const nav = document.querySelector(".navbar");
            if (nav) {
                if (window.scrollY > 40) {
                    nav.classList.add("scrolled");
                } else {
                    nav.classList.remove("scrolled");
                }
            }
        });

        // مراقبة أزرار التنقل
        document.querySelectorAll("[data-nav]").forEach(el => {
            el.addEventListener("click", (e) => {
                e.preventDefault();
                const target = el.getAttribute("data-nav");
                this.navigate(target);
            });
        });

        // أزرار تبويب الداشبورد
        document.querySelectorAll("[data-dash-tab]").forEach(el => {
            el.addEventListener("click", () => {
                const tab = el.getAttribute("data-dash-tab");
                this.switchDashTab(tab);
            });
        });

        // زر البحث في الـ Hero
        const heroSearchBtn = document.getElementById("heroSearchBtn");
        if (heroSearchBtn) {
            heroSearchBtn.addEventListener("click", () => this.handleHeroSearch());
        }

        // مستمع شريط مساحة البناء
        const areaSlider = document.getElementById("calcAreaSlider");
        if (areaSlider) {
            areaSlider.addEventListener("input", (e) => {
                this.calcState.area = parseInt(e.target.value);
                const areaDisplay = document.getElementById("calcAreaDisplay");
                if (areaDisplay) areaDisplay.textContent = this.calcState.area;
                this.updateConstructionSummary();
            });
        }

        // إغلاق النوافذ المنبثقة عند النقر على الخلفية المظللة
        document.querySelectorAll(".modal-overlay").forEach(overlay => {
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) {
                    overlay.classList.remove("active");
                }
            });
        });
    },

    navigate(sectionId) {
        this.currentSection = sectionId;
        window.location.hash = sectionId;

        // إخفاء كل الأقسام
        document.querySelectorAll(".page-section").forEach(sec => {
            sec.style.display = "none";
        });

        // إظهار القسم المطلوب
        const targetSection = document.getElementById("section-" + sectionId);
        if (targetSection) {
            targetSection.style.display = "block";
            window.scrollTo({ top: 0, behavior: "smooth" });
        }

        // تحديث روابط الناف بار النشطة
        document.querySelectorAll(".nav-link").forEach(link => {
            if (link.getAttribute("data-nav") === sectionId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // شريط وضع المشرف
        const adminBar = document.getElementById("adminTopBar");
        const btnAdmin = document.getElementById("btnRoleAdmin");
        const btnUser = document.getElementById("btnRoleUser");
        if (adminBar) {
            if (sectionId === "admin") {
                adminBar.style.display = "flex";
                if (btnAdmin) btnAdmin.classList.add("active");
                if (btnUser) btnUser.classList.remove("active");
            } else {
                adminBar.style.display = "none";
                if (btnAdmin) btnAdmin.classList.remove("active");
                if (btnUser) btnUser.classList.add("active");
            }
        }

        // تحديث بيانات القسم المحدد
        if (sectionId === "buy") {
            this.renderProperties("buy");
        } else if (sectionId === "rent") {
            this.renderProperties("rent");
        } else if (sectionId === "dashboard") {
            this.renderDashboard();
        } else if (sectionId === "admin") {
            this.renderAdmin();
        } else if (sectionId === "home") {
            this.renderProperties("buy");
            this.renderProperties("rent");
        }
    },

    // =========================================================================
    // عرض المحتوى والأقسام (Rendering)
    // =========================================================================
    renderAll() {
        this.renderProperties("buy");
        this.renderProperties("rent");
        this.renderEngineeringServices();
        this.renderConstructionWizard();
        this.renderRenovationWizard();
        this.updateBadges();
    },

    updateBadges() {
        // تحديث أرقام المفضلة والإشعارات
        const favs = Store.getFavorites();
        const notifs = Store.getNotifications().filter(n => !n.isRead);

        const favBadge = document.getElementById("navFavCount");
        if (favBadge) favBadge.textContent = favs.length;

        const notifBadge = document.getElementById("navNotifCount");
        if (notifBadge) notifBadge.textContent = notifs.length;
    },

    buyVisibleCount: 12,
    rentVisibleCount: 12,

    renderProperties(category = "buy", filters = {}) {
        let list = Store.getProperties().filter(p => p.category === category && p.status === "active");

        // تطبيق الفلاتر
        if (filters.city && filters.city !== "all") {
            list = list.filter(p => p.city === filters.city);
        }
        if (filters.type && filters.type !== "all") {
            list = list.filter(p => p.type === filters.type);
        }
        if (filters.period && category === "rent" && filters.period !== "all") {
            list = list.filter(p => p.rentPeriod === filters.period || (p.rentPeriodsAvailable && p.rentPeriodsAvailable.includes(filters.period)));
        }
        if (filters.maxPrice) {
            list = list.filter(p => p.price <= filters.maxPrice);
        }

        // 1. شبكة الصفحة الرئيسية (تعرض أحدث 6 عقارات فقط)
        const homeGridId = category === "buy" ? "buyPropertiesGrid" : "rentPropertiesGrid";
        const homeGrid = document.getElementById(homeGridId);
        if (homeGrid) {
            const homeList = list.slice(0, 6);
            homeGrid.innerHTML = homeList.map(item => this.createPropertyCardHTML(item)).join("");
            this.bindCardEvents(homeGrid);
        }

        // 2. شبكة الصفحة المخصصة (تعرض بالقوائم وتحميل المزيد لـ 100 منتج)
        const pageGridId = category === "buy" ? "buyPropertiesGridPage" : "rentPropertiesGridPage";
        const pageGrid = document.getElementById(pageGridId);
        if (pageGrid) {
            const countBadgeId = category === "buy" ? "buyResultsCountBadge" : "rentResultsCountBadge";
            const loadMoreId = category === "buy" ? "buyLoadMoreContainer" : "rentLoadMoreContainer";
            const countBadge = document.getElementById(countBadgeId);
            const loadMoreContainer = document.getElementById(loadMoreId);

            const visibleLimit = category === "buy" ? this.buyVisibleCount : this.rentVisibleCount;
            const displayedList = list.slice(0, visibleLimit);

            if (countBadge) {
                countBadge.innerHTML = `تم العثور على <strong>${list.length}</strong> عقار متاح (${category === 'buy' ? 'للشراء' : 'للإيجار'}) - معروض حالياً <strong>${displayedList.length}</strong>`;
            }

            if (list.length === 0) {
                pageGrid.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #FFF; border-radius: 16px; border: 1px dashed #CBD5E1;">
                        <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
                        <h3 style="font-size: 1.3rem; margin-bottom: 8px;">لم يتم العثور على عقارات مطابقة</h3>
                        <p style="color: #64748B;">يرجى تجربة تعديل خيارات البحث أو تصفية الأسعار والمدينة.</p>
                    </div>
                `;
                if (loadMoreContainer) loadMoreContainer.innerHTML = "";
                return;
            }

            pageGrid.innerHTML = displayedList.map(item => this.createPropertyCardHTML(item)).join("");
            this.bindCardEvents(pageGrid);

            // زر تحميل المزيد إذا كان هناك المزيد من العقارات
            if (loadMoreContainer) {
                if (displayedList.length < list.length) {
                    const remaining = list.length - displayedList.length;
                    loadMoreContainer.innerHTML = `
                        <button class="btn-gold" style="padding: 14px 32px; font-size: 1rem;" onclick="App.loadMoreProperties('${category}')">
                            <span>🔄</span>
                            <span>تحميل المزيد من العروض (متبقي ${remaining} عقار)</span>
                        </button>
                    `;
                } else {
                    loadMoreContainer.innerHTML = `
                        <div style="font-size: 0.9rem; color: #94A3B8; font-weight: 700;">
                            ✓ تم عرض جميع العقارات المتاحة (${list.length} عقار)
                        </div>
                    `;
                }
            }
        }
    },

    loadMoreProperties(category) {
        if (category === "buy") {
            this.buyVisibleCount += 12;
        } else {
            this.rentVisibleCount += 12;
        }
        this.renderProperties(category);
    },

    bindCardEvents(container) {
        container.querySelectorAll(".card-fav-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                const id = btn.getAttribute("data-id");
                this.toggleFavorite(id, btn);
            });
        });

        container.querySelectorAll("[data-open-prop]").forEach(el => {
            el.addEventListener("click", () => {
                const id = el.getAttribute("data-open-prop");
                this.openPropertyModal(id);
            });
        });
    },

    createPropertyCardHTML(item) {
        const isFav = Store.isFavorite(item.id);
        const categoryBadge = item.category === "buy" ? 
            `<span class="badge-tag buy">للبيع</span>` : 
            `<span class="badge-tag rent">للإيجار ${item.rentPeriod ? '(' + item.rentPeriod + ')' : ''}</span>`;
        const featuredBadge = item.isFeatured ? `<span class="badge-tag featured">⭐ مميز</span>` : "";

        return `
            <div class="property-card" data-open-prop="${item.id}">
                <div class="card-image-wrap">
                    <img src="${item.images[0]}" alt="${item.title}" class="card-image" loading="lazy">
                    <div class="card-badges">
                        ${categoryBadge}
                        ${featuredBadge}
                    </div>
                    <button class="card-fav-btn ${isFav ? 'active' : ''}" data-id="${item.id}" title="إضافة للمفضلة">
                        ${isFav ? '❤️' : '🤍'}
                    </button>
                </div>

                <div class="card-body">
                    <div class="card-price-row">
                        <div class="card-price">${item.price.toLocaleString("ar-SA")} ريال</div>
                        <div class="card-price-unit">${item.category === "rent" ? (item.rentPeriod ? '/ ' + item.rentPeriod : '') : ''}</div>
                    </div>

                    <div class="card-location">
                        <span>📍</span>
                        <span>${item.city} - ${item.district}</span>
                    </div>

                    <h3 class="card-title">${item.title}</h3>

                    <div class="card-specs-row">
                        <div class="card-spec-item" title="عدد الغرف">
                            <span>🛏️</span>
                            <span>${item.rooms} غرف</span>
                        </div>
                        <div class="card-spec-item" title="دورات المياه">
                            <span>🚿</span>
                            <span>${item.bathrooms} حمامات</span>
                        </div>
                        <div class="card-spec-item" title="المساحة">
                            <span>📐</span>
                            <span>${item.area} م²</span>
                        </div>
                    </div>

                    <div class="card-footer">
                        <div class="card-broker-info">
                            <img src="${item.broker?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}" class="broker-thumb" alt="${item.broker?.name}">
                            <span class="broker-name-small">${item.broker?.name || 'وسيط معتمد'}</span>
                        </div>
                        <button class="btn-card-action" data-open-prop="${item.id}">التفاصيل الكاملة</button>
                    </div>
                </div>
            </div>
        `;
    },

    // =========================================================================
    // نافذة تفاصيل العقار الشاملة (Property Modal)
    // =========================================================================
    openPropertyModal(id) {
        const prop = Store.getPropertyById(id);
        if (!prop) return;
        this.activeProperty = prop;

        const modal = document.getElementById("propertyDetailModal");
        const body = document.getElementById("propModalContent");
        if (!modal || !body) return;

        const isFav = Store.isFavorite(prop.id);

        body.innerHTML = `
            <div class="property-detail-gallery">
                <div class="gallery-main-img-wrap">
                    <img id="mainGalleryImage" src="${prop.images[0]}" alt="${prop.title}" class="gallery-main-img">
                </div>
                <div class="gallery-thumbs-col">
                    ${prop.images.slice(1, 3).map((img, idx) => `
                        <div class="gallery-thumb-wrap" onclick="document.getElementById('mainGalleryImage').src='${img}'">
                            <img src="${img}" class="gallery-thumb-img" alt="لقطة ${idx + 2}">
                        </div>
                    `).join("")}
                </div>
            </div>

            <div class="prop-detail-layout">
                <div class="prop-main-info">
                    <div style="display: flex; gap: 8px; margin-bottom: 12px;">
                        <span class="badge-tag ${prop.category === 'buy' ? 'buy' : 'rent'}">
                            ${prop.category === 'buy' ? 'عقار متاح للبيع' : 'عقار متاح للإيجار (' + (prop.rentPeriod || 'مرن') + ')'}
                        </span>
                        ${prop.verified ? '<span class="badge-tag featured">✓ موثق برخصة فال</span>' : ''}
                    </div>

                    <h2>${prop.title}</h2>

                    <div style="display: flex; align-items: center; gap: 6px; color: #64748B; font-weight: 600; margin-bottom: 18px;">
                        <span>📍</span>
                        <span>${prop.city}، ${prop.district} - ${prop.address}</span>
                    </div>

                    <div class="prop-detail-price">
                        ${prop.price.toLocaleString("ar-SA")} <span>ريال ${prop.category === 'rent' ? '/ ' + (prop.rentPeriod || 'الفترة') : ''}</span>
                    </div>

                    <div class="prop-specs-pills">
                        <div class="spec-pill"><span class="icon">📐</span> المساحة: ${prop.area} م²</div>
                        <div class="spec-pill"><span class="icon">🛏️</span> غرف النوم: ${prop.rooms}</div>
                        <div class="spec-pill"><span class="icon">🚿</span> الحمامات: ${prop.bathrooms}</div>
                        <div class="spec-pill"><span class="icon">🛋️</span> الصالات: ${prop.livingRooms || 1}</div>
                        <div class="spec-pill"><span class="icon">🏢</span> الأدوار: ${prop.floors || 1}</div>
                        <div class="spec-pill"><span class="icon">🧭</span> الواجهة: ${prop.facade}</div>
                        <div class="spec-pill"><span class="icon">⏳</span> العمر: ${prop.age}</div>
                    </div>

                    <h4 style="font-size: 1.2rem; margin-bottom: 12px; color: #0B0F17;">وصف العقار</h4>
                    <div class="prop-description-box">${prop.description}</div>

                    <h4 style="font-size: 1.2rem; margin-bottom: 14px; color: #0B0F17;">المميزات والمواصفات الفنية</h4>
                    <ul class="prop-features-list">
                        ${prop.features.map(f => `
                            <li class="feature-check-item">
                                <span class="check-icon">✓</span>
                                <span>${f}</span>
                            </li>
                        `).join("")}
                    </ul>

                    <h4 style="font-size: 1.2rem; margin-bottom: 14px; color: #0B0F17;">الموقع الجغرافي التقريبي</h4>
                    <div class="map-simulation-box">
                        <div class="map-marker-pin">📍</div>
                        <div style="position: absolute; bottom: 12px; background: rgba(255,255,255,0.9); padding: 4px 12px; border-radius: 6px; font-size: 0.8rem; font-weight: 700;">
                            ${prop.district} - ${prop.city}
                        </div>
                    </div>
                </div>

                <!-- الشريط الجانبي للمالك / الوسيط والتواصل -->
                <div class="broker-sidebar-card">
                    <div class="broker-profile-head">
                        <img src="${prop.broker?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'}" class="broker-big-avatar" alt="${prop.broker?.name}">
                        <div>
                            <h4 style="font-size: 1.05rem; color: #0B0F17;">${prop.broker?.name}</h4>
                            <div class="broker-title-sub">${prop.broker?.company}</div>
                            <div class="broker-rating">
                                <span>⭐ ${prop.broker?.rating || 4.9}</span>
                                <span style="color: #94A3B8; font-weight: normal;">(${prop.broker?.reviewsCount || 20} تقييم)</span>
                            </div>
                        </div>
                    </div>

                    <div class="broker-action-btns">
                        ${prop.category === 'rent' ? `
                            <button class="btn-book-action" onclick="App.openBookingModal('${prop.id}')">
                                <span>📅</span>
                                <span>حجز العقار الآن</span>
                            </button>
                        ` : ''}

                        <button class="btn-schedule-viewing" onclick="App.openScheduleViewingModal('${prop.id}')">
                            <span>🕒</span>
                            <span>طلب موعد معاينة ميدانية</span>
                        </button>

                        <button class="btn-chat-broker" onclick="App.startChatWithBroker('${prop.broker?.name}', '${prop.title}')">
                            <span>💬</span>
                            <span>محادثة مباشرة مع الوسيط</span>
                        </button>

                        <button class="btn-chat-broker" onclick="App.toggleFavorite('${prop.id}')">
                            <span>${isFav ? '❤️ إزالة من المفضلة' : '🤍 حفظ في المفضلة'}</span>
                        </button>
                    </div>

                    <div style="font-size: 0.82rem; color: #64748B; line-height: 1.5; background: #FFFFFF; padding: 14px; border-radius: 8px; border: 1px solid #E2E8F0;">
                        🛡️ <strong>ضمان المنصة:</strong> جميع الإعلانات مطابقة للاشتراطات الرسمية ومدققة من قبل الفريق الهندسي والتنظيمي لمنصة صروح.
                    </div>
                </div>
            </div>
        `;

        modal.classList.add("active");
    },

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove("active");
    },

    toggleFavorite(id, btnElement = null) {
        const added = Store.toggleFavorite(id);
        this.updateBadges();

        if (btnElement) {
            btnElement.classList.toggle("active", added);
            btnElement.innerHTML = added ? "❤️" : "🤍";
        }

        this.showToast(
            added ? "تمت الإضافة للمفضلة" : "تمت الإزالة من المفضلة",
            added ? "تم حفظ العقار في قائمة مفضلتك للرجوع إليه لاحقاً." : "تم حذف العقار من قائمة المفضلة.",
            added ? "success" : "info"
        );

        // إذا كنا في صفحة المفضلة بالداشبورد، أعد رسمها
        if (this.currentSection === "dashboard" && this.currentDashTab === "favorites") {
            this.renderDashboardFavorites();
        }
    },

    // =========================================================================
    // 3. معالج البناء والتشييد (Construction Wizard)
    // =========================================================================
    renderConstructionWizard() {
        const typesContainer = document.getElementById("constructionTypesGrid");
        const tiersContainer = document.getElementById("finishingTiersGrid");
        const servicesContainer = document.getElementById("constructionServicesGrid");

        if (!typesContainer || !tiersContainer || !servicesContainer) return;

        const config = INITIAL_DATA.constructionConfig;

        // 1. أنواع المشاريع
        typesContainer.innerHTML = config.projectTypes.map(pt => `
            <div class="select-box-item ${pt.id === this.calcState.type ? 'active' : ''}" onclick="App.setConstructionType('${pt.id}')">
                <div class="select-box-icon">${pt.icon}</div>
                <div class="select-box-name">${pt.name}</div>
                <div class="select-box-sub">معدل ${pt.baseCostPerSqm} ر.س/م²</div>
            </div>
        `).join("");

        // 2. مستويات التشطيب
        tiersContainer.innerHTML = config.finishingTiers.map(t => `
            <div class="tier-card ${t.id === this.calcState.tier ? 'active' : ''}" onclick="App.setConstructionTier('${t.id}')">
                <div class="tier-badge">${t.tag}</div>
                <div class="tier-name">${t.name}</div>
                <div class="tier-desc">${t.desc}</div>
            </div>
        `).join("");

        // 3. الخدمات الإضافية
        servicesContainer.innerHTML = config.availableServices.map(srv => {
            const isChecked = this.calcState.services.includes(srv.id);
            return `
                <div class="service-check-box ${isChecked ? 'checked' : ''}" onclick="App.toggleConstructionService('${srv.id}')">
                    <div class="service-check-info">
                        <div class="service-custom-check">${isChecked ? '✓' : ''}</div>
                        <span style="font-weight: 700; font-size: 0.95rem;">${srv.name}</span>
                    </div>
                    <span style="font-size: 0.85rem; color: #64748B; font-weight: 600;">
                        ${srv.cost ? srv.cost.toLocaleString('ar-SA') + ' ر.س' : 'حسب المساحة'}
                    </span>
                </div>
            `;
        }).join("");

        this.updateConstructionSummary();
    },

    setConstructionType(typeId) {
        this.calcState.type = typeId;
        this.renderConstructionWizard();
    },

    setConstructionTier(tierId) {
        this.calcState.tier = tierId;
        this.renderConstructionWizard();
    },

    setConstructionFloors(floors) {
        this.calcState.floors = parseInt(floors);
        document.querySelectorAll("[data-floors-btn]").forEach(b => {
            b.classList.toggle("active", parseInt(b.getAttribute("data-floors-btn")) === this.calcState.floors);
        });
        this.updateConstructionSummary();
    },

    toggleConstructionService(srvId) {
        if (this.calcState.services.includes(srvId)) {
            this.calcState.services = this.calcState.services.filter(id => id !== srvId);
        } else {
            this.calcState.services.push(srvId);
        }
        this.renderConstructionWizard();
    },

    calculateConstructionCost() {
        const config = INITIAL_DATA.constructionConfig;
        const project = config.projectTypes.find(p => p.id === this.calcState.type) || config.projectTypes[0];
        const tier = config.finishingTiers.find(t => t.id === this.calcState.tier) || config.finishingTiers[0];

        // معامل مساحة البناء الإجمالية التقريبية (نسبة البناء 60% لكل دور)
        const builtArea = this.calcState.area * 0.65 * this.calcState.floors;
        let baseCost = builtArea * project.baseCostPerSqm * tier.multiplier;

        // إضافة تكلفة الخدمات المختارة
        let servicesExtra = 0;
        this.calcState.services.forEach(srvId => {
            const srv = config.availableServices.find(s => s.id === srvId);
            if (srv && srv.cost) {
                servicesExtra += srv.cost;
            }
        });

        const totalCost = Math.round(baseCost + servicesExtra);
        return {
            builtArea: Math.round(builtArea),
            totalCost,
            project,
            tier
        };
    },

    updateConstructionSummary() {
        const { builtArea, totalCost, project, tier } = this.calculateConstructionCost();

        const areaEl = document.getElementById("summaryBuiltArea");
        const typeEl = document.getElementById("summaryProjectType");
        const tierEl = document.getElementById("summaryTier");
        const totalEl = document.getElementById("summaryTotalCost");

        if (areaEl) areaEl.textContent = builtArea.toLocaleString("ar-SA") + " م²";
        if (typeEl) typeEl.textContent = project.name;
        if (tierEl) tierEl.textContent = tier.name;
        if (totalEl) totalEl.textContent = totalCost.toLocaleString("ar-SA") + " ريال";
    },

    submitConstructionRequest() {
        const { builtArea, totalCost, project, tier } = this.calculateConstructionCost();

        const reqId = "REQ-BLD-" + Math.floor(1000 + Math.random() * 9000);
        const newReq = Store.addRequest({
            id: reqId,
            type: "بناء وتشييد",
            typeCode: "construction",
            title: `بناء ${project.name} - مساحة أرض ${this.calcState.area} م²`,
            details: `المساحة المبنية المتوقعة: ${builtArea} م² | عدد الأدوار: ${this.calcState.floors} | التشطيب: ${tier.name} | الخدمات المختارة: ${this.calcState.services.length} خدمة`,
            estimatedBudget: totalCost.toLocaleString("ar-SA") + " ريال",
            status: "sent",
            statusLabel: "تم إرسال الطلب",
            progressPercentage: 20,
            assignedEngineer: "م. فهد القرني (استشاري مشاريع إنشائية)",
            notes: "تم إرسال طلب عرض السعر بنجاح، جاري مراجعة المواصفات للتواصل معكم وتنسيق موعد فحص الأرض."
        });

        this.showToast(
            "تم إرسال طلب البناء بنجاح",
            `رقم الطلب #${newReq.id}. يمكنك متابعة دراسة المخططات وجدول الكميات عبر لوحة تحكمك.`,
            "success"
        );

        this.navigate("dashboard");
        this.switchDashTab("my_requests");
    },

    // =========================================================================
    // 4. معالج الترميم والتجديد (Renovation Wizard)
    // =========================================================================
    renderRenovationWizard() {
        const scopesContainer = document.getElementById("renoScopesGrid");
        const conditionsContainer = document.getElementById("renoConditionsGrid");
        if (!scopesContainer || !conditionsContainer) return;

        const config = INITIAL_DATA.renovationConfig;

        scopesContainer.innerHTML = config.scopes.map(sc => `
            <div class="select-box-item ${sc.id === this.renoState.scope ? 'active' : ''}" onclick="App.setRenoScope('${sc.id}')">
                <div class="select-box-icon">${sc.icon}</div>
                <div class="select-box-name">${sc.name}</div>
                <div class="select-box-sub">تقدير مبدئي ${sc.baseCost.toLocaleString('ar-SA')} ر.س</div>
            </div>
        `).join("");

        conditionsContainer.innerHTML = config.conditions.map(c => `
            <div class="tier-card ${c.id === this.renoState.condition ? 'active' : ''}" onclick="App.setRenoCondition('${c.id}')">
                <div class="tier-name">${c.name}</div>
                <div class="tier-desc">${c.desc}</div>
            </div>
        `).join("");

        this.updateRenoSummary();
    },

    setRenoScope(scopeId) {
        this.renoState.scope = scopeId;
        this.renderRenovationWizard();
    },

    setRenoCondition(condId) {
        this.renoState.condition = condId;
        this.renderRenovationWizard();
    },

    updateRenoSummary() {
        const config = INITIAL_DATA.renovationConfig;
        const scope = config.scopes.find(s => s.id === this.renoState.scope) || config.scopes[0];
        const cond = config.conditions.find(c => c.id === this.renoState.condition) || config.conditions[0];

        const estimatedCost = Math.round(scope.baseCost * cond.multiplier);
        this.renoState.estimatedCost = estimatedCost;

        const costDisplay = document.getElementById("renoEstimatedCostDisplay");
        if (costDisplay) costDisplay.textContent = estimatedCost.toLocaleString("ar-SA") + " ريال";
    },

    handleRenoPhotoUpload(event) {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const previewContainer = document.getElementById("renoPhotosPreview");
        if (!previewContainer) return;

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.uploadedRenoImages.push(e.target.result);
                const imgThumb = document.createElement("img");
                imgThumb.src = e.target.result;
                imgThumb.className = "upload-preview-thumb";
                previewContainer.appendChild(imgThumb);
            };
            reader.readAsDataURL(file);
        });

        this.showToast("تم إدراج الصور محلياً", "تم رفع صور العقار الراهنة لمعاينتها مع طلب الترميم.", "info");
    },

    submitRenovationRequest() {
        const config = INITIAL_DATA.renovationConfig;
        const scope = config.scopes.find(s => s.id === this.renoState.scope) || config.scopes[0];
        const cond = config.conditions.find(c => c.id === this.renoState.condition) || config.conditions[0];

        const notesInput = document.getElementById("renoNotesInput");
        const customNotes = notesInput ? notesInput.value : "";

        const reqId = "REQ-REN-" + Math.floor(1000 + Math.random() * 9000);
        const newReq = Store.addRequest({
            id: reqId,
            type: "ترميم وتجديد",
            typeCode: "renovation",
            title: `ترميم: ${scope.name}`,
            details: `نطاق العمل: ${scope.name} | الحالة الراهنة: ${cond.name} | الصور المرفقة: ${this.uploadedRenoImages.length} صور ${customNotes ? ' | ملاحظات: ' + customNotes : ''}`,
            estimatedBudget: this.renoState.estimatedCost.toLocaleString("ar-SA") + " ريال",
            status: "sent",
            statusLabel: "تم إرسال الطلب",
            progressPercentage: 20,
            assignedEngineer: "م. طارق العسيري (مهندس ديكور وترميم)",
            notes: "تم استلام تفاصيل وصور طلب الترميم، وسيتم التواصل لتنسيق زيارة الفحص الميداني وتحديد التكلفة الدقيقة."
        });

        this.showToast(
            "تم إنشاء طلب الترميم بنجاح",
            `رقم الطلب #${newReq.id}. تم إدراج الطلب في حسابك وسيتواصل معك مهندس الموقع.`,
            "success"
        );

        this.navigate("dashboard");
        this.switchDashTab("my_requests");
    },

    // =========================================================================
    // 5. الخدمات الهندسية (Engineering Services)
    // =========================================================================
    renderEngineeringServices() {
        const grid = document.getElementById("engineeringServicesGrid");
        if (!grid) return;

        const services = INITIAL_DATA.engineeringServices;

        grid.innerHTML = services.map(srv => `
            <div class="property-card" style="padding: 28px; display: flex; flex-direction: column;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px;">
                    <div style="width: 54px; height: 54px; border-radius: 14px; background: rgba(37, 99, 235, 0.1); color: #2563EB; display: flex; align-items: center; justify-content: center; font-size: 1.8rem;">
                        ${srv.icon}
                    </div>
                    <span class="badge-tag" style="background: #F1F5F9; color: #1E293B; font-weight: 700;">${srv.badge}</span>
                </div>

                <h3 style="font-size: 1.25rem; font-weight: 800; color: #0B0F17; margin-bottom: 10px;">${srv.title}</h3>
                <p style="color: #64748B; font-size: 0.94rem; line-height: 1.6; margin-bottom: 18px; flex-grow: 1;">${srv.shortDesc}</p>

                <div style="background: #F8FAFC; padding: 14px; border-radius: 10px; margin-bottom: 20px; font-size: 0.85rem; color: #334155;">
                    <div style="font-weight: 700; margin-bottom: 4px; color: #0B0F17;">مخرجات الخدمة المعتمدة:</div>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 4px;">
                        ${srv.deliverables.slice(0, 2).map(d => `<li>• ${d}</li>`).join("")}
                    </ul>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; padding-top: 14px; border-top: 1px solid #E2E8F0; margin-top: auto;">
                    <div>
                        <div style="font-size: 0.78rem; color: #94A3B8;">التكلفة التقديرية</div>
                        <div style="font-size: 1rem; font-weight: 800; color: #C5A059;">${srv.startingPrice}</div>
                    </div>
                    <button class="btn-card-action" onclick="App.openEngineeringRequestModal('${srv.id}')">طلب الخدمة الآن</button>
                </div>
            </div>
        `).join("");
    },

    openEngineeringRequestModal(srvId) {
        const srv = INITIAL_DATA.engineeringServices.find(s => s.id === srvId);
        if (!srv) return;

        const modal = document.getElementById("engineeringModal");
        const titleEl = document.getElementById("engModalServiceTitle");
        const srvIdInput = document.getElementById("engModalServiceId");

        if (titleEl) titleEl.textContent = srv.title;
        if (srvIdInput) srvIdInput.value = srv.id;

        if (modal) modal.classList.add("active");
    },

    submitEngineeringRequest() {
        const srvId = document.getElementById("engModalServiceId")?.value;
        const srv = INITIAL_DATA.engineeringServices.find(s => s.id === srvId);
        if (!srv) return;

        const city = document.getElementById("engReqCity")?.value || "الرياض";
        const area = document.getElementById("engReqArea")?.value || "300";
        const notes = document.getElementById("engReqNotes")?.value || "";

        const reqId = "REQ-ENG-" + Math.floor(1000 + Math.random() * 9000);
        const newReq = Store.addRequest({
            id: reqId,
            type: "خدمة هندسية",
            typeCode: "engineering",
            title: srv.title,
            details: `المدينة: ${city} | مساحة المشروع: ${area} م² ${notes ? ' | ملاحظات: ' + notes : ''}`,
            estimatedBudget: srv.startingPrice,
            status: "sent",
            statusLabel: "تم إرسال الطلب",
            progressPercentage: 20,
            assignedEngineer: "المكتب الهندسي الاستشاري المعتمد",
            notes: "تم استلام تفاصيل الخدمة الهندسية وسيتم تعيين مهندس استشاري للتواصل معكم فوراً."
        });

        this.closeModal("engineeringModal");

        this.showToast(
            "تم تسجيل طلب الخدمة الهندسية",
            `رقم الطلب #${newReq.id}. جاري تعيين المهندس الاستشاري لمتابعة طلبكم.`,
            "success"
        );

        this.navigate("dashboard");
        this.switchDashTab("my_requests");
    },

    // =========================================================================
    // 6. بيع العقارات وإدراج عقار جديد (Sell Property Listing Wizard)
    // =========================================================================
    openAddPropertyModal() {
        const modal = document.getElementById("addPropertyModal");
        if (modal) modal.classList.add("active");
    },

    handleSellPhotoUpload(event) {
        const files = event.target.files;
        if (!files || files.length === 0) return;

        const previewGrid = document.getElementById("sellPhotosPreview");
        if (!previewGrid) return;

        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.uploadedSellImages.push(e.target.result);
                const thumb = document.createElement("img");
                thumb.src = e.target.result;
                thumb.className = "upload-preview-thumb";
                previewGrid.appendChild(thumb);
            };
            reader.readAsDataURL(file);
        });

        this.showToast("تم رفع الصور بنجاح", "تمت إضافة الصور لمعاينة العقار المنشور.", "info");
    },

    submitNewProperty() {
        const title = document.getElementById("sellPropTitle")?.value;
        const category = document.getElementById("sellPropCategory")?.value || "buy";
        const rentPeriod = category === "rent" ? (document.getElementById("sellPropRentPeriod")?.value || "شهري") : null;
        const type = document.getElementById("sellPropType")?.value || "فيلا";
        const city = document.getElementById("sellPropCity")?.value || "الرياض";
        const district = document.getElementById("sellPropDistrict")?.value || "حي النرجس";
        const price = parseInt(document.getElementById("sellPropPrice")?.value) || 1500000;
        const area = parseInt(document.getElementById("sellPropArea")?.value) || 350;
        const rooms = parseInt(document.getElementById("sellPropRooms")?.value) || 4;
        const bathrooms = parseInt(document.getElementById("sellPropBaths")?.value) || 4;
        const desc = document.getElementById("sellPropDesc")?.value || "عقار مميز بمواصفات هندسية عالية وتشطيب راقي.";

        if (!title) {
            this.showToast("تنبيه", "يرجى كتابة عنوان العقار بشكل واضح.", "error");
            return;
        }

        // استخدام الصور المرفوعة أو صور افتراضية فاخرة
        const defaultImages = [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
        ];
        const images = this.uploadedSellImages.length > 0 ? this.uploadedSellImages : defaultImages;

        const user = Store.getUser();

        const newProp = Store.addProperty({
            title,
            category,
            rentPeriod,
            type,
            city,
            district,
            address: `${district}، شارع رئيسي`,
            price,
            priceDisplay: price.toLocaleString("ar-SA") + " ريال" + (category === "rent" ? ` / ${rentPeriod}` : ""),
            area,
            rooms,
            bathrooms,
            livingRooms: 2,
            floors: 2,
            age: "جديد كلياً",
            facade: "شمالية",
            isFeatured: false,
            verified: true,
            status: "active",
            images,
            description: desc,
            features: [
                "تشطيب هندسي فاخر",
                "مطابق لكود البناء السعودي",
                "ضمانات شاملة على السباكة والكهرباء والخرسانة",
                "موقف خاص ونظام أمني"
            ],
            broker: {
                name: user?.name || "سلطان الراشد (المالك)",
                title: "مالك العقار المباشر",
                company: "صروح لإدارة الأملاك",
                phone: user?.phone || "+966 50 123 4567",
                rating: 5.0,
                reviewsCount: 1,
                avatar: user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
            }
        });

        this.closeModal("addPropertyModal");
        this.uploadedSellImages = [];
        const previewGrid = document.getElementById("sellPhotosPreview");
        if (previewGrid) previewGrid.innerHTML = "";

        this.showToast("تهانينا! تم نشر العقار بنجاح", `تم إدراج «${newProp.title}» في المنصة وهو متاح الآن للجمهور.`, "success");

        this.renderProperties("buy");
        this.renderProperties("rent");

        this.navigate("dashboard");
        this.switchDashTab("my_properties");
    },

    // =========================================================================
    // 7. طلبات المعاينة وحجز الإيجار
    // =========================================================================
    openScheduleViewingModal(propId) {
        const prop = Store.getPropertyById(propId);
        if (!prop) return;

        const modal = document.getElementById("scheduleViewingModal");
        const titleEl = document.getElementById("viewingModalPropTitle");
        const idInput = document.getElementById("viewingModalPropId");

        if (titleEl) titleEl.textContent = prop.title;
        if (idInput) idInput.value = prop.id;

        if (modal) modal.classList.add("active");
    },

    submitScheduleViewing() {
        const propId = document.getElementById("viewingModalPropId")?.value;
        const prop = Store.getPropertyById(propId);
        if (!prop) return;

        const date = document.getElementById("viewingDate")?.value || "2026-09-10";
        const time = document.getElementById("viewingTime")?.value || "05:00 عصراً";

        const reqId = "REQ-VIEW-" + Math.floor(1000 + Math.random() * 9000);
        const newReq = Store.addRequest({
            id: reqId,
            type: "طلب معاينة عقار",
            typeCode: "viewing",
            title: `معاينة: ${prop.title} (#${prop.id})`,
            details: `الموعد المحدد: ${date} - الساعة ${time} | الموقع: ${prop.district} - ${prop.city}`,
            estimatedBudget: "مجاناً",
            status: "sent",
            statusLabel: "قيد تأكيد الموعد",
            progressPercentage: 30,
            assignedEngineer: prop.broker?.name || "الوسيط المسؤول",
            notes: "تم إرسال طلب المعاينة وسيصلك اتصال أو رسالة تأكيد لحضور المستشار العقاري بالموقع."
        });

        this.closeModal("scheduleViewingModal");
        this.closeModal("propertyDetailModal");

        this.showToast(
            "تم تسجيل طلب المعاينة بنجاح",
            `تم حجز موعدك المبدئي (${date} - ${time}). سنوافيك بتأكيد الوسيط فوراً.`,
            "success"
        );

        this.navigate("dashboard");
        this.switchDashTab("my_requests");
    },

    openBookingModal(propId) {
        const prop = Store.getPropertyById(propId);
        if (!prop) return;

        const modal = document.getElementById("rentBookingModal");
        const titleEl = document.getElementById("bookingModalPropTitle");
        const idInput = document.getElementById("bookingModalPropId");
        const priceEl = document.getElementById("bookingModalPriceDisplay");

        if (titleEl) titleEl.textContent = prop.title;
        if (idInput) idInput.value = prop.id;
        if (priceEl) priceEl.textContent = prop.priceDisplay;

        if (modal) modal.classList.add("active");
    },

    submitRentBooking() {
        const propId = document.getElementById("bookingModalPropId")?.value;
        const prop = Store.getPropertyById(propId);
        if (!prop) return;

        const startDate = document.getElementById("bookingStartDate")?.value || "2026-09-15";
        const duration = document.getElementById("bookingDuration")?.value || "1";

        const reqId = "REQ-RENT-" + Math.floor(1000 + Math.random() * 9000);
        const newReq = Store.addRequest({
            id: reqId,
            type: "حجز إيجار",
            typeCode: "rental_booking",
            title: `حجز إيجار: ${prop.title} (${prop.rentPeriod || 'شهري'})`,
            details: `تاريخ البدء: ${startDate} | المدة: ${duration} ${prop.rentPeriod || 'شهر'} | القيمة الإجمالية: ${prop.priceDisplay}`,
            estimatedBudget: prop.priceDisplay,
            status: "approved",
            statusLabel: "مؤكد وجاهز للسكن",
            progressPercentage: 80,
            assignedEngineer: prop.broker?.name || "إدارة الحجوزات والضيافة",
            notes: "تم استلام حجزكم وتثبيت الموعد، رمز الدخول الذكي للباب سيصلك على رقم هاتفك المسجل."
        });

        this.closeModal("rentBookingModal");
        this.closeModal("propertyDetailModal");

        this.showToast(
            "تم تأكيد حجز الإيجار بنجاح",
            `رقم الحجز #${newReq.id}. تم إدراج الحجز في خانة «حجوزاتي» في لوحة تحكمك.`,
            "success"
        );

        this.navigate("dashboard");
        this.switchDashTab("my_bookings");
    },

    // =========================================================================
    // 8. لوحة تحكم المستخدم (User Dashboard)
    // =========================================================================
    renderDashboard() {
        const user = Store.getUser();
        if (user) {
            const nameEls = document.querySelectorAll(".dyn-user-name");
            nameEls.forEach(el => el.textContent = user.name);

            const roleEls = document.querySelectorAll(".dyn-user-role");
            roleEls.forEach(el => el.textContent = user.role);

            const avatarEls = document.querySelectorAll(".dyn-user-avatar");
            avatarEls.forEach(el => el.src = user.avatar);
        }

        this.switchDashTab(this.currentDashTab);
    },

    switchDashTab(tabName) {
        this.currentDashTab = tabName;

        document.querySelectorAll("[data-dash-tab]").forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-dash-tab") === tabName);
        });

        // إخفاء كافة محتويات التبويبات
        document.querySelectorAll(".dash-tab-content").forEach(panel => {
            panel.style.display = "none";
        });

        const targetPanel = document.getElementById("dash-panel-" + tabName);
        if (targetPanel) targetPanel.style.display = "block";

        if (tabName === "overview") this.renderDashboardOverview();
        else if (tabName === "my_properties") this.renderDashboardProperties();
        else if (tabName === "favorites") this.renderDashboardFavorites();
        else if (tabName === "my_requests") this.renderDashboardRequests();
        else if (tabName === "my_bookings") this.renderDashboardBookings();
        else if (tabName === "messages") this.renderDashboardMessages();
        else if (tabName === "notifications") this.renderDashboardNotifications();
        else if (tabName === "profile") this.renderDashboardProfile();
    },

    renderDashboardOverview() {
        const properties = Store.getProperties().filter(p => p.isUserAdded);
        const requests = Store.getRequests();
        const favs = Store.getFavorites();
        const unreadChats = Store.getChats().reduce((acc, c) => acc + (c.unread || 0), 0);

        const kpiGrid = document.getElementById("dashOverviewKpis");
        if (kpiGrid) {
            kpiGrid.innerHTML = `
                <div class="kpi-card">
                    <div class="kpi-icon-wrap">🏡</div>
                    <div>
                        <div class="kpi-num">${properties.length}</div>
                        <div class="kpi-label">عقاراتي المعروضة</div>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-icon-wrap">📋</div>
                    <div>
                        <div class="kpi-num">${requests.length}</div>
                        <div class="kpi-label">إجمالي الطلبات والمشاريع</div>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-icon-wrap">❤️</div>
                    <div>
                        <div class="kpi-num">${favs.length}</div>
                        <div class="kpi-label">العقارات المفضلة</div>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-icon-wrap">💬</div>
                    <div>
                        <div class="kpi-num">${unreadChats}</div>
                        <div class="kpi-label">رسائل واردة جديدة</div>
                    </div>
                </div>
            `;
        }

        // أحدث الطلبات في النظرة العامة
        const recentContainer = document.getElementById("dashRecentRequestsList");
        if (recentContainer) {
            const recent = requests.slice(0, 3);
            recentContainer.innerHTML = recent.map(r => this.createRequestCardHTML(r)).join("");
        }
    },

    renderDashboardProperties() {
        const container = document.getElementById("myPropertiesList");
        if (!container) return;

        const userProps = Store.getProperties().filter(p => p.isUserAdded);

        if (userProps.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; background: #F8FAFC; border-radius: 16px; border: 1px dashed #CBD5E1;">
                    <div style="font-size: 3rem; margin-bottom: 12px;">🏠</div>
                    <h3 style="font-size: 1.3rem; margin-bottom: 8px;">لم تقم بإضافة أي عقار حتى الآن</h3>
                    <p style="color: #64748B; margin-bottom: 20px;">يمكنك عرض عقارك للبيع أو للإيجار بسهولة والوصول لآلاف المشترين والمستأجرين.</p>
                    <button class="btn-gold" onclick="App.openAddPropertyModal()">+ إضافة عقار جديد الآن</button>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="data-table-container">
                <table class="custom-data-table">
                    <thead>
                        <tr>
                            <th>العقار</th>
                            <th>النوع</th>
                            <th>السعر</th>
                            <th>المدينة</th>
                            <th>الحالة</th>
                            <th>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${userProps.map(p => `
                            <tr>
                                <td>
                                    <div class="table-prop-cell">
                                        <img src="${p.images[0]}" class="table-prop-thumb" alt="${p.title}">
                                        <div>
                                            <div style="font-weight: 800; color: #0B0F17;">${p.title}</div>
                                            <div style="font-size: 0.78rem; color: #64748B;">#${p.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td><span class="badge-tag ${p.category === 'buy' ? 'buy' : 'rent'}">${p.category === 'buy' ? 'بيع' : 'إيجار'}</span></td>
                                <td style="font-weight: 800;">${p.price.toLocaleString("ar-SA")} ر.س</td>
                                <td>${p.city}</td>
                                <td>
                                    <span style="display: inline-flex; align-items: center; gap: 4px; font-weight: 700; color: ${p.status === 'active' ? '#10B981' : '#F59E0B'};">
                                        ● ${p.status === 'active' ? 'نشط ومعروض' : 'موقوف مؤقتاً'}
                                    </span>
                                </td>
                                <td>
                                    <div style="display: flex; gap: 8px;">
                                        <button class="btn-card-action" onclick="App.togglePropertyStatus('${p.id}')">
                                            ${p.status === 'active' ? 'إيقاف الإعلان' : 'تفعيل'}
                                        </button>
                                        <button class="btn-card-action" style="color: #EF4444;" onclick="App.deleteUserProperty('${p.id}')">حذف</button>
                                    </div>
                                </td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    },

    togglePropertyStatus(id) {
        const prop = Store.getPropertyById(id);
        if (!prop) return;
        const newStatus = prop.status === "active" ? "paused" : "active";
        Store.updateProperty(id, { status: newStatus });
        this.renderDashboardProperties();
        this.showToast("تم تحديث حالة الإعلان", `أصبح العقار الآن: ${newStatus === 'active' ? 'نشط ومعروض' : 'موقوف مؤقتاً'}.`, "info");
    },

    deleteUserProperty(id) {
        if (confirm("هل أنت متأكد من رغبتك في حذف هذا العقار من المنصة؟")) {
            Store.deleteProperty(id);
            this.renderDashboardProperties();
            this.renderProperties("buy");
            this.renderProperties("rent");
            this.showToast("تم حذف العقار", "تمت إزالة العقار من قائمتك ومن المنصة بنجاح.", "info");
        }
    },

    renderDashboardFavorites() {
        const container = document.getElementById("myFavoritesGrid");
        if (!container) return;

        const favIds = Store.getFavorites();
        const favProps = Store.getProperties().filter(p => favIds.includes(p.id));

        if (favProps.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; background: #F8FAFC; border-radius: 16px; border: 1px dashed #CBD5E1;">
                    <div style="font-size: 3rem; margin-bottom: 12px;">❤️</div>
                    <h3 style="font-size: 1.3rem; margin-bottom: 8px;">قائمة المفضلة فارغة حالياً</h3>
                    <p style="color: #64748B; margin-bottom: 20px;">تصفح العقارات المتاحة للبيع أو للإيجار واضغط على علامة القلب لحفظ العقارات التي تعجبك.</p>
                    <button class="btn-gold" onclick="App.navigate('buy')">تصفح العقارات للبيع</button>
                </div>
            `;
            return;
        }

        container.innerHTML = favProps.map(p => this.createPropertyCardHTML(p)).join("");
    },

    renderDashboardRequests() {
        const container = document.getElementById("myRequestsList");
        if (!container) return;

        const requests = Store.getRequests();
        if (requests.length === 0) {
            container.innerHTML = `<p style="text-align: center; color: #64748B; padding: 40px;">لا توجد طلبات مسجلة حالياً.</p>`;
            return;
        }

        container.innerHTML = requests.map(r => this.createRequestCardHTML(r)).join("");
    },

    createRequestCardHTML(req) {
        return `
            <div class="request-tracker-card">
                <div class="req-card-header">
                    <div>
                        <span class="req-id-badge">#${req.id}</span>
                        <span style="font-weight: 800; font-size: 1.15rem; color: #0B0F17; margin-right: 8px;">${req.title}</span>
                    </div>
                    <span class="req-status-pill ${req.status}">${req.statusLabel}</span>
                </div>

                <p style="color: #475569; font-size: 0.95rem; margin-bottom: 12px; line-height: 1.6;">${req.details}</p>

                <!-- شريط التقدم المرئي التفاعلي -->
                <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 700; color: #64748B; margin-bottom: 4px;">
                    <span>مرحلة الإنجاز</span>
                    <span style="color: #C5A059;">${req.progressPercentage}%</span>
                </div>
                <div class="req-progress-bar-wrap">
                    <div class="req-progress-bar-fill" style="width: ${req.progressPercentage}%;"></div>
                </div>

                <!-- مسار الخطوات التفاعلي -->
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #94A3B8; margin-bottom: 16px;">
                    <span>1. إرسال الطلب</span>
                    <span>2. مراجعة هندسية</span>
                    <span>3. عرض السعر</span>
                    <span>4. اعتماد</span>
                    <span>5. قيد التنفيذ</span>
                    <span>6. مكتمل</span>
                </div>

                <div style="background: #F8FAFC; padding: 12px 16px; border-radius: 8px; font-size: 0.88rem; border: 1px solid #E2E8F0; display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-weight: 700; color: #0B0F17;">المهندس المشرف:</span>
                        <span style="color: #2563EB; font-weight: 600;">${req.assignedEngineer}</span>
                    </div>
                    <div>
                        <span style="font-weight: 700; color: #0B0F17;">آخر تحديث:</span>
                        <span style="color: #475569;">${req.notes}</span>
                    </div>
                </div>
            </div>
        `;
    },

    renderDashboardBookings() {
        const container = document.getElementById("myBookingsList");
        if (!container) return;

        const bookings = Store.getRequests().filter(r => r.typeCode === "rental_booking");

        if (bookings.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px 20px; background: #F8FAFC; border-radius: 16px; border: 1px dashed #CBD5E1;">
                    <div style="font-size: 3rem; margin-bottom: 12px;">🔑</div>
                    <h3 style="font-size: 1.3rem; margin-bottom: 8px;">لا توجد حجوزات إيجار حالية</h3>
                    <p style="color: #64748B; margin-bottom: 20px;">استكشف شقق وفلل وشاليهات الإيجار اليومي والشهري والسنوي واحجز وحدتك فوراً.</p>
                    <button class="btn-gold" onclick="App.navigate('rent')">تصفح عقارات الإيجار</button>
                </div>
            `;
            return;
        }

        container.innerHTML = bookings.map(b => this.createRequestCardHTML(b)).join("");
    },

    // المحادثات الحية التجريبية
    renderDashboardMessages() {
        const threadsContainer = document.getElementById("chatThreadsList");
        const messagesPane = document.getElementById("chatMessagesBody");
        const contactNameEl = document.getElementById("activeChatContactName");
        const contactRoleEl = document.getElementById("activeChatContactRole");
        const contactAvatarEl = document.getElementById("activeChatContactAvatar");

        if (!threadsContainer || !messagesPane) return;

        const chats = Store.getChats();
        const activeChat = chats.find(c => c.id === this.activeChatId) || chats[0];

        // قائمة المحادثات الجانبية
        threadsContainer.innerHTML = chats.map(c => `
            <div class="chat-thread-item ${c.id === activeChat.id ? 'active' : ''}" onclick="App.selectChatThread('${c.id}')">
                <img src="${c.avatar}" class="chat-thread-avatar" alt="${c.contactName}">
                <div class="chat-thread-content">
                    <div class="chat-thread-name">${c.contactName}</div>
                    <div class="chat-thread-snippet">${c.messages[c.messages.length - 1]?.text || ''}</div>
                </div>
                ${c.unread > 0 ? `<span class="badge-count" style="position: static;">${c.unread}</span>` : ''}
            </div>
        `).join("");

        // رأس المحادثة
        if (contactNameEl) contactNameEl.textContent = activeChat.contactName;
        if (contactRoleEl) contactRoleEl.textContent = activeChat.contactRole;
        if (contactAvatarEl) contactAvatarEl.src = activeChat.avatar;

        // الرسائل
        messagesPane.innerHTML = activeChat.messages.map(m => `
            <div class="chat-bubble ${m.sender}">
                <div>${m.text}</div>
                <div class="chat-time">${m.time}</div>
            </div>
        `).join("");

        messagesPane.scrollTop = messagesPane.scrollHeight;
    },

    selectChatThread(chatId) {
        this.activeChatId = chatId;
        const chats = Store.getChats();
        const chat = chats.find(c => c.id === chatId);
        if (chat) chat.unread = 0;
        this.renderDashboardMessages();
    },

    sendChatMessage() {
        const input = document.getElementById("chatMessageInput");
        if (!input || !input.value.trim()) return;

        const text = input.value.trim();
        input.value = "";

        Store.sendMessage(this.activeChatId, text);
        this.renderDashboardMessages();
    },

    startChatWithBroker(brokerName, propertyTitle) {
        this.closeModal("propertyDetailModal");
        this.navigate("dashboard");
        this.switchDashTab("messages");

        // إضافة رسالة استفسار
        setTimeout(() => {
            const input = document.getElementById("chatMessageInput");
            if (input) {
                input.value = `السلام عليكم، أود الاستفسار بخصوص «${propertyTitle}».`;
                input.focus();
            }
        }, 300);
    },

    renderDashboardNotifications() {
        const container = document.getElementById("myNotificationsList");
        if (!container) return;

        const notifs = Store.getNotifications();

        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="font-size: 1.2rem; color: #0B0F17;">مركز التنبيهات والإشعارات</h3>
                <button class="btn-card-action" onclick="App.markAllNotificationsRead()">تحديد الكل كمقروء ✓</button>
            </div>
            <div style="display: flex; flex-direction: column; gap: 12px;">
                ${notifs.map(n => `
                    <div style="background: ${n.isRead ? '#FFFFFF' : '#F0F9FF'}; border: 1px solid ${n.isRead ? '#E2E8F0' : '#BAE6FD'}; padding: 16px 20px; border-radius: 12px; display: flex; align-items: flex-start; gap: 14px;">
                        <span style="font-size: 1.5rem;">${n.isRead ? '🔔' : '🔔'}</span>
                        <div style="flex-grow: 1;">
                            <div style="font-weight: 800; font-size: 0.98rem; color: #0B0F17; margin-bottom: 4px;">${n.title}</div>
                            <div style="color: #475569; font-size: 0.88rem; line-height: 1.5;">${n.body}</div>
                            <div style="color: #94A3B8; font-size: 0.75rem; margin-top: 6px;">${n.time}</div>
                        </div>
                    </div>
                `).join("")}
            </div>
        `;
    },

    markAllNotificationsRead() {
        Store.markAllNotificationsRead();
        this.renderDashboardNotifications();
        this.updateBadges();
        this.showToast("تم التحديث", "تم تحديد كافة الإشعارات كمقروءة.", "info");
    },

    renderDashboardProfile() {
        const user = Store.getUser();
        if (!user) return;

        const nameInput = document.getElementById("profileNameInput");
        const phoneInput = document.getElementById("profilePhoneInput");
        const emailInput = document.getElementById("profileEmailInput");
        const cityInput = document.getElementById("profileCityInput");

        if (nameInput) nameInput.value = user.name;
        if (phoneInput) phoneInput.value = user.phone;
        if (emailInput) emailInput.value = user.email;
        if (cityInput) cityInput.value = user.city;
    },

    saveUserProfile() {
        const name = document.getElementById("profileNameInput")?.value;
        const phone = document.getElementById("profilePhoneInput")?.value;
        const email = document.getElementById("profileEmailInput")?.value;
        const city = document.getElementById("profileCityInput")?.value;

        Store.updateUser({ name, phone, email, city });
        this.renderDashboard();
        this.showToast("تم الحفظ", "تم تحديث بيانات الملف الشخصي بنجاح.", "success");
    },

    // =========================================================================
    // 9. لوحة إدارة المنصة (Admin Dashboard)
    // =========================================================================
    renderAdmin() {
        const properties = Store.getProperties();
        const requests = Store.getRequests();

        // إحصائيات لوحة الإدارة
        const bldCount = requests.filter(r => r.typeCode === "construction").length;
        const renCount = requests.filter(r => r.typeCode === "renovation").length;
        const engCount = requests.filter(r => r.typeCode === "engineering").length;

        const kpisContainer = document.getElementById("adminKpisGrid");
        if (kpisContainer) {
            kpisContainer.innerHTML = `
                <div class="kpi-card">
                    <div class="kpi-icon-wrap" style="background: rgba(16, 185, 129, 0.12); color: #10B981;">🏢</div>
                    <div>
                        <div class="kpi-num">${properties.length}</div>
                        <div class="kpi-label">إجمالي العقارات بالمنصة</div>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-icon-wrap" style="background: rgba(197, 160, 89, 0.12); color: #C5A059;">🏗️</div>
                    <div>
                        <div class="kpi-num">${bldCount}</div>
                        <div class="kpi-label">طلبات البناء والتشييد</div>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-icon-wrap" style="background: rgba(37, 99, 235, 0.12); color: #2563EB;">🔨</div>
                    <div>
                        <div class="kpi-num">${renCount}</div>
                        <div class="kpi-label">طلبات الترميم والتجديد</div>
                    </div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-icon-wrap" style="background: rgba(139, 92, 246, 0.12); color: #8B5CF6;">📐</div>
                    <div>
                        <div class="kpi-num">${engCount}</div>
                        <div class="kpi-label">طلبات الخدمات الهندسية</div>
                    </div>
                </div>
            `;
        }

        // جدول الطلبات مع إمكانية تغيير الحالة فورا
        const requestsTableBody = document.getElementById("adminRequestsTableBody");
        if (requestsTableBody) {
            requestsTableBody.innerHTML = requests.map(r => `
                <tr>
                    <td><span class="req-id-badge">#${r.id}</span></td>
                    <td style="font-weight: 800; color: #0B0F17;">${r.title}</td>
                    <td><span class="badge-tag" style="background: #F1F5F9; color: #1E293B;">${r.type}</span></td>
                    <td>${r.estimatedBudget}</td>
                    <td>
                        <select onchange="App.adminChangeRequestStatus('${r.id}', this.value)" style="padding: 6px 12px; border-radius: 8px; border: 1px solid #CBD5E1; font-weight: 700; background: #FFFFFF; color: #0B0F17; cursor: pointer;">
                            <option value="sent" ${r.status === 'sent' ? 'selected' : ''}>تم إرسال الطلب</option>
                            <option value="review" ${r.status === 'review' ? 'selected' : ''}>قيد المراجعة الفنية</option>
                            <option value="quoted" ${r.status === 'quoted' ? 'selected' : ''}>تم إرسال عرض السعر</option>
                            <option value="approved" ${r.status === 'approved' ? 'selected' : ''}>معتمد وموافق عليه</option>
                            <option value="in_progress" ${r.status === 'in_progress' ? 'selected' : ''}>قيد التنفيذ الفعلي</option>
                            <option value="completed" ${r.status === 'completed' ? 'selected' : ''}>مكتمل بنجاح</option>
                        </select>
                    </td>
                    <td>${r.date}</td>
                </tr>
            `).join("");
        }

        // جدول العقارات للمشرف
        const propsTableBody = document.getElementById("adminPropertiesTableBody");
        if (propsTableBody) {
            propsTableBody.innerHTML = properties.map(p => `
                <tr>
                    <td>
                        <div class="table-prop-cell">
                            <img src="${p.images[0]}" class="table-prop-thumb" alt="${p.title}">
                            <div>
                                <div style="font-weight: 800; color: #0B0F17;">${p.title}</div>
                                <div style="font-size: 0.78rem; color: #64748B;">#${p.id}</div>
                            </div>
                        </div>
                    </td>
                    <td><span class="badge-tag ${p.category === 'buy' ? 'buy' : 'rent'}">${p.category === 'buy' ? 'بيع' : 'إيجار'}</span></td>
                    <td style="font-weight: 800;">${p.price.toLocaleString("ar-SA")} ر.س</td>
                    <td>${p.city}</td>
                    <td>
                        <button class="btn-card-action" onclick="App.togglePropertyStatus('${p.id}')">
                            ${p.status === 'active' ? 'إيقاف الإعلان' : 'تفعيل'}
                        </button>
                    </td>
                </tr>
            `).join("");
        }
    },

    adminChangeRequestStatus(reqId, newStatus) {
        Store.updateRequestStatus(reqId, newStatus);
        this.renderAdmin();
        this.showToast(
            "تم تحديث حالة الطلب من قبل الإدارة",
            `تغيرت حالة الطلب #${reqId} وسينعكس ذلك فوراً في لوحة تحكم المستخدم.`,
            "success"
        );
    },

    resetAllPlatformData() {
        if (confirm("هل أنت متأكد من رغبتك في إعادة ضبط جميع بيانات المنصة للوضع المبدئي الافتراضي؟")) {
            Store.resetToDefaults();
            this.showToast("تمت إعادة الضبط", "تم استعادة كافة العقارات والطلبات والرسائل الافتراضية بنجاح.", "info");
            this.renderAll();
            this.navigate("home");
        }
    },

    // =========================================================================
    // 10. محرك البحث والفرز في الـ Hero
    // =========================================================================
    handleHeroSearch() {
        const sector = document.getElementById("heroSectorSelect")?.value || "buy";
        const city = document.getElementById("heroCitySelect")?.value || "all";
        const type = document.getElementById("heroTypeSelect")?.value || "all";
        const maxPrice = parseInt(document.getElementById("heroPriceSelect")?.value) || 0;

        if (sector === "construction") {
            this.navigate("construction");
            return;
        }
        if (sector === "renovation") {
            this.navigate("renovation");
            return;
        }
        if (sector === "engineering") {
            this.navigate("engineering");
            return;
        }

        const filters = { city, type };
        if (maxPrice > 0) filters.maxPrice = maxPrice;

        this.navigate(sector);
        this.renderProperties(sector, filters);

        this.showToast("نتائج البحث", `تم تطبيق التصفية لـ (${sector === 'buy' ? 'عقارات الشراء' : 'عقارات الإيجار'}).`, "info");
    },

    filterRentByPeriod(period) {
        document.querySelectorAll("[data-rent-period]").forEach(btn => {
            btn.classList.toggle("active", btn.getAttribute("data-rent-period") === period);
        });
        this.renderProperties("rent", { period });
    },

    // =========================================================================
    // 11. المساعدات والإشعارات (Toasts & Notifications)
    // =========================================================================
    showToast(title, desc, type = "info") {
        let container = document.getElementById("toastContainer");
        if (!container) {
            container = document.createElement("div");
            container.id = "toastContainer";
            container.className = "toast-container";
            document.body.appendChild(container);
        }

        const toast = document.createElement("div");
        toast.className = `toast-item ${type}`;
        toast.innerHTML = `
            <div style="font-size: 1.4rem;">
                ${type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️'}
            </div>
            <div>
                <div class="toast-title">${title}</div>
                <div class="toast-desc">${desc}</div>
            </div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "translateX(-30px)";
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    },

    handleStoreUpdate(event, data) {
        this.updateBadges();
    }
};

// إتاحة الكائن للنافذة
if (typeof window !== "undefined") {
    window.App = App;
}

// تشغيل التطبيق عند اكتمال تحميل الـ DOM
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        App.init();
    });
}
