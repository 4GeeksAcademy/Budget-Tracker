"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import Feedback, Transaction, db, User, Account, Budget
from flask_cors import CORS
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import datetime
import pytz

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, resources={r"/*": {"origins": "*"}})

# Create a route to authenticate your users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.


@api.route('/get_user_info', methods=['GET'])
@jwt_required()
def get_user_info():
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).first()

        if user:
            user_info = user.serialize()
            return jsonify(user_info)
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    api.run(debug=True)


@api.route("/hello", methods=["GET"])
@jwt_required()
def get_hello():

    email = get_jwt_identity()
    dictionary = {
        "message": "Hello from the back end 👋 " + email
    }
    
    return jsonify(dictionary)

@api.route("/dashboard", methods=["GET"])
@jwt_required()
def get_user():

    email = get_jwt_identity()
    dictionary = {
        "message": "This is a private message directed to " + email + ". Please do not share it!"
    }
    
    return jsonify(dictionary)

@api.route('/get_account_balances', methods=['GET'])
@jwt_required()
def get_account_balances():
    current_user_email = get_jwt_identity()

    user = User.query.filter_by(email=current_user_email).first()

    if user:
        account_balances = [
            {
                'id': account.id,
                'account_type': account.account_type,
                'balance': account.balance
            } for account in user.accounts
        ]

        return jsonify(account_balances)
    else:
        return jsonify({"error": "User not found"}), 404
    
@api.route('/get_budgets', methods=['GET'])
@jwt_required()
def get_budgets():
    current_user_email = get_jwt_identity()

    user = User.query.filter_by(email=current_user_email).first()

    if user:
        budgets = [
            {
                'id': budget.id,
                'budget_category': budget.category,
                'amount': budget.amount
            } for budget in user.budgets
        ]

        return jsonify(budgets)
    else:
        return jsonify({"error": "User not found"}), 404
    
@api.route('/new_budget', methods=['POST'])
@jwt_required()
def create_budget():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if user:
        data = request.get_json()
        new_budget = Budget(category=data['budget_category'], amount=data['amount'], user_id=user.id)
        db.session.add(new_budget)
        db.session.commit()

        return jsonify({"message": "Budget created successfully"}), 201
    else:
        return jsonify({"error": "User not found"}), 404

@api.route('/edit_budget/<int:budget_id>', methods=['PUT'])
@jwt_required()
def modify_budget(budget_id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if user:
        data = request.get_json()
        budget = Budget.query.filter_by(id=budget_id, user_id=user.id).first()

        if budget:
            budget.category = data.get('budget_category', budget.category)
            budget.amount = data.get('amount', budget.amount)
            db.session.commit()

            return jsonify({"message": "Budget updated successfully"}), 200
        else:
            return jsonify({"error": "Budget not found"}), 404
    else:
        return jsonify({"error": "User not found"}), 404
    
@api.route('/update_cash_balance', methods=['PUT'])
@jwt_required()
def update_cash_balance():
    current_user_email = get_jwt_identity()

    user = User.query.filter_by(email=current_user_email).first()

    if user:
        cash_account = next((account for account in user.accounts if account.account_type == 'Cash'), None)

        if cash_account:
            try:
                # Get the amount to update from the request data
                update_amount = float(request.json.get('update_amount'))

                # Update the cash balance
                cash_account.balance += update_amount
                db.session.commit()

                return jsonify({"message": "Cash balance updated successfully",
                                "updatedCashBalance": cash_account.balance})
            except ValueError:
                return jsonify({"error": "Invalid update amount. Must be a valid number"}), 400
        else:
            return jsonify({"error": "Cash account not found"}), 404
    else:
        return jsonify({"error": "User not found"}), 404
    
@api.route('/update_credit_balance', methods=['PUT'])
@jwt_required()
def update_credit_balance():
    current_user_email = get_jwt_identity()

    user = User.query.filter_by(email=current_user_email).first()

    if user:
        credit_account = next((account for account in user.accounts if account.account_type == 'Credit'), None)

        if credit_account:
            try:
                # Get the amount to update from the request data
                update_amount = float(request.json.get('update_amount'))

                # Update the credit balance
                credit_account.balance += update_amount
                db.session.commit()

                return jsonify({"message": "Credit balance updated successfully",
                                "updatedCreditBalance": credit_account.balance})
            except ValueError:
                return jsonify({"error": "Invalid update amount. Must be a valid number"}), 400
        else:
            return jsonify({"error": "Credit account not found"}), 404
    else:
        return jsonify({"error": "User not found"}), 404


@api.route('/update_savings_balance', methods=['PUT'])
@jwt_required()
def update_savings_balance():
    current_user_email = get_jwt_identity()

    user = User.query.filter_by(email=current_user_email).first()

    if user:
        savings_account = next((account for account in user.accounts if account.account_type == 'Savings'), None)

        if savings_account:
            try:
                # Get the amount to update from the request data
                update_amount = float(request.json.get('update_amount'))

                # Update the savings balance
                savings_account.balance = update_amount
                db.session.commit()

                return jsonify({"message": "Savings balance updated successfully",
                                "updatedSavingsBalance": savings_account.balance})
            except ValueError:
                return jsonify({"error": "Invalid update amount. Must be a valid number"}), 400
        else:
            return jsonify({"error": "Savings account not found"}), 404
    else:
        return jsonify({"error": "User not found"}), 404

@api.route('/update_account_balance/<int:account_id>', methods=['PUT'])
@jwt_required()
def update_account_balance(account_id):
    current_user_email = get_jwt_identity()

    user = User.query.filter_by(email=current_user_email).first()

    if user:
        account = next((account for account in user.accounts if account.id == account_id), None)

        if account:
            try:
                # Get the amount to update from the request data
                update_amount = float(request.json.get('update_amount'))

                # Update the account balance
                account.balance = update_amount
                db.session.commit()

                return jsonify({"message": "Account balance updated successfully",
                                "updatedBalance": account.balance})
            except ValueError:
                return jsonify({"error": "Invalid update amount. Must be a valid number"}), 400
        else:
            return jsonify({"error": "Account not found"}), 404
    else:
        return jsonify({"error": "User not found"}), 404
    

@api.route('/get_user_transactions', methods=['GET'])
@jwt_required()
def get_user_transactions():
    current_user_email = get_jwt_identity()

    user = User.query.filter_by(email=current_user_email).first()

    if user:
        transactions = Transaction.query.filter_by(user_id=user.id).order_by(Transaction.date.desc()).all()

        # Serialize transactions to JSON
        serialized_transactions = [transaction.serialize() for transaction in transactions]

        return jsonify(serialized_transactions)
    else:
        return jsonify({"error": "User not found"}), 404
    
@api.route('/post_user_transaction', methods=['POST'])
@jwt_required()
def post_user_transaction():
    current_user_email = get_jwt_identity()

    user = User.query.filter_by(email=current_user_email).first()

    if user:
        data = request.get_json()

        # Convert date to local timezone
        date = datetime.strptime(data['date'], "%Y-%m-%d")
        local_tz = pytz.timezone('America/New_York')  # replace with your timezone
        local_date = local_tz.localize(date)

        new_transaction = Transaction(
            user_id=user.id,
            budget_id=data['budgetId'],
            account_id=data['accountId'],
            amount=data['amount'],
            description=data['description'],
            income_expense=data['income_expense'],
            date=local_date
        )

        db.session.add(new_transaction)
        db.session.commit()

        return jsonify(new_transaction.serialize()), 201
    else:
        return jsonify({"error": "User not found"}), 404
    
@api.route('/add_new_account', methods=['POST'])
@jwt_required()
def add_new_account():
    current_user_email = get_jwt_identity()

    user = User.query.filter_by(email=current_user_email).first()

    if user:
        data = request.get_json()

        new_account = Account(
            user_id=user.id,
            account_type=data['account_type'],
            balance=data['balance']
        )

        db.session.add(new_account)
        db.session.commit()

        return jsonify(new_account.serialize()), 201
    else:
        return jsonify({"error": "User not found"}), 404
    
@api.route("/update_personal_info", methods=['POST'])
@jwt_required()
def update_personal_info():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if 'firstName' in request.json:
        new_firstName = request.json['firstName']
        if new_firstName != '':
            if new_firstName != user.firstName:
                user.firstName = new_firstName
            
    if 'lastName' in request.json:
        new_lastName = request.json['lastName']
        if new_lastName != '':
            if new_lastName != user.lastName:
                user.lastName = new_lastName

    if 'email' in request.json:
        new_email = request.json['email']
        if new_email != '':
            if new_email != current_user_email:
                existing_user = User.query.filter_by(email=new_email).first()
                if existing_user:
                    return jsonify({"error": "Email is already in use by another user"}), 400

                user.email = new_email

    try:
        db.session.commit()
        return jsonify({"message": "User information updated successfully", "user": user.serialize()})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
@api.route('/get_account_details/<int:account_id>', methods=['GET'])
@jwt_required()
def get_account_details(account_id):
    current_user_email = get_jwt_identity()

    user = User.query.filter_by(email=current_user_email).first()

    if user:
        account = Account.query.filter_by(id=account_id, user_id=user.id).first()

        if account:
            transactions = Transaction.query.filter_by(account_id=account.id).all()
            total_transactions = len(transactions)
            account_details = {
                "id": account.id,
                "account_type": account.account_type,
                "balance": account.balance,
                "total_transactions": total_transactions,
                "transactions": [transaction.serialize() for transaction in transactions]
            }

            return jsonify(account_details)
        else:
            return jsonify({"error": "Account not found"}), 404
    else:
        return jsonify({"error": "User not found"}), 404


@api.route('/get_all_user_activities', methods=['GET'])
@jwt_required()
def get_activity():
    current_user = get_jwt_identity()

    user = User.query.filter_by(email=current_user).first()

    if user:
        user_activities = [activity.serialize()
                           for activity in user.activities]
        return jsonify({"User": user_activities})
    else:
        return jsonify({"Message": "Error Finding user"})
    

@api.route('/feedback', methods=['POST'])
@jwt_required()  # If authentication is needed
def handle_feedback():
    current_user_email = get_jwt_identity()  # Get user email from JWT
    data = request.get_json()

    # Validate and extract feedback data
    opinion = data.get('opinion')
    category = data.get('category')
    message = data.get('message')

    # You may want to perform additional validation here

    if not all([opinion, category, message]):
        return jsonify({"error": "Missing data for feedback"}), 400

    # Look up the user based on their email
    user = User.query.filter_by(email=current_user_email).first()

    if user is None:
        return jsonify({"error": "User not found"}), 404

    # Create new Feedback object
    feedback = Feedback(
        opinion=opinion,
        category=category,
        message=message,
        user_id=user.id  # Use the ID from the user
    )

    # Add to the session and commit to the database
    db.session.add(feedback)
    try:
        db.session.commit()
        return jsonify(feedback.serialize()), 201  # Use 201 to indicate "Created"
    except Exception as e:
        db.session.rollback()  # Rollback in case of error
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    api.run(debug=True)