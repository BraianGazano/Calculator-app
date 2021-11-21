import Calculator from "./calculator.js";

const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

deleteButton.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
});

clearButton.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
});

equalButton.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
});

operationsButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

numberButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

