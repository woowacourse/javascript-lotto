class WinningNumbersOutputView {
  lottoNumbersInputSectionView = document.querySelector('.section-submit-lotto-numbers');
  inputWinningNumbersView = document.querySelector('.wrapper-input-winning-numbers');
  inputWinningNumberView = document.querySelectorAll('.input-winning-number');
  bonusNumberInputView = document.querySelector('.input-bonus-number');
  lottoNumberErrorView = document.querySelector('.text-lotto-numbers-error');

  displayWinningNumbersInput() {
    Array.from({ length: 6 }).forEach(() => {
      const winningNumbersInputElement = document.createElement('input');
      winningNumbersInputElement.type = 'text';
      winningNumbersInputElement.className = 'input-winning-number';

      this.inputWinningNumbersView.appendChild(winningNumbersInputElement);
    });
  }

  displayWinningNumbersInputSection() {
    this.lottoNumbersInputSectionView.classList.remove('invisible');
  }

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

  displayLottoNumbersError(message) {
    this.lottoNumberErrorView.textContent = message;
  }

  resetToInitialState() {
    Array.from(this.inputWinningNumberView).forEach((node) => {
      node.value = '';
    });
    this.inputWinningNumbersView.innerHTML = '';
    this.bonusNumberInputView.value = '';
    this.lottoNumberErrorView.textContent = '';
    this.lottoNumbersInputSectionView.classList.add('invisible');
  }
}

export default new WinningNumbersOutputView();
