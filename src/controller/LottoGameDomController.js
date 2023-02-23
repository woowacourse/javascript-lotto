import { GameControlStaticValue } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
import Validation from '../utils/Validation.js';
import MoneyInput from '../browserView/MoneyInput.js';
import LottoList from '../browserView/LottoList.js';
import LottoInput from '../browserView/LottoInput.js';
import ResultModal from '../browserView/ResultModal.js';

class LottoGameDomController {
  #lottoGame = new LottoGame();

  startGame() {
    MoneyInput.activate(this.#getPurchaseCount);
    LottoInput.activate(this.#setWinningLotto);
    ResultModal.activate(this.#resetGame);
  }

  #getPurchaseCount = (money) => {
    const PURCHASE_COUNT = Number(money) / GameControlStaticValue.PURCHASE_AMOUNT_UNIT;

    try {
      Validation.testPurchaseAmount(money);
      const USER_LOTTOS = this.#lottoGame.generateUserLottos(PURCHASE_COUNT);
      this.#showLottoList(PURCHASE_COUNT, USER_LOTTOS);
    } catch (error) {
      alert(error.message);
    }
  };

  #showLottoList(purchaseCount, userLottos) {
    LottoList.render(purchaseCount, userLottos);
    LottoInput.render();
  }

  #setWinningLotto = (winningNumbers, bonusNumber) => {
    try {
      Validation.testLottoNumbers(winningNumbers);
      Validation.testBonusNumber(winningNumbers, bonusNumber);
      this.#lottoGame.setGameLottos(winningNumbers, bonusNumber);
      this.#showGameResult();
    } catch (error) {
      alert(error.message);
    }
  };

  #showGameResult() {
    const { RANKS, PROFIT_RATE } = this.#lottoGame.getResult();
    ResultModal.render(RANKS, PROFIT_RATE);
  }

  #resetGame = () => {
    MoneyInput.reset();
    LottoList.reset();
    LottoInput.reset();
  };
}

export default new LottoGameDomController();
