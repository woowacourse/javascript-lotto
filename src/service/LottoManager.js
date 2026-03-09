import generateLottos from "../domain/generateLottos.js";
import Lotto from "../domain/Lotto.js";
import Money from "../domain/Money.js";
import WinningNumber from "../domain/WinningNumber.js";
import LottoResult from "../domain/LottoResult.js";

export default class LottoManager {
  #lottos = [];

  buyLottosFromConsole(amountInput) {
    const money = new Money(Number(amountInput));
    this.#lottos = generateLottos(money.getMaximumLottoCount());
    return this.#lottos.map((lotto) => lotto.getNumbers());
  }

  createWinningLottoFromConsole(numbersInput) {
    const numbers = numbersInput.split(",").map((v) => Number(v.trim()));
    return new Lotto(numbers);
  }

  createWinningNumberFromConsole(winningLotto, bonusInput) {
    return new WinningNumber(winningLotto, Number(bonusInput));
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
