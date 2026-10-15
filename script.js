/* ===== ACCORDION TOGGLE ===== */
document.querySelectorAll('.acc-head').forEach(btn => {
  btn.addEventListener('click', () => {
    const acc = btn.parentElement;
    acc.classList.toggle('open');
  });
});

/* ===== OPEN FIRST ACCORDION BY DEFAULT (optional) ===== */
document.addEventListener('DOMContentLoaded', () => {
  const first = document.querySelector('.acc');
  if (first) first.classList.add('open');
});

/* ===== SEARCH ON SAVOL-JAVOB PAGE ===== */
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const q = this.value.toLowerCase().trim();
    document.querySelectorAll('.acc').forEach(acc => {
      const text = acc.textContent.toLowerCase();
      acc.style.display = q === '' || text.includes(q) ? '' : 'none';
    });
  });
}

/* ===== STEP NAVIGATION (Malikalar & Business pages) ===== */
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
  if (btnPrev) btnPrev.addEventListener('click', () => {
    if (currentStep > 0) { currentStep--; showStep(currentStep); }
  });
  if (btnNext) btnNext.addEventListener('click', () => {
    if (currentStep < steps.length - 1) { currentStep++; showStep(currentStep); }
  });

  // Sidebar step links (if any)
  document.querySelectorAll('[data-step]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const idx = parseInt(link.dataset.step);
      if (!isNaN(idx)) { currentStep = idx; showStep(idx); }
    });
  });
}

/* ===== SMOOTH SCROLL FOR ANCHORS ===== */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
