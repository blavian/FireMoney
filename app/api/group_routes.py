from flask import Blueprint
from flask_login import login_required
from app.models import db, BudgetGroup

group_routes = Blueprint('budget_groups', __name__)

# FIND ALL BUDGET_GROUPS
@group_routes.route('/')
@login_required
def groups():
    groups = BudgetGroup.query.all()
    return {"groups": [group.to_dict() for group in groups]}

# FIND BUDGET_GROUP BY ID
@group_routes.route('/<int:id>')
@login_required
def group(id):
    group = BudgetGroup.query.get(id)
    return group.to_dict()

#FIND GROUPS FOR SPECIFIED MONTH AND USER


#POST NEW GROUP
# @group_routes.route('/new', methods=['POST'])
# def new_group():
#     """
#     creates a new budget_group
#     """
#     get userId from session?
#     Receive month_int & year_int from...route interpolation?
#     Receive title from input

#     group = Budget_Group(title=,
#                     month_int=,
#                     year_int=,
#                     user_id=,
#                     )
#     db.session.add(group)
#     db.session.commit()
#     return
