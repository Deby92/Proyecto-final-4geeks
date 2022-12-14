from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Rol, Profile
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.security import generate_password_hash, check_password_hash

registry = Blueprint('registry', __name__)

@registry.route('/users', methods=['GET']) 
def get_users():
    users = User.query.all()
    users = list(map(lambda user: user.serialize(), users))
    return jsonify(users), 200

@registry.route('/users', methods=['POST']) 
def create_users():
    data = request.get_json()
    
    if not data['name']: return jsonify({"status": "failed", "message": "We need your first name", "data": None}), 400
    if not data['email']: return jsonify({"status": "failed", "message": "You need an email", "data": None}), 400
    if not data['password']: return jsonify({"status": "failed", "message": "You need a password", "data": None}), 400

    userExists = User.query.filter_by(email = data['email']).first()
    if userExists: return jsonify({
        "status": "failed",
        "message": "Email already exists",
        "data": None
    }), 409

    user = User()
    user.email = data['email']
    user.password = generate_password_hash(data['password'])

    rol = Rol()
    user.rol = rol
    
    profile = Profile()
    profile.name = data['name']
    user.profile = profile
    
    user.save()
    data = user.serialize()
    if user: return jsonify({
        "status": "success",
        "message": "Registration succesful",
        "data": data
    }), 201
    else: return jsonify({
        "status": "failed", 
        "message": "Error in registration. Try again",
        "data": None}), 200