from .db import db


class Budget_Item(db.Model,):
    __tablename__ = 'budget_items'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(25), nullable=False)
    description = db.Column(db.String(50))
    expected_amount = db.Column(db.Float(3, 2), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey(
        'budget_group.id'), nullable=False)
    due_date = db.Column(db.Date)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(db.DateTime, server_default=db.func.now())
    groups = db.relationship("Budget_Group", backref='budget_items')

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "expected_amount": self.expected_amount,
            "total_paid": self.total_paid,
            "month_id": self.month_id,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            "groups": self.groups,
        }
