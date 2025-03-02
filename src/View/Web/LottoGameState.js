class LottoGameState {
  #state;
  #observers;

  constructor() {
    this.#state = {
      purchaseAmount: 0,
      lottoManager: null,
      lottoTickets: 0,
      winningNumbers: [],
      bonusNumber: null,
      lottoResult: null,
      profitRate: 0,
    };
    this.#observers = new Set();
  }

  subscribe(observer) {
    this.#observers.add(observer);
  }

  unsubscribe(observer) {
    this.#observers.delete(observer);
  }

  notify(updateType) {
    this.#observers.forEach((observer) => observer.update(updateType));
  }

  updatePurchaseInfo(lottoManager, lottoTickets, purchaseAmount) {
    this.#state.lottoManager = lottoManager;
    this.#state.lottoTickets = lottoTickets;
    this.#state.purchaseAmount = purchaseAmount;
    this.notify('LOTTO_PURCHASE');
  }

  updateWinningInfo(winningNumbers, bonusNumber) {
    this.#state.winningNumbers = winningNumbers;
    this.#state.bonusNumber = bonusNumber;
  }

  updateLottoResult(lottoResult, profitRate) {
    this.#state.lottoResult = lottoResult;
    this.#state.profitRate = profitRate;
    this.notify('LOTTO_RESULT');
  }

  resetState() {
    this.#state = {
      purchaseAmount: 0,
      lottoManager: null,
      lottoTickets: 0,
      winningNumbers: [],
      bonusNumber: null,
      lottoResult: null,
      profitRate: 0,
    };
    this.notify('RESET');
  }

  getLottoTickets() {
    return this.#state.lottoTickets;
  }

  getLottoNumbers() {
    return this.#state.lottoManager?.getLottoList() ?? [];
  }

  getLottoResult() {
    return this.#state.lottoResult;
  }

  getProfitRate() {
    return this.#state.profitRate;
  }

  getLottoManager() {
    return this.#state.lottoManager;
  }

  getPurchaseAmount() {
    return this.#state.purchaseAmount;
  }
}

export default LottoGameState;
