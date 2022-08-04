from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired
from .calendar_form import title_length

class EventForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), title_length])
    description = StringField('description')
    startDate = StringField('startDate', validators=[DataRequired()])
    endDate = StringField('endDate', validators=[DataRequired()])
    userId = IntegerField('userId')
    calendarId = IntegerField('calendarId')
