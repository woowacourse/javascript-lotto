import { $, $$ } from '../utils/dom';
import validator from '../domain/validation/validator';
import WINNING_NUMBERS_FORM from './components/WinningNumbersForm';

export default class WinningNumbersView {
  #winningNumbers = [];

  #bonusNumber;

  render() {
    $('#winning-lotto').innerHTML = WINNING_NUMBERS_FORM;
    this.form = $('#winning-lotto-form');
  }

  setWinningNumbersInput() {
    $$('.winning-number').forEach((dom) => {
      this.#winningNumbers.push(Number(dom.value));
    });
    this.#bonusNumber = Number($('#bonus').value);
  }

  addSubmitEvent(submitHandler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.setWinningNumbersInput();
      try {
        validator.winningNumbers(this.#winningNumbers);
        validator.bonusNumber(this.#winningNumbers, this.#bonusNumber);
        submitHandler(this.#winningNumbers, this.#bonusNumber);
      } catch (error) {
        console.log(error);
        alert(error);
      }
    });
  }

  removeWinningNumbersForm() {
    this.#winningNumbers = [];
    this.#bonusNumber = null;
    $('#winning-lotto').innerHTML = '';
  }
}
