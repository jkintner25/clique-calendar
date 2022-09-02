from .db import db
from .user import User

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    msg = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="CASCADE"), nullable=False)
    username = db.Column(db.String(100))
    calendar_id = db.Column(db.Integer, db.ForeignKey(
        'calendars.id', ondelete='CASCADE'), nullable=False)
    created_at = db.Column(db.DateTime)

    user = db.relationship('User', back_populates='messages')

    def to_dict(self):
        return {
            'id': self.id,
            'msg': self.msg,
            'userId': self.user_id,
            'username': self.username,
            'calendarId': self.calendar_id,
            'createdAt': self.created_at
        }
