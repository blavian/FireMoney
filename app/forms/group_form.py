from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Budget_Group


def group_exists(form, field):
    print("Checking if group already exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("User is already registered.")


class GroupForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    month_int = IntegerField('month', validators=[DataRequired(), group_exists])
    year_int = IntegerField('year', validators=[DataRequired()])
