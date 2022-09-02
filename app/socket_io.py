from flask_socketio import SocketIO, send, emit, join_room, leave_room
import os
from .models.user import User
from .models.message import Message

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://clique-calendar.herokuapp.com",
        "https://clique-calendar.herokuapp.com"
    ]
else:
    origins = "*"

socketio = SocketIO(cors_allowed_origins=origins)

rooms = []

@socketio.on("chat")
def handle_chat(data):
    room = data['room']
    emit("chat", data, to=room)

@socketio.on('join')
def on_join(data):
    room = data['room']
    join_room(room)
    emit('join', data, to=room)

@socketio.on('leave')
def on_leave(data):
    room = data['room']
    leave_room(room)
    emit('leave', data, to=room)
