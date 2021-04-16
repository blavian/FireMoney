from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import db, User, BudgetGroup, BudgetItem, Transaction

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

# FIND ALL TRANSACTIONS BY USER
@user_routes.route('/<int:id>/transactions')
@login_required
def user_transactions(id):
    
    # 1. Querying all budget groups for user
    budget_groups = BudgetGroup.query.filter(BudgetGroup.user_id == id).all()

    data = {}
    
    for group in budget_groups:
        for item in group.items:
            if len(item['transactions']) > 0:
                for transaction in item['transactions']:
                    data.update({transaction['id']:transaction})

    return {
        "data": {
            'transactions':data
            }
        }, 200
