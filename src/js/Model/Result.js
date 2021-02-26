import { ELEMENT } from "../Util/constants.js";
import { $ } from "../Util/querySelector.js";

class Result {
  constructor() {
    this.winningNumbers = [];
    this.bonusNumber = 0;
    this.ranks = [];
    this.matchingCounts = [];
  }

  getWinningNumbers(winningNumbers) {
    this.winningNumbers = winningNumbers.map((number) => Number(number));
  }

  getBonusNumber(bonusNumber) {
    this.bonusNumber = Number(bonusNumber);
  }

  // matchingCount 1, 0, 2
  getRanks(ticketBundle) {
    this.ranks = ticketBundle.map((ticket, i) => {
      const matchingCount = ticket.filter((number) =>
        this.winningNumbers.includes(number)
      ).length;

      return this.decideRank(matchingCount, ticket);
    });

    console.log(this.ranks);
  }

  decideRank(matchingCount, ticket) {
    switch (matchingCount) {
      case 6:
        return "first";
      case 5:
        return ticket.includes(this.bonusNumber) ? "second" : "third";
      case 4:
        return "fourth";
      case 3:
        return "fifth";
      default:
        return "loser";
    }
  }

  // 총 수입금 계산
  // this.matchingCounts 만들기 - [1, 0, 0, 0]
  calculateTotalPrize() {
    const rankInfo = [
      ["first", 2000000000], // 뒤에 숫자들을 상수 처리
      ["second", 30000000],
      ["third", 1500000],
      ["fourth", 50000],
      ["fifth", 5000],
    ];
    const money = Number(
      $(ELEMENT.TICKET_IMAGE_NUMBER_CONTAINER).dataset.money
    );
    let tmpMatchingCounts = [];
    let totalPrize = 0;

    rankInfo.forEach((rank, i) => {
      const matchingCount = this.ranks.filter((x) => x === rank[0]).length;

      tmpMatchingCounts.push(matchingCount);
      totalPrize += matchingCount * rankInfo[i][1];
    });

    // console.log(((totalPrize - money) / money) * 100); - html에만 쏠 때
    this.matchingCounts = tmpMatchingCounts;
    $(ELEMENT.WIN_NUMBER_CONTAINER).dataset.totalPrize = totalPrize;

    console.log(this.matchingCounts);
    console.log(totalPrize);
  }
}

export default new Result();
