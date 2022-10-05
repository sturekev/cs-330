/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';
// http://numbersapi.com/42/math?callback=showNumber 
function createDiv (data){
    let row = document.createElement("div");
    row.setAttribute("class", "row");
    let numDiv = document.createElement('div');
    numDiv.setAttribute("class", "col-1 bg-secondary text-white border rounded");
    numDiv.innerText = data["number"];
    row.appendChild(numDiv);

    let textDiv = document.createElement('div');
    textDiv.setAttribute("class", "col-6 bg-success text-white border rounded");
    textDiv.innerText = data["text"];
    row.appendChild(textDiv);
    return row
}

function checkContent(all_numbers){
    if(all_numbers.children.length>0){
        all_numbers.replaceChildren();
    }
}

async function get_individual(num, all_numbers) {
    var dataD = [];

    checkContent(all_numbers);

    let jsonData1 = await fetch(`http://numbersapi.com/${num-1}/math?json`)
    .then(response => response.json())
    .catch(error => console.log(error));
    dataD.push(jsonData1);
    
    let jsonData2 = await fetch(`http://numbersapi.com/${num}/trivia?json`)
    .then(response => response.json())
    .catch(error => console.log(error));
    dataD.push(jsonData2);

    let jsonData3 = await fetch(`http://numbersapi.com/${num+1}/date?json`)
    .then(response => response.json())
    .catch(error => console.log(error));
    dataD.push(jsonData3);

    setTimeout(function(){
            
        console.log(dataD[0]);
        let row = createDiv(dataD[0]);
        all_numbers.appendChild(row);
    },500);
    setTimeout(function(){
            
        console.log(dataD[1]);
        let row = createDiv(dataD[1]);
        all_numbers.appendChild(row);
    },1000);
    setTimeout(function(){
            
        console.log(dataD[2]);
        let row = createDiv(dataD[2]);
        all_numbers.appendChild(row);
    },1500);
        
}

async function get_batch(num, all_numbers) {
    var dataD = [];

    checkContent(all_numbers);

    let jsonData1 = await fetch(`http://numbersapi.com/${num-1}/math?json`)
    .then(response => response.json())
    .catch(error => console.log(error));
    dataD.push(jsonData1);
    
    let jsonData2 = await fetch(`http://numbersapi.com/${num}/trivia?json`)
    .then(response => response.json())
    .catch(error => console.log(error));
    dataD.push(jsonData2);

    let jsonData3 = await fetch(`http://numbersapi.com/${num+1}/date?json`)
    .then(response => response.json())
    .catch(error => console.log(error));
    dataD.push(jsonData3);

    console.log(dataD);
    for (let index = 0;index < dataD.length; index++){
        console.log(dataD[index]);
        let row = createDiv(dataD[index]);
        all_numbers.appendChild(row);
    }

}

async function clickedon() {
    let num = parseInt(document.querySelector('#number').value);
    let all_numbers = document.querySelector('#number_info');
    if (document.querySelector('#batch').checked) {
        get_batch(num, all_numbers);
    } else {
        get_individual(num, all_numbers);
    }

    const Http = new XMLHttpRequest();
    const url='http://numbersapi.com/42/math';
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
    console.log("dssdsd "+Http.responseText)
}
}
