from app.forms.transaction_form import TransactionForm
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, Transaction
from app.forms.transaction_form import TransactionForm
transaction_routes = Blueprint('transactions', __name__)

# FIND ALL TRANSACTIONS BY MONTH
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


# CREATE BUDGET ITEMS
@transaction_routes.route('/', methods=['POST'])
@login_required
def new_transaction():
    # 1. Get user from session
    user = current_user

    # 2. Prepare form data for validation
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    item_id = request.json['item_id']

    # 3. Validate form data; if invalid return 400 bad request to user
    if not form.validate_on_submit():
        return {"message": "validation_errors", "data": form.errors}, 400

    # 4. If valid then extract useful data from form
    title = form.data['title']
    amount = form.data['amount']
    date = form.data['date']

    # 5. Create the budget group
    transaction = Transaction(title=title,
                              amount=amount,
                              item_id=item_id,
                              date=date)

    # 6. Add and commit the budget group
    db.session.add(transaction)
    db.session.commit()

    # 7. Send 201 response to the user
    return {"message": "success", "data": transaction.to_dict()}, 201


 # UPDATE BUDGET TRANSACTION BY ID
@transaction_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_transaction(id):

    # 1. creates form, adds csrf token
    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # 2. find transaction by id and
    transaction = Transaction.query.get(id)

    # 3. Validates form data; if invalid return 400 bad request to user
    if not form.validate_on_submit():
        return {"message": "validation_errors", "data": form.errors}, 400

    # 4. If valid then extract information from the user's input
    title = form.data['title']
    amount = form.data['amount']
    date = form.data['date']

    # 5. updates the transaction  and commits the changes to the database
    transaction.title = title
    transaction.amount = amount
    transaction.date = date
    db.session.commit()

    # 6. Returns message with updated transaction and a 201 response
    return {"message": "success", "data": transaction.to_dict()}, 201





# DELETE BUDGET TRANSACTION
@transaction_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_transaction(id):
    # 1. Find transaction by id
    transaction = Transaction.query.get(id)

    # 2. if transaction exists, delete and commit, else return msg
    if transaction:
        db.session.delete(transaction)
        db.session.commit()
        return {"message": "successfully deleted"}, 200
    else:
        return {"message": "transaction does not exist"}, 404



# User.groups --> find all budget groups for specific month/year
# BudgetGroup.items --> loop through and find ids of items -->
# find transaction.item_id == item.id
# sort by descending date
# return all transactions in to_dict

# READ TRANSACTIONS FOR SPECIFIED MONTH AND USER
# @group_routes.route('/', methods=['GET'])
# @login_required
# def get_groups():
#     # 1. gets user from session
#     user = current_user

#     # 2. finds groups based off of user.id
#     user_groups = BudgetGroup.query.filter(
#         BudgetGroup.user_id == user.id)
#     # for every item that has a transaction get the sum of the transaction totals
#     #

#     # 3. returns users groups
#     return {"message": "success", "user_groups": [group.to_dict() for group in user_groups]}, 200
