// ===============================
//  Header Navigation & Theme ES Module (with logs)
// ===============================

export function initHeaderMenu() {
    console.log("[HEADER-MENU] Init header menu module...");

    // Lucide icons
    if (window.lucide) {
        console.log("[HEADER-MENU] Lucide icons initialized");
        window.lucide.createIcons({ replace: true });
    }

    // Menu Data
    const menuData = [
        { name: 'Home', href: '#' },
        { name: 'About', href: '#' },
        { name: 'Services', href: '#' },
        { name: 'Contact', href: '#' }
    ];

    console.log("[HEADER-MENU] Building menu items:", menuData);

    const desktopMenu = document.getElementById('desktop-menu');
    const mobileMenuItems = document.getElementById('mobile-menu-items');

    // Inject Desktop Menu
    menuData.forEach(item => {
        console.log(`[HEADER-MENU] Add desktop menu item: ${item.name}`);
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.name;
        a.className =
            "text-gray-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400";
        desktopMenu.appendChild(a);
    });

    // Inject Mobile Menu
    menuData.forEach(item => {
        console.log(`[HEADER-MENU] Add mobile menu item: ${item.name}`);
        const a = document.createElement('a');
        a.href = item.href;
        a.textContent = item.name;
        a.className =
            "text-gray-700 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400";
        mobileMenuItems.appendChild(a);
    });

    // Mobile Menu Logic
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const spans = btn.querySelectorAll('span');

    const openMenu = () => {
        console.log("[HEADER-MENU] Opening mobile menu...");

        menu.style.transition = "max-height 0.3s ease, padding 0.3s ease";
        menu.style.maxHeight = (menu.scrollHeight + 16) + "px";

        menu.classList.add('open');
        overlay.classList.remove('hidden');
        overlay.classList.add('visible');

        spans[0].classList.add('rotate-45', 'translate-y-3.5');
        spans[1].classList.add('opacity-0');
        spans[2].classList.add('-rotate-45', '-translate-y-3.5');
    };

    const closeMenu = () => {
        console.log("[HEADER-MENU] Closing mobile menu...");

        menu.style.transition = "max-height 0.3s ease, padding 0.3s ease";
        menu.style.maxHeight = "0px";
        menu.classList.remove('open');

        overlay.classList.remove('visible');
        overlay.classList.add('hidden');

        spans[0].classList.remove('rotate-45', 'translate-y-3.5');
        spans[1].classList.remove('opacity-0');
        spans[2].classList.remove('-rotate-45', '-translate-y-3.5');
    };

    btn.addEventListener('click', () => {
        console.log("[HEADER-MENU] Click hamburger button");
        (!menu.classList.contains('open')) ? openMenu() : closeMenu();
    });

    overlay.addEventListener('click', () => {
        console.log("[HEADER-MENU] Click overlay (close menu)");
        closeMenu();
    });

    window.addEventListener('scroll', () => {
        if (menu.classList.contains('open')) {
            console.log("[HEADER-MENU] Scroll detected → auto-close menu");
            closeMenu();
        }
    });

    // Theme Toggle Logic
    const svgSun = `
    <svg class="swap-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
        <circle cx="10" cy="10" r="3"></circle>
        <path d="M10 2v2M10 16v2M4.22 4.22l1.42 1.42 M14.36 14.36l1.42 1.42 
        M2 10h2M16 10h2 M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42"></path>
    </svg>`;

    const svgMoon = `
    <svg class="swap-icon" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"
    stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.5A9 9 0 0111.5 3
        7.5 7.5 0 1021 12.5z"></path>
    </svg>`;

    const themeIcon = document.getElementById('theme-icon');
    const themeIconMobile = document.getElementById('theme-icon-mobile');

    function setAnimatedIcon(target, icon, animate = true) {
        console.log(`[HEADER-MENU] Setting theme icon (${animate ? "animated" : "static"})`);
        target.innerHTML = icon;
        if (animate) {
            void target.offsetWidth;
            const svg = target.querySelector("svg");
            if (svg) svg.classList.add("swap-animate");
        } else {
            const svg = target.querySelector("svg");
            if (svg) {
                svg.style.opacity = "1";
                svg.style.transform = "rotate(0deg)";
            }
        }
    }

    function updateThemeElements() {
        const isDark = document.documentElement.classList.contains('dark');
        console.log(`[HEADER-MENU] Updating theme elements → ${isDark ? "DARK" : "LIGHT"}`);

        const header = document.querySelector('header');
        header.classList.toggle('bg-white', !isDark);
        header.classList.toggle('dark:bg-slate-900', isDark);
        header.classList.toggle('text-gray-900', !isDark);
        header.classList.toggle('dark:text-slate-100', isDark);

        const desktopLinks = document.querySelectorAll('#desktop-menu a');
        desktopLinks.forEach(a => {
            a.classList.toggle('text-gray-700', !isDark);
            a.classList.toggle('hover:text-blue-600', !isDark);
            a.classList.toggle('dark:text-slate-200', isDark);
            a.classList.toggle('dark:hover:text-blue-400', isDark);
        });

        menu.classList.toggle('bg-white', !isDark);
        menu.classList.toggle('dark:bg-slate-900', isDark);
    }

    function updateThemeIcon(animate = true) {
        const isDark = document.documentElement.classList.contains('dark');
        console.log(`[HEADER-MENU] Updating theme icon → ${isDark ? "Moon" : "Sun"}`);

        const icon = isDark ? svgMoon : svgSun;

        if (themeIcon.offsetParent !== null) setAnimatedIcon(themeIcon, icon, animate);
        if (themeIconMobile.offsetParent !== null) setAnimatedIcon(themeIconMobile, icon, animate);
    }

    function toggleTheme() {
        console.log("[HEADER-MENU] Toggling theme...");
        const isDark = document.documentElement.classList.toggle("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        updateThemeIcon(true);
        updateThemeElements();
    }

    // Apply saved theme
    console.log("[HEADER-MENU] Checking saved theme...");
    if (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        console.log("[HEADER-MENU] Initial theme → Dark");
        document.documentElement.classList.add("dark");
    } else {
        console.log("[HEADER-MENU] Initial theme → Light");
    }

    updateThemeIcon(false);
    updateThemeElements();

    document.getElementById("theme-toggle").addEventListener("click", () => {
        console.log("[HEADER-MENU] Click desktop theme toggle");
        toggleTheme();
    });

    document.getElementById("theme-toggle-mobile").addEventListener("click", () => {
        console.log("[HEADER-MENU] Click mobile theme toggle");
        toggleTheme();
    });

    window.addEventListener('resize', () => {
        console.log("[HEADER-MENU] Window resized → update static theme icon");
        updateThemeIcon(false);
    });

    console.log("[HEADER-MENU] Header menu initialized successfully");
}
