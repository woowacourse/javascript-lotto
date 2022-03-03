import { RULES } from '../constants/index.js';

const INPUT_ELEMENT = '<input type="number" class="winning-number-input" min="1" max="45" step="1" maxlength="2" required/>';

const WINNING_NUMBER_FORM = `
  <form id="winning-number-form">
    <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
    <div id="winning-number-boxes">
      <div id="win-number-box">
        <p>당첨 번호</p>
        <div class="input-box">
        ${INPUT_ELEMENT.repeat(RULES.LOTTO_NUMS)}
        </div>
      </div>
      <div id="bonus-number-box">
        <p>보너스 번호</p>
        <div class="input-box">
          ${INPUT_ELEMENT}
        </div>
      </div>
    </div>
    <button id="result-button" type="submit">결과 확인하기</button>
  </form>
`;

export default class WinningNumberView {
  constructor() {
    this.container = document.getElementById('winning-number-container');
    this.winLottosNumbers = [];
  }

  #paint() {
    this.container.insertAdjacentHTML('beforeend', WINNING_NUMBER_FORM);
  }

  #render() {
  }

  #addEvent() {
    const resultBtn = this.container.querySelector('#winning-number-form');
    const winningNumbers = this.container.querySelectorAll('.winning-number-input');

    resultBtn.addEventListener('submit', this.onSubmitHandler.bind(this));
    winningNumbers.forEach((ele, index) => {
      const event = new CustomEvent('keyupEvent', { detail: { index }, cancelable: true });

      ele.addEventListener('keypress', this.keypressEvnet);
      ele.addEventListener('keyupEvent', this.keyupEvnet.bind(this));
      ele.addEventListener('keyup', () => ele.dispatchEvent(event));
    });
  }

  keypressEvnet(e) {
    const { keyCode, target: { value } } = e;

    if (keyCode >= 48 && keyCode <= 57) {
      e.target.value = value.substring(0, 1);
    }
  }

  keyupEvnet(e) {
    const { target: { value }, detail: { index } } = e;

    if (value === '') return;

    const number = parseInt(value, 10);

    if (number < 1 || number > 45) {
      e.target.value = '';
      window.alert('1이상 45이하의 숫자를 입력해 주세요.');
      return;
    }

    this.winLottosNumbers[index] = number;

    if (value.length === 2 && e.target.nextElementSibling) {
      e.target.nextElementSibling.focus();
    }
  }

  rendering(purchasedLottos) {
    console.log('rendering purchasedLottos', purchasedLottos);
    this.#paint();
    this.#render();
    this.#addEvent();
  }

  reflow(purchasedLottos) {
    console.log('reflow purchasedLottos', purchasedLottos);
    this.#render();
    // this.#rePaint();
  }

  onSubmitHandler(e) {
    e.preventDefault();

    if (new Set(this.winLottosNumbers).size !== 7) {
      window.alert('중복된 번호는 입력할 수 없습니다.');
    }
  }

  reset() {
    this.container.replaceChildren();
  }
}
