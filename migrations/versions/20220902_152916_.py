"""empty message

Revision ID: 3c08c4390022
Revises: 9d6a185d6095
Create Date: 2022-09-02 15:29:16.549664

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3c08c4390022'
down_revision = '9d6a185d6095'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('messages', sa.Column('msg', sa.String(length=100), nullable=False))
    op.drop_column('messages', 'content')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('messages', sa.Column('content', sa.VARCHAR(length=100), autoincrement=False, nullable=False))
    op.drop_column('messages', 'msg')
    # ### end Alembic commands ###
