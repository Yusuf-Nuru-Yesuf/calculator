let a = null;
let b = null;
let operator = null;
let result = null;
let displayValue = "";


const displayLastOperation = document.querySelector(".display-last-operation");
const displayCurrentOperation = document.querySelector(".display-current-operation");
const buttons = document.querySelectorAll("button");

buttons.forEach( button =>  button.addEventListener("click", handleButton));

function handleButton(event) {
    
    const buttonText = event.target.textContent;

    if (buttonText >= 0 && buttonText <=9 || buttonText === ".") {
        updateDisplay(buttonText);
    }
    else if (buttonText === "AC" ){
        clearDisplay();
    }
    else if (buttonText === "X") {
        deleteLastDigit();
    }
    else if (buttonText === "=") {
        calculateResult();
    }
    else {
        handleOpertor(buttonText);
    };
}

function updateDisplay(value) {
    if (displayValue.includes(".") && value === ".") return;
    displayValue += value;
    displayCurrentOperation.textContent = displayValue;
}

function clearDisplay() {
    a = null;
    b = null;
    operator = null;
    result = null;
    displayCurrentOperation.textContent = "";
    displayLastOperation.textContent = "";
    displayValue = "";
}

function deleteLastDigit() {
    displayValue = displayValue.slice(0, -1);
    displayCurrentOperation.textContent = displayValue
}

function handleOpertor(op) {
    if (a === null) {
        a = displayValue;
        operator = op; 
        displayLastOperation.textContent = `${a} ${operator}`;
        displayValue = "";
        displayCurrentOperation.textContent = "";
    }
    else if(a !== null && operator !== null && displayValue !== "") {
        b = displayValue;
        result = operate(a, b, operator);
        displayLastOperation.textContent = `${a} ${operator} ${b} =`;
        displayCurrentOperation.textContent = result;
        a = result;
        b = null;
        operator = op;
        if (operator !== "="){ 
            displayLastOperation.textContent = `${a} ${operator}`;
        }
        displayValue = ""
    }
    else {
        operator = op;
        displayLastOperation.textContent = `${a} ${operator}`;
    }
}

function calculateResult(){
    if (a !== null && operator !== null && displayValue !== "") {
        b = displayValue;
        result = operate(a, b, operator);
        displayLastOperation.textContent = `${a} ${operator} ${b} =`;
        displayCurrentOperation.textContent = result;
        a = result;
        b = null;
        operator = null;
        displayValue = "";
    }
}

function operate(a, b, operator) {
    
    a = Number(a);
    b = Number(b);  

    switch  (operator) {
        case "+":
           return (add(a, b));
        case "-":
            return (subtract(a, b));
        case "*":    
            return (multiply(a, b));         
        case "/":  
            if (b === 0) alert("You can't divide by 0");
            else return (divide(a, b));
        default:
            return null;
    }
}

function add (a, b) {
    return a + b ;
  }
  
function subtract(a, b) {
    return a - b;
  }

function multiply(a, b) {
    return a * b;
  }

function divide (a, b) {
    return a / b;
  }