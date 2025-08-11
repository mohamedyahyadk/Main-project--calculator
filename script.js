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

// Track what we're currently entering
let currentInput = "firstNumber"; // or "operator" or "secondNumber"

function updateDisplay() {
  display.textContent = displayValue;
}

function appendNumber(number) {
  if (currentInput === "operator") {
    // Starting second number after operator was selected
    displayValue = number === "." ? "0." : number;
    currentInput = "secondNumber";
  } else if (displayValue === "0" || shouldResetDisplay) {
    displayValue = number === "." ? "0." : number;
    shouldResetDisplay = false;
  } else {
    // Prevent multiple decimal points
    if (number === "." && displayValue.includes(".")) {
      return;
    }
    displayValue += number;
  }
  updateDisplay();
}

function chooseOperator(operator) {
  // If display is just ".", treat it as 0
  if (displayValue === ".") {
    displayValue = "0";
  }

  if (currentInput === "firstNumber") {
    firstNumber = parseFloat(displayValue);
    currentOperator = operator;
    currentInput = "operator";
    displayValue = operator;
    shouldResetDisplay = true;
  } else if (currentInput === "secondNumber") {
    // Allow chaining operations without pressing equals
    evaluate();
    firstNumber = parseFloat(displayValue);
    currentOperator = operator;
    currentInput = "operator";
    displayValue = operator;
    shouldResetDisplay = true;
  } else if (currentInput === "operator") {
    // Just change the operator
    currentOperator = operator;
    displayValue = operator;
  }
  updateDisplay();
}

function evaluate() {
  if (currentOperator === null || currentInput === "operator") return;

  // Handle cases where displayValue is just a decimal point
  if (displayValue === ".") {
    displayValue = "0";
  }

  if (currentInput === "secondNumber") {
    secondNumber = parseFloat(displayValue) || 0; // Treat empty as 0
  }

  let result = operate(currentOperator, firstNumber, secondNumber);

  if (typeof result === "string") {
    displayValue = result;
    currentInput = "firstNumber";
    currentOperator = null;
    updateDisplay();
    return;
  }

  // Format the result to avoid long decimal numbers
  displayValue = parseFloat(result.toFixed(10)).toString();
  firstNumber = parseFloat(displayValue);
  currentInput = "firstNumber";
  shouldResetDisplay = true;
  currentOperator = null;
  updateDisplay();
}

function clearCalculator() {
  displayValue = "0";
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
  shouldResetDisplay = false;
  currentInput = "firstNumber";
  updateDisplay();
}

function deleteLastDigit() {
  if (currentInput === "operator") {
    // Can't delete operator, revert to first number
    currentInput = "firstNumber";
    displayValue = firstNumber.toString();
  } else {
    displayValue = displayValue.toString().slice(0, -1) || "0";
    if (displayValue === "0") {
      currentInput = "firstNumber";
    }
  }
  updateDisplay();
}

function handleDecimalPoint() {
  if (currentInput === "operator") {
    // Starting second number with decimal point
    displayValue = "0.";
    currentInput = "secondNumber";
  } else if (shouldResetDisplay) {
    displayValue = "0.";
    shouldResetDisplay = false;
  } else if (!displayValue.includes(".")) {
    // If empty, start with "0."
    if (displayValue === "0") {
      displayValue = "0.";
    } else {
      displayValue += ".";
    }
  }
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
    } else if (action === "decimal") {
      handleDecimalPoint();
    }
  });
});

// Keyboard support
window.addEventListener("keydown", (e) => {
  if (e.key >= "0" && e.key <= "9") {
    appendNumber(e.key);
  }
  if (e.key === ".") {
    handleDecimalPoint();
  }
  if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    chooseOperator(e.key);
  }
  if (e.key === "Enter" || e.key === "=") {
    evaluate();
  }
  if (e.key === "Backspace") {
    deleteLastDigit();
  }
  if (e.key.toLowerCase() === "c") {
    clearCalculator();
  }
});
