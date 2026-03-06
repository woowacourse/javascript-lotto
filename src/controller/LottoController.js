import { OutputView } from "../view/output.js";
import { calculateLottoCount } from "../service/calculateLottoCount.js";
import { getLottos } from "../service/getRandomLotto.js";
import WinningLotto from "../domain/WinningLotto.js";
import { getCompareResult } from "../service/getCompareResult.js";
import { getProfit } from "../service/getProfit.js";
import { getPurchaseAmount } from "../service/getPurchaseAmount.js";
import { getWinningLotto } from "../service/getWinningLotto.js";
import { getBonusNumber } from "../service/getBonusNumber.js";
import { getRetry } from "../service/getRetry.js";
import { RETRY_ANSWER } from "../constants/constant.js";

class LottoController {
  async play() {
    const money = await getPurchaseAmount();
    const count = calculateLottoCount(money);
    const randomLotto = getLottos(count);
    OutputView.outputLottoNumber(randomLotto);

    const winningNumber = await getWinningLotto();
    const bonusNumber = await getBonusNumber(winningNumber);

    const winningLotto = new WinningLotto(winningNumber, bonusNumber);

    const result = getCompareResult(randomLotto, winningLotto);

    const profit = getProfit(money, result);

    OutputView.outputWinningStatics(result);
    OutputView.outputWinningProfit(profit);

    const retry = await getRetry();
    if (RETRY_ANSWER.YES.includes(retry)) return this.play();
  }
}

export default LottoController;
