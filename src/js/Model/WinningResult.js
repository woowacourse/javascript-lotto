import { MATCHING_NUMBER, RANK, WINNING_PRIZE } from "../Util/constants.js";

class WinningResult {
  constructor() {
    this.winningNumbers = [];
    this.bonusNumber = 0;
    this.matchingCounts = [];
  }

  initializeWinningResult() {
    this.winningNumbers = [];
    this.bonusNumber = 0;
    this.matchingCounts = [];
  }

  setWinningNumbers(winningNumbers) {
    this.winningNumbers = winningNumbers.map((number) => Number(number));
  }

  setBonusNumber(bonusNumber) {
    this.bonusNumber = Number(bonusNumber);
  }

  setRanks(ticketBundle) {
    const ranks = ticketBundle.map((ticket) => {
      const matchingCount = ticket.filter((number) =>
        this.winningNumbers.includes(number)
      ).length;

      return this.decideRank(matchingCount, ticket);
    });

    return ranks;
  }

  decideRank(matchingCount, ticket) {
    switch (matchingCount) {
      case MATCHING_NUMBER.SIX:
        return RANK.FIRST;
      case MATCHING_NUMBER.FIVE:
        return ticket.includes(this.bonusNumber) ? RANK.SECOND : RANK.THIRD;
      case MATCHING_NUMBER.FOUR:
        return RANK.FOURTH;
      case MATCHING_NUMBER.THREE:
        return RANK.FIFTH;
      default:
        return RANK.LOSER;
    }
  }

  makeRankInfo() {
    const rankInfo = [
      [RANK.FIRST, WINNING_PRIZE.FIRST],
      [RANK.SECOND, WINNING_PRIZE.SECOND],
      [RANK.THIRD, WINNING_PRIZE.THIRD],
      [RANK.FOURTH, WINNING_PRIZE.FOURTH],
      [RANK.FIFTH, WINNING_PRIZE.FIFTH],
    ];

    return rankInfo;
  }

  setMatchingCounts(ranks) {
    const rankInfo = this.makeRankInfo();
    let tmpMatchingCounts = [];

    rankInfo.forEach((rankArray, i) => {
      const matchingCount = ranks.filter((rank) => rank === rankArray[0])
        .length;

      tmpMatchingCounts.push(matchingCount);
    });

    this.matchingCounts = tmpMatchingCounts;

    return this.matchingCounts;
  }

  calculateTotalPrize() {
    const rankInfo = this.makeRankInfo();
    let totalPrize = 0;

    rankInfo.forEach((_, i) => {
      totalPrize += this.calculatePrize(rankInfo, i, this.matchingCounts[i]);
    });

    return totalPrize;
  }

  calculatePrize(rankInfo, i, matchingCount) {
    return matchingCount * rankInfo[i][1];
  }
}

export default new WinningResult();
