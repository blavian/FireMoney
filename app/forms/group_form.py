from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired, ValidationError


from app.models import BudgetGroup


def group_exists(form, field):
    title = field.data
    month_int = form.data["month_int"]
    year_int = form.data["year_int"]

    not_unique = BudgetGroup.query.filter(
        BudgetGroup.title == title,
        BudgetGroup.month_int == month_int,
        BudgetGroup.year_int == year_int).first()

    if not_unique:
        raise ValidationError(
            "A group with the provided title already exists for the same budget period."  # pylint: disable=line-too-long
        )


def previous_budget_period_exists(form, field):
    month_int = form.data["month_int"]
    year_int = form.data["year_int"]
    copy_previous = form.data["copy_previous"]

    if copy_previous is True:
        copy_target = BudgetGroup.query.filter(
            BudgetGroup.month_int == (month_int - 1),
            BudgetGroup.year_int == year_int).first()

        copy_target2 = BudgetGroup.query.filter(
            BudgetGroup.year_int == (year_int - 1),
            BudgetGroup.month_int == (month_int + 11)).first()

        if not copy_target and not copy_target2:
            raise ValidationError(
                "A previous active budget period is necessary to create a new budget group."  # pylint: disable=line-too-long
            )


class GroupForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), group_exists])
    month_int = IntegerField('month_int', validators=[DataRequired()])
    year_int = IntegerField('year_int', validators=[DataRequired()])
    copy_previous = BooleanField('copy_previous', validators=[previous_budget_period_exists])


# create new group form
# group create form and group update form


class GroupUpdateForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), group_exists])
    month_int = IntegerField('month_int', validators=[DataRequired()])
    year_int = IntegerField('year_int', validators=[DataRequired()])
