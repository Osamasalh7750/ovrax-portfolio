/**
 * NetworkArchitect Hub - Enterprise Troubleshooting & Incident Lab
 * Provides interactive step-by-step diagnostic workflows for real-world outages.
 */

const Troubleshooter = {
  scenarios: [
    {
      id: "no-internet",
      title: "السيناريو 1: المستخدم متصل بالواي فاي ولكن 'لا يوجد إنترنت'",
      difficulty: "متوسط",
      symptom: "حواسيب قسم المحاسبة متصلة بشبكة الواي فاي بعلامة تعجب صفراء، والمتصفح يعرض 'No Internet Connection'.",
      steps: [
        {
          stepNum: 1,
          name: "فحص كارت الشبكة والبروتوكول المحلي (Ping Loopback)",
          cmd: "ping 127.0.0.1",
          output: "Reply from 127.0.0.1: bytes=32 time<1ms TTL=128 (سليم 100%)",
          verdict: "مكدس بروتوكولات TCP/IP في نظام التشغيل يعمل بدون أي تلف في ملفات النظام.",
          status: "success"
        },
        {
          stepNum: 2,
          name: "فحص العنوان المستلم من خادم الـ DHCP (ipconfig /all)",
          cmd: "ipconfig /all",
          output: "IPv4: 10.10.30.145 | Subnet: 255.255.254.0 | Default Gateway: 10.10.30.1 | DNS: 10.10.10.1",
          verdict: "الجهاز حصل على عنوان صحيح داخل نطاق VLAN 30 والبوابة موجهة لراوتر ميكروتك.",
          status: "success"
        },
        {
          stepNum: 3,
          name: "فحص الوصول إلى بوابة الميكروتك (Ping Default Gateway)",
          cmd: "ping 10.10.30.1",
          output: "Reply from 10.10.30.1: bytes=32 time=1ms TTL=64 (سليم 100%)",
          verdict: "الاتصال اللاسلكي والسويتش الداخلي سليم تماماً والراوتر يستجيب للحزم.",
          status: "success"
        },
        {
          stepNum: 4,
          name: "فحص مسار الخروج للإنترنت المباشر (Ping Public IP)",
          cmd: "ping 8.8.8.8",
          output: "Request timed out. Request timed out. (فشل الاتصال!)",
          verdict: "الحزم تصل للراوتر ولكنها لا تخرج إلى الإنترنت العالمي! المشكلة إما في الـ NAT أو خط المزود WAN.",
          status: "danger"
        },
        {
          stepNum: 5,
          name: "التشخيص الجذري والعلاج في راوتر ميكروتك (Root Cause & Fix)",
          cmd: "/ip firewall nat print",
          output: "قاعدة NAT Masquerade كانت محددة بـ out-interface=ether1 القديم بعد ترقية الخط إلى sfp-sfpplus1 10G!",
          verdict: "الحل: تعديل الواجهة الخارجة في قاعدة الـ NAT لتكون out-interface-list=WAN، فور تطبيق الأمر عاد الإنترنت لجميع الحواسيب!",
          status: "resolved"
        }
      ]
    },
    {
      id: "peak-speed-drop",
      title: "السيناريو 2: هبوط حاد للسرعة وتقطيع الرابط اللاسلكي وقت الذروة",
      difficulty: "متقدم",
      symptom: "المستودع المركزي يشكو من بطء شديد في نظام الباركود وهبوط سرعة الرابط من 250Mbps إلى 8Mbps بين الساعة 1 ظهراً و 4 عصراً.",
      steps: [
        {
          stepNum: 1,
          name: "فحص معالج راوتر ميكروتك المركزي (CPU Load)",
          cmd: "/system resource cpu print",
          output: "cpu-load: 12% (المعالج مرتاح جداً ولا يوجد اختناق في الراوتر)",
          verdict: "المشكلة ليست في المعالجة أو قواعد جدار الحماية.",
          status: "success"
        },
        {
          stepNum: 2,
          name: "فحص استهلاك خط الفايبر الخارجي (WAN Utilization)",
          cmd: "/interface monitor-traffic sfp-sfpplus1",
          output: "rx-bits-per-second: 85 Mbps (من أصل 200 Mbps)",
          verdict: "خط الإنترنت به سعة فائضة ولا يوجد استهلاك كامل للباندويث.",
          status: "success"
        },
        {
          stepNum: 3,
          name: "فحص مؤشرات هوائي الربط اللاسلكي airOS في برج المستودع",
          cmd: "airOS Dashboard Inspection",
          output: "Signal: -68 dBm | Noise Floor: -84 dBm (ارتفاع هائل في الضجيج!) | Transmit CCQ: 58% (سقوط كارثي)",
          verdict: "مؤشر CCQ سقط إلى 58% مما يعني أن 42% من الحزم اللاسلكية تتلف ويتم إعادة إرسالها بسبب تداخل راديوي خارجي!",
          status: "danger"
        },
        {
          stepNum: 4,
          name: "العلاج الهندسي النهائي (RF Spectrum Re-allocation)",
          cmd: "airView & Frequency Shift",
          output: "تشغيل أداة airView أظهر وجود برج مجاور يبث على تردد 5785MHz بقوة عالية. تم نقل تردد الرابط إلى قناة DFS نظيفة 5500MHz مع تقليل عرض القناة من 80MHz إلى 40MHz.",
          verdict: "النتيجة: ارتفع الـ CCQ إلى 99.6% وانخفض الضجيج إلى -98 dBm وعادت السرعة إلى 260 Mbps ثابتة!",
          status: "resolved"
        }
      ]
    },
    {
      id: "rogue-dhcp",
      title: "السيناريو 3: تعارض عناوين الـ IP ودخول راوتر منزلي دخيل (Rogue DHCP)",
      difficulty: "خبير",
      symptom: "انقطاع عشوائي عن بعض الموظفين وظهور عناوين غريبة مثل 192.168.1.100 بدلاً من نطاق الشركة 10.10.30.x.",
      steps: [
        {
          stepNum: 1,
          name: "فحص تفاصيل عنوان الموظف المتضرر (ipconfig /all)",
          cmd: "ipconfig /all",
          output: "IPv4: 192.168.1.105 | Gateway: 192.168.1.1 | DHCP Server: 192.168.1.1",
          verdict: "الجهاز يتلقى عناوين من خادم DHCP غير تابع للشركة إطلاقاً!",
          status: "danger"
        },
        {
          stepNum: 2,
          name: "تعقب عنوان الماك لخادم الـ DHCP الدخيل عبر ARP",
          cmd: "arp -a 192.168.1.1",
          output: "192.168.1.1  00-31-92-XX-XX-XX  dynamic (Vendor: TP-Link Home Router)",
          verdict: "أحد الموظفين أحضر راوتر واي فاي منزلي ووصله في مقبس الجدار بمكتب المبيعات!",
          status: "danger"
        },
        {
          stepNum: 3,
          name: "الحل الإسعافي والوقاية الدائمة عبر السويتش المركزي (DHCP Snooping)",
          cmd: "MikroTik CRS328 Configuration",
          output: "1. فصل منفذ السويتش ether8 فوراً لعزل الراوتر المنزلي.\n2. تفعيل ميزة DHCP Snooping في السويتش المركزي وتعيين منفذ الميكروتك فقط كـ Trusted Port وحظر أي عروض DHCP من باقي المنافذ نهائياً.",
          verdict: "تم استئصال المشكلة وحماية الشبكة المؤسسية للأبد من تكرار هذا الخطأ.",
          status: "resolved"
        }
      ]
    }
  ],

  renderLab(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = `
      <div class="troubleshoot-lab-wrapper">
        <div class="lab-header mb-6">
          <h2 class="text-xl font-bold text-white mb-2">مختبر معالجة الأزمات واستكشاف الأعطال الميدانية</h2>
          <p class="text-sm text-slate-300">محاكاة تفاعلية لحل أشهر 3 أعطال حقيقية تواجه مهندسي الشبكات في المنشآت العملاقة</p>
        </div>

        <div class="scenarios-list space-y-6">
          ${this.scenarios.map((sc, idx) => `
            <div class="scenario-card p-5 sm:p-6 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-xl hover:border-cyan-500/40 transition-all">
              <div class="flex justify-between items-start flex-wrap gap-3 mb-3">
                <div>
                  <div class="flex items-center gap-2 mb-1.5">
                    <span class="inline-block px-2.5 py-0.5 text-3xs rounded-full font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">مستوى الصعوبة: ${sc.difficulty}</span>
                    <span class="text-3xs text-slate-400 font-mono">Incident #0${idx + 1}</span>
                  </div>
                  <h3 class="text-base font-bold text-white">${sc.title}</h3>
                </div>
                
                <!-- Aligned Action Buttons Group -->
                <div class="flex items-center gap-2 flex-wrap">
                  <button class="h-9 px-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700/90 flex items-center gap-2 shadow-sm" onclick="Troubleshooter.toggleScenario('${sc.id}')" id="toggle-btn-${sc.id}">
                    <span>خطوات الفحص</span>
                    <span class="text-3xs text-cyan-400 transition-transform duration-200" id="arrow-${sc.id}">▼</span>
                  </button>
                  <button class="h-9 px-3.5 bg-emerald-950/80 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-emerald-700/80 flex items-center gap-1.5 shadow-sm" onclick="Troubleshooter.showFix('${sc.id}')">
                    <span>⚡</span> تطبيق الحل الجذري
                  </button>
                </div>
              </div>

              <div class="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl mb-4 text-xs text-amber-200">
                <strong>الأعراض المشاهدة بالموقع:</strong> ${sc.symptom}
              </div>

              <!-- Step-by-Step Flow -->
              <div id="steps-${sc.id}" class="steps-flow space-y-3 pt-3 border-t border-slate-800">
                ${sc.steps.map(step => `
                  <div class="step-item p-3.5 rounded-xl bg-slate-950 border ${step.status === 'danger' ? 'border-rose-900/60 shadow-md shadow-rose-950/20' : (step.status === 'resolved' ? 'border-emerald-700/60 bg-emerald-950/20 shadow-md shadow-emerald-950/20' : 'border-slate-800')}">
                    <div class="flex items-center justify-between mb-1.5">
                      <span class="text-xs font-bold ${step.status === 'resolved' ? 'text-emerald-400' : 'text-slate-200'}">
                        الخطوة ${step.stepNum}: ${step.name}
                      </span>
                      <span class="text-3xs font-mono px-2 py-0.5 rounded ${step.status === 'danger' ? 'bg-rose-950 text-rose-300 border border-rose-800' : (step.status === 'resolved' ? 'bg-emerald-900 text-emerald-300 border border-emerald-700' : 'bg-slate-800 text-slate-300')}">
                        ${step.status === 'resolved' ? 'تم الحل بنجاح ✓' : (step.status === 'danger' ? 'نقطة الخلل ⚠' : 'سليم')}
                      </span>
                    </div>
                    <div class="font-mono text-xs bg-black/70 p-2.5 rounded-lg text-cyan-300 my-1.5 direction-ltr text-left border border-slate-800/80">
                      <span class="text-slate-400">$ </span>${step.cmd}
                      <div class="text-slate-300 text-2xs mt-1 whitespace-pre-wrap">${step.output}</div>
                    </div>
                    <p class="text-xs text-slate-300 mt-1"><strong>الاستنتاج الهندسي:</strong> ${step.verdict}</p>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  },

  toggleScenario(id) {
    const el = document.getElementById(`steps-${id}`);
    const arrow = document.getElementById(`arrow-${id}`);
    if (el) {
      const isHidden = el.style.display === 'none';
      el.style.display = isHidden ? 'block' : 'none';
      if (arrow) {
        arrow.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(-90deg)';
      }
    }
  },

  showFix(id) {
    const el = document.getElementById(`steps-${id}`);
    if (el) {
      el.style.display = 'block';
      const arrow = document.getElementById(`arrow-${id}`);
      if (arrow) arrow.style.transform = 'rotate(0deg)';
      // Smooth scroll to the resolved step
      const resolved = el.querySelector('.border-emerald-700\\/60');
      if (resolved) {
        resolved.scrollIntoView({ behavior: 'smooth', block: 'center' });
        resolved.classList.add('ring-2', 'ring-emerald-400');
        setTimeout(() => resolved.classList.remove('ring-2', 'ring-emerald-400'), 2500);
      }
    }
  }
};
