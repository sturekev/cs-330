import requests
from flask import Flask, request, render_template, send_from_directory
from flask import redirect, url_for
import records

app = Flask(__name__)

THE_WORLD = []
CACHE = {}

def get_data_from_db(query: str) -> list:
    """retrieve data from the database and return to the user"""
    db = records.Database(f"postgres://vuonng01:@localhost:2345/world")
    rows = db.query(query)
    return rows


@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        # display links to 3 options (country / region / continent)
        return render_template("base.html")
    else:
        # retrieve data from the database based on the selected option and present it to the user
        if request.form.get("country"):
            country = request.form.get("country")
            if country in CACHE:
                result = CACHE[country]
            else:
                result = get_data_from_db(
                    # host="localhost",
                    # port=2345,
                    # user="vuonng01",
                    # dbname="world",
                    query=f"select * from country join city on country.capital = city.id where code = '{country}';",
                )
                CACHE[country] = result
            return render_template("result.html", rows=result)
        if request.form.get("region"):
            region = request.form.get("region")
            if region in CACHE:
                result = CACHE[region]
            else:
                result = get_data_from_db(
                    # host="localhost",
                    # port=2345,
                    # user="vuonng01",
                    # dbname="world",
                    query=f"select * from country join city on country.capital = city.id where region = '{region}';",
                )
                CACHE[region] = result
            return render_template("result.html", rows=result)
        if request.form.get("continent"):
            continent = request.form.get("continent")
            if continent in CACHE:
                result = CACHE[continent]
            else:
                result = get_data_from_db(
                    # host="localhost",
                    # port=2345,
                    # user="vuonng01",
                    # dbname="world",
                    query=f"select * from country join city on country.capital = city.id where continent = '{continent}';",
                )
                CACHE[continent] = result
            return render_template("result.html", rows=result)


@app.route("/<string:scope>", methods=["GET"])
def search(scope: str):
    global THE_WORLD
    if scope == "country":
        # get countries from the database and populate options of the drop-down menu
        THE_WORLD = get_data_from_db(
            # host="localhost",
            # port=2345,
            # user="vuonng01",
            # dbname="world",
            query="select code, name from country",
        )
        return render_template("country.html", options=THE_WORLD)
    elif scope == "region":
        # get regions from the database and populate options of the drop-down menu
        THE_WORLD = get_data_from_db(
            # host="localhost",
            # port=2345,
            # user="vuonng01",
            # dbname="world",
            query="select distinct region from country;",
        )
        return render_template("region.html", options=THE_WORLD)
    elif scope == "continent":
        # get continents from the database and populate options of the drop-down menu
        THE_WORLD = get_data_from_db(
            # host="localhost",
            # port=2345,
            # user="vuonng01",
            # dbname="world",
            query="select distinct continent from country",
        )
        return render_template("continent.html", options=THE_WORLD)