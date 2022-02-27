import { isPositiveInteger, isDivisibleBy } from './utils';
import { DOM_STRING, SELECTOR, MONEY } from './constants';
import Lotto from './Lotto';
import createTemplate from './templates';
import {
  getElement,
  getElements,
  alertMessage,
  bindEventListener,
  render,
  initInput,
  disableElement,
  toggleClassName,
} from './dom';

export default class LottoApp {
  constructor(app) {
    this.lotto = new Lotto();
    this.$app = getElement(app);
    this.purchasedLottoList = [];

    render(this.$app, createTemplate.paymentSection());

    this.bindEvent();
  }

  onClickToggleButton() {
    toggleClassName(
      getElement(SELECTOR.$LOTTO_LIST_TOGGLE_BUTTON),
      DOM_STRING.TOGGLE_SWITCH
    );

    toggleClassName(
      getElement(SELECTOR.$LOTTO_LIST),
      DOM_STRING.DIRECTION_COLUMN
    );

    getElements(SELECTOR.$LOTTO).forEach((element) => {
      element.classList.toggle(DOM_STRING.DISPLAY_FLEX);
    });

    getElements(SELECTOR.$LOTTO_NUMBER).forEach((element) => {
      element.classList.toggle(DOM_STRING.INVISIBLE);
    });
  }

  onSubmitPayment() {
    const $paymentInput = getElement(SELECTOR.$PAYMENT_INPUT);

    try {
      const purchasedLottoCount = isDivisibleBy(
        isPositiveInteger($paymentInput.valueAsNumber),
        MONEY.STANDARD
      );

      toggleClassName(
        getElement(SELECTOR.$PAYMENT_BUTTON),
        DOM_STRING.DISABLED
      );

      disableElement(getElement(SELECTOR.$PAYMENT_BUTTON));
      disableElement(getElement(SELECTOR.$PAYMENT_INPUT));

      this.lotto.setLotto(purchasedLottoCount);

      render(this.$app, createTemplate.purchasedSection(this.lotto.getLotto()));
      render(this.$app, createTemplate.lastWeekWinningNumberSection());
      render(this.$app, createTemplate.resultCheckingSection());
    } catch (error) {
      alertMessage(error.message);
      initInput($paymentInput);
    }
  }

  bindEvent() {
    bindEventListener({
      appElement: this.$app,
      type: 'click',
      selector: SELECTOR.$PAYMENT_BUTTON,
      callback: this.onSubmitPayment.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'click',
      selector: SELECTOR.$LOTTO_LIST_TOGGLE_BUTTON,
      callback: this.onClickToggleButton.bind(this),
    });
  }
}
