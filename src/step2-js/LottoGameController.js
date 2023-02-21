import LottoGame from '../domain/LottoGame.js';
import View from '../view/view.js';
import Validation from './Validation';
import { LOTTO_CONDITION } from '../constants/condition.js';
import { $ } from '../utils/dom.js';

export default class LottoGameController {
  #lottoGame;
  #view;

  constructor() {
    this.#lottoGame = new LottoGame();
    this.#view = new View();
  }

  play() {
    this.#view.onClickPurchaseAmountSubmitButton((e) => this.#createLotto(e));
  }

  #createLotto(e) {
    e.preventDefault();

    const purchaseAmount = $('.purchase-amount-input').value;
    const { isValid, message } = Validation.validatePurchaseAmount(purchaseAmount);

    if (!isValid) {
      this.#view.showAlert(message);
      return;
    }

    const lottoQuantity = purchaseAmount / LOTTO_CONDITION.lottoPrice;

    const eachLottoNumbers = Array.from({ length: lottoQuantity }, () => {
      const lottoNumbers = this.#lottoGame.generateLottoNumbers(LOTTO_CONDITION.lottoDigits);
      this.#lottoGame.makeLotto(lottoNumbers);

      return lottoNumbers;
    });
  }
}
