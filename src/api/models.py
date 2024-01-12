from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    budgets = db.relationship('Budget', backref='user', lazy=True)
    transactions = db.relationship('Transaction', backref='user', lazy=True)


    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "budgets": self.budgets,
            "transactions": self.transactions
            # do not serialize the password, its a security breach
        }
    
class Budget(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    category = db.Column(db.String(50), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

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
        budgets = [Budget(category=category, amount=0.0, user=user) for category in default_categories]
        db.session.add_all(budgets)
        db.session.commit()



class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200))
    date = db.Column(db.DateTime, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "category": self.category,
            "description": self.description,
            "date": self.date,
            "user_id": self.user_id
        }