/* jshint esversion: 8 */
/* jshint browser: true */
"use strict;";
// import datepicker from `js-datepicker`
var team = ["Aardvark", "Beaver", "Cheetah", "Dolphin", "Elephant", "Flamingo", "Giraffe", "Hippo"];
var priority = ["Low", "Normal", "Important", "Critical"];

function displayWarnings( ){
    let warningDiv = document.querySelector("#feedbackMessage");
    let warnName = document.createElement('div');
    warnName.innerText = `Fill out title and due date`;
    warnName.classList.add("alert","alert-warning");
    warningDiv.appendChild(warnName);
    
}
/**
 * Add a new task to the list
 * 
 * Validate form, collect input values, and add call `addRow` to add a new row to the table
 */
function addTask() {
    // TODO: Implement this function
    let vals = [];
    let rowcolids = ["title", "assignedTo", "priority", "dueDate"];

    //select id from html
    let titleVal = document.getElementById(rowcolids[0]).value;
    let dueDateVal = document.getElementById(rowcolids[3]).value;
    if (!titleVal || !dueDateVal){
        displayWarnings();
    }
    else{
        for (row of rowcolids){
        let val = document.getElementById(row).value;
        vals.push(val);
        }
        addRow(vals, document.getElementById("taskList"));
    }
    
    
}

/**
 * Add a new row to the table
 * 
 * @param {string[]} valueList list of task attributes
 * @param {Object} parent DOM node to append to
 */
function addRow(valueList, parent) {
    // TODO: Implement this function
    let tb = parent.getElementsByTagName("tbody")[0];
    let row = document.createElement("tr");
    let td = document.createElement("td");
    let cb = document.createElement("input");

    let priorityVal = document.getElementById('priority').value;
    tb.setAttribute("class",priorityVal.toLowerCase());
    cb.setAttribute("type","checkbox");
    cb.setAttribute("onclick","removeRow(this);");
    td.appendChild(cb);
    row.appendChild(td);
    for (value of valueList){
        let td = document.createElement("td");
        td.innerHTML = value;
        row.appendChild(td)
    }
    tb.appendChild(row);
}

/**
 * Remove a table row corresponding to the selected checkbox
 * 
 * https://stackoverflow.com/questions/26512386/remove-current-row-tr-when-checkbox-is-checked
 */
function removeRow(element) {
    // TODO: Implement this function
    let closetTr = element.closest("tr");
    closetTr.parentElement.removeChild(closetTr);
}

/**
 * Remove all table rows
 * 
 */
function selectAll() {
    let tbody = document.getElementsByTagName("tbody")[0];
    let allTr = tbody.getElementsByTagName("tr");
    for (index = allTr.length - 1; index >= 0; index--){
        tbody.removeChild(allTr[index]);
    }
}

/**
 * Add options to the specified element
 * 
 * @param {string} selectId `select` element to populate
 * @param {string[]} sList array of options
 */
function populateSelect(selectId, sList) {
    // TODO: Implement this function
    let sel = document.getElementById(selectId, sList);
    for (let option in sList) {
        let anOption = document.createElement("option");
        anOption.setAttribute("value", sList[option]);
        anOption.innerHTML = sList[option];
        sel.appendChild(anOption);
    }
}

window.onload = function () {
    populateSelect("assignedTo", team);
    populateSelect("priority", priority);
};
