from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError

def title_length(form, field):
    title = field.data
    if title and len(title) > 30:
        raise ValidationError(
            'Title must be 30 characters or less.')

class CalendarForm(FlaskForm):
    title = StringField('title', validators=[DataRequired(), title_length])
    userId = IntegerField('userId', validators=[DataRequired()])
