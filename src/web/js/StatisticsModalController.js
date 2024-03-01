import Statistics from '../../domains/Statistics';
import HtmlTextInjectorWithGameResults from './HtmlTextInjectorWithGameResults';
import {
  changeClassAboutGameStep,
  recoveryInitialStateExceptPayment,
} from './utils';

class StatisticsModalController {
  $element = {
    modalElement: undefined,
    btnCloseModalElement: undefined,
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
    this.#openModal();
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

  #openModal() {
    HtmlTextInjectorWithGameResults.injectStatisticsTable(
      this.#lottoAnalytics.statisticsResult,
    );
    HtmlTextInjectorWithGameResults.injectProfitRate(
      this.#lottoAnalytics.profitRate,
    );

    this.$element.modalElement.classList.remove('hidden');
  }

  #assignElement() {
    this.$element = {
      modalElement: document.querySelector('.modal'),
      btnCloseModalElement: document.querySelector('.btn-close-modal'),
      btnRestartElement: document.querySelector('.btn-restart'),
    };
  }

  #addEvent() {
    this.$element.btnCloseModalElement.addEventListener('click', (event) =>
      this.#hideModal(event),
    );

    this.$element.btnRestartElement.addEventListener('click', (event) =>
      this.#restartGame(event),
    );
  }

  /**
   *
   * @param {Event} event
   */
  #hideModal(event) {
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

export default StatisticsModalController;
