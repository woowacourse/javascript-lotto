import { GameControlStaticValue } from '../constants/Constants.js';
import LottoGame from '../domain/LottoGame.js';
import Validation from '../utils/Validation.js';
import MoneyInput from '../browserView/MoneyInput.js';
import LottoList from '../browserView/LottoList.js';
import LottoInput from '../browserView/LottoInput.js';
import ResultModal from '../browserView/ResultModal.js';

class LottoGameController {
  #lottoGame = new LottoGame();

  #moneyInput = new MoneyInput();

  #lottoList = new LottoList();

  #lottoInput = new LottoInput();

  #resultModal = new ResultModal();

  startGame() {
    this.#moneyInput.activate(this.#getPurchaseCount);
    this.#lottoInput.activate(this.#setWinningLotto);
    this.#resultModal.activate();
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

    this.#lottoList.render(purchaseCount, USER_LOTTOS);
    this.#lottoInput.render();
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
    this.#resultModal.render(RANKS, PROFIT_RATE);
  }
}

export default LottoGameController;
