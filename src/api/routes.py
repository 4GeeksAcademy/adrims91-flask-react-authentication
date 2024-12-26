"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash



api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    if "email" not in data or "password" not in data:
        return jsonify({"error": "Bad request"}), 400
    existing_email = User.query.filter_by(email=data['email']).first()
    if existing_email:
        return jsonify({"error": "This email is already registrated."}), 409
    
    new_user = User(email=data['email'], password=data['password'], is_active=True)
    
    
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"email": new_user.email, "id": new_user.id}), 201
@api.route('/token', methods=['POST'])
def create_token():
    data = request.get_json()
    user = User.query.filter_by(email=data['email'], password=data['password']).first()
    if not user:
        return jsonify({"error": "bad username or password"}), 401
    
    token = create_access_token(identity=user.email)
    return jsonify({"token": token, "email": user.email})

    
@api.route('/user', methods=['GET'])
@jwt_required()
def get_user():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    return jsonify({"email": user.email, "id": user.id})
    
