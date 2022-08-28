from flask import Blueprint, request
from app.api.auth_routes import validation_errors_to_error_messages
from ..forms.calendar_form import CalendarForm
from app.models import db, Calendar, Event, User

calendar_routes = Blueprint('calendars', __name__)

@calendar_routes.route('/new', methods=['POST'])
def create_calendar():
    form = CalendarForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_calendar = Calendar(
            title=form.data['title'],
            user_id=form.data['userId']
        )

        db.session.add(new_calendar)
        db.session.commit()
        return new_calendar.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@calendar_routes.route('/<int:id>', methods=['GET'])
def load_calendars(id):
    calendars = Calendar.query.filter(Calendar.user_id == id)
    return {'calendars': [calendar.to_dict() for calendar in calendars]}

@calendar_routes.route('/update/<int:id>', methods=['PUT'])
def update_calendar(id):
    form = CalendarForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        calendar = Calendar.query.get(id)
        calendar.title = form.data['title']

        db.session.commit()
        return calendar.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@calendar_routes.route('/<int:id>', methods=['DELETE'])
def delete_calendar(id):
    form = CalendarForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        calendar = Calendar.query.get(id)
        deleted_calendar = calendar

        db.session.delete(calendar)
        db.session.commit()
        return deleted_calendar.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@calendar_routes.route('/shared/<int:id>', methods=['DELETE'])
def remove_shared_calendar(id):
    calendar = Calendar.query.get(id)
    user = User.query.get(request.json)
    print('USER*******************', user)
    if user is None:
        return {'errors': ['Invalid User ID.']}
    if calendar is None:
        return {'errors': ['Invalid calendar.']}
    else:
        calendar.subscribers.remove(user)
        db.session.commit()
        return { 'id': id }
