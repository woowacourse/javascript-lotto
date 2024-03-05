import { $ } from '../../util/domSelector';
import styles from './PurchaseResult.module.css';

class PurchaseResult extends HTMLElement {
  #boundHandleShowPurchaseResult;
  #elements;

  constructor() {
    super();
    this.#boundHandleShowPurchaseResult = this.#handleShowPurchaseResult.bind(this);
    this.#elements = { app: $('lotto-game-app') };
  }

  connectedCallback() {
    this.#elements.app.addEventListener('showPurchaseResult', this.#boundHandleShowPurchaseResult);
  }

  disconnectedCallback() {
    this.#elements.app.removeEventListener('showPurchaseResult', this.#boundHandleShowPurchaseResult);
  }

  #handleShowPurchaseResult(event) {
    const { lottoList } = event.detail;
    const lottoListItems = lottoList.map((lotto) => `<li>${lotto.join(', ')}</li>`);
    this.#render(lottoListItems);
  }

  #render(lottoListItems) {
    this.innerHTML = `
      <section class="${styles['purchase-result']}">
        <p>총 ${lottoListItems.length}개를 구매하였습니다.</p>
        <ul>
          ${lottoListItems.join('')}
        </ul>
      </section>
    `;
  }
}

customElements.define('purchase-result', PurchaseResult);
