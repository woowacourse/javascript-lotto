import { $ } from '../util/domSelector';
import numericInputFilter from '../util/numericInputFilter';
import { SETTING } from '../../constant/setting';

class WinningNumbersInput extends HTMLElement {
  connectedCallback() {
    this.#render();
    this.#setNumericInputFilter();
  }

  #setNumericInputFilter() {
    $('.input-group', this).addEventListener('input', (event) =>
      numericInputFilter(event.target, SETTING.MAX_LOTTO_NUMBER_LENGTH),
    );
  }

  #createInputGroup() {
    return Array.from({ length: SETTING.LOTTO_LENGTH }).map(
      () =>
        `<input class="winning-numbers-input" type="number" \
        min=${SETTING.MIN_LOTTO_NUMBER} max=${SETTING.MAX_LOTTO_NUMBER} >`,
    );
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
