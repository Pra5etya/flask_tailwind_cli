from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

class Postgres:
    def __init__(self):
        self.db = SQLAlchemy()
        self.migrate = Migrate()

    def init_app(self, app):
        """Inisialisasi Postgres dengan konfigurasi dari Flask app"""
        app.config["SQLALCHEMY_DATABASE_URI"] = (
            f"postgresql://{app.config['POSTGRES_USER']}:{app.config['POSTGRES_PASS']}"
            f"@{app.config['POSTGRES_HOST']}:{app.config['POSTGRES_PORT']}/{app.config['POSTGRES_DB']}"
        )
        app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

        self.db.init_app(app)
        self.migrate.init_app(app, self.db)


# 🔹 Instance global yang bisa diimport
postgres = Postgres()
db = postgres.db
migrate = postgres.migrate