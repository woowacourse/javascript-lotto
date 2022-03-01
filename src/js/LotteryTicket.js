import { LOTTERY_TICKET_NUMBER } from './constants/constants';
import { generateIntegerArray } from './utils/util';

export default class LotteryTicket {
  #numbers;

  constructor(numbers = this.generateNumbersAutomatically()) {
    this.#numbers = numbers;
  }

  get numbers() {
    return this.#numbers;
  }

  generateNumbersAutomatically() {
    return generateIntegerArray(LOTTERY_TICKET_NUMBER.MAX).sort(() => Math.random() - 0.5).slice(0, LOTTERY_TICKET_NUMBER.LENGTH);
  }
}
