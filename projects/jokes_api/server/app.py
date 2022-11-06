#!/usr/bin/env python3
"""
jokes api
"""
#!/usr/bin/env python3
"""Flask application to use `pyjokes`"""
import random
import pyjokes
from flask import Flask, request, jsonify
# get lấy cái j đấy từ server về 
# post muốn đưa lên server một cái j đấy 
# tạo một cái object để db server lưu 
# muốn server trả về cái j đấy đó là get 
app = Flask(__name__)

def getJokes (language: str,category: str,limit = None) -> list:
    try :
        if limit:
            data = pyjokes.get_jokes(language, category)[:limit]
        else:
            data = pyjokes.get_jokes(language, category)
    except pyjokes.pyjokes.CategoryNotFoundError :
        data = ["No kidding!"]
    return data 

@app.route("/api/v1/jokes", methods=["GET"])
def sendV1Jokes01():
    category = request.args.get('category')
    language = request.args.get('language')
    limit = request.args.get('limit')
    id = request.args.get('id')
    if id:
        try: 
            data = getJokes(category=category, language=language)[int(id)]
        except Exception:
            return jsonify({"error": "Index out of range "}), 404
    else:
        data = getJokes(category=category, language=language, limit=int(limit))
            
    return jsonify(data),200

@app.route("/api/v1/jokes/<language>/<category>/<int:limit>/<int:id>", methods=["GET"])
def sendV1Jokes02(language,category,limit = None, id = None):
    if id:
        data = getJokes(language=language,category=category,limit=limit)
    else:
        data = getJokes(language=language,category=category)[int(id)]
    if id:
        try: 
            data = getJokes(language=language,category=category)[int(id)]
        except Exception:
            return jsonify({"error": "Index out of range "}), 404
    else:
        data = getJokes(language=language,category=category,limit=limit)
    return jsonify(data),200