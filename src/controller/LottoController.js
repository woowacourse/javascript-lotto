import { generateLotto } from "../domain/LottoGenerator.js";
import ProfitCalculator from "../domain/ProfitCalculator.js";
import { printMatchResults } from "../view/Output.js";
import { bonusNumberValidator, lottoNumberValidator } from "../validators/index.js";

class LottoController {
  #lottoTickets;
  #purchaseAmount;
  #winningNumber;

  constructor() {
    this.#lottoTickets = [];
    this.#purchaseAmount = 0;
    this.#winningNumber = {
      winning: [],
      bonus: 0
    };
  }

  get lottoTickets() {
    return this.#lottoTickets;
  }

  get winningNumber() {
    return this.#winningNumber;
  }

  generateTickets(purchaseAmount) {
    this.#lottoTickets = generateLotto(purchaseAmount);
    this.#purchaseAmount = purchaseAmount;
  }

  matchLottoNumbers(winningNumbers, bonusNumber) {
    lottoNumberValidator(winningNumbers);
    bonusNumberValidator(bonusNumber, winningNumbers);

    this.#winningNumber = {
      winning: winningNumbers,
      bonus: bonusNumber
    };
  }

  calculateAndDisplayResults() {
    const calculator = new ProfitCalculator(
      this.#lottoTickets,
      this.#winningNumber
    );
    const results = calculator.getResults();
    return results;
  }
}

export default LottoController;
