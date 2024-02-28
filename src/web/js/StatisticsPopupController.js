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
      this.#hideHiddenTargets(event).bind(this),
    );

    this.#element.btnRestartEl.addEventListener('click', (event) =>
      this.#restartGame(event).bind(this),
    );
  }

  #hideHiddenTargets(event) {
    event.stopPropagation();

    const hiddenTargetElList = document.querySelectorAll('.hiddenTarget');

    hiddenTargetElList.forEach((element) => element.classList.add('hidden'));
  }

  #restartGame(event) {
    event.stopPropagation();

    this.#hideHiddenTargets();
    // TODO 게임 재시작
  }
}

export default StatisticsPopupController;
