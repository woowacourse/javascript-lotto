import validator from '../domain/validation/validator';
import WINNING_NUMBERS_FORM from './components/WinningNumbersForm';

export default class WinningNumbersView {
  render() {
    const winningLottoSection = document.getElementById('winning-lotto');
    winningLottoSection.innerHTML = WINNING_NUMBERS_FORM;
    this.form = document.getElementById('winning-lotto-form');
  }

  setWinningNumbersInput() {
    this.number1 = document.getElementById('lotto1');
    this.number2 = document.getElementById('lotto2');
    this.number3 = document.getElementById('lotto3');
    this.number4 = document.getElementById('lotto4');
    this.number5 = document.getElementById('lotto5');
    this.number6 = document.getElementById('lotto6');
    this.winnningNumbers = [
      this.number1.value,
      this.number2.value,
      this.number3.value,
      this.number4.value,
      this.number5.value,
      this.number6.value,
    ];
    this.bonusNumber = document.getElementById('bonus');
  }

  addSubmitEvent(submitHandler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.setWinningNumbersInput();
      const winningNumbers = this.winnningNumbers.map(Number);
      const bonusNumber = Number(this.bonusNumber.value);
      try {
        validator.winningNumbers(winningNumbers);
        validator.bonusNumber(winningNumbers, bonusNumber);
        submitHandler(winningNumbers, bonusNumber);
        this.resetInputValue();
      } catch (error) {
        this.resetInputValue();
        alert(error);
      }
    });
  }

  resetInputValue() {
    this.number1.value = '';
    this.number2.value = '';
    this.number3.value = '';
    this.number4.value = '';
    this.number5.value = '';
    this.number6.value = '';
    this.bonusNumber.value = '';
  }

  removeWinningNumbersForm() {
    const WinningNumbersSection = document.getElementById('winning-lotto');
    WinningNumbersSection.innerHTML = '';
  }
}
