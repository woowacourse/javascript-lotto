import LottoGame from '../domain/LottoGame.js';
import View from '../view/view.js';
import Validation from '../domain/Validation.js';
import { LOTTO_CONDITION } from '../constants/condition.js';
import { $, $$ } from '../utils/dom.js';

export default class LottoGameController {
  #lottoGame;
  #view;

  constructor() {
    this.#lottoGame = new LottoGame();
    this.#view = new View();
  }

  play() {
    this.#view.onClickPurchaseAmountSubmitButton((e) => this.#createLotto(e));
    this.#view.onClickWinningLottoSubmitButton((e) => this.#compareLotto(e));
  }

  #createLotto(e) {
    e.preventDefault();

    const purchaseAmount = this.#validatePurchaseAmount();
    if (!purchaseAmount) {
      return;
    }

    const lottoQuantity = purchaseAmount / LOTTO_CONDITION.lottoPrice;

    const eachLottoNumbers = Array.from({ length: lottoQuantity }, () => {
      const lottoNumbers = this.#lottoGame.generateLottoNumbers(LOTTO_CONDITION.lottoDigits);
      this.#lottoGame.makeLotto(lottoNumbers);

      return lottoNumbers;
    });

    this.#view.printLottoQuantity(lottoQuantity);
    this.#view.printEachLottoNumbers(eachLottoNumbers);
    this.#view.disableElements('.purchase-amount-input', '.purchase-amount-submit-button');
    this.#view.showElements('.winning-lotto-form');
  }

  #compareLotto(e) {
    e.preventDefault();

    const winningNumbers = this.#validateWinningNumbers();

    if (!winningNumbers) {
      return;
    }
  }

  #validatePurchaseAmount() {
    const purchaseAmount = $('.purchase-amount-input').value;

    try {
      Validation.validatePurchaseAmount(purchaseAmount);

      return Number(purchaseAmount);
    } catch ({ message }) {
      this.#view.showAlert(message);

      return;
    }
  }

  #validateWinningNumbers() {
    const $$winningNumberInputNodeList = $$('.winning-number-input');
    const winningNumbers = Array.from($$winningNumberInputNodeList, (node) => {
      return Number(node.value.trim());
    });

    try {
      Validation.validateWinningNumbers(winningNumbers);

      return winningNumbers;
    } catch ({ message }) {
      this.#view.showAlert(message);

      return;
    }
  }
}
