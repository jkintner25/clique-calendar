from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError

from app.models.user import User

def message_length(form, field):
    message = field.data
    if message and len(message) > 60:
        raise ValidationError(
            'Message length cannot exceed 60 characters.'
        )

def email_validator(form, field):
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user is None:
        raise ValidationError(
            'Email address not found.'
        )

class InviteForm(FlaskForm):
    calendarId = IntegerField('calendarId', validators=[DataRequired(message='You must select a calendar.')])
    recipientEmail = StringField('recipientEmail', validators=[DataRequired(message='Please provide recipient\'s email address.'), email_validator])
    senderId = IntegerField('senderId', validators=[DataRequired(message='Didn\t receive sender ID.')])
    message = StringField('message', validators=[message_length])
