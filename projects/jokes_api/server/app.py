#!/usr/bin/env python3
"""
jokes api
"""
#!/usr/bin/env python3
"""Flask application to use `pyjokes`"""
import random
import pyjokes
from flask import Flask, render_template, request, jsonify
# get lấy cái j đấy từ server về 
# post muốn đưa lên server một cái j đấy 
# tạo một cái object để db server lưu 
# muốn server trả về cái j đấy đó là get 
app = Flask(__name__)

def getJokes (language: str,category: str,limit = None) -> list:
    try :
        if limit == None:
            data = pyjokes.get_jokes(language, category)
        else:
            data = pyjokes.get_jokes(language, category)[:limit]
    except pyjokes.pyjokes.CategoryNotFoundError :
        data = ["No kidding!"]
    return data 

@app.route("/", methods=["GET"])
def index():
    """Render the template with form"""
    return render_template("base.html")

@app.route("/api/v1/jokes", methods=["GET"])
def sendV1Jokes01():
    category = request.args.get('category')
    language = request.args.get('language')
    limit = request.args.get('number')
    id = request.args.get('id')
    data = getJokes(category=category, language=language, limit=limit)
    if id == None:
        data = getJokes(category=category, language=language, limit=limit)
    else:
        data = getJokes(category=category, language=language)[id]
    return jsonify(data)

@app.route("/api/v1/jokes/<str:language>/<str:category>/<int:limit>/<int:id>", methods=["GET"])
def sendV1Jokes02(language,category,limit = None, id = None):
    if id:
        data = getJokes(language=language,category=category,limit=limit)
    else:
        data = getJokes(language=language,category=category)[id]
    return jsonify(data)

