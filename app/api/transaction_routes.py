from flask import Blueprint
from flask_login import login_required
from app.models import db, Transaction

transaction_routes = Blueprint('transactions', __name__)

# FIND ALL TRANSACTIONS
@transaction_routes.route('/')
@login_required
def transactions():
    transactions = Transaction.query.all()
    return {"transactions": [transaction.to_dict() for transaction in transactions]}

# FIND TRANSACTION BY ID
@transaction_routes.route('/<int:id>')
@login_required
def transaction(id):
    transaction = Transaction.query.get(id)
    return transaction.to_dict()


# FIND TRANSACTIONS FOR SPECIFIED MONTH AND USER
