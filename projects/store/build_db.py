"""Building the DB"""

import csv
import os
from config import db
from models import Item


def build_db(filename):
    # Delete existing DB
    if os.path.exists(f"{filename}.sqlite3"):
        os.remove(f"{filename}.sqlite3")

    # Create DB structure
    db.create_all()

    # Add data to the DB
    try:
        with open(f"{filename}.csv") as f:
            content = csv.reader(f)
            next(content)
        
            for line in content:
                item = Item(
                    name = line[0],
                    category = line[1],
                    price = line[2]
                )
                db.session.add(item)
        db.session.commit() 
    except:
        db.session.commit()


def main():
    build_db("items")

if __name__ == "__main__":
    main()