import { GameControlStaticValue } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
import Validation from '../utils/Validation.js';
import Input from '../browserView/Input.js';
import Output from '../browserView/Output.js';

class LottoGameController {
  #lottoGame = new LottoGame();

  #input = new Input();

  #output = new Output();

  startGame() {
    this.#input.purchaseLottos(this.#getPurchaseCount);
    this.#input.seeResult(this.#setWinningLotto);
  }

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

    this.#output.renderLottosField(purchaseCount, USER_LOTTOS);
    this.#output.renderLottoInputField();
  }

  #setWinningLotto = (winningNumbers, bonusNumber) => {
    try {
      Validation.testLottoNumbers(winningNumbers);
      Validation.testBonusNumber(winningNumbers, bonusNumber);
      this.#lottoGame.setGameLottos(winningNumbers, bonusNumber);
    } catch (error) {
      alert(error.message);
    }
  };

  // #showGameResult() {
  //   const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
  //   OutputView.printResult(RANKS, PROFIT_RATE);
  // }

  // #askGameRestart = () => {
  //   const REPLY_INPUT = InputView.readUserInput(RequestMessage.RESTART);
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
