from flask import Blueprint
import json

bp = Blueprint("app", __name__)


@bp.route("/")
def home():
    return "This is a Python Flask Application"


@bp.route("/sample")
def sample():
    with open("app/sample.json") as file:
        return json.load(file)
