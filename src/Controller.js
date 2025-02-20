import Console from "./utils/Console.js";
import Validation from "./utils/validation/Validation.js";
import InputView from "./view/InputView.js";
import purchaseLottoCount from "./domain/purchaseLottoCount.js";
import LottoPack from "./domain/LottoPack.js";
import LottoMachine from "./domain/LottoMachine.js";
import OutputView from "./view/OutputView.js";
import AnswerLottoPack from "./domain/AnswerLottoPack.js";
import profitCalculator from "./domain/profitCalculator.js";
class Controller {
  async start() {
    const purchaseAmount = await this.retryCheckInput(
      async () => await InputView.purchaseAmount(),
      Validation.purchaseAmount,
    );

    const { count, lottoPack } = LottoMachine(purchaseAmount);
    OutputView.purchaseCount(count);
    OutputView.lottoPack(lottoPack.lottos);

    const winningNumbers = await this.retryCheckInput(
      async () => await InputView.winningNumbers(),
      Validation.winningNumbers,
    );
    const bonusNumber = await this.retryCheckInput(
      async () => await InputView.bonusNumber(),
      Validation.bonusNumber(winningNumbers),
    );
    const answerLottoPack = new AnswerLottoPack(winningNumbers, bonusNumber);

    lottoPack.playCompare(answerLottoPack.answerTable);

    const winningResult = lottoPack.checkCountResult;
    OutputView.winningStatistics(winningResult);

    const profitRate = profitCalculator(purchaseAmount, winningResult);
    OutputView.profitRate(profitRate);

    const restart = await this.retryCheckInput(async () => await InputView.restart(), Validation.restart);
    if (restart) this.start();
  }

  async retryCheckInput(prompt, validation) {
    try {
      const input = await prompt();
      return validation(input);
    } catch (error) {
      Console.print(error.message);
      return this.retryCheckInput(prompt, validation);
    }
  }
}
export default Controller;
