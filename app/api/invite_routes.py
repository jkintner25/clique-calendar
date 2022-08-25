from flask import Blueprint, request
from app.api.auth_routes import validation_errors_to_error_messages
from ..forms.invite_form import InviteForm
from app.models import db, User, Invite

invite_routes = Blueprint('invites', __name__)

@invite_routes.route('/new', methods=['POST'])
def create_invite():
    form = InviteForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        email = form.data['recipientEmail']
        user = User.query.filter(User.email == email).first()
        new_invite = Invite(
            calendar_id=form.data['calendarId'],
            sender_id=form.data['senderId'],
            recipient_id=user.id,
            message=form.data['message']
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
