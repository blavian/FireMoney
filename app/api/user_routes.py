from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User

user_routes = Blueprint('users', __name__)

# FIND ALL USERS
@user_routes.route('')
@login_required
def users():
    users = User.query.all()
    return {"users": [user.to_dict() for user in users]}

# FIND USER BY ID
@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
