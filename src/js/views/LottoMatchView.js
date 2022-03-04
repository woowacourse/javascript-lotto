import { $, $$ } from '../utils/index.js';

const getLottoMatchSecetionTemplate = () => {
  return `
  <p>지난주 당첨번호 6개와 보너스 번호 1개를 입력해 주세요.</p>
  <div class="lotto-match-header">
    <p>당첨 번호</p>
    <p>보너스 번호</p>
  </div>
  <div class="number-container">
    <div class="match-numbers">
      <input class="lotto-app-input match-number-input" type="number" min="1" max="45"/>
      <input class="lotto-app-input match-number-input" type="number" min="1" max="45"/>
      <input class="lotto-app-input match-number-input" type="number" min="1" max="45"/>
      <input class="lotto-app-input match-number-input" type="number" min="1" max="45"/>
      <input class="lotto-app-input match-number-input" type="number" min="1" max="45"/>
      <input class="lotto-app-input match-number-input" type="number" min="1" max="45"/>
    </div>
    <div class="bonus-number">
      <input class="lotto-app-input match-number-input" type="number" />
    </div>
  </div>
  <button id="result-button" class="lotto-app-button">결과 확인하기</button>
  `;
};

class LottoMatchView {
  #lottoMatchSecteion = null;

  #resultButton = null;

  #matchNumberInputs = null;

  constructor() {
    this.#lottoMatchSecteion = $('.lotto-match-section');
  }

  renderLottoMatchSecteion() {
    this.#lottoMatchSecteion.innerHTML = getLottoMatchSecetionTemplate();

    this.#resultButton = $('#result-button');
    this.#matchNumberInputs = $$('.match-number-input');
  }

  setOnClickResultButtonHandler(callback) {
    this.#resultButton?.addEventListener('click', () => {
      if (this.#isNotFounedMatchNumberInputs()) {
        return;
      }

      const [bonusNumber, ...winningNumbers] = this.#getMatchNumbers();

      callback(winningNumbers, bonusNumber);
    });
  }

  reset() {
    this.#lottoMatchSecteion.innerHTML = '';
  }

  #isNotFounedMatchNumberInputs() {
    return this.#matchNumberInputs === null;
  }

  #getMatchNumbers() {
    return Array.from(this.#matchNumberInputs)
      .map((inputElement) => inputElement.valueAsNumber)
      .reverse();
  }
}

export default LottoMatchView;
