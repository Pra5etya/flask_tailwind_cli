# NPM yang sebaiknya di install (untuk web)
```bash
npm install tailwindcss @tailwindcss/cli concurrently
```

# Packages yang sebaiknya di set
```json
"scripts": {
    "dev:css": "npx @tailwindcss/cli -i ./app/static/css/input.css -o ./app/static/css/style.css --watch",
    "build:css": "npx @tailwindcss/cli -i ./app/static/css/input.css -o ./app/static/css/style.css --minify",

    "flask": "py run.py",

    "start": "concurrently \"npm run dev:css\" \"npm run flask\""
  }
```