from .db import db


class BudgetGroup(db.Model):
    __tablename__ = 'budget_groups'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(25), nullable=False)
    month_int = db.Column(db.Integer, nullable=False)
    year_int = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    createdAt = db.Column(db.DateTime, server_default=db.func.now())
    updatedAt = db.Column(db.DateTime, server_default=db.func.now())

    items = db.relationship("BudgetItem", backref="budget_groups")

    def to_dict(self):
        return {
            "title": self.title,
            "month_int": self.month_int,
            "year_int": self.year_int,
            "user_id": self.user_id,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
