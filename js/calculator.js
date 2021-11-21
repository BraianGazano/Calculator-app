export default class Calculator{
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
