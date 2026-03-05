import { InputView } from "./view/input.js";
import { OutputView } from "./view/output.js";
import { calculateLottoCount } from "./service/calculateLottoCount.js";
import { getLottos } from "./service/getRandomLotto.js";
import WinningLotto from "./domain/WinningLotto.js";
import { getCompareResult } from "./service/getCompareResult.js";
import { getProfit } from "./service/getProfit.js";
import { getPurchaseAmount } from "./service/getPurchaseAmount.js";
import { getWinningLotto } from "./service/getWinningLotto.js";
import { getBonusNumber } from "./service/getBonusNumber.js";

class App {
  async run() {
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

    const retry = await InputView.inputRetry();
    if (retry === "y" || retry === "Y") return this.run();
  }
}

export default App;
