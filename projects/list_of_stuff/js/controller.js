/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';
// //Import other file.js
// import {allPlayer} from './model';
// import {playersView} from './controller';

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

var playerModel = new allPlayer ();
var playerView = new playersView(playerModel);
// warning
function displayWarnings(){
    let warningDiv = document.querySelector("#feedbackMessage");
    let warnName = document.createElement('div');
    warnName.innerText = `Fill out Player Name or Country`;
    warnName.classList.add("alert","alert-warning");
    warningDiv.appendChild(warnName);
    
}
// add Task function
function addPlayer() {
    let vals = [];
    let rowcolids = ["PlayerName", "Position", "Tier", "Country", "Region", "Team"];

    //select id from html
    let PlayerNameVal = document.getElementById(rowcolids[0]).value;
    let CountryVal = document.getElementById(rowcolids[3]).value;
    if (!PlayerNameVal || !CountryVal){
        displayWarnings();
    }
    else{
        let warningMsg = document.querySelector("#feedbackMessage");
        warningMsg.classList = "";
        warningMsg.innerText = "";
        for (let row of rowcolids){
        let val = document.getElementById(row).value;
        vals.push(val);
        }

        let newPlayer = new Player(vals[0], vals[1], vals[2], vals[3], vals[4], vals[5]);
        playerModel.addPlayer(newPlayer);
        // list of data
        // addRow(vals, document.getElementById("taskList"));
    }
    
    
}

function savePlayerList (){
    //localStorage.removeItem("local_garage");
    localStorage.setItem("local_PlayerList", JSON.stringify(playerModel));
}


function loadPlayerList (){
    let playerSet  = localStorage.getItem("local_PlayerList");
    let players = [];
    if (playerSet) {
        players = JSON.parse(playerSet)['_allPlayer'];
    }
    for (let player of players){
        let newPlayer  = new Player(player["_Name"], player["_Position"], player["_Tier"], player["_Country"], player["_Country"], player["_Region"], player["_Team"]);
        playerModel.addPlayer(newPlayer);
    }
}
var deletePlayerIdList = [];
function clearPlayers (){ 
    let cbList = document.querySelectorAll("#playerTable > tbody > tr > td > input[type = 'checkbox']");
    for (let checkbox of cbList){
        if (checkbox.checked){
            deletePlayerIdList.push(parseInt(checkbox.closest('tr')['id']));
        }
    }
    console.log(deletePlayerIdList);
    console.log(playerModel)
    playerModel.removePlayer(deletePlayerIdList);
}

//Remove all table rows
function RemoveAll() {
    playerModel.removeAll();
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
    loadPlayerList();

};