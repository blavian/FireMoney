from app.forms.item_form import ItemForm
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, BudgetItem

item_routes = Blueprint('budget_items', __name__)


# CREATE BUDGET ITEMS
@item_routes.route('', methods=['POST'])
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

 # UPDATE  BUDGET ITEMS BY ID


@item_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_items(id):

    # 1. creates form, adds csrf token
    form = ItemForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # 2. find item by id and
    item = BudgetItem.query.get(id)

    # 3. Validates form data; if invalid return 400 bad request to user
    if not form.validate_on_submit():
        return {"message": "validation_errors", "data": form.errors}, 400

    # 4. If valid then extract information from the user's input
    title = form.data['title']
    description = form.data['description']
    expected_amount = form.data['expected_amount']
    due_date = form.data['due_date']

    # 5. updates the item  and commits the changes to the database
    item.title = title
    item.description = description
    item.expected_amount = expected_amount
    item.due_date = due_date
    db.session.commit()

    # 6. Returns message with updated item and a 201 response
    return {"message": "success", "data": item.to_dict()}, 201


# DELETE BUDGET ITEM
@item_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_item(id):
    # 1. Find item by id
    item = BudgetItem.query.get(id)
    groupId = item.group_id
    data = item.to_dict()
    # 2. if item exists, delete and commit, else return msg
    if item:
        db.session.delete(item)
        db.session.commit()
        return {"message": "successfully deleted", "data": data }, 200
    else:
        return {"message": "item does not exist"}, 404
