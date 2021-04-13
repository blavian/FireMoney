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
    budget_groups = BudgetGroup.query.filter(BudgetGroup.user_id == id).all()
    budget_group_ids = [budget_group.id for budget_group in budget_groups]
    transactions_obj = {}
    for group_id in budget_group_ids:
        i = BudgetItem.query.get(group_id)
        if i is not None:
            i.to_dict()
            transactions = Transaction.query.filter(
                Transaction.item_id == i.id).all()
            if len(transactions) > 0:
                transactions_obj.update(
                    {i.id: [transaction.to_dict() for transaction in transactions]})

    return {"transactions": transactions_obj}
