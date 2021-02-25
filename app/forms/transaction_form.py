from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, FloatField
from wtforms.validators import DataRequired, ValidationError


class TransactionForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    amount = FloatField('amount')
    date = DateField('Due Date', validators=[DataRequired()])
