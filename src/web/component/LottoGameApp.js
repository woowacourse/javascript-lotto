import { $ } from '../../util/domSelector';
import Lotto from '../../domain/Lotto';
import LottoMachine from '../../service/LottoMachine';

class LottoGameApp extends HTMLElement {
  #lottos;

  connectedCallback() {
    this.#render();
    $('purchase-form').addEventListener('purchaseLotto', this.#handleCustomEvent.bind(this));
  }

  #handleCustomEvent(event) {
    const { purchaseAmount } = event.detail;
    const lottoList = new LottoMachine(purchaseAmount).getLottoNumbersList();
    this.#lottos = lottoList.map((lotto) => new Lotto(lotto));
    this.dispatchEvent(new CustomEvent('purchaseResult', { detail: { lottoList } }));
  }

  #render() {
    this.innerHTML = `
      <lotto-header></lotto-header>
      <main>
        <div id="lotto-game">
          <h1>🎱 내 번호 당첨 확인 🎱</h1>
          <purchase-form></purchase-form>
          <purchase-result></purchase-result>
        </div>
      </main>
      <lotto-footer></lotto-footer>
    `;
  }
}

customElements.define('lotto-game-app', LottoGameApp);
