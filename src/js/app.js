import {
  isPositiveInteger,
  isRemainder,
  isOverRange,
  isOverlapped,
  createRandomNumberList,
  totalWinningCount,
  totalWinningMoney,
  winningRate,
} from './utils';
import {
  CLASS_NAME,
  ID,
  MONEY,
  ERROR_MESSAGE,
  LOTTO,
  CLASS,
} from './constants';
import Lotto from './Lotto';
import {
  generatePaymentSection,
  generatePurchasedSection,
  generateWinningNumberSection,
} from './templates';
import {
  $,
  $$,
  bindClick,
  render,
  initInput,
  toggleDisabled,
  toggleClassName,
} from './dom';

export default class LottoApp {
  constructor(app) {
    this.$app = $(app);
    render(this.$app, generatePaymentSection());

    this.lottoList = [];
    this.bindEvent();
  }

  bindEvent() {
    bindClick(this.$app, ID.PAYMENT_BUTTON, this.onSubmitPayment.bind(this));

    bindClick(
      this.$app,
      ID.LOTTO_LIST_TOGGLE_BUTTON,
      this.onClickToggleButton.bind(this)
    );

    bindClick(
      this.$app,
      ID.MODAL_CLOSE_BUTTON,
      this.onClickModalClose.bind(this)
    );

    bindClick(
      this.$app,
      ID.RESULT_CHECKING_BUTTON,
      this.onClickResultButton.bind(this)
    );

    window.addEventListener('click', (e) => {
      if (e.target === document.querySelector(CLASS.MODAL_BACKGROUND)) {
        this.onClickModalClose();
      }
    });

    bindClick(this.$app, ID.RESTART, this.onClickRestart.bind(this));
  }

  onSubmitPayment() {
    const $paymentInput = $(ID.PAYMENT_INPUT);
    const payment = Number($paymentInput.value);

    try {
      if (!isPositiveInteger(payment)) {
        throw new Error(ERROR_MESSAGE.MONEY_OUT_OF_RANGE);
      }
      if (isRemainder(payment, MONEY.STANDARD)) {
        throw new Error(ERROR_MESSAGE.MONEY_OUT_OF_STANDARD);
      }

      this.disablePayment();
      this.generatePurchasedLottoList(payment / MONEY.STANDARD);
      this.renderPurchasedSection();

      const $winningNumberInputs = $$(CLASS.WINNING_NUMBER_INPUT);
      const $bonusNumberInput = $(ID.BONUS_NUMBER_INPUT);
      $winningNumberInputs[0].focus();
      $winningNumberInputs.forEach((numberInput, index) => {
        numberInput.addEventListener('input', () => {
          if (numberInput.value.length === 2) {
            if (index === 5) {
              $bonusNumberInput.focus();
              return;
            }
            $winningNumberInputs[index + 1].focus();
          }
        });
      });
    } catch ({ message }) {
      alert(message);
      initInput($paymentInput);
    }
  }

  disablePayment() {
    toggleClassName($(ID.PAYMENT_BUTTON), CLASS_NAME.DISABLED);

    toggleDisabled($(ID.PAYMENT_BUTTON));
    toggleDisabled($(ID.PAYMENT_INPUT));
  }

  renderPurchasedSection() {
    render(this.$app, generatePurchasedSection(this.lottoList));
    render(this.$app, generateWinningNumberSection());
  }

  generatePurchasedLottoList(count) {
    for (let i = 0; i < count; i++) {
      const lotto = new Lotto();
      lotto.setLotto(createRandomNumberList());
      this.lottoList.push(lotto.getLotto());
    }
  }

  onClickToggleButton() {
    toggleClassName($(ID.LOTTO_LIST_TOGGLE_BUTTON), CLASS_NAME.TOGGLE_SWITCH);

    toggleClassName($(ID.LOTTO_LIST), CLASS_NAME.DIRECTION_COLUMN);

    $$(CLASS.LOTTO_NUMBER).forEach((element) => {
      toggleClassName(element, CLASS_NAME.INVISIBLE);
    });
  }

  onClickResultButton() {
    const $winningNumberInputs = $$(CLASS.WINNING_NUMBER_INPUT);
    const $bonusNumberInput = $(ID.BONUS_NUMBER_INPUT);
    const winningNumber = [];
    const bonusNumber = Number($bonusNumberInput.value);

    try {
      $winningNumberInputs.forEach((input) => {
        if (
          isOverRange(
            LOTTO.MIN_NUMBER,
            LOTTO.MAX_NUMBER,
            Number(input.value)
          ) ||
          isOverRange(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER, bonusNumber)
        ) {
          throw new Error(ERROR_MESSAGE.NUMBER_OUT_OF_RANGE);
        }
        winningNumber.push(Number(input.value));
      });

      if (isOverlapped(winningNumber, bonusNumber)) {
        throw new Error(ERROR_MESSAGE.DUPLICATE_NUMBER);
      }

      const result = totalWinningCount(
        this.lottoList,
        winningNumber,
        bonusNumber
      );
      const totalMoney = totalWinningMoney(result);

      $$(CLASS.WINNING_COUNT).forEach((element, index) => {
        element.textContent = `${result[index]}개`;
      });
      $(CLASS.EARNING_WEIGHT).textContent = winningRate(
        totalMoney,
        this.lottoList.length
      );
      $winningNumberInputs.forEach((element) => toggleDisabled(element));
      toggleDisabled($bonusNumberInput);
      $(CLASS.MODAL_BACKGROUND).classList.add('show');
    } catch ({ message }) {
      alert(message);
      $winningNumberInputs.forEach((input) => {
        initInput(input);
      });
      initInput($bonusNumberInput);
      $winningNumberInputs[0].focus();
    }
  }

  onClickModalClose() {
    $(CLASS.MODAL_BACKGROUND).classList.remove('show');
  }

  onClickRestart() {
    $(CLASS.MODAL_BACKGROUND).classList.remove('show');
    $(ID.PURCHASED_LOTTO_SECTION).remove();
    $(ID.WINNING_NUMBER_SECTION).remove();

    toggleClassName($(ID.PAYMENT_BUTTON), CLASS_NAME.DISABLED);

    toggleDisabled($(ID.PAYMENT_BUTTON));
    toggleDisabled($(ID.PAYMENT_INPUT));
    initInput($(ID.PAYMENT_INPUT));

    this.lottoList = [];
  }
}
