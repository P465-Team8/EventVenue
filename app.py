from flask import Flask, send_from_directory, request
from flask_restful import Api
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from flask_sqlalchemy import SQLAlchemy
from flask_praetorian import Praetorian

app = Flask(__name__, static_url_path='', static_folder='frontend/build')

CORS(app) #comment this on deployment

api = Api(app)

# Configure JWT
app.config['SECRET_KEY'] = 'group8secret'
app.config['JWT_ACCES_LIFESPAN'] = {'hours': 24}
app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
guard = Praetorian()

# Configure database
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://huggcxzybmdegm:401d28ec5d40d5a1924bf74add6adde719115f7e3276fc4a16a4c69db1aca1d0@ec2-52-207-47-210.compute-1.amazonaws.com:5432/d49i5f0i3s50ib'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Initialize flask-praetorian and create database
from models import User
with app.app_context():
    guard.init_app(app, User)
db.create_all()


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route("/auth/register", methods=['POST'])
def register():
    """
    Registers a new user. 
    POST Request must contain form with "first_name", "last_name", "email", and "password" fields
    """
    if request.form["first_name"] and request.form["last_name"] and request.form["email"] and request.form["password"]:
        if db.session.query(User).filter_by(email=request.form["email"]).count() < 1:
            new_user = User(request.form["first_name"], request.form["last_name"], request.form["email"], guard.hash_password(request.form["password"]))
            db.session.add(new_user)
            db.session.commit()
            print(new_user)
            return {"message": f"User {request.form['email']}"}, 201
        else:
            return {"error": "Email already in use"}, 400
    else:
        return {"error": "Form requires first_name, last_name, email, and password."}, 400

@app.route("/auth/login", methods=['POST'])
def login():
    if request.form["email"] and request.form["password"]:
        user = guard.authenticate(request.form["email"], request.form["password"])
        ret = {'access_token': str(guard.encode_jwt_token(user))}
        return ret, 200
    else:
        return {"error": "Request must contain email and password"}, 400

api.add_resource(HelloApiHandler, '/flask/hello')
