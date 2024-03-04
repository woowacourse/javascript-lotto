import { $ } from '../util/domSelector';
import numericInputFilter from '../util/numericInputFilter';
import { SETTING } from '../../constant/setting';

class BonusNumberInput extends HTMLElement {
  connectedCallback() {
    this.#render();
    this.#setNumericInputFilter();
  }

  #setNumericInputFilter() {
    $('.input-group', this).addEventListener('input', (event) =>
      numericInputFilter(event.target, SETTING.MAX_LOTTO_NUMBER_LENGTH),
    );
  }

  #render() {
    this.innerHTML = `
      <div>
        <label>보너스 번호</label>
        <div class="input-group flow-right">
          <input class="bonus-number-input" type="number" \
          min=${SETTING.MIN_LOTTO_NUMBER} max=${SETTING.MAX_LOTTO_NUMBER} />
        </div>
      </div>
    `;
  }
}

customElements.define('bonus-number-input', BonusNumberInput);
