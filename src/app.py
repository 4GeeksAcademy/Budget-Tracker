"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory, session
from flask_bcrypt import Bcrypt
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from datetime import datetime, timedelta, timezone
from flask_migrate import Migrate
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User, Budget, Account, Activity
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token, JWTManager
from user_agents import parse

# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
bcrypt = Bcrypt(app)
app.url_map.strict_slashes = False

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file

@app.route("/api/token", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email=email).first()
 
    if user is None:
        return jsonify({"error": "Email not found!"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Wrong password!"}), 401

    access_token = create_access_token(identity=email)
    
    return jsonify({
        "email": email,
        "access_token": access_token
    })


@app.route("/api/signup", methods=["POST"])
def signup():
    firstName = request.json["firstName"]
    lastName = request.json["lastName"]
    email = request.json["email"]
    password = request.json["password"]
    is_active = False

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"Error": "Email already taken"}), 409
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(firstName=firstName, lastName=lastName, email=email, password=hashed_password, is_active=is_active)
    db.session.add(new_user)
    db.session.commit()

    # Initialize defaults for the new user
    Budget.init_default_categories(new_user)
    Account.init_default_accounts(new_user)

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "firstName": firstName,
        "lastName": lastName,
        "email": new_user.email,
        "Active": is_active
    })

@app.route("/api/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Incorrect Email"}), 401
    
    if not bcrypt.check_password_hash(user.password, password):
         return jsonify({"error": "Incorrect Password"}), 401
    
    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route('/api/update_password', methods=['POST'])
@jwt_required()
def update_password():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    old_password = request.json['old_password']
    new_password = request.json['new_password']

    if not bcrypt.check_password_hash(user.password, old_password):
        return jsonify({"error": "Wrong password!"}), 401
    else:
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        user.password = hashed_password
        db.session.commit()
        return jsonify({ "message": "Updated Password"}), 200

@app.route('/api/track_user_activity', methods=['POST'])
@jwt_required()
def get_user_activity():
    current_user_email = get_jwt_identity()

    user = User.query.filter_by(email=current_user_email).first()

    if user:
        current_time = datetime.utcnow().strftime("%B %d, %Y %I:%M %p")

        user_agent_string = request.user_agent.string
        user_agent = parse(user_agent_string)
        device_name = f"{user_agent.os.family} {user_agent.device.family} {user_agent.browser.family}"

        ip_address = request.remote_addr

        new_activity = Activity(
            user_id=user.id,
            time=current_time,
            device=device_name,
            ip=ip_address
        )

        db.session.add(new_activity)
        db.session.commit()

        return jsonify(new_activity.serialize()), 201
    else:
        return jsonify({"error": "User not found"}), 404


@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)