class BonusNumberOutputView {
  inputBonusNumberView = document.querySelector('.input-bonus-number');
  lottoNumberErrorView = document.querySelector('.text-lotto-numbers-error');

  getBonusNumber() {
    return Number(this.inputBonusNumberView.value);
  }

  displayLottoNumberError(message) {
    this.lottoNumberErrorView.textContent = message;
  }

  resetToInitialState() {
    this.inputBonusNumberView.value = '';
    this.lottoNumberErrorView.textContent = '';
  }
}

export default new BonusNumberOutputView();
