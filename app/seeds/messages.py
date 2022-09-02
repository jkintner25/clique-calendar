from app.models import db
from app.models.message import Message
from datetime import datetime

def seed_messages():
    demo_message = Message(
        content="This is my very first message!", user_id=1, username='Demo', calendar_id=1, created_at=datetime.now()
    )
    marnie_message = Message(
        content="This is Marnie's first message!", user_id=2, username='Marnie', calendar_id=2, created_at=datetime.now()
    )

    db.session.add(demo_message)
    db.session.add(marnie_message)
    db.session.commit()

def undo_messages():
    db.session.execute('TRUNCATE messages RESTART IDENTITY CASCADE;')
    db.session.commit()
