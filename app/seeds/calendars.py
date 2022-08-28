from app.models import db, User
from app.models.calendar import Calendar

def seed_calendars():
    demo_calendar = Calendar(
        title="My First Calendar", user_id=1
    )
    marnie_calendar = Calendar(
        title="Marnie's Calendar", user_id=2
    )

    db.session.add(demo_calendar)
    db.session.add(marnie_calendar)
    db.session.commit()

    # user = User.query.get(3)
    # demo_calendar.subscribers.append(user)

    db.session.commit()

def undo_calendars():
    db.session.execute('TRUNCATE calendars RESTART IDENTITY CASCADE;')
    db.session.commit()
