import { isPositiveInteger, isRemainder, isOverRange, isOverlapped } from './util/utils';
import { ID, MONEY, ERROR_MESSAGE, LOTTO, CLASS } from './util/constants';
import { generatePaymentSection, generatePurchasedSection, generateWinningNumberSection } from './view/templates';
import { $, $$, bindClick, render, initInput } from './view/dom';
import PurchasedLotto from './PurchasedLotto';
import { toggleDisablePayment, generateResult, moveFocus, toggleButton, modalClose } from './view/view';

export default class LottoApp {
  constructor(app) {
    this.$app = $(app);
    render(this.$app, generatePaymentSection());

    this.lottoList = [];
    this.bindEvent();
  }

  bindEvent() {
    bindClick(this.$app, ID.PAYMENT_BUTTON, this.onSubmitPayment.bind(this));
    bindClick(this.$app, ID.LOTTO_LIST_TOGGLE_BUTTON, toggleButton);
    bindClick(this.$app, ID.MODAL_CLOSE_BUTTON, modalClose);
    bindClick(this.$app, ID.RESULT_CHECKING_BUTTON, this.onClickResultButton.bind(this));

    window.addEventListener('click', (e) => {
      if (e.target === document.querySelector(CLASS.MODAL_BACKGROUND)) {
        modalClose();
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

      toggleDisablePayment();
      this.lottoList = new PurchasedLotto();
      this.lottoList.setPurchasedLotto(payment / MONEY.STANDARD);
      this.renderPurchasedSection();

      moveFocus();
    } catch ({ message }) {
      alert(message);
      initInput($paymentInput);
    }
  }

  renderPurchasedSection() {
    render(this.$app, generatePurchasedSection(this.lottoList.getPurchasedLotto()));
    render(this.$app, generateWinningNumberSection());
  }

  onClickResultButton() {
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

  onClickRestart() {
    $(CLASS.MODAL_BACKGROUND).classList.remove('show');
    $(ID.PURCHASED_LOTTO_SECTION).remove();
    $(ID.WINNING_NUMBER_SECTION).remove();

    toggleDisablePayment();
    initInput($(ID.PAYMENT_INPUT));

    this.lottoList = [];
  }
}
