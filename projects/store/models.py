"""Data model"""

from config import db, mm

class Item(db.Model):
    __tablename__ = "ITEM"
    name = db.Column(db.String, primary_key=True)
    category = db.Column(db.String)
    price = db.Column(db.Float)


class ItemSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Item
        load_instance = True