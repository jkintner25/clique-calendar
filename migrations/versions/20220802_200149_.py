"""empty message

Revision ID: 52267b6ef7dd
Revises: 9fc697828cb3
Create Date: 2022-08-02 20:01:49.769277

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '52267b6ef7dd'
down_revision = '9fc697828cb3'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('calendars', sa.Column('user_id', sa.Integer(), nullable=False))
    op.drop_constraint('calendars_userId_fkey', 'calendars', type_='foreignkey')
    op.create_foreign_key(None, 'calendars', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.drop_column('calendars', 'userId')
    op.add_column('events', sa.Column('user_id', sa.Integer(), nullable=False))
    op.add_column('events', sa.Column('calendar_id', sa.Integer(), nullable=False))
    op.drop_constraint('events_calendarId_fkey', 'events', type_='foreignkey')
    op.drop_constraint('events_userId_fkey', 'events', type_='foreignkey')
    op.create_foreign_key(None, 'events', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'events', 'calendars', ['calendar_id'], ['id'], ondelete='CASCADE')
    op.drop_column('events', 'userId')
    op.drop_column('events', 'calendarId')
    op.add_column('messages', sa.Column('user_id', sa.Integer(), nullable=False))
    op.add_column('messages', sa.Column('calendar_id', sa.Integer(), nullable=False))
    op.add_column('messages', sa.Column('created_at', sa.DateTime(), nullable=True))
    op.add_column('messages', sa.Column('updated_at', sa.DateTime(), nullable=True))
    op.drop_constraint('messages_userId_fkey', 'messages', type_='foreignkey')
    op.drop_constraint('messages_calendarId_fkey', 'messages', type_='foreignkey')
    op.create_foreign_key(None, 'messages', 'calendars', ['calendar_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'messages', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.drop_column('messages', 'createdAt')
    op.drop_column('messages', 'updatedAt')
    op.drop_column('messages', 'userId')
    op.drop_column('messages', 'calendarId')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('messages', sa.Column('calendarId', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('messages', sa.Column('userId', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('messages', sa.Column('updatedAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.add_column('messages', sa.Column('createdAt', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
    op.drop_constraint(None, 'messages', type_='foreignkey')
    op.drop_constraint(None, 'messages', type_='foreignkey')
    op.create_foreign_key('messages_calendarId_fkey', 'messages', 'calendars', ['calendarId'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('messages_userId_fkey', 'messages', 'users', ['userId'], ['id'], ondelete='CASCADE')
    op.drop_column('messages', 'updated_at')
    op.drop_column('messages', 'created_at')
    op.drop_column('messages', 'calendar_id')
    op.drop_column('messages', 'user_id')
    op.add_column('events', sa.Column('calendarId', sa.INTEGER(), autoincrement=False, nullable=False))
    op.add_column('events', sa.Column('userId', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'events', type_='foreignkey')
    op.drop_constraint(None, 'events', type_='foreignkey')
    op.create_foreign_key('events_userId_fkey', 'events', 'users', ['userId'], ['id'], ondelete='CASCADE')
    op.create_foreign_key('events_calendarId_fkey', 'events', 'calendars', ['calendarId'], ['id'], ondelete='CASCADE')
    op.drop_column('events', 'calendar_id')
    op.drop_column('events', 'user_id')
    op.add_column('calendars', sa.Column('userId', sa.INTEGER(), autoincrement=False, nullable=False))
    op.drop_constraint(None, 'calendars', type_='foreignkey')
    op.create_foreign_key('calendars_userId_fkey', 'calendars', 'users', ['userId'], ['id'], ondelete='CASCADE')
    op.drop_column('calendars', 'user_id')
    # ### end Alembic commands ###
