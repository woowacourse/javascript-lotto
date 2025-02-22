class LottoResult {
  #lottoStatus;
  #price;
  #winningHistory;

  constructor(lottoStatus, price) {
    this.#lottoStatus = lottoStatus;
    this.#price = price;
    this.#winningHistory = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    this.updateWinningHistory();
  }

  updateWinningHistory() {
    this.#lottoStatus.forEach((status) => {
      this.#winningHistory[status.RANK] += 1;
    });
  }

  getWinningHistory() {
    return this.#winningHistory;
  }

  calculateTotalProfit() {
    return this.#lottoStatus.reduce((acc, cur) => acc + cur.REWORD, 0);
  }

  calculateRate() {
    return ((this.calculateTotalProfit() / this.#price) * 100).toFixed(1);
  }
}
export default LottoResult;
