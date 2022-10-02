/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';
// import {allPlayer,Player,Subject} from './model.js';
// 
// implement funtions
//

class playersView {
    constructor(model){
        model.subscribe(this.redrawTable.bind(this))
    }
    redrawTable(listOfPlayer, message){
        let tblBody = document.querySelector("#playerTable > tbody");
        tblBody.innerText = "";
        for(let playerInfo of listOfPlayer){
            let row = document.createElement("tr");
            let curPlayerId  = document.querySelectorAll("#playerTable > tbody > tr").length;
            row.setAttribute("id", `${curPlayerId}`);

            let tdCheckBox  = document.createElement("td");
            let cb = document.createElement("input");
            cb.setAttribute("type","checkbox");

            tdCheckBox.appendChild(cb);
            row.appendChild(tdCheckBox);

            let playerName = document.createElement("td");
            let playerPosition = document.createElement("td");
            let playerTier = document.createElement("td");
            let playerCountry = document.createElement("td");
            let playerRegion = document.createElement("td");
            let playerTeam = document.createElement("td");

            playerName.innerText = playerInfo.Name;
            playerPosition.innerText = playerInfo.Position;
            playerTier.innerText = playerInfo.Tier;
            playerCountry.innerText = playerInfo.Country;
            playerRegion.innerText = playerInfo.Region;
            playerTeam.innerText = playerInfo.Team;

            playerTier.setAttribute("class", playerInfo.Tier);

            row.appendChild(playerName);
            row.appendChild(playerPosition);
            row.appendChild(playerTier);
            row.appendChild(playerCountry);
            row.appendChild(playerRegion);
            row.appendChild(playerTeam);

            tblBody.appendChild(row);


        }
    }
}
