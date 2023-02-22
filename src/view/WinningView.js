import LottoView from './LottoView.js';
import { $$winningNumbers } from '../utils/Dom.js';

class WinningView extends LottoView {
  constructor($element) {
    super($element);
    this.bindInputWinningNumberEvent();
    this.winningNumbers = [];
  }

  bindInputWinningNumberEvent() {
    this.$element.addEventListener('submit', (e) => this.inputWinningNumberHandler(e));
  }

  createWinningNumbers() {
    $$winningNumbers.forEach((winningNumber, index) => {
      this.winningNumbers[index] = Number(winningNumber.value);
    });
    return this.winningNumbers;
  }

  inputWinningNumberHandler(e) {
    e.preventDefault();
    this.createCustomEvent('inputWinningNumber', this.createWinningNumbers());
  }
}

export default WinningView;
