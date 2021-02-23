from flask import Blueprint, session, request
from flask_login import login_required, current_user


from app.models import db, BudgetGroup
from app.forms.group_form import GroupForm

group_routes = Blueprint('budget_groups', __name__)


# @group_routes.route('/', methods=['GET'])
# @login_required
# def groups():
#     groups = BudgetGroup.query.all()
#     return {"groups": [group.to_dict() for group in groups]}


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
