/* ============================================================
   SOTUV SKRIPTI — ASOSIY JAVASCRIPT
   Barcha funksiyalar: accordion, qidiruv, qadam navigatsiyasi
   ============================================================ */

/* ===== 1. ACCORDION TOGGLE (tuzatilgan) ===== */
document.querySelectorAll('.acc').forEach(acc => {
  const head = acc.querySelector('.acc-head');
  const body = acc.querySelector('.acc-body');

  // Boshlang'ich holat: agar 'open' klassi bo'lsa ochiq, aks holda yopiq
  if (acc.classList.contains('open')) {
    body.style.maxHeight = body.scrollHeight + 'px';
  } else {
    body.style.maxHeight = '0px';
  }

  // Toggle bosilganda
  head.addEventListener('click', () => {
    acc.classList.toggle('open');

    if (acc.classList.contains('open')) {
      // Ochish: scrollHeight ni o'lchab, o'sha balandlikka o'rnatamiz
      body.style.maxHeight = body.scrollHeight + 'px';
    } else {
      // Yopish: balandlikni 0 ga tushiramiz
      body.style.maxHeight = '0px';
    }
  });
});

/* ===== 2. QIDIRUV (savol-javob sahifasi uchun) ===== */
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const q = this.value.toLowerCase().trim();

    document.querySelectorAll('.acc').forEach(acc => {
      const text = acc.textContent.toLowerCase();
      const visible = q === '' || text.includes(q);
      acc.style.display = visible ? '' : 'none';

      // Agar qidiruv natijasida ochilgan bo'lsa, balandlikni qayta hisoblash
      const body = acc.querySelector('.acc-body');
      if (visible && acc.classList.contains('open')) {
        body.style.maxHeight = body.scrollHeight + 'px';
      }
    });
  });
}

/* ===== 3. QADAM NAVIGATSIYASI (Malikalar & Business sahifalari) ===== */
let currentStep = 0;
const steps = document.querySelectorAll('.step-section');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const stepLabel = document.getElementById('stepLabel');

function showStep(index) {
  if (!steps.length) return;
  steps.forEach((s, i) => {
    s.style.display = i === index ? 'block' : 'none';
  });

  if (stepLabel) {
    stepLabel.textContent = `Qadam ${index + 1} / ${steps.length}`;
  }
  if (btnPrev) btnPrev.disabled = index === 0;
  if (btnNext) btnNext.disabled = index === steps.length - 1;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

if (steps.length) {
  showStep(0);

  if (btnPrev) {
    btnPrev.addEventListener('click', () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  }

  if (btnNext) {
    btnNext.addEventListener('click', () => {
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  }

  // Sidebar yoki tezkor qadam havolalari uchun
  document.querySelectorAll('[data-step]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(link.dataset.step);
      if (!isNaN(idx)) {
        currentStep = idx;
        showStep(idx);
      }
    });
  });
}

/* ===== 4. SILLIQ SCROLL (anchor havolalar uchun) ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
