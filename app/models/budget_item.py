from .db import db


class BudgetItem(db.Model):
    __tablename__ = 'budget_items'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(25), nullable=False)
    description = db.Column(db.String(50))
    expected_amount = db.Column(db.Float(3, 2), nullable=False)
    group_id = db.Column(db.Integer, db.ForeignKey('budget_groups.id'), nullable=False)
    due_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    group = db.relationship("BudgetGroup", back_populates="_items")

    def to_dict(self):
        return {
            "title": self.title,
            "description": self.description,
            "expected_amount": str(self.expected_amount),
            "group_id": self.group_id,
            "due_date": self.due_date,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
