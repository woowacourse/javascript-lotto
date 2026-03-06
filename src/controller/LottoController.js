import { OutputView } from "../view/output.js";
import { calculateLottoCount } from "../service/calculateLottoCount.js";
import { getLottos } from "../service/getRandomLotto.js";
import WinningLotto from "../domain/WinningLotto.js";
import { getCompareResult } from "../service/getCompareResult.js";
import { getProfit } from "../service/getProfit.js";
import { InputView } from "../view/input.js";
import { RETRY_ANSWER } from "../constants/constant.js";

class LottoController {
  async play() {
    const money = await InputView.inputPurchaseAmount();
    const count = calculateLottoCount(money);
    const randomLotto = getLottos(count);
    OutputView.outputLottoNumber(randomLotto);

    const winningNumber = await InputView.inputWinningNumber();
    const bonusNumber = await InputView.inputBonusNumber(winningNumber);

    const winningLotto = new WinningLotto(winningNumber, bonusNumber);

    const result = getCompareResult(randomLotto, winningLotto);

    const profit = getProfit(money, result);

    OutputView.outputWinningStatics(result);
    OutputView.outputWinningProfit(profit);

    const retry = await InputView.inputRetry();
    if (RETRY_ANSWER.YES.includes(retry)) return this.play();
  }
}

export default LottoController;
