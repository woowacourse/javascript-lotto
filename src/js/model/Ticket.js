export default class Ticket {
  constructor() {
    this.numbers = [];
    this.winningRank = 0;
    this.profit = 0;
  }

  setNumbers(numbers) {
    this.numbers = numbers;
  }

  getNumbers() {
    return this.numbers;
  }

  setWinningRank(winningRank) {
    this.winningRank = winningRank;
  }

  setProfit(profit) {
    this.profit = profit;
  }
}
