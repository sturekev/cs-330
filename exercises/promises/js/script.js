/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';
// http://numbersapi.com/42/math?callback=showNumber 
function createDivforIndivdual (info,all_numbers){
    let row = document.createElement("div");
    row.classList= "row";

    let numDiv = document.createElement('div');
    numDiv.innerText = `${info.number}`;
    numDiv.classList = "h1 col-4";
    row.appendChild(numDiv);

    let textDiv = document.createElement('div');
    textDiv.innerText = `${info.text}`;
    textDiv.classList = "alert alert-success col-8";
    row.appendChild(textDiv);
    all_numbers.appendChild(row);
}

function createDivforBatch (key,info,all_numbers){
    let newDiv = document.createElement('div');
    newDiv.classList = 'row';

    let numDiv = document.createElement('div');
    numDiv.innerText = `${key}`;
    numDiv.classList = 'h1 col-4';
    newDiv.appendChild(numDiv);

    let infoDiv = document.createElement('div');
    infoDiv.innerText = `${info[key]}`;
    infoDiv.classList = 'alert alert-success col-8';
    newDiv.appendChild(infoDiv);

    all_numbers.appendChild(newDiv);
}

function checkContent(all_numbers){
    if(all_numbers.children.length>0){
        all_numbers.replaceChildren();
    }
}

async function get_individual(num, all_numbers) {
    checkContent(all_numbers);
    
    let index_num  = num -1;
    while (index_num <= num+1){
        let currNumInfo = await fetch(`http://numbersapi.com/${index_num}?json`)
        .then(response => response.json())
        .catch(error => console.log(error));

        createDivforIndivdual(currNumInfo,all_numbers);
        index_num++;
    }
}

async function get_batch(num, all_numbers) {
    checkContent(all_numbers);

    let allInfo = await fetch(`http://numbersapi.com/${num-1}..${num+1}`)
    .then(response => response.json())
    .catch(error => console.log(error));

    for (let key in allInfo){
        createDivforBatch(key,allInfo,all_numbers);
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
}
