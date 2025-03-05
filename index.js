// Get references to the input and button elements
const input = document.querySelector('input');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let previousInput = '';

// Add event listeners for button clicks
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        // Handle clear button (AC)
        if (buttonText === 'AC') {
            currentInput = '';
            previousInput = '';
            operator = '';
            input.value = '0';
            return;
        }

        // Handle delete button (DEL)
        if (buttonText === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            input.value = currentInput || '0';
            return;
        }

        // Handle operator buttons (+, -, *, /, %)
        if (['+', '-', '*', '/', '%'].includes(buttonText)) {
            if (currentInput !== '') {
                if (previousInput !== '') {
                    calculate();
                }
                operator = buttonText;
                previousInput = currentInput;
                currentInput = '';
            }
            return;
        }

        // Handle equal button (=)
        if (buttonText === '=') {
            if (currentInput !== '' && previousInput !== '') {
                calculate();
            }
            return;
        }

        // Handle decimal point (.)
        if (buttonText === '.') {
            if (!currentInput.includes('.')) {
                currentInput += buttonText;
                input.value = currentInput;
            }
            return;
        }

        // Handle numeric button clicks (0-9, 00)
        if (!isNaN(buttonText) || buttonText === '00') {
            currentInput += buttonText === '00' ? '00' : buttonText;
            input.value = currentInput;
        }
    });
});

// Function to perform calculations
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current !== 0) {
                result = prev / current;
            } else {
                result = 'Error';
            }
            break;
        case '%':
            result = (prev * current) / 100;
            break;
        default:
            return;
    }

    input.value = result;
    previousInput = result;
    currentInput = '';
    operator = '';
}
