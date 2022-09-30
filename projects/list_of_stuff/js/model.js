/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint node: true */
'use strict';

// 
// import {} from './controller.js';
//
// save data to local
//
class Player{
    constructor(Name, Position, Tier, Country, Region, Team){
        this._Name  = Name;
        this._Position = Position;
        this._Tier = Tier;
        this._Country = Country;
        this._Region = Region;
        this._Team = Team;
    }

    get Name(){
        return this._Name;
    }

    set Name(newName){
        this._Name = newName;
    }

    get Position(){
        return this._Position;
    }

    set Position(newPosition){
        this._Position = newPosition;
    }

    get Tier(){
        return this._Tier;
    }

    set Tier(newTier){
        this._Tier = newTier;
    }
    get Country(){
        return this._Country;
    }

    set Country(newCountry){
        this._Country = newCountry;
    }

    get Region(){
        return this._Region;
    }

    set Region(newRegion){
        this._Region = newRegion;
    }

    get Team(){
        return this._Team;
    }

    set Team(newTeam){
        this._Team = newTeam;
    }

    toList(){
        return [this._Name,this._Position,this._Tier,this._Country,this._Region,this._Team]
    }

}
class playerList{
    constructor(){
        this._allPlayer = [];
    }

    add(newPlayerInfo){
        this._allPlayer.push(newPlayerInfo);
    }
    get allPlayer(){
        return this._allPlayer;
    }
}