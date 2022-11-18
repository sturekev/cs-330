from flask import Flask, request, render_template
import sqlite3
import sys
app = Flask(__name__)
INVENTORY = [
            {"name": "Fresh Foam X1080v12", "category": "shoe", "price": 159},
            {"name": "Lebron gravity 11", "category": "shoe", "price": 799},
            {"name": "Jordan 1 Dior", "category": "shoe", "price": 13000}
        ]
    
# tạo db và table cần thiết
# function and support for db 
def createTableDb ():
    connection = sqlite3.connect(database="inventory.sqlite3")
    cur = connection.cursor()
    cur.execute("CREATE TABLE inventory (name TEXT,category TEXT, price  INTERGER")

def update_Inventory(name, category, price):
    INVENTORY.append({"name":name, "category": category, "price": price})
    connection = sqlite3.connect(database= "inventory.sqlite3")
    cur =connection.cursor()
    try: 
        cur.execute("INSERT INTO inventory(name, category, price) VALUES (?,?,?)",(name, category, price)) # insert db
    except:
        createTableDb()
        for i in INVENTORY:
            cur.execute("INSERT INTO inventory(name, category, price) VALUES (?,?,?)",(i["name"], i["category"], i["price"])) # insert db
    cur.close()
def get_data():
    responseData = []
    try:
        connection = sqlite3.connect(database= "inventory.sqlite3")
        cur = connection.cursor()
        cur.execute("select * from invetory")
        for name, category, price in cur:
            responseData.append({"name":name, "category": category, "price": price})
    except:
        responseData = INVENTORY
    return responseData


# support function for owner 
# def get_db ()
# route api return interface for owner
@app.route("/", methods = ["GET", "POST"])
def index():
    if request.method == "GET":
        return render_template("index.html")
    else:
        if request.form.get("name"):
            name = request.form.get("name")
        else: 
            return 
        if request.form.get("category"):
            category = request.form.get("category")
        if request.form.get("price"):
            price = request.form.get("price")
        update_Inventory(name=name,category=category,price=price)
        

# sửa lại bên dưới
@app.route("/<string:scope>")
def accessToInventory(scope: str):
    if scope == "list":
        return render_template("list.html", rows = get_data())
    elif scope == "add":
        return render_template("add.html")