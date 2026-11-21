/* ========================================
   JavaScript - QA Portfolio Site
   Based on Nexaverse template interactions
   ======================================== */

// ========================================
// Theme Toggle
// ========================================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// ========================================
// Loading Screen
// ========================================
window.addEventListener('load', () => {
    initTheme();
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 1000);
});

// ========================================
// Menu & Section Navigation
// ========================================
const menuItems = document.querySelectorAll('.menu-item');
const contentSections = document.querySelectorAll('.content-section');
const menuGrid = document.getElementById('menuGrid');
const mainHeader = document.getElementById('mainHeader');
const mainFooter = document.getElementById('mainFooter');
let isTransitioning = false;

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        if (isTransitioning) return;
        const sectionId = item.dataset.section;
        showSection(sectionId);
    });
});

function showSection(sectionId) {
    isTransitioning = true;

    // Remove initial-load class from all items
    menuItems.forEach((item) => {
        item.classList.remove('initial-load');
        item.style.opacity = '1';
        item.style.transform = 'translateY(0) scale(1)';
        item.style.animation = 'none';
    });

    // Force reflow
    void menuGrid.offsetWidth;

    // Staggered fade out
    menuItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transition = 'all 0.4s ease-out';
            item.style.opacity = '0';
            item.style.transform = 'translateY(40px) scale(0.9)';
        }, index * 50);
    });

    // Hide header and footer
    mainHeader.style.animation = 'none';
    mainHeader.style.opacity = '1';
    mainFooter.style.animation = 'none';
    mainFooter.style.opacity = '1';

    void mainHeader.offsetWidth;

    mainHeader.style.transition = 'opacity 0.4s ease';
    mainHeader.style.opacity = '0';
    mainFooter.style.transition = 'opacity 0.4s ease';
    mainFooter.style.opacity = '0';

    // Show content section after menu animation
    setTimeout(() => {
        menuGrid.style.display = 'none';
        mainHeader.style.display = 'none';
        mainFooter.style.display = 'none';

        // Reset menu item styles
        menuItems.forEach(item => {
            item.style.transition = '';
            item.style.opacity = '';
            item.style.transform = '';
            item.classList.remove('exit-up', 'visible');
        });

        const section = document.getElementById(sectionId);
        section.classList.add('active');

        // Animate stats if introduction section
        if (sectionId === 'introduction') {
            setTimeout(animateStats, 500);
        }

        isTransitioning = false;
    }, 550);
}

function backToMenu() {
    if (isTransitioning) return;
    isTransitioning = true;

    const activeSection = document.querySelector('.content-section.active');
    if (activeSection) {
        const sectionHeaderSmall = activeSection.querySelector('.section-header-small');
        const backBtn = activeSection.querySelector('.back-btn');

        // Cancel forwards animation
        activeSection.style.animation = 'none';
        activeSection.style.opacity = '1';

        void activeSection.offsetWidth;

        // Fade out section
        activeSection.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        activeSection.style.opacity = '0';
        activeSection.style.transform = 'translateY(-20px)';

        if (sectionHeaderSmall) {
            sectionHeaderSmall.style.transition = 'opacity 0.5s ease';
            sectionHeaderSmall.style.opacity = '0';
        }
        if (backBtn) {
            backBtn.style.transition = 'opacity 0.5s ease';
            backBtn.style.opacity = '0';
        }

        // Wait for fade out
        setTimeout(() => {
            activeSection.classList.remove('active');
            activeSection.style.animation = '';
            activeSection.style.opacity = '';
            activeSection.style.transform = '';
            activeSection.style.transition = '';

            if (sectionHeaderSmall) {
                sectionHeaderSmall.style.opacity = '';
                sectionHeaderSmall.style.transition = '';
            }
            if (backBtn) {
                backBtn.style.opacity = '';
                backBtn.style.transition = '';
            }

            // Prepare menu elements
            menuGrid.style.display = 'grid';
            mainHeader.style.display = 'block';
            mainFooter.style.display = 'block';

            mainHeader.style.animation = 'none';
            mainFooter.style.animation = 'none';

            mainHeader.style.opacity = '0';
            mainHeader.style.transform = 'translateY(20px)';
            mainFooter.style.opacity = '0';

            menuItems.forEach(item => {
                item.classList.remove('exit-up', 'initial-load', 'return', 'visible');
                item.style.opacity = '0';
                item.style.transform = 'translateY(30px) scale(0.9)';
            });

            // Fade in menu
            setTimeout(() => {
                mainHeader.style.transition = 'all 0.5s ease';
                mainHeader.style.opacity = '1';
                mainHeader.style.transform = 'translateY(0)';

                mainFooter.style.transition = 'all 0.5s ease';
                mainFooter.style.opacity = '1';

                menuItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, index * 80);
                });

                // Clean up
                setTimeout(() => {
                    mainHeader.style.transition = '';
                    mainHeader.style.transform = '';
                    mainFooter.style.transition = '';

                    menuItems.forEach(item => {
                        item.style.transition = '';
                        item.style.opacity = '';
                        item.style.transform = '';
                        item.classList.add('visible');
                    });

                    isTransitioning = false;
                }, 600);
            }, 150);
        }, 550);
    }
}

// ========================================
// Stats Animation
// ========================================
function animateStats() {
    const metricValues = document.querySelectorAll('.metric-value[data-target]');
    metricValues.forEach((el, index) => {
        setTimeout(() => {
            const target = parseInt(el.dataset.target);
            let current = 0;
            const increment = target / 40;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                el.textContent = Math.floor(current);
            }, 30);
        }, index * 200);
    });
}

// ========================================
// Tab Switching
// ========================================
function switchTab(btn, tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
}

// ========================================
// Gallery Filter
// ========================================
function filterGallery(category, btn) {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            item.style.animation = 'tabFade 0.4s ease-out';
        } else {
            item.style.display = 'none';
        }
    });
}

// ========================================
// Keyboard Navigation
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            backToMenu();
        }
    }
});

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});