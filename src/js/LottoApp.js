import { isPositiveInteger, isRemainder, isOverRange, isOverlapped } from './util/utils';
import { ID, MONEY_STANDARD, ERROR_MESSAGE, LOTTO, CLASS } from './util/constants';
import { generatePaymentSection, generatePurchasedSection, generateWinningNumberSection } from './view/templates';
import { $, $$, render, initInput } from './view/dom';
import PurchasedLotto from './PurchasedLotto';
import { toggleDisablePayment, generateResult, moveFocusToNextNumber, toggleButton, modalClose } from './view/view';

export default class LottoApp {
  constructor(app) {
    this.$app = $(app);
    this.lottoList = new PurchasedLotto();

    render(this.$app, generatePaymentSection());
    this.bindEvent();
  }

  bindEvent() {
    $(ID.PAYMENT_BUTTON).addEventListener('click', this.onSubmitPayment.bind(this));
    $(ID.MODAL_CLOSE_BUTTON).addEventListener('click', modalClose);

    $(CLASS.MODAL_BACKGROUND).addEventListener('click', (event) => {
      if (event.target === $(CLASS.MODAL_BACKGROUND)) {
        modalClose();
      }
    });

    $(ID.RESTART).addEventListener('click', this.onClickRestart.bind(this));
  }

  onSubmitPayment(event) {
    event.preventDefault();
    const $paymentInput = $(ID.PAYMENT_INPUT);
    const payment = Number($paymentInput.value);

    try {
      if (!isPositiveInteger(payment)) {
        throw new Error(ERROR_MESSAGE.MONEY_OUT_OF_RANGE);
      }
      if (isRemainder(payment, MONEY_STANDARD)) {
        throw new Error(ERROR_MESSAGE.MONEY_OUT_OF_STANDARD);
      }

      toggleDisablePayment();
      this.lottoList.setPurchasedLotto(payment / MONEY_STANDARD);
      this.renderPurchasedSection();

      moveFocusToNextNumber();
    } catch ({ message }) {
      alert(message);
      initInput($paymentInput);
    }
  }

  renderPurchasedSection() {
    render(this.$app, generatePurchasedSection(this.lottoList.getPurchasedLotto()));
    render(this.$app, generateWinningNumberSection());
    $(ID.LOTTO_LIST_TOGGLE_BUTTON).addEventListener('click', toggleButton);
    $(ID.RESULT_CHECKING_BUTTON).addEventListener('click', this.onClickResultButton.bind(this));
  }

  onClickResultButton(event) {
    event.preventDefault();
    const $winningNumberInputs = $$(CLASS.WINNING_NUMBER_INPUT);
    const $bonusNumberInput = $(ID.BONUS_NUMBER_INPUT);
    const winningNumber = [];
    const bonusNumber = Number($bonusNumberInput.value);

    try {
      $winningNumberInputs.forEach((input) => {
        if (isOverRange(LOTTO.MIN_NUMBER, LOTTO.MAX_NUMBER, Number(input.value))) {
          throw new Error(ERROR_MESSAGE.NUMBER_OUT_OF_RANGE);
        }
        winningNumber.push(Number(input.value));
      });

      if (isOverlapped(winningNumber)) {
        throw new Error(ERROR_MESSAGE.DUPLICATE_NUMBER);
      }

      generateResult(this.lottoList, winningNumber, bonusNumber);
      $(CLASS.MODAL_BACKGROUND).classList.add('show');
    } catch ({ message }) {
      alert(message);
    }
  }

  onClickRestart(event) {
    event.preventDefault();
    modalClose();
    $(ID.PURCHASED_LOTTO_LIST_SECTION).remove();
    $(ID.WINNING_NUMBER_SECTION).remove();

    toggleDisablePayment();
    initInput($(ID.PAYMENT_INPUT));

    this.lottoList = new PurchasedLotto();
  }
}
