import { WINNING_HISTORY } from "../constants/lotto.js";

class LottoResult {
  constructor(matchedLottoStatus, price) {
    this.matchedLottoStatus = matchedLottoStatus;
    this.price = price;
    this.winningHistory = { ...WINNING_HISTORY };
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
    return (this.getTotalProfit() / this.price) * 100;
  }
}
export default LottoResult;
