import './PurchasedInfo.css';
import './LottoNumbers.js';

const PURCHASED_INFO = `
<div class="purchased-info-title-container">
  <p class="lotto-body">총 7개를 구매했습니다.</p>
</div>
<div class="purchased-info-container">
  <lotto-numbers></lotto-numbers>
  <lotto-numbers></lotto-numbers>
  <lotto-numbers></lotto-numbers>
  <lotto-numbers></lotto-numbers>
  <lotto-numbers></lotto-numbers>
  <lotto-numbers></lotto-numbers>
  <lotto-numbers></lotto-numbers>
</div>
`;

class PurchasedInfo extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = PURCHASED_INFO;
  }
}

customElements.define('purchased-info', PurchasedInfo);
