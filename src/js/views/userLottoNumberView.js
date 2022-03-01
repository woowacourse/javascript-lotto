import { qs, qsAll, on, emit } from '../utils/helper.js';

export default class UserLottoNumberView {
  constructor() {
    this.userLottoResultForm = qs('#user-lotto-form');
    this.userLottoNumberInput = qsAll('.user-lotto-number');
    this.userBonusNumberInput = qs('.user-bonus-number');

    this.lottoResultModal = qs('#user-lotto-result-modal');
    this.lottoModalCloseButton = qs('#user-lotto-modal-close');
    this.winLottoResultElement = qsAll('.win-lotto-result');
    this.winRateElement = qs('#user-lotto-winrate');
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
      lottoNumber: this.userLottoNumberInput.map((numberInput) => Number(numberInput.value)),
      bonusNumber: [Number(this.userBonusNumberInput.value)]
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
    emit(this.lottoRestartButton, '@lottoRestart', '');
  }

  cleanLottoResultModal() {
    this.winLottoResultElement.forEach((lottoResultElement) => lottoResultElement.textContent = '');
    this.userLottoNumberInput.forEach((lottoInput) => lottoInput.value = '');
    this.userBonusNumberInput.value = '';
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