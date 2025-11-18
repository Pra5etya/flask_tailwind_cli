from flask import Blueprint, render_template
from config.log_data import setup_logger

restricted_bp = Blueprint('restricted', __name__)
logger = setup_logger()

@restricted_bp.route("/unsupport")
def unsupported():
    logger.warning("Memasuki halaman unsupport")
    return render_template("restricted/unsupport.html"), 406


@restricted_bp.route("/forbidden")
def forbidden():
    logger.warning("Akses ditolak: user tidak punya izin")
    return render_template("restricted/forbidden.html"), 403


@restricted_bp.errorhandler(403)
def forbidden():
    logger.warning("Akses ditolak: user tidak punya izin")
    return render_template("restricted/forbidden.html"), 403