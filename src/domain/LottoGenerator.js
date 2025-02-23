import { SETTINGS } from "../constants/index.js";
import { sortNumber } from "../utils/utils.js";

class LottoGenerator {
  static generate(amount) {
    const ticketCount = Math.floor(amount / SETTINGS.priceUnit);
    const tickets = [];

    for (let i = 0; i < ticketCount; i++) {
      tickets.push(this.createLottoNumbers());
    }

    return tickets;
  }

  static createLottoNumbers() {
    const numbers = new Set();

    while (numbers.size < SETTINGS.numberCount) {
      const randomNumber = Math.floor(Math.random() * SETTINGS.numberRange.max) + SETTINGS.numberRange.min;
      numbers.add(randomNumber);
    }

    return sortNumber(Array.from(numbers));
  }
}

export default LottoGenerator;
