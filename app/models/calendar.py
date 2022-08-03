from .db import db

class Calendar(db.Model):
    __tablename__ = 'calendars'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="CASCADE"), nullable=False)

    user = db.relationship('User', back_populates='calendars')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'userId': self.user_id
        }
