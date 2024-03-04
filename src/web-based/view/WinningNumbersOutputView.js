import { LOTTO_SYMBOL } from '../../constant/symbols';

class WinningNumbersOutputView {
  lottoNumbersInputSectionView = document.querySelector('.section-submit-lotto-numbers');
  inputWinningNumbersWrapperView = document.querySelector('.wrapper-input-winning-numbers');
  bonusNumberInputView = document.querySelector('.input-bonus-number');
  lottoNumberErrorView = document.querySelector('.text-lotto-numbers-error');

  displayWinningNumbersInput() {
    Array.from({ length: LOTTO_SYMBOL.COUNT }).forEach(() => {
      const winningNumbersInputElement = document.createElement('input');
      winningNumbersInputElement.type = 'text';
      winningNumbersInputElement.className = 'input-winning-number';

      this.inputWinningNumbersWrapperView.appendChild(winningNumbersInputElement);
    });
  }

  displayWinningNumbersInputSection() {
    this.lottoNumbersInputSectionView.classList.remove('invisible');
  }

  getWinningNumbers() {
    const inputWinningNumbers = [];
    Array.from({ length: 6 }).forEach((_, index) => {
      const inputValue = Number(this.inputWinningNumbersWrapperView.children[index].value);
      inputWinningNumbers.push(Number(inputValue));
    });

    return inputWinningNumbers;
  }

  displayLottoNumbersError(message) {
    this.lottoNumberErrorView.textContent = message;
  }

  resetToInitialState() {
    const inputWinningNumbersNodes = document.querySelectorAll('.input-winning-number');

    Array.from(inputWinningNumbersNodes).forEach((node) => {
      node.value = '';
    });

    this.inputWinningNumbersWrapperView.innerHTML = '';
    this.bonusNumberInputView.value = '';
    this.lottoNumberErrorView.textContent = '';
    this.lottoNumbersInputSectionView.classList.add('invisible');
  }
}

export default new WinningNumbersOutputView();
