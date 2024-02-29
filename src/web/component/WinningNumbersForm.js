import { $ } from '../../util/domSelector';

class WinningNumbersForm extends HTMLElement {
  connectedCallback() {
    $('lotto-game-app').addEventListener('purchaseResult', this.#handleForm.bind(this));
  }

  #handleForm() {
    this.render();
  }

  render() {
    this.innerHTML = `
      <section id="winning-numbers">
        <p>지난 주 당첨번호 6개와 보너스 번호 1개를 입력해주세요.</p>
        <form id="winning-numbers-form">
          <winning-numbers-input></winning-numbers-input>
          <bonus-number-input></bonus-number-input>
        </form>
        <button type="button">결과 확인하기</button>
      </section>
    `;
  }
}

customElements.define('winning-numbers-form', WinningNumbersForm);
