import InputView from "./view/InputView.js";
import LottoMachine from "./domain/LottoMachine.js";
import OutputView from "./view/OutputView.js";
import profitCalculator from "./domain/profitCalculator.js";
import generateAnswerLotto from "./domain/generateAnswerLotto.js";
import retryCheckInput from "./utils/retryCheckInput.js";
import parseAndValidatePurchaseAmount from "./domain/processors/parseAndValidatePurchaseAmount.js";
import parseAndValidateWinningNumbers from "./domain/processors/parseAndValidateWinningNumbers.js";
import parseAndValidateBonusNumber from "./domain/processors/parseAndValidateBonusNumber.js";
import parseAndValidateRestart from "./domain/processors/parseAndValidateRestart.js";

class Controller {
  async start() {
    const purchaseAmount = await this.purchaseAmountInput();
    const lottoPack = LottoMachine(purchaseAmount);
    OutputView.purchaseCount(lottoPack.count);
    OutputView.lottoPack(lottoPack.lottos);

    const { winningNumbers, bonusNumber } = await this.answerLottoInput();
    const answerLotto = generateAnswerLotto(winningNumbers, bonusNumber);

    const winningResult = lottoPack.compareAndReturnResult(answerLotto);
    OutputView.winningStatistics(winningResult);

    const profitRate = profitCalculator(purchaseAmount, winningResult);
    OutputView.profitRate(profitRate);

    await this.reStart();
  }

  async purchaseAmountInput() {
    const purchaseAmount = await retryCheckInput(
      async () => await InputView.purchaseAmount(),
      parseAndValidatePurchaseAmount,
    );
    return purchaseAmount;
  }

  async answerLottoInput() {
    const winningNumbers = await retryCheckInput(
      async () => await InputView.winningNumbers(),
      parseAndValidateWinningNumbers,
    );
    const bonusNumber = await retryCheckInput(
      async () => await InputView.bonusNumber(),
      parseAndValidateBonusNumber(winningNumbers),
    );

    return { winningNumbers, bonusNumber };
  }

  async reStart() {
    const restart = await retryCheckInput(async () => await InputView.restart(), parseAndValidateRestart);
    if (restart) this.start();
  }
}
export default Controller;
