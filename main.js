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
    
    const scrollY = window.scrollY;
    if (scrollY > 600) {
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', updateBackToTopVisibility);


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
    const modal = document.getElementById('inquiryModal');
    const main = document.getElementById('main-content') || document.querySelector('main');
    if (!modal) return;

    // ----- 产品预选逻辑 -----
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
    // ----- 预选逻辑结束 -----

    // 记录打开前的焦点元素（用于关闭后恢复焦点）
    lastFocusedElementBeforeModal = document.activeElement;

    // 显示模态框
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    modal.setAttribute('aria-hidden', 'false');

    // 无障碍：防止背景滚动和主内容干扰
    if (main) {
        main.setAttribute('aria-hidden', 'true');
        if ('inert' in HTMLElement.prototype) {
            main.inert = true;
        } else {
            main.dataset.inert = 'true';
        }
    }

    // 自动聚焦到第一个可聚焦元素
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
        
        // Tab 键焦点陷阱
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
    const modal = document.getElementById('inquiryModal');
    const main = document.getElementById('main-content') || document.querySelector('main');
    if (!modal) return;

    // 隐藏模态框
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    modal.setAttribute('aria-hidden', 'true');

    // 恢复主内容
    if (main) {
        main.removeAttribute('aria-hidden');
        if ('inert' in HTMLElement.prototype) {
            main.inert = false;
        } else {
            delete main.dataset.inert;
        }
    }

    // 恢复焦点到打开前的元素
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
 * 切换模态框状态（打开/关闭）
 * @param {string} productName - 可选，预选的产品名称
 */
function toggleModal(productName = '') {
    const modal = document.getElementById('inquiryModal');
    if (!modal) return;
    
    if (modal.classList.contains('hidden')) {
        openModal(productName);
    } else {
        closeModal();
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
    const menu = document.getElementById('mobile-menu-content');
    if (!menu) return false;
    return !menu.classList.contains('translate-x-full');
}

/**
 * 打开移动端菜单
 */
function openMobileMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
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
    
    // 防止背景滚动
    document.body.style.overflow = 'hidden';
}

/**
 * 关闭移动端菜单
 */
function closeMobileMenu() {
    const overlay = document.getElementById('mobile-menu-overlay');
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
    
    // 恢复背景滚动（保持横向隐藏）
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
    threshold: 0.1, 
    rootMargin: '0px 0px -50px 0px' 
});

// ----- 数字计数器动画观察器 -----
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = +counter.getAttribute('data-target') || 0;
            let current = 0;
            
            // 动画参数
            const steps = 60;                    // 动画步数
            const increment = Math.max(1, Math.ceil(target / steps));
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    // 达到目标值，格式化显示
                    counter.innerText = (target >= 1000 ? (Math.round(target/100)/10 + 'k') : target) + '+';
                    clearInterval(timer);
                } else {
                    counter.innerText = Math.ceil(current);
                }
            }, 30);
            
            // 动画完成后取消观察
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.6 });


// ----- DOM 加载完成后初始化 -----
document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有 reveal 动画元素
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 初始化所有计数器元素
    document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

    // 确保返回顶部按钮初始状态正确
    updateBackToTopVisibility();
});


/**
 * ========================================================================
 * 文件结束
 * ========================================================================
 */
