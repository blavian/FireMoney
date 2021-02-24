from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, BudgetGroup
month_routes = Blueprint('months', __name__)


# CREATE NEW MONTH FROM PREVIOUS
@month_routes.route('/', methods=['POST'])
@login_required
def new_month():

    # 1. Get user from session and data from request
    user = current_user
    month_int = request.json['month_int']
    year_int = request.json['year_int']

    # 2. Get all the users groups from last month
    user_groups = BudgetGroup.query.filter(
        BudgetGroup.user_id == user.id,
        BudgetGroup.month_int == month_int,
        BudgetGroup.year_int == year_int)

    # 3. Conditional to determine if we need to update the year
    if month_int == 12:
        month_int = 1,
        year_int = year_int + 1
    else:
        month_int = month_int + 1

    # 4. creates new groups for next month and adds/commits to database
    new_groups = []
    for group in user_groups:
        new_group = BudgetGroup(
            user_id=user.id, title=group.title, month_int=month_int, year_int=year_int)
        new_groups.append(new_group)
        db.session.add(new_group)
    db.session.commit()

# 7. Send new month(groups) and 201 (successful creation) response
    return {"message": "success", "user_groups": [group.to_dict() for group in new_groups]}, 201



# READ CURRENT MONTH GROUPS
@month_routes.route('/', methods=['GET'])
@login_required
def months():

    # 1. Get month and year from url and user from session
    month_int = request.args.get("month_int")
    year_int = request.args.get("year_int")
    user = current_user

    # 2. Get users groups for specified month/year
    user_groups = BudgetGroup.query.filter(
        BudgetGroup.user_id == user.id,
        BudgetGroup.month_int == month_int,
        BudgetGroup.year_int == year_int)

    # 3. Return user groups
    return {"message": "success", "user_groups": [group.to_dict() for group in user_groups]}, 200
