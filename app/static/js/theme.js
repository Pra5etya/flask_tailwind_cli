const btn = document.getElementById("themeToggle");

// Update teks tombol
function updateButtonText() {
    const isDark = document.documentElement.classList.contains("dark");
    btn.textContent = isDark ? "Enable Light Mode" : "Enable Dark Mode";
}

// Toggle mode gelap/terang
function toggleDarkMode() {
    const html = document.documentElement;
    const isDark = html.classList.toggle("dark");

    localStorage.setItem("theme", isDark ? "dark" : "light");

    updateButtonText();
}

// Set teks tombol saat halaman selesai load
updateButtonText();

// Pasang event listener (lebih baik daripada onclick="")
btn.addEventListener("click", toggleDarkMode);
