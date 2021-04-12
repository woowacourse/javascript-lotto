import { MATCHING_NUMBER, RANK, WINNING_PRIZE } from "../Util/constants.js";

export default class WinningResult {
  constructor() {
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

  setNumbers = (winningNumbers, bonusNumber) => {
    this.setWinningNumbers(winningNumbers);
    this.setBonusNumber(bonusNumber);
  };

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

  getMatchingCounts(ticketBundle) {
    const ranks = this.setRanks(ticketBundle);
    const matchingCounts = this.setMatchingCounts(ranks);

    return matchingCounts;
  }

  calculateTotalPrize() {
    const rankInfo = this.makeRankInfo();
    let totalPrize = 0;

    rankInfo.forEach((_, i) => {
      totalPrize += this.calculatePrize(rankInfo, i, this.matchingCounts[i]);
    });

    return totalPrize;
  }

  getTotalPrize() {
    return this.calculateTotalPrize();
  }

  calculatePrize(rankInfo, i, matchingCount) {
    return matchingCount * rankInfo[i][1];
  }

  getWinningDatas(initialBalance, ticketBundle) {
    const matchingCounts = this.getMatchingCounts(ticketBundle);
    const totalPrize = this.getTotalPrize();
    const earningRate = ((totalPrize - initialBalance) / initialBalance) * 100;

    return { matchingCounts, earningRate };
  }
}
