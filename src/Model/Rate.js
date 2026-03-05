import { PRIZE_MONEY } from "../constants/lottoConstants";

class Rate {
  constructor(statistics, price) {
    this.statistics = statistics;
    this.price = price;
  }
  #getTotal() {
    return Object.entries(this.statistics).reduce((acc, [grade, count]) => {
      acc += PRIZE_MONEY[grade] * count;
      return acc;
    }, 0);
  }
  getRate() {
    return;
  }
}

export default Rate;
