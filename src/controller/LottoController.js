import PurchaseAmountValidator from '../validator/PurchaseAmountValidator';
import { PURCHASE_AMOUT_INPUT_ERROR } from '../constant/messages';

class LottoController {
  constructor() {
    this.purchaseAmount = 0;
    this.lottoTickets = [];
  }

  start() {
    document
      .querySelector('.form-purchase-amount')
      .addEventListener('submit', this.processPurchaseAmount.bind(this));
  }

  processPurchaseAmount(event) {
    event.preventDefault();
    const inputPurchaseAmountView = document.querySelector('.input-purchase-amount');
    const purchaseAmountErrorView = document.querySelector('.text-purchase-amount-error');
    const inputValue = inputPurchaseAmountView.value;
    const purchaseAmount = Number(inputValue);
    const validationResult = this.validatePurchaseAmount(purchaseAmount);
    if (validationResult !== true) {
      inputPurchaseAmountView.value = null;
      purchaseAmountErrorView.textContent = validationResult;
    } else {
      this.purchaseAmount = purchaseAmount;
      purchaseAmountErrorView.textContent = '';
    }
    this.processLottoTicket();
  }

  validatePurchaseAmount(inputValue) {
    if (!PurchaseAmountValidator.isNumber(inputValue)) return PURCHASE_AMOUT_INPUT_ERROR.TYPE;
    if (!PurchaseAmountValidator.isValidUnit(inputValue)) return PURCHASE_AMOUT_INPUT_ERROR.UNIT;
    if (!PurchaseAmountValidator.isValidMinRange(inputValue))
      return PURCHASE_AMOUT_INPUT_ERROR.RANGE;
    return true;
  }
}

export default LottoController;
