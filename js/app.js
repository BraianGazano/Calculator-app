const numberButtons = document.querySelectorAll('[data-number]');
const operationsButtons = document.querySelectorAll('[data-operation]');
const equalButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-clear]');
const deleteButton = document.querySelector('[data-delete]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const themeToggle = document.querySelector('.theme-change');

class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }
    
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    
    appendNumber(number) {
        if(number ==='.' && this.currentOperand.includes('.')){return;}
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    
    chooseOperation(operation) {
        if(this.currentOperand === ''){return;}
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    
    compute() {
        let computation;
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(previous)||isNaN(current)){return;}
        switch (this.operation){
            case '+':
                computation = previous + current;
                break;
            case '-':
                computation = previous - current;
                break;
            case 'x':
                computation = previous * current;
                break;
            case '/':
                computation = previous / current;
                break;
            default:
                return;
            }
            this.currentOperand = computation;
            this.operation =undefined;
            this.previousOperand = '';
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
          integerDisplay = '';
        } else {
          integerDisplay = integerDigits.toLocaleString(undefined, { maximumFractionDigits: 3})
        }
        if (decimalDigits != null) {
          return `${integerDisplay},${decimalDigits}`
        } else {
          return integerDisplay
        }
    }
}


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

const themes = document.getElementsByName('radiobtn');
const container = document.body;
themes.forEach(theme => {
    theme.addEventListener('change', changeTheme)
});

function changeTheme(e) {
    const clicked = e.target.value;
    if (clicked == "btn-1") {
        container.classList.remove("theme-two", "theme-three");
    } else if (clicked == "btn-2") {
        container.classList.remove("theme-three");
        container.classList.add("theme-two")
    } else if (clicked == "btn-3") {
        container.classList.remove("theme-two");
        container.classList.add("theme-three")
    }
}

numberButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

