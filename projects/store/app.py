from flask import redirect, url_for, request, render_template
from config import app, db
from models import Item, ItemSchema
@app.route("/")
def index():
    return render_template("index.html")
@app.route("/<string:scope>", methods = ["GET", "POST"])
def accessToInventory(scope: str):
    if scope == "list":
        items = Item.query.all()
        item_schema = ItemSchema(many=True)        
        return render_template("list.html", items=item_schema.dump(items))
    elif scope == "add":
        if request.method == "POST" :
            new_item = Item(
                name=request.form.get("item_name"),
                category=request.form.get("item_category"),
                price=int(request.form.get('item_price'))
            )
            db.session.add(new_item)
            db.session.commit()
            # message=f"The item {request.form.get('item_name')} has been successfully added"
            return render_template('add.html')
        return render_template('add.html', message=None)