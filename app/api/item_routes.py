from flask import Blueprint
from flask_login import login_required
from app.models import db, Budget_Item

item_routes = Blueprint('budget_items', __name__)

# FIND ALL BUDGET ITEMS
@item_routes.route('/')
@login_required
def items():
    items = Budget_Item.query.all()
    return {"items": [item.to_dict() for item in items]}

# FIND BUDGET ITEM BY ID
@item_routes.route('/<int:id>')
@login_required
def item(id):
    item = Budget_Item.query.get(id)
    return item.to_dict()

# FIND BUDGET ITEMS BY GROUP ID


# POST NEW BUDGET_ITEM
