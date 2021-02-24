from .db import db


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(25), nullable=False)
    amount = db.Column(db.Float(3, 2), nullable=False, default=0)
    item_id = db.Column(db.Integer, db.ForeignKey('budget_items.id'), nullable=False)
    date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    def to_dict(self):
        return {
            "title": self.title,
            "amount": self.amount,
            "budget_item_id": self.budget_item_id,
            "date": self.date,
        }
