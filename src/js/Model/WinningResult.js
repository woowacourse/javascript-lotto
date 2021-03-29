import { ELEMENT, RANK, WINNING_PRIZE } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";

class WinningResult {
  constructor() {
    this.winningNumbers = [];
    this.bonusNumber = 0;
    this.ranks = [];
    this.matchingCounts = [];
  }

  setWinningNumbers(winningNumbers) {
    this.winningNumbers = winningNumbers.map((number) => Number(number));
  }

  setBonusNumber(bonusNumber) {
    this.bonusNumber = Number(bonusNumber);
  }

  setRanks(ticketBundle) {
    this.ranks = ticketBundle.map((ticket) => {
      const matchingCount = ticket.filter((number) =>
        this.winningNumbers.includes(number)
      ).length;

      return this.decideRank(matchingCount, ticket);
    });
  }

  decideRank(matchingCount, ticket) {
    switch (matchingCount) {
      case 6:
        return RANK.FIRST;
      case 5:
        return ticket.includes(this.bonusNumber) ? RANK.SECOND : RANK.THIRD;
      case 4:
        return RANK.FOURTH;
      case 3:
        return RANK.FIFTH;
      default:
        return RANK.LOSER;
    }
  }

  setMatchingCounts() {
    const rankInfo = [
      [RANK.FIRST, WINNING_PRIZE[RANK.FIRST]],
      [RANK.SECOND, WINNING_PRIZE[RANK.SECOND]],
      [RANK.THIRD, WINNING_PRIZE[RANK.THIRD]],
      [RANK.FOURTH, WINNING_PRIZE[RANK.FOURTH]],
      [RANK.FIFTH, WINNING_PRIZE[RANK.FIFTH]],
    ];

    rankInfo.forEach((rankArray) => {
      const matchingCount = this.ranks.filter((rank) => rank === rankArray[0])
        .length;

      this.matchingCounts.push(matchingCount);
    });

    $(ELEMENT.WIN_NUMBER_CONTAINER).dataset.totalPrize = this.ranks
      .map((rank) => WINNING_PRIZE[rank])
      .reduce((pre, cur) => pre + cur);
  }
}

export default new WinningResult();
