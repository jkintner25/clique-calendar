from .db import db

subscription = db.Table('subscriptions',
    db.Column('calendar_id', db.Integer, db.ForeignKey('calendars.id')),
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'))
)

class Calendar(db.Model):
    __tablename__ = 'calendars'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(30), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        'users.id'), nullable=False)
    subscribers = db.relationship('User', secondary=subscription, back_populates='calendars')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'userId': self.user_id
        }
