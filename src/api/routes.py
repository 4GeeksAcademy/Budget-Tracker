"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import Transaction, db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

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
        account_balances = {
            account.account_type: account.balance for account in user.accounts
        }

        return jsonify(account_balances)
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
    

@api.route('get_user_transactions', methods=['GET'])
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

if __name__ == '__main__':
    api.run(debug=True)