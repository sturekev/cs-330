/* jshint esversion: 8 */
'use strict';

async function get_Jokes_Api (apiLink){
    apiCall = await fetch(apiLink)
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
        if (response["error"]){
            displayWarning(response["error"]);
        }else{ populateData(response); }
        
    })
}
function defineApiGet(category,language,limit = null,jokeId = null){
    let ApiLink;
    if (limit){
        ApiLink = 
    `https://kevin00co.pythonanywhere.com/api/v1/jokes?category=${category}&language=${language}&limit=${limit}`;
    }else if(!limit){
        if (jokeId){
            ApiLink = 
    `https://kevin00co.pythonanywhere.com/api/v1/jokes?category=${category}&language=${language}&limit=${limit}$id=${jokeId}`;
        }
        else{
            ApiLink = 
    `https://kevin00co.pythonanywhere.com/api/v1/jokes?category=${category}&language=${language}`;
        }
    }
    get_Jokes_Api(ApiLink);
}
async function randomJokes() {
    apiCall =  await fetch('https://kevin00co.pythonanywhere.com/api/v1/jokes/random')
    .then((response) => response.json())
    .then((response) => {
        console.log(response)
        if (response["error"]){
            displayWarning(response["error"]);
        }else{ populateData(response); }
    })
}

function getRandomJokes() {
    randomJokes();      
}

function getConditionJokes() {
    let category = document.querySelector("#categories").value;
    let language = document.querySelector('#language').value;
    let number = document.querySelector('#limit').value || null;
    let id = document.querySelector('#id').value || null;
    defineApiGet(category,language,number,id);
}

function populateData(response) {
    let contentDiv = document.querySelector("content");
    let data = response[0];
    for (let index = 0; index < data.lenght; index++){
        let div = document.createElement("div");
        let idx = document.createElement("div");
        idx.innerText = index;
        div.appendChild(idx);

        let content = document.createElement("div");
        content.innerText = data[index];
        div.appendChild(content);

        contentDiv.appendChild(div);
    }
}

function displayWarning(response) {
    let warningGreet  = document.querySelector("feedbackMessage");
    let warnNumber = document.createElement('div');
    warnNumber.innerText = response["error"];
    warnNumber.classList.add("alert","alert-warning");
    warningGreet.appendChild(warnNumber);
}

window.onload =function () {
}
