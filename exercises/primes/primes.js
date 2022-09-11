/* jshint esversion: 8 */
/* jshint node: true */
/* jshint browser: true */
'use strict';

/**
 * Greet user by name
 * 
 * @param {string} name visitor's name
 * @param {string} selector element to use for display
 */
function greet(name, selector) {
    let greetElement = document.querySelector(selector);
    let p = document.createElement("h1");
    
    p.innerText = `Hello ${name}`;
    greetElement.append(p);

}


/**
 * Check if a number is prime
 * 
 * @param {number} number number to check
 * @return {boolean} result of the check
 */
function isPrime(number) {
    var count = 0;
    for (let i = 2; i <= number / 2; i++) {
        let check = number % i;
        if (check == 0) {
            count++;
            break;
        }
    }
    if (count > 0) {return false;}
        else {return true;}
}


/**
 * Print whether a number is prime
 * 
 * @param {number} number number to check
 * @param {string} selector element to use for display
 */
function printNumberInfo(number, selector) {
    let greetElement = document.querySelector(selector);
    let p = document.createElement('p');
    if (isPrime(number)){
        p.innerText = `${number} is a Prime number`;
        greetElement.append(p);   
    }
    else{
        p.innerText = `${number} not a prime number`;
        greetElement.append(p);
        
    }
    
}


/**
 * Generate an array of prime numbers
 * 
 * @param {number} number number of primes to generate
 * @return {number[]} an array of `number` prime numbers
 */
function getNPrimes(number) {
    const arr = [];
    let i = 2;
    while(arr.length < number){
        if(isPrime(i)){
            arr.push(i);
        };
        i = i === 2 ? i+1 : i+2;
    };
    return arr;
}

function addRowToTable (row, data, content){
    let newRow = document.createElement(row);
    let newData = document.createElement(data);

    newData.innerText = content;
    newRow.appendChild(newData);
    return newRow;
}

/**
 * Print a table of prime numbers
 * 
 * @param {number} number number of primes to display
 * @param {string} selector element to use for display
 */
function printNPrimes(number, selector) {
    let tableDiv = document.querySelector(`${selector} thead`);
    let headTable = addRowToTable("tr","th",`First ${number} primes`);
    let tableLine = document.querySelector(`${selector} tbody`);

    tableDiv.appendChild(headTable);

    const primes  = getNPrimes(number);
    let idx = 0;
    while ( idx< primes.length ) {
        let addPrimetoRow = addRowToTable("tr","td", primes[idx]);
        tableLine.appendChild(addPrimetoRow);
        idx++;
    }

}


/**
 * Display warning about missing URL query parameters
 * 
 * @param {Object} urlParams URL parameters
 * @param {string} selector element to use for display
 */
function displayWarnings(urlParams, selector) {
    let warningGreet  = document.querySelector(selector);
    let urlParamsName = urlParams["name"];
    let urlParamsNumber = urlParams["number"] ?? urlParams["n"];
    if (!urlParamsName){
        let warnName = document.createElement('div');
        warnName.innerText = `you did not provide any name`;
        warnName.classList.add("alert","alert-warning");
        warningGreet.appendChild(warnName);
    }
    if (!urlParamsNumber){
        let warnNumber = document.createElement('div');
        warnNumber.innerText = 'you did not provide any number';
        warnNumber.classList.add("alert","alert-warning");
        warningGreet.appendChild(warnNumber);
    }
}

window.onload = function () {
    // TODO: Initialize the following variables
    let urlParams = new URLSearchParams(window.location.search);
    let name = urlParams["name"] ?? "student";
    let number = urlParams["number"] ?? urlParams["n"] ?? 330;
    this.displayWarnings(urlParams, "#warnings");
    greet(name, "#greeting");
    printNumberInfo(number, "#numberInfo");
    printNPrimes(number, "table#nPrimes");
};
