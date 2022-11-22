from flask import redirect, url_for, request, render_template
from config import app, db
from models import Item, ItemSchema
@app.route("/")
def index():
    return render_template("index.html")
@app.route("/list")
def show_list():
    items = Item.query.all()
    item_schema = ItemSchema(many=True)
    return render_template('list.html', items = item_schema.dump(items))
@app.route("/add", methods=["GET", "POST"])
def add_item():
    if request.method == "POST" :
        try:
                
            new_item = Item(
                name=request.form.get("item_name"),
                category=request.form.get("item_category"),
                price=request.form.get('item_price')
            )
            db.session.add(new_item)
            db.session.commit()
            return render_template('add.html', message=f"The item {request.form.get('item_name')} has been successfully added")
        except:
            return render_template('add.html', message = "Please fill all item detail")
    return render_template('add.html', message=None)