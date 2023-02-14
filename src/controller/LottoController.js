import { inputPurchaseAmount, inputWinningNumber } from '../view/InputView';
import LottoGame from '../domain/LottoGame';

class LottoController {
  #purchaseAmount;
  #game;

  constructor() {
    this.#game = new LottoGame();
  }

  async readPurchaseAmount() {
    const purchaseAmount = await inputPurchaseAmount();
    this.#purchaseAmount = purchaseAmount;
    this.readWinningNumber();
  }

  async readWinningNumber() {
    const winningNumber = await inputWinningNumber();

    this.#game.initializeWin(winningNumber.split(',').map(Number));
  }
}

export default LottoController;
