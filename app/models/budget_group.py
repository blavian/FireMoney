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
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now())

    user = db.relationship("User", back_populates="groups")
    _items = db.relationship("BudgetItem", back_populates="group")

    @property
    def items(self):
        return [item.to_dict() for item in self._items]

    def to_dict(self):
        return {
            "title": self.title,
            "month_int": self.month_int,
            "year_int": self.year_int,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }

    def to_items_list_dict(self):
        return {
            "title": self.title,
            "month_int": self.month_int,
            "year_int": self.year_int,
            "user_id": self.user_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "items": self.items,
        }

    def to_group_created_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "created_at": self.created_at,
            "month_int": self.month_int,
            "year_int": self.year_int
        }
