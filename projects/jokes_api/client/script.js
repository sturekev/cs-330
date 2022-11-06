/* jshint esversion: 8 */
'use strict';

async function get_Jokes_Api (apiLink){
    top = await fetch(apiLink)
    .then((response) => response.json())
    .then((response) => {
        populateData(response);
    })
}
function defineApiGet(category,language,limit,jokeId) {
    let ApiLink;
    if (limit){
        ApiLink = 
    `http://127.0.0.1:5000/api/v1/jokes?category=${category}&language=${language}&limit=${limit}`;
    }else if(!limit){
        if (jokeId){
            ApiLink = 
    `http://127.0.0.1:5000/api/v1/jokes?category=${category}&language=${language}&limit=${limit}$id=${jokeId}`;
        }
        else{
            ApiLink = 
    `http://127.0.0.1:5000/api/v1/jokes?category=${category}&language=${language}`;
        }
    }
    return get_Jokes_Api(ApiLink);
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

window.onload =function () {
    let urlParams = new URLSearchParams(window.location.search);

    let category = urlParams.get("category") || "all";
    let language = urlParams.get("language") || "";
    let limit = urlParams.get("limit") || "";
    let jokeId = urlParams.get("id") || "";
    defineApiGet(category, language,limit, jokeId);

}
