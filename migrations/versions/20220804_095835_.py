"""empty message

Revision ID: 9d0cabf70b81
Revises: 558a0e9974ba
Create Date: 2022-08-04 09:58:35.802768

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '9d0cabf70b81'
down_revision = '558a0e9974ba'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('events', sa.Column('start_date', sa.String(length=100), nullable=False))
    op.add_column('events', sa.Column('end_date', sa.String(length=100), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('events', 'end_date')
    op.drop_column('events', 'start_date')
    # ### end Alembic commands ###
