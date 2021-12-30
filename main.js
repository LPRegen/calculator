// Selectors.
let display = document.querySelector('.calculator-display');
const calculatorBtns = Array.from(
  document.querySelectorAll('.calculator-buttons')
);

// Variables.
let secondNum = '';
let total = '';
let operators = ['add', 'multiply', 'subtract', 'divide'];
let pressedBtn;

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
};

calculatorBtns.forEach((el) => {
  el.addEventListener('click', function (e) {
    let target = e.target;
    if (target.matches('button')) {
      let dataAction = target.dataset.action;
      let btnContent = target.textContent;
      let selectedOperator = display.dataset.operator;

      updateDislpay(dataAction, btnContent);
      checkAction(dataAction);
      equalsBtn(dataAction, selectedOperator);
    }
  });
});
