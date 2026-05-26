/**
 * WOWOHCOOL — Main Script (Shared)
 *
 * Build:
 *   EN: esbuild main.src.js --bundle --minify --outfile=main.js           --define:LANG="\"en\""
 *   DE: esbuild main.src.js --bundle --minify --outfile=de/js/de-main.js  --define:LANG="\"de\""
 */

// ─── Language Configuration ──────────────────────────────────────────
// Overridden at build time via esbuild --define:LANG="\"de\""
const _ = typeof LANG !== "undefined" && LANG === "de"
  ? {
      redirectUrl: '/de/danke',
      sendingText: 'Wird gesendet...',
      successTitle: 'Vielen Dank!',
      successMsg: 'Ihre Anfrage wurde erfolgreich gesendet.<br>Wir antworten innerhalb von 24 Stunden.',
      redirectingText: 'Weiterleitung...',
      submitError: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
      networkError: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.',
            newInquiryPrefix: 'Neue Anfrage: ',
            generalInquiryText: 'Allgemeine Anfrage von der Website',
            locale: 'de-DE',
          }
        : {
      redirectUrl: '/thank-you',
      sendingText: 'Sending Inquiry...',
      successTitle: 'Thank You!',
      successMsg: 'Your inquiry has been sent successfully.<br>We will reply within 24 hours.',
      redirectingText: 'Redirecting...',
      submitError: 'Submission failed. Please try again.',
      networkError: 'Network error. Please check your connection and try again.',
      newInquiryPrefix: 'New Inquiry: ',
      generalInquiryText: 'General Inquiry from Website',
      locale: 'en-US',};

// ─── DOM Element References (cached) ────────────────────────────────

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
  return mobileMenuContent || (mobileMenuContent = document.getElementById('mobile-menu-content') || document.getElementById('mobile-menu'));
}

function getMobileMenuOverlay() {
  return mobileMenuOverlay || (mobileMenuOverlay = document.getElementById('mobile-menu-overlay'));
}

// ─── Focus Management ───────────────────────────────────────────────

function getFocusableElements(container) {
  if (!container) return [];
  const selectors = [
    'a[href]', 'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])', 'textarea:not([disabled])',
    'button:not([disabled])', 'iframe', 'object', 'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"])',
  ];
  return Array.from(container.querySelectorAll(selectors.join(',')))
    .filter(el => el.offsetWidth > 0 || el.offsetHeight > 0 || el === document.activeElement);
}

// ─── Back to Top ────────────────────────────────────────────────────

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

// ─── Inquiry Modal ──────────────────────────────────────────────────

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

  // Restore body scroll (with small delay for mobile browsers to settle)
  requestAnimationFrame(() => {
    document.body.style.overflow = '';
    document.documentElement.style.overflowX = '';
  });
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
    if (subjectInput) subjectInput.value = `${_.newInquiryPrefix}${product}`;
  } else {
    if (productSelect) productSelect.selectedIndex = 0;
    if (subjectInput) subjectInput.value = _.generalInquiryText;
  }
  lastFocusedElement = document.activeElement;
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modal.setAttribute('aria-hidden', 'false');

  // Lock body scroll while modal is open
  document.body.style.overflow = 'hidden';
  document.documentElement.style.overflowX = 'hidden';

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
// ─── Mobile Menu ────────────────────────────────────────────────────
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
// ─── Global Click Delegation ────────────────────────────────────────
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-action]');
  if (trigger) {
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
    return;
  }
});
// ─── Legacy Compat (mobile menu link close, modal backdrop) ───────
document.addEventListener('DOMContentLoaded', () => {
  // Close mobile menu when any link inside is clicked
  const mobileMenu = getMobileMenuContent();
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileMenu));
  }
  // Modal backdrop click
  const modal = getInquiryModal();
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
});
// ─── Global Keyboard Handler ────────────────────────────────────────
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
// ─── Scroll Reveal Animation ────────────────────────────────────────
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
// ─── Counter Animation ──────────────────────────────────────────────
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
          if (max >= 1000000) {
            el.innerText = (max / 1000000).toFixed(1).replace(/\.0$/, '') + 'M+';
          } else if (max >= 1000) {
            el.innerText = max.toLocaleString(_.locale || 'en-US') + '+';
          } else {
            el.innerText = max + '+';
          }
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

// ─── Desktop Dropdown Hover (DE compat) ─────────────────────────────

function initDropdownHover() {
  if (window.innerWidth <= 1023) return;
  document.querySelectorAll('.group').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const dc = el.querySelector('.dropdown-content');
      if (dc) {
        dc.style.opacity = '1';
        dc.style.visibility = 'visible';
        dc.style.transform = 'translateY(0)';
      }
    });
    el.addEventListener('mouseleave', () => {
      const dc = el.querySelector('.dropdown-content');
      if (dc) {
        dc.style.opacity = '0';
        dc.style.visibility = 'hidden';
        dc.style.transform = 'translateY(10px)';
      }
    });
  });
}

// ─── Marquee Clone (DE compat) ──────────────────────────────────────

function initMarquee() {
  const inner = document.querySelector('.cert-marquee-inner');
  if (inner) {
    const clone = inner.cloneNode(true);
    inner.parentNode.appendChild(clone);
  }
}

// ─── Form Error Display ─────────────────────────────────────────────

function showFormError(form, message) {
  const existing = form.querySelector('.form-error-msg');
  if (existing) existing.remove();

  const errorEl = document.createElement('div');
  errorEl.className = 'form-error-msg bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3 mb-4';
  errorEl.textContent = message;
  form.insertBefore(errorEl, form.firstChild);

  setTimeout(() => { errorEl.remove(); }, 8000);
}

// ─── DOM Ready ──────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  // Web3Forms submission handling
  document.querySelectorAll('form[action*="web3forms.com/submit"]').forEach(form => {
    if (form.dataset.submitReady) return;
    form.dataset.submitReady = 'true';

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      if (!submitBtn || submitBtn.disabled) return;

      const redirectEl = form.querySelector('input[name="redirect"]');
      const redirectUrl = redirectEl?.value || _.redirectUrl;
      const originalText = submitBtn.textContent.trim();

      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
      submitBtn.textContent = _.sendingText;

      try {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          signal: controller.signal,
        });
        clearTimeout(timeout);
        const result = await response.json();

        if (result.success) {
          form.reset();

          const successEl = document.createElement('div');
          successEl.className = 'text-center py-8';
          successEl.innerHTML = `
            <div class="text-5xl mb-4">&#10004;</div>
            <h3 class="text-xl font-bold text-green-600 mb-2">${_.successTitle}</h3>
            <p class="text-slate-500">${_.successMsg}</p>
            <p class="text-xs text-slate-400 mt-4">${_.redirectingText}</p>
          `;
          form.innerHTML = '';
          form.appendChild(successEl);

          setTimeout(() => { window.location.href = redirectUrl; }, 2500);
        } else {
          submitBtn.disabled = false;
          submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
          submitBtn.textContent = originalText;
          showFormError(form, result.message || _.submitError);
        }
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        submitBtn.textContent = originalText;
        console.error('Form submission error:', err);
        showFormError(form, _.networkError);
      }
    });
  });

  // Scroll reveal
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Counter animation
  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  // UTM parameter capture
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

  // Desktop dropdown hover
  initDropdownHover();

  // Marquee clone (DE)
  initMarquee();

  // Initial back to top state
  updateBackToTop();

  // Cookie consent handled by static template (cookie-banner.njk)
});
