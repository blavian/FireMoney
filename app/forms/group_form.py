from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Budget_Group


def group_exists(form, field):
    print("Checking if group already exits", field.data)
    title = field.data

    group = Budget_Group.query.filter(Budget_Group.title == title,
                                    Budget_Group.month_int == month_int,
                                    Budget_Group.year_int == year_int).first()
    if group:
        raise ValidationError("Group is already created for this month")

class GroupForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), group_exists])
