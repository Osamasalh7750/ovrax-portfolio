/**
 * منصة مَنار التعليمية - مدير التخزين المحلي (LocalStorage Manager)
 * يحفظ الحجوزات والتسجيلات والملاحظات محلياً بدون خادم
 */

var ManarStorage = (function() {
  var STORAGE_KEYS = {
    BOOKINGS: "manar_bookings_v1",
    REGISTRATIONS: "manar_registrations_v1",
    BOOKMARKS: "manar_bookmarks_v1",
    NOTES: "manar_notes_v1",
    QUIZ_RESULTS: "manar_quiz_results_v1",
    CURRENT_USER: "manar_user_profile_v1"
  };

  // ذاكرة احتياطية في حال تعطل LocalStorage
  var memoryStore = {};

  function isStorageAvailable() {
    try {
      var test = "__test__";
      window.localStorage.setItem(test, test);
      window.localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  var hasLocalStorage = isStorageAvailable();

  function getItem(key, defaultValue) {
    if (hasLocalStorage) {
      try {
        var raw = window.localStorage.getItem(key);
        return raw ? JSON.parse(raw) : defaultValue;
      } catch (e) {
        console.warn("Storage parse error:", e);
        return defaultValue;
      }
    }
    return memoryStore[key] !== undefined ? memoryStore[key] : defaultValue;
  }

  function setItem(key, value) {
    if (hasLocalStorage) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
        console.warn("Storage write error:", e);
      }
    }
    memoryStore[key] = value;
  }

  // الحجوزات الأولية التوضيحية عند أول تشغيل
  function getInitialBookings() {
    return [
      {
        id: "BK-1021",
        teacherId: "tch-01",
        teacherName: "أ. عبد الرحمن السعيد",
        teacherAvatarBg: "#2B4C7E",
        subject: "الرياضيات والقدرات",
        mode: "in_person_home",
        modeLabel: "حضوري - منزل الطالب",
        location: "حي الملقا - شارع وادي حنيفة",
        day: "الأحد القادم",
        timeSlot: "04:30 مساءً - 06:00 مساءً",
        studentName: "سعد بن خالد",
        studentGrade: "الصف الثاني الثانوي",
        phone: "0551234567",
        hourlyRate: 110,
        status: "مؤكد",
        createdAt: "2026-09-04T16:00:00.000Z"
      },
      {
        id: "BK-1022",
        teacherId: "tch-02",
        teacherName: "د. سارة المنصور",
        teacherAvatarBg: "#3B6978",
        subject: "الفيزياء والعلوم",
        mode: "online",
        modeLabel: "أونلاين (قاعة افتراضية مدمجة)",
        location: "رابط القاعة التفاعلية المباشرة",
        day: "الأربعاء القادم",
        timeSlot: "05:00 مساءً - 06:30 مساءً",
        studentName: "سعد بن خالد",
        studentGrade: "الصف الثاني الثانوي",
        phone: "0551234567",
        hourlyRate: 125,
        status: "مؤكد",
        createdAt: "2026-09-05T18:20:00.000Z"
      }
    ];
  }

  function getInitialRegistrations() {
    return [
      {
        id: "REG-8034",
        courseId: "crs-01",
        courseTitle: "معسكر التفوق الشامل في الرياضيات والقدرات الكمية",
        schoolName: "مدارس النور الأهلية النموذجية",
        teacherName: "أ. عبد الرحمن السعيد",
        price: 280,
        studentName: "سعد بن خالد",
        phone: "0551234567",
        format: "مدمج (جلسات أونلاين + لقاءات تدريبية)",
        registeredAt: "2026-09-05T12:00:00.000Z",
        status: "مسجل ونشط"
      }
    ];
  }

  return {
    // 1. الحجوزات
    getBookings: function() {
      var bookings = getItem(STORAGE_KEYS.BOOKINGS, null);
      if (!bookings) {
        bookings = getInitialBookings();
        setItem(STORAGE_KEYS.BOOKINGS, bookings);
      }
      return bookings;
    },
    addBooking: function(bookingData) {
      var bookings = this.getBookings();
      var idNum = Math.floor(1000 + Math.random() * 9000);
      var newBooking = Object.assign({
        id: "BK-" + idNum,
        createdAt: new Date().toISOString(),
        status: "مؤكد"
      }, bookingData);

      bookings.unshift(newBooking);
      setItem(STORAGE_KEYS.BOOKINGS, bookings);
      return newBooking;
    },
    cancelBooking: function(bookingId) {
      var bookings = this.getBookings();
      bookings = bookings.filter(function(b) {
        return b.id !== bookingId;
      });
      setItem(STORAGE_KEYS.BOOKINGS, bookings);
      return bookings;
    },

    // 2. تسجيل الدورات المدرسية
    getRegistrations: function() {
      var regs = getItem(STORAGE_KEYS.REGISTRATIONS, null);
      if (!regs) {
        regs = getInitialRegistrations();
        setItem(STORAGE_KEYS.REGISTRATIONS, regs);
      }
      return regs;
    },
    addRegistration: function(regData) {
      var regs = this.getRegistrations();
      var idNum = Math.floor(1000 + Math.random() * 9000);
      var newReg = Object.assign({
        id: "REG-" + idNum,
        registeredAt: new Date().toISOString(),
        status: "مسجل ونشط"
      }, regData);

      regs.unshift(newReg);
      setItem(STORAGE_KEYS.REGISTRATIONS, regs);
      return newReg;
    },

    // 3. الملاحظات (Notes)
    getNotes: function(contextId) {
      var notes = getItem(STORAGE_KEYS.NOTES, {});
      return notes[contextId] || "";
    },
    saveNote: function(contextId, text) {
      var notes = getItem(STORAGE_KEYS.NOTES, {});
      notes[contextId] = text;
      setItem(STORAGE_KEYS.NOTES, notes);
      return true;
    },

    // 4. المفضلة (Bookmarks)
    getBookmarks: function() {
      return getItem(STORAGE_KEYS.BOOKMARKS, ["bk-01", "les-01"]);
    },
    isBookmarked: function(id) {
      var list = this.getBookmarks();
      return list.indexOf(id) !== -1;
    },
    toggleBookmark: function(id) {
      var list = this.getBookmarks();
      var idx = list.indexOf(id);
      if (idx !== -1) {
        list.splice(idx, 1);
      } else {
        list.push(id);
      }
      setItem(STORAGE_KEYS.BOOKMARKS, list);
      return list.indexOf(id) !== -1;
    },

    // 5. نتائج الاختبارات
    saveQuizResult: function(quizId, score) {
      var results = getItem(STORAGE_KEYS.QUIZ_RESULTS, {});
      results[quizId] = {
        score: score,
        updatedAt: new Date().toISOString()
      };
      setItem(STORAGE_KEYS.QUIZ_RESULTS, results);
    },
    getQuizResults: function() {
      return getItem(STORAGE_KEYS.QUIZ_RESULTS, {});
    },

    // 6. ملف الطالب
    getUserProfile: function() {
      return getItem(STORAGE_KEYS.CURRENT_USER, {
        name: "سعد بن خالد التميمي",
        grade: "الصف الثاني الثانوي (مسار علمي)",
        city: "الرياض",
        school: "مدارس النور الأهلية",
        email: "saad.khalid@example.com",
        phone: "0551234567"
      });
    },
    updateUserProfile: function(data) {
      var current = this.getUserProfile();
      var updated = Object.assign({}, current, data);
      setItem(STORAGE_KEYS.CURRENT_USER, updated);
      return updated;
    }
  };
})();
