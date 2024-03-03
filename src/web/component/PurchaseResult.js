import { $ } from '../util/domSelector';

class PurchaseResult extends HTMLElement {
  #boundMethods;
  #elements;

  constructor() {
    super();
    this.#boundMethods = {
      handleShowPurchaseResult: this.#handleShowPurchaseResult.bind(this),
    };
    this.#elements = { app: $('lotto-game-app') };
  }

  connectedCallback() {
    this.#elements.app.addEventListener('showPurchaseResult', this.#boundMethods.handleShowPurchaseResult);
  }

  disconnectedCallback() {
    this.#elements.app.removeEventListener('showPurchaseResult', this.#boundMethods.handleShowPurchaseResult);
  }

  #handleShowPurchaseResult(event) {
    const { lottoList } = event.detail;
    const lottoListItems = lottoList.map((lotto) => `<li>${lotto.join(', ')}</li>`);
    this.#render(lottoListItems);
  }

  #render(lottoListItems) {
    this.innerHTML = `
      <section id="purchase-result">
        <p>총 ${lottoListItems.length}개를 구매하였습니다.</p>
        <ul>
          ${lottoListItems.join('')}
        </ul>
      </section>
    `;
  }
}

customElements.define('purchase-result', PurchaseResult);
