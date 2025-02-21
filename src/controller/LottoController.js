import Input from "../view/Input.js";
import { MESSAGES } from "../constants/index.js";
import {
  purchaseAmountValidator,
  lottoNumberValidator,
  bonusNumberValidator,
  restartValidator,
} from "../validators/index.js";
import { retryUntilValid } from "../utils/retryUntilValid.js";
import LottoGenerator from "../domain/LottoGenerator.js";
import Output from "../view/Output.js";
import ProfitCalculator from "../domain/ProfitCalculator.js";

class LottoController {
  constructor() {
    this.lottoTickets = [];
    this.winningNumber = [];
  }

  async play() {
    do {
      const purchaseAmount = await this.getPurchaseAmount();
      this.lottoTickets = LottoGenerator.generate(purchaseAmount);

      Output.printLottoTickets(this.lottoTickets);

      this.winningNumber = await this.getWinningNumber();
      const bonusNumber = await this.getBonusNumber();

      this.calculateAndDisplayResults(bonusNumber);
    } while (await this.getRestartChoice());
  }

  async getRestartChoice() {
    const restartInput = await retryUntilValid(
      () => Input.getInput("\n" + MESSAGES.input.askRestart),
      (input) => input.trim().toLowerCase(),
      restartValidator
    );
    return restartInput === "y";
  }

  async getPurchaseAmount() {
    const purchaseAmount = await retryUntilValid(
      () => Input.getInput(MESSAGES.input.purchaseAmount),
      (input) => Number(input),
      purchaseAmountValidator
    );
    return purchaseAmount;
  }

  async getWinningNumber() {
    const winningNumber = await retryUntilValid(
      () => Input.getInput("\n" + MESSAGES.input.winningNumber),
      (input) => input.split(",").map(Number),
      lottoNumberValidator
    );
    return winningNumber;
  }

  async getBonusNumber() {
    const bonusNumber = await retryUntilValid(
      () => Input.getInput("\n" + MESSAGES.input.bonusNumber),
      (input) => Number(input),
      (bonusNumber) => bonusNumberValidator(bonusNumber, this.winningNumber)
    );
    return bonusNumber;
  }

  calculateAndDisplayResults(bonusNumber) {
    const calculator = new ProfitCalculator(
      this.lottoTickets,
      this.winningNumber,
      bonusNumber
    );

    const results = calculator.getResults();
    Output.printMatchResults(results);
  }
}

export default LottoController;
