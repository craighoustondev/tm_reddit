from flask import Flask


def create_app(config=None):
    app = Flask(__name__)
    app.config.from_object(config or "app.config.DevelopmentConfig")

    from app.app import bp

    app.register_blueprint(bp)

    return app
