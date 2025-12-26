/* main.js
   - Event delegation using data-action / data-product
   - Modal focus-trap (Tab loop), Esc to close, restore previous focus
   - Back-to-top show/hide and scroll-to-top
   - Mobile menu open/close
   - Counter & reveal basic observers
   Place this file next to about.html/index.html and include via <script src="main.js" defer></script>
*/

/* Helper - find focusable elements */
function getFocusableElements(container) {
  if (!container) return [];
  const selectors = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex="-1"])'
  ];
  return Array.from(container.querySelectorAll(selectors.join(','))).filter(el => {
    return (el.offsetWidth > 0 || el.offsetHeight > 0) || el === document.activeElement;
  });
}

/* Back-to-top */
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function updateBackToTopVisibility() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  if (window.scrollY > 600) btn.classList.add('show');
  else btn.classList.remove('show');
}
window.addEventListener('scroll', updateBackToTopVisibility);
document.addEventListener('DOMContentLoaded', updateBackToTopVisibility);

/* Modal focus-trap */
let lastFocusedElementBeforeModal = null;
let modalKeydownHandler = null;

function openModal(productName = '') {
  const modal = document.getElementById('inquiryModal');
  const main = document.getElementById('main-content') || document.querySelector('main');
  if (!modal) return;

  // --- 优化后的产品预选逻辑 (保持 100% 兼容) ---
  const select = modal.querySelector('#productSelect');
  // 这里的 ID 建议与 HTML 里的隐藏域 ID 对应，若 HTML 里没有此 ID，该行会自动跳过不报错
  const emailSubject = modal.querySelector('input[name="subject"]'); 

  if (select) {
    if (productName) {
      let matched = false;
      const searchName = productName.trim().toLowerCase();
      
      // 循环匹配：支持 Value 匹配或 Text 模糊匹配
      for (let i = 0; i < select.options.length; i++) {
        const option = select.options[i];
        const optValue = option.value.toLowerCase();
        const optText = option.text.toLowerCase();

        // 只要选项的值或文字包含点击的产品名，就选中
        if (optValue.includes(searchName) || optText.includes(searchName)) {
          select.selectedIndex = i;
          matched = true;
          break;
        }
      }

      // 同步更新 Web3Forms 的邮件主题
      if (emailSubject) {
        emailSubject.value = `New Inquiry: ${productName}`;
      }
    } else {
      // 如果没有传参，重置为第一项（General Inquiry）
      select.selectedIndex = 0;
      if (emailSubject) emailSubject.value = "General Inquiry from Website";
    }
  }
  // --- 预选逻辑结束 ---

  lastFocusedElementBeforeModal = document.activeElement;

  // 核心显示逻辑：使用 flex 覆盖 hidden
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  modal.setAttribute('aria-hidden', 'false');

  // 辅助功能：防止背景滚动和主内容干扰
  if (main) {
    main.setAttribute('aria-hidden', 'true');
    if ('inert' in HTMLElement.prototype) main.inert = true;
    else main.dataset.inert = 'true';
  }

  // 自动聚焦
  const focusables = getFocusableElements(modal);
  if (focusables.length) focusables[0].focus();
  else modal.focus();

  // 键盘监听逻辑 (保持不变)
  modalKeydownHandler = function(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      closeModal();
      return;
    }
    if (e.key === 'Tab') {
      const f = getFocusableElements(modal);
      if (!f.length) { e.preventDefault(); return; }
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
  };
  document.addEventListener('keydown', modalKeydownHandler, true);
}

function closeModal() {
  const modal = document.getElementById('inquiryModal');
  const main = document.getElementById('main-content') || document.querySelector('main');
  if (!modal) return;

  modal.classList.add('hidden');
  modal.classList.remove('flex');
  modal.setAttribute('aria-hidden', 'true');

  if (main) {
    main.removeAttribute('aria-hidden');
    if ('inert' in HTMLElement.prototype) main.inert = false;
    else delete main.dataset.inert;
  }

  if (lastFocusedElementBeforeModal && typeof lastFocusedElementBeforeModal.focus === 'function') {
    lastFocusedElementBeforeModal.focus();
  }

  if (modalKeydownHandler) {
    document.removeEventListener('keydown', modalKeydownHandler, true);
    modalKeydownHandler = null;
  }
}

function toggleModal(productName = '') {
  const modal = document.getElementById('inquiryModal');
  if (!modal) return;
  if (modal.classList.contains('hidden')) openModal(productName);
  else closeModal();
}

/* Mobile menu */
function isMobileMenuOpen() {
  const menu = document.getElementById('mobile-menu-content');
  if (!menu) return false;
  return !menu.classList.contains('translate-x-full');
}
function openMobileMenu() {
  const overlay = document.getElementById('mobile-menu');
  const menu = document.getElementById('mobile-menu-content');
  if (overlay) {
    overlay.classList.remove('opacity-0');
    overlay.classList.remove('pointer-events-none');
    overlay.setAttribute('aria-hidden', 'false');
  }
  if (menu) {
    menu.classList.remove('translate-x-full');
    menu.setAttribute('aria-hidden', 'false');
  }
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  const overlay = document.getElementById('mobile-menu');
  const menu = document.getElementById('mobile-menu-content');
  if (overlay) {
    overlay.classList.add('opacity-0');
    overlay.classList.add('pointer-events-none');
    overlay.setAttribute('aria-hidden', 'true');
  }
  if (menu) {
    menu.classList.add('translate-x-full');
    menu.setAttribute('aria-hidden', 'true');
  }
  document.body.style.overflow = 'auto';
}
function toggleMobileMenu() {
  if (isMobileMenuOpen()) closeMobileMenu();
  else openMobileMenu();
}

/* Data-action event delegation */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  const actions = (el.getAttribute('data-action') || '').split(/\s+/).filter(Boolean);
  const product = el.getAttribute('data-product') || '';
  actions.forEach(action => {
    switch (action) {
      case 'open-modal':
        openModal(product);
        break;
      case 'close-modal':
        closeModal();
        break;
      case 'toggle-mobile-menu':
        toggleMobileMenu();
        break;
      case 'close-mobile':
        closeMobileMenu();
        break;
      case 'toggle-mobile-submenu': {
        const submenu = document.getElementById('mobile-submenu');
        const icon = document.getElementById('submenu-icon');
        if (!submenu) break;
        const opened = !submenu.classList.contains('hidden');
        if (opened) {
          submenu.classList.add('hidden');
          submenu.setAttribute('aria-hidden', 'true');
          if (icon) icon.style.transform = 'rotate(0deg)';
        } else {
          submenu.classList.remove('hidden');
          submenu.setAttribute('aria-hidden', 'false');
          if (icon) icon.style.transform = 'rotate(180deg)';
        }
        break;
      }
      case 'scroll-to-top':
        scrollToTop();
        break;
      default:
        break;
    }
  });
});

/* Keyboard: Escape closes modal or mobile menu */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('inquiryModal');
    if (modal && !modal.classList.contains('hidden')) {
      closeModal();
      return;
    }
    if (isMobileMenuOpen()) {
      closeMobileMenu();
      return;
    }
  }
});

/* Reveal on scroll & Counters (simple implementation) */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('active');
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const c = entry.target;
        const target = +c.getAttribute('data-target') || 0;
        let current = 0;
        const steps = 60;
        const increment = Math.max(1, Math.ceil(target / steps));
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            c.innerText = (target >= 1000 ? (Math.round(target/100)/10 + 'k') : target) + '+';
            clearInterval(timer);
          } else {
            c.innerText = Math.ceil(current);
          }
        }, 30);
        counterObserver.unobserve(c);
      }
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

  // ensure back-to-top visibility initial check
  updateBackToTopVisibility();
});