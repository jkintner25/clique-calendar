from flask.cli import AppGroup
from .users import seed_users, undo_users
from .calendars import seed_calendars, undo_calendars
from .events import seed_events, undo_events
from .messages import seed_messages, undo_messages

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_calendars()
    # seed_events()
    seed_messages()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_calendars()
    undo_events
    undo_messages()
