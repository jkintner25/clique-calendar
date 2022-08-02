from .db import db

class Message(db.Model):
    __tablename__ = 'messages'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(100), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="CASCADE"), nullable=False)
    calendarId = db.Column(db.Integer, db.ForeignKey(
        'calendars.id', ondelete='CASCADE'), nullable=False)

    user = db.relationship('User', back_populates='messages')
