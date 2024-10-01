// Get the display element
const display = document.getElementById('display') as HTMLInputElement;

// Get the button elements
const buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;

// Get the on/off buttons
const helloButton = document.getElementById('hello') as HTMLButtonElement;
const byeButton = document.getElementById('bye') as HTMLButtonElement;
const acButton = document.getElementById('AC') as HTMLButtonElement; // Assuming there's an AC button

// Define the calculator state
let expression = ''; // Full expression string
let isCalculatorOn = false; // Calculator power state
const MAX_INPUT_LENGTH = 10;
display.style.backgroundColor = "#1d2951" // Maximum number of characters allowed

// Function to evaluate the expression manually
function calculateExpression(expression: string): number {
    try {
        const result = Function(`"use strict"; return (${expression})`)();
        return result;
    } catch (error) {
        throw new Error('Invalid expression');
    }
}

// Add event listeners to the buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent?.trim();

        if (!isCalculatorOn) return; // Disable all buttons when the calculator is off

        // Remove highlight from all buttons
        buttons.forEach(btn => btn.classList.remove('highlight'));
        // Highlight the clicked button
        button.classList.add('highlight');

        // Limit input to 16 characters
        if (expression.length >= MAX_INPUT_LENGTH && buttonValue !== 'DEL' && buttonValue !== '=') {
            return; // Prevent input if the limit is reached
        }

        // Handle number buttons and decimal
        if (!isNaN(Number(buttonValue)) || buttonValue === '.') {
            if (buttonValue === '.' && expression.includes('.')) return; // Prevent multiple decimals
            expression += buttonValue; // Append number or decimal to the expression
            display.value = expression; // Update the display
        }

        // Handle operation buttons
        if (['+', '-', '*', '/'].includes(buttonValue!)) {
            if (['+', '-', '*', '/'].includes(expression.slice(-1))) return; // Avoid adding consecutive operators
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

        // Handle delete button (assuming there is a delete button in the UI with value "DEL")
        if (buttonValue === 'DEL') {
            expression = expression.slice(0, -1); // Remove the last character
            display.value = expression || '0'; // Display '0' if the expression is empty
        }
    });
});
acButton.addEventListener('click', () => {
    if (!isCalculatorOn) {
        isCalculatorOn = true;
        display.value = '0';
        display.style.backgroundColor = "#f0ffff";// Initial display when turned on
    } else {
        expression = '';
        display.value = ''; // Clear display when AC is pressed again
    }
});
// Handle the hello button
helloButton.addEventListener('click', () => {
    if (!isCalculatorOn) return; // Disable all buttons when the calculator is off
    else{
    const messages = ["Hello!", "Salut!", "Hallo!", "Hola!", "Ciao!", "Konnichiwa!"];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    display.value = randomMessage; // Display greeting in the input box
    setTimeout(() => {
        if (!isCalculatorOn) return; // Ensure the calculator remains on
        display.value = ' '; // Reset display after greeting
    }, 1000);
 } // Delay for 2 seconds before showing an empty space
});

// Handle turning the calculator off
byeButton.addEventListener('click', () => {
    if (isCalculatorOn) {
        display.value = "Goodbye!!"; // Display goodbye message in the input box
        display.style.backgroundColor = "#1d2951";
        display.style.color = "#ffffff";
        setTimeout(() => {
            isCalculatorOn = false;
            expression = '';
            display.value = ''; // Clear the display after turning off
        }, 2000); // Delay for 2 seconds before turning off the calculator
    }
});
