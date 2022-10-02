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

}
class Subject{
    constructor(){
        this._allSubject = [];
    }

    subscribe(newPlayerInfo){
        this._allSubject.push(newPlayerInfo);
    }
    get allPlayer(){
        return this._allSubject;
    }

    unsubscribe(playerInfo){
        this._allSubject = this._allSubject.filter(item => item !== playerInfo);
    }

    publish(message, object){
        let scope = object || window;
        for (let playerId of this._allSubject){
            playerId(scope, message)
        }
    }
}

class allPlayer extends Subject {
    constructor(){
        super();
        this._allPlayer = [];
    }

    addPlayer (playerInfo){
        this.allPlayer.push(playerInfo);
        this.publish("New player has been added", this);
    }

    remove(trIds){
        for (let index = trIds.length; index > 0, index --;){
            this._allPlayer.splice(trIds[index],1);
        }

    }

    removeAll (){
        this._allPlayer = [];
        this.publish("The player local storage has been cleared", this);
    }

    [Symbol.iterator](){
        let index = -1;
        return{ next: () => ({value: this._allPlayer[++index], done : !(index in this._allPlayer)})};
    }
}