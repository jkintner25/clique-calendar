from .db import db

class Event(db.Model):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(255))
    start_date = db.Column(db.Date(), nullable=False)
    end_date = db.Column(db.Date(), nullable=False)
    start_time = db.Column(db.Time(), nullable=False)
    end_time = db.Column(db.Time(), nullable=False)
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
            'start_date': self.start_date,
            'end_date': self.end_date,
            'start_time': self.start_time,
            'end_time': self.end_time,
            'userId': self.user_id,
            'calendarId': self.calendar_id
        }
