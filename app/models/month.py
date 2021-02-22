from .db import db
from flask_login import UserMixin

class Month(db.Model, UserMixin):
  __tablename__ = 'months'

  id = db.Column(db.Integer, primary_key=True)
  month_int = db.Column(db.Integer(40), nullable=False)
  year_int = db.Column(db.Integer(40), nullable=False)
  total_amount = db.Column(db.Float, nullable=False)
  total_paid = db.Column(db.Float, nullable=False)
  user_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable = False)

  def to_dict(self):
    return {
        "month_int": self.month_int,
        "year_int": self.year_int,
        "total_amount": self.total_amount,
        "total_paid": self.total_paid,
        "user_id": self.user_id,
    }
