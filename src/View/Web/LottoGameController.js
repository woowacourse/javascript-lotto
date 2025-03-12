import LottoService from '../../Domain/LottoService.js';

class LottoGameController {
  #state;

  constructor(state) {
    this.#state = state;
    this.#initializeEventListeners();
  }

  #initializeEventListeners() {
    const purchaseButton = document.querySelector('.purchase-button');
    const resultButton = document.querySelector('.result-button');
    const retryButton = document.querySelector('.retry-button');

    purchaseButton.addEventListener('click', () => this.handlePurchase());
    resultButton.addEventListener('click', () => this.handleResult());
    retryButton.addEventListener('click', () => this.handleRetry());
  }

  async handlePurchase() {
    try {
      const purchaseAmount = Number(
        document.querySelector('.purchase-input').value
      );
      const { lottoManager, lottoTickets } =
        LottoService.initializeLotto(purchaseAmount);
      this.#state.updatePurchaseInfo(
        lottoManager,
        lottoTickets,
        purchaseAmount
      );
    } catch (error) {
      alert(error.message);
    }
  }

  async handleResult() {
    try {
      const winningInputs = Array.from(
        document.querySelectorAll('.winning-input')
      );
      const winningNumbers = winningInputs.map((input) => Number(input.value));
      const bonusNumber = Number(document.querySelector('.bonus-input').value);
      const winningLotto = LottoService.initializeWinningLotto(
        winningNumbers,
        bonusNumber
      );
      this.#state.updateWinningInfo(winningNumbers, bonusNumber);

      const lottoResult = LottoService.compareWinningLotto(
        this.#state.getLottoManager(),
        winningLotto
      );
      const profitRate = LottoService.processWinningLotto(
        lottoResult,
        this.#state.getPurchaseAmount()
      );
      this.#state.updateLottoResult(lottoResult, profitRate);
    } catch (error) {
      alert(error.message);
    }
  }

  handleRetry() {
    this.#state.resetState();
  }
}

export default LottoGameController;
