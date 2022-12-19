from flask import Flask
from flask_cors import CORS


def create_app(config=None):
    app = Flask(__name__)
    app.config.from_object(config or "app.config.DevelopmentConfig")

    cors = CORS()

    from app.app import bp

    app.register_blueprint(bp)
    cors.init_app(app)

    return app
