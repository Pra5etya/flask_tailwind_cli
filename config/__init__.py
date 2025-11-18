def register_config(app): 
    from config.log_data import setup_logger
    import os

    # 2.1 log setup
    # =================

    logger = setup_logger()

    # Hanya log "Restart" ketika proses utama berjalan setelah restart
    if os.environ.get('WERKZEUG_RUN_MAIN') == 'true':
        boundary = "="  * 30

        logger.info(f"{boundary} LOGGER STARTING POINT {boundary} \n")
        logger.info("Flask is restarting...")
        logger.info("Log Start ... \n")

    # 2.2 Secret setup
    # =================

    env = os.getenv("FLASK_ENV", "development")

    if env == "production":
        app.config.from_object("config.web_env.production.ProductionConfig")

    elif env == "staging":
        app.config.from_object("config.web_env.staging.StagingConfig")

    else:
        app.config.from_object("config.web_env.development.DevelopmentConfig")

    # 2.3 Version Static
    # =================

    from config.static_version import apply_static_versioning

    apply_static_versioning(app)

    # # 2.4 Middleware setup
    # # =================

    # from app.middleware import register_middleware

    # register_middleware(app)