from app.models import db
from app.models.event import Event

def seed_events():
    demo_event = Event(
        title="My First Event", date="10-13-2022", time="6pm", user_id=1, calendar_id=1
    )
    marnie_event = Event(
        title="Marnie's Event", date="10-10-2022", time="5pm", user_id=2, calendar_id=2
    )

    db.session.add(demo_event)
    db.session.add(marnie_event)
    db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
