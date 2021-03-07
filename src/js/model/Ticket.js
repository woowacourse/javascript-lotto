import { generateTicketNumbers } from '../utils/getRandomNumber.js';
export default class Ticket {
  constructor(numbers) {
    this.numbers = this.setNumbers(numbers);
    this.automated;
    this.winningRank = 0;
    this.profit = 0;
  }

  setNumbers(numbers) {
    if (!numbers) {
      this.automated = true;
      return generateTicketNumbers();
    }

    this.automated = false;
    return numbers;
  }

  getNumbers() {
    return this.numbers;
  }

  getAutomated() {
    return this.automated;
  }

  setWinningRank(winningRank) {
    this.winningRank = winningRank;
  }

  setProfit(profit) {
    this.profit = profit;
  }
}
