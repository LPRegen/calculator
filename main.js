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

// Check if user press an operator
let checkAction = function (dataAction) {
  if (operators.includes(`${dataAction}`)) {
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

      updateDislpay(dataAction, btnContent);
      checkAction(dataAction);
    }
  });
});
