/**
 * ========================================================================
 * WOWOHCOOL 主 JavaScript 文件
 * 
 * 文件说明：
 * - 处理页面交互功能：模态框、移动端菜单、计数器、滚动动画等
 * - 使用事件委托模式处理点击事件
 * - 包含无障碍访问功能：焦点陷阱、键盘导航、Escape 关闭等
 * 
 * 使用方法：
 * - 在 HTML 末尾引入：<script src="main.js" defer></script>
 * - 交互元素使用 data-action 属性定义行为
 * - 示例：<button data-action="open-modal">打开弹窗</button>
 * 
 * 依赖：
 * - 无外部依赖，纯原生 JavaScript
 * ========================================================================
 */

// 常量配置
const SCROLL_THRESHOLD = 600;
const REVEAL_THRESHOLD = 0.15;
const REVEAL_ROOT_MARGIN = '0px 0px -100px 0px';
const COUNTER_THRESHOLD = 0.6;
const COUNTER_STEPS = 60;
const COUNTER_INTERVAL_MS = 30;
const FORM_TIMEOUT_MS = 15000;
const LOADING_TEXT = 'Sending Inquiry...';

// 缓存常用 DOM 引用（延迟初始化）
let cachedModal = null;
let cachedMain = null;
let cachedMobileMenu = null;
let cachedMobileOverlay = null;

function getModal() { return cachedModal || (cachedModal = document.getElementById('inquiryModal')); }
function getMain() { return cachedMain || (cachedMain = document.getElementById('main-content') || document.querySelector('main')); }
function getMobileMenu() { return cachedMobileMenu || (cachedMobileMenu = document.getElementById('mobile-menu-content')); }
function getMobileOverlay() { return cachedMobileOverlay || (cachedMobileOverlay = document.getElementById('mobile-menu-overlay')); }


/**
 * ========================================================================
 * 模块 1: 工具函数 - Utility Functions
 * 包含辅助功能函数
 * ======================================================================== */

/**
 * 获取容器内所有可聚焦元素
 * 用于模态框焦点陷阱功能
 * @param {HTMLElement} container - 容器元素
 * @returns {HTMLElement[]} - 可聚焦元素数组
 */
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


/**
 * ========================================================================
 * 模块 2: 返回顶部 - Back to Top
 * 处理返回顶部按钮的显示/隐藏与滚动功能
 * ======================================================================== */

/**
 * 平滑滚动到页面顶部
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 根据滚动位置更新返回顶部按钮的显示状态
 */
function updateBackToTopVisibility() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    if (window.scrollY > SCROLL_THRESHOLD) {
        btn.classList.add('show');
    } else {
        btn.classList.remove('show');
    }
}

// 滚动事件节流处理（使用 requestAnimationFrame 优化性能）
let scrollPending = false;
window.addEventListener('scroll', () => {
    if (scrollPending) return;
    scrollPending = true;
    requestAnimationFrame(() => {
        updateBackToTopVisibility();
        scrollPending = false;
    });
}, { passive: true });


/**
 * ========================================================================
 * 模块 3: 模态框 - Modal
 * 处理询盘弹窗的打开/关闭、焦点管理、无障碍支持
 * ======================================================================== */

// 焦点管理变量
let lastFocusedElementBeforeModal = null;
let modalKeydownHandler = null;

/**
 * 打开询盘弹窗
 * @param {string} productName - 可选，预选的产品名称
 */
function openModal(productName = '') {
    const modal = getModal();
    const main = getMain();
    if (!modal) return;

    const select = modal.querySelector('#productSelect');
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
    lastFocusedElementBeforeModal = document.activeElement;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.setAttribute('aria-hidden', 'false');

    if (main) {
        main.setAttribute('aria-hidden', 'true');
        if ('inert' in HTMLElement.prototype) {
            main.inert = true;
        } else {
            getFocusableElements(main).forEach(el => {
                if (!el.hasAttribute('data-inert-fallback')) {
                    el.setAttribute('data-inert-fallback', el.getAttribute('tabindex') || '');
                    el.setAttribute('tabindex', '-1');
                }
            });
        }
    }

    const focusables = getFocusableElements(modal);
    if (focusables.length) {
        focusables[0].focus();
    } else {
        modal.focus();
    }

    // 键盘监听：Escape 关闭、Tab 焦点循环
    modalKeydownHandler = function(e) {
        // Escape 键关闭模态框
        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
            return;
        }
        
    // 键盘焦点陷阱
        if (e.key === 'Tab') {
            const f = getFocusableElements(modal);
            if (!f.length) { 
                e.preventDefault(); 
                return; 
            }
            const first = f[0];
            const last = f[f.length - 1];
            
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

/**
 * 关闭询盘弹窗
 */
function closeModal() {
    const modal = getModal();
    const main = getMain();
    if (!modal) return;

    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.setAttribute('aria-hidden', 'true');

    if (main) {
        main.removeAttribute('aria-hidden');
        if ('inert' in HTMLElement.prototype) {
            main.inert = false;
        } else {
            main.querySelectorAll('[data-inert-fallback]').forEach(el => {
                const prev = el.getAttribute('data-inert-fallback');
                if (prev) {
                    el.setAttribute('tabindex', prev);
                } else {
                    el.removeAttribute('tabindex');
                }
                el.removeAttribute('data-inert-fallback');
            });
        }
    }

    // 恢复焦点
    if (lastFocusedElementBeforeModal && typeof lastFocusedElementBeforeModal.focus === 'function') {
        lastFocusedElementBeforeModal.focus();
    }

    // 移除键盘监听
    if (modalKeydownHandler) {
        document.removeEventListener('keydown', modalKeydownHandler, true);
        modalKeydownHandler = null;
    }
}

/**
 * ========================================================================
 * 模块 4: 移动端菜单 - Mobile Menu
 * 处理移动端侧滑菜单的打开/关闭功能
 * ======================================================================== */

/**
 * 检查移动端菜单是否处于打开状态
 * @returns {boolean}
 */
function isMobileMenuOpen() {
    const menu = getMobileMenu();
    if (!menu) return false;
    return !menu.classList.contains('translate-x-full');
}

/**
 * 打开移动端菜单
 */
function openMobileMenu() {
    const overlay = getMobileOverlay();
    const menu = getMobileMenu();
    
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

/**
 * 关闭移动端菜单
 */
function closeMobileMenu() {
    const overlay = getMobileOverlay();
    const menu = getMobileMenu();

    if (document.activeElement && menu && menu.contains(document.activeElement)) {
        document.activeElement.blur();
    }

    if (overlay) {
        overlay.classList.add('opacity-0');
        overlay.classList.add('pointer-events-none');
        overlay.setAttribute('aria-hidden', 'true');
    }

    if (menu) {
        menu.classList.add('translate-x-full');
        menu.setAttribute('aria-hidden', 'true');
    }

    document.body.style.overflow = '';
}

/**
 * 切换移动端菜单状态
 */
function toggleMobileMenu() {
    if (isMobileMenuOpen()) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}

function toggleMobileSubmenu() {
    const submenu = document.getElementById('mobile-submenu');
    const icon = document.querySelector('.submenu-icon');
    if (!submenu) return;

    const opened = submenu.classList.contains('open');
    if (opened) {
        submenu.classList.remove('open');
        submenu.setAttribute('aria-hidden', 'true');
        if (icon) icon.style.transform = 'rotate(0deg)';
    } else {
        submenu.classList.add('open');
        submenu.setAttribute('aria-hidden', 'false');
        if (icon) icon.style.transform = 'rotate(180deg)';
    }
}


/**
 * ========================================================================
 * 模块 5: 事件委托 - Event Delegation
 * 使用事件委托处理所有交互元素的点击事件
 * ======================================================================== */

// 统一的点击事件处理
document.addEventListener('click', (e) => {
    // 查找最近的带 data-action 属性的元素
    const el = e.target.closest('[data-action]');
    if (!el) return;
    
    // 获取动作列表和关联产品
    const actions = (el.getAttribute('data-action') || '').split(/\s+/).filter(Boolean);
    const product = el.getAttribute('data-product') || '';
    
    // 执行相应的动作
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
            case 'toggle-mobile-submenu':
                toggleMobileSubmenu();
                break;
            case 'scroll-to-top':
                scrollToTop();
                break;
            default:
                break;
        }
    });
});


// 键盘全局事件处理
document.addEventListener('keydown', (e) => {
    // Escape 键关闭模态框或移动端菜单
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


/**
 * ========================================================================
 * 模块 6: 滚动动画与计数器 - Scroll Animations & Counters
 * 使用 Intersection Observer 实现懒加载动画效果
 * ======================================================================== */

// ----- Reveal 动画观察器 -----
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 元素进入视口时激活动画
            entry.target.classList.add('active');
            // 动画完成后取消观察（避免重复触发动画）
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: REVEAL_THRESHOLD,
    rootMargin: REVEAL_ROOT_MARGIN
});

// ----- 数字计数器动画观察器 -----
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const rawTarget = +counter.getAttribute('data-target');
            const target = Number.isFinite(rawTarget) && rawTarget > 0 ? rawTarget : 0;
            if (target === 0) {
                counter.innerText = '0+';
                counterObserver.unobserve(counter);
                return;
            }
            let current = 0;

            const increment = Math.max(1, Math.ceil(target / COUNTER_STEPS));
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    counter.innerText = (target >= 1000 ? (Math.round(target/100)/10 + 'k') : target) + '+';
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.ceil(current);
                }
            }, COUNTER_INTERVAL_MS);

            counterObserver.unobserve(counter);
        }
    });
}, { threshold: COUNTER_THRESHOLD });


/**
 * ========================================================================
 * 模块 7: AJAX 表单提交 - Form AJAX Submission
 * 使用 fetch 异步提交到 Web3Forms，成功后显示反馈再跳转感谢页
 * ======================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form[action*="web3forms.com/submit"]');

    forms.forEach(form => {
        if (form.dataset.submitReady) return;
        form.dataset.submitReady = 'true';

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            if (!submitBtn || submitBtn.disabled) return;

            const redirectUrl = form.querySelector('input[name="redirect"]')?.value || '/thank-you.html';
            const originalText = submitBtn.textContent.trim();

            // 禁用按钮，显示发送中
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-50', 'cursor-not-allowed');
            submitBtn.textContent = LOADING_TEXT;

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
                    // 清空表单
                    form.reset();

                    // 替换表单内容为成功消息
                    const formContent = form.querySelector('.space-y-3, .grid, .flex-wrap') || form;
                    const successMsg = document.createElement('div');
                    successMsg.className = 'text-center py-8';
                    successMsg.innerHTML = '<div class="text-5xl mb-4">&#10004;</div>'
                        + '<h3 class="text-xl font-bold text-green-600 mb-2">Thank You!</h3>'
                        + '<p class="text-slate-500">Your inquiry has been sent successfully.<br>We will reply within 24 hours.</p>'
                        + '<p class="text-xs text-slate-400 mt-4">Redirecting...</p>';
                    form.innerHTML = '';
                    form.appendChild(successMsg);

                    // 延迟后跳转感谢页
                    setTimeout(() => {
                        window.location.href = redirectUrl;
                    }, 2500);
                } else {
                    // 显示错误
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                    submitBtn.textContent = originalText;
                    showFormError(form, result.message || 'Submission failed. Please try again.');
                }
            } catch (err) {
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
                submitBtn.textContent = originalText;
                showFormError(form, 'Network error. Please check your connection and try again.');
            }
        });
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
    document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));
    updateBackToTopVisibility();
});

/**
 * 在表单顶部显示错误消息
 */
function showFormError(form, msg) {
    const existing = form.querySelector('.form-error-msg');
    if (existing) existing.remove();

    const err = document.createElement('div');
    err.className = 'form-error-msg bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl p-3 mb-4';
    err.textContent = msg;
    form.insertBefore(err, form.firstChild);

    setTimeout(() => { err.remove(); }, 8000);
}


/**
 * ========================================================================
 * 文件结束
 * ========================================================================
 */
