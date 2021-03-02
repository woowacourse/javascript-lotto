import { $, $$, show, hide, enable } from '../utils/DOM.js';
import { hasElementOutOfRange, isShortLength, hasDuplicatedElement } from '../utils/general.js';
import {
  APP_RESET,
  RESULT_REQUESTED,
  RESULT_PREPARED,
  TICKET_ISSUE_COMPLETED,
  WINNING_NUMBER_SUBMITTED,
} from '../constants/appStages.js';
import { LOTTO_MIN_NUMBER, LOTTO_MAX_NUMBER, TOTAL_NUMBERS_LENGTH } from '../constants/lottoRules.js';
import { WINNING_NUMBER_CHECK_MESSAGE } from '../constants/display.js';

const validateInput = (numbersWithoutBlank) => {
  if (hasElementOutOfRange(numbersWithoutBlank, { min: LOTTO_MIN_NUMBER, max: LOTTO_MAX_NUMBER })) {
    return {
      isFulfilled: false,
      checkMessage: WINNING_NUMBER_CHECK_MESSAGE.OUT_OF_RANGE,
    };
  }
  if (hasDuplicatedElement(numbersWithoutBlank)) {
    return {
      isFulfilled: false,
      checkMessage: WINNING_NUMBER_CHECK_MESSAGE.DUPLICATED,
    };
  }
  if (isShortLength(numbersWithoutBlank, TOTAL_NUMBERS_LENGTH)) {
    return {
      isFulfilled: false,
      checkMessage: WINNING_NUMBER_CHECK_MESSAGE.HAS_BLANK,
    };
  }
  return {
    isFulfilled: true,
    checkMessage: WINNING_NUMBER_CHECK_MESSAGE.FULFILLED,
  };
};
export default class WinningNumberInput {
  constructor({ stageManager, lottoManager }) {
    this.stageManager = stageManager;
    this.lottoManager = lottoManager;
    this.isFulfilled = false;
    this.checkMessage = '';

    this.selectDOMs();
    this.subscribeAppStages();
    this.attachEvents();
  }

  selectDOMs() {
    this.$winningNumberForm = $('.winning-number-form');
    this.$winningNumberInputs = $$('.winning-number');
    this.$bonusNumberInput = $('.bonus-number');
    this.$winningNumberCheckMessage = $('.winning-number-check-message');
    this.$openResultModalButton = $('.open-result-modal-button');
  }

  subscribeAppStages() {
    this.stageManager.subscribe(TICKET_ISSUE_COMPLETED, this.showSection.bind(this));
    this.stageManager.subscribe(RESULT_PREPARED, this.activateButton.bind(this));
    this.stageManager.subscribe(APP_RESET, this.resetSection.bind(this));
  }

  attachEvents() {
    this.$winningNumberForm.addEventListener('keyup', this.onChangeWinningNumberInput.bind(this));
    this.$openResultModalButton.addEventListener('click', () =>
      this.stageManager.setStates({ stage: RESULT_REQUESTED })
    );
  }

  onChangeWinningNumberInput(e) {
    if (e.target.type !== 'number') {
      return;
    }

    const { numbers, bonus } = {
      numbers: [...e.currentTarget.querySelectorAll('.winning-number')].map(($input) => $input.value),
      bonus: e.currentTarget.querySelector('.bonus-number').value,
    };

    const { isFulfilled, checkMessage } = validateInput(
      [...numbers, bonus].filter((v) => v !== '').map((v) => Number(v))
    );

    this.setStates({ isFulfilled, checkMessage });
    if (!isFulfilled) {
      return;
    }
    this.lottoManager.setStates({
      winningNumber: {
        numbers: numbers.map((v) => Number(v)),
        bonus: Number(bonus),
      },
    });
    this.stageManager.setStates({
      stage: WINNING_NUMBER_SUBMITTED,
    });
  }

  setStates({ isFulfilled, checkMessage }) {
    if (typeof isFulfilled === 'boolean') {
      this.isFulfilled = isFulfilled;
    }
    if (typeof checkMessage === 'string' && this.checkMessage !== checkMessage) {
      this.checkMessage = checkMessage;
      this.renderCheckMessage();
    }
  }

  activateButton() {
    enable(this.$openResultModalButton);
  }

  renderCheckMessage() {
    this.$winningNumberCheckMessage.innerText = this.checkMessage;
    if (!this.isFulfilled) {
      this.$winningNumberCheckMessage.classList.replace('text-green', 'text-red');
      return;
    }
    this.$winningNumberCheckMessage.classList.replace('text-red', 'text-green');
  }

  showSection() {
    show(this.$winningNumberForm);
    this.$winningNumberInputs[0].focus();
  }

  resetSection() {
    this.$winningNumberForm.reset();
    hide(this.$winningNumberForm);
  }
}
