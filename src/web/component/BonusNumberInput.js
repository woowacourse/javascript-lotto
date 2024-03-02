import { SETTING } from '../../constant/setting';

class BonusNumberInput extends HTMLElement {
  connectedCallback() {
    this.#render();
  }

  #render() {
    this.innerHTML = `
      <div>
        <label>보너스 번호</label>
        <div class="input-group flow-right">
          <input class="bonus-number-input" type="number" \
          oninput="this.value = this.valueAsNumber" \
          min=${SETTING.MIN_LOTTO_NUMBER} max=${SETTING.MAX_LOTTO_NUMBER} maxlength="2" />
        </div>
      </div>
    `;
  }
}

customElements.define('bonus-number-input', BonusNumberInput);
