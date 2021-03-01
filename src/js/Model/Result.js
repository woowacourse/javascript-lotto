import { ELEMENT, RANK, WINNING_PRIZE } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";

class Result {
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
    Object.values(RANK).forEach((rankValue) => {
      const matchingCount = this.ranks.filter((rank) => rank === rankValue)
        .length;

      this.matchingCounts.push(matchingCount);
    });

    $(ELEMENT.WIN_NUMBER_CONTAINER).dataset.totalPrize = this.ranks
      .map((rank) => WINNING_PRIZE[rank])
      .reduce((pre, cur) => pre + cur);
  }
}

export default new Result();
