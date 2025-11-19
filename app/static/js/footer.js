export function footer() {
  // Pastikan Lucide sudah dimuat
  if (window.lucide) {
    window.lucide.createIcons();
  } else {
    console.warn("Lucide not found. Make sure the CDN is loaded before main.js");
  }

  // Dropdown footer (mobile)
  const toggles = document.querySelectorAll(".footer-toggle");

  toggles.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Aktif hanya di mobile (sm breakpoint ke bawah)
      if (window.innerWidth < 640) {
        const content = btn.nextElementSibling;
        const icon = btn.querySelector('[data-lucide="chevron-down"]');

        // Toggle konten
        content.classList.toggle("hidden");

        // Animasi ikon
        icon.classList.toggle("rotate-180");
        icon.classList.toggle("transition-transform");
        icon.classList.toggle("duration-300");
      }
    });
  });
}
