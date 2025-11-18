from dotenv import load_dotenv
from pathlib import Path

import os

# --- Tentukan environment aktif ---
FLASK_ENV = os.getenv("FLASK_ENV", "development")

# --- Tentukan lokasi folder env ---
BASE_DIR = Path(__file__).resolve().parent.parent
ENV_DIR = BASE_DIR / "env"

# --- Tentukan file .env yang akan digunakan ---
dotenv_path = ENV_DIR / f".env.{FLASK_ENV}"

# --- Muat file tersebut (tanpa export manual) ---
if dotenv_path.exists():
    load_dotenv(dotenv_path = dotenv_path)

else:
    raise FileNotFoundError(f"Tidak ditemukan file konfigurasi: {dotenv_path}")

# --- Base configuration ---
class BaseConfig:
    SECRET_KEY = os.getenv("SECRET_KEY", "default-secret")

    POSTGRES_USER = os.getenv("POSTGRES_USER")
    POSTGRES_PASS = os.getenv("POSTGRES_PASS")
    POSTGRES_DB   = os.getenv("POSTGRES_DB")
    POSTGRES_HOST = os.getenv("POSTGRES_HOST")
    POSTGRES_PORT = int(os.getenv("POSTGRES_PORT", 5432))

    REDIS_HOST = os.getenv("REDIS_HOST", "redis")
    REDIS_PORT = int(os.getenv("REDIS_PORT", 6379))