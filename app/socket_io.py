from flask_socketio import SocketIO, emit, join_room
import os

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
    emit('chat', data, broadcast=True)

@socketio.on('join')
def joinroom(data):

    username = data['username']
    room = data['calendar_title']
    join_room(room)

    emit("welcome", f"{username}", room=room)
