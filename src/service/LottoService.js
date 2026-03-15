import LottoMachine from "../model/LottoMachine.js";
import WinningStatistics from "../model/WinningStatistics.js";
import calculateProfitRate from "../model/calculateProfit.js";

export default class LottoService {
  constructor() {
    this.lottos = [];
  }

  purchaseLottos(purchasedAmount) {
    const lottoMachine = new LottoMachine(purchasedAmount);
    this.lottos = lottoMachine.issuedLottos();
    return [...this.lottos];
  }

  calculateWinningResult(winningNumbers, bonusNumber) {
    const winningStatistics = new WinningStatistics(
      this.lottos,
      winningNumbers,
      bonusNumber
    );
    winningStatistics.calculateStats();

    const profitRate = calculateProfitRate(
      this.lottos.length,
      winningStatistics.getStats()
    );

    return {
      stats: winningStatistics.getStats(),
      profitRate: profitRate,
    };
  }

  reset() {
    this.lottos = [];
  }
}
