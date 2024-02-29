import { NUMBER_DELIMITER } from '../../constants';
import StatisticsPopupController from './StatisticsPopupController';

import { handleErrorMessage } from './utils';

class WinningLottoAndBonusGenerator {
  #lottoResultsHelper;

  #formElement;

  /**
   *
   * @param {lottoResultsHelper} lottoResultsHelper
   */
  constructor(lottoResultsHelper) {
    this.#lottoResultsHelper = lottoResultsHelper;
    this.#assignElement();
    this.#addEvent();
  }

  #assignElement() {
    this.#formElement = document.querySelector('.winning-criteria__form');
  }

  #getNumbers() {
    const lottoNumberValues = Array.from(
      this.#formElement.querySelectorAll(
        '.winning-criteria__form-lotto-numbers input',
      ),
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

      this.#lottoResultsHelper.calculateMatchingResults();

      handleErrorMessage(errorMessageElement);
      // eslint-disable-next-line
      const statisticsPopupController = new StatisticsPopupController(
        this.#lottoResultsHelper,
      );
    } catch (error) {
      handleErrorMessage(errorMessageElement, error);
    }
  }

  #addEvent() {
    const btnCheckResultElement = this.#formElement.querySelector('button');

    btnCheckResultElement.addEventListener('click', (event) =>
      this.#handleClickBtn(event),
    );
  }

  #moveScrollToTop() {
    document.querySelector('html').scrollTop = 0;
  }

  #handleClickBtn(event) {
    event.preventDefault();
    this.#moveScrollToTop();
    this.#generateWinningLottoAndBonus();
  }
}

export default WinningLottoAndBonusGenerator;
