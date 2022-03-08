import { LOTTERY_TICKET_NUMBER } from './constants/constants';
import { generateRandomInRange } from './utils/util';

export default class LotteryTicket {
  #numbers;

  constructor(numbers = this.generateNumbersAutomatically()) {
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  generateNumbersAutomatically() {
    const numbers = [];

    while (numbers.length !== LOTTERY_TICKET_NUMBER.LENGTH) {
      const randomNumber = generateRandomInRange(
        LOTTERY_TICKET_NUMBER.MIN,
        LOTTERY_TICKET_NUMBER.MAX
      );
      if (!numbers.find(number => number === randomNumber))
        numbers.push(randomNumber);
    }

    return numbers;
  }

}
