import { userLottoStore } from './stores.js';
import LottoStore from '../step-1/LottoStore.js';
import { validatePurchaseAmountInput } from './validates.js';

const PurchaseAmountForm = {
  render(container) {
    const purchaseAmountForm = document.createElement('form');
    const purchaseAmountInput = document.createElement('input');
    const errorMessageDiv = document.createElement('div');
    const purchaseButton = document.createElement('button');

    purchaseAmountForm.id = 'purchase-amount-form';
    purchaseAmountForm.addEventListener('submit', this.handleSubmit);

    purchaseAmountInput.id = 'purchase-amount-input';
    purchaseAmountInput.type = 'number';
    purchaseAmountInput.name = 'purchaseAmount';
    purchaseAmountInput.addEventListener('input', this.handlePurchaseAmountInput);

    errorMessageDiv.id = 'purchase-amount-error-message';

    purchaseButton.id = 'purchase-button';
    purchaseButton.type = 'submit';
    purchaseButton.innerText = '구입';
    purchaseButton.disabled = true;

    purchaseAmountForm.appendChild(purchaseAmountInput);
    purchaseAmountForm.appendChild(errorMessageDiv);
    purchaseAmountForm.appendChild(purchaseButton);

    container.appendChild(purchaseAmountForm);
  },

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { purchaseAmount: purchaseAmountInput } = Object.fromEntries(formData.entries());
    const purchaseAmount = Number(purchaseAmountInput);

    const lottos = LottoStore.purchaseLottos(purchaseAmount);
    userLottoStore.setState({ purchaseAmount, lottos });
  },

  handlePurchaseAmountInput(e) {
    const submitButton = document.getElementById('purchase-button');
    const errorMessageDiv = document.getElementById('purchase-amount-error-message');

    try {
      const purchaseAmount = e.target.value;
      validatePurchaseAmountInput(purchaseAmount);
      submitButton.disabled = false;
      errorMessageDiv.innerText = '';
    } catch (e) {
      submitButton.disabled = true;
      errorMessageDiv.innerText = e.message;
    }
  },
};

export default PurchaseAmountForm;
