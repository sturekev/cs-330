from flask import Flask, request, render_template, send_from_directory
from flask import redirect, url_for
import sqlite3
import pathlib
app = Flask(__name__)

THE_WORLD = []
CACHE = {}

def get_data_from_db(query: str) -> list:
    """retrieve data from the database and return to the user"""
    response = set()
    if pathlib.Path("world.sqlite3").exists():

        connection = sqlite3.connect('world.sqlite3')
        cur = connection.cursor()
        cur.execute(query)
    else:
        db_file = pathlib.Path('exercises/geo/world.sqlite3')
        connection = sqlite3.connect(db_file)
        cur = connection.cursor()
        cur.execute(query)
    for i in cur:
        response.add(i[0])
    cur.close() 
    response =list(response)
    response.sort()
    return response
# get_data_from_db(query="dds") 
def get_country_info(column, value):
    response = []
    if pathlib.Path("world.sqlite3").exists():

        connection = sqlite3.connect('world.sqlite3')
        cur = connection.cursor()
        cur.execute(query)
    else:
        db_file = pathlib.Path('exercises/geo/world.sqlite3')
        connection = sqlite3.connect(db_file)
        cur = connection.cursor()
        cur.execute(query)
    cur.execute(f"select * from country where {column} = ?", (value,))
    for AFG, name, continent, region, surfacearea, indepyear, population, lifeexpectancy, gnp, gnpold, localname, governmentform, headofstate, capital, code2 in cur:
        response.append([AFG,name, continent, region, surfacearea, indepyear, population, lifeexpectancy, gnp, gnpold, localname, governmentform, headofstate,capital, code2])   
    cur.close() 
    return response

###
@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "GET":
        # display links to 3 options (country / region / continent)
        return render_template("index.html")
    # retrieve data from the database based on the selected option and present it to the user
    else:
        if request.form.get("country"):
            country = request.form.get("country")
            if country in CACHE:
                result = CACHE[country]
            else:
                result = get_country_info("name",country)
                CACHE[country] = result
            return render_template("index.html", rows=result)
        if request.form.get("continent"):
            continent = request.form.get("continent")
            if continent in CACHE:
                result = CACHE[continent]
            else:
                result = get_country_info("continent", continent)
                CACHE[continent] = result
            return render_template("index.html", rows=result)
        if request.form.get("region"):
            region = request.form.get("region")
            if region in CACHE:
                result = CACHE[continent]
            else:
                result = get_country_info("region", region)
                CACHE[region] = result
            return render_template("index.html", rows=result)
                


@app.route("/<string:scope>")
def search(scope: str):
    global THE_WORLD
    if scope == "country":
        # get countries from the database and populate options of the drop-down menu
        THE_WORLD = get_data_from_db(
            query= f" select name from country order by name asc"
        )
        return render_template("country.html", options=THE_WORLD)

    elif scope == "region":
        # get regions from the database and populate options of the drop-down menu
        THE_WORLD = get_data_from_db(
            query= f" select region from country order by country.region asc"
        )
        return render_template("region.html", options=THE_WORLD)
    elif scope == "continent":
        # get continents from the database and populate options of the drop-down menu
        THE_WORLD = get_data_from_db(
            query= f" select continent from country order by country.continent asc"
        )
        return render_template("continent.html", options=THE_WORLD)