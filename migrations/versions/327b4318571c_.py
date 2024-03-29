"""empty message

Revision ID: 327b4318571c
Revises: b90d7b3c0e6b
Create Date: 2024-01-17 18:38:27.629152

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '327b4318571c'
down_revision = 'b90d7b3c0e6b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('account',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('account_type', sa.String(length=20), nullable=False),
    sa.Column('balance', sa.Float(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('transaction', schema=None) as batch_op:
        batch_op.add_column(sa.Column('budget_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('account_id', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('income_expense', sa.String(length=10), nullable=False))
        batch_op.create_foreign_key(None, 'account', ['account_id'], ['id'])
        batch_op.create_foreign_key(None, 'budget', ['budget_id'], ['id'])
        batch_op.drop_column('category')

    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.String(length=50), nullable=True))
        batch_op.add_column(sa.Column('lastname', sa.String(length=50), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_column('lastname')
        batch_op.drop_column('name')

    with op.batch_alter_table('transaction', schema=None) as batch_op:
        batch_op.add_column(sa.Column('category', sa.VARCHAR(length=50), autoincrement=False, nullable=False))
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_constraint(None, type_='foreignkey')
        batch_op.drop_column('income_expense')
        batch_op.drop_column('account_id')
        batch_op.drop_column('budget_id')

    op.drop_table('account')
    # ### end Alembic commands ###
