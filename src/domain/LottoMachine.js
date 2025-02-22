import { PRICE } from "../constant/Definition.js";
class LottoMachine {
  #lottos;

  constructor(LottoClass) {
    this.LottoClass = LottoClass;
    this.winnings;
  }

  publishLottos(money) {
    const count = Math.floor(money / PRICE.LOTTO);
    this.#lottos = Array.from({ length: count }).map(
      () => new this.LottoClass()
    );
    return this.#lottos.map((lotto) =>
      [...lotto.numbers].sort((a, b) => a - b)
    );
  }

  defineRule(winnings) {
    this.winnings = winnings;
  }

  drawWinning(purchasePrice) {
    const countStatistics = this.winnings.countStatistics(
      this.#lottos.map((lotto) => lotto.numbers)
    );
    const winningRate = this.winnings.calculateWinningRate(
      countStatistics,
      purchasePrice
    );
    return { countStatistics, winningRate };
  }
}

export default LottoMachine;
