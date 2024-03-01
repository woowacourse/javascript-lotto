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

    this.$element.modalElement.addEventListener('click', (event) =>
      this.#handleClickToCloseModal(event),
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

  /**
   * modal__inner의 바깥 영역을 클릭하면 modal창이 닫히는 기능
   * @param {Event} event
   */
  #handleClickToCloseModal(event) {
    const { target } = event;
    if (!target.closest('.modal__inner')) {
      this.#hideModal(event);
    }
  }
}

export default StatisticsModalController;
