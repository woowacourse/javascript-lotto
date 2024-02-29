import { $ } from '../../util/domSelector';
import { SETTING } from '../../constant/setting';

class WinningNumbersForm extends HTMLElement {
  connectedCallback() {
    $('lotto-game-app').addEventListener('purchaseResult', this.#handleForm.bind(this));
  }

  #handleForm() {
    this.render();
  }

  render() {
    const winningNumbersInputs = Array.from({ length: SETTING.LOTTO_LENGTH }).map(
      () =>
        `<input class="winning-numbers-input" type="number" \
        min=${SETTING.MIN_LOTTO_NUMBER} max=${SETTING.MAX_LOTTO_NUMBER} />`,
    );

    this.innerHTML = `
      <section id="winning-numbers">
        <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
        <form id="winning-numbers-form">
          <div>
            <label>당첨 번호</label>
            <div class="input-group">
            ${winningNumbersInputs.join('')}
            </div>
          </div>
          <div>
            <label>보너스 번호</label>
            <div class="input-group flow-right">
              <input class="bonus-number-input" type="number" \
              min=${SETTING.MIN_LOTTO_NUMBER} max=${SETTING.MAX_LOTTO_NUMBER}>
            </div>
          </div>
        </form>
        <button type="button">결과 확인하기</button>
      </section>
    `;
  }
}

customElements.define('winning-numbers-form', WinningNumbersForm);
