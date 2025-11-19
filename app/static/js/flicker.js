// Anti-flicker: jalankan sebelum rendering HTML
const theme = localStorage.getItem("theme");
if (theme === "dark") {
    document.documentElement.classList.add("dark");
} 

else {
    document.documentElement.classList.remove("dark");
}
