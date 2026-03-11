import Lotto from "../domain/Lotto.js";
import generateLottos from "../domain/LottoMachine.js";
import Money from "../domain/Money.js";
import WinningNumber from "../domain/WinningNumber.js";
import LottoResult from "../domain/LottoResult.js";

export default class LottoManager {
  buyLottos(amount) {
    const money = new Money(amount);
    const count = Math.floor(money.getAmount() / Lotto.PRICE);
    if (count < 1) {
      throw new Error("[ERROR] 로또를 구매할 수 없습니다.");
    }
    return generateLottos(count);
  }

  createWinningNumber({ winningLotto, bonusNumber }) {
    return new WinningNumber(winningLotto, bonusNumber);
  }

  getLotteryResult(lottos, winningNumber) {
    const result = new LottoResult(lottos, winningNumber);
    return {
      statistics: result.getPrizeList(),
      profitRate: result.getProfitRate(Lotto.PRICE * lottos.length),
    };
  }
}
