document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    let displayValue = '0';
    let firstOperand = null;
    let secondOperand = null;
    let currentOperator = null;

    function updateDisplay() {
        display.textContent = displayValue;
    }

    function handleNumber(number) {
        if (displayValue === '0') {
            displayValue = number;
        } else {
            displayValue += number;
        }
        updateDisplay();
    }

    function handleOperator(operator) {
        if (firstOperand === null) {
            firstOperand = parseFloat(displayValue);
        } else if (currentOperator) {
            secondOperand = parseFloat(displayValue);
            displayValue = String(performCalculation(firstOperand, secondOperand, currentOperator));
            firstOperand = parseFloat(displayValue);
        }
        currentOperator = operator;
        displayValue = '0';
        updateDisplay();
    }

    function performCalculation(first, second, operator) {
        switch (operator) {
            case '+':
                return first + second;
            case '-':
                return first - second;
            case '*':
                return first * second;
            case '/':
                return first / second;
            default:
                return second;
        }
    }

    function handleEqual() {
        if (currentOperator) {
            secondOperand = parseFloat(displayValue);
            displayValue = String(performCalculation(firstOperand, secondOperand, currentOperator));
            firstOperand = null;
            currentOperator = null;
            updateDisplay();
        }
    }

    function handleClear() {
        displayValue = '0';
        firstOperand = null;
        secondOperand = null;
        currentOperator = null;
        updateDisplay();
    }

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const value = button.getAttribute('data-value');
            if (button.classList.contains('operator')) {
                handleOperator(value);
            } else if (button.classList.contains('equal')) {
                handleEqual();
            } else if (button.classList.contains('clear')) {
                handleClear();
            } else {
                handleNumber(value);
            }
        });
    });
});
