import { LOTTO_NUMBERS, REGEX, SUCCESS_MESSAGE } from '../constants';
import { $, $$ } from '../utils/selector';
import { checkValidLottoCount, checkValidWinningNumbers } from '../utils/validator';
import makeTemplate from './template';

const keyValidator = {
  pressBackSpace: ({ key }) => key === 'Backspace',

  pressNumber: ({ key }) => key.match(/[0-9]/),

  pressPossibleKey: ({ key }) =>
    ['Tab', 'ArrowRight', 'ArrowLeft', 'Backspace'].some((possibleKey) => possibleKey === key),

  pressNotNumber: ({ target }) => target.value.match(REGEX.NOT_NUMBER),
};

const inputValidator = {
  isMaxLength: ({ target }) => target.value.length === 2,

  isMinLength: ({ target }) => target.value.length === 0,

  isNotMinIndex: (idx) => idx !== 0,

  isNotMaxIndex: (idx) => idx !== LOTTO_NUMBERS.LOTTO_LENGTH,
};

export default class InputView {
  constructor() {
    this.$app = $('#app');
    this.$result = $('#result');
    this.$lottoPriceForm = $('#lotto-price-form');
    this.$lottoPriceInput = $('#lotto-price-input');
    this.$lottoPriceInputMessage = $('#lotto-price-input-message');
    this.$lottoPriceButton = $('#lotto-price-button');
    this.bindEvent();
  }

  renderWinningNumbersInput() {
    this.$result.insertAdjacentHTML('beforeend', makeTemplate.makeWinningNumbersTemplate());
    this.initAfterRenderInput();
  }

  initAfterRenderInput() {
    this.$winningErrorMessage = $('#winning-input-message');
    this.$checkResultButton = $('#check-result-button');
    this.$winningNumberInputs = $$('.winning-number-input');

    this.$winningNumberInputs.forEach(($winningNumberInput, idx) => {
      $winningNumberInput.addEventListener('keydown', (e) =>
        this.pressDownWinningNumberInputEventHandler(e, idx),
      ); // 유효하지 않는 입력 막기
      $winningNumberInput.addEventListener('keyup', (e) =>
        this.pressUpWinningNumberInputEventHandler(e, idx),
      ); // 자동으로 2칸채우거나 빈칸일 경우 포커스 이동
      $winningNumberInput.addEventListener('input', this.preventKoreanInputHandler);
    });
  }

  bindEvent() {
    this.$result.addEventListener('focusout', this.checkValidInputPerFocusOut.bind(this));
    this.$result.addEventListener('focusin', this.restoreStatePerFocusIn.bind(this));
    this.$app.addEventListener('input', this.detectInputState.bind(this));
  }

  bindLottoPriceFormSubmitEvent(callback) {
    this.$lottoPriceForm.addEventListener('submit', (e) =>
      callback(e, this.$lottoPriceInput.valueAsNumber),
    );
  }

  pressDownWinningNumberInputEventHandler(e, idx) {
    if (
      keyValidator.pressBackSpace(e) &&
      inputValidator.isNotMinIndex(idx) &&
      inputValidator.isMinLength(e)
    ) {
      this.$winningNumberInputs[idx - 1].focus();
      e.preventDefault();
      return;
    }

    if (keyValidator.pressNumber(e) || keyValidator.pressPossibleKey(e)) {
      return;
    }

    e.preventDefault();
  }

  pressUpWinningNumberInputEventHandler(e, idx) {
    if (
      keyValidator.pressNumber(e) &&
      inputValidator.isMaxLength(e) &&
      inputValidator.isNotMaxIndex(idx)
    ) {
      this.$winningNumberInputs[idx + 1].focus();
    }
  }

  preventKoreanInputHandler(e) {
    if (keyValidator.pressNotNumber(e)) {
      e.target.value = e.target.value.replace(REGEX.NOT_NUMBER, '');
    }
  }

  detectInputState(e) {
    if (e.target.id === 'lotto-price-input') {
      this.detectMoneyInputState();
    }
    if (e.target.classList.contains('winning-number-input')) {
      this.detectWinningInputState();
    }
  }

  detectMoneyInputState() {
    const { valueAsNumber } = this.$lottoPriceInput;

    try {
      checkValidLottoCount(valueAsNumber);

      this.$lottoPriceInputMessage.innerText = SUCCESS_MESSAGE.PURCHASE_POSSIBLE;
      this.$lottoPriceInputMessage.classList.add('pass');
      this.$lottoPriceInput.classList.remove('invalid-input');
      this.activeLottoPriceButton();
    } catch (err) {
      this.$lottoPriceInputMessage.innerText = err.message;
      this.$lottoPriceInputMessage.classList.remove('pass');
      this.$lottoPriceInput.classList.add('invalid-input');
      this.blockLottoPriceButton();
    }
  }

  blockLottoPriceForm() {
    this.blockLottoPriceButton();
    this.blockLottoPriceInput();
  }

  openLottoPriceForm() {
    this.activeLottoPriceButton();
    this.activeLottoPriceInput();
  }

  blockLottoPriceButton() {
    this.$lottoPriceButton.disabled = true;
  }

  blockLottoPriceInput() {
    this.$lottoPriceInput.disabled = true;
  }

  activeLottoPriceButton() {
    this.$lottoPriceButton.disabled = false;
  }

  activeLottoPriceInput() {
    this.$lottoPriceInput.disabled = false;
  }

  detectWinningInputState() {
    const winnerNumberArray = Array.from(this.$winningNumberInputs).map(($winningNumberInput) =>
      Number.parseInt($winningNumberInput.value, 10),
    );

    try {
      checkValidWinningNumbers(winnerNumberArray);
      this.$winningErrorMessage.innerText = SUCCESS_MESSAGE.POSSIBLE_WINNING_NUMBER_INPUT;
      this.$winningErrorMessage.classList.add('pass');
      this.$checkResultButton.disabled = false;
    } catch (err) {
      this.$winningErrorMessage.classList.remove('pass');
      this.$winningErrorMessage.innerText = err.message;
      this.$checkResultButton.disabled = true;
    }
  }

  checkValidInputPerFocusOut({ target }) {
    if (target.tagName !== 'INPUT') {
      return;
    }
    if (!target.value.match(REGEX.NUMBER_IN_RANGE)) {
      target.classList.add('invalid-input');
    }
  }

  restoreStatePerFocusIn({ target }) {
    if (target.tagName !== 'INPUT') {
      return;
    }

    if (target.classList.contains('invalid-input')) {
      target.classList.remove('invalid-input');
    }
  }

  initLottoPriceInput() {
    this.$lottoPriceInput.value = '';
    this.$lottoPriceInputMessage.innerText = '';
  }
}
