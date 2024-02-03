import os
from flask_admin import Admin
from .models import Account, db, User, Budget, Transaction, Activity
from flask_admin.contrib.sqla import ModelView

class CustomBudgetView(ModelView):
    column_list = ['id', 'category', 'amount_description', 'user']  # Add 'amount_description' to the list

    def amount_description_formatter(view, context, model, name):
        transactions = model.transactions
        return ', '.join([f"{transaction.description} ({transaction.amount})" for transaction in transactions])

    column_formatters = {
        'amount_description': amount_description_formatter,
    }

    column_labels = {
        'amount_description': 'Transactions',
    }

class CustomTransactionView(ModelView):
    column_list = ['id', 'category', 'amount', 'description', 'date', 'user']

    def category_formatter(view, context, model, name):
        return model.income_expense

    column_formatters = {
        'category': category_formatter,
    }

    column_labels = {
        'category': 'Category',
    }

class CustomUserView(ModelView):
    column_list = ['id', 'email', 'firstName', 'lastName']

class CustomFeedbackView(ModelView):
    column_list = ['id', 'opinion', 'category', 'message', 'user_id', 'created_at']    

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='BT Admin', template_mode='bootstrap4')

    

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(CustomUserView(User, db.session))
    admin.add_view(CustomBudgetView(Budget, db.session))
    admin.add_view(ModelView(Account, db.session))
    admin.add_view(CustomTransactionView(Transaction, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))