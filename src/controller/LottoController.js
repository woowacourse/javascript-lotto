import { OutputView } from "../view/output.js";
import { calculateLottoCountService } from "../service/calculateLottoCountService.js";
import { lottoService } from "../service/lottoService.js";
import WinningLotto from "../domain/WinningLotto.js";
import { compareResultService } from "../service/compareResultService.js";
import { profitService } from "../service/profitService.js";
import { InputView } from "../view/input.js";
import { RETRY_ANSWER } from "../constants/constant.js";

class LottoController {
  async play() {
    const money = await InputView.inputPurchaseAmount();
    const count = calculateLottoCountService(money);
    const randomLotto = lottoService(count);
    OutputView.outputLottoNumber(randomLotto);

    const winningNumber = await InputView.inputWinningNumber();
    const bonusNumber = await InputView.inputBonusNumber(winningNumber);

    const winningLotto = new WinningLotto(winningNumber, bonusNumber);

    const result = compareResultService(randomLotto, winningLotto);

    const profit = profitService(money, result);

    OutputView.outputWinningStatics(result);
    OutputView.outputWinningProfit(profit);

    const retry = await InputView.inputRetry();
    if (RETRY_ANSWER.YES.includes(retry)) return this.play();
  }
}

export default LottoController;
