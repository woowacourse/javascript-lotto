import Console from "./utils/Console.js";
import Validation from "./utils/validation/Validation.js";
import InputView from "./view/InputView.js";
import purchaseLottoCount from "./domain/purchaseLottoCount.js";
import LottoPack from "./domain/LottoPack.js";
import LottoMachine from "./domain/LottoMachine.js";
import OutputView from "./view/OutputView.js";
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

    const winningNumbers = await this.retryCheckInput(
      async () => await InputView.winningNumbers(),
      Validation.winningNumbers,
    );
    const bonusNumber = await this.retryCheckInput(
      async () => await InputView.bonusNumber(),
      Validation.bonusNumber(winningNumbers),
    );

    const restart = await this.retryCheckInput(async () => await InputView.restart(), Validation.restart);
    if (restart) this.start();
  }

  async retryCheckInput(prompt, validation) {
    while (true) {
      try {
        const input = await prompt();
        const value = validation(input);
        return value;
      } catch (error) {
        Console.print(error.message);
      }
    }
  }
}
export default Controller;
