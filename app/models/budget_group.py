from .db import db


class BudgetGroup(db.Model):
    def __init__(self, user_id, title, month_int, year_int):
        self.user_id = user_id
        self.title = title
        self.month_int = month_int
        self.year_int = year_int

    __tablename__ = 'budget_groups'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(25), nullable=False)
    month_int = db.Column(db.Integer, nullable=False)
    year_int = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(db.DateTime, server_default=db.func.now())

    items = db.relationship("BudgetItem", backref="budget_groups")

    def to_dict(self):
        return {
            "title": self.title,
            "month_int": self.month_int,
            "year_int": self.year_int,
            "user_id": self.user_id,
            "created_at": self.createdAt,
            "updated_at": self.updatedAt,
        }

    def to_dict_on_create(self):
        return {
            "title": self.title,
            "created_at": self.createdAt
        }
