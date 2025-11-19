from app.extensions.postgresql import db

class User(db.Model):
    __tablename__ = "users"

    id_col = db.Column(db.Integer, primary_key=True)
    name_col = db.Column(db.String(120), nullable=False)
    email_col = db.Column(db.String(120), unique=True, nullable=False)