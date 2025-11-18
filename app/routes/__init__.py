def register_routes(app):
    from .app_routes import main_bp
    from .file_routes import file_bp
    from .restricted_routes import restricted_bp
    # from .user_routes import user_bp
    # from .transaction_route import tx_bp
    # from .graph_route import graph_bp
    # from .search_route import search_bp

    # 
    app.register_blueprint(main_bp)         # App Routes
    app.register_blueprint(file_bp)         # File Routes
    app.register_blueprint(restricted_bp)   # Restricted Routes
    # app.register_blueprint(user_bp)         # User Routes
    # app.register_blueprint(tx_bp)       # Transaction Routes
    # app.register_blueprint(graph_bp)    # Graph Routes
    # app.register_blueprint(search_bp)   # Search Routes