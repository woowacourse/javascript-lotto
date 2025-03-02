import { calculateRank } from "./LottoMatcher.js";
import { SETTINGS } from "../constants/index.js";

class ProfitCalculator {
  constructor(lottoTickets, winningNumber) {
    this.lottoTickets = lottoTickets;
    this.winningNumber = winningNumber;
    this.rankCounts = this.initializeRankCounts();
  }

  initializeRankCounts() {
    return {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
      fifth: 0,
      none: 0
    };
  }

  calculateResults() {
    this.lottoTickets.forEach((ticket) => {
      const rank = calculateRank(ticket, this.winningNumber);
      this.rankCounts[rank]++;
    });
  }

  calculateTotalPrize() {
    return Object.entries(this.rankCounts)
      .reduce((total, [rank, count]) => {
        if (rank === "none") return total;
        return total + SETTINGS.rewards[rank].amount * count;
      }, 0);
  }

  calculateProfitRate() {
    const totalPurchaseAmount = this.lottoTickets.length * SETTINGS.priceUnit;
    const totalPrize = this.calculateTotalPrize();

    const profitRate = (totalPrize / totalPurchaseAmount) * 100;
    return profitRate.toFixed(1);
  }

  getResults() {
    this.calculateResults();
    return {
      rankCounts: this.rankCounts,
      totalPrize: this.calculateTotalPrize(),
      profitRate: this.calculateProfitRate()
    };
  }
}

export default ProfitCalculator;
