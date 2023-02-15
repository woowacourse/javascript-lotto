import LottoGame from './domain/LottoGame.js';
import view from './view/view.js';

class LottoController {
  #lottoGame;

  startGame() {
    this.#inputBudget();
  }

  async #inputBudget() {
    try {
      const value = view.input('구입금액을 입력해 주세요.');
      Validator.throwErrorIfInvalidWinningLotto(inputValue);
      this.#lottoGame = new LottoGame(value);
    } catch ({ message }) {
      view.print(message);
      return this.#inputWinningLotto.bind(this);
    }
    this.#inputLottoValues();
  }

  #printBoughtLottos() {
    // Print Lotto Status here
    this.#inputLottoValues();
  }

  async #inputLottoValues() {
    const winningLotto = await this.#inputWinningLotto();
    const bonusNumber = await this.#inputBonusNumber();

    this.#printScoreBoard(winningLotto, bonusNumber);
  }

  #inputWinningLotto() {
    try {
      const value = view.input();
      Validator.throwErrorIfInvalidWinningLotto(inputValue);
      return value;
    } catch ({ message }) {
      view.print(message);
      return this.#inputWinningLotto.bind(this);
    }
  }

  #inputBonusNumber() {
    try {
      const value = view.input();
      Validator.throwErrorIfInvalidBonusNumber(inputValue);
      return value;
    } catch ({ message }) {
      view.print(message);
      return this.#inputBonusNumber.bind(this);
    }
  }

  #printScoreBoard() {
    // print

    this.#printProfiteRate();
  }

  #printProfiteRate() {
    this.#askRestart();
  }

  #askRestart() {
    this.#exitGame();
  }

  #exitGame() {}
}

export default LottoController;
