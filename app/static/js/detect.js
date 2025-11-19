export function detect_browser() {
  let isES6 = true;

  try {
    new Function("let x = 1; const y = 2; class Test {}; return (x ?? y);");
  } catch (e) {
    isES6 = false;
  }

  if (
    typeof Promise === "undefined" ||
    typeof Symbol === "undefined" ||
    typeof Map === "undefined" ||
    typeof Set === "undefined" ||
    !("from" in Array) ||
    !("assign" in Object)
  ) {
    isES6 = false;
  }

  console.log(isES6 ? "✅ Browser mendukung ES6" : "❌ Browser tidak mendukung ES6");

  if (!isES6) {
    if (!window.__polyfill_loaded__) {
      window.__polyfill_loaded__ = true;

      const script = document.createElement("script");
      script.src = "/static/polyfill/minified.js";
      script.async = true;

      script.onload = function () {
        console.log("✅ Polyfill dimuat, redirect ke halaman unsupported");
        if (window.location.pathname !== "/unsupported") {
          window.location.replace("/unsupported");
        }
      };

      script.onerror = function () {
        console.error("❌ Gagal memuat polyfill, menuju halaman unsupported");
        window.location.replace("/unsupported");
      };

      document.head.appendChild(script);
    }
  } else {
    // Jika ES6 ok → lanjut ke route utama
    if (window.location.pathname !== "/") {
      window.location.replace("/");
    }
  }
}
