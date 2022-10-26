#!/usr/bin/env python3
"""Flask application to use `pyjokes`"""

import random
from re import I
from typing import List
from unittest import result

import pyjokes
from flask import Flask, render_template, request

app = Flask(__name__)

def getJokes (languages: str,category: str,limit: int) -> list:
    return pyjokes.get_jokes(language="de", category="neutral")[::10] 
@app.route("/", methods=["GET"])
def index():
    """Render the template with form"""
    return render_template("base.html")


@app.route("/", methods=["POST"])
def index_jokes():
    """Render the template with jokes"""
    if "category" in request.form and "language" in request.form:
        result = send_joke(language=request.form.get("language"), category=request.form.get("category"),number=int(request.form.get("number")))
        print(result)
        return render_template("jokes.html", result = result)
    else :
        raise "No data to process"

def send_joke(
    language: str = "en", category: str = "all", number: int = 1
) -> List[str]:
    """Return a list of jokes"""
    try :
        result = pyjokes.get_jokes(language, category)[:number]

    except pyjokes.pyjokes.CategoryNotFoundError :
        result = ["No kidding!"]
    return result
