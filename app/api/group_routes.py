from flask import Blueprint, session, request
from flask_login import login_required, current_user


from app.models import db, BudgetGroup
from app.forms.group_form import GroupForm, GroupUpdateForm

group_routes = Blueprint('budget_groups', __name__)


# CREATE NEW BUDGET GROUP
@group_routes.route('/', methods=['POST'])
@login_required
def new_group():
    # 1. Get user from session
    user = current_user

    # 2. Prepare form data for validation
    form = GroupForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # 3. Validate form data; if invalid return 400 bad request to user
    if not form.validate_on_submit():
        return {"message": "validation_errors", "data": form.errors}, 400

    # 4. If valid then extract useful data from form
    title = form.data['title']
    month_int = form.data['month_int']
    year_int = form.data['year_int']

    # 5. Create the budget group
    group = BudgetGroup(user_id=user.id, title=title,
                        month_int=month_int, year_int=year_int)

    # 6. Add and commit the budget group
    db.session.add(group)
    db.session.commit()

    # 7. Send 201 response to the user
    return {"message": "success", "data": group.to_dict()}, 201


# READ GROUPS FOR CURRENT USER
@group_routes.route('/', methods=['GET'])
@login_required
def get_groups():
    # 1. gets user from session
    user = current_user

    # 2. finds groups based off of user.id
    user_groups = BudgetGroup.query.filter(
        BudgetGroup.user_id == user.id)
    # for every item that has a transaction get the sum of the transaction totals
    # 

    # 3. returns users groups
    return {"message": "success", "user_groups": [group.to_dict() for group in user_groups]}, 200


# UPDATE GROUP TITLE
@group_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_group(id):

    # 1. creates form, adds csrf token
    form = GroupUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    # 2. find group by id and add month and year to form
    group = BudgetGroup.query.get(id)
    form['month_int'].data = group.month_int
    form['year_int'].data = group.year_int

    # 3. Validate form data; if invalid return 400 bad request to user
    if not form.validate_on_submit():
        return {"message": "validation_errors", "data": form.errors}, 400

    # 4. If valid then extract title form
    title = form.data['title']

    # 5. update group title and commit changes to database
    group.title = title
    db.session.commit()

    # 6. Return message with updated group and a 201 response
    return {"message": "success", "data": group.to_dict()}, 201


# DELETE SPECIFIED GROUP
@group_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_group(id):
    # 1. Find group by id
    group = BudgetGroup.query.get(id)

    # 2. if group exists, delete and commit, else return msg
    if group:
        db.session.delete(group)
        db.session.commit()
        return {"message": " group was successfully deleted"}, 200
    else:
        return {"message": "group does not exist"}, 404


# create default groups
