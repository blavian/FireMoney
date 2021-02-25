from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    email = db.Column(db.String(256), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    # Private property get/set
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    # Associations
    _groups = db.relationship("BudgetGroup", back_populates="_user")

    # Association properties
    @property
    def groups(self):
        return [x.to_dict() for x in _groups]

    # Scope
    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "groups": self.groups,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
