/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';
//Import other file.js
// import {} from './model.js';
// import {addRow,removeRow,RemoveAll} from './controller.js';
// view  method interface for user

// Tiers List
var Tiers = ["S", "A", "B", "C", "D","E", "F"];
//Regions List
var Regions = ["LCK", "LEC", "LCS", "LPL", "PCS", "VCS", "CBLOL", "LJL","LLA","LCO","TCL","LCL"];
// Positions
var Positions  = ["Top", "Jungle", "Mid", "Bot", "Support"];
//Teams by region
var Teams = ["G2 Esports", "Rogue","MAD Lions", "Fnatic",
 "Gen.G", "T1", "DWG KIA", "DRX","100 Thieves", "Cloud9", "Evil Geniuses",
 "JD Gaming", "Top Esports", "Edward Gaming", "Royal Never Give Up",
 "CTBC Flying Oyster", "Beyond Gaming","Saigon Buffalo", "GAM Esports",
 "CBLOL","LOUD","DetonatioN FocusMe", "Isurus","The Chiefs","Istanbul Wildcats"];
//
// warning
function displayWarnings( ){
    let warningDiv = document.querySelector("#feedbackMessage");
    let warnName = document.createElement('div');
    warnName.innerText = `Fill out Player Name or Country`;
    warnName.classList.add("alert","alert-warning");
    warningDiv.appendChild(warnName);
    
}
// add Task function
function addTask() {
    let vals = [];
    let rowcolids = ["PlayerName", "Position", "Tier", "Country", "Region", "Team"];

    //select id from html
    let PlayerNameVal = document.getElementById(rowcolids[0]).value;
    let CountryVal = document.getElementById(rowcolids[3]).value;
    if (!PlayerNameVal || !CountryVal){
        displayWarnings();
    }
    else{
        for (let row of rowcolids){
        let val = document.getElementById(row).value;
        vals.push(val);
        }
        addRow(vals, document.getElementById("taskList"));
    }
    
    
}

//Add a new row to the table

function addRow(valueList, parent) {
    let tb = parent.getElementsByTagName("tbody")[0];
    let row = document.createElement("tr");
    let td = document.createElement("td");
    let cb = document.createElement("input");

    let tierVal = document.getElementById('Tier').value;
    
    
    cb.setAttribute("type","checkbox");
    // set up for check box;
    cb.setAttribute("onclick","checkSelect(this);");
    td.appendChild(cb);
    row.appendChild(td);

    for (let value of valueList){
        let td = document.createElement("td");
        if (value == tierVal){td.setAttribute("class",`col-2 ${tierVal}`);}
        td.innerText = value;
        row.appendChild(td)
    }
    tb.appendChild(row);
}

var thisList = [];
function checkSelect(selector){
    console.log(document.querySelector(this).value);
    // thisList.push(this.value);
}
//Safe data to Local
function saveToJson(){
    let tbody = document.querySelector("tb");
    console.log(tbody);
    // let allTr = tbody.getElementsByClassName("tr");
    // for (let index = 0; index<allTr.length; index++){
    //     console.log("running");
    //     let allTh = allTr.querySelectorAll("th").value;
    //     console.log(allTh);
    // }
}

//Remove a table row corresponding to the selected checkbox

function removeRow(element) {
    let closetTr = element.closest("tr");
    closetTr.parentElement.removeChild(closetTr);
    for (let index = allTr.length - 1; index >= 0; index--){
        tbody.removeChild(allTr[index]);
    }
}

//Remove all table rows
function RemoveAll() {
    let tbody = document.getElementsByTagName("tbody")[0];
    let allTr = tbody.getElementsByTagName("tr");
    for (let index = allTr.length - 1; index >= 0; index--){
        tbody.removeChild(allTr[index]);
    }
}



// show the option for Sellect options
function populateSelect(selectId, sList) {
    let sel = document.getElementById(selectId, sList);
    for (let option in sList) {
        let anOption = document.createElement("option");
        anOption.setAttribute("value", sList[option]);
        anOption.innerText = sList[option];
        sel.appendChild(anOption);
    }
}

window.onload = function(){
    populateSelect("Position", Positions);
    populateSelect("Tier", Tiers);
    populateSelect("Region", Regions);
    populateSelect("Team",Teams);

};