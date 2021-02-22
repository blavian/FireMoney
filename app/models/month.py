from .db import db


class Month(db.Model):
    __tablename__ = 'months'

    id = db.Column(db.Integer, primary_key=True)
    month_int = db.Column(db.Integer(40), nullable=False)
    year_int = db.Column(db.Integer(40), nullable=False)
    total_amount = db.Column(db.Float(3, 2), nullable=False, default=0)
    total_paid = db.Column(db.Float(3, 2), nullable=False, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    createdAt = db.Column(db.DateTime)
    updatedAt = db.Column(db.DateTime)

    def to_dict(self):
        return {
            "month_int": self.month_int,
            "year_int": self.year_int,
            "total_amount": self.total_amount,
            "total_paid": self.total_paid,
            "user_id": self.user_id,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
