from .db import db


class BudgetGroup(db.Model):
    def __init__(self, user_id, title, month_int, year_int):
        self.user_id = user_id
        self.title = title
        self.month_int = month_int
        self.year_int = year_int

    __tablename__ = 'budget_groups'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    title = db.Column(db.String(25), nullable=False)
    month_int = db.Column(db.Integer, nullable=False)
    year_int = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    # Associations
    _items = db.relationship(
        "BudgetItem", backref="budget_groups", cascade="all, delete-orphan")

    # Association properties
    @property
    def items(self):
        return [x.to_dict() for x in self._items]

    # Scope
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "userId": self.user_id,
            "title": self.title,
            "monthInt": self.month_int,
            "yearInt": self.year_int,
            "items": self.items,
            "createdAt": self.created_at,
            "updatedAt": self.updated_at,
        }
    def month_to_dict(self):
        return {
            "monthInt": self.month_int,
            "yearInt": self.year_int,
            
        }

