from .db import db

class Invite(db.Model):
    __tablename__ = 'invites'

    id = db.Column(db.Integer, primary_key=True)
    calendar_id = db.Column(db.Integer, nullable=False)
    sender_id = db.Column(db.Integer, nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)
    message = db.Column(db.String(60))

    def to_dict(self):
        return {
            'id': self.id,
            'calendarId': self.calendar_id,
            'senderId': self.sender_id,
            'recipientId': self.recipient_id,
            'message': self.message
        }
