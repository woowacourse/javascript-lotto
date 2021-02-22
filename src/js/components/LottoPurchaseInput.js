import { $, clearInputValue } from '../utils/dom.js';
import { LOTTO } from '../utils/constants.js';
import { mod, divide } from '../utils/common.js';
import { ERROR_MESSAGE, GUIDE_MESSAGE } from '../utils/message.js';

export default class LottoPurchaseInput {
  constructor(props) {
    this.props = props;

    this.setup();
    this.selectDOM();
    this.bindEvent();
  }

  setup() {
    ({ lottoManager: this.lottoManager } = this.props);
    this.lottoManager.subscribe(this.clear.bind(this));
  }

  clear() {
    if (this.lottoManager.lottos.length === 0) {
      clearInputValue(this.$purchaseInput);
    }
  }

  selectDOM() {
    this.$purchaseInput = $('#lotto-purchase-input');
    this.$purchaseButton = $('#lotto-purchase-btn');
  }

  bindEvent() {
    this.$purchaseButton.addEventListener('click', () => {
      this.onPurchaseLotto();
    });

    this.$purchaseInput.addEventListener('keydown', e => {
      if (e.key !== 'Enter') {
        return;
      }

      e.preventDefault();
      this.onPurchaseLotto();
    });
  }

  onPurchaseLotto() {
    const { lottoManager } = this.props;
    const purchaseInputValue = this.$purchaseInput.value.trim();
    const payment = Number(purchaseInputValue);

    const errorMessage = validatePurchaseInputValue(payment);
    if (errorMessage) {
      alert(errorMessage);
      clearInputValue(this.$purchaseInput);
      return;
    }

    const lottoCount = divide(payment, LOTTO.PRICE);
    const remainingMoney = mod(payment, LOTTO.PRICE);
    alert(GUIDE_MESSAGE.PAYMENT_RESULT_MESSAGE(lottoCount, remainingMoney));

    lottoManager.createLottos(lottoCount);
  }
}

const validatePurchaseInputValue = payment => {
  if (!Number.isInteger(payment)) {
    return ERROR_MESSAGE.NOT_INTEGER_NUMBER;
  }

  if (payment < LOTTO.PRICE) {
    return ERROR_MESSAGE.PAYMENT_AMOUNT;
  }
};
