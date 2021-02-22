from .db import db


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(25), nullable=False)
    amount = db.Column(db.Float(3, 2), nullable=False, default=0)
    budget_item_id = db.Column(db.Integer, db.ForeignKey(
        'budget_item.id'), nullable=False)
    date = db.Column(db.Date)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(db.DateTime, server_default=db.func.now())
    items = db.relationship("Budget_Items", backref="transactions")

    def to_dict(self):
        return {
            "title": self.title,
            "amount": self.amount,
            "budget_item_id": self.budget_item_id,
            "date": self.date,
            "items": self.items,
        }