import { $ } from '../util/domSelector';
import Lotto from '../../domain/Lotto';
import LottoMachine from '../../service/LottoMachine';
import WinningResultService from '../../service/WinningResultService';

class LottoGameApp extends HTMLElement {
  #lottos;
  #boundMethods;

  constructor() {
    super();
    this.#boundMethods = {
      handlePurchaseLotto: this.#handlePurchaseLotto.bind(this),
      handleCreateWinningResult: this.#handleCreateWinningResult.bind(this),
      handleRestartGame: this.#handleRestartGame.bind(this),
    };
  }

  connectedCallback() {
    this.#initiateGame();
  }

  #handlePurchaseLotto(event) {
    const { purchaseAmount } = event.detail;
    const lottoList = new LottoMachine(purchaseAmount).getLottoNumbersList();
    this.#lottos = lottoList.map((lotto) => new Lotto(lotto));
    this.dispatchEvent(new CustomEvent('showPurchaseResult', { detail: { lottoList } }));
  }

  #handleCreateWinningResult(event) {
    const { winningNumbers, bonusNumber } = event.detail;
    const winningResultService = new WinningResultService([...this.#lottos], { winningNumbers, bonusNumber });
    const winningResult = winningResultService.getWinningResult();
    const profitRate = winningResultService.getProfitRate();
    this.dispatchEvent(new CustomEvent('showResultModal', { detail: { winningResult, profitRate } }));
  }

  #initiateGame() {
    this.#render();
    $('purchase-form').addEventListener('purchaseLotto', this.#boundMethods.handlePurchaseLotto);
    $('winning-numbers-form').addEventListener('createWinningResult', this.#boundMethods.handleCreateWinningResult);
    $('result-modal').addEventListener('restartGame', this.#boundMethods.handleRestartGame);
  }

  #handleRestartGame() {
    this.#initiateGame();
  }

  #render() {
    this.innerHTML = `
      <main id="lotto-game">
        <h1>🎱 내 번호 당첨 확인 🎱</h1>
        <purchase-form></purchase-form>
        <purchase-result></purchase-result>
        <winning-numbers-form></winning-numbers-form>
        <result-modal></result-modal>
      </main>
    `;
  }
}

customElements.define('lotto-game-app', LottoGameApp);
