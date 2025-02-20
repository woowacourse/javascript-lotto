import Console from "./utils/Console.js";
import Validation from "./utils/validation/Validation.js";
import InputView from "./view/InputView.js";
import purchaseLottoCount from "./domain/purchaseLottoCount.js";
import LottoPack from "./domain/LottoPack.js";
import LottoMachine from "./domain/LottoMachine.js";
import OutputView from "./view/OutputView.js";
import AnswerLottoPack from "./domain/AnswerLottoPack.js";
import compareMachine from "./domain/compareMachine.js";
import profitCalculator from "./domain/profitCalculator.js";
class Controller {
  async start() {
    const purchaseAmount = await this.retryCheckInput(
      async () => await InputView.purchaseAmount(),
      Validation.purchaseAmount,
    );
    const count = purchaseLottoCount(purchaseAmount);
    OutputView.purchaseCount(count);
    const lottoNumberSet = LottoMachine(count);
    const lottoPack = new LottoPack(lottoNumberSet);
    OutputView.lottoPack(lottoPack);

    const winningNumbers = await this.retryCheckInput(
      async () => await InputView.winningNumbers(),
      Validation.winningNumbers,
    );
    const bonusNumber = await this.retryCheckInput(
      async () => await InputView.bonusNumber(),
      Validation.bonusNumber(winningNumbers),
    );

    const answerLottoPack = new AnswerLottoPack(winningNumbers, bonusNumber);
    const winningResult = compareMachine(lottoPack, answerLottoPack);

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
