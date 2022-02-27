import { isPositiveInteger, divideBy } from './utils';
import { CLASS_NAME, SELECTOR, MONEY, ERROR_MESSAGE } from './constants';
import Lotto from './Lotto';
import {
  generatePaymentSection,
  generatePurchasedSection,
  generateWinningNumberSection,
  generateResultCheckingSection,
} from './templates';
import {
  getElement,
  getElements,
  bindEventListener,
  render,
  initInput,
  disableElement,
  toggleClassName,
} from './dom';

export default class LottoApp {
  constructor(app) {
    this.$app = getElement(app);
    render(this.$app, generatePaymentSection());

    this.lottoList = [];
    this.bindEvent();
  }

  bindEvent() {
    bindEventListener({
      appElement: this.$app,
      type: 'click',
      selector: SELECTOR.PAYMENT_BUTTON,
      callback: this.onSubmitPayment.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'click',
      selector: SELECTOR.LOTTO_LIST_TOGGLE_BUTTON,
      callback: this.onClickToggleButton.bind(this),
    });
  }

  onSubmitPayment() {
    const $paymentInput = getElement(SELECTOR.PAYMENT_INPUT);
    const payment = Number($paymentInput.value);

    try {
      if (!isPositiveInteger(payment)) {
        throw new Error(ERROR_MESSAGE.MONEY_OUT_OF_RANGE);
      }
      if (!divideBy(payment, MONEY.STANDARD)) {
        throw new Error(ERROR_MESSAGE.MONEY_OUT_OF_STANDARD);
      }

      this.disablePayment();
      this.setPurchasedLottoList(payment / MONEY.STANDARD);
      this.renderPurchasedSection();
    } catch ({ message }) {
      alert(message);
      initInput($paymentInput);
    }
  }

  disablePayment() {
    toggleClassName(getElement(SELECTOR.PAYMENT_BUTTON), CLASS_NAME.DISABLED);

    disableElement(getElement(SELECTOR.PAYMENT_BUTTON));
    disableElement(getElement(SELECTOR.PAYMENT_INPUT));
  }

  renderPurchasedSection() {
    render(this.$app, generatePurchasedSection(this.lottoList));
    render(this.$app, generateWinningNumberSection());
    render(this.$app, generateResultCheckingSection());
  }

  setPurchasedLottoList(count) {
    for (let i = 0; i < count; i++) {
      const lotto = new Lotto();
      lotto.setLotto();
      this.lottoList.push(lotto.getLotto());
    }
  }

  onClickToggleButton() {
    toggleClassName(
      getElement(SELECTOR.LOTTO_LIST_TOGGLE_BUTTON),
      CLASS_NAME.TOGGLE_SWITCH
    );

    toggleClassName(
      getElement(SELECTOR.LOTTO_LIST),
      CLASS_NAME.DIRECTION_COLUMN
    );

    getElements(SELECTOR.LOTTO_NUMBER).forEach((element) => {
      element.classList.toggle(CLASS_NAME.INVISIBLE);
    });
  }
}
