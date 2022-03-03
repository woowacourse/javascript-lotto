import { $ } from '../utils/helper.js';
import { lottoResultModalTemplate } from '../utils/template.js';
import { LOTTO_MATCHING_RESULT_KEY } from '../utils/constants.js';

export default class LottoResultView {
  #app;

  #lottoResultDialog;

  #threeMatchedNumber;

  #fourMatchedNumber;

  #fiveMatchedNumber;

  #fiveWithBonusMatchedNumber;

  #sixMatchedNumber;

  constructor() {
    this.#app = $('#app');

    this.#app.insertAdjacentHTML('beforeend', lottoResultModalTemplate());

    this.#lottoResultDialog = $('#lotto-result-dialog');
    this.#threeMatchedNumber = $('#three-matched-number');
    this.#fourMatchedNumber = $('#four-matched-number');
    this.#fiveMatchedNumber = $('#five-matched-number');
    this.#fiveWithBonusMatchedNumber = $('#five-with-bonus-matched-number');
    this.#sixMatchedNumber = $('#six-matched-number');
  }

  render(lottoMatchingResult) {
    this.#lottoResultDialog.showModal();

    this.#threeMatchedNumber.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.THREE];
    this.#fourMatchedNumber.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.FOUR];
    this.#fiveMatchedNumber.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.FIVE];
    this.#fiveWithBonusMatchedNumber.textContent =
      lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.FIVE_PLUS_BONUS];
    this.#sixMatchedNumber.textContent = lottoMatchingResult[LOTTO_MATCHING_RESULT_KEY.SIX];
  }
}
