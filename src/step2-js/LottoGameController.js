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

  initEvents() {
    this.#view.onClickPurchaseAmountSubmitButton(() => this.#createLotto());
    this.#view.onClickWinningLottoSubmitButton(() => this.#compareLotto());
    this.#view.onClickRestartButton(() => this.#initLottos());
    this.#view.onClickModalCloseButton();
  }

  #createLotto() {
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
    this.#view.disableElements($('.purchase-amount-input'), $('.purchase-amount-submit-button'));
    this.#view.showElements('.winning-lotto-form');
  }

  #compareLotto() {
    const winningNumbers = this.#validateWinningNumbers();
    const bonusNumber = this.#validateBonusNumbers(winningNumbers);

    if (!winningNumbers || !bonusNumber) {
      return;
    }

    const eachCompareResult = this.#lottoGame.getEachCompareResult(winningNumbers, bonusNumber);
    const statistics = this.#lottoGame.getStatistics(eachCompareResult);
    const totalPrizeMoney = this.#lottoGame.getTotalPrizeMoney(statistics);
    const yieldRatio = this.#lottoGame.getYieldRatio(totalPrizeMoney);

    this.#view.printStatistics(statistics);
    this.#view.printYieldRatio(yieldRatio);
    this.#view.disableElements(
      ...$$('.winning-number-input'),
      $('.bonus-number-input'),
      $('.winning-lotto-submit-button')
    );
    this.#view.showElements('.result-modal');
  }

  #initLottos() {
    this.#lottoGame.initLottos();
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

  #validateBonusNumbers(winningNumbers) {
    const bonusNumberInput = $('.bonus-number-input').value;
    const bonusNumber = Number(bonusNumberInput);

    try {
      Validation.validateBonusNumber(bonusNumber, winningNumbers);

      return bonusNumber;
    } catch ({ message }) {
      this.#view.showAlert(message);

      return;
    }
  }
}
