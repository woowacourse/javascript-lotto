import { $ } from '../../util/domSelector';

class PurchaseResult extends HTMLElement {
  connectedCallback() {
    $('lotto-game-app').addEventListener('purchaseResult', this.handlePurchaseResult.bind(this));
  }

  render(lottoListItems) {
    this.innerHTML = `
      <section id="purchase-result">
        <p>총 ${lottoListItems.length}개를 구매하였습니다.</p>
        <ul>
          ${lottoListItems.join('')}
        </ul>
      </section>
    `;
  }

  handlePurchaseResult(event) {
    const { lottoList } = event.detail;
    const lottoListItems = lottoList.map((lotto) => `<li>${lotto.join(', ')}</li>`);
    this.render(lottoListItems);
  }
}

customElements.define('purchase-result', PurchaseResult);
