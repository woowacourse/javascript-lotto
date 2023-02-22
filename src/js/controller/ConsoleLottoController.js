import LottoGame from '../domain/LottoGame.js';
import Validator from '../domain/Validator.js';
import view from '../view/console/index.js';
import { FORMATTING_TYPE, QUESTION, PROJECT_MODE } from '../constants/index.js';

class ConsoleLottoController {
  #lottoGame;
  #validator = new Validator(PROJECT_MODE.CONSOLE);
  #commandHandler = Object.freeze({
    y: this.startGame.bind(this),
    n: this.#exitGame.bind(this),
  });

  startGame() {
    this.#inputBudget();
  }

  async #inputBudget() {
    try {
      const budget = await view.input(QUESTION.BUDGET);
      this.#validator.throwErrorIfInvalidBudget(budget);
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
      const winningLotto = await view.input(QUESTION.WINNING_LOTTO);
      this.#validator.throwErrorIfInvalidWinningLotto(winningLotto);
      return winningLotto;
    } catch ({ message }) {
      view.output(message);
      return this.#inputWinningLotto(winningLotto);
    }
  }

  async #inputBonusNumber(winningLotto) {
    try {
      const bonusNumber = await view.input(QUESTION.BONUS_NUMBER);
      this.#validator.throwErrorIfInvalidBonusNumber(winningLotto, bonusNumber);
      return bonusNumber;
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
    const userCommand = await view.input(QUESTION.RESTART);
    this.#commandHandler[userCommand]();
  }

  #exitGame() {
    view.close();
  }
}

export default ConsoleLottoController;
