from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired
from .calendar_form import title_length

class EventForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(message='Title required.'), title_length])
    description = StringField('description')
    startDate = DateTimeField('startDate', validators=[DataRequired(message='Start Date required.')], format='%Y-%m-%d %H:%M')
    endDate = DateTimeField('endDate', validators=[DataRequired(message='End Date required.')], format='%Y-%m-%d %H:%M')
    userId = IntegerField('userId')
    calendarId = IntegerField('calendarId')
