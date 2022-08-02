from app.models import db
from app.models.message import Message
from datetime import datetime

def seed_messages():
    demo_message = Message(
        content="This is my very first message!", userId=1, calendarId=1, createdAt=datetime.now()
    )
    marnie_message = Message(
        content="This is Marnie's first message!", userId=2, calendarId=2, createdAt=datetime.now()
    )

    db.session.add(demo_message)
    db.session.add(marnie_message)
    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
