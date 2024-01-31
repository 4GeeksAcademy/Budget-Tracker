from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    firstName = db.Column(db.String(50), nullable=True)
    lastName = db.Column(db.String(50), nullable=True)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    budgets = db.relationship('Budget', backref='user', lazy=True)
    transactions = db.relationship('Transaction', backref='user', lazy=True)
    accounts = db.relationship('Account', backref='user', lazy=True)
    activities = db.relationship('Activity', backref='user', lazy=True)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "firstName": self.firstName,
            "lastName": self.lastName,
            "budgets": [budget.serialize() for budget in self.budgets],
            "transactions": [transaction.serialize() for transaction in self.transactions],
            "accounts": [account.serialize() for account in self.accounts],
            "activities": [activity.serialize() for activity in self.activities]

           # do not serialize the password, it's a security breach
        }
    
class Budget(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __str__(self):
        user_email = User.query.get(self.user_id).email if self.user_id else "Unknown User"
        return f"{self.category} - User: {user_email}"

    def serialize(self):
        return {
            "id": self.id,
            "category": self.category,
            "amount": self.amount,
            "user_id": self.user_id
        }
    
    @staticmethod
    def init_default_categories(user):
        default_categories = ['Food', 'Transport', 'Bills', 'Housing']
        budgets = [Budget(category=category, amount=100.0, user=user) for category in default_categories]
        db.session.add_all(budgets)
        db.session.commit()



class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(200))
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    budget_id = db.Column(db.Integer, db.ForeignKey('budget.id'), nullable=True)
    account_id = db.Column(db.Integer, db.ForeignKey('account.id'), nullable=True)
    income_expense = db.Column(db.String(10), nullable=False, default="expense")

    budget = db.relationship('Budget', backref='transactions')
    account = db.relationship('Account', backref='transactions')

    def __str__(self):
        user_email = User.query.get(self.user_id).email if self.user_id else "Unknown User"
        account_type = Account.query.get(self.account_id).account_type if self.account_id else "No Account"
        return f"Amount: {self.amount} - User: {user_email} - Account: {account_type}"

    @property
    def category(self):
        return self.income_expense

    def serialize(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "category": self.category,
            "description": self.description,
            "date": self.date,
            "user_id": self.user_id,
            "account_type": self.account.account_type if self.account else None,
            "budget": self.budget.category if self.budget else None,
            "budget_id": self.budget_id
        }
    
class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    account_type = db.Column(db.String(20), nullable=False)  # 'Cash', 'Credit', 'Savings', etc.
    balance = db.Column(db.Float, nullable=False, default=0.0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __str__(self):
        user_email = User.query.get(self.user_id).email if self.user_id else "Unknown User"
        return f"{self.account_type} - User: {user_email}"

    def serialize(self):
        return {
            "id": self.id,
            "account_type": self.account_type,
            "balance": self.balance,
            "user_id": self.user_id
        }

    @staticmethod
    def init_default_accounts(user):
        default_accounts = [
            {'account_type': 'Cash', 'balance': 0.0},
            {'account_type': 'Credit', 'balance': 0.0},
            {'account_type': 'Savings', 'balance': 0.0}
        ]
        accounts = [Account(account_type=acc['account_type'], balance=acc['balance'], user=user) for acc in default_accounts]
        db.session.add_all(accounts)
        db.session.commit()



class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    time = db.Column(db.String(120), nullable=False)
    device = db.Column(db.String(120), nullable=False)
    ip = db.Column(db.String(120), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "time": self.time,
            "device": self.device,
            "ip": self.ip,
        }
