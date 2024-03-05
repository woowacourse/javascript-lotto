import { $ } from '../../util/domSelector';
import numericInputFilter from '../../util/numericInputFilter';
import { SETTING } from '../../../constant/setting';
import styles from './WinningNumbersInput.module.css';

class WinningNumbersInput extends HTMLElement {
  connectedCallback() {
    this.#render();
    this.#setNumericInputFilter();
  }

  #setNumericInputFilter() {
    const inputGroupClass = `.${styles['input-group']}`;
    $(inputGroupClass, this).addEventListener('input', (event) =>
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
        <label class="${styles.label}">당첨 번호</label>
        <div class="${styles['input-group']}">
          ${this.#createInputGroup().join('')}
        </div>
      </div>
    `;
  }
}

customElements.define('winning-numbers-input', WinningNumbersInput);
