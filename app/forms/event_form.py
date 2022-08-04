from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField, TimeField
from wtforms.validators import DataRequired
from .calendar_form import title_length

class EventForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), title_length])
    description = StringField('description')
    startDate = DateField('startDate', format='%Y-%m-%d', validators=[DataRequired()])
    endDate = DateField('endDate', format='%Y-%m-%d', validators=[DataRequired()])
    startTime = TimeField('startTime', validators=[DataRequired()])
    endTime = TimeField('endTime', validators=[DataRequired()])
    userId = IntegerField('userId')
    calendarId = IntegerField('calendarId')
