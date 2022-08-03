"""empty message

Revision ID: acaf3f4f8a64
Revises: 3033e9248e8e
Create Date: 2022-08-03 15:13:52.562935

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'acaf3f4f8a64'
down_revision = '3033e9248e8e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('events', sa.Column('start_date', sa.Date(), nullable=False))
    op.add_column('events', sa.Column('end_date', sa.Date(), nullable=False))
    op.add_column('events', sa.Column('start_time', sa.Time(), nullable=False))
    op.add_column('events', sa.Column('end_time', sa.Time(), nullable=False))
    op.drop_column('events', 'time')
    op.drop_column('events', 'date')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('events', sa.Column('date', sa.VARCHAR(length=20), autoincrement=False, nullable=False))
    op.add_column('events', sa.Column('time', sa.VARCHAR(length=20), autoincrement=False, nullable=False))
    op.drop_column('events', 'end_time')
    op.drop_column('events', 'start_time')
    op.drop_column('events', 'end_date')
    op.drop_column('events', 'start_date')
    # ### end Alembic commands ###
