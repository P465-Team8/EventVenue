from app import db
from sqlalchemy.dialects.postgresql import UUID
import uuid

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(UUID(as_uuid=True), primary_key=True)
    first_name = db.Column(db.String(), nullable=False)
    last_name = db.Column(db.String(), nullable=False)
    email = db.Column(db.String(), unique=True, nullable=False)
    password_hash = db.Column(db.String(), nullable=False)

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
