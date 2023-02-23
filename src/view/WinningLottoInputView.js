import { LOTTO_DIGITS } from '../constants';
import { resetElement } from '../utils/dom';

class WinningLottoInputView {
  constructor() {
    this.winningLottoSection = document.getElementById('winning-lotto-section');
    this.form = document.getElementById('winning-lotto-form');
  }

  createNumberInputs(length) {
    return Array.from({ length: length })
      .map(() => `<input class="number-input" type="number" min="1" max="45"/>`)
      .join('');
  }

  renderNumberInputElement(type) {
    const wrapperElement = document.createElement('div');
    wrapperElement.className = type;
    this.wrapper.appendChild(wrapperElement);

    wrapperElement.insertAdjacentHTML(
      'afterbegin',
      type === 'bonus-number' ? `<p>보너스 번호</p>` : `<p>당첨 번호</p>`,
    );
    wrapperElement.insertAdjacentHTML(
      'beforeend',
      this.createNumberInputs(type === 'bonus-number' ? 1 : LOTTO_DIGITS),
    );
  }

  render() {
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'number-wrapper';
    this.form.appendChild(this.wrapper);

    this.form.insertAdjacentHTML(
      'afterbegin',
      `<p class="lotto-body">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>`,
    );

    this.renderNumberInputElement('winning-numbers');
    this.renderNumberInputElement('bonus-number');

    this.form.insertAdjacentHTML(
      'beforeend',
      `<button class="primary-button" id="result-button">결과 확인하기</button>`,
    );
  }

  addSubmitHandler(winningLottoInputHandler) {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      const winningNumbersInput = [...document.querySelectorAll('.winning-numbers .number-input')];
      const bonusNumberInput = document.querySelector('.bonus-number .number-input');
      const winningNumbers = winningNumbersInput.map((input) => input.value).map(Number);
      const bonusNumber = Number(bonusNumberInput.value);

      winningLottoInputHandler(winningNumbers, bonusNumber);
    });
  }

  reset() {
    resetElement(this.form);
  }
}

export default WinningLottoInputView;
