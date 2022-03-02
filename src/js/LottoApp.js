import { getPurchasedLottoCount } from './utils';
import { CLASS_NAME, SELECTOR, MONEY } from './constants';
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

    render(this.$app, createTemplate.paymentSection());
    this.bindEvent();
  }

  onSubmitRestartButton() {
    disableElement(getElement(SELECTOR.PAYMENT_INPUT));
    toggleClassName(getElement(SELECTOR.PAYMENT_INPUT), CLASS_NAME.DISABLED);

    disableElement(getElement(SELECTOR.PAYMENT_BUTTON));
    toggleClassName(getElement(SELECTOR.PAYMENT_BUTTON), CLASS_NAME.DISABLED);

    initInput(getElement(SELECTOR.PAYMENT_INPUT));

    this.$app.removeChild(
      getElement(SELECTOR.LAST_WEEK_WINNING_NUMBER_SECTION)
    );
    this.$app.removeChild(getElement('#purchased-lotto-list-section'));
    this.$app.removeChild(getElement('#result-checking-section'));
    this.$app.removeChild(getElement('#lotto-result-section'));
    this.$app.removeChild(getElement('#cover-the-background'));
  }

  onClickExitButton() {
    this.$app.removeChild(getElement('#lotto-result-section'));
    this.$app.removeChild(getElement('#cover-the-background'));
  }

  onSubmitLottoResultButton() {
    render(this.$app, createTemplate.lottoResultSection());
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

    getElements(SELECTOR.LOTTO).forEach((element) => {
      element.classList.toggle(CLASS_NAME.DISPLAY_FLEX);
    });

    getElements(SELECTOR.LOTTO_NUMBER).forEach((element) => {
      element.classList.toggle(CLASS_NAME.INVISIBLE);
    });
  }

  onSubmitPaymentButton() {
    const $paymentInput = getElement(SELECTOR.PAYMENT_INPUT);

    try {
      const purchasedLottoCount = getPurchasedLottoCount(
        $paymentInput.valueAsNumber,
        MONEY.STANDARD
      );

      // const purchasedLottoCount = isDivisibleBy(
      //   isPositiveInteger($paymentInput.valueAsNumber),
      //   MONEY.STANDARD
      // );

      toggleClassName(getElement(SELECTOR.PAYMENT_BUTTON), CLASS_NAME.DISABLED);

      disableElement(getElement(SELECTOR.PAYMENT_BUTTON));
      disableElement(getElement(SELECTOR.PAYMENT_INPUT));

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
      selector: SELECTOR.PAYMENT_BUTTON,
      callback: this.onSubmitPaymentButton.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'click',
      selector: SELECTOR.LOTTO_LIST_TOGGLE_BUTTON,
      callback: this.onClickToggleButton.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'click',
      selector: '#result-checking-button',
      callback: this.onSubmitLottoResultButton.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'click',
      selector: '#exit-button',
      callback: this.onClickExitButton.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'click',
      selector: '#restart-button',
      callback: this.onSubmitRestartButton.bind(this),
    });
  }
}
