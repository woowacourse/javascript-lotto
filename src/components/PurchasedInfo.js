import './PurchasedInfo.css';
import './LottoNumbers.js';

const PURCHASED_INFO = `
<div class="purchased-info-title-container">
  <p class="lotto-body">총 _개를 구매했습니다.</p>
</div>
<div class="purchased-info-container">
</div>
`;

class PurchasedInfo extends HTMLElement {
  connectedCallback() {
    this.render();
    this.#setEventListener();
  }

  render(count) {
    this.innerHTML = PURCHASED_INFO;
  }

  #setEventListener() {
    this.addEventListener('purchase-result', (event) => {
      this.#eventHandler(event);
    });
  }

  #eventHandler(event) {
    const purchasedTitle = this.querySelector('.lotto-body');
    purchasedTitle.textContent = `총 ${event.detail.lottoNumbersArray.length}개를 구매했습니다.`;
    this.#renderPurchasedInfoContainer(event.detail.lottoNumbersArray);
  }

  #renderPurchasedInfoContainer(lottoNumbersArray) {
    const purchasedInfoContainer = this.querySelector('.purchased-info-container');
    let innerHTML = ``;
    lottoNumbersArray.forEach((lottoNumbers) => {
      innerHTML += `<lotto-numbers numbers=${lottoNumbers}></lotto-numbers>`;
    });
    purchasedInfoContainer.innerHTML = innerHTML;
  }
}

customElements.define('purchased-info', PurchasedInfo);
