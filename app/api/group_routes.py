from flask import Blueprint, session, request
from flask_login import login_required, current_user


from app.models import db, BudgetGroup
from app.forms.group_form import GroupForm,GroupUpdateForm

group_routes = Blueprint('budget_groups', __name__)


@group_routes.route('/', methods=['POST'])
@login_required
# Create (POST) a new budget group
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
    return {"message": "success", "data": group.to_dict_on_create()}, 201


@group_routes.route('/', methods=['GET'])
@login_required
def get_groups():
    user = current_user
    user_groups = BudgetGroup.query.filter(
        BudgetGroup.user_id == user.id
    )
    return {"user_groups": [group.to_dict() for group in user_groups]}


# http://localhost:5000/api/month?month_int=11&year_int=2021
# get all groups based on month, year, userId
# get group based on month and year
# @group_routes.route('/', methods=['GET'])
# @login_required
# def groups():
#     user = current_user
#     user_groups = BudgetGroup.query.filter(
#         BudgetGroup.user_id == user.id,
#         BudgetGroup.month_int == month_int,

#     )
#     return {"user_groups": [group.to_dict() for group in user_groups]}


# update title
# get month_int and year_int from group id
@group_routes.route('/<int:id>', methods=['PATCH'])
@login_required
def update_group(id):
    form = GroupUpdateForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    group = BudgetGroup.query.get(id)
    form['month_int'].data = group.month_int 
    form['year_int'].data = group.year_int 
    # do this month_int and year_int
    # 3. Validate form data; if invalid return 400 bad request to user
    if not form.validate_on_submit():
        return {"message": "validation_errors", "data": form.errors}, 400

    # 4. If valid then extract useful data from form
    title = form.data['title']
    group.title = title

    db.session.commit()

    # 7. Send 201 response to the user
    return {"message": "success", "data": group.to_dict_on_create()}, 201


@group_routes.route('/<int:id>/delete', methods=['GET'])
@login_required
def delete_group():
    group = BudgetGroup.query.get(id)
    db.session.delete(group)
    db.session.commit()
    return


# create default groups
