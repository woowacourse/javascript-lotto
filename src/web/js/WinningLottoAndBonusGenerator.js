import { NUMBER_DELIMITER } from '../../constants';
import StatisticsPopupController from './StatisticsPopupController';

import { handleErrorMessage } from './utils';

class WinningLottoAndBonusGenerator {
  #lottoResultsHelper;

  #formEl;

  /**
   *
   * @param {lottoResultsHelper} lottoResultsHelper
   */
  constructor(lottoResultsHelper) {
    this.#lottoResultsHelper = lottoResultsHelper;
    this.#assignEl();
    this.#addEvent();
  }

  #assignEl() {
    this.#formEl = document.querySelector('.winningCriteria__form');
  }

  #getNumbers() {
    const lottoNumberValues = Array.from(
      this.#formEl.querySelectorAll(
        '.winningCriteria__form_lottoNumbers input',
      ),
    ).map((input) => input.value);

    return {
      lottoNumberValues: lottoNumberValues.join(NUMBER_DELIMITER),
      bonusNumberValues: document.querySelector('#input-bonusNumber').value,
    };
  }

  #generateWinningLottoAndBonus() {
    const { lottoNumberValues, bonusNumberValues } = this.#getNumbers();

    const errorMessageEl = document.querySelector(
      '.winningCriteria .message-error',
    );

    try {
      this.#lottoResultsHelper.generateWinningLotto(lottoNumberValues);
      this.#lottoResultsHelper.generateBonus(bonusNumberValues);

      this.#lottoResultsHelper.calculateMatchingResults();

      handleErrorMessage(errorMessageEl);
      // eslint-disable-next-line
      const statisticsPopupController = new StatisticsPopupController(
        this.#lottoResultsHelper,
      );
    } catch (error) {
      handleErrorMessage(errorMessageEl, error);
    }
  }

  #addEvent() {
    const btnCheckResultEl = this.#formEl.querySelector('button');

    btnCheckResultEl.addEventListener('click', (event) =>
      this.#handleClickBtn(event),
    );
  }

  #handleClickBtn(event) {
    event.preventDefault();
    this.#generateWinningLottoAndBonus();
  }

  // [x] .btn-checkResult 클릭 시, input value 읽어와서 당첨 번호, 보너스 번호 만들기
  // [x] 유효성 검사
  // 1. 당첨 번호 -> lottoResultsHelper generateWinningLotto
  // 2. 보너스 번호 -> lottoResultHelper generateBonus

  // 클릭 시-> 통계 , popup 생성
}

export default WinningLottoAndBonusGenerator;
