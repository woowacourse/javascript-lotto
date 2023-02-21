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
    this.#lottoGameView.addPurchaseSubmitEvent(this.#handlePurchase.bind(this));
    this.#lottoGameView.addGameNumbersSubmitEvent(this.#handleWinningNumbers.bind(this));
  }

  #handlePurchase(purchaseAmount) {
    try {
      Validation.verifyPurchaseAmount(purchaseAmount);
      const PURCHASE_COUNT = Number(purchaseAmount) / StaticValue.PURCHASE_AMOUNT_UNIT;
      this.#handleUserLottos(PURCHASE_COUNT);
    } catch ({ message }) {
      this.#lottoGameView.showError(this.#lottoGameView.purchaseInput, message);
      this.#lottoGameView.resetInput(this.#lottoGameView.purchaseInput);
    }
  }

  #handleUserLottos(purchaseCount) {
    this.#lottoGame.generateUserLottos(purchaseCount);
    const USER_LOTTO_LIST = this.#lottoGame.getUserLottoList();

    this.#lottoGameView.showStartContainer();
    this.#lottoGameView.showUserLottos(purchaseCount, USER_LOTTO_LIST);
  }

  #handleWinningNumbers(winningNumbers, bonusNumber) {
    try {
      Validation.verifyLottoNumbers(winningNumbers);
      this.#handleBonusNumber(winningNumbers, bonusNumber);
    } catch ({ message }) {
      this.#lottoGameView.showError(this.#lottoGameView.winningNumbersInputs[0], message);
      this.#lottoGameView.resetInput(this.#lottoGameView.winningNumbersInputs[0]);
      this.#lottoGameView.resetForm(this.#lottoGameView.gameNumbersForm);
    }
  }

  #handleBonusNumber(winningNumbers, bonusNumber) {
    try {
      Validation.verifyBonusNumber(winningNumbers, bonusNumber);
      this.#lottoGame.setGameLottos(winningNumbers, bonusNumber);
      this.#handleGameResult();
    } catch ({ message }) {
      this.#lottoGameView.showError(this.#lottoGameView.bonusNumberInput, message);
      this.#lottoGameView.resetInput(this.#lottoGameView.bonusNumberInput);
    }
  }

  #handleGameResult() {
    const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
    this.#lottoGameView.showResultModal();
    this.#lottoGameView.showProfitRate(PROFIT_RATE);
    this.#lottoGameView.showRanks(RANKS);
  }
}

export default LottoGameController;
