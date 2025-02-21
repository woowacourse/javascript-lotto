import InputView from "./view/InputView.js";
import LottoMachine from "./domain/LottoMachine.js";
import OutputView from "./view/OutputView.js";
import profitCalculator from "./domain/profitCalculator.js";
import generateAnswerLotto from "./domain/generateAnswerLotto.js";
import retryCheckInput from "./utils/retryCheckInput.js";
import validatePurchaseAmount from "./domain/validation/validatePurchaseAmount.js";
import validateWinningNumbers from "./domain/validation/validateWinningNumbers.js";
import validateBonusNumber from "./domain/validation/validateBonusNumber.js";
import validateRestart from "./domain/validation/validateRestart.js";
class Controller {
  async start() {
    const purchaseAmount = await this.purchaseAmountInput();
    const { count, lottoPack } = LottoMachine(purchaseAmount);

    OutputView.purchaseCount(count);
    OutputView.lottoPack(lottoPack.lottos);

    const { winningNumbers, bonusNumber } = await this.answerLottoInput();
    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumber);

    lottoPack.playCompare(answerLotto);

    const winningResult = lottoPack.checkCountResult;
    OutputView.winningStatistics(winningResult);

    const profitRate = profitCalculator(purchaseAmount, winningResult);
    OutputView.profitRate(profitRate);

    await this.reStart();
  }

  async purchaseAmountInput() {
    const purchaseAmount = await retryCheckInput(async () => await InputView.purchaseAmount(), validatePurchaseAmount);
    return purchaseAmount;
  }

  async answerLottoInput() {
    const winningNumbers = await retryCheckInput(async () => await InputView.winningNumbers(), validateWinningNumbers);
    const bonusNumber = await retryCheckInput(
      async () => await InputView.bonusNumber(),
      validateBonusNumber(winningNumbers),
    );

    return { winningNumbers, bonusNumber };
  }

  async reStart() {
    const restart = await retryCheckInput(async () => await InputView.restart(), validateRestart);
    if (restart) this.start();
  }
}
export default Controller;
