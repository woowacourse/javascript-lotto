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

const MODAL_TEMPLATE = `
  <div id="modal">
    <div id="dim"></div>

    <div id="modal-container">
      <button id="exit-button">X</button>
      <div id="modal-content">
        <h2>🏆 당첨 통계 🏆</h2>


        <table>
          <thead>
              <tr>
                <th>일치 갯수</th>
                <th>당첨금</th>
                <th>당첨 갯수</th>
              </tr>
          </thead>
          <tbody>
            <tr>
              <td>3개</td>
              <td>5,000</td>
              <td>n개</td>
            </tr>

            <tr>
              <td>4개</td>
              <td>50,000</td>
              <td>n개</td>
            </tr>

            <tr>
              <td>5개</td>
              <td>1,5000,000</td>
              <td>n개</td>
            </tr>

            <tr>
              <td>5개+보너스볼</td>
              <td>30,000,000</td>
              <td>n개</td>
            </tr>

            <tr>
              <td>6개</td>
              <td>2,000,000,000</td>
              <td>n개</td>
            </tr>
          </tbody>
        </table>

        <p id="earning-text">당신의 총 수익률은 <span id="earning-rate">100</span>%입니다</p>
        <div id="modal-footer">
          <button id="restart-lotto-button">다시 시작하기</button>
        </div>
      </div> 

    </div>

  </div>
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

  #addEvent(props) {
    const { purchasedLottos } = props;
    const resultBtn = this.container.querySelector('#winning-number-form');
    const winningNumbers = this.container.querySelectorAll('.winning-number-input');

    const resultEvent = new CustomEvent('submitResult', { detail: { purchasedLottos }, cancelable: true });

    resultBtn.addEventListener('submitResult', this.onSubmitHandler.bind(this));
    resultBtn.addEventListener('submit', (e) => {
      e.preventDefault();
      resultBtn.dispatchEvent(resultEvent);
    });

    winningNumbers.forEach((ele, index) => {
      const event = new CustomEvent('keyupEvent', { detail: { index }, cancelable: true });

      ele.addEventListener('keypress', this.onKeypressHandler);
      ele.addEventListener('keyupEvent', this.onKeyupHandler.bind(this));
      ele.addEventListener('keyup', () => ele.dispatchEvent(event));
    });
  }

  onKeypressHandler(e) {
    const { keyCode, target: { value } } = e;

    if (keyCode >= 48 && keyCode <= 57) {
      e.target.value = value.substring(0, 1);
    }
  }

  onKeyupHandler(e) {
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
    this.#addEvent({ purchasedLottos });
  }

  reflow(purchasedLottos) {
    console.log('reflow purchasedLottos', purchasedLottos);
    this.#render();
    // this.#rePaint();
  }

  onSubmitHandler(e) {
    e.preventDefault();
    const { detail: { purchasedLottos } } = e;

    if (new Set(this.winLottosNumbers).size !== 7) {
      window.alert('중복된 번호는 입력할 수 없습니다.');
      return;
    }
    console.log('this.winLottosNumbers', this.winLottosNumbers, purchasedLottos);
    const winNumbers = this.winLottosNumbers.slice(0, 6);
    const bonusNumber = this.winLottosNumbers.slice(6);
    console.log(winNumbers, bonusNumber);

    this.bindModalEvent();
  }

  bindModalEvent() {
    this.container.insertAdjacentHTML('beforeend', MODAL_TEMPLATE);

    const exitBtn = this.container.querySelector('#exit-button');
    const restartBtn = this.container.querySelector('#restart-lotto-button');

    exitBtn.addEventListener('click', this.onExit.bind(this));
    restartBtn.addEventListener('click', this.onRestart.bind(this));
  }

  onExit(e) {
    e.preventDefault();
    const modal = this.container.querySelector('#modal');
    modal.remove();
    console.log('exit click');
  }

  onRestart(e) {
    e.preventDefault();
    console.log('restart click');
  }

  reset() {
    this.container.replaceChildren();
  }
}
