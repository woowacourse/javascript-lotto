const $budgetInput = document.getElementById('budget-input');
const $budgetInputForm = document.getElementById('budget-input-form');
const $winningNumberInputs = document.getElementsByClassName('winning-number-input');
const $winningNumberInputForm = document.getElementById('winning-number-input-form');
const $modalBackground = document.getElementsByClassName('modal-background')[0];
const $modalCloseButton = document.getElementById('modal-close-button');
const $retryButton = document.getElementById('retry-button');

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
      const winningNumbers = Array.from($winningNumberInputs).map((input) => +input.value);
      handler(winningNumbers);
    });
  },

  setModalCloseHandler(handler) {
    $modalCloseButton.addEventListener('click', () => handler());
    window.addEventListener('click', (event) =>
      event.target === $modalBackground ? handler() : false
    );
    window.addEventListener('keydown', (event) =>
      event.key === 'Escape' || 'Esc' ? handler() : false
    );
  },

  setRetryButtonHandler(handler) {
    $retryButton.addEventListener('click', (event) => {
      event.preventDefault();
      handler();
    });
  },
};

export default PurchaseForm;
