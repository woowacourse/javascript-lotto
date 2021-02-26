import { VALUE } from '../utils/constant.js';
import { getRandomNumber } from '../utils/getRandomNumber.js';

const generateTicketNumber = () => {
  const ticketNumbers = new Set();

  while (ticketNumbers.size < VALUE.LOTTO.TICKET_LENGTH) {
    ticketNumbers.add(
      getRandomNumber(VALUE.LOTTO.MIN_NUM, VALUE.LOTTO.MAX_NUM),
    );
  }

  return [...ticketNumbers].sort((a, b) => a - b);
};
export default class Ticket {
  constructor(numbers = generateTicketNumber()) {
    this.numbers = numbers;
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
