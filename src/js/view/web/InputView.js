const $budgetInput = document.getElementById('budget-input');
const $budgetInputForm = document.getElementById('budget-input-form');
const $winningNumberInputs = document.getElementsByClassName('winning-number-input');
const $winningNumberInputForm = document.getElementById('winning-number-input-form');

const PurchaseForm = {
  setBudgetInputHandler(handler) {
    $budgetInputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handler(+$budgetInput.value);
    });
  },

  setWinningNumberInputHandler(handler) {
    $winningNumberInputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const winningNumbers = [];
      Array.from($winningNumberInputs).forEach((input) => {
        winningNumbers.push(+input.value);
      });
      handler(winningNumbers);
    });
  },
};

export default PurchaseForm;
