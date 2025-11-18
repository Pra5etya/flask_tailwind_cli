from flask import Blueprint, send_from_directory, abort, current_app
from config.log_data import setup_logger
from .helper_routes import (
    is_trusted_referer,
    is_allowed_file,
    is_safe_path,
    ALLOWED_IMAGE_EXTENSIONS,
    ALLOWED_AUDIO_EXTENSIONS, 
    ensure_well_known
)

import os


file_bp = Blueprint('file', __name__)
logger = setup_logger()

# robots.txt
@file_bp.route('/robots.txt')
def robots():
    return send_from_directory('static', 'robots.txt')

# ✅ Route: audio
@file_bp.route('/audio/<path:filename>')
def protected_audio(filename):
    print(f"\n[Audio] Filename requested: {filename}")

    if not (is_safe_path(filename) and is_allowed_file(filename, ALLOWED_AUDIO_EXTENSIONS)):
        abort(403)

    if not is_trusted_referer():
        abort(403)

    return send_from_directory('private/audio', filename)

# ✅ Route: images
@file_bp.route('/images/<path:filename>')
def protected_image(filename):
    print(f"\n[Assets] Filename requested: {filename}")

    if not (is_safe_path(filename) and is_allowed_file(filename, ALLOWED_IMAGE_EXTENSIONS)):
        abort(403)

    if not is_trusted_referer():
        abort(403)

    return send_from_directory('private/images', filename)


@file_bp.route('/.well-known/<path:filename>')
def serve_well_known(filename):
    """
    Melayani file dari folder static/.well-known/
    dan membuat folder serta file default jika belum ada.
    """
    static_dir = current_app.static_folder
    well_known_dir = os.path.join(static_dir, ".well-known")

    # Pastikan folder dan file sudah ada
    ensure_well_known()

    # Sanitasi path agar aman
    safe_path = os.path.normpath(os.path.join(well_known_dir, filename))
    if not safe_path.startswith(well_known_dir):
        logger.warning(f"Upaya akses tidak sah ke .well-known: {filename}")
        abort(403)

    # Jika file tidak ditemukan, kembalikan 204 (tidak error 404)
    if not os.path.exists(safe_path):
        logger.info(f"File .well-known tidak ditemukan: {filename}")
        return '', 204

    logger.info(f"Melayani file .well-known: {filename}")
    return send_from_directory(well_known_dir, filename)