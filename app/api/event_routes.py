from datetime import datetime, time
from flask import Blueprint, request
from app.api.auth_routes import validation_errors_to_error_messages
from ..forms.event_form import EventForm
from app.models import db, Calendar, Event, User

event_routes = Blueprint('events', __name__)

@event_routes.route('/new', methods=['POST'])
def create_event():
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_event = Event(
            title=form.data['title'],
            description=form.data['description'],
            start_date=form.data['startDate'],
            end_date=form.data['endDate'],
            user_id=form.data['userId'],
            calendar_id=form.data['calendarId']
        )
        db.session.add(new_event)
        db.session.commit()
        return new_event.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@event_routes.route('/<int:id>', methods=['GET'])
def load_events(id):
    events = Event.query.filter(Event.user_id == id)
    return {'events': [event.to_dict() for event in events]}

@event_routes.route('/calendar/<int:calendar_id>', methods=['GET'])
def load_calendar_events(calendar_id):
    events = Event.query.filter(Event.calendar_id == calendar_id)
    return {'events': [event.to_dict() for event in events]}

@event_routes.route('/update/<int:id>', methods=['PUT'])
def update_event(id):
    form = EventForm()
    print(request.json)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event.query.get(id)
        event.title = form.data['title']
        event.description = form.data['description']
        event.start_date = form.data['startDate']
        event.end_date = form.data['endDate']
        event.user_id = event.user_id
        event.calendar_id = request.json['calendarId']

        db.session.commit()
        return event.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@event_routes.route('/<int:id>', methods=['DELETE'])
def delete_event(id):
    form = EventForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        event = Event.query.get(id)
        deleted_event = event

        db.session.delete(event)
        db.session.commit()
        return deleted_event.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401
