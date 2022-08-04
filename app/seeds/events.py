from datetime import date, time
from app.models import db
from app.models.event import Event
from datetime import date, time

def seed_events():

    db.session.add()
    db.session.commit()

def undo_events():
    db.session.execute('TRUNCATE events RESTART IDENTITY CASCADE;')
    db.session.commit()
