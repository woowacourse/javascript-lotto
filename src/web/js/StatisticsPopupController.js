import Statistics from '../../domains/Statistics';
import HtmlTextInjectorWithGameResults from './HtmlTextInjectorWithGameResults';
import {
  changeClassAboutGameStep,
  recoveryInitialStateExceptPayment,
} from './utils';

class StatisticsPopupController {
  $element = {
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
    HtmlTextInjectorWithGameResults.injectStatisticsTable(
      this.#lottoAnalytics.statisticsResult,
    );
    HtmlTextInjectorWithGameResults.injectProfitRate(
      this.#lottoAnalytics.profitRate,
    );

    this.$element.popupElement.classList.remove('hidden');
  }

  #assignElement() {
    this.$element = {
      popupElement: document.querySelector('.popup'),
      btnClosePopupElement: document.querySelector('.btn-close-popup'),
      btnRestartElement: document.querySelector('.btn-restart'),
    };
  }

  #addEvent() {
    this.$element.btnClosePopupElement.addEventListener('click', (event) =>
      this.#hidePopup(event),
    );

    this.$element.btnRestartElement.addEventListener('click', (event) =>
      this.#restartGame(event),
    );
  }

  /**
   *
   * @param {Event} event
   */
  #hidePopup(event) {
    event.stopPropagation();
    changeClassAboutGameStep('winning');
  }

  /**
   *
   * @param {Event} event
   */
  #restartGame(event) {
    event.stopPropagation();

    recoveryInitialStateExceptPayment();
    document.querySelector('.payment-amount__form').reset();
  }
}

export default StatisticsPopupController;
