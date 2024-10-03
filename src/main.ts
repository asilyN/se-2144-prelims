
const display = document.getElementById('display') as HTMLInputElement;
const buttons = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;
const helloButton = document.getElementById('hello') as HTMLButtonElement;
const byeButton = document.getElementById('bye') as HTMLButtonElement;
const acButton = document.getElementById('AC') as HTMLButtonElement;


let expression = '';
let isCalculatorOn = false
const MAX_INPUT_LENGTH = 15;
display.style.backgroundColor = "#7972c3"


function calculateExpression(expression: string): number | string {
    if (expression.includes('/0')) {
        return 'Error';
    }
    try {
        const result = Function(`"use strict"; return (${expression})`)();
        return result;
    } catch (error) {
        return 'Invalid expression';
    }
}


buttons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonValue = button.textContent?.trim();

        if (!isCalculatorOn) return;


        buttons.forEach(btn => btn.classList.remove('highlight'));
        button.classList.add('highlight');


        if (expression.length >= MAX_INPUT_LENGTH && buttonValue !== 'DEL' && buttonValue !== '=') {
            return;
        }


        if (!isNaN(Number(buttonValue)) || buttonValue === '.') {
            if (buttonValue === '.') {
                const parts = expression.split(/[+\-*/]/);
                const lastPart = parts[parts.length - 1];
                if (lastPart.includes('.')) return;
            }
            expression += buttonValue;
            display.value = expression;
        }

        if (['+', '-', '*', '/'].includes(buttonValue!)) {
            if (['+', '-', '*', '/'].includes(expression.slice(-1))) return;
            expression += buttonValue!;
            display.value = expression;
        }


        if (buttonValue === '=') {
            if (expression === '') return;
            try {
                const result = calculateExpression(expression);
                display.value = result.toString();
                expression = result.toString();
            } catch (error) {
                display.value = (error as Error).message;
                expression = '';
            }
        }


        if (buttonValue === 'DEL') {
            expression = expression.slice(0, -1);
            display.value = expression || '0';
        }
    });
});

acButton.addEventListener('click', () => {
    if (!isCalculatorOn) {
        isCalculatorOn = true;
        expression = '';  // Reset the expression
        display.value = '0';  // Reset display to '0'
        display.style.backgroundColor = "#f0ffff";  // Change background to active state
        display.style.color = "#000000";  // Reset color to default
    } else {
        expression = '';  // Clear the expression
        display.value = '0';  // Clear display to '0'
    }
});

helloButton.addEventListener('click', () => {
    if (!isCalculatorOn) return;
    else{
    const messages = ["Hello!", "Salut!", "Hallo!", "Hola!", "Ciao!", "Konnichiwa!"];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    display.value = randomMessage;
    setTimeout(() => {
        if (!isCalculatorOn) return;
        display.value = ' ';
    }, 1000);
}
});

byeButton.addEventListener('click', () => {
    if (isCalculatorOn) {
        display.value = "Annyeong!!";
        display.style.backgroundColor = "#1d2951";
        display.style.color = "#ffffff";
        setTimeout(() => {
            isCalculatorOn = false;
            expression = '';
            display.value = '';
        }, 1000);
    }
});
