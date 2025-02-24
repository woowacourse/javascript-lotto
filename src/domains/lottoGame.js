import WinningStatistics from "../domains/WinningStatistics.js";
import issueLottos from "./issueLottos.js";

class LottoGame {
  issueLottos(purchaseAmount) {
    return issueLottos(purchaseAmount);
  }

  calculateResults(lottos, winningNumbers, bonusNumber) {
    const winningStatistics = new WinningStatistics(lottos);
    winningStatistics.calculateWinningResults(winningNumbers, bonusNumber);
    return winningStatistics;
  }
}

export default LottoGame;
