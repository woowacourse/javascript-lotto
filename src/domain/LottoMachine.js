import { getInput, retryUntilValid } from "../view/Input.js";
import { printLottoTickets, printMatchResults } from "../view/Output.js";
import ProfitCalculator from "../domain/ProfitCalculator.js";
import { MESSAGES } from "../constants/index.js";
import {
  purchaseAmountValidator,
  lottoNumberValidator,
  bonusNumberValidator,
  restartValidator
} from "../validators/index.js";

class LottoMachine {
  constructor(lottoController) {
    this.lottoController = lottoController;
  }

  async play() {
    do {
      const purchaseAmount = await this.getPurchaseAmount();
      this.lottoController.generateTickets(purchaseAmount);

      printLottoTickets(this.lottoController.lottoTickets);

      const lottoNumber = await this.getLottoNumber();
      const bonusNumber = await this.getBonusNumber(lottoNumber);
      this.lottoController.matchLottoNumbers(lottoNumber, bonusNumber);

      this.calculateAndDisplayResults(this.lottoController.lottoTickets, this.lottoController.winningNumber);
    } while (await this.getRestartChoice());
  }

  async getRestartChoice() {
    const restartInput = await retryUntilValid(
      () => getInput("\n" + MESSAGES.input.askRestart),
      (input) => input.trim().toLowerCase(),
      restartValidator
    );
    return restartInput === "y";
  }

  async getPurchaseAmount() {
    const purchaseAmount = await retryUntilValid(
      () => getInput(MESSAGES.input.purchaseAmount),
      (input) => Number(input),
      purchaseAmountValidator
    );
    return purchaseAmount;
  }

  async getLottoNumber() {
    const lottoNumber = await retryUntilValid(
      () => getInput("\n" + MESSAGES.input.lottoNumber),
      (input) => input.split(",").map(Number),
      lottoNumberValidator
    );
    return lottoNumber;
  }

  async getBonusNumber(lottoNumber) {
    const bonusNumber = await retryUntilValid(
      () => getInput("\n" + MESSAGES.input.bonusNumber),
      (input) => Number(input),
      (bonusNumber) => bonusNumberValidator(bonusNumber, lottoNumber)
    );
    return bonusNumber;
  }

  calculateAndDisplayResults(lottoTickets, winningNumber) {
    const calculator = new ProfitCalculator(lottoTickets, winningNumber);
    const results = calculator.getResults();
    printMatchResults(results);
  }
}

export default LottoMachine;
