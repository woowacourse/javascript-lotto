import { qs, qsAll, on, newCustomEvent } from "../utils/helper.js";
import { lottoReturnRateTemplate } from "../utils/template.js";

export default class UserLottoModalView {
  constructor() {
    this.lottoResultModal = qs('#user-lotto-result-modal');
    this.lottoModalCloseButton = qs('#user-lotto-modal-close');
    this.winLottoResultElement = qsAll('.win-lotto-result');
    this.winRateElement = qs('#user-lotto-winrate');
    this.lottoRestartButton = qs('#user-lotto-restart');

    this.bindEvents();
  }

  bindEvents() {
    on(this.lottoModalCloseButton, 'click', this.handleCloaseLottoModal.bind(this));
    on(this.lottoRestartButton, 'click', this.handleLottoRestart.bind(this));
  }

  handleCloaseLottoModal() {
    newCustomEvent(this.lottoModalCloseButton, '@closeLottoModal', '');
  }

  handleLottoRestart() {
    newCustomEvent(this.lottoRestartButton, '@lottoRestart', '');
  }

  showLottoResultModal() {
    this.lottoResultModal.style.zIndex = 3;
  }

  showLottoResult(lottoWinResult, returnRate) {
    this.winLottoResultElement.forEach((lottoResultElement, lottoWinResultIndex) => {
      lottoResultElement.textContent = `${lottoWinResult[lottoWinResultIndex]}개`;
    });
    this.winRateElement.textContent = lottoReturnRateTemplate(returnRate);
  }

  hideLottoResultModal() {
    this.lottoResultModal.style.zIndex = 1;
  }

  cleanLottoResultModal() {
    this.winLottoResultElement.forEach((lottoResultElement) => lottoResultElement.textContent = '');
    this.winRateElement.textContent = '';
  }
}