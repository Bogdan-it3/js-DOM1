const number1Input = document.getElementById('number1');
const number2Input = document.getElementById('number2');
const resultInput = document.getElementById('result');
const errorMessage = document.getElementById('error-message');
const operationButtons = document.querySelectorAll('.buttons button');

function validateInputs(num1, num2) {

    errorMessage.textContent = '';

    if (num1 === '' || num2 === '') {
        errorMessage.textContent = 'Будь ласка, заповніть обидва поля.';
        return false;
    }


    const number1 = parseFloat(num1);
    const number2 = parseFloat(num2);

    if (isNaN(number1) || isNaN(number2)) {
        errorMessage.textContent = 'Введені дані некоректні. Будь ласка, введіть числа.';
        return false;
    }

    return { number1, number2 };
}


function calculate(operation) {
    const num1 = number1Input.value.trim();
    const num2 = number2Input.value.trim();

    const valid = validateInputs(num1, num2);
    if (!valid) {
        resultInput.value = '';
        return;
    }

    const { number1, number2 } = valid;
    let result;

    switch (operation) {
        case 'add':
            result = number1 + number2;
            break;
        case 'subtract':
            result = number1 - number2;
            break;
        case 'multiply':
            result = number1 * number2;
            break;
        case 'divide':
            if (number2 === 0) {
                errorMessage.textContent = 'Ділення на нуль неможливе.';
                resultInput.value = '';
                return;
            }
            result = number1 / number2;

            if (!Number.isInteger(result)) {
                result = Math.round(result * 100) / 100;
            }
            break;
        default:
            errorMessage.textContent = 'Невідома операція.';
            resultInput.value = '';
            return;
    }

    resultInput.value = result;
}

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        const operation = button.getAttribute('data-operation');
        calculate(operation);
    });
});
