import { generateLotto } from "../domain/LottoGenerator.js";
import ProfitCalculator from "../domain/ProfitCalculator.js";
import { bonusNumberValidator, lottoNumberValidator } from "../validators/index.js";

class LottoController {
  #lottoTickets;
  #winningNumber;

  constructor() {
    this.#lottoTickets = [];
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
