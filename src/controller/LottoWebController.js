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
    const winningNumber = winNumber.split(',').map(Number);

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
