import { getInput, retryUntilValid } from "../view/Input.js";
import { printLottoTickets, printMatchResults } from "../view/Output.js";
import { generateLotto } from "../domain/LottoGenerator.js";
import ProfitCalculator from "../domain/ProfitCalculator.js";
import { MESSAGES } from "../constants/index.js";
import {
  purchaseAmountValidator,
  lottoNumberValidator,
  bonusNumberValidator,
  restartValidator
} from "../validators/index.js";

class LottoController {
  constructor() {
    this.lottoTickets = [];
    this.lottoNumber = [];
  }

  async play() {
    do {
      const purchaseAmount = await this.getPurchaseAmount();
      this.lottoTickets = generateLotto(purchaseAmount);

      printLottoTickets(this.lottoTickets);

      this.lottoNumber = await this.getLottoNumber();
      const bonusNumber = await this.getBonusNumber();

      this.calculateAndDisplayResults(bonusNumber);
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

  async getBonusNumber() {
    const bonusNumber = await retryUntilValid(
      () => getInput("\n" + MESSAGES.input.bonusNumber),
      (input) => Number(input),
      (bonusNumber) => bonusNumberValidator(bonusNumber, this.lottoNumber)
    );
    return bonusNumber;
  }

  calculateAndDisplayResults(bonusNumber) {
    const calculator = new ProfitCalculator(
      this.lottoTickets,
      this.lottoNumber,
      bonusNumber
    );

    const results = calculator.getResults();
    printMatchResults(results);
  }
}

export default LottoController;
