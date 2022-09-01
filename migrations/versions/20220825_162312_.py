"""empty message

Revision ID: dbc8ab2764f6
Revises: f65f8a80dc25
Create Date: 2022-08-25 16:23:12.204578

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'dbc8ab2764f6'
down_revision = 'f65f8a80dc25'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('subscriptions',
    sa.Column('calendar_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['calendar_id'], ['calendars.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    op.drop_table('user_calendar')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user_calendar',
    sa.Column('calendar_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('user_id', sa.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['calendar_id'], ['calendars.id'], name='user_calendar_calendar_id_fkey'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='user_calendar_user_id_fkey'),
    sa.PrimaryKeyConstraint('calendar_id', 'user_id', name='user_calendar_pkey')
    )
    op.drop_table('subscriptions')
    # ### end Alembic commands ###