import { RULES } from '../constants/index.js';

const INPUT_ELEMENT = '<input type="number" class="winning-number-input" />';

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
  }

  #paint() {
    this.container.insertAdjacentHTML('beforeend', WINNING_NUMBER_FORM);
  }

  #render() {
  }

  #addEvent() {
    const resultBtn = this.container.querySelector('#winning-number-form');
    resultBtn.addEventListener('submit', this.onSubmitHandler.bind(this));
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
    console.log('click');
  }

  reset() {
    this.container.replaceChildren();
  }
}
