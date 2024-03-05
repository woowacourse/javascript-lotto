import { $ } from '../../util/domSelector';
import Lotto from '../../../domain/Lotto';
import LottoMachine from '../../../service/LottoMachine';
import WinningResultService from '../../../service/WinningResultService';
import styles from './LottoGameApp.module.css';

class LottoGameApp extends HTMLElement {
  #lottos;
  #elements;

  initiateGame() {
    this.#render();
    this.#bindElements();
    this.#elements.purchaseForm.addEventListener('purchaseLotto', this.#handlePurchaseLotto.bind(this));
    this.#elements.winningNumbersForm.addEventListener(
      'createWinningResult',
      this.#handleCreateWinningResult.bind(this),
    );
    this.#elements.resultModal.addEventListener('restartGame', this.#handleRestartGame.bind(this));
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

  #bindElements() {
    this.#elements = {
      ...this.#elements,
      purchaseForm: $('purchase-form'),
      winningNumbersForm: $('winning-numbers-form'),
      resultModal: $('result-modal'),
    };
  }

  #handleRestartGame() {
    this.initiateGame();
  }

  #render() {
    this.innerHTML = `
      <main id="lotto-game" class="${styles['lotto-game']}">
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
