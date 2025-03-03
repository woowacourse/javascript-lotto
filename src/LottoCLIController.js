import LottoBaseController from "./LottoBaseController.js";
import InputView from "./view/InputView.js";
import LottoMachine from "./domain/LottoMachine.js";
import OutputView from "./view/OutputView.js";
import profitCalculator from "./domain/profitCalculator.js";
import generateAnswerLotto from "./domain/AnswerLottoPack.js";
import retryCheckInput from "./utils/retryCheckInput.js";
import validatePurchaseAmount from "./domain/validation/validatePurchaseAmount.js";
import validateWinningNumbers from "./domain/validation/validateWinningNumbers.js";
import validateBonusNumber from "./domain/validation/validateBonusNumber.js";
import validateRestart from "./domain/validation/validateRestart.js";
class LottoController extends LottoBaseController {
  async start() {
    const purchaseAmount = await this.#purchaseAmountInput();
    const { count, lottoPack } = LottoMachine(purchaseAmount);

    OutputView.purchaseCount(count);
    OutputView.lottoPack(lottoPack.lottos);

    await this.#playLotto(purchaseAmount, lottoPack);
    await this.restart();
  }

  async #playLotto(purchaseAmount, lottoPack) {
    const { winningNumbers, bonusNumber } = await this.#answerLottoInput();
    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumber);

    const winningResult = lottoPack.playCompare(answerLotto);

    OutputView.winningStatistics(winningResult);

    const profitRate = profitCalculator(purchaseAmount, winningResult);
    OutputView.profitRate(profitRate);
  }

  async #purchaseAmountInput() {
    const purchaseAmount = await retryCheckInput(InputView.purchaseAmount, validatePurchaseAmount);
    return purchaseAmount;
  }

  async #answerLottoInput() {
    const winningNumbers = await retryCheckInput(InputView.winningNumbers, validateWinningNumbers);
    const bonusNumber = await retryCheckInput(InputView.bonusNumber, validateBonusNumber(winningNumbers));

    return { winningNumbers, bonusNumber };
  }

  async restart() {
    if (await this.#isRestart()) this.start();
  }

  async #isRestart() {
    return retryCheckInput(InputView.restart, validateRestart);
  }
}
export default LottoController;
