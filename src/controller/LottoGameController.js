import { StaticValue } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
import LottoGameView from '../view/LottoGameView.js';
import LottoResultView from '../view/LottoResultView.js';
import Validation from '../utils/Validation.js';
import ViewUtils from '../utils/ViewUtils.js';

class LottoGameController {
  #lottoGame = new LottoGame();
  #gameView = new LottoGameView();
  #resultView = new LottoResultView();

  startGame() {
    this.#bindEvents();
  }

  #bindEvents() {
    this.#gameView.addPurchaseSubmitEvent(this.#handlePurchase.bind(this));
    this.#gameView.addGameNumbersSubmitEvent(this.#handleWinningNumbers.bind(this));
    this.#resultView.addRestartButtonClickEvent(this.#handleRestart.bind(this));
  }

  #handlePurchase(purchaseAmount) {
    try {
      Validation.verifyPurchaseAmount(purchaseAmount);
      const PURCHASE_COUNT = Number(purchaseAmount) / StaticValue.PURCHASE_AMOUNT_UNIT;
      this.#handleUserLottos(PURCHASE_COUNT);
    } catch ({ message }) {
      ViewUtils.resetInput(this.#gameView.purchaseInput);
      ViewUtils.focusElement(this.#gameView.purchaseInput);
      ViewUtils.showError(this.#gameView.purchaseInput, message);
    }
  }

  #handleUserLottos(purchaseCount) {
    this.#lottoGame.generateUserLottos(purchaseCount);
    const USER_LOTTO_LIST = this.#lottoGame.getUserLottoList();

    this.#gameView.showStartContainer();
    this.#gameView.showUserLottos(purchaseCount, USER_LOTTO_LIST);
  }

  #handleWinningNumbers(winningNumbers, bonusNumber) {
    try {
      Validation.verifyLottoNumbers(winningNumbers);
      this.#handleBonusNumber(winningNumbers, bonusNumber);
    } catch ({ message }) {
      ViewUtils.resetForm(this.#gameView.gameNumbersForm);
      ViewUtils.focusElement(this.#gameView.winningNumbersInputs[0]);
      ViewUtils.showError(this.#gameView.winningNumbersInputs[0], message);

    }
  }

  #handleBonusNumber(winningNumbers, bonusNumber) {
    try {
      Validation.verifyBonusNumber(winningNumbers, bonusNumber);
      this.#lottoGame.setGameLottos(winningNumbers, bonusNumber);
      this.#handleGameResult();
    } catch ({ message }) {
      ViewUtils.showError(this.#gameView.bonusNumberInput, message);
      ViewUtils.focusElement(this.#gameView.bonusNumberInput);
      ViewUtils.resetInput(this.#gameView.bonusNumberInput);
    }
  }

  #handleGameResult() {
    const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
    this.#resultView.showResultModal();
    this.#resultView.showProfitRate(PROFIT_RATE);
    this.#resultView.showRanks(RANKS);
  }

  #handleRestart() {
    this.#gameView.restart();
    this.#resultView.restart();
  }
}

export default LottoGameController;
