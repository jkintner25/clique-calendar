from .db import db

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(255))
    start_date = db.Column(db.String(100), nullable=False)
    end_date = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id', ondelete="CASCADE"), nullable=False)
    calendar_id = db.Column(db.Integer, db.ForeignKey(
        'calendars.id', ondelete='CASCADE'), nullable=False)

    user = db.relationship('User', back_populates='events')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'startDate': self.start_date,
            'endDate': self.end_date,
            'userId': self.user_id,
            'calendarId': self.calendar_id
        }
