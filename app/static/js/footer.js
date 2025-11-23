export function initFooterToggle() {
  const toggles = document.querySelectorAll('.footer-toggle');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      // Ignore on desktop (>=640px)
      if (window.innerWidth >= 640) return;

      const content = toggle.nextElementSibling;
      const chevron = toggle.querySelector('.chevron');

      content.classList.toggle('hidden');

      // Rotate chevron when expanded
      if (!content.classList.contains('hidden')) {
        chevron.classList.add('rotate-180');
      } 
      
      else {
        chevron.classList.remove('rotate-180');
      }
    });
  });
}
