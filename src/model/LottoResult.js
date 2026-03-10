import { RANK_PRIZE } from "../constant/index.js";
import { MONEY_ERROR_MESSAGE } from "../constant/message.js";

class LottoResult {
  #counts;

  constructor(counts) {
    this.#counts = { ...counts };
  }

  getCounts() {
    return { ...this.#counts };
  }

  getPrize() {
    return Object.entries(this.#counts).reduce(
      (acc, [rank, count]) => acc + RANK_PRIZE[rank] * count,
      0,
    );
  }

  getReturnOnInvestment(amount) {
    if (amount === 0) throw new Error(MONEY_ERROR_MESSAGE.INPUT_NOT_INTEGER);
    return (this.getPrize() / amount) * 100;
  }
}

export default LottoResult;
