from flask import Blueprint, render_template, jsonify, current_app
from config.log_data import setup_logger

import os

main_bp = Blueprint('main', __name__)
logger = setup_logger()

@main_bp.route("/")
def index():
    logger.info("Memasuki halaman utama")
    return render_template("index.html")

@main_bp.route("/about")
def about():
    logger.info("Memasuki halaman about")
    return jsonify("about")

@main_bp.route("/contact")
def contact():
    logger.info("Memasuki halaman contact")
    return jsonify("contact")

@main_bp.route("/portfolio")
def portfolio():
    logger.info("Memasuki halaman portfolio")
    return jsonify("portfolio")


# DEBUG APP
# ============
@main_bp.route("/env")
def show_env():
    # Menampilkan semua environment variable dalam format JSON
    return jsonify(dict(os.environ))

@main_bp.route("/config")
def show_config():
    # Akses konfigurasi aplikasi Flask lewat current_app
    return jsonify({k: str(v) for k, v in current_app.config.items()})