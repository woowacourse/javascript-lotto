import './LottoMain.css';
import './PurchasePriceForm.js';
import './PurchaseInfo.js';
import './WinningAndBonusForm.js';
import './LottoButton.js';

const LOTTO_MAIN = `
  <div class="lotto-main-container">
    <div class="lotto-main-title-container">
      <h1 class="lotto-title">
        🎱 내 번호 당첨 확인 🎱
      </h1>
    </div>
    <purchase-price-form></purchase-price-form>
    <div class="purchase-result"></div>
  </div>
`;

const LOTTO_MAIN_RESULT = (lottoNumbersArray) => `
<purchase-info lottos=${lottoNumbersArray}></purchase-info>
<winning-and-bonus-form></winning-and-bonus-form>
`;

class LottoMain extends HTMLElement {
  connectedCallback() {
    this.render();
    this.#setPurchaseEventListener();
  }

  render() {
    this.innerHTML = LOTTO_MAIN;
  }

  #setPurchaseEventListener() {
    const purchasePriceForm = document.querySelector('purchase-price-form');
    purchasePriceForm.addEventListener('purchase', () => {
      this.#renderResult();
    });
  }

  #renderResult() {
    const app = document.querySelector('lotto-app');
    const lottoNumbersArray = app.controller().getLottoGameInfo().lottoNumbersArray;

    const purchaseResult = document.querySelector('.purchase-result');
    purchaseResult.innerHTML = LOTTO_MAIN_RESULT(lottoNumbersArray);
    const resultButton = document.querySelector('#result-button');
    resultButton.setText('당첨 결과 확인하기');
    this.#setLottoResultEventListener();
  }

  #setLottoResultEventListener() {
    const winningAndBonusForm = document.querySelector('winning-and-bonus-form');
    winningAndBonusForm.addEventListener('lottoResult', () => {
      // this.#renderResult();
      const app = document.querySelector('lotto-app');
      console.log(app.controller().getLottoGameInfo());
    });
  }
}

customElements.define('lotto-main', LottoMain);
