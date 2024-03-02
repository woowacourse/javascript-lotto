import { $, $$ } from '../../util/domSelector';
import { SETTING } from '../../constant/setting';

class WinningNumbersInput extends HTMLElement {
  #boundMethods;

  constructor() {
    super();
    this.#boundMethods = {
      handleWinningNumbers: this.#handleWinningNumbers.bind(this),
    };
  }

  connectedCallback() {
    this.#render();
    $('winning-numbers-form').addEventListener('submitWinningNumbers', this.#boundMethods.handleWinningNumbers);
  }

  #createInputGroup() {
    return Array.from({ length: SETTING.LOTTO_LENGTH }).map(
      () =>
        `<input class="winning-numbers-input" type="number" \
        min=${SETTING.MIN_LOTTO_NUMBER} max=${SETTING.MAX_LOTTO_NUMBER} maxlength="2" />`,
    );
  }

  #handleWinningNumbers() {
    const winningNumbers = [...$$('.winning-numbers-input')].map((numberInput) => numberInput.value);
    this.dispatchEvent(new CustomEvent('readWinningNumbers', { detail: { winningNumbers } }));
  }

  #render() {
    this.innerHTML = `
      <div>
        <label>당첨 번호</label>
        <div class="input-group">
          ${this.#createInputGroup().join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('winning-numbers-input', WinningNumbersInput);
