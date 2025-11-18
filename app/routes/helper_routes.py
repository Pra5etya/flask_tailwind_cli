from flask import request
import os, json

# ================================================================
# 🔧 Fungsi bantu untuk file handler
# ================================================================

# 🔧 Ekstensi yang diizinkan
ALLOWED_IMAGE_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.svg', '.webp', '.gif'}
ALLOWED_AUDIO_EXTENSIONS = {'.mp3', '.wav', '.ogg'}

# Daftar Referer yang dipercaya
TRUSTED_REFERERS = [
    'https://sample.com',
    'http://localhost',
    'http://127.0.0.1',
    'http://192.168.',
]

# 🔒 Validasi referer
def is_trusted_referer():
    referer = request.headers.get('Referer', '')
    print(f"[Referer] {referer}")
    return any(trusted in referer for trusted in TRUSTED_REFERERS)

# 🔒 Validasi ekstensi
def is_allowed_file(filename, allowed_extensions):
    ext = os.path.splitext(filename)[1].lower()
    return ext in allowed_extensions

# 🔒 Validasi path aman
def is_safe_path(filename):
    return '..' not in filename and not filename.startswith('/')


# ================================================================
# 🔧 Fungsi bantu untuk membuat folder & file .well-known
# ================================================================

# 🔧 Versi Awal
WELL_KNOWN_VERSION = "1.0.0"

DEFAULT_FILES = {
    "security.txt": {
        "version": WELL_KNOWN_VERSION,
        "content": (
            "Contact: mailto:security@datalearn.ai\n"
            "Encryption: https://datalearn.ai/pgp.txt\n"
            "Acknowledgements: https://datalearn.ai/security\n"
            "# meta_version: 1.0.0\n"
        ),
    },

    "ai-plugin.json": {
        "version": WELL_KNOWN_VERSION,
        "content": json.dumps({
            "schema_version": "v1",
            "name_for_human": "DataLearn AI Plugin",
            "name_for_model": "datalearn_ai",
            "description_for_human": "Integrasi AI untuk pembelajaran data dan otomasi.",
            "description_for_model": "Plugin untuk DataLearn AI, menyediakan API data & pembelajaran.",
            "auth": {"type": "none"},
            "api": {"url": "https://datalearn.ai/api"},
            "logo_url": "https://datalearn.ai/static/favicon/favicon-512x512.png",
            "contact_email": "support@datalearn.ai",
            "meta_version": WELL_KNOWN_VERSION
        }, indent=2),
    },

    "assetlinks.json": {
        "version": WELL_KNOWN_VERSION,
        "content": json.dumps([{
            "relation": ["delegate_permission/common.handle_all_urls"],
            "target": {
                "namespace": "android_app",
                "package_name": "ai.datalearn.app",
                "sha256_cert_fingerprints": ["AA:BB:CC:DD:EE:FF:..."]
            },
            "meta_version": WELL_KNOWN_VERSION
        }], indent=2),
    },
    
    "apple-app-site-association": {
        "version": WELL_KNOWN_VERSION,
        "content": json.dumps({
            "applinks": {
                "apps": [],
                "details": [
                    {"appID": "ABCDE12345.ai.datalearn.app", "paths": ["*"]}
                ]
            },
            "meta_version": WELL_KNOWN_VERSION
        }, indent=2),
    },
}


def extract_meta_version(content: str):
    if '"meta_version"' in content:
        try:
            data = json.loads(content)
            if isinstance(data, list) and "meta_version" in data[0]:
                return data[0]["meta_version"]
            elif isinstance(data, dict) and "meta_version" in data:
                return data["meta_version"]
        except Exception:
            pass
    for line in content.splitlines():
        if "meta_version:" in line:
            return line.split(":")[-1].strip()
    return None


def ensure_well_known():
    """
    Membuat folder .well-known dan file standar jika belum ada.
    Jika file ada tapi versinya berbeda → update + backup.
    """
    static_dir = os.path.join(os.getcwd(), "app", "static")
    well_known_dir = os.path.join(static_dir, ".well-known")
    os.makedirs(well_known_dir, exist_ok=True)

    for filename, meta in DEFAULT_FILES.items():
        file_path = os.path.join(well_known_dir, filename)
        new_version = meta["version"]

        # Buat baru jika belum ada
        if not os.path.exists(file_path):
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(meta["content"])
            print(f"[INFO] Created .well-known/{filename} (v{new_version})")
            continue

        # Cek versi lama
        with open(file_path, "r", encoding="utf-8") as f:
            existing_content = f.read()

        old_version = extract_meta_version(existing_content)

        # Jika berbeda → backup & update
        if old_version != new_version:
            backup_path = file_path + ".bak"
            with open(backup_path, "w", encoding="utf-8") as f:
                f.write(existing_content)
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(meta["content"])
            print(f"[UPDATE] Updated {filename} → v{new_version} (backup: {backup_path})")
        else:
            print(f"[SKIP] {filename} sudah versi terbaru ({new_version})")