from flask import Blueprint, request
from app.api.auth_routes import validation_errors_to_error_messages
from ..forms.message_form import MessageForm
from app.models import db, User, Calendar, Message
from datetime import datetime

message_routes = Blueprint('messages', __name__)

@message_routes.route('/<int:id>', methods=['GET'])
def get_chat_log(id):
    messages = Message.query.filter(Message.calendar_id == id).all()
    if messages is None:
        return {'errors': ['No messages to view.']}
    else:
        return {'messages': [message.to_dict() for message in messages]}

@message_routes.route('/new', methods=['POST'])
def create_message():
    form = MessageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_message = Message(
            content = form.data['content'],
            user_id = form.data['userId'],
            calendar_id = form.data['calendarId'],
            created_at = datetime.now()
        )
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@message_routes.route('/delete/<int:id>', methods=['DELETE'])
def delete_message(id):
    message = Message.query.get(id)
    user_id = request.json['userId']
    if message.user_id == user_id:
        deleted_message = message
        db.session.delete(message)
        db.session.commit()
        return deleted_message.to_dict()
    else:
        return {'errors': ['Could not delete message']}, 401
