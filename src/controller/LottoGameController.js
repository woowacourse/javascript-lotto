import { GameControlStaticValue, RequestMessage, ResultMessage } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
import Console from '../utils/Console.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Validation from '../utils/Validation.js';

class LottoGameController {
  #lottoGame = new LottoGame();

  async startGame() {
    await this.#setUserLottos();
    await this.#setWinningLotto();
    this.#showGameResult();
    await this.#askGameRestart();
  }

  async #setUserLottos() {
    const PURCHASE_COUNT = await this.#getPurchaseCount();
    this.#purchaseUserLottos(PURCHASE_COUNT);
  }

  #getPurchaseCount = async () => {
    const MONEY = await InputView.readUserInput(RequestMessage.PURCHASE_AMOUNT);
    const PURCHASE_COUNT = Number(MONEY) / GameControlStaticValue.PURCHASE_AMOUNT_UNIT;

    try {
      Validation.testPurchaseAmount(MONEY);
      OutputView.print(ResultMessage.purchaseCount(PURCHASE_COUNT));
      return PURCHASE_COUNT;
    } catch (error) {
      return this.#handleError(error.message, this.#getPurchaseCount);
    }
  };

  #purchaseUserLottos(purchaseCount) {
    this.#lottoGame.generateUserLottos(purchaseCount);
    const USER_LOTTOS = this.#lottoGame.getUserLottos();

    USER_LOTTOS.forEach(OutputView.print);
  }

  async #setWinningLotto() {
    const WINNING_NUMBERS = await this.#getWinningNumbers();
    const BONUS_NUMBER = await this.#getBonusNumber(WINNING_NUMBERS);

    this.#lottoGame.setGameLottos(WINNING_NUMBERS, BONUS_NUMBER);
  }

  #getWinningNumbers = async () => {
    const WINNING_NUMBER_INPUT = await InputView.readUserInput(RequestMessage.WINNING_NUMBER);
    const WINNING_NUMBERS = WINNING_NUMBER_INPUT.split(GameControlStaticValue.INPUT_SEPARATOR).map(
      Number,
    );

    try {
      Validation.testLottoNumbers(WINNING_NUMBERS);
      return WINNING_NUMBERS;
    } catch (error) {
      return this.#handleError(error.message, this.#getWinningNumbers);
    }
  };

  #getBonusNumber = async (winningNumbers) => {
    const BONUS_NUMBER_INPUT = await InputView.readUserInput(RequestMessage.BONUS_NUMBER);
    const BONUS_NUMBER = Number(BONUS_NUMBER_INPUT);

    try {
      Validation.testBonusNumber(winningNumbers, BONUS_NUMBER);
      return BONUS_NUMBER;
    } catch (error) {
      return this.#handleError(error.message, () => this.#getBonusNumber(winningNumbers));
    }
  };

  #showGameResult() {
    const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
    OutputView.printResult(RANKS, PROFIT_RATE);
  }

  #askGameRestart = async () => {
    const REPLY_INPUT = await InputView.readUserInput(RequestMessage.RESTART);
    const REPLY = REPLY_INPUT.toLowerCase().trim();

    try {
      Validation.testRestart(REPLY);
      this.#restartOrEndGame(REPLY);
    } catch (error) {
      await this.#handleError(error.message, this.#askGameRestart);
    }
  };

  #restartOrEndGame(reply) {
    if (reply === GameControlStaticValue.RESTART_BUTTON) {
      this.startGame();
      return;
    }

    this.#endGame();
  }

  #endGame() {
    Console.close();
  }

  #handleError(errorMessage, self) {
    OutputView.print(errorMessage);
    return self();
  }
}

export default LottoGameController;
