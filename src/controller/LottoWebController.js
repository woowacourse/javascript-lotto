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
    if (hasError) return false;

    this.#game.initializeLottos(purchaseAmount);
    return true;
  }

  printLottoInfo() {
    return this.#game.getOrderedLottos();
  }

  setWinNumber(winNumber, bonusNumber) {
    const winningNumber = winNumber.map(Number);

    const hasError = this.errorChecker(() =>
      validateWinningNumbers(winningNumber)
    );
    if (hasError) return false;

    this.#game.initializeWin(winningNumber);

    const isBonusNumberThrow = this.setBonusNumber(winningNumber, bonusNumber);
    if (!isBonusNumberThrow) return false;

    return true;
  }

  setBonusNumber(winNumber, inputBonusNumber) {
    const bonusNumber = Number(inputBonusNumber);

    const hasError = this.errorChecker(() =>
      validateBonusNumber(bonusNumber, winNumber)
    );
    if (hasError) return false;

    this.#game.setBonusNumber(bonusNumber);
    return true;
  }

  printWinningResult() {
    this.#game.setLottoRank();
    return this.#game.getLottosWinCount();
  }

  printEarningRate() {
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
