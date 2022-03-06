import { $, on, emit } from '../utils/helper.js';
import { LOTTO_MATCHING_RESULT_KEY } from '../utils/constants.js';

export default class LottoMatchResultModalView {
  #closeTag;

  #lottoResultDialog;

  #matchedNumbers;

  #profitRate;

  #restartButton;

  constructor() {
    this.#lottoResultDialog = $('#lotto-result-dialog');
    this.#matchedNumbers = {
      three: $('#three-matched-number'),
      four: $('#four-matched-number'),
      five: $('#five-matched-number'),
      fiveWithBonus: $('#five-with-bonus-matched-number'),
      six: $('#six-matched-number'),
    };
    this.#profitRate = $('#profit-rate');
    this.#restartButton = $('#restart-button');
    this.#closeTag = $('#close-tag');

    this.#attachEvents();
  }

  get restartButton() {
    return this.#restartButton;
  }

  #attachEvents() {
    on(this.#restartButton, 'click', this.#handleRestart.bind(this));
    on(this.#closeTag, 'click', this.#handleCloseDialog.bind(this));
  }

  render(lottoMatchingResult, profit) {
    this.#lottoResultDialog.showModal();

    this.#matchedNumbers.three.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.THREE];
    this.#matchedNumbers.four.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.FOUR];
    this.#matchedNumbers.five.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.FIVE];
    this.#matchedNumbers.fiveWithBonus.textContent =
      lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS];
    this.#matchedNumbers.six.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.SIX];
    this.#profitRate.textContent = profit;
  }

  #handleRestart() {
    this.#lottoResultDialog.close();
    emit(this.#restartButton, '@restart');
  }

  #handleCloseDialog() {
    this.#lottoResultDialog.close();
  }
}
