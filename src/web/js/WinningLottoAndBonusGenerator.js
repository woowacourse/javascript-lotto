import { NUMBER_DELIMITER } from '../../constants';
import StatisticsPopupController from './StatisticsPopupController';

import { handleErrorMessage } from './utils';

class WinningLottoAndBonusGenerator {
  #lottoResultsHelper;

  #element = {
    btnCheckResult: undefined,
    // lottoNumbers, bonusNumber input 포함
    inputElList: undefined,
  };

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
    this.#element.inputElList = document.querySelectorAll(
      '.winningCriteria__inputGroupContainer input',
    );

    this.#element.btnCheckResult = document.querySelector('.btn-checkResult');
  }

  #getNumbers() {
    const numberInputValues = Array.from(this.#element.inputElList).map(
      (element) => element.value,
    );

    const lastIndex = numberInputValues.length - 1;
    return {
      lottoNumberValues: numberInputValues
        .slice(0, lastIndex)
        .join(NUMBER_DELIMITER),
      bonusNumberValues: numberInputValues[lastIndex],
    };
  }

  #generateWinningLottoAndBonus() {
    const { lottoNumberValues, bonusNumberValues } = this.#getNumbers();

    const errorMessageEl = document.querySelector(
      '.winningCriteria .errorMessage',
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
    this.#element.btnCheckResult.addEventListener('click', (event) =>
      this.#handleClickBtn(event),
    );
  }

  #handleClickBtn(event) {
    event.stopPropagation();
    this.#generateWinningLottoAndBonus();
  }

  // [x] .btn-checkResult 클릭 시, input value 읽어와서 당첨 번호, 보너스 번호 만들기
  // [x] 유효성 검사
  // 1. 당첨 번호 -> lottoResultsHelper generateWinningLotto
  // 2. 보너스 번호 -> lottoResultHelper generateBonus

  // 클릭 시-> 통계 , popup 생성
}

export default WinningLottoAndBonusGenerator;
