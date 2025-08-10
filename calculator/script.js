let add = (a, b) => {
  return a + b;
};

let subtract = (a, b) => {
  return a - b;
};

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error: Can't divide by zero!";
  }
  return a / b;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      return null;
  }
}

let displayValue = "0";
let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");

function updateDisplay() {
  display.textContent = displayValue;
}

let appendNumber = (number) => {
  if (displayValue === "0" || shouldResetDisplay) {
    displayValue = number;
    shouldResetDisplay = false;
  } else {
    displayValue += number;
  }
  updateDisplay();
};

let chooseOperator = (operator) => {
  if (currentOperator !== null) evaluate();
  firstNumber = parseFloat(displayValue);
  currentOperator = operator;
  shouldResetDisplay = true;
};

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;
  secondNumber = parseFloat(displayValue);
  displayValue = operate(currentOperator, firstNumber, secondNumber).toString();
  updateDisplay();
  currentOperator = null;
}

function clearCalculator() {
  displayValue = "0";
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function deleteLastDigit() {
  displayValue = displayValue.toString().slice(0, -1) || "0";
  updateDisplay();
}

document.querySelectorAll(".buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;
    const buttonContent = button.textContent;

    if (!action) {
      appendNumber(buttonContent);
    } else if (action === "operator") {
      chooseOperator(buttonContent);
    } else if (action === "equals") {
      evaluate();
    } else if (action === "clear") {
      clearCalculator();
    } else if (action === "backspace") {
      deleteLastDigit();
    }
  });
});
