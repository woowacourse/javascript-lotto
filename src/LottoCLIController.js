import LottoBaseController from "./LottoBaseController.js";
import LottoMachine from "./domain/LottoMachine.js";
import profitCalculator from "./domain/profitCalculator.js";
import generateAnswerLotto from "./domain/AnswerLottoPack.js";
import retryCheckInput from "./utils/retryCheckInput.js";
import validatePurchaseAmount from "./domain/validation/validatePurchaseAmount.js";
import validateWinningNumbers from "./domain/validation/validateWinningNumbers.js";
import validateBonusNumber from "./domain/validation/validateBonusNumber.js";
import validateRestart from "./domain/validation/validateRestart.js";
class LottoCLIController extends LottoBaseController {
  constructor(inputView, outputView) {
    super();
    this.inputView = inputView;
    this.outputView = outputView;
  }
  async start() {
    const purchaseAmount = await this.#purchaseAmountInput();
    const { count, lottoPack } = LottoMachine(purchaseAmount);

    this.outputView.purchaseCount(count);
    this.outputView.lottoPack(lottoPack.lottos);

    await this.#playLotto(purchaseAmount, lottoPack);
    await this.restart();
  }

  async #playLotto(purchaseAmount, lottoPack) {
    const { winningNumbers, bonusNumber } = await this.#answerLottoInput();
    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumber);

    const winningResult = lottoPack.playCompare(answerLotto);

    this.outputView.winningStatistics(winningResult);

    const profitRate = profitCalculator(purchaseAmount, winningResult);
    this.outputView.profitRate(profitRate);
  }

  async #purchaseAmountInput() {
    const purchaseAmount = await retryCheckInput(this.inputView.purchaseAmount, validatePurchaseAmount);
    return purchaseAmount;
  }

  async #answerLottoInput() {
    const winningNumbers = await retryCheckInput(this.inputView.winningNumbers, validateWinningNumbers);
    const bonusNumber = await retryCheckInput(this.inputView.bonusNumber, validateBonusNumber(winningNumbers));

    return { winningNumbers, bonusNumber };
  }

  async restart() {
    if (await this.#isRestart()) this.start();
  }

  async #isRestart() {
    return retryCheckInput(this.inputView.restart, validateRestart);
  }
}
export default LottoCLIController;
