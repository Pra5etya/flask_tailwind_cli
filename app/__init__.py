from flask import Flask
# from app.extensions import db

def create_app():
    # =================
    # 0. core
    # =================

    core = Flask(__name__, static_folder = 'static', template_folder = 'templates')


    # =================
    # 2. config
    # =================
    from config import register_config

    register_config(core)


    # =================
    # 1. routes
    # =================

    from app.routes import register_routes

    register_routes(core)


    return core