import Console from "./utils/Console.js";
import Validation from "./utils/validation/Validation.js";
import InputView from "./view/InputView.js";
class Controller {
  async start() {
    const purchaseAmount = await this.retryCheckInput(
      async () => await InputView.purchaseAmount(),
      Validation.purchaseAmount,
    );
    const winningNumbers = await this.retryCheckInput(
      async () => await InputView.winningNumbers(),
      Validation.winningNumbers,
    );
    const bonusNumber = await this.retryCheckInput(
      async () => await InputView.bonusNumber(),
      Validation.bonusNumber(winningNumbers),
    );
    await InputView.restart();
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
