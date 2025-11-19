from .postgresql import postgres, db, migrate

def register_extensions(app):
    """Inisialisasi semua extensions ke Flask app"""
    postgres.init_app(app)