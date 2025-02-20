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

    while (numbers.size < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      numbers.add(randomNumber);
    }

    return sortNumber(Array.from(numbers));
  }
}

export default LottoGenerator;
