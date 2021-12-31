// Selectors.
let display = document.querySelector('.calculator-display');
const calculatorBtns = Array.from(
  document.querySelectorAll('.calculator-buttons')
);
let clearAllBtn = document.querySelector('.clear');

// Variables.
let total = '';
let operators = ['add', 'multiply', 'subtract', 'divide'];

// Update display.
let updateDislpay = function (dataAction, btnContent) {
  if (!dataAction) {
    // Update display content.
    // ! refactor to ternary op
    if (display.textContent === '0') {
      display.textContent = btnContent;
    } else {
      display.textContent += btnContent;
    }
  }

  // Add decimal if there isn't already a decimal
  if (dataAction === 'decimal' && !display.textContent.includes('.')) {
    display.textContent += '.';
  }

  // Delete last number.
  if (dataAction === 'delete') {
    display.textContent = Array.from(display.textContent).slice(0, -1).join('');

    // Delete selected operator
    if (display.textContent === '') {
      display.textContent = display.dataset.lastNumber;
      delete display.dataset.operator;
    }
  }
};

// When user clicks AC button.
let allClear = function (dataAction) {
  if (display.textContent !== '0') {
    clearAllBtn.textContent = 'C';
  }
  if (dataAction === 'clear') {
    delete display.dataset.lastNumber;
    display.textContent = '0';
    clearAllBtn.textContent = 'AC';
  }
};

// Calculate
// ! Refactor
let equalsBtn = function (dataAction, selectedOperator) {
  if (dataAction === 'calculate') {
    if (selectedOperator === 'divide') {
      total =
        parseFloat(display.dataset.lastNumber) /
        parseFloat(display.textContent);
      display.textContent = total;
      checkAction(dataAction);
    } else if (selectedOperator === 'add') {
      total =
        parseFloat(display.dataset.lastNumber) +
        parseFloat(display.textContent);
      display.textContent = total;
      checkAction(dataAction);
    } else if (selectedOperator === 'multiply') {
      total =
        parseFloat(display.dataset.lastNumber) *
        parseFloat(display.textContent);
      display.textContent = total;
      checkAction(dataAction);
    } else if (selectedOperator === 'subtract') {
      total =
        parseFloat(display.dataset.lastNumber) -
        parseFloat(display.textContent);
      display.textContent = total;
      checkAction(dataAction);
    }
  }
};

// Check if user press an operator
let checkAction = function (dataAction) {
  if (operators.includes(`${dataAction}`)) {
    display.dataset.operator = dataAction;
    display.dataset.lastNumber = display.textContent;
    display.textContent = '0';
  }

  // Calculate percentage.
  if (dataAction === 'percentage') {
    display.textContent = parseFloat(display.textContent) / 100;
    display.dataset.lastNumber = display.textContent;
  }
};

// Apply "pressed" class on selected operator.
let addClass = function (dataAction, target) {
  let options = ['add', 'divide', 'multiply', 'subtract'];
  if (options.includes(`${dataAction}`)) {
    target.classList.add('pressed');
  } else {
    target.classList.remove('pressed');
  }
};

calculatorBtns.forEach((el) => {
  el.addEventListener('click', function (e) {
    let target = e.target;
    if (target.matches('button')) {
      let dataAction = target.dataset.action;
      let btnContent = target.textContent;
      let selectedOperator = display.dataset.operator;

      // Removes pressed class.
      Array.from(target.parentNode.children).forEach((el) =>
        el.classList.remove('pressed')
      );

      updateDislpay(dataAction, btnContent);
      checkAction(dataAction);
      equalsBtn(dataAction, selectedOperator);
      allClear(dataAction);
      addClass(dataAction, target);
    }
  });
});
