from . import db
from sqlalchemy_serializer import SerializerMixin

class Course(db.Model, SerializerMixin):
    course_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    course_name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)

    def __repr__(self):
        return f'<Course {self.course_name}>'
