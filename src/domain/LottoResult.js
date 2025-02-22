class LottoResult {
  constructor(matchedLottoStatus, price) {
    this.matchedLottoStatus = matchedLottoStatus;
    this.price = price;
    this.winningHistory = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    this.updateWinningHistory();
  }

  updateWinningHistory() {
    this.matchedLottoStatus.forEach((status) => {
      this.winningHistory[status.RANK] += 1;
    });
  }

  getWinningHistory() {
    return this.winningHistory;
  }

  getTotalProfit() {
    return this.matchedLottoStatus.reduce((acc, cur) => acc + cur.REWORD, 0);
  }

  getRate() {
    return ((this.getTotalProfit() / this.price) * 100).toFixed(1);
  }
}
export default LottoResult;
