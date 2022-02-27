import { isPositiveInteger, isDivisibleBy } from './utils';
import { DOM_STRING, SELECTOR, MONEY } from './constants';
import Lotto from './Lotto';
import template from './templates';
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
    this.$app = getElement(app);
    this.purchasedLottoList = [];

    render(this.$app, template.paymentSection);

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

  setPurchasedLottoList(purchasedLottoCount) {
    this.purchasedLottoList = Array(purchasedLottoCount)
      .fill(0)
      .map((_, index, list) => {
        const lotto = new Lotto();
        lotto.setLotto();

        return (list[index] = lotto.getLotto());
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

      this.setPurchasedLottoList(purchasedLottoCount);

      render(this.$app, template.purchasedSection(this.purchasedLottoList));
      render(this.$app, template.lastWeekWinningNumberSection);
      render(this.$app, template.resultCheckingSection);
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
