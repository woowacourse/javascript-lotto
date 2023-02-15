import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import Validation from './Vaildation.js';
import LottoGame from './LottoGame.js';
import { LOTTO_CONDITION } from '../constants/condition.js';

export default class LottoGameController {
  #lottoGame;

  constructor() {
    this.#lottoGame = new LottoGame();
  }

  play() {
    this.#createLotto();
  }

  async #createLotto() {
    const purchaseAmount = await this.#requestPurchaseAmount();
    const lottoQuantity = purchaseAmount / LOTTO_CONDITION.lottoPrice;

    Array.from({ length: lottoQuantity }, () => {
      const lottoNumbers = this.#lottoGame.generateLottoNumbers(LOTTO_CONDITION.lottoDigits);
      this.#lottoGame.makeLotto(lottoNumbers);
    });
  }

  async #requestPurchaseAmount() {
    const purchaseAmount = await InputView.readPurchaseAmount();

    try {
      Validation.isValidPurchaseAmount(purchaseAmount);

      return Number(purchaseAmount);
    } catch ({ message }) {
      OutputView.printErrorMessage(message);

      return this.#requestPurchaseAmount();
    }
  }
}
