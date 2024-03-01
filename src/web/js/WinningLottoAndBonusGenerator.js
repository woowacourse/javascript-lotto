import { NUMBER_DELIMITER } from '../../constants';
import { GAME_STEP } from '../constants/gameStep';
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

    this.$winningCriteriaFormElement.addEventListener('reset', (event) =>
      this.#handleResetForm(event),
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

  #handleResetForm(event) {
    event.preventDefault();

    const appInnerElement = document.querySelector('#app .inner');
    if (appInnerElement.classList.contains(GAME_STEP.payment)) {
      return;
    }
    // TODO 초기화 오류
    changeClassAboutGameStep('payment');
  }
}

export default WinningLottoAndBonusGenerator;
