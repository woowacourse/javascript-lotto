import { StaticValue, ConsoleMessage } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
import Validation from '../utils/Validation.js';
import LottoGameView from '../view/LottoGameView.js';

class LottoGameController {
  #lottoGame = new LottoGame();
  #lottoGameView = new LottoGameView();

  startGame() {
    this.#bindPurchaseEvent();
  }

  #bindPurchaseEvent() {
    this.#lottoGameView.addPurchaseSubmitEvent(this.#handlePurchaseSubmit.bind(this));
  }

  #handlePurchaseSubmit(purchaseAmount) {
    try {
      Validation.verifyPurchaseAmount(purchaseAmount);
      this.#lottoGameView.purchaseInput.classList.remove('error-input');
      this.#lottoGameView.hideErrorMessage('purchase');
    } catch ({ message }) {
      this.#lottoGameView.purchaseInput.classList.add('error-input');
      this.#lottoGameView.showErrorMessage('purchase', message);
      this.#lottoGameView.purchaseInput.value = '';
      this.#lottoGameView.purchaseInput.focus();
    }
    
    const PURCHASE_COUNT = Number(purchaseAmount) / StaticValue.PURCHASE_AMOUNT_UNIT;
    // this.#handleUserLottos(PURCHASE_COUNT);
  }

  // #handleUserLottos(purchaseCount) {
  //   this.#lottoGame.generateUserLottos(purchaseCount);
  //   const USER_LOTTO_LIST = this.#lottoGame.getUserLottoList();

  //   USER_LOTTO_LIST.forEach(OutputView.printUserLottos);
  // }

  // async #handleWinningNumbers() {
  //   try {
  //     const winningNumbersInput = await InputView.readUserInput(ConsoleMessage.WINNING_NUMBER);
  //     const WINNING_NUMBERS = winningNumbersInput.split(StaticValue.INPUT_SEPARATOR).map(Number);
  //     Validation.verifyLottoNumbers(WINNING_NUMBERS);
  //     await this.#handleBonusNumber(WINNING_NUMBERS);
  //   } catch (error) {
  //     OutputView.print(error.message);
  //     return this.#handleWinningNumbers();
  //   }
  // }

  // async #handleBonusNumber(winningNumbers) {
  //   try {
  //     const bonusNumberInput = await InputView.readUserInput(ConsoleMessage.BONUS_NUMBER);
  //     const BONUS_NUMBER = Number(bonusNumberInput);
  //     Validation.verifyBonusNumber(winningNumbers, BONUS_NUMBER);
  //     this.#lottoGame.setGameLottos(winningNumbers, BONUS_NUMBER);
  //   } catch (error) {
  //     OutputView.print(error.message);
  //     return this.#handleBonusNumber(winningNumbers);
  //   }
  // }

  // #handleGameResult() {
  //   const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
  //   OutputView.printResult(RANKS, PROFIT_RATE);
  // }

  // async #handleRestart() {
  //   try {
  //     const restartInput = await InputView.readUserInput(ConsoleMessage.RESTART);
  //     const RESPONSE = restartInput.toLowerCase().trim();
  //     Validation.verifyRestart(RESPONSE);
  //     this.#handleRestartReply(RESPONSE);
  //   } catch (error) {
  //     OutputView.print(error.message);
  //     return this.#handleRestart();
  //   }
  // }

  // #handleRestartReply(reply) {
  //   if (reply === StaticValue.RESTART_CONTROL) {
  //     this.startGame();
  //     return;
  //   }

  //   OutputView.close();
  // }
}

export default LottoGameController;
