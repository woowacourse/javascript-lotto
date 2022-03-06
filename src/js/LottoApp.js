import LottoConsumer from './LottoConsumer';
import LottoSeller from './LottoSeller';
import createTemplate from './templates';

import { CLASS_NAME, SELECTOR, MONEY, LOTTO } from './constants';
import {
  getPurchasedLottoCount,
  getValidWinningNumberAndBonusNumber,
  getRateOfReturn,
  isUniqueWinningNumber,
} from './utils';
import {
  getElement,
  getElements,
  alertMessage,
  bindEventListener,
  render,
  initInput,
  enabledElements,
  toggleElement,
  disabledElements,
  removeChildElements,
  focusInput,
  bindsEventListener,
  disabledElement,
  enabledElement,
} from './dom';

export default class LottoApp {
  constructor(app) {
    this.$app = getElement(app);
    render(this.$app, createTemplate.paymentSection());

    this.$paymentInput = getElement(SELECTOR.PAYMENT_INPUT);
    this.$paymentButton = getElement(SELECTOR.PAYMENT_BUTTON);

    this.lottoConsumer = new LottoConsumer();
    this.lottoSeller = new LottoSeller();

    bindEventListener(
      this.$paymentButton,
      'click',
      this.onSubmitPaymentButton.bind(this)
    );
  }

  onSubmitRestartButton() {
    enabledElements(
      [this.$paymentInput, this.$paymentButton],
      CLASS_NAME.DISABLED
    );

    initInput(this.$paymentInput);

    removeChildElements(this.$app, [
      getElement(SELECTOR.LAST_WEEK_WINNING_NUMBER_SECTION),
      getElement(SELECTOR.PURCHASED_LOTTO_LIST_SECTION),
      this.$lottoResultSection,
      this.$coverTheBackground,
    ]);
  }

  onClickExitButton(e) {
    e.preventDefault();

    removeChildElements(this.$app, [
      this.$lottoResultSection,
      this.$coverTheBackground,
    ]);
  }

  onSubmitLottoResultButton(e) {
    try {
      e.preventDefault();
      const lastWeekWinningNumberList = [
        ...getElements(SELECTOR.LAST_WEEK_NUMBER_INPUT),
      ].map((numberInputElement) => numberInputElement.valueAsNumber);

      const lastWeekWinningBonusNumber = getElement(
        SELECTOR.LAST_WEEK_BONUS_NUMBER_INPUT
      ).valueAsNumber;

      this.lottoSeller.setLastWeekWinningLottoNumbers(
        getValidWinningNumberAndBonusNumber(
          lastWeekWinningNumberList,
          lastWeekWinningBonusNumber
        )
      );

      this.lottoSeller.setWinningCount(
        this.lottoConsumer.getLottoList(),
        this.lottoSeller.getLastWeekWinningLottoList(),
        this.lottoSeller.getLastWeekWinningBonusNumber()
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
    toggleElement(this.$lottoListToggleButton, CLASS_NAME.TOGGLE_SWITCH);

    toggleElement(getElement(SELECTOR.LOTTO_LIST), CLASS_NAME.DIRECTION_COLUMN);

    getElements(SELECTOR.LOTTO).forEach((element) => {
      toggleElement(element, CLASS_NAME.DISPLAY_FLEX);
    });

    getElements(SELECTOR.LOTTO_NUMBER).forEach((element) => {
      toggleElement(element, CLASS_NAME.INVISIBLE);
    });
  }

  onSubmitPaymentButton(e) {
    try {
      e.preventDefault();
      const purchasedLottoCount = getPurchasedLottoCount(
        this.$paymentInput.valueAsNumber,
        MONEY.STANDARD
      );

      disabledElements(
        [this.$paymentButton, this.$paymentInput],
        CLASS_NAME.DISABLED
      );

      this.lottoConsumer.setLottoList(purchasedLottoCount);
      this.lottoSeller.setPurchasedAmount(purchasedLottoCount);

      render(
        this.$app,
        `${createTemplate.purchasedSection(this.lottoConsumer.getLottoList())}
          ${createTemplate.lastWeekWinningNumberSection()}`
      );

      this.purchasedLottoListSectionBindEvent();
      this.lastWeekWinningNumberSectionBindEvent();

      focusInput(getElement(`[data-input-id="${1}"]`));
    } catch (error) {
      alertMessage(error.message);
      initInput(this.$paymentInput);
    }
  }

  onKeyUpLastWeekWinningNumberInput({ target, key }) {
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

    let count = 0;

    [...this.$winningNumbers].reduce(
      (previousWinningNumbers, winningNumberElement) => {
        const currentWinningNumber = winningNumberElement.valueAsNumber;

        if (
          currentWinningNumber >= LOTTO.MIN_NUMBER &&
          currentWinningNumber <= LOTTO.MAX_NUMBER &&
          isUniqueWinningNumber({
            winningNumberElements: this.$winningNumbers,
            winningNumberElement,
            previousWinningNumbers,
            currentWinningNumber,
          })
        ) {
          count++;
        }

        return [...previousWinningNumbers, currentWinningNumber];
      },
      []
    );

    if (count === 7) {
      enabledElement(this.$resultCheckingButton, CLASS_NAME.DISABLED);

      return;
    }

    disabledElement(this.$resultCheckingButton, CLASS_NAME.DISABLED);
  }

  purchasedLottoListSectionBindEvent() {
    this.$lottoListToggleButton = getElement(SELECTOR.LOTTO_LIST_TOGGLE_BUTTON);
    this.$winningNumbers = getElements(SELECTOR.WINNING_NUMBERS);

    bindEventListener(
      this.$lottoListToggleButton,
      'click',
      this.onClickToggleButton.bind(this)
    );
  }

  lastWeekWinningNumberSectionBindEvent() {
    this.$resultCheckingButton = getElement(SELECTOR.RESULT_CHECKING_BUTTON);

    bindEventListener(
      this.$resultCheckingButton,
      'click',
      this.onSubmitLottoResultButton.bind(this)
    );

    bindsEventListener(
      getElement(SELECTOR.WINNING_NUMBER_CONTAINER),
      'keyup',
      this.onKeyUpLastWeekWinningNumberInput.bind(this)
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
