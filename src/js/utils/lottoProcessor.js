import { LOTTO_NUMBERS, LOTTO_WINNING_PRICE } from './constants.js';

export default class LottoProcessor {
  constructor(lottos, winningNumbers) {
    this.lottos = lottos;
    this.winningNumbers = winningNumbers.slice(
      0,
      LOTTO_NUMBERS.WINNING_NUMBER_COUNT - 1
    );
    this.bonusNumber = winningNumbers[LOTTO_NUMBERS.WINNING_NUMBER_COUNT - 1];
    this.rankCounts = Array(5).fill(0);
    this.earningRate = 0;
  }

  checkMatchingNums() {
    this.lottos.forEach(lotto => {
      const matchNumbers = [...lotto.numbers].filter(number =>
        this.winningNumbers.includes(number)
      );
      const isMatchBonus = lotto.numbers.has(this.bonusNumber);
      this.updateRankCounts(matchNumbers.length, isMatchBonus);
    });
  }

  updateRankCounts(matchCount, isMatchBonus) {
    switch (matchCount) {
      case 6:
        this.rankCounts[0]++; // 1등
        break;
      case 5:
        isMatchBonus ? this.rankCounts[1]++ : this.rankCounts[2]++; // 2등 or 3등
        break;
      case 4:
        this.rankCounts[3]++; // 4등
        break;
      case 3:
        this.rankCounts[4]++; // 5등
        break;
      default:
        this.rankCounts;
    }
  }

  calculateEarningRate(purchasedPrice) {
    const totalProfit = this.rankCounts.reduce((sum, rankCount, idx) => {
      return sum + rankCount * LOTTO_WINNING_PRICE[idx + 1];
    }, 0);

    this.earningRate = (totalProfit / purchasedPrice - 1) * 100;
  }
}
