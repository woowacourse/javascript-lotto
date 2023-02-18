import LottoGame from './domain/LottoGame.js';
import validator from './domain/validator.js';
import view from './view/index.js';
import { FORMATTING_TYPE, MESSAGE } from './constants/index.js';

class LottoController {
  #lottoGame;

  #commandHandler = Object.freeze({
    y: this.startGame.bind(this),
    n: this.#exitGame.bind(this),
  });

  startGame() {
    this.#inputBudget();
  }

  async #inputBudget() {
    try {
      const budget = await view.input(MESSAGE.ASK_BUDGET);
      validator.throwErrorIfInvalidBudget(budget);
      this.#lottoGame = new LottoGame(budget);
    } catch ({ message }) {
      view.output(message);
      return this.#inputBudget();
    }
    this.#printBoughtLottos();
  }

  #printBoughtLottos() {
    const boughtLottos = this.#lottoGame.getBoughtLottos();
    view.output(boughtLottos, FORMATTING_TYPE.BOUGHT_LOTTOS);

    this.#inputLottoValues();
  }

  async #inputLottoValues() {
    const winningLotto = await this.#inputWinningLotto();
    const bonusNumber = await this.#inputBonusNumber();

    const formattedWinningLotto = winningLotto.split(',').map(Number);
    const formattedBonusNumber = Number(bonusNumber);

    this.#printScoreBoard(formattedWinningLotto, formattedBonusNumber);
  }

  async #inputWinningLotto() {
    try {
      const value = await view.input(MESSAGE.ASK_WINNING_LOTTO);
      validator.throwErrorIfInvalidWinningNumbers(value);
      return value;
    } catch ({ message }) {
      view.output(message);
      return this.#inputWinningLotto();
    }
  }

  async #inputBonusNumber() {
    try {
      const value = await view.input(MESSAGE.ASK_BONUS_NUMBER);
      validator.throwErrorIfInvalidBonusNumber(value);
      return value;
    } catch ({ message }) {
      view.output(message);
      return this.#inputBonusNumber();
    }
  }

  #printScoreBoard(winningLotto, bonusNumber) {
    const winningStatus = this.#lottoGame.getWinningStatus(winningLotto, bonusNumber);
    view.output(winningStatus, FORMATTING_TYPE.WINNING_STATUS);

    this.#printProfitRate();
  }

  #printProfitRate() {
    const profitRate = this.#lottoGame.getProfitRate();
    view.output(profitRate, FORMATTING_TYPE.PROFIT_RATE);

    this.#askRestart();
  }

  async #askRestart() {
    const userCommand = await view.input(MESSAGE.ASK_RESTART);
    this.#commandHandler[userCommand]();
  }

  #exitGame() {
    view.close();
  }
}

export default LottoController;
