export function header() {
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");
  const overlay = document.getElementById("overlay");

  if (!btn || !menu || !overlay) return;

  const closeMenu = () => {
    menu.classList.remove("open");
    btn.classList.remove("open");
    overlay.classList.add("hidden");
  };

  const openMenu = () => {
    menu.classList.add("open");
    btn.classList.add("open");
    overlay.classList.remove("hidden");
  };

  btn.addEventListener("click", () => {
    menu.classList.contains("open") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);
  window.addEventListener("scroll", closeMenu);

  // --------------------------
  // THEME TOGGLER
  // --------------------------

  const themeBtn = document.getElementById("theme-toggle");
  const themeBtnMobile = document.getElementById("theme-toggle-mobile");
  const root = document.documentElement;

  // Set default: light (unless previously saved as dark)
  if (localStorage.theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }

  // Update icon for both desktop + mobile
  const updateIcon = () => {
    const iconDesktop = document.getElementById("theme-toggle-icon");
    const iconMobile = document.getElementById("theme-toggle-icon-mobile");

    const newIcon = root.classList.contains("dark") ? "sun" : "moon";

    if (iconDesktop) iconDesktop.setAttribute("data-lucide", newIcon);
    if (iconMobile) iconMobile.setAttribute("data-lucide", newIcon);

    lucide.createIcons();
  };

  updateIcon();

  const toggleTheme = () => {
    const isDark = root.classList.toggle("dark");
    localStorage.theme = isDark ? "dark" : "light";
    updateIcon();
  };

  if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
  if (themeBtnMobile) themeBtnMobile.addEventListener("click", toggleTheme);
}
