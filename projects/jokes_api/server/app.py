
# A very simple Flask Hello World app for you to get started with...
import random
import pyjokes
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app=app)

def getJokes (language: str,category: str) -> list:
    if language == "all" and category != "all":
        data = pyjokes.get_jokes(category = category)
    elif language != "all" and category == "all":
        data = pyjokes.get_jokes(language = language)
    else:
        data = pyjokes.get_jokes(language, category)
    return data

def getRandomJokes ():
    data = pyjokes.get_jokes()
    randomId = random.randrange(0,len(data)-1)
    return data[randomId]


@app.route("/api/v1/jokes", methods=["GET"])
@cross_origin()
def sendV1Jokes01():
    category = request.args.get('category')
    language = request.args.get('language')
    if request.args.get('id'):
        id = request.args.get('id')
        try:
            data = getJokes(category=category, language=language)[int(id)]
        except:
            return jsonify({"error": "Index out of range "})
    if request.args.get('limit'):
        limit = request.args.get('limit')
    try:
        data = getJokes(category=category, language=language)[int(limit)]
    except:
        return jsonify({"error": "Index out of range "})

    return jsonify({"data":data })

if __name__ == '__main__':
    app.run()