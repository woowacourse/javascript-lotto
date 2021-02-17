import { $ } from '../utils/dom.js';
import { LOTTO_PRICE } from '../utils/constants.js';
import { mod, divide } from '../utils/lotto.js';
import { ERROR_MESSAGE, GUIDE_MESSAGE } from '../utils/message.js';

export default class LottoPerchaseInput {
  constructor(props) {
    this.props = props;

    this.selectDOM();
    this.bindEvent();
  }

  selectDOM() {
    this.$perchaseInput = $('#lotto-perchase-input');
    this.$perchaseButton = $('#lotto-perchase-btn');
  }

  bindEvent() {
    this.$perchaseButton.addEventListener(
      'click',
      this.perchaseButtonClickHandler.bind(this),
    );
  }

  perchaseButtonClickHandler() {
    const { createLottos } = this.props;
    const perchaseInputValue = this.$perchaseInput.value.trim();
    const payment = Number(perchaseInputValue);

    const errorMessage = validatePerchaseInputValue(payment);
    if (errorMessage) {
      alert(errorMessage);
      return;
    }

    const lottoCount = divide(payment, LOTTO_PRICE);
    const remainingMoney = mod(payment, LOTTO_PRICE);
    alert(GUIDE_MESSAGE.PAYMENT_RESULT_MESSAGE(lottoCount, remainingMoney));

    createLottos(lottoCount);
  }
}

const validatePerchaseInputValue = payment => {
  if (!Number.isInteger(payment)) {
    return ERROR_MESSAGE.NOT_INTEGER_NUMBER_ERROR;
  }

  if (payment < LOTTO_PRICE) {
    return ERROR_MESSAGE.PAYMENT_AMOUNT_ERROR;
  }
};
