import LottoGame from './domain/LottoGame.js';
import validator from './domain/validator.js';
import view from './view/view.js';

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
      const budget = await view.input('> 구입금액을 입력해 주세요.');
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
    view.output(boughtLottos, 'BOUGHT_LOTTOS');

    this.#inputLottoValues();
  }

  async #inputLottoValues() {
    const winningLotto = await this.#inputWinningLotto();
    const bonusNumber = await this.#inputBonusNumber();

    this.#printScoreBoard(winningLotto.split(',').map(Number), bonusNumber);
  }

  async #inputWinningLotto() {
    try {
      const value = await view.input('\n> 당첨 번호를 입력해 주세요. ');
      validator.throwErrorIfInvalidWinningNumbers(value);
      return value;
    } catch ({ message }) {
      view.output(message);
      return this.#inputWinningLotto();
    }
  }

  async #inputBonusNumber() {
    try {
      const value = await view.input('\n> 보너스 번호를 입력해 주세요. ');
      validator.throwErrorIfInvalidBonusNumber(value);
      return value;
    } catch ({ message }) {
      view.output(message);
      return this.#inputBonusNumber();
    }
  }

  #printScoreBoard(winningLotto, bonusNumber) {
    const winningStatus = this.#lottoGame.getWinningStatus(winningLotto, bonusNumber);
    view.output(winningStatus, 'WINNING_STATUS');

    this.#printProfitRate();
  }

  #printProfitRate() {
    const profitRate = this.#lottoGame.getProfitRate();
    view.output(profitRate, 'PROFIT_RATE');

    this.#askRestart();
  }

  async #askRestart() {
    const userCommand = await view.input('\n> 다시 시작하시겠습니까? (y/n) ');
    this.#commandHandler[userCommand]();
  }

  #exitGame() {
    view.close();
  }
}

export default LottoController;
