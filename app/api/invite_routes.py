from flask import Blueprint, request
from app.api.auth_routes import validation_errors_to_error_messages
from ..forms.invite_form import InviteForm
from app.models import db, User, Invite, Calendar

invite_routes = Blueprint('invites', __name__)

@invite_routes.route('/new', methods=['POST'])
def create_invite():
    req = request.json
    print('REQUEST.JSON: ', req)
    form = InviteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        email = form.data['recipientEmail']
        user = User.query.filter(User.email == email).first()
        calendar = Calendar.query.get(form.data['calendarId'])
        new_invite = Invite(
            calendar_id=form.data['calendarId'],
            calendar_title=calendar.title,
            sender_id=form.data['senderId'],
            sender_username=req['senderUsername'],
            recipient_id=user.id,
            message=form.data['message'],
            accepted=False
        )
        db.session.add(new_invite)
        db.session.commit()
        return new_invite.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@invite_routes.route('/<int:id>', methods=['GET'])
def load_invites(id):
    invites = Invite.query.filter(Invite.recipient_id == id).all()
    return {'invites': [invite.to_dict() for invite in invites]}

@invite_routes.route('/update/<int:id>', methods=['PUT'])
def update_invite(id):
    invite = Invite.query.get(id)
    recipient = User.query.get(invite.recipient_id)
    accepted = request.json['accepted']
    if accepted == 'true':
        calendar = Calendar.query.get(invite.calendar_id)
        calendar.subscribers.append(recipient)
        db.session.delete(invite)
        db.session.commit()
        return {'invite': {'id': id}, 'calendar': calendar.to_dict()}
    if accepted == 'false':
        db.session.delete(invite)
        db.session.commit()
        return {'invite': {'id': id}}
