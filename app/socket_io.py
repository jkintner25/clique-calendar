from flask_socketio import SocketIO, emit, join_room
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

@socketio.on('chat')
def handle_chat(data):
    print('CHAT DATA: ', data)

    emit('chat', data, broadcast=True)

@socketio.on('join')
def join_room(data):
    print(data)
    username = data['username']
    room = data['calendar_id']
    join_room(room)

    emit("welcome", f"{username}", broadcast=True, to=room)
