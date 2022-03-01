import { qs, qsAll, on, emit } from '../utils/helper.js';

export default class UserLottoNumberView {
  constructor() {
    this.userLottoResultForm = qs('#user-lotto-form');
    this.userLottoNumber = qsAll('.user-lotto-number');
    this.userBonusNumber = qs('.user-bonus-number');

    this.lottoResultModal = qs('#user-lotto-result-modal');
    this.lottoModalCloseButton = qs('#user-lotto-modal-close');
    this.lottoRestartButton = qs('#user-lotto-restart');

    this.bindEvents();
  }

  bindEvents() {
    on(this.userLottoResultForm, 'submit', this.handleUserLottoResult.bind(this));
    on(this.lottoModalCloseButton, 'click', this.handleCloaseLottoModal.bind(this));
    on(this.lottoRestartButton, 'click', this.handleLottoRestart.bind(this));
  }

  handleUserLottoResult(event) {
    event.preventDefault();
    const lottoNumbers = {
      lottoNumber: this.userLottoNumber.map((numberInput) => Number(numberInput.value)),
      bonusNumber: [Number(this.userBonusNumber.value)]
    };
    emit(this.userLottoResultForm, '@userLottoNumbers', lottoNumbers);
  }

  hideLottoResultModal() {
    this.lottoResultModal.style.zIndex = 1;
  }

  handleCloaseLottoModal() {
    emit(this.lottoModalCloseButton, '@closeLottoModal', '');
  }

  handleLottoRestart() {
  
  }

  cleanLottoResultModal() {
    this.winLottoResultElement = qsAll('.win-lotto-result');
    this.winRateElement = qs('#user-lotto-winrate');
    this.winLottoResultElement.forEach((lottoResultElement) => {
      lottoResultElement.textContent = '';
    });
    this.winRateElement.textContent = '';
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

}