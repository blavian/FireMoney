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
    group_id = request.json['group_id']
    
    # 3. Validate form data; if invalid return 400 bad request to user
    if not form.validate_on_submit():
        return {"message": "validation_errors", "data": form.errors}, 400

    # 4. If valid then extract useful data from form
    title = form.data['title']
    description = form.data['description']
    expected_amount = form.data['expected_amount']
    due_date = form.data['due_date']

    # 5. Create the budget group
    item = BudgetItem(title=title,
                      description=description,
                      expected_amount=expected_amount,
                      group_id=group_id,
                      due_date=due_date)

    # 6. Add and commit the budget group
    db.session.add(item)
    db.session.commit()

    # 7. Send 201 response to the user
    return {"message": "success", "data": item.to_dict()}, 201







# FIND TRANSACTIONS FOR SPECIFIED MONTH AND USER

# User.groups --> find all budget groups for specific month/year
# BudgetGroup.items --> loop through and find ids of items -->
# find transaction.item_id == item.id
# sort by descending date
# return all transactions in to_dict
