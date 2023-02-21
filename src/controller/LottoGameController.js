import { GameControlStaticValue, RequestMessage } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
import Validation from '../utils/Validation.js';
import ConvertMessage from '../utils/Convertor.js';
import Input from '../view/Input.js';

class LottoGameController {
  #lottoGame = new LottoGame();

  #input = new Input();

  startGame() {
    this.#input.purchaseLottos(this.#getPurchaseCount);
    // await this.#setUserLottos();
    // await this.#setWinningLotto();
    // this.#showGameResult();
    // await this.#askGameRestart();
  }

  // async #setUserLottos() {
  //   const PURCHASE_COUNT = await this.#getPurchaseCount();
  //   this.#purchaseUserLottos(PURCHASE_COUNT);
  // }

  #getPurchaseCount = (money) => {
    const PURCHASE_COUNT = Number(money) / GameControlStaticValue.PURCHASE_AMOUNT_UNIT;

    try {
      Validation.testPurchaseAmount(money);
      this.#purchaseUserLottos(PURCHASE_COUNT);
    } catch (error) {
      alert(error.message);
    }
  };

  #purchaseUserLottos(purchaseCount) {
    const USER_LOTTOS = this.#lottoGame.generateUserLottos(purchaseCount);

    console.log(USER_LOTTOS);
  }

  // async #setWinningLotto() {
  //   const WINNING_NUMBERS = await this.#getWinningNumbers();
  //   const BONUS_NUMBER = await this.#getBonusNumber(WINNING_NUMBERS);

  //   this.#lottoGame.setGameLottos(WINNING_NUMBERS, BONUS_NUMBER);
  // }

  // #getWinningNumbers = async () => {
  //   const WINNING_NUMBER_INPUT = await InputView.readUserInput(RequestMessage.WINNING_NUMBER);
  //   const WINNING_NUMBERS = WINNING_NUMBER_INPUT.split(GameControlStaticValue.INPUT_SEPARATOR).map(
  //     Number,
  //   );

  //   try {
  //     Validation.testLottoNumbers(WINNING_NUMBERS);
  //     return WINNING_NUMBERS;
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // #getBonusNumber = async (winningNumbers) => {
  //   const BONUS_NUMBER_INPUT = await InputView.readUserInput(RequestMessage.BONUS_NUMBER);
  //   const BONUS_NUMBER = Number(BONUS_NUMBER_INPUT);

  //   try {
  //     Validation.testBonusNumber(winningNumbers, BONUS_NUMBER);
  //     return BONUS_NUMBER;
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // #showGameResult() {
  //   const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
  //   OutputView.printResult(RANKS, PROFIT_RATE);
  // }

  // #askGameRestart = async () => {
  //   const REPLY_INPUT = await InputView.readUserInput(RequestMessage.RESTART);
  //   const REPLY = REPLY_INPUT.toLowerCase().trim();

  //   try {
  //     Validation.testRestart(REPLY);
  //     this.#restartOrEndGame(REPLY);
  //   } catch (error) {
  //     alert(error.message);
  //   }
  // };

  // #restartOrEndGame(reply) {
  //   if (reply === GameControlStaticValue.RESTART_BUTTON) {
  //     this.startGame();
  //     return;
  //   }

  //   this.#endGame();
  // }

  // #endGame() {
  //   Console.close();
  // }
}

export default LottoGameController;
