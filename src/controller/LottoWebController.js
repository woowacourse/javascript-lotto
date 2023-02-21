/* eslint-disable no-undef */
import {
  validateBonusNumber,
  validatePurchaseAmount,
  validateWinningNumbers,
} from '../utils/validator';
import LottoGame from '../domain/LottoGame';

class LottoWebController {
  #game;
  constructor() {
    this.#game = new LottoGame();
  }

  setLottos(inputAmount) {
    const purchaseAmount = Number(inputAmount);

    const hasError = this.errorChecker(() =>
      validatePurchaseAmount(purchaseAmount)
    );
    if (hasError) return;

    this.#game.initializeLottos(purchaseAmount);
  }

  printLottoInfo() {
    return this.#game.getOrderedLottos();
  }

  setWinNumber(winNumber, bonusNumber) {
    const winningNumber = winNumber.map(Number);

    const hasError = this.errorChecker(() =>
      validateWinningNumbers(winningNumber)
    );
    if (hasError) return;

    this.#game.initializeWin(winningNumber);

    this.setBonusNumber(winNumber, bonusNumber);
  }

  setBonusNumber(winNumber, inputBonusNumber) {
    const bonusNumber = Number(inputBonusNumber);

    const hasError = this.errorChecker(() =>
      validateBonusNumber(bonusNumber, winNumber)
    );
    if (hasError) return;

    this.#game.setBonusNumber(bonusNumber);
  }

  printWinningResult() {
    this.#game.setLottoRank();
    console.log(this.#game.getLottosWinCount());
    return this.#game.getLottosWinCount();
  }

  printEarningRate() {
    console.log(this.#game.calculateEarningRate());
    return this.#game.calculateEarningRate();
  }

  errorChecker(validator) {
    try {
      validator();
    } catch (error) {
      alert(error);
      return true;
    }
    return false;
  }
}

export default LottoWebController;
