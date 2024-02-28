import Statistics from '../../domains/Statistics';
import HtmlTextInjectorWithGameResults from './HtmlTextInjectorWithGameResults';

class StatisticsPopupController {
  #element = {
    popupEl: undefined,
    btnClosePopupEl: undefined,
    btnRestartE: undefined,
  };

  #lottoAnalytics;

  constructor(lottoResultsHelper) {
    this.#assignElement();
    this.#getLottoAnalytics(lottoResultsHelper);
    this.#openPopup();
    this.#addEvent();
  }

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

    this.#element.popupEl.classList.remove('hidden');
  }

  #assignElement() {
    this.#element = {
      popupEl: document.querySelector('.popup'),
      btnClosePopupEl: document.querySelector('.btn-close-popup'),
      btnRestartEl: document.querySelector('.btn-restart'),
    };
  }

  #addEvent() {
    this.#element.btnClosePopupEl.addEventListener('click', (event) =>
      this.#hidePopup(event),
    );

    this.#element.btnRestartEl.addEventListener('click', (event) =>
      this.#restartGame(event),
    );
  }

  #hidePopup(event) {
    event.stopPropagation();
    this.#element.popupEl.classList.add('hidden');
  }

  #hideHiddenTargets() {
    const hiddenTargetElList = document.querySelectorAll('.hiddenTarget');

    hiddenTargetElList.forEach((element) => element.classList.add('hidden'));
  }

  #removePaymentAmountInputValue() {
    const inputEl = document.querySelector('#input-paymentAmount');

    inputEl.value = '';
  }

  #restartGame(event) {
    event.stopPropagation();

    this.#hideHiddenTargets();
    this.#removePaymentAmountInputValue();
  }
}

export default StatisticsPopupController;
