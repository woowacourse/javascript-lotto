import { StaticValue } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
import Validation from '../utils/Validation.js';
import LottoGameView from '../view/LottoGameView.js';

class LottoGameController {
  #lottoGame = new LottoGame();
  #lottoGameView = new LottoGameView();

  startGame() {
    this.#bindEvents();
  }

  #bindEvents() {
    this.#lottoGameView.addPurchaseSubmitEvent(this.#handlePurchaseSubmit.bind(this));
    this.#lottoGameView.addWinningNumbersSubmitEvent(this.#handleWinningNumbers.bind(this));
  }

  #handlePurchaseSubmit(purchaseAmount) {
    try {
      Validation.verifyPurchaseAmount(purchaseAmount);
      const PURCHASE_COUNT = Number(purchaseAmount) / StaticValue.PURCHASE_AMOUNT_UNIT;
      this.#handleUserLottos(PURCHASE_COUNT);
    } catch ({ message }) {
      this.#lottoGameView.showErrorMessage('purchase', message);
      this.#handleReinputError(this.#lottoGameView.purchaseInput);
    }
  }

  #handleUserLottos(purchaseCount) {
    this.#lottoGame.generateUserLottos(purchaseCount);
    const USER_LOTTO_LIST = this.#lottoGame.getUserLottoList();

    this.#lottoGameView.showUserLottos(purchaseCount, USER_LOTTO_LIST);
  }

  #handleWinningNumbers(winningNumbers, bonusNumber) {
    try {
      Validation.verifyLottoNumbers(winningNumbers);
      this.#handleBonusNumber(winningNumbers, bonusNumber);
    } catch ({ message }) {
      this.#lottoGameView.showErrorMessage('game-numbers', message);
      this.#handleReinputError(this.#lottoGameView.winningNumbersInput);
      this.#lottoGameView.winningNumbersForm.reset();
    }
  }

  #handleBonusNumber(winningNumbers, bonusNumber) {
    try {
      const BONUS_NUMBER = Number(bonusNumber);
      Validation.verifyBonusNumber(winningNumbers, BONUS_NUMBER);
      this.#lottoGame.setGameLottos(winningNumbers, BONUS_NUMBER);
      this.#handleGameResult();
    } catch ({ message }) {
      this.#lottoGameView.showErrorMessage('game-numbers', message);
      this.#handleReinputError(this.#lottoGameView.bonusNumberInput);
    }
  }

  #handleGameResult() {
    const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
    this.#lottoGameView.showResultModal();
    this.#lottoGameView.showProfitRate(PROFIT_RATE);
    this.#lottoGameView.showRanks(RANKS);
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

  #handleReinputError(element) {
    element.classList.add('error-input');
    element.value = '';
    element.focus();
  }
}

export default LottoGameController;
