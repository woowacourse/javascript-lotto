import { $ } from '../util/web/querySelector.js';
import { PROJECT_MODE, GAME_VALUE } from '../constants/index.js';
import PurchaseView from '../view/web/PurchaseView.js';
import WinningLottoInputView from '../view/web/WinningLottoInputView.js';
import ResultModalView from '../view/web/ResultModalView.js';
import InputCleaner from '../view/web/InputCleaner.js';
import ErrorView from '../view/web/ErrorView.js';
import LottoGame from '../domain/LottoGame.js';
import Validator from '../domain/Validator.js';

class WebLottoController {
  #lottoGame;
  #validator = new Validator(PROJECT_MODE.WEB);
  #purchaseView = new PurchaseView((budget) => this.handleBudget(budget));
  #winningLottoInputView = new WinningLottoInputView((winningLotto) =>
    this.handleWinningLotto(winningLotto)
  );
  #resultModalView = new ResultModalView(() => this.handleRestart());

  handleBudget(budget) {
    const budgetErrorView = new ErrorView($('#buyErrorArea'), $('#budgetInput'));

    try {
      this.#validator.throwErrorIfInvalidBudget(budget);

      budgetErrorView.hideErrorMessage();
      this.#lottoGame = new LottoGame(budget);
      this.#purchaseView.render(this.#lottoGame.getBoughtLottos());
      this.#winningLottoInputView.show();
    } catch ({ message }) {
      budgetErrorView.renderErrorMessage(message);
    }
  }

  handleWinningLotto(lottoFormData) {
    const winningLottoErrorView = new ErrorView(
      $('#winningNumbersErrorArea'),
      $('#firstNumberInput')
    );

    const stringifiedWinningLotto = this.#stringifyWinningLotto(lottoFormData);
    const winningLotto = this.#parseWinningLotto(stringifiedWinningLotto);
    const bonusNumber = this.#parseBonusNumber(lottoFormData);

    try {
      this.#validator.throwErrorIfInvalidWinningLotto(stringifiedWinningLotto);
      this.#validator.throwErrorIfInvalidBonusNumber(stringifiedWinningLotto, bonusNumber);

      winningLottoErrorView.hideErrorMessage();
      this.#showLottoGameResult(winningLotto, bonusNumber);
    } catch ({ message }) {
      winningLottoErrorView.renderErrorMessage(message);
      InputCleaner.clearWinningLottoInputs();
    }
  }

  #stringifyWinningLotto(lottoFormData) {
    const winningLottos = [];

    Array.from({ length: GAME_VALUE.LOTTO_SIZE }).forEach((_, index) => {
      const currentElementID = `number-${index + 1}`;
      winningLottos.push(
        lottoFormData[currentElementID] === '' ? '' : Number(lottoFormData[currentElementID])
      );
    });

    return winningLottos.join(',');
  }

  #parseWinningLotto(stringifiedWinningLotto) {
    return stringifiedWinningLotto.split(',').map(Number);
  }

  #parseBonusNumber(lottoFormData) {
    return Number(lottoFormData['bonus-number']);
  }

  #showLottoGameResult(winningLotto, bonusNumber) {
    const winningStatus = this.#lottoGame.getWinningStatus(winningLotto, bonusNumber);
    const profitRate = this.#lottoGame.getProfitRate();

    this.#resultModalView.displayResult(winningStatus, profitRate);
  }

  handleRestart() {
    this.#lottoGame = new LottoGame();
    this.#purchaseView.clear();
    this.#winningLottoInputView.hide();
    this.#resultModalView.hide();
    InputCleaner.clearAllInputs();
  }
}

export default WebLottoController;
