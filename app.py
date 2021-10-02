from flask import Flask, send_from_directory, request
from flask_restful import Api
from flask_cors import CORS #comment this on deployment
from api.HelloApiHandler import HelloApiHandler
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
app.secret_key = b'group8ssupersecretkey'

CORS(app) #comment this on deployment


app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql+psycopg2://huggcxzybmdegm:401d28ec5d40d5a1924bf74add6adde719115f7e3276fc4a16a4c69db1aca1d0@ec2-52-207-47-210.compute-1.amazonaws.com:5432/d49i5f0i3s50ib'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
from models import User
db.create_all()

api = Api(app)


@app.route("/", defaults={'path':''})
def serve(path):
    return send_from_directory(app.static_folder,'index.html')

@app.route("/testuser")
def adduser():
    new_user = User("Bob", "Smith", "BobSmith@example.com", "hashedpassword")
    db.session.add(new_user)
    db.session.commit()
    print(new_user)
    return str(new_user)

api.add_resource(HelloApiHandler, '/flask/hello')
