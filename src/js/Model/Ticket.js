import { Number } from "../Util/constants.js";

export default class Ticket {
  constructor() {
    this.numbers = this.generateRandomNumbers();
  }

  generateRandomNumbers() {
    const numbers = Array.from(
      { length: Number.LOTTO_MAX_NUMBER },
      (_, i) => i + 1
    );
    // 테스트용 주석

    numbers.sort(() => Math.random() - Math.random());

    return numbers.slice(0, Number.TICKET_NUMBER_LENGTH).sort((a, b) => a - b);
  }
}
