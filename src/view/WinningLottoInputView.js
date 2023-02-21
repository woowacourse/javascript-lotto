import { LOTTO_DIGITS } from '../constants';

class WinningLottoInputView {
  constructor() {
    this.form = document.getElementById('winning-lotto-form');
    this.wrapper = document.createElement('div');
    this.wrapper.className = 'number-wrapper';
    this.form.appendChild(this.wrapper);
  }

  createNumberInputs(length) {
    return Array.from({ length: length })
      .map(() => `<input class="number-input" type="number" />`)
      .join('');
  }

  render() {
    this.form.insertAdjacentHTML(
      'afterbegin',
      `<p class="lotto-body">지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>`,
    );

    this.renderWinningNumbersInput();
    this.renderBonusNumberInput();

    this.form.insertAdjacentHTML('beforeend', `<button id="result-button">결과 확인하기</button>`);
  }

  renderWinningNumbersInput() {
    const winningNumbersWrapper = document.createElement('div');
    winningNumbersWrapper.className = 'winning-numbers';
    this.wrapper.appendChild(winningNumbersWrapper);

    winningNumbersWrapper.insertAdjacentHTML('afterbegin', `<p>당첨 번호</p>`);
    winningNumbersWrapper.insertAdjacentHTML('beforeend', this.createNumberInputs(LOTTO_DIGITS));
  }

  renderBonusNumberInput() {
    const bonusNumberWrapper = document.createElement('div');
    bonusNumberWrapper.className = 'bonus-number';
    this.wrapper.appendChild(bonusNumberWrapper);

    bonusNumberWrapper.insertAdjacentHTML('afterbegin', `<p>보너스 번호</p>`);
    bonusNumberWrapper.insertAdjacentHTML('beforeend', this.createNumberInputs(1));
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
}

export default WinningLottoInputView;
