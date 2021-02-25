from .db import db


class Transaction(db.Model):
    __tablename__ = 'transactions'

    id = db.Column(db.Integer, primary_key=True)
    item_id = db.Column(db.Integer, db.ForeignKey('budget_items.id'), nullable=False)
    title = db.Column(db.String(25), nullable=False)
    amount = db.Column(db.Float(3, 2), nullable=False, default=0)
    date = db.Column(db.Date)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    # Association properties
    @property
    def item(self):
        return self._item.to_dict()

    # Scope
    def to_dict(self):
        return {
            "id": self.id,
            "item_id": self.item_id,
            "title": self.title,
            "amount": str(self.amount),
            "date": self.date,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
