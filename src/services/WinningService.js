import WinningResult from '../domains/WinningResult.js';
import { PURCHASE_PRICE } from '../constants/CONFIGURATIONS.js';

class WinningService {
  getWinningResult({ lottos, winningNumbers, bonusNumber }) {
    const winningResult = new WinningResult(winningNumbers, bonusNumber);
    const winningCounts = winningResult.calculate(lottos);
    const profitRate = winningResult.calculateProfitRate(
      lottos.length * PURCHASE_PRICE.UNIT,
      winningCounts,
    );

    return { winningCounts, profitRate };
  }
}

export default WinningService;
