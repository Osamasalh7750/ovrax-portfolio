/* ==========================================================================
   OVRAX AI CONSULTANT CHAT MODULE
   Natural Language Software Idea Analysis, Architecture Design & Specification Builder
   ========================================================================== */

let generatedProjectSpec = null;

function initAIConsultant() {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');
  const clearBtn = document.getElementById('clearChatBtn');
  const transferBtn = document.getElementById('transferToOrderBtn');
  const promptChips = document.querySelectorAll('.prompt-chip');

  if (!chatForm || !chatInput) return;

  // Prompt Chips Click
  promptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      chatInput.value = chip.getAttribute('data-prompt');
      chatInput.focus();
    });
  });

  // Clear Chat
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      chatMessages.innerHTML = `
        <div class="chat-message ai-message">
          <div class="msg-avatar"><i class="fas fa-brain"></i></div>
          <div class="msg-bubble">
            <div class="msg-header"><strong>المستشار الذكي (OVRAX AI)</strong> <span class="msg-time">الآن</span></div>
            <div class="msg-body">
              تم تفريغ المحادثة. اكتب لي أي فكرة لمشروع أو تطبيق أو نظام برمجية ترغب بإنشائه وسأقوم بتحليله فوراً!
            </div>
          </div>
        </div>
      `;
      resetSummary();
    });
  }

  // Submit Chat Form
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    // Append User Message
    appendMessage('user', query);
    chatInput.value = '';

    // Show Typing Indicator
    const typingElem = showTypingIndicator();

    // Analyze Idea & Generate Response
    setTimeout(() => {
      typingElem.remove();
      const analysis = analyzeSoftwareIdea(query);
      appendMessage('ai', analysis.replyHtml);
      updateSpecSummary(analysis);
    }, 1200);
  });

  // Transfer Spec to Project Order Form
  if (transferBtn) {
    transferBtn.addEventListener('click', () => {
      if (!generatedProjectSpec) return;
      
      const orderForm = document.getElementById('projectOrderForm');
      const descInput = document.getElementById('projectDescription');
      
      if (descInput) {
        descInput.value = `[مواصفات مولدة عبر مستشار الذكاء الاصطناعي لـ OVRAX]:\n` +
          `• عنوان الفكرة: ${generatedProjectSpec.title}\n` +
          `• المعمارية المقترحة: ${generatedProjectSpec.architecture}\n` +
          `• الميزات الأساسية: ${generatedProjectSpec.features.join(' - ')}\n` +
          `• التقنيات المقترحة: ${generatedProjectSpec.techStack}\n` +
          `• التقدير المقترح: ${generatedProjectSpec.timeline} (${generatedProjectSpec.estimatedCost})`;
      }

      // Scroll smoothly to order form
      const orderSection = document.getElementById('custom-order');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth' });
        if (typeof showToast === 'function') {
          showToast("تم تحويل مواصفات المشروع بنجاح إلى نموذج الطلب!", "success");
        }
      }
    });
  }
}

function appendMessage(sender, htmlContent) {
  const container = document.getElementById('chatMessages');
  if (!container) return;

  const msgDiv = document.createElement('div');
  msgDiv.className = `chat-message ${sender}-message`;

  const avatar = sender === 'ai' 
    ? `<div class="msg-avatar"><i class="fas fa-brain"></i></div>` 
    : `<div class="msg-avatar"><i class="fas fa-user"></i></div>`;

  const headerTitle = sender === 'ai' ? 'المستشار الذكي (OVRAX AI)' : 'أنت';
  const now = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

  msgDiv.innerHTML = `
    ${avatar}
    <div class="msg-bubble">
      <div class="msg-header"><strong>${headerTitle}</strong> <span class="msg-time">${now}</span></div>
      <div class="msg-body">${htmlContent}</div>
    </div>
  `;

  container.appendChild(msgDiv);
  container.scrollTop = container.scrollHeight;
}

function showTypingIndicator() {
  const container = document.getElementById('chatMessages');
  const typingDiv = document.createElement('div');
  typingDiv.className = 'chat-message ai-message typing-indicator-msg';
  typingDiv.innerHTML = `
    <div class="msg-avatar"><i class="fas fa-brain"></i></div>
    <div class="msg-bubble" style="color:var(--cyan-primary);">
      <i class="fas fa-spinner fa-spin"></i> جاري تحليل الفكرة وهندسة المعمارية البرمجية المناسبة...
    </div>
  `;
  container.appendChild(typingDiv);
  container.scrollTop = container.scrollHeight;
  return typingDiv;
}

// Heuristic Analysis Engine for Software Ideas
function analyzeSoftwareIdea(query) {
  const q = query.toLowerCase();
  let title = "مشروع برمجي مخصص";
  let architecture = "Full-Stack Microservices Architecture";
  let techStack = "React / Vue.js, Node.js / Python FastAPI, PostgreSQL, Redis";
  let features = [
    "واجهة مستخدم عصرية وسريعة الاستجابة",
    "لوحة تحكم إدارية شاملة لإدارة البيانات والمستخدمين",
    "تكامل بوابات الدفع الإلكتروني والـ APIs",
    "أمان وحماية متقدمة وتشفير البيانات"
  ];
  let timeline = "3 - 5 أسابيع";
  let estimatedCost = "$1,200 - $2,500";

  if (q.includes("تسويق") || q.includes("إعلان") || q.includes("ad") || q.includes("tiktok") || q.includes("meta")) {
    title = "منظومة أتمتة التسويق والحملات الإعلانية";
    architecture = "API Gateway & Automation Worker Pipeline";
    techStack = "Python FastAPI, Meta Graph API, TikTok Marketing API, Google Ads API, PostgreSQL";
    features = [
      "أتمتة إطلاق الإعلانات ومراقبة الميزانيات بدقة",
      "محرك ذكاء اصطناعي لتوليد النصوص الإعلانية والـ Hooks",
      "Webhooks لتتبع الـ Conversions وعائد الإنفاق ROAS",
      "تقارير دورية وإشعارات فورية عبر تيليجرام / واتساب"
    ];
    timeline = "2 - 4 أسابيع";
    estimatedCost = "$1,000 - $2,200";
  } else if (q.includes("ذكاء") || q.includes("ai") || q.includes("شات") || q.includes("بوت") || q.includes("chat") || q.includes("توليد")) {
    title = "منصة ذكاء اصطناعي ووكلاء حواريين (AI Agent / GenAI)";
    architecture = "RAG & LLM Agentic Architecture";
    techStack = "Python (LangChain / LlamaIndex), OpenAI / Gemini API, Vector DB (Qdrant/Pinecone), Next.js";
    features = [
      "وكيل ذكي مدرب على مستندات وقواعد بيانات شركتك (RAG)",
      "توليد المحتوى والوسائط من النصوص المباشرة",
      "ربط مع WhatsApp Business و Telegram والموقع",
      "لوحة تحليل لتقييم أداء المحادثات ورضا العملاء"
    ];
    timeline = "3 - 4 أسابيع";
    estimatedCost = "$1,400 - $2,800";
  } else if (q.includes("متجر") || q.includes("مخزون") || q.includes("pos") || q.includes("تجزئة") || q.includes("مطعم") || q.includes("مبيعات")) {
    title = "نظام متكامل لإدارة التجارة ونقاط البيع (Retail ERP & POS)";
    architecture = "Multi-Branch Cloud ERP Architecture";
    techStack = "Node.js / Express, React / Electron POS, MySQL / PostgreSQL, WebSockets";
    features = [
      "نقطة بيع POS متوافقة مع أجهزة الباركود والطابعات",
      "إدارة المخزون، الأصناف، الموردين وتنبيهات النواقص",
      "إدارة الفروع والمستخدمين وتقارير الأرباح والمبيعات",
      "إمكانية ربط متجر إلكتروني متزامن مع المستودع"
    ];
    timeline = "4 - 6 أسابيع";
    estimatedCost = "$1,500 - $3,200";
  } else if (q.includes("شبك") || q.includes("iot") || q.includes("حساس") || q.includes("مراقبة") || q.includes("سيرفر")) {
    title = "نظام مراقبة إنترنت الأشياء والشبكات السحابية (IoT Gateway)";
    architecture = "IoT MQTT Real-time Telemetry Pipeline";
    techStack = "C++ / MicroPython, MQTT Broker, Node.js WebSockets, InfluxDB, Grafana";
    features = [
      "جمع وقراءة البيانات الحيوية والتشغيلية في أجزاء من الثانية",
      "نظام تنبيهات طوارئ ذكي وفوري",
      "لوحة قيادة تفاعلية بالرسوم الحية (Live Real-time Charts)",
      "تخزين سحابي آمن وأرشفة كاملة للسجلات"
    ];
    timeline = "3 - 5 أسابيع";
    estimatedCost = "$1,100 - $2,400";
  }

  const replyHtml = `
    <strong>رائع جداً! تم تحليل فكرتك بنجاح:</strong>
    <p style="margin: 8px 0; color:#e2e8f0;">${query}</p>
    
    <div style="background:rgba(0,229,255,0.06); border:1px solid var(--metal-border-cyan); border-radius:10px; padding:12px; margin:10px 0;">
      <div style="color:var(--cyan-primary); font-weight:700; margin-bottom:4px;"><i class="fas fa-layer-group"></i> المعمارية المقترحة:</div>
      <div style="font-size:0.85rem; color:#cbd5e1;">${architecture}</div>
    </div>

    <div style="margin:10px 0;">
      <strong style="color:var(--amber-primary);"><i class="fas fa-cogs"></i> الميزات الفنية المقترحة:</strong>
      <ul style="list-style:none; font-size:0.85rem; color:#cbd5e1; margin-top:6px;">
        ${features.map(f => `<li><i class="fas fa-check text-cyan"></i> ${f}</li>`).join('')}
      </ul>
    </div>

    <div style="display:flex; justify-content:space-between; font-size:0.82rem; color:var(--metal-muted); border-top:1px solid rgba(255,255,255,0.08); padding-top:8px;">
      <span><i class="fas fa-clock text-amber"></i> الإطار الزمني: <strong>${timeline}</strong></span>
      <span><i class="fas fa-tag text-cyan"></i> التقدير: <strong>${estimatedCost}</strong></span>
    </div>
  `;

  return {
    title,
    architecture,
    techStack,
    features,
    timeline,
    estimatedCost,
    replyHtml
  };
}

function updateSpecSummary(analysis) {
  generatedProjectSpec = analysis;

  const summaryBody = document.getElementById('summaryBody');
  const summaryFooter = document.getElementById('summaryFooter');

  if (!summaryBody) return;

  summaryBody.innerHTML = `
    <div class="spec-block">
      <div class="spec-title"><i class="fas fa-project-diagram"></i> اسم ونوع المشروع</div>
      <div class="spec-content" style="font-weight:700; color:#fff;">${analysis.title}</div>
    </div>

    <div class="spec-block">
      <div class="spec-title amber"><i class="fas fa-cubes"></i> المعمارية والتقنيات المقترحة</div>
      <div class="spec-content">${analysis.architecture}<br><span style="color:var(--cyan-primary); font-size:0.8rem;">Stack: ${analysis.techStack}</span></div>
    </div>

    <div class="spec-block">
      <div class="spec-title"><i class="fas fa-list-check"></i> الميزات الأساسية المعتمدة</div>
      <div class="spec-content">
        <ul style="list-style:none; padding:0;">
          ${analysis.features.map(f => `<li><i class="fas fa-check-circle text-cyan" style="font-size:0.75rem;"></i> ${f}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="spec-block">
      <div class="spec-title amber"><i class="fas fa-calculator"></i> التقدير المالي والزمني</div>
      <div class="spec-content" style="display:flex; justify-content:space-between;">
        <span>المدة: <strong style="color:#fff;">${analysis.timeline}</strong></span>
        <span>الميزانية: <strong style="color:var(--amber-primary); font-family:var(--font-cyber);">${analysis.estimatedCost}</strong></span>
      </div>
    </div>
  `;

  if (summaryFooter) summaryFooter.style.display = 'block';
}

function resetSummary() {
  generatedProjectSpec = null;
  const summaryBody = document.getElementById('summaryBody');
  const summaryFooter = document.getElementById('summaryFooter');
  if (summaryBody) {
    summaryBody.innerHTML = `
      <div class="summary-placeholder">
        <i class="fas fa-robot floating-icon"></i>
        <p>بمجرد أن تشرح فكرتك في المحادثة، سيظهر هنا المخطط الفني والتقدير المبدئي لمشروعك، وستتمكن من تحويله فوراً إلى طلب مشروع للمهندس أسامة!</p>
      </div>
    `;
  }
  if (summaryFooter) summaryFooter.style.display = 'none';
}

document.addEventListener('DOMContentLoaded', initAIConsultant);
