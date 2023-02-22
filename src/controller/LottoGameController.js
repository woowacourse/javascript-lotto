import { GameControlStaticValue } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
import Validation from '../utils/Validation.js';
import Output from '../browserView/Output.js';
import MoneyInput from '../browserView/MoneyInput.js';
import LottoList from '../browserView/LottoList.js';

class LottoGameController {
  #lottoGame = new LottoGame();

  #output = new Output();

  #moneyInput = new MoneyInput();

  startGame() {
    this.#moneyInput.activate(this.#getPurchaseCount);
  }

  #getPurchaseCount = (money) => {
    const PURCHASE_COUNT = Number(money) / GameControlStaticValue.PURCHASE_AMOUNT_UNIT;

    try {
      Validation.testPurchaseAmount(money);
      this.#purchaseUserLottos(PURCHASE_COUNT);
    } catch (error) {
      console.log(error.message);
    }
  };

  #purchaseUserLottos(purchaseCount) {
    const USER_LOTTOS = this.#lottoGame.generateUserLottos(purchaseCount);

    const lottoList = new LottoList();
    lottoList.render(purchaseCount, USER_LOTTOS);
  }

  #setWinningLotto = (winningNumbers, bonusNumber) => {
    try {
      Validation.testLottoNumbers(winningNumbers);
      Validation.testBonusNumber(winningNumbers, bonusNumber);
      this.#lottoGame.setGameLottos(winningNumbers, bonusNumber);
      this.#showGameResult();
    } catch (error) {
      console.log(error.message);
    }
  };

  #showGameResult() {
    const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
    this.#output.renderResultModal(RANKS, PROFIT_RATE);
  }
}

export default LottoGameController;
