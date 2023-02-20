import { StaticValue } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
import Validation from '../utils/Validation.js';
import LottoGameView from '../view/LottoGameView.js';

class LottoGameController {
  #lottoGame = new LottoGame();
  #lottoGameView = new LottoGameView();

  startGame() {
    this.#bindPurchaseEvent();
    this.#bindWinningNumbersEvent();
  }

  #bindPurchaseEvent() {
    this.#lottoGameView.addPurchaseSubmitEvent(this.#handlePurchaseSubmit.bind(this));
  }
  

  #handlePurchaseSubmit(purchaseAmount) {
    try {
      Validation.verifyPurchaseAmount(purchaseAmount);
      const PURCHASE_COUNT = Number(purchaseAmount) / StaticValue.PURCHASE_AMOUNT_UNIT;
      this.#handleUserLottos(PURCHASE_COUNT);
    } catch ({ message }) {
      this.#lottoGameView.purchaseInput.classList.add('error-input');
      this.#lottoGameView.showErrorMessage('purchase', message);
      this.#lottoGameView.purchaseInput.value = '';
      this.#lottoGameView.purchaseInput.focus();
    }
  }

  #handleUserLottos(purchaseCount) {
    this.#lottoGame.generateUserLottos(purchaseCount);
    const USER_LOTTO_LIST = this.#lottoGame.getUserLottoList();

    this.#lottoGameView.showUserLottos(purchaseCount, USER_LOTTO_LIST);
  }

  #bindWinningNumbersEvent() {
    this.#lottoGameView.addWinningNumbersSubmitEvent(this.#handleWinningNumbers.bind(this));
  }

  #handleWinningNumbers(winningNumbers, bonusNumber) {
    try {
      Validation.verifyLottoNumbers(winningNumbers);
      this.#handleBonusNumber(winningNumbers, bonusNumber);
    } catch ({ message }) {
      this.#lottoGameView.winningNumbersInput.classList.add('error-input');
      this.#lottoGameView.showErrorMessage('game-numbers', message);
      this.#lottoGameView.winningNumbersForm.reset();
      this.#lottoGameView.winningNumbersInput.focus();
    }
  }

  #handleBonusNumber(winningNumbers, bonusNumber) {
    try {
      const BONUS_NUMBER = Number(bonusNumber);
      Validation.verifyBonusNumber(winningNumbers, BONUS_NUMBER);
      this.#lottoGame.setGameLottos(winningNumbers, BONUS_NUMBER);
      this.#handleGameResult();
    } catch ({ message }) {
      this.#lottoGameView.bonusNumberInput.classList.add('error-input');
      this.#lottoGameView.showErrorMessage('game-numbers', message);
      this.#lottoGameView.bonusNumberInput.value = '';
      this.#lottoGameView.bonusNumberInput.focus();
    }
  }

  #handleGameResult() {
    const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
    this.#lottoGameView.showResultModal();
    this.#lottoGameView.showProfitRate(PROFIT_RATE);
  }

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
