/**
 * WOWOHCOOL — Main Script
 * Source file. Build with: npm run build
 * This compiles to main.js (minified).
 */

// ─── Google Analytics 4 (runs before DOMContentLoaded) ──────────────────────

window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-88920CDSFH');

// ─── DOM Element References (cached) ────────────────────────────────────────

let inquiryModal = null;
let mainContent = null;
let mobileMenuContent = null;
let mobileMenuOverlay = null;

function getInquiryModal() {
  return inquiryModal || (inquiryModal = document.getElementById('inquiryModal'));
}

function getMainContent() {
  return mainContent || (mainContent = document.getElementById('main-content') || document.querySelector('main'));
}

function getMobileMenuContent() {
  return mobileMenuContent || (mobileMenuContent = document.getElementById('mobile-menu-content'));
}

function getMobileMenuOverlay() {
  return mobileMenuOverlay || (mobileMenuOverlay = document.getElementById('mobile-menu-overlay'));
}

// ─── Focus Management ───────────────────────────────────────────────────────

function getFocusableElements(container) {
  if (!container) return [];
  const selectors = [
    'a[href]', 'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])', 'textarea:not([disabled])',
    'button:not([disabled])', 'iframe', 'object', 'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"])'
  ];
  return Array.from(container.querySelectorAll(selectors.join(',')))
    .filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
}

// ─── Back to Top ────────────────────────────────────────────────────────────

function updateBackToTop() {
  const btn = document.getElementById('backToTop');
  if (btn) {
    btn.classList.toggle('show', window.scrollY > 600);
  }
}

let scrollPending = false;
window.addEventListener('scroll', () => {
  if (!scrollPending) {
    scrollPending = true;
    requestAnimationFrame(() => {
      updateBackToTop();
      scrollPending = false;
    });
  }
}, { passive: true });

// ─── Inquiry Modal ──────────────────────────────────────────────────────────

let lastFocusedElement = null;
let modalKeydownHandler = null;

function closeModal() {
  const modal = getInquiryModal();
  const content = getMainContent();
  if (!modal) return;

  modal.classList.add('hidden');
  modal.classList.remove('flex');
  modal.setAttribute('aria-hidden', 'true');

  if (content) {
    content.removeAttribute('aria-hidden');
    if ('inert' in HTMLElement.prototype) {
      content.inert = false;
    } else {
      content.querySelectorAll('[data-inert-fallback]').forEach(el => {
        const tabindex = el.getAttribute('data-inert-fallback');
        tabindex ? el.setAttribute('tabindex', tabindex) : el.removeAttribute('tabindex');
        el.removeAttribute('data-inert-fallback');
      });
    }
  }

  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }

  if (modalKeydownHandler) {
    document.removeEventListener('keydown', modalKeydownHandler, true);
    modalKeydownHandler = null;
  }
}

function openModal(product = '') {
  const modal = getInquiryModal();
  const content = getMainContent();
  if (!modal) return;

  const productSelect = modal.querySelector('#productSelect');
  const subjectInput = modal.querySelector('input[name="subject"]');

  if (productSelect && product) {
    const search = product.trim().toLowerCase();
    for (let i = 0; i < productSelect.options.length; i++) {
      const opt = productSelect.options[i];
      if (opt.value.toLowerCase().includes(search) || opt.text.toLowerCase().includes(search)) {
        productSelect.selectedIndex = i;
        break;
      }
    }
    if (subjectInput) subjectInput.value = `New Inquiry: ${product}`;
  } else {
    if (productSelect) productSelect.selectedIndex = 0;
    if (subjectInput) subjectInput.value = 'General Inquiry from Website';
  }

  lastFocusedElement = document.activeElement;

  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modal.setAttribute('aria-hidden', 'false');

  if (content) {
    content.setAttribute('aria-hidden', 'true');
    if ('inert' in HTMLElement.prototype) {
      content.inert = true;
    } else {
      getFocusableElements(content).forEach(el => {
        if (!el.hasAttribute('data-inert-fallback')) {
          el.setAttribute('data-inert-fallback', el.getAttribute('tabindex') || '');
          el.setAttribute('tabindex', '-1');
        }
      });
    }
  }

  const focusable = getFocusableElements(modal);
  if (focusable.length) {
    focusable[0].focus();
  } else {
    modal.focus();
  }

  modalKeydownHandler = function (e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key === 'Tab') {
      const focusable = getFocusableElements(modal);
      if (!focusable.length) {
        e.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
  };
  document.addEventListener('keydown', modalKeydownHandler, true);
}

// ─── Mobile Menu ────────────────────────────────────────────────────────────

function isMobileMenuOpen() {
  const menu = getMobileMenuContent();
  return !!menu && !menu.classList.contains('translate-x-full');
}

function closeMobileMenu() {
  const overlay = getMobileMenuOverlay();
  const menu = getMobileMenuContent();

  if (document.activeElement && menu && menu.contains(document.activeElement)) {
    document.activeElement.blur();
  }

  if (overlay) {
    overlay.classList.add('opacity-0', 'pointer-events-none');
    overlay.setAttribute('aria-hidden', 'true');
  }

  if (menu) {
    menu.classList.add('translate-x-full');
    menu.setAttribute('aria-hidden', 'true');
  }

  document.body.style.overflow = '';
}

function openMobileMenu() {
  const overlay = getMobileMenuOverlay();
  const menu = getMobileMenuContent();

  if (overlay) {
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    overlay.setAttribute('aria-hidden', 'false');
  }

  if (menu) {
    menu.classList.remove('translate-x-full');
    menu.setAttribute('aria-hidden', 'false');
  }

  document.body.style.overflow = 'hidden';
}

function toggleMobileMenu() {
  isMobileMenuOpen() ? closeMobileMenu() : openMobileMenu();
}

function toggleMobileSubmenu() {
  const submenu = document.getElementById('mobile-submenu');
  const icon = document.querySelector('.submenu-icon');
  if (!submenu) return;

  const links = submenu.querySelectorAll('a');

  if (submenu.classList.contains('open')) {
    submenu.classList.remove('open');
    submenu.setAttribute('aria-hidden', 'true');
    links.forEach(l => l.setAttribute('tabindex', '-1'));
    if (icon) icon.style.transform = 'rotate(0deg)';
  } else {
    submenu.classList.add('open');
    submenu.setAttribute('aria-hidden', 'false');
    links.forEach(l => l.removeAttribute('tabindex'));
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
}

// ─── Global Click Delegation ────────────────────────────────────────────────

document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-action]');
  if (!trigger) return;

  const actions = (trigger.getAttribute('data-action') || '').split(/\s+/).filter(Boolean);
  const product = trigger.getAttribute('data-product') || '';

  actions.forEach(action => {
    switch (action) {
      case 'open-modal':          openModal(product); break;
      case 'close-modal':         closeModal(); break;
      case 'toggle-mobile-menu':  toggleMobileMenu(); break;
      case 'close-mobile':        closeMobileMenu(); break;
      case 'toggle-mobile-submenu': toggleMobileSubmenu(); break;
      case 'scroll-to-top':       window.scrollTo({ top: 0, behavior: 'smooth' }); break;
    }
  });
});

// ─── Global Keyboard Handler ────────────────────────────────────────────────

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('inquiryModal');
    if (modal && !modal.classList.contains('hidden')) {
      closeModal();
      return;
    }
    if (isMobileMenuOpen()) {
      closeMobileMenu();
    }
  }
});

// ─── Scroll Reveal Animation ────────────────────────────────────────────────

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -100px 0px' }
);

// ─── Counter Animation ──────────────────────────────────────────────────────

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.getAttribute('data-target'));
      const max = Number.isFinite(target) && target > 0 ? target : 0;

      if (max === 0) {
        el.innerText = '0+';
        counterObserver.unobserve(el);
        return;
      }

      const duration = 1800;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.ceil(progress * max);

        if (progress >= 1) {
          el.innerText = (max >= 1000 ? Math.round(max / 100) / 10 + 'k' : max) + '+';
        } else {
          el.innerText = current;
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.6 }
);

// ─── Form Error Display ─────────────────────────────────────────────────────

function showFormError(form, message) {
  const existing = form.querySelector('.form-error-msg');
  if (existing) existing.remove();

  const errorEl = document.createElement('div');
  errorEl.className = 'form-error-msg bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3 mb-4';
  errorEl.textContent = message;
  form.insertBefore(errorEl, form.firstChild);

  setTimeout(() => { errorEl.remove(); }, 8000);
}

// ─── DOM Ready ──────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Web3Forms submission handling
  document.querySelectorAll('form[action*="web3forms.com/submit"]').forEach(form => {
    if (form.dataset.submitReady) return;
    form.dataset.submitReady = 'true';

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      if (!submitBtn || submitBtn.disabled) return;

      const redirectUrl = form.querySelector('input[name="redirect"]')?.value || '/thank-you';
      const originalText = submitBtn.textContent.trim();

      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
      submitBtn.textContent = 'Sending Inquiry...';

      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await response.json();

        if (result.success) {
          form.reset();

          const successEl = document.createElement('div');
          successEl.className = 'text-center py-8';
          successEl.innerHTML = `
            <div class="text-5xl mb-4">&#10004;</div>
            <h3 class="text-xl font-bold text-green-600 mb-2">Thank You!</h3>
            <p class="text-slate-500">Your inquiry has been sent successfully.<br>We will reply within 24 hours.</p>
            <p class="text-xs text-slate-400 mt-4">Redirecting...</p>
          `;
          form.innerHTML = '';
          form.appendChild(successEl);

          setTimeout(() => { window.location.href = redirectUrl; }, 2500);
        } else {
          submitBtn.disabled = false;
          submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
          submitBtn.textContent = originalText;
          showFormError(form, result.message || 'Submission failed. Please try again.');
        }
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        submitBtn.textContent = originalText;
        console.error('Form submission error:', err);
        showFormError(form, 'Network error. Please check your connection and try again.');
      }
    });
  });

  // Observe reveal elements
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Observe counter elements
  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  // Capture UTM parameters into hidden form fields
  const params = new URLSearchParams(window.location.search);
  ['utm_source', 'utm_medium', 'utm_campaign'].forEach(k => {
    const v = params.get(k);
    if (v) {
      const el = document.getElementById(k);
      if (el) el.value = v;
    }
  });

  // Initialize mobile submenu: hide focusable links when closed
  const submenu = document.getElementById('mobile-submenu');
  if (submenu && submenu.getAttribute('aria-hidden') === 'true') {
    submenu.querySelectorAll('a').forEach(l => l.setAttribute('tabindex', '-1'));
  }

  // Initial back to top state
  updateBackToTop();
});
