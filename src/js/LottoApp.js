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
  bindsEventListener,
} from './dom';

export default class LottoApp {
  constructor(app) {
    this.$app = getElement(app);
    render(this.$app, createTemplate.paymentSection());

    this.$paymentInput = getElement(SELECTOR.PAYMENT_INPUT);
    this.$paymentButton = getElement(SELECTOR.PAYMENT_BUTTON);
    this.$coverTheBackground = null;
    this.$lottoResultSection = null;
    this.$restartButton = null;
    this.$lottoListToggleButton = null;

    this.lottoConsumer = new LottoConsumer();
    this.lottoSeller = new LottoSeller();

    bindEventListener(
      this.$paymentButton,
      'click',
      this.onSubmitPaymentButton.bind(this)
    );
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
    removeChildElement(this.$app, this.$lottoResultSection);
    removeChildElement(this.$app, this.$coverTheBackground);
  }

  onClickExitButton(e) {
    e.preventDefault();

    removeChildElement(this.$app, this.$lottoResultSection);
    removeChildElement(this.$app, this.$coverTheBackground);
  }

  onSubmitLottoResultButton(e) {
    try {
      e.preventDefault();
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

      this.resultSectionBindEvent();

      this.$lottoResultSection = getElement(SELECTOR.LOTTO_RESULT_SECTION);

      focusInput(this.$restartButton);
    } catch (error) {
      alertMessage(error.message);
    }
  }

  onClickToggleButton() {
    toggleClassName(this.$lottoListToggleButton, CLASS_NAME.TOGGLE_SWITCH);

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

  onSubmitPaymentButton(e) {
    try {
      e.preventDefault();
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

      this.purchasedLottoListSectionBindEvent();
      this.lastWeekWinningNumberSectionBindEvent();

      focusInput(getElement(`[data-input-id="${1}"]`));
    } catch (error) {
      console.log(error);
      alertMessage(error.message);
      initInput(this.$paymentInput);
    }
  }

  onKeyUpLastWeekNumberInput({ target, key }) {
    if (
      !target.matches(SELECTOR.LAST_WEEK_NUMBER_INPUT) &&
      !target.matches(SELECTOR.LAST_WEEK_BONUS_NUMBER_INPUT)
    ) {
      return;
    }

    if (target.value.length >= 2 && target.dataset.inputId !== '7') {
      focusInput(
        getElement(`[data-input-id="${Number(target.dataset.inputId) + 1}"]`)
      );
    }

    if (
      target.value.length === 0 &&
      key === 'Backspace' &&
      target.dataset.inputId !== '1'
    ) {
      focusInput(
        getElement(`[data-input-id="${Number(target.dataset.inputId) - 1}"]`)
      );
    }
  }

  purchasedLottoListSectionBindEvent() {
    this.$lottoListToggleButton = getElement(SELECTOR.LOTTO_LIST_TOGGLE_BUTTON);

    bindEventListener(
      this.$lottoListToggleButton,
      'click',
      this.onClickToggleButton.bind(this)
    );
  }

  lastWeekWinningNumberSectionBindEvent() {
    bindEventListener(
      getElement(SELECTOR.RESULT_CHECKING_BUTTON),
      'click',
      this.onSubmitLottoResultButton.bind(this)
    );

    bindsEventListener(
      getElement(SELECTOR.WINNING_NUMBER_CONTAINER),
      'keyup',
      this.onKeyUpLastWeekNumberInput.bind(this)
    );
  }

  resultSectionBindEvent() {
    this.$restartButton = getElement(SELECTOR.RESTART_BUTTON);
    this.$coverTheBackground = getElement(SELECTOR.COVER_THE_BACKGROUND);

    bindEventListener(
      getElement(SELECTOR.EXIT_BUTTON),
      'click',
      this.onClickExitButton.bind(this)
    );

    bindEventListener(
      this.$coverTheBackground,
      'click',
      this.onClickExitButton.bind(this)
    );

    bindEventListener(
      this.$restartButton,
      'click',
      this.onSubmitRestartButton.bind(this)
    );
  }
}
