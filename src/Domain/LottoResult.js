import { PRIZE } from '../Utils/Constants.js';

class LottoResult {
  calculateWinningResult(lottos, luckyNumbers) {
    const result = { FIRST: 0, SECOND: 0, THIRD: 0, FOURTH: 0, FIFTH: 0 };
    for (const lotto of lottos) {
      const match = lotto.countMatches(luckyNumbers.winningNumbers);
      const hasBonus = lotto.hasBonus(luckyNumbers.bonusNumber);
      if (match === 6) result["FIRST"]++;
      else if (match === 5 && hasBonus) result["SECOND"]++;
      else if (match === 5) result["THIRD"]++;
      else if (match === 4) result["FOURTH"]++;
      else if (match === 3) result["FIFTH"]++;
    }
    return result;
  }

  calculateProfitRate(winningResult, purchasePrice) {
    const totalPrize = this.calculateTotalPrize(winningResult);
    const profitRate = ((totalPrize - purchasePrice) / purchasePrice) * 100;

    return Number(profitRate.toFixed(1));
  }

  calculateTotalPrize(winningResult) {
    return Object.entries(winningResult).reduce(
      (sum, [key, count]) => sum + PRIZE[key] * count,
      0,
    );
  }
}

export default LottoResult;
