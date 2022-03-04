import { $, on, emit } from '../utils/helper.js';
import { LOTTO_MATCHING_RESULT_KEY } from '../utils/constants.js';

export default class LottoMatchResultView {
  #lottoResultDialog;

  #threeMatchedNumber;

  #fourMatchedNumber;

  #fiveMatchedNumber;

  #fiveWithBonusMatchedNumber;

  #sixMatchedNumber;

  #profitRate;

  #restartButton;

  #closeTag;

  constructor() {
    this.#lottoResultDialog = $('#lotto-result-dialog');
    this.#threeMatchedNumber = $('#three-matched-number');
    this.#fourMatchedNumber = $('#four-matched-number');
    this.#fiveMatchedNumber = $('#five-matched-number');
    this.#fiveWithBonusMatchedNumber = $('#five-with-bonus-matched-number');
    this.#sixMatchedNumber = $('#six-matched-number');
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

    this.#threeMatchedNumber.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.THREE];
    this.#fourMatchedNumber.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.FOUR];
    this.#fiveMatchedNumber.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.FIVE];
    this.#fiveWithBonusMatchedNumber.textContent =
      lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS];
    this.#sixMatchedNumber.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.SIX];
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
