from .db import db


class BudgetItem(db.Model):
    __tablename__ = 'budget_items'

    id = db.Column(db.Integer, primary_key=True)
    group_id = db.Column(db.Integer,
                         db.ForeignKey('budget_groups.id'), nullable=False)
    title = db.Column(db.String(25), nullable=False)
    description = db.Column(db.String(50))
    expected_amount = db.Column(db.Float(3, 2), nullable=False)
    due_date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    # Associations
    _group = db.relationship("BudgetGroup", back_populates="_items")
    _transactions = db.relationship("Transaction", back_populates="_item")

    # Association properties
    @property
    def group(self):
        return _group.to_dict()

    @property
    def items(self):
        return [x.to_dict() for x in self._transactions]

    # Scope
    def to_dict(self):
        return {
            "id": self.id,
            "group_id": self.group_id,
            "title": self.title,
            "description": self.description,
            "expected_amount": str(self.expected_amount),
            "due_date": self.due_date,
            "parent_group": self.group,
            "transactions": self.transactions,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
