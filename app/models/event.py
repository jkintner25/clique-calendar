from .db import db

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(20), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="CASCADE"), nullable=False)
    calendarId = db.Column(db.Integer, db.ForeignKey(
        'calendars.id', ondelete='CASCADE'), nullable=False)

    user = db.relationship('User', back_populates='events')
