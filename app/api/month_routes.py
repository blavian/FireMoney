from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User, BudgetGroup
month_routes = Blueprint('months', __name__)


# http://localhost:5000/api/month?month_int=11&year_int=2021
# get all groups based on month, year, userId
# get group based on month and year
@month_routes.route('/', methods=['GET'])
@login_required
def months():
    month_int = request.args.get("month_int")
    year_int = request.args.get("year_int")
    user = current_user
    user_groups = BudgetGroup.query.filter(
        BudgetGroup.user_id == user.id,
        BudgetGroup.month_int == month_int,
        BudgetGroup.year_int == year_int
    )
    return {"user_groups": [group.to_dict() for group in user_groups]}


@month_routes.route('/', methods=['POST'])
@login_required
# Create (POST) a new budget group
def new_month():
    # 1. Get user from session
    user = current_user
    month_int = request.json("month_int")
    year_int = request.json("year_int")
    print(month_int,year_int)

    user_groups = BudgetGroup.query.filter(
        BudgetGroup.user_id == user.id,
        BudgetGroup.month_int == month_int,
        BudgetGroup.year_int == year_int
    )
    if month_int == 12:
        month_int = 1,
        year_int = year_int + 1
    else:
        month_int = month_int + 1


# 5. Create the budget group
    for group in user_groups:
        new_group = BudgetGroup(
            user_id=user.id, title=group.title, month_int=month_int, year_int= year_int)

# 6. Add and commit the budget group
        db.session.add(new_group)
    db.session.commit()

# 7. Send 201 response to the user
    return {"user_groups": [group.to_dict() for group in user_groups]}
