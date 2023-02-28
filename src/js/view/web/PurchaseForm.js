const $budgetInputForm = document.getElementById('budget-input-form');
const $budgetInput = document.getElementById('budget-input');
const $purchaseButton = document.getElementById('purchase-button');
const $winningNumberInputForm = document.getElementById('winning-number-input-form');
const $winningNumberInputs = document.getElementsByClassName('winning-number-input');
const $modalBackground = document.getElementById('modal-background-section');
const $resultModalSection = document.getElementById('result-modal-section');
const $modalCloseButton = document.getElementById('modal-close-button');
const $retryButton = document.getElementById('retry-button');

const PurchaseForm = {
  setBudgetInputHandler(handler) {
    $budgetInputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handler(+$budgetInput.value);
      $budgetInput.disabled = true;
      $purchaseButton.disabled = true;
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
    $modalBackground.addEventListener(
      'click',
      (event) => event.target === $modalBackground && handler()
    );
    $resultModalSection.addEventListener(
      'keydown',
      (event) => (event.key === 'Escape' || event.key === 'Esc') && handler()
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
