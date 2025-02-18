class LottoResult {
  constructor(lottoStatus, price) {
    this.lottoStatus = lottoStatus;
    this.price = price;
    this.winningHistory = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  }

  getWinningHistory() {
    this.lottoStatus.forEach((status) => {
      this.winningHistory[status.RANK] += 1;
    });
    return this.winningHistory;
  }

  getTotalProfit() {
    return this.lottoStatus.reduce((acc, cur) => acc + cur.REWORD, 0);
  }
}
export default LottoResult;
