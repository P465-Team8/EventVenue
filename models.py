from sqlalchemy.sql.expression import desc
from app import db
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy import ForeignKey
import uuid

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(UUID(as_uuid=True), primary_key=True)
    first_name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    password_hash = db.Column(db.String(), nullable=False)
    is_active = db.Column(db.Boolean, default=True, server_default='true')

    def __init__(self, first_name, last_name, email, password_hash):
        self.id = uuid.uuid4()
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password_hash = password_hash

    def __repr__(self) -> str:
        return f'<id {self.id}>'

    def __str__(self) -> str:
        return self.first_name + " " + self.last_name

    @classmethod
    def lookup(cls, email):
        """
        Used by Flask-Praetorian
        """
        return cls.query.filter_by(email=email).one_or_none()

    @classmethod
    def identify(cls, id):
        """
        Used by Flask-Praetorian
        """
        return cls.query.get(id)

    @property
    def identity(self):
        """
        Used by Flask-Praetorian
        """
        return str(self.id)

    @property
    def username(self):
        """
        Username property that is used by Flask-Praetorian.
        Enables authentication with email instead of a separate username.
        """
        return self.email

    @property
    def password(self):
        """
        Password property that is used by Flask-Praetorian.
        Enables authentication without renaming our password_hash column.
        """
        return self.password_hash

    @property
    def rolenames(self):
        """
        Flask-Praetorian requires the rolenames property, but no roles are needed.
        It is possible to disable this requirement in Flask-Praetorian, which should
        be done at some point.
        """
        return []

    def is_valid(self):
        return self.is_active

class Venue(db.Model):
    __tablename__ = 'venues'

    vid = db.Column(UUID(as_uuid=True), primary_key=True)
    owner = db.Column(UUID(as_uuid=True),ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(), unique=True, nullable=False)
    description = db.Column(db.String(), nullable=False)
    street_address = db.Column(db.String(), nullable=False)
    city = db.Column(db.String(), nullable=False)
    state = db.Column(db.String(), nullable=False)
    zip = db.Column(db.Integer, nullable=False)
    pictures = db.Column(db.ARRAY(db.String()), nullable=False)

    def __init__(self, owner:UUID, name:str, description:str, street_address:str, city:str, state:str, zip:int, pictures:'list[str]'):
        self.vid = uuid.uuid4()
        self.owner = owner
        self.name = name
        self.description = description
        self.street_address = street_address
        self.city = city
        self.state = state
        self.zip = zip
        self.pictures = pictures

    def __repr__(self) -> str:
        return f'<vid {self.vid}>'

    def __str__(self) -> str:
        return self.first_name + " " + self.last_name