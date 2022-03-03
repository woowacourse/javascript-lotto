import { SELECTOR } from '../constants/selector';
import { $, $$ } from '../utils/element-manager';

const template = `
<h2 hidden>결과 확인</h2>
        <form id="winning-number-form">
          <label>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</label>
          <div class="winning-number-container">
            <div class="winning-numbers-wrapper">
              <span>당첨 번호</span>
              <div class="winning-number-inputs-wrapper">
                <input id="winning-number-input" class="winning-number-input" min="1" max="45" type="number" />
                <input id="winning-number-input" class="winning-number-input" min="1" max="45" type="number" />
                <input id="winning-number-input" class="winning-number-input" min="1" max="45" type="number" />
                <input id="winning-number-input" class="winning-number-input" min="1" max="45" type="number" />
                <input id="winning-number-input" class="winning-number-input" min="1" max="45" type="number" />
                <input id="winning-number-input" class="winning-number-input" min="1" max="45" type="number" />
              </div>
            </div>
            <div class="bonus-number-wrapper">
              <span>보너스 번호</span>
              <div class="bonus-number-input-wrapper">
                <input class="bonus-number-input" min="1" max="45" type="number" />
              </div>
            </div>
          </div>
          <button class="btn" id="show-result-button">결과 확인하기</button>
        </form>

`;

export default class WinningNumberView {
  #$container;

  constructor(element) {
    this.#$container = element;
  }

  renderWinningNumbersInput() {
    if (this.#$container.innerHTML.trim().length) {
      return;
    }
    this.#$container.innerHTML = template;
  }

  bindWinningNumberInputSubmit(handler) {
    this.#$container.addEventListener('click', (event) => {
      event.preventDefault();
      if (event.target.id === SELECTOR.ID.SHOW_RESULT_BUTTON) {
        const winningNumbers = Array.from(
          $$(this.#$container, `.${SELECTOR.CLASS.WINNING_NUMBER_INPUT}`)
        ).map((element) => Number(element.value));
        const bonusNumber = Number($(this.#$container, '.bonus-number-input').value);
        handler({ winningNumbers, bonusNumber });
      }
    });
  }

  reset() {
    this.#$container.replaceChildren();
  }
}
