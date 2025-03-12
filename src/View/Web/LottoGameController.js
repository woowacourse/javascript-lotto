import LottoService from '../../Domain/LottoService.js';

class LottoGameController {
  #state;
  #lottoService;

  constructor(state) {
    this.#state = state;
    this.#lottoService = new LottoService();
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
      const lottoTickets = this.#lottoService.initializeLotto(purchaseAmount);
      this.#state.updatePurchaseInfo(
        this.#lottoService.getLottoManager(),
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
      const winningLotto = this.#lottoService.createWinningLotto(
        winningNumbers,
        bonusNumber
      );
      this.#state.updateWinningInfo(winningNumbers, bonusNumber);

      const lottoResult =
        this.#lottoService.compareWithWinningLotto(winningLotto);
      const profitRate = this.#lottoService.calculateProfit(lottoResult);
      this.#state.updateLottoResult(lottoResult, profitRate);
    } catch (error) {
      alert(error.message);
    }
  }

  handleRetry() {
    this.#lottoService = new LottoService();
    this.#state.resetState();
  }
}

export default LottoGameController;
