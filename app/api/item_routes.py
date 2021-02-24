from app.forms.item_form import ItemForm
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, BudgetItem

item_routes = Blueprint('budget_items', __name__)

# FIND ALL BUDGET ITEMS
@item_routes.route('/')
@login_required
def items():
    items = BudgetItem.query.all()
    return {"items": [item.to_dict() for item in items]}

# FIND BUDGET ITEM BY ID
@item_routes.route('/<int:id>')
@login_required
def item(id):
    item = BudgetItem.query.get(id)
    return item.to_dict()


# CREATE BUDGET ITEMS
@item_routes.route('/', methods=['POST'])
@login_required
def new_item():
    # 1. Get user from session
    user = current_user

    # 2. Prepare form data for validation
    form = ItemForm()
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



# READ BUDGET ITEMS BY GROUP ID

# UPDATE BUDGET ITEM

# DELETE BUDGET ITEM
