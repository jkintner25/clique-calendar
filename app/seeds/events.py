from datetime import date, time
from app.models import db
from app.models.event import Event
from datetime import date, time

def seed_events():
    demo_event = Event(
        title="My First Event", description='This event is intended to give us a chance to remember those who remember those who remember those who have done things at some point in time, somehwhere.', start_date=date(2022, 10, 14), end_date=date(2022, 10, 14), start_time=time(18, 0, 0), end_time=time(20, 0, 0), user_id=1, calendar_id=1
    )
    marnie_event = Event(
        title="Marnie's Event", start_date=date(2022, 10, 14), end_date=date(2022, 10, 14), start_time=time(18, 0, 0), end_time=time(20, 0, 0), user_id=2, calendar_id=2
    )

    db.session.add(demo_event)
    db.session.add(marnie_event)
    db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
