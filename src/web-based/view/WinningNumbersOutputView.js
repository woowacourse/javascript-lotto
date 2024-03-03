class WinningNumbersOutputView {
  inputWinningNumbersView = document.querySelector('.wrapper-input-winning-numbers');
  inputWinningNumberView = document.querySelectorAll('.input-winning-number');
  bonusNumberInputView = document.querySelector('.input-bonus-number');
  lottoNumberErrorView = document.querySelector('.text-lotto-numbers-error');

  getWinningNumbers() {
    const inputWinningNumbers = [];

    Array.from({ length: 6 }).forEach((_, index) => {
      const inputValue = Number(this.inputWinningNumbersView.children[index].value);
      inputWinningNumbers.push(Number(inputValue));
    });

    return inputWinningNumbers;
  }

  resetWinningNumbersAndBonusNumber() {
    Array.from(this.inputWinningNumberView).forEach((node) => {
      node.value = null;
    });

    this.bonusNumberInputView.value = null;
  }

  displayLottoNumberError(message) {
    this.lottoNumberErrorView.textContent = message;
  }

  resetToInitialState() {
    Array.from(this.inputWinningNumberView).forEach((node) => {
      node.value = '';
    });

    this.bonusNumberInputView.value = '';
    this.lottoNumberErrorView.textContent = '';
  }
}

export default new WinningNumbersOutputView();
