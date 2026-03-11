import { userLottoStore } from './stores.js';
import LottoStore from '../step-1/LottoStore.js';

const PurchaseAmountForm = {
  render(container) {
    const purchaseAmountForm = document.createElement('form');
    const purchaseAmountInput = document.createElement('input');
    const purchaseButton = document.createElement('button');

    purchaseAmountForm.id = 'purchase-amount-form';
    purchaseAmountForm.addEventListener('submit', this.handleSubmit);

    purchaseAmountInput.id = 'purchase-amount-input';
    purchaseAmountInput.type = 'number';
    purchaseAmountInput.name = 'purchaseAmount';

    purchaseButton.id = 'purchase-button';
    purchaseButton.type = 'submit';
    purchaseButton.innerText = '구입';

    purchaseAmountForm.appendChild(purchaseAmountInput);
    purchaseAmountForm.appendChild(purchaseButton);

    container.appendChild(purchaseAmountForm);
  },

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { purchaseAmount } = Object.fromEntries(formData.entries());
    const lottos = LottoStore.purchaseLottos(Number(purchaseAmount));
    userLottoStore.setState({ purchaseAmount, lottos });
  },
};
export default PurchaseAmountForm;
