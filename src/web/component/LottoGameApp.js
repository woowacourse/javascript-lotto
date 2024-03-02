import { $ } from '../../util/domSelector';
import Lotto from '../../domain/Lotto';
import LottoMachine from '../../service/LottoMachine';
import WinningResultService from '../../service/WinningResultService';

class LottoGameApp extends HTMLElement {
  #lottos;

  connectedCallback() {
    this.#render();
    $('purchase-form').addEventListener('purchaseLotto', this.#handlePurchaseLotto.bind(this));
    $('winning-numbers-form').addEventListener('winningCriteria', this.#handleWinningResult.bind(this));
  }

  #handlePurchaseLotto(event) {
    const { purchaseAmount } = event.detail;
    const lottoList = new LottoMachine(purchaseAmount).getLottoNumbersList();
    this.#lottos = lottoList.map((lotto) => new Lotto(lotto));
    this.dispatchEvent(new CustomEvent('purchaseResult', { detail: { lottoList } }));
  }

  #handleWinningResult(event) {
    const { winningNumbers, bonusNumber } = event.detail;
    const winningResultService = new WinningResultService([...this.#lottos], { winningNumbers, bonusNumber });
    const winningResult = winningResultService.getWinningResult();
    const profitRate = winningResultService.getProfitRate();
    this.dispatchEvent(new CustomEvent('winningResult', { detail: { winningResult, profitRate } }));
  }

  #render() {
    this.innerHTML = `
      <lotto-header></lotto-header>
      <main>
        <div id="lotto-game">
          <h1>🎱 내 번호 당첨 확인 🎱</h1>
          <purchase-form></purchase-form>
          <purchase-result></purchase-result>
          <winning-numbers-form></winning-numbers-form>
        </div>
      </main>
      <result-modal></result-modal>
      <lotto-footer></lotto-footer>
    `;
  }
}

customElements.define('lotto-game-app', LottoGameApp);
