import { qs, qsAll, on, emit } from "../utils/helper.js";

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
    emit(this.lottoModalCloseButton, '@closeLottoModal', '');
  }

  handleLottoRestart() {
    emit(this.lottoRestartButton, '@lottoRestart', '');
  }

  showLottoResultModal() {
    this.lottoResultModal.style.zIndex = 3;
  }

  showLottoResult(lottoResult, returnRate) {
    this.winLottoResultElement.forEach((lottoResultElement, index) => {
      lottoResultElement.textContent = `${lottoResult[index]}개`;
    });
    this.winRateElement.textContent = `당신의 총 수익률은 ${returnRate}%입니다.`
  }

  hideLottoResultModal() {
    this.lottoResultModal.style.zIndex = 1;
  }

  cleanLottoResultModal() {
    this.winLottoResultElement.forEach((lottoResultElement) => lottoResultElement.textContent = '');
    this.winRateElement.textContent = '';
  }
}