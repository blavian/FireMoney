from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user


from app.models import db, BudgetGroup, User


month_routes = Blueprint('months', __name__)


@month_routes.route('/', methods=['POST'])
@login_required
def new_month():

    # TODO: Read CSRF token...needed for POST requests

    # 1. Get user from session and data from request
    user = current_user
    month_int = request.json['month_int']
    year_int = request.json['year_int']

    # 2. Handle out of range month integer
    if month_int < 1 or month_int > 12:
        return {
            "message": "month_out_of_range"
        }, 400

    # 3. Handle yearly carryover
    previous_month = month_int - 1 if month_int > 1 else 12
    current_month = month_int
    previous_year = year_int if month_int != 1 else year_int - 1
    current_year = year_int

    # 4. Return bad request if new month already exists
    new_month_already_exists = BudgetGroup.query.filter(
        BudgetGroup.user_id == user.id,
        BudgetGroup.month_int == current_month,
        BudgetGroup.year_int == current_year).first()
    if new_month_already_exists:
        return { 
            "message": "month_already_exists"
        }, 400

    # 5. Return bad request if previous month does not exist
    previous_month_does_not_exist = BudgetGroup.query.filter(
        BudgetGroup.user_id == user.id,
        BudgetGroup.month_int == previous_month,
        BudgetGroup.year_int == previous_year).first() is None
    if previous_month_does_not_exist:
        return {
            "message": "previous_month_does_not_exist"
        }, 400

    # 6. Create new groups for current month and add/commit to database
    current_month_groups = []
    for group in user.groups:
        current_month_group = BudgetGroup(
            user_id=user.id, title=group.title, month_int=current_month, year_int=current_year)
        current_month_groups.append(current_month_group)
        db.session.add(current_month_group)
    db.session.commit()

    # 7. Send new month(groups) and 201 (successful creation) response
    return {
        "message": "success",
        "data": {
            "month_int": month_int,
            "year_int": year_int,
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
    current_groups = list(filter(lambda x: x.month_int == int(month_int) and
                                           x.year_int == int(year_int), user.groups))

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
            "groups": [group.to_dict() for group in current_groups]
        }
    }, 200
