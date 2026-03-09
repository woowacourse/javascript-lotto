import { PRIZE_MONEY } from "../constants/lottoConstants.js";

class Rate {
  constructor(statistics, price) {
    this.#statistics = statistics;
    this.#price = price;
  }
  #getTotal() {
    return Object.entries(this.#statistics).reduce((acc, [grade, count]) => {
      acc += PRIZE_MONEY[grade] * count;
      return acc;
    }, 0);
  }
  getRate() {
    const total = this.#getTotal();
    const rate = (total / this.#price) * 100;

    return Math.round(rate * 10) / 10;
  }
}

export default Rate;
