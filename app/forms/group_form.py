from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import BudgetGroup


def group_exists(form, field):
    print("Checking if group already exits", field.data)
    title = field.data

    group = BudgetGroup.query.filter(BudgetGroup.title == title,
                                        BudgetGroup.month_int == form.data.month_int,
                                        BudgetGroup.year_int == form.data.year_int).first()
    if group:
        raise ValidationError("Group is already created for this month")


class GroupForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), group_exists])
