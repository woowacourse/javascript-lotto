import LottoGame from './domain/LottoGame.js';
import validator from './domain/validator.js';

import view from './view/view.js';

import { FORMATTING_TYPE, MESSAGE, COMMAND } from './constants/index.js';

class LottoController {
  #lottoGame;

  #commandHandler = Object.freeze({
    [COMMAND.RETRY]: this.startGame.bind(this),
    [COMMAND.EXIT]: this.#exitGame.bind(this),
  });

  startGame() {
    this.#inputBudget();
  }

  async #inputBudget() {
    try {
      const budget = await view.input(MESSAGE.ASK_BUDGET);
      validator.throwErrorIfInvalidBudget(budget);
      this.#lottoGame = new LottoGame(budget);
      this.#printBoughtLottos();
    } catch ({ message }) {
      this.handleCaughtError(message, this.#inputBudget.bind(this));
    }
  }

  #printBoughtLottos() {
    const boughtLottos = this.#lottoGame.getBoughtLottos();
    view.output(boughtLottos, FORMATTING_TYPE.BOUGHT_LOTTOS);

    this.#inputLottoValues();
  }

  async #inputLottoValues() {
    const winningNumber = await this.#inputWinningNumber();
    const bonusNumber = await this.#inputBonusNumber();

    const winningNumberToNumberArray = winningNumber.split(',').map(Number);

    this.#printScoreBoard(winningNumberToNumberArray, Number(bonusNumber));
  }

  async #inputWinningNumber() {
    try {
      const winningNumber = await view.input(MESSAGE.ASK_WINNING_LOTTO);
      validator.throwErrorIfInvalidWinningNumbers(winningNumber);
      return winningNumber;
    } catch ({ message }) {
      return this.handleCaughtError(message, this.#inputWinningNumber.bind(this));
    }
  }

  async #inputBonusNumber(winningNumber) {
    try {
      const bonusNumber = await view.input(MESSAGE.ASK_BONUS_NUMBER);
      validator.throwErrorIfInvalidBonusNumber(bonusNumber);
      return bonusNumber;
    } catch ({ message }) {
      return this.handleCaughtError(message, this.#inputBonusNumber.bind(this, winningNumber));
    }
  }

  #printScoreBoard(winningNumber, bonusNumber) {
    const winningStatus = this.#lottoGame.getWinningStatus(winningNumber, bonusNumber);
    view.output(winningStatus, FORMATTING_TYPE.WINNING_STATUS);

    this.#printProfitRate();
  }

  #printProfitRate() {
    const profitRate = this.#lottoGame.getProfitRate();
    view.output(profitRate, FORMATTING_TYPE.PROFIT_RATE);

    this.#askRetry();
  }

  async #askRetry() {
    try {
      const retryCommand = await view.input(MESSAGE.ASK_RETRY);
      validator.throwErrorIfInvalidRetryCommand(retryCommand);
      this.#commandHandler[retryCommand]();
    } catch ({ message }) {
      this.handleCaughtError(message, this.#askRetry.bind(this));
    }
  }

  #exitGame() {
    view.close();
  }

  handleCaughtError(message, callback) {
    view.output(message);
    return callback();
  }
}

export default LottoController;
