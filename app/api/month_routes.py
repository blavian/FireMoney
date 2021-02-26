from flask import Blueprint, request
from flask_login import login_required, current_user


from app.models import db, BudgetGroup, User


month_routes = Blueprint('months', __name__)


@month_routes.route('', methods=['POST'])
@login_required
def new_month():

    # TODO: Read CSRF token...needed for POST requests

    # 1. Get user from session and data from request
    user = current_user
    month_int = int(request.json['month_int'])
    year_int = int(request.json['year_int'])
    copy_previous = request.json['copy_previous']

    # 2. Handle out of range month integer
    if month_int < 1 or month_int > 12:
        return {
            "message": "month_out_of_range"
        }, 400

    # 3. Handle yearly carryover
    next_month = month_int + 1 if month_int < 12 else 1
    current_month = month_int
    next_year = year_int if month_int < 12 else year_int + 1
    current_year = year_int

    # 4. Return bad request if next month already exists
    new_month_already_exists = BudgetGroup.query.filter(
        BudgetGroup.user_id == user.id,
        BudgetGroup.month_int == next_month,
        BudgetGroup.year_int == next_year).first()
    if new_month_already_exists:
        return {
            "message": "month_already_exists"
        }, 400

    # 5. Return bad request if current month does not exist
    previous_month_does_not_exist = BudgetGroup.query.filter(
        BudgetGroup.user_id == user.id,
        BudgetGroup.month_int == current_month,
        BudgetGroup.year_int == current_year).first() is None
    if previous_month_does_not_exist:
        return {
            "message": "previous_month_does_not_exist"
        }, 400

    user_groups = BudgetGroup.query.filter(
        BudgetGroup.user_id == user.id,
        BudgetGroup.month_int == current_month,
        BudgetGroup.year_int == current_year).all()


    # 6. Create new groups for current month and add/commit to database
    current_month_groups = []
    if copy_previous is True:
        for group in user_groups:
            current_month_group = BudgetGroup(
                user_id=user.id, title=group.title, month_int=next_month, year_int=next_year)
            current_month_groups.append(current_month_group)
            db.session.add(current_month_group)
        db.session.commit()

    # 7. Send new month(groups) and 201 (successful creation) response
    return {
        "message": "success",
        "data": {
            "month_int": next_month,
            "year_int": next_year,
            "groups": [group.to_dict() for group in current_month_groups]
        }
    }, 201


@month_routes.route('', methods=['GET'])
@login_required
def months():

    # 1. Get user from session and data from request
    user = current_user
    month_int = request.args.get("month_int")
    year_int = request.args.get("year_int")

    # 2. Get users groups for specified month/year
    current_groups = [x.to_dict() for
                      x in BudgetGroup.query.filter(BudgetGroup.user_id == user.id,
                                                    BudgetGroup.month_int == month_int,
                                                    BudgetGroup.year_int == year_int)]

    # 3. Return bad request if current month does not exist
    month_does_not_exist = True if not current_groups else False
    if month_does_not_exist:
        return {
            "message": "month_does_not_exist"
        }, 400

    # 4. Return user groups
    return {
        "message": "success",
        "data": {
            "month_int": month_int,
            "year_int": year_int,
            "groups": current_groups
        }
    }, 200
