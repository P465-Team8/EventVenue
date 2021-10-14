from flask import Flask, send_from_directory, request
from flask.signals import request_tearing_down
from sqlalchemy.sql.sqltypes import JSON
from werkzeug import useragents
from flask_restful import Api
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from flask_sqlalchemy import SQLAlchemy
from flask_praetorian import Praetorian, auth_required, current_user

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
from models import User, Venue, VenueBookmark, Wedding
with app.app_context():
    guard.init_app(app, User)
db.create_all()


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route("/api/auth/register", methods=['POST'])
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

@app.route("/api/auth/login", methods=['POST'])
def login():
    """
    Returns the JWT token if the given user is authenticated.
    Requires "email" and "password" fields in POST request.
    """
    if request.form["email"] and request.form["password"]:
        user = guard.authenticate(request.form["email"], request.form["password"])
        ret = {'access_token': guard.encode_jwt_token(user)}
        return ret, 200
    else:
        return {"error": "Request must contain email and password"}, 400

@app.route("/api/myprofile", methods=['GET'])
@auth_required
def myprofile():
    """
    Returns the logged-in user's information
    """
    user = db.session.query(User).filter_by(email=current_user().username).one_or_none()
    return {"email":user.email, "first_name": user.first_name, "last_name":user.last_name}, 200

@app.route("/api/postvenue", methods=['POST'])
@auth_required
def postvenue():
    """
    Posts Venue to Platform
    Post requiest requires "name", "description", "street_address", "city", "state", "zipcode", "pictures" 
    """
    if request.form["name"] and request.form["description"] and request.form["street_address"] and request.form["city"] and request.form["state"] and request.form["zipcode"]:
        if db.session.query(Venue).filter_by(name=request.form["name"], street_address=request.form["street_address"], zipcode=request.form["zipcode"]).count() < 1:
            new_Venue = Venue(current_user().id,request.form["name"],request.form["description"], request.form["street_address"], request.form["city"], request.form["state"], request.form["zipcode"], request.form["pictures"])
            db.session.add(new_Venue)
            db.session.commit()
            return {"message": f"Venue {request.form['name']}"}, 201
        else:
            return {"error": "Venue already exists"}, 400
    else:
        return {"error": "Form requires name, description, street_address, city, state, zipcode, pictures."}, 400

@app.route("/api/postwedding", methods=['POST'])
@auth_required
def postwedding():
    """
    Posts Wedding to Platform
    Post request requires "description", "is_public", "wedding_reservation", "wedding_datetime"
    """
    
    #TODO Create reservation instance for wedding

    if request.form["description"] and request.form["is_public"] and request.form["wedding_reservation"] and request.form["wedding_datetime"]:
        if db.session.query(Wedding).filter_by(wedding_reservation=request.form["wedding_reservation"]).count() == 1: 
            new_wedding = Wedding(current_user.id, request.form["description"], request.form["is_public"], request.form["wedding_reservation"], request.form["wedding_datetime"])
            db.session.add(new_wedding)
            db.session.commit()
            return {"message": f"Wedding {request.form['description']}"}, 202
        else:
            return {"error": "reservation does not exist"}, 400
    else:
        return {"error": "Form requires description, description, is_public, wedding_reservation, wedding_datetime."}, 400

@app.route("/api/bookmarkvenue", methods=['POST'])
@auth_required
def bookmarkvenue():
    """
    Adds venue to user's bookmarked venues
    requires "bookmarked_venue"
    """

    #TODO Get Venue vid from information passed by front-end

    if request.form["bookmarked_venue"]:
        if db.session.query(VenueBookmark).filter_by(bookmarked_venue=request.form["bookmarked_venue"], user_id=current_user.id).count() < 1:
            new_bookmarked_venue = VenueBookmark(request.form["bookmarked_venue"],current_user.id)
            db.session.add(new_bookmarked_venue)
            db.session.commit()
            return {"message": "Venue bookmarked"}, 201
        else:
            db.session.query(VenueBookmark).filter_by(bookmarked_venue=request.form["bookmarked_venue"],user_id=current_user.id).delete()
            db.session.commit()
            return {"message": "Venue unbookmarked"}, 201
    else:
        return {"error": "Form Requires bookmarked_venue"}, 400


api.add_resource(HelloApiHandler, '/flask/hello')
