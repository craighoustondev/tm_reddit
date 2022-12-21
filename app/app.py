from flask import Blueprint, request
import json

MAX_PAGE_SIZE = 5

bp = Blueprint("app", __name__)


@bp.route("/")
def home():
    return "This is a Python Flask Application"


@bp.route("/sample")
def sample():
    with open("app/sample.json") as file:
        return json.load(file)

@bp.route("/submissions")
def submissions():
    with open("app/submissions.json") as file:
        page = request.args.get('page', type=int)
        submissions = json.load(file)
        if page:
            if page == 1:
                submissions = submissions[0:MAX_PAGE_SIZE]
            else:
                submissions = submissions[(MAX_PAGE_SIZE * (page - 1)):MAX_PAGE_SIZE * page]
        return submissions
