from flask import Blueprint, jsonify, session, request
from app.models import User, db, BudgetGroup
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

from datetime import date

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}, 401


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    print(request.get_json())
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return {'message': 'success', 'data': user.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()

        # find todays date
        today = date.today()
        # find month
        month_int = today.month
        # find year
        year_int = today.year

    #   create budget groups with user.id, month, year
    #       'Groceries'
        group1 = BudgetGroup(user_id=user.id, title='Groceries',
                        month_int=month_int, year_int=year_int)
    #       'Automotive'
        group2 = BudgetGroup(user_id=user.id, title='Automotive',
                        month_int=month_int, year_int=year_int)
    #       'Homegoods'
        group3 = BudgetGroup(user_id=user.id, title='Homegoods',
                        month_int=month_int, year_int=year_int)
    #       'Eating Out'
        group4 = BudgetGroup(user_id=user.id, title='Eating Out',
                        month_int=month_int, year_int=year_int)
    #       'Travel'
        group5 = BudgetGroup(user_id=user.id, title='Travel',
                        month_int=month_int, year_int=year_int)

        db.session.add_all([group1, group2, group3, group3, group4, group5])
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
