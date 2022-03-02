import {
  getPurchasedLottoCount,
  getValidWinningNumberAndBonusNumber,
  getRateOfReturn,
} from './utils';
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
    try {
      const lastWeekNumberList = [];
      const lastWeekBonusNumber = getElement(
        '.last-week-bonus-number-input'
      ).valueAsNumber;

      getElements('.last-week-number-input').forEach((numberInputElement) => {
        lastWeekNumberList.push(numberInputElement.valueAsNumber);
      });

      this.lotto.setLastWeekLottoNumbers(
        getValidWinningNumberAndBonusNumber(
          lastWeekNumberList,
          lastWeekBonusNumber
        )
      );

      this.lotto.setWinningCount(
        this.lotto.getLotto(),
        this.lotto.getLastWeekLottoList(),
        this.lotto.getLastWeekBonusNumber()
      );

      render(
        this.$app,
        createTemplate.lottoResultSection(
          this.lotto.getWinningCount(),
          getRateOfReturn(
            this.lotto.totalWinningAmount(),
            this.lotto.getPurchasedAmount()
          )
        )
      );
    } catch (error) {
      alertMessage(error.message);
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

      toggleClassName(getElement(SELECTOR.PAYMENT_BUTTON), CLASS_NAME.DISABLED);

      disableElement(getElement(SELECTOR.PAYMENT_BUTTON));
      disableElement(getElement(SELECTOR.PAYMENT_INPUT));

      this.lotto.setLotto(purchasedLottoCount);
      this.lotto.setPurchasedAmount(purchasedLottoCount);

      render(this.$app, createTemplate.purchasedSection(this.lotto.getLotto()));
      render(this.$app, createTemplate.lastWeekWinningNumberSection());
      render(this.$app, createTemplate.resultCheckingSection());
    } catch (error) {
      alertMessage(error.message);
      initInput($paymentInput);
    }
  }

  onKeyUpLastWeekFirstNumberInput(e) {
    if (e.target.value.length >= 2) {
      getElement('.last-week-second-number-input').focus();
    }
  }

  onKeyUpLastWeekSecondNumberInput(e) {
    if (e.target.value.length >= 2) {
      getElement('.last-week-third-number-input').focus();
    }

    if (e.target.value.length === 0 && e.key === 'Backspace') {
      getElement('.last-week-first-number-input').focus();
    }
  }

  onKeyUpLastWeekThirdNumberInput(e) {
    if (e.target.value.length >= 2) {
      getElement('.last-week-forth-number-input').focus();
    }

    if (e.target.value.length === 0 && e.key === 'Backspace') {
      getElement('.last-week-second-number-input').focus();
    }
  }

  onKeyUpLastWeekForthNumberInput(e) {
    if (e.target.value.length >= 2) {
      getElement('.last-week-fifth-number-input').focus();
    }

    if (e.target.value.length === 0 && e.key === 'Backspace') {
      getElement('.last-week-third-number-input').focus();
    }
  }

  onKeyUpLastWeekFifthNumberInput(e) {
    if (e.target.value.length >= 2) {
      getElement('.last-week-sixth-number-input').focus();
    }

    if (e.target.value.length === 0 && e.key === 'Backspace') {
      getElement('.last-week-forth-number-input').focus();
    }
  }

  onKeyUpLastWeekSixthNumberInput(e) {
    if (e.target.value.length >= 2) {
      getElement('.last-week-bonus-number-input').focus();
    }

    if (e.target.value.length === 0 && e.key === 'Backspace') {
      getElement('.last-week-fifth-number-input').focus();
    }
  }

  onKeyUpLastWeekBonusNumberInput(e) {
    if (e.target.value.length === 0 && e.key === 'Backspace') {
      getElement('.last-week-sixth-number-input').focus();
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

    bindEventListener({
      appElement: this.$app,
      type: 'keyup',
      selector: '.last-week-first-number-input',
      callback: this.onKeyUpLastWeekFirstNumberInput.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'keyup',
      selector: '.last-week-second-number-input',
      callback: this.onKeyUpLastWeekSecondNumberInput.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'keyup',
      selector: '.last-week-third-number-input',
      callback: this.onKeyUpLastWeekThirdNumberInput.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'keyup',
      selector: '.last-week-forth-number-input',
      callback: this.onKeyUpLastWeekForthNumberInput.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'keyup',
      selector: '.last-week-fifth-number-input',
      callback: this.onKeyUpLastWeekFifthNumberInput.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'keyup',
      selector: '.last-week-sixth-number-input',
      callback: this.onKeyUpLastWeekSixthNumberInput.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'keyup',
      selector: '.last-week-bonus-number-input',
      callback: this.onKeyUpLastWeekBonusNumberInput.bind(this),
    });
  }
}
