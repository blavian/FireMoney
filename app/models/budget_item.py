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
    _transactions = db.relationship(
        "Transaction", backref="budget_items", cascade="all, delete-orphan")

    # Association properties
    @property
    def transactions(self):
        return [x.to_dict() for x in self._transactions]

    @property
    def date(self):
        return self.due_date.isoformat()

    # Scope
    def to_dict(self):
        return {
            "id": self.id,
            "groupId": self.group_id,
            "title": self.title,
            "description": self.description,
            "expectedAmount": str(self.expected_amount),
            "dueDate": self.date,
            "transactions": self.transactions,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
