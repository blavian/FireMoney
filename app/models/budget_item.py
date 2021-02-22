from .db import db
from flask_login import UserMixin


class Budget_Item(db.Model, UserMixin):
    __tablename__ = 'budget_items'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(25), nullable=False)
    description = db.Column(db.String(50))
    amount = db.Column(db.Float(3, 2), nullable=False)
    paid = db.Column(db.Float(3, 2), nullable=False, default=0)
    group_id = db.Column(db.Integer, db.ForeignKey(
        'budget_group.id'), nullable=False)
    createdAt = db.Column(db.DateTime)
    updatedAt = db.Column(db.DateTime)
    groups = db.relationship("Budget_Group", backref='budget_items')

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "total_amount": self.total_amount,
            "total_paid": self.total_paid,
            "month_id": self.month_id,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
