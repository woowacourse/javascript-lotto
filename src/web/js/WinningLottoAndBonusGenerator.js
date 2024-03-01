import { NUMBER_DELIMITER } from '../../constants';
import StatisticsPopupController from './StatisticsPopupController';

import { changeClassAboutGameStep, handleErrorMessage } from './utils';

class WinningLottoAndBonusGenerator {
  #lottoResultsHelper;

  $winningCriteriaFormElement = document.querySelector(
    '.winning-criteria__form',
  );

  /**
   *
   * @param {lottoResultsHelper} lottoResultsHelper
   */
  constructor(lottoResultsHelper) {
    this.#lottoResultsHelper = lottoResultsHelper;
    this.#addEvent();
  }

  #getNumbers() {
    const lottoNumberValues = Array.from(
      document.querySelectorAll('.winning-criteria__form-lotto-numbers input'),
    ).map((input) => input.value);

    return {
      lottoNumberValues: lottoNumberValues.join(NUMBER_DELIMITER),
      bonusNumberValues: document.querySelector('#input-bonus-number').value,
    };
  }

  #generateWinningLottoAndBonus() {
    const { lottoNumberValues, bonusNumberValues } = this.#getNumbers();
    const errorMessageElement = document.querySelector(
      '.winning-criteria .message-error',
    );

    try {
      this.#lottoResultsHelper.generateWinningLotto(lottoNumberValues);
      this.#lottoResultsHelper.generateBonus(bonusNumberValues);

      handleErrorMessage(errorMessageElement);

      this.#lottoResultsHelper.calculateMatchingResults();

      changeClassAboutGameStep('statistics');
      new StatisticsPopupController(this.#lottoResultsHelper);
    } catch (error) {
      handleErrorMessage(errorMessageElement, error);
    }
  }

  #addEvent() {
    this.$winningCriteriaFormElement.addEventListener('submit', (event) =>
      this.#handleSubmitToGetStatistics(event),
    );
  }

  #moveScrollToTop() {
    document.querySelector('html').scrollTop = 0;
  }

  #handleSubmitToGetStatistics(event) {
    event.preventDefault();
    this.#moveScrollToTop();
    this.#generateWinningLottoAndBonus();
  }
}

export default WinningLottoAndBonusGenerator;
