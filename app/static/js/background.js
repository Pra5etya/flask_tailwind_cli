// 
let animationId = null;

export function background() {
  const canvas = document.getElementById('bubble-bg');
  if (!canvas) {
    console.warn('Canvas #bubble-bg tidak ditemukan');
    return;
  }

  const ctx = canvas.getContext('2d');
  let bubbles = [];
  let mouse = { x: null, y: null };
  const maxDistance = 120; // jarak interaksi mouse

  // Hentikan animasi lama jika ada
  if (animationId) cancelAnimationFrame(animationId);

  // Resize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Deteksi pergerakan mouse
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Palet warna bubble
  const colors = ['#60a5fa', '#f472b6', '#34d399', '#facc15']; // biru, pink, hijau, kuning

  // Membuat bubble baru
  function createBubble() {
    const radius = Math.random() * 12 + 4;
    const x = Math.random() * canvas.width;
    const y = canvas.height + radius;
    const speed = Math.random() * 1.2 + 0.3;
    const opacity = Math.random() * 0.5 + 0.2;
    const color = colors[Math.floor(Math.random() * colors.length)];

    bubbles.push({
      x,
      y,
      radius,
      baseRadius: radius,
      speed,
      opacity,
      color,
    });
  }

  // Animasi loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Tambahkan bubble acak
    if (bubbles.length < 100 && Math.random() > 0.9) createBubble();

    bubbles.forEach((b, i) => {
      b.y -= b.speed;

      // Interaksi mouse
      if (mouse.x && mouse.y) {
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          const scale = 1 + (maxDistance - distance) / maxDistance / 2;
          b.radius = b.baseRadius * scale;
          b.opacity = Math.min(1, b.opacity + 0.05);
        } else {
          // kembalikan ke ukuran semula
          b.radius += (b.baseRadius - b.radius) * 0.05;
          b.opacity += (0.4 - b.opacity) * 0.02;
        }
      }

      // Gambar bubble
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);

      ctx.shadowBlur = 15 * b.opacity;
      ctx.shadowColor = b.color;
      ctx.fillStyle = `${b.color}${Math.floor(b.opacity * 255)
        .toString(16)
        .padStart(2, '0')}`;

      ctx.fill();

      // Hapus bubble yang sudah keluar layar
      if (b.y + b.radius < 0) bubbles.splice(i, 1);
    });

    animationId = requestAnimationFrame(animate);
  }

  // Jalankan animasi setelah DOM siap
  window.addEventListener('DOMContentLoaded', () => animate());
  if (document.readyState === 'complete' || document.readyState === 'interactive') animate();
}
