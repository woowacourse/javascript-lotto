import { VALUE } from '../utils/constant.js';
import { getRandomNumber } from '../utils/getRandomNumber.js';

const generateTicketNumbers = () => {
  const ticketNumbers = new Set();

  while (ticketNumbers.size < VALUE.LOTTO.TICKET_LENGH) {
    ticketNumbers.add(
      getRandomNumber(VALUE.LOTTO.MIN_NUM, VALUE.LOTTO.MAX_NUM),
    );
  }

  return [...ticketNumbers].sort((a, b) => a - b);
};
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
