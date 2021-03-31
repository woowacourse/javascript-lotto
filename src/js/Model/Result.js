import messenger from "../Messenger.js";
import { ELEMENT, MESSAGE, RANK, WINNING_PRIZE } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";

class Result {
  constructor() {
    this.init();
    this.addMessageListeners();
  }

  init() {
    this.money = 0;
    this.winningNumbers = [];
    this.bonusNumber = 0;
    this.ranks = [];
    this.matchingCounts = [];
    this.totalPrize = 0;
  }

  addMessageListeners() {
    messenger.addMessageListener(
      MESSAGE.MONEY_SUBMITTED,
      this.setMoney.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.WINNING_NUMBER_SUBMITTED,
      this.setNumbers.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.TICKET_BUNDLE_PASSED,
      this.handleResult.bind(this)
    );

    messenger.addMessageListener(
      MESSAGE.RESTART_BUTTON_CLICKED,
      this.reset.bind(this)
    );
  }

  reset() {
    this.init();
  }

  setMoney({ money }) {
    this.money = money;
  }

  passMoneyTotalPrizeMatchingCount() {
    messenger.dispatchMessage(
      MESSAGE.MONEY_TOTAL_PRIZE_MATCHING_COUNT_PREPARED,
      {
        money: this.money,
        totalPrize: this.totalPrize,
        matchingCounts: this.matchingCounts,
      }
    );
  }

  setNumbers({ winningNumbers, bonusNumber }) {
    this.winningNumbers = winningNumbers.map((number) => Number(number));
    this.bonusNumber = Number(bonusNumber);

    messenger.dispatchMessage(MESSAGE.WINNING_NUMBER_SET);
  }

  handleResult({ ticketBundle }) {
    this.setRanks(ticketBundle);
    this.setMatchingCounts();

    this.passMoneyTotalPrizeMatchingCount();
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

    this.totalPrize = this.ranks
      .map((rank) => WINNING_PRIZE[rank])
      .reduce((pre, cur) => pre + cur);
  }
}

export default Result;
