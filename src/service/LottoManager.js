import generateLottos from "../domain/generateLottos.js";
import Money from "../domain/Money.js";
import WinningNumber from "../domain/WinningNumber.js";
import LottoResult from "../domain/LottoResult.js";

export default class LottoManager {
  #lottos = [];

  buyLottos(amount) {
    const money = new Money(amount);
    this.#lottos = generateLottos(money.getMaximumLottoCount());
    return this.#lottos.map((lotto) => lotto.getNumbers());
  }

  createWinningNumber({ winningLotto, bonusNumber }) {
    return new WinningNumber(winningLotto, bonusNumber);
  }

  getLotteryResult(winningNumber) {
    const result = new LottoResult(this.#lottos, winningNumber);
    return {
      prizeList: result.getPrizeList().map(({ rank, count, prize }) => {
        const { matchCount, hasBonus } = rank.getResult();
        return { matchCount, hasBonus, count, prize };
      }),
      profitRate: result.getProfitRate(Money.UNIT * this.#lottos.length),
    };
  }
}
