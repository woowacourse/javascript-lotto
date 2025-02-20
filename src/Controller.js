import Validation from "./utils/validation/Validation.js";
import InputView from "./view/InputView.js";
import LottoMachine from "./domain/LottoMachine.js";
import OutputView from "./view/OutputView.js";
import profitCalculator from "./domain/profitCalculator.js";
import generateAnswerLotto from "./domain/AnswerLottoPack.js";
import retryCheckInput from "./utils/retryCheckInput.js";
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
    const purchaseAmount = await retryCheckInput(
      async () => await InputView.purchaseAmount(),
      Validation.purchaseAmount,
    );
    return purchaseAmount;
  }

  async answerLottoInput() {
    const winningNumbers = await retryCheckInput(
      async () => await InputView.winningNumbers(),
      Validation.winningNumbers,
    );
    const bonusNumber = await retryCheckInput(
      async () => await InputView.bonusNumber(),
      Validation.bonusNumber(winningNumbers),
    );

    return { winningNumbers, bonusNumber };
  }

  async reStart() {
    const restart = await retryCheckInput(async () => await InputView.restart(), Validation.restart);
    if (restart) this.start();
  }
}
export default Controller;
