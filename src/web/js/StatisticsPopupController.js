import Statistics from '../../domains/Statistics';
import HtmlTextInjectorWithGameResults from './HtmlTextInjectorWithGameResults';

class StatisticsPopupController {
  #element = {
    popupElement: undefined,
    btnClosePopupElement: undefined,
    btnRestartElement: undefined,
  };

  #lottoAnalytics;

  /**
   *
   * @param {LottoResultHelper} lottoResultsHelper
   */
  constructor(lottoResultsHelper) {
    this.#assignElement();
    this.#getLottoAnalytics(lottoResultsHelper);
    this.#openPopup();
    this.#addEvent();
  }

  /**
   *
   * @param {LottoResultHelper} lottoResultsHelper
   */
  #getLottoAnalytics(lottoResultsHelper) {
    const statistics = new Statistics(
      lottoResultsHelper.results,
      lottoResultsHelper.paymentAmount,
    );

    this.#lottoAnalytics = statistics.lottoAnalytics;
  }

  #openPopup() {
    HtmlTextInjectorWithGameResults.injectLottoStatistics(
      this.#lottoAnalytics.statisticsResult,
    );
    HtmlTextInjectorWithGameResults.injectProfitRate(
      this.#lottoAnalytics.profitRate,
    );

    this.#element.popupElement.classList.remove('hidden');
  }

  #assignElement() {
    this.#element = {
      popupElement: document.querySelector('.popup'),
      btnClosePopupElement: document.querySelector('.btn-close-popup'),
      btnRestartElement: document.querySelector('.btn-restart'),
    };
  }

  #addEvent() {
    this.#element.btnClosePopupElement.addEventListener('click', (event) =>
      this.#hidePopup(event),
    );

    this.#element.btnRestartElement.addEventListener('click', (event) =>
      this.#restartGame(event),
    );
  }

  /**
   *
   * @param {Event} event
   */
  #hidePopup(event) {
    event.stopPropagation();
    this.#element.popupElement.classList.add('hidden');
  }

  #hideHiddenTargets() {
    const hiddenTargetElementList = document.querySelectorAll('.hidden-target');

    hiddenTargetElementList.forEach((element) =>
      element.classList.add('hidden'),
    );
  }

  #removePaymentAmountInputValue() {
    const inputElement = document.querySelector('#input-payment-amount');

    inputElement.value = '';
  }

  #removeWinningCriteriaInputValue() {
    const inputElementList = document.querySelectorAll(
      '.winning-criteria input',
    );

    inputElementList.forEach((element) => {
      // eslint-disable-next-line
      element.value = '';
    });
  }

  /**
   *
   * @param {Event} event
   */
  #restartGame(event) {
    event.stopPropagation();

    this.#removeWinningCriteriaInputValue();
    this.#removePaymentAmountInputValue();
    this.#hideHiddenTargets();
  }
}

export default StatisticsPopupController;
