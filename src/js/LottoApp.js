import LottoConsumer from './LottoConsumer';
import LottoSeller from './LottoSeller';
import createTemplate from './templates';

import { CLASS_NAME, SELECTOR, MONEY } from './constants';
import {
  getPurchasedLottoCount,
  getValidWinningNumberAndBonusNumber,
  getRateOfReturn,
} from './utils';
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

export default class LottoApp {
  constructor(app) {
    this.$app = getElement(app);
    render(this.$app, createTemplate.paymentSection());

    this.$paymentInput = getElement(SELECTOR.PAYMENT_INPUT);
    this.$paymentButton = getElement(SELECTOR.PAYMENT_BUTTON);
    this.$coverTheBackground = null;
    this.$lottoResultSection = null;

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
    removeChildElement(
      this.$app,
      getElement(SELECTOR.PURCHASED_LOTTO_LIST_SECTION)
    );
    removeChildElement(this.$app, getElement(SELECTOR.RESULT_CHECKING_SECTION));
    removeChildElement(this.$app, this.$lottoResultSection);
    removeChildElement(this.$app, this.$coverTheBackground);
  }

  onClickExitButton() {
    removeChildElement(this.$app, this.$lottoResultSection);
    removeChildElement(this.$app, this.$coverTheBackground);
  }

  onSubmitLottoResultButton() {
    try {
      const lastWeekNumberList = [
        ...getElements(SELECTOR.LAST_WEEK_NUMBER_INPUT),
      ].map((numberInputElement) => numberInputElement.valueAsNumber);

      const lastWeekBonusNumber = getElement(
        SELECTOR.LAST_WEEK_BONUS_NUMBER_INPUT
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

      this.$coverTheBackground = getElement(SELECTOR.COVER_THE_BACKGROUND);
      this.$lottoResultSection = getElement(SELECTOR.LOTTO_RESULT_SECTION);

      this.$coverTheBackground.style.height = `${this.$app.scrollHeight}px`;
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

      focusInput(getElement(`[data-input-id="${1}"]`));
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

    if (e.key === 'Enter' && e.target.dataset.inputId !== '1') {
      this.onSubmitLottoResultButton();
      focusInput(getElement(SELECTOR.RESTART_BUTTON));
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
      selector: SELECTOR.RESULT_CHECKING_BUTTON,
      callback: this.onSubmitLottoResultButton.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'click',
      selector: SELECTOR.EXIT_BUTTON,
      callback: this.onClickExitButton.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'click',
      selector: SELECTOR.RESTART_BUTTON,
      callback: this.onSubmitRestartButton.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'keyup',
      selector: SELECTOR.LAST_WEEK_NUMBER_INPUT,
      callback: this.onKeyUpLastWeekNumberInput.bind(this),
    });

    bindEventListener({
      appElement: this.$app,
      type: 'keyup',
      selector: SELECTOR.LAST_WEEK_BONUS_NUMBER_INPUT,
      callback: this.onKeyUpLastWeekNumberInput.bind(this),
    });
  }
}
