from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TimeField
from wtforms.validators import DataRequired
from .calendar_form import title_length

class EventForm(FlaskForm):
    title = StringField('title', nullable=False, validators=[DataRequired(), title_length])
    date = DateField('date', nullable=False)
    time = TimeField('time', nullable=False)
    userId = IntegerField('userId', nullable=False)
    calendarId = IntegerField('calendarId', nullable=False)
