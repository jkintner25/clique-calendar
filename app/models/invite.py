from .db import db

class Invite(db.Model):
    __tablename__ = 'invites'

    id = db.Column(db.Integer, primary_key=True)
    calendar_id = db.Column(db.Integer, nullable=False)
    calendar_title = db.Column(db.String(60), nullable=False)
    sender_id = db.Column(db.Integer, nullable=False)
    sender_username = db.Column(db.String(60), nullable=False)
    recipient_id = db.Column(db.Integer, nullable=False)
    message = db.Column(db.String(60))
    accepted = db.Column(db.Boolean)

    def to_dict(self):
        return {
            'id': self.id,
            'calendarId': self.calendar_id,
            'calendarTitle': self.calendar_title,
            'senderId': self.sender_id,
            'senderUsername': self.sender_username,
            'recipientId': self.recipient_id,
            'message': self.message
        }
