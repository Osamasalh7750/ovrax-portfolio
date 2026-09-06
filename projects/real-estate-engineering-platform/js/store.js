/**
 * منصة صروح - إدارة الحالة والتخزين المحلي (State Store)
 * يدعم التزامن اللحظي بين واجهة المستخدم ولوحة الإدارة مع حفظ دائم في LocalStorage
 */

const Store = {
    KEYS: {
        PROPERTIES: "sorouh_properties_v1",
        REQUESTS: "sorouh_requests_v1",
        CHATS: "sorouh_chats_v1",
        NOTIFICATIONS: "sorouh_notifications_v1",
        FAVORITES: "sorouh_favorites_v1",
        USER: "sorouh_user_v1"
    },

    listeners: [],

    init() {
        const storedProps = localStorage.getItem(this.KEYS.PROPERTIES);
        if (!storedProps || JSON.parse(storedProps).length < 50) {
            localStorage.setItem(this.KEYS.PROPERTIES, JSON.stringify(INITIAL_DATA.properties));
        }
        if (!localStorage.getItem(this.KEYS.REQUESTS)) {
            localStorage.setItem(this.KEYS.REQUESTS, JSON.stringify(INITIAL_DATA.initialRequests));
        }
        if (!localStorage.getItem(this.KEYS.CHATS)) {
            localStorage.setItem(this.KEYS.CHATS, JSON.stringify(INITIAL_DATA.initialChats));
        }
        if (!localStorage.getItem(this.KEYS.NOTIFICATIONS)) {
            localStorage.setItem(this.KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_DATA.initialNotifications));
        }
        if (!localStorage.getItem(this.KEYS.FAVORITES)) {
            localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(["PROP-101", "PROP-103"]));
        }
        if (!localStorage.getItem(this.KEYS.USER)) {
            const defaultUser = {
                name: "سلطان عبدالعزيز الراشد",
                role: "مستثمر ومالك عقار",
                phone: "+966 50 123 4567",
                email: "sultan.alrashed@example.com",
                city: "الرياض",
                memberSince: "يناير 2025",
                avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80"
            };
            localStorage.setItem(this.KEYS.USER, JSON.stringify(defaultUser));
        }
    },

    subscribe(callback) {
        this.listeners.push(callback);
    },

    notify(event, data) {
        this.listeners.forEach(fn => {
            try { fn(event, data); } catch (e) { console.error("Store listener error:", e); }
        });
    },

    // --- العقارات (Properties) ---
    getProperties() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.PROPERTIES)) || [];
        } catch {
            return INITIAL_DATA.properties;
        }
    },

    getPropertyById(id) {
        return this.getProperties().find(p => p.id === id);
    },

    addProperty(property) {
        const list = this.getProperties();
        const newProperty = {
            id: "PROP-" + Date.now().toString().slice(-4),
            dateAdded: new Date().toISOString().split("T")[0],
            status: "active",
            isUserAdded: true,
            verified: true,
            ...property
        };
        list.unshift(newProperty);
        localStorage.setItem(this.KEYS.PROPERTIES, JSON.stringify(list));

        // إضافة إشعار
        this.addNotification({
            title: "تم نشر عقارك بنجاح",
            body: `تم إدراج «${newProperty.title}» في المنصة بنجاح وهو الآن متاح للجمهور.`,
            type: "property"
        });

        this.notify("property_added", newProperty);
        return newProperty;
    },

    updateProperty(id, updates) {
        const list = this.getProperties();
        const idx = list.findIndex(p => p.id === id);
        if (idx !== -1) {
            list[idx] = { ...list[idx], ...updates };
            localStorage.setItem(this.KEYS.PROPERTIES, JSON.stringify(list));
            this.notify("property_updated", list[idx]);
            return list[idx];
        }
        return null;
    },

    deleteProperty(id) {
        let list = this.getProperties();
        list = list.filter(p => p.id !== id);
        localStorage.setItem(this.KEYS.PROPERTIES, JSON.stringify(list));
        this.notify("property_deleted", id);
    },

    // --- المفضلة (Favorites) ---
    getFavorites() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.FAVORITES)) || [];
        } catch {
            return [];
        }
    },

    isFavorite(id) {
        return this.getFavorites().includes(id);
    },

    toggleFavorite(id) {
        let favs = this.getFavorites();
        let added = false;
        if (favs.includes(id)) {
            favs = favs.filter(fId => fId !== id);
        } else {
            favs.push(id);
            added = true;
        }
        localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(favs));
        this.notify("favorite_toggled", { id, added, favorites: favs });
        return added;
    },

    // --- الطلبات والمشاريع (Requests) ---
    getRequests() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.REQUESTS)) || [];
        } catch {
            return INITIAL_DATA.initialRequests;
        }
    },

    getRequestById(id) {
        return this.getRequests().find(r => r.id === id);
    },

    addRequest(requestData) {
        const list = this.getRequests();
        const newReq = {
            id: requestData.id || "REQ-" + Math.floor(1000 + Math.random() * 9000),
            date: new Date().toISOString().split("T")[0],
            status: "sent",
            statusLabel: "تم إرسال الطلب",
            progressPercentage: 20,
            assignedEngineer: "فريق الإشراف الهندسي المعتمد",
            notes: "تم استلام طلبكم وجاري تحويله للمهندس الاستشاري المختص للمراجعة.",
            ...requestData
        };
        list.unshift(newReq);
        localStorage.setItem(this.KEYS.REQUESTS, JSON.stringify(list));

        // إشعار
        this.addNotification({
            title: `تم تسجيل طلب جديد #${newReq.id}`,
            body: `طلبك لـ «${newReq.title}» قيد المتابعة من قبل خبرائنا.`,
            type: newReq.typeCode || "request"
        });

        this.notify("request_added", newReq);
        return newReq;
    },

    updateRequestStatus(id, newStatus, customNotes) {
        const list = this.getRequests();
        const idx = list.findIndex(r => r.id === id);
        if (idx !== -1) {
            const statusMap = {
                sent: { label: "تم إرسال الطلب", progress: 20 },
                review: { label: "قيد المراجعة الفنية", progress: 40 },
                quoted: { label: "تم إرسال عرض السعر", progress: 60 },
                approved: { label: "معتمد وموافق عليه", progress: 75 },
                in_progress: { label: "قيد التنفيذ الفعلي", progress: 85 },
                completed: { label: "مكتمل بنجاح", progress: 100 },
                rejected: { label: "مرفوض / ملغي", progress: 0 }
            };

            const info = statusMap[newStatus] || { label: newStatus, progress: 50 };
            list[idx].status = newStatus;
            list[idx].statusLabel = info.label;
            list[idx].progressPercentage = info.progress;
            if (customNotes) list[idx].notes = customNotes;

            localStorage.setItem(this.KEYS.REQUESTS, JSON.stringify(list));

            this.addNotification({
                title: `تحديث حالة الطلب #${id}`,
                body: `تغيرت حالة «${list[idx].title}» إلى: ${info.label}.`,
                type: "status_update"
            });

            this.notify("request_updated", list[idx]);
            return list[idx];
        }
        return null;
    },

    // --- المحادثات (Chats) ---
    getChats() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.CHATS)) || [];
        } catch {
            return INITIAL_DATA.initialChats;
        }
    },

    sendMessage(chatId, text) {
        const chats = this.getChats();
        const chat = chats.find(c => c.id === chatId);
        if (!chat) return null;

        const timeStr = new Intl.DateTimeFormat("ar-SA", { hour: "numeric", minute: "numeric" }).format(new Date());
        const userMsg = { sender: "me", text, time: timeStr };
        chat.messages.push(userMsg);
        chat.lastMessageTime = "الآن";

        localStorage.setItem(this.KEYS.CHATS, JSON.stringify(chats));
        this.notify("chat_updated", chat);

        // محاكاة الرد الآلي من الطرف الآخر بعد ثانية واحدة لجعل التجربة حية ومقنعة للغاية
        setTimeout(() => {
            const replies = [
                "تم استلام رسالتكم وملاحظاتكم، وسيقوم فريقنا الهندسي بالاطلاع عليها فوراً.",
                "شكراً لتواصلك، جاري مراجعة المواصفات وسنوافيك بالتفاصيل خلال دقائق.",
                "أهلاً بك، يسعدنا خدمتك وسنرسل لك التحديث مباشرة عبر المنصة.",
                "تم تدوين الموعد وتأكيد التفاصيل معك."
            ];
            const randomReply = replies[Math.floor(Math.random() * replies.length)];
            const autoMsg = { sender: "other", text: randomReply, time: "الآن" };
            chat.messages.push(autoMsg);
            chat.unread = (chat.unread || 0) + 1;
            chat.lastMessageTime = "الآن";
            localStorage.setItem(this.KEYS.CHATS, JSON.stringify(chats));

            this.addNotification({
                title: `رسالة جديدة من ${chat.contactName}`,
                body: randomReply,
                type: "chat"
            });

            this.notify("chat_updated", chat);
        }, 1200);

        return userMsg;
    },

    // --- الإشعارات (Notifications) ---
    getNotifications() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.NOTIFICATIONS)) || [];
        } catch {
            return INITIAL_DATA.initialNotifications;
        }
    },

    addNotification(notif) {
        const list = this.getNotifications();
        const newN = {
            id: "NOTIF-" + Date.now().toString().slice(-4),
            time: "الآن",
            isRead: false,
            ...notif
        };
        list.unshift(newN);
        localStorage.setItem(this.KEYS.NOTIFICATIONS, JSON.stringify(list));
        this.notify("notification_added", newN);
        return newN;
    },

    markAllNotificationsRead() {
        const list = this.getNotifications().map(n => ({ ...n, isRead: true }));
        localStorage.setItem(this.KEYS.NOTIFICATIONS, JSON.stringify(list));
        this.notify("notifications_read", list);
    },

    // --- بيانات المستخدم (User Profile) ---
    getUser() {
        try {
            return JSON.parse(localStorage.getItem(this.KEYS.USER));
        } catch {
            return null;
        }
    },

    updateUser(updates) {
        const user = { ...this.getUser(), ...updates };
        localStorage.setItem(this.KEYS.USER, JSON.stringify(user));
        this.notify("user_updated", user);
        return user;
    },

    // --- إعادة الضبط للبيانات الافتراضية ---
    resetToDefaults() {
        localStorage.setItem(this.KEYS.PROPERTIES, JSON.stringify(INITIAL_DATA.properties));
        localStorage.setItem(this.KEYS.REQUESTS, JSON.stringify(INITIAL_DATA.initialRequests));
        localStorage.setItem(this.KEYS.CHATS, JSON.stringify(INITIAL_DATA.initialChats));
        localStorage.setItem(this.KEYS.NOTIFICATIONS, JSON.stringify(INITIAL_DATA.initialNotifications));
        localStorage.setItem(this.KEYS.FAVORITES, JSON.stringify(["PROP-101", "PROP-103"]));
        this.notify("store_reset", null);
    }
};

// تهيئة التخزين عند التحميل
Store.init();

if (typeof window !== "undefined") {
    window.Store = Store;
}
if (typeof module !== "undefined" && module.exports) {
    module.exports = Store;
}
