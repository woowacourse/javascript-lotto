import { RANK_PRIZE } from "../constant/index.js";
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
    return (this.getPrize() / amount) * 100;
  }
}

export default LottoResult;
