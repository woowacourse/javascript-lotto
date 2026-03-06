import generateLottos from "../domain/LottoMachine.js";
import Money from "../domain/Money.js";
import WinningNumber from "../domain/WinningNumber.js";
import LottoResult from "../domain/LottoResult.js";

export default class LottoManager {
  buyLottos(amount) {
    const money = new Money(amount);
    return generateLottos(money.getMaximumLottoCount());
  }

  createWinningNumber({ winningLotto, bonusNumber }) {
    return new WinningNumber(winningLotto, bonusNumber);
  }

  getLotteryResult(lottos, winningNumber) {
    const result = new LottoResult(lottos, winningNumber);
    return {
      prizeList: result.getPrizeList(),
      profitRate: result.getProfitRate(Money.UNIT * lottos.length),
    };
  }
}
