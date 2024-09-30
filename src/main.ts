// Get the display element
const display = document.getElementById('display') as HTMLInputElement;

// Get the button elements
const buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;

// Get the on/off buttons
const helloButton = document.getElementById('hello') as HTMLButtonElement;
const byeButton = document.getElementById('bye') as HTMLButtonElement;

// Define the calculator state
// let currentNumber = ''; // Current input
let expression = ''; // Full expression string
let isCalculatorOn = false; // Calculator power state
const MAX_INPUT_LENGTH = 16; // Maximum number of characters allowed

// Function to evaluate the expression manually
function calculateExpression(expression: string): number {
    try {
        // Use JavaScript's Function constructor to safely evaluate expressions
        const result = Function(`"use strict"; return (${expression})`)();
        return result;
    } catch (error) {
        throw new Error('Invalid expression');
    }
}

// Add event listeners to the buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if (!isCalculatorOn) return; // Disable all buttons when the calculator is off
        const buttonValue = button.textContent?.trim();

        // Remove highlight from all buttons
        buttons.forEach(btn => btn.classList.remove('highlight'));
        // Highlight the clicked button
        button.classList.add('highlight');

        // Limit input to 16 characters
        if (expression.length >= MAX_INPUT_LENGTH && buttonValue !== 'DEL' && buttonValue !== 'C' && buttonValue !== '=') {
            return; // Prevent input if the limit is reached and it's not a special action
        }

        // Handle number buttons and decimal
        if (!isNaN(Number(buttonValue)) || buttonValue === '.') {
            if (buttonValue === '.' && expression.includes('.')) return; // Prevent multiple decimals
            expression += buttonValue; // Append number or decimal to the expression
            display.value = expression; // Update the display
        }

        // Handle operation buttons
        if (['+', '-', '*', '/'].includes(buttonValue!)) {
            // Avoid adding an operator if the last character is already an operator
            if (['+', '-', '*', '/'].includes(expression.slice(-1))) return;
            expression += buttonValue!; // Append the operator to the expression
            display.value = expression; // Update the display
        }

        // Handle equals button
        if (buttonValue === '=') {
            if (expression === '') return; // Prevent calculating if missing values
            try {
                const result = calculateExpression(expression);
                display.value = result.toString(); // Show result in the display
                expression = result.toString(); // Reset the expression for continued calculations
            } catch (error) {
                display.value = (error as Error).message;
                expression = '';
            }
        }

        // Handle clear button (assuming there is a clear button in the UI with value "C")
        if (buttonValue === 'C') {
            expression = '';
            display.value = '';
        }

        // Handle delete button (assuming there is a delete button in the UI with value "DEL")
        if (buttonValue === 'DEL') {
            expression = expression.slice(0, -1); // Remove the last character
            display.value = expression || '0'; // Display '0' if the expression is empty
        }
    });
});

// Handle turning the calculator on
helloButton.addEventListener('click', () => {
    if (!isCalculatorOn) {
        isCalculatorOn = true;
        const messages = ["Hello!", "Salut!", "Hallo!", "Hola!", "Ciao!", "Konnichiwa!"];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        display.value = randomMessage; // Display greeting in the input box
        display.style.backgroundColor = "#f0ffff";
        setTimeout(() => {
            isCalculatorOn = true;
            display.value = ' ';
        }, 2000); // Delay for 2 seconds before turning on the calculator
    }
});

// Handle turning the calculator off
byeButton.addEventListener('click', () => {
    if (isCalculatorOn) {
        display.value = "Goodbye!!"; // Display goodbye message in the input box
        display.style.backgroundColor = "#1d2951";
        setTimeout(() => {
            isCalculatorOn = false;
            expression = '';
            display.value = ''; // Clear the display after turning off
        }, 2000); // Delay for 2 seconds before turning off the calculator
    }
});
