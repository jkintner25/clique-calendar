from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, EqualTo, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(message='Username required.'), username_exists])
    email = StringField('email', validators=[DataRequired(message='Email required.'), Email(message='Email address is invalid.'), user_exists])
    password = StringField('password', validators=[DataRequired(message='Password required.'), EqualTo('repeatPassword', message='Passwords must match.'), Length(min=8, max=32, message='Password must be between 8-32 characters.')])
    repeatPassword = StringField('repeatPassword', validators=[DataRequired(message='Repeat Password required')])
