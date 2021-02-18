import { Number } from "../Util/constants.js";

export default class Ticket {
  constructor() {
    this.numbers = this.generateRandomNumbers()
  }


  generateRandomNumbers() {
    const randomNumbers = Array.from({ length: Number.LOTTO_MAX_NUMBER }, (_, i) => i + 1);

    randomNumbers.sort(() => Math.random() - Math.random());

    return randomNumbers.slice(0, Number.TICKET_NUMBER_LENGTH).sort((a, b) => a - b);
  }
}