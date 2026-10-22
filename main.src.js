/**
 * WOWOHCOOL — Main Script (Shared)
 *
 * Build:
 *   npm run build:js
 *   scripts/build-js.js injects LANG and RESPONSE_TIME from src/_data/inquiry.json.
 */

// ─── Language Configuration ──────────────────────────────────────────
// LANG and RESPONSE_TIME are injected by scripts/build-js.js from source data.
const rt = typeof RESPONSE_TIME !== "undefined" ? RESPONSE_TIME : "the stated response time";

const _ = typeof LANG !== "undefined" && LANG === "de"
  ? {
      redirectUrl: '/de/danke',
      sendingText: 'Wird gesendet...',
      successTitle: 'Vielen Dank!',
      successMsg: `Ihre Anfrage wurde erfolgreich gesendet.<br>Wir antworten innerhalb von ${rt}.`,
      redirectingText: 'Weiterleitung...',
      submitError: 'Fehler beim Senden. Bitte versuchen Sie es erneut.',
      networkError: 'Netzwerkfehler. Bitte überprüfen Sie Ihre Verbindung.',
      newInquiryPrefix: 'Neue Anfrage: ',
      generalInquiryText: 'Allgemeine Anfrage von der Website',
      locale: 'de-DE',
    }
  : typeof LANG !== "undefined" && LANG === "es"
  ? {
      redirectUrl: '/es/gracias',
      sendingText: 'Enviando consulta...',
      successTitle: '¡Gracias!',
      successMsg: `Su consulta ha sido enviada correctamente.<br>Le responderemos en ${rt}.`,
      redirectingText: 'Redirigiendo...',
      submitError: 'Error al enviar. Por favor, inténtelo de nuevo.',
      networkError: 'Error de red. Por favor, verifique su conexión.',
      newInquiryPrefix: 'Nueva consulta: ',
      generalInquiryText: 'Consulta general desde el sitio web',
      locale: 'es-ES',
    }
  : typeof LANG !== "undefined" && LANG === "ru"
  ? {
      redirectUrl: '/ru/spasibo',
      sendingText: 'Отправляем запрос...',
      successTitle: 'Спасибо!',
      successMsg: `Ваш запрос успешно отправлен.<br>Мы ответим в течение ${rt}.`,
      redirectingText: 'Перенаправление...',
      submitError: 'Не удалось отправить. Пожалуйста, попробуйте ещё раз.',
      networkError: 'Ошибка сети. Проверьте подключение к интернету.',
      newInquiryPrefix: 'Новый запрос: ',
      generalInquiryText: 'Общий запрос с сайта',
      locale: 'ru-RU',
    }
  : typeof LANG !== "undefined" && LANG === "fr"
  ? {
      redirectUrl: '/fr/remerciements',
      sendingText: 'Envoi en cours...',
      successTitle: 'Merci !',
      successMsg: `Votre demande a bien été envoyée.<br>Nous vous répondrons sous ${rt}.`,
      redirectingText: 'Redirection...',
      submitError: 'Échec de l\'envoi. Veuillez réessayer.',
      networkError: 'Erreur réseau. Veuillez vérifier votre connexion.',
      newInquiryPrefix: 'Nouvelle demande : ',
      generalInquiryText: 'Demande générale depuis le site',
      locale: 'fr-FR',
    }
  : typeof LANG !== "undefined" && LANG === "pl"
  ? {
      redirectUrl: '/pl/dziekujemy',
      sendingText: 'Wysyłanie zapytania...',
      successTitle: 'Dziękujemy!',
      successMsg: `Twoje zapytanie zostało wysłane.<br>Odpowiemy w ciągu ${rt}.`,
      redirectingText: 'Przekierowywanie...',
      submitError: 'Nie udało się wysłać zapytania. Spróbuj ponownie.',
      networkError: 'Błąd sieci. Sprawdź połączenie i spróbuj ponownie.',
      newInquiryPrefix: 'Nowe zapytanie: ',
      generalInquiryText: 'Zapytanie ogólne ze strony',
      locale: 'pl-PL',
    }
  : {
      redirectUrl: '/thank-you',
      sendingText: 'Sending Inquiry...',
      successTitle: 'Thank You!',
      successMsg: `Your inquiry has been sent successfully.<br>We will reply within ${rt}.`,
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

// 浮动按钮（WhatsApp / 询盘）在移动端首屏会让位给正文：
// 先挂 .float-ready 打开「可隐藏」状态，滚动超过 400px 再 .is-visible 淡入。
// ⚠️ .float-ready 必须在 JS 里加，不能写进 CSS 默认态 —— 否则 JS 挂掉时按钮永久消失。
const floatWrap = document.querySelector('.float-wrap');
if (floatWrap) {
  floatWrap.classList.add('float-ready');
  const syncFloat = () => {
    floatWrap.classList.toggle('is-visible', window.scrollY > 400);
  };
  syncFloat();
  window.addEventListener('scroll', syncFloat, { passive: true });
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

// Map the current page URL to a product-category option value.
// Card buttons pass a concrete model (e.g. "WOP09 Semi-Solid 10000mAh"), which
// the modal's category dropdown cannot match by name. The page the user is on
// already tells us the category, so we resolve it from the path instead.
// Order matters: the most specific paths come first (car mounts that live under
// the wireless-charger tree are sold as Car Charger).
const CATEGORY_BY_PATH = [
  // wireless-charger car mounts: physically under wireless, sold as Car Charger
  [['/wireless-charger/car-mount', '/kabelloses-ladegeraet/auto-ladehalterung',
    '/cargador-inalambrico/soporte-coche', '/chargeur-sans-fil/support-voiture',
    '/ladowarka-bezprzewodowa/uchwyt-samochodowy', '/besprovodnye-zaryadki/avtoderzhatel'],
   'Car Charger OEM/ODM'],
  [['/products/car-charger', '/produkte/autoladegeraet', '/productos/cargador-coche',
    '/produits/chargeur-voiture', '/produkty/ladowarka-samochodowa',
    '/produkty/avtomobilnye-zaryadki'],
   'Car Charger OEM/ODM'],
  [['/products/gan-charger', '/produkte/gan-ladegeraet', '/productos/cargador-gan',
    '/produits/chargeur-gan', '/produkty/ladowarka-gan', '/produkty/gan-zaryadnye-ustroystva'],
   'GaN Charger OEM/ODM'],
  [['/products/power-bank', '/produkte/powerbank', '/productos/powerbank',
    '/produits/batterie-externe', '/produkty/power-bank', '/produkty/poverbanki'],
   'Power Bank OEM/ODM'],
  [['/products/wireless-charger', '/produkte/kabelloses-ladegeraet',
    '/productos/cargador-inalambrico', '/produits/chargeur-sans-fil',
    '/produkty/ladowarka-bezprzewodowa', '/produkty/besprovodnye-zaryadki'],
   'Wireless Charger OEM/ODM'],
];

function categoryFromPath(pathname) {
  const p = pathname || window.location.pathname;
  for (let i = 0; i < CATEGORY_BY_PATH.length; i++) {
    const paths = CATEGORY_BY_PATH[i][0];
    for (let j = 0; j < paths.length; j++) {
      if (p.indexOf(paths[j]) !== -1) return CATEGORY_BY_PATH[i][1];
    }
  }
  return null;
}

const TRACKING_STORAGE_KEY = 'wowohcool_tracking_v1';
const TRACKING_FIELDS = ['landing_page', 'referrer', 'utm_source', 'utm_campaign', 'product_category'];

function getProductCategory(scope) {
  const explicit = scope?.dataset?.productCategory || scope?.closest?.('[data-product-category]')?.getAttribute('data-product-category');
  if (explicit) return explicit;

  if (scope && scope.tagName === 'FORM') {
    const hidden = scope.querySelector('input[name="product_category"]');
    if (hidden && hidden.value.trim()) return hidden.value.trim();
    const selected = scope.querySelector('select[name="product"]');
    if (selected && selected.value) return selected.value;
    const product = scope.querySelector('input[name="product"]');
    if (product && product.value) return product.value;
  }

  return categoryFromPath() || '';
}

function getTrackingContext() {
  let stored = {};
  try {
    stored = JSON.parse(sessionStorage.getItem(TRACKING_STORAGE_KEY) || '{}') || {};
  } catch (err) {
    stored = {};
  }

  const params = new URLSearchParams(window.location.search);
  const context = {
    landing_page: stored.landing_page || window.location.href,
    referrer: stored.referrer || document.referrer || '',
    utm_source: params.get('utm_source') || stored.utm_source || '',
    utm_campaign: params.get('utm_campaign') || stored.utm_campaign || '',
    product_category: getProductCategory(document.body) || stored.product_category || '',
  };

  try {
    sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(context));
  } catch (err) {
    // Ignore storage failures (private mode, blocked storage, etc.).
  }
  return context;
}

function ensureHiddenInput(form, name, value = '') {
  let input = form.querySelector(`input[name="${name}"]`);
  if (!input) {
    input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    form.appendChild(input);
  }
  if (value || !input.value) input.value = value;
  return input;
}

function applyTrackingToForm(form) {
  const context = getTrackingContext();
  context.product_category = getProductCategory(form) || context.product_category || '';
  TRACKING_FIELDS.forEach(name => ensureHiddenInput(form, name, context[name] || ''));
}

function applyTrackingToForms(root = document) {
  root.querySelectorAll('form[action*="web3forms.com/submit"]').forEach(applyTrackingToForm);
}

function trackingLines(context) {
  return [
    `Landing page: ${context.landing_page || ''}`,
    `Referrer: ${context.referrer || ''}`,
    `UTM source: ${context.utm_source || ''}`,
    `UTM campaign: ${context.utm_campaign || ''}`,
    `Product category: ${context.product_category || ''}`,
  ];
}

function applyTrackingToLink(link) {
  const baseHref = link.dataset.baseHref || link.getAttribute('href') || '';
  if (!baseHref) return;
  link.dataset.baseHref = baseHref;

  const context = getTrackingContext();
  context.product_category = getProductCategory(link) || context.product_category || '';

  if (/^https:\/\/(?:www\.)?wa\.me\//i.test(baseHref) || /^https:\/\/api\.whatsapp\.com\//i.test(baseHref)) {
    const url = new URL(baseHref);
    const existing = url.searchParams.get('text') || '';
    const message = [existing, ...trackingLines(context)].filter(Boolean).join('\n');
    url.searchParams.set('text', message);
    link.setAttribute('href', url.toString());
    return;
  }

  if (baseHref.startsWith('mailto:')) {
    const raw = baseHref.slice(7);
    const [address, query = ''] = raw.split('?');
    const params = new URLSearchParams(query);
    const subject = params.get('subject') || `Website Inquiry${context.product_category ? ` - ${context.product_category}` : ''}`;
    const body = [params.get('body') || '', ...trackingLines(context)].filter(Boolean).join('\n');
    params.set('subject', subject);
    params.set('body', body);
    link.setAttribute('href', `mailto:${address}?${params.toString()}`);
  }
}

function applyTrackingToLinks(root = document) {
  root.querySelectorAll('a[href^="https://wa.me/"], a[href^="https://api.whatsapp.com/"], a[href^="mailto:"]').forEach(applyTrackingToLink);
}

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
    let matched = false;
    for (let i = 0; i < productSelect.options.length; i++) {
      const opt = productSelect.options[i];
      if (opt.value.toLowerCase().includes(search) || opt.text.toLowerCase().includes(search)) {
        productSelect.selectedIndex = i;
        matched = true;
        break;
      }
    }
    // Model names ("WOP09 Semi-Solid 10000mAh") never match a category option,
    // so fall back to the category implied by the current page URL.
    if (!matched) {
      const cat = categoryFromPath();
      if (cat) {
        for (let i = 0; i < productSelect.options.length; i++) {
          if (productSelect.options[i].value === cat) {
            productSelect.selectedIndex = i;
            break;
          }
        }
      } else {
        productSelect.selectedIndex = 0;
      }
    }
    if (subjectInput) subjectInput.value = `${_.newInquiryPrefix}${product}`;
  } else {
    // No data-product (category hub pages, CTA buttons): preselect the category
    // the visitor is already looking at, so they never face an empty dropdown.
    if (productSelect) {
      const cat = categoryFromPath();
      let picked = false;
      if (cat) {
        for (let i = 0; i < productSelect.options.length; i++) {
          if (productSelect.options[i].value === cat) {
            productSelect.selectedIndex = i;
            picked = true;
            break;
          }
        }
      }
      if (!picked) productSelect.selectedIndex = 0;
    }
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
// Note: mobile menu links already have data-action="close-mobile",
// so we only handle the modal backdrop click here.
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
  { threshold: 0.2 }
);

// ─── Desktop Dropdown Hover (DE compat) ─────────────────────────────

function initDropdownHover() {
  if (window.innerWidth <= 1023) return;
  document.querySelectorAll('nav .group').forEach(el => {
    el.addEventListener('mouseenter', () => {
      const dc = el.querySelector('.dropdown-content');
      if (dc) {
        dc.style.opacity = '1';
        dc.style.visibility = 'visible';
        dc.style.transform = 'translateY(0)';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (el.matches(':focus-within')) return;
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
  // Modal backdrop click → close
  const inquiryModalEl = getInquiryModal();
  if (inquiryModalEl) {
    inquiryModalEl.addEventListener('click', (e) => {
      if (e.target === inquiryModalEl) closeModal();
    });
  }

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
        applyTrackingToForm(form);
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
  // 告诉 <head> 里的 3s 看门狗「reveal 已接管」——否则它会把 .no-js 加回去，
  // 把 .reveal 全部强制显形（等于关掉入场动画）。见 layout.njk 顶部脚本。
  window.__revealReady = true;

  // Counter animation
  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  // Attribution capture: landing page, referrer, UTM source/campaign, product category.
  applyTrackingToForms(document);
  applyTrackingToLinks(document);
  document.addEventListener('click', (e) => {
    const link = e.target.closest && e.target.closest('a[href^="https://wa.me/"], a[href^="https://api.whatsapp.com/"], a[href^="mailto:"]');
    if (link) applyTrackingToLink(link);
  }, true);

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

  // ─── Product Search & Filter ────────────────────────────────────────
  const searchInput = document.getElementById('productSearch');
  const searchHints = document.querySelectorAll('.search-hint');
  const noResults = document.getElementById('noResults');

  if (searchInput) {
    function filterProducts(term) {
      const q = term.toLowerCase().trim();
      const cards = document.querySelectorAll('[data-keywords]');
      let visible = 0;

      // Update active pill state
      searchHints.forEach(btn => {
        const v = btn.getAttribute('data-search') || '';
        if (q && v.toLowerCase() === q) {
          btn.classList.add('bg-brandOrange', 'text-white', 'border-brandOrange');
          btn.classList.remove('bg-slate-100', 'text-slate-500', 'border-slate-200');
        } else {
          btn.classList.remove('bg-brandOrange', 'text-white', 'border-brandOrange');
          btn.classList.add('bg-slate-100', 'text-slate-500', 'border-slate-200');
        }
      });

      cards.forEach(card => {
        const kw = (card.getAttribute('data-keywords') || '').toLowerCase();
        const parentSection = card.closest('.mb-14');
        if (!q || kw.includes(q)) {
          card.style.display = '';
          if (parentSection) parentSection.style.display = '';
          visible++;
        } else {
          card.style.display = 'none';
        }
      });

      // Hide empty sections
      document.querySelectorAll('.mb-14').forEach(section => {
        const visibleCards = section.querySelectorAll('[data-keywords]');
        const allHidden = Array.from(visibleCards).every(c => c.style.display === 'none');
        if (allHidden) section.style.display = 'none';
      });

      if (noResults) {
        noResults.classList.toggle('hidden', visible > 0 || !q);
      }
    }

    searchInput.addEventListener('input', function () {
      filterProducts(this.value);
    });

    searchHints.forEach(btn => {
      btn.addEventListener('click', function () {
        const term = this.getAttribute('data-search') || '';
        if (searchInput.value.toLowerCase().trim() === term.toLowerCase()) {
          // Clear on second click
          searchInput.value = '';
          filterProducts('');
        } else {
          searchInput.value = term;
          filterProducts(term);
        }
      });
    });

    // Keyboard shortcut: "/" focuses search
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== searchInput && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }
});

// Language switcher: close details on click outside
document.addEventListener('click', function(e) {
  if (!e.target.closest('.lang-switch')) {
    document.querySelectorAll('.lang-switch[open]').forEach(function(d) { d.removeAttribute('open'); });
  }
});
