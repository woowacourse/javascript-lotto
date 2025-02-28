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
      () => new this.LottoClass(),
    );
    return this.#lottos.map((lotto) =>
      [...lotto.numbers].sort((a, b) => a - b),
    );
  }

  defineRule(winnings) {
    this.winnings = winnings;
  }

  drawWinning(purchasePrice) {
    // #lottos가 잘 등록된거까진 확인
    // 이 함수가 실행도 됨...
    // 아 winnings가 등록이 안됐군.
    const countStatistics = this.winnings.countStatistics(
      this.#lottos.map((lotto) => lotto.numbers),
    );

    const winningRate = this.winnings.calculateWinningRate(
      countStatistics,
      purchasePrice,
    );
    return { countStatistics, winningRate };
  }
}

export default LottoMachine;
