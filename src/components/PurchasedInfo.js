import './PurchasedInfo.css';
import './LottoNumbers.js';

const PURCHASED_INFO = `
<div class="purchased-info-title-container">
</div>
<div class="purchased-info-container">
</div>
`;

const PURCHASED_INFO_TITLE = (count) => `
<p class="lotto-body">총 ${count}개를 구매했습니다.</p>
`;

class PurchasedInfo extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = PURCHASED_INFO;
    const lottoNumbersArray = this.getAttribute('lottos');
    const lottos = this.#numbersToLottos(lottoNumbersArray);

    const purchasedInfoTitle = this.querySelector('.purchased-info-title-container');
    purchasedInfoTitle.innerHTML = PURCHASED_INFO_TITLE(lottos.length);
    this.#renderPurchasedInfoContainer(lottos);
  }

  #numbersToLottos(lottoNumbersArray) {
    const numbers = lottoNumbersArray.split(',');
    const lottos = [];

    for (let i = 0; i < numbers.length; i += 6) {
      lottos.push(numbers.slice(i, i + 6));
    }
    return lottos;
  }

  #renderPurchasedInfoContainer(lottos) {
    const purchasedInfoContainer = this.querySelector('.purchased-info-container');
    let innerHTML = ``;
    lottos.forEach((lottoNumbers) => {
      innerHTML += `<lotto-numbers numbers=${lottoNumbers}></lotto-numbers>`;
    });
    purchasedInfoContainer.innerHTML = innerHTML;
  }
}

customElements.define('purchased-info', PurchasedInfo);
