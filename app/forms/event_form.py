from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TimeField
from wtforms.validators import DataRequired
from .calendar_form import title_length

class EventForm(FlaskForm):
    title = StringField('title', nullable=False, validators=[DataRequired(), title_length])
    description = StringField('description')
    startDate = DateField('startDate', format='%Y-%m-%d', nullable=False, validators=[DataRequired()])
    endDate = DateField('endDate', format='%Y-%m-%d', nullable=False, validators=[DataRequired()])
    startTime = TimeField('startTime', format='%H:%M', nullable=False, validators=[DataRequired()])
    endTime = TimeField('endTime', format='%H:%M', nullable=False, validators=[DataRequired()])
    userId = IntegerField('userId', nullable=False)
    calendarId = IntegerField('calendarId', nullable=False)
