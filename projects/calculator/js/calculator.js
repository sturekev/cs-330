/* jshint esversion: 8 */
/* jshint browser: true */
/* jshint browser: true */
'use strict';

var outputScreen;
var clearOnEntry;

/**
 * Display a digit on the `outputScreen`
 * 
 * @param {number} digit digit to add or display on the `outputScreen`
 */
function enterDigit(digit) {
    if (typeof digit == "string"){
        outputScreen.innerHTML +=digit;
    }
    else {
        if (outputScreen.innerHTML === "0"){
            outputScreen.innerHTML = digit.toString();
        }
        else{outputScreen.innerHTML += digit.toString();}
    }
}


/**
 * Clear `outputScreen` and set value to 0
 */
function clear_screen() {
    outputScreen.innerHTML = "0";
}


/**
 * Evaluate the expression and display its result or *ERROR*
 */
function eval_expr() {
    if (outputScreen.innerHTML != "0") {
        var result = outputScreen.innerHTML;
        var val_math = outputScreen.innerHTML;
        var setOperation = new Set(["+","-","/","*"]);
        for (let idx = 0; idx < val_math.length; idx ++){
            if (setOperation.has(val_math[idx])){
                if (setOperation.has(val_math[idx+1])) {
                    result = "ERROR";
                }
                else{
                    
                    var num1 = parseFloat(val_math.slice(0,idx));
                    var num2 = parseFloat(val_math.slice(idx +1));
                    switch (val_math[idx]) {
                        case "+":
                            result = eval("num1+num2").toString();
                            break;
                        case "-":
                            result = eval("num1-num2").toString();
                            break;
                        case "*":
                            result = eval("num1*num2").toString();
                            break;
                        case "/":
                            result = eval("num1/num2").toString();
                            break;
                    }
                }
                break;
            }  
        }
        if (result != "NaN"){
            outputScreen.innerHTML = result;
        }
        else{outputScreen.innerHTML = "Infinity";}

    }
}

/**
 * Display an operation on the `outputScreen`
 * 
 * @param {string} operation to add to the expression
 */
function enterOp(operation) {
    outputScreen.innerHTML  += operation;
}

window.onload = function () {
    outputScreen = document.querySelector("#result");   
    clearOnEntry = true;
    outputScreen.innerHTML = "0";
};
