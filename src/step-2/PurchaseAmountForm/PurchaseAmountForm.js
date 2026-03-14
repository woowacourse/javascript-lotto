import { userLottoStore } from '../stores.js';
import LottoStore from '../../step-1/LottoStore.js';
import { validatePurchaseAmountInput } from '../validates.js';

const PurchaseAmountForm = {
  render(container) {
    this.init();

    if (!userLottoStore.hasTrigger('purchase-amount-form')) {
      userLottoStore.appendTrigger('purchase-amount-form', (state) => {
        if (state.purchaseAmount === null) this.render(container);
      });
    }

    const purchaseAmountForm = document.createElement('form');
    const purchaseAmountCaptionDiv = document.createElement('div');
    const purchaseAmountInputWrapper = document.createElement('div');
    const purchaseAmountInput = document.createElement('input');
    const errorMessageDiv = document.createElement('div');
    const purchaseButton = document.createElement('button');

    purchaseAmountForm.id = 'purchase-amount-form';
    purchaseAmountForm.classList.add('purchase-amount-form');
    purchaseAmountForm.addEventListener('submit', this.handleSubmit);

    purchaseAmountCaptionDiv.innerText = '구입할 금액을 입력해주세요.';

    purchaseAmountInputWrapper.classList.add('purchase-amount-input-wrapper');

    purchaseAmountInput.id = 'purchase-amount-input';
    purchaseAmountInput.type = 'number';
    purchaseAmountInput.name = 'purchaseAmount';
    purchaseAmountInput.autofocus = true;
    purchaseAmountInput.addEventListener('input', this.handlePurchaseAmountInput);

    errorMessageDiv.id = 'purchase-amount-error-message';
    errorMessageDiv.classList.add('error-message');

    purchaseButton.id = 'purchase-button';
    purchaseButton.type = 'submit';
    purchaseButton.innerText = '구입';
    purchaseButton.disabled = true;
    purchaseButton.classList.add('button-primary');

    purchaseAmountInputWrapper.appendChild(purchaseAmountInput);
    purchaseAmountInputWrapper.appendChild(purchaseButton);

    purchaseAmountForm.appendChild(purchaseAmountCaptionDiv);
    purchaseAmountForm.appendChild(purchaseAmountInputWrapper);
    purchaseAmountForm.appendChild(errorMessageDiv);

    container.appendChild(purchaseAmountForm);
  },

  handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const { purchaseAmount: purchaseAmountInput } = Object.fromEntries(formData.entries());
      const purchaseAmount = Number(purchaseAmountInput);

      const lottos = LottoStore.purchaseLottos(purchaseAmount);
      userLottoStore.setState({ purchaseAmount, lottos });
    } catch (error) {
      alert(error.message);
    }
  },

  handlePurchaseAmountInput(e) {
    const input = e.target;
    const submitButton = document.getElementById('purchase-button');
    const errorMessageDiv = document.getElementById('purchase-amount-error-message');

    try {
      const purchaseAmount = e.target.value;
      validatePurchaseAmountInput(purchaseAmount);

      input.classList.remove('invalid');
      submitButton.disabled = false;
      errorMessageDiv.innerText = '';
    } catch (e) {
      input.classList.add('invalid');
      submitButton.disabled = true;
      errorMessageDiv.innerText = e.message;
    }
  },

  init() {
    const purchaseAmountForm = document.getElementById('purchase-amount-form');
    if (purchaseAmountForm) {
      purchaseAmountForm.remove();
    }
  },
};

export default PurchaseAmountForm;
