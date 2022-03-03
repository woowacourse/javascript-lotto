import {
  getPurchasedLottoCount,
  getValidWinningNumberAndBonusNumber,
  getRateOfReturn,
} from './utils';
import { CLASS_NAME, SELECTOR, MONEY } from './constants';
import LottoConsumer from './LottoConsumer';
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
  removeChildElement,
  focusInput,
} from './dom';
import LottoSeller from './LottoSeller';

export default class LottoApp {
  constructor(app) {
    this.$app = getElement(app);
    render(this.$app, createTemplate.paymentSection());

    this.$paymentInput = getElement(SELECTOR.PAYMENT_INPUT);
    this.$paymentButton = getElement(SELECTOR.PAYMENT_BUTTON);

    this.lottoConsumer = new LottoConsumer();
    this.lottoSeller = new LottoSeller();

    this.bindEvent();
  }

  onSubmitRestartButton() {
    disableElement(this.$paymentInput);
    toggleClassName(this.$paymentInput, CLASS_NAME.DISABLED);

    disableElement(this.$paymentButton);
    toggleClassName(this.$paymentButton, CLASS_NAME.DISABLED);

    initInput(this.$paymentInput);

    removeChildElement(
      this.$app,
      getElement(SELECTOR.LAST_WEEK_WINNING_NUMBER_SECTION)
    );
    removeChildElement(this.$app, getElement('#purchased-lotto-list-section'));
    removeChildElement(this.$app, getElement('#result-checking-section'));
    removeChildElement(this.$app, getElement('#lotto-result-section'));
    removeChildElement(this.$app, getElement('#cover-the-background'));
  }

  onClickExitButton() {
    removeChildElement(this.$app, getElement('#lotto-result-section'));
    removeChildElement(this.$app, getElement('#cover-the-background'));
  }

  onSubmitLottoResultButton() {
    try {
      const lastWeekNumberList = [
        ...getElements('.last-week-number-input'),
      ].map((numberInputElement) => numberInputElement.valueAsNumber);

      const lastWeekBonusNumber = getElement(
        '.last-week-bonus-number-input'
      ).valueAsNumber;

      this.lottoSeller.setLastWeekLottoNumbers(
        getValidWinningNumberAndBonusNumber(
          lastWeekNumberList,
          lastWeekBonusNumber
        )
      );

      this.lottoSeller.setWinningCount(
        this.lottoConsumer.getLottoList(),
        this.lottoSeller.getLastWeekLottoList(),
        this.lottoSeller.getLastWeekBonusNumber()
      );

      render(
        this.$app,
        createTemplate.lottoResultSection(
          this.lottoSeller.getWinningCount(),
          getRateOfReturn(
            this.lottoSeller.totalWinningAmount(),
            this.lottoSeller.getPurchasedAmount()
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
      toggleClassName(element, CLASS_NAME.DISPLAY_FLEX);
    });

    getElements(SELECTOR.LOTTO_NUMBER).forEach((element) => {
      toggleClassName(element, CLASS_NAME.INVISIBLE);
    });
  }

  onSubmitPaymentButton() {
    try {
      const purchasedLottoCount = getPurchasedLottoCount(
        this.$paymentInput.valueAsNumber,
        MONEY.STANDARD
      );

      toggleClassName(this.$paymentButton, CLASS_NAME.DISABLED);

      disableElement(this.$paymentButton);
      disableElement(this.$paymentInput);

      this.lottoConsumer.setLottoList(purchasedLottoCount);
      this.lottoSeller.setPurchasedAmount(purchasedLottoCount);

      render(
        this.$app,
        createTemplate.purchasedSection(this.lottoConsumer.getLottoList())
      );
      render(this.$app, createTemplate.lastWeekWinningNumberSection());
      render(this.$app, createTemplate.resultCheckingSection());
    } catch (error) {
      alertMessage(error.message);
      initInput(this.$paymentInput);
    }
  }

  onKeyUpLastWeekNumberInput(e) {
    if (e.target.value.length >= 2 && e.target.dataset.inputId !== '7') {
      focusInput(
        getElement(`[data-input-id="${Number(e.target.dataset.inputId) + 1}"]`)
      );
    }

    if (
      e.target.value.length === 0 &&
      e.key === 'Backspace' &&
      e.target.dataset.inputId !== '1'
    ) {
      focusInput(
        getElement(`[data-input-id="${Number(e.target.dataset.inputId) - 1}"]`)
      );
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
      selector: '.last-week-number-input',
      callback: this.onKeyUpLastWeekNumberInput.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'keyup',
      selector: '.last-week-bonus-number-input',
      callback: this.onKeyUpLastWeekNumberInput.bind(this),
    });
  }
}
