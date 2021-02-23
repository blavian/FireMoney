from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, FloatField
from wtforms.validators import DataRequired, ValidationError
from app.models import Budget_Item


class TransactionForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    amount = FloatField('amount')
    expected_amount = FloatField('Expected Amount', validators=[DataRequired()])
    due_date = DateField('Due Date', validators=[DataRequired()])
