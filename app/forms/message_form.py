from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError

def message_length(form, field):
    message = field.data
    if message and len(message) > 200:
        raise ValidationError(
            'Message length cannot exceed 200 characters.'
        )

class MessageForm(FlaskForm):
    content = StringField('content', validators=[message_length, DataRequired(message='You can\'t send an empty message.')])
    calendarId = IntegerField('calendarId', validators=[DataRequired(message='Select a calendar group.')])
    userId = IntegerField('userId', validators=[DataRequired(message='Couldn\'t find your User ID.')])
