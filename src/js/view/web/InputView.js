const $budgetInput = document.getElementById('budget-input');
const $budgetInputForm = document.getElementById('budget-input-form');

const PurchaseForm = {
  setBudgetInputHandler(handler) {
    $budgetInputForm.addEventListener('submit', (event) => {
      event.preventDefault();
      handler($budgetInput.value);
    });
  },
};

export default PurchaseForm;
