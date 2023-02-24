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
    this.#initEvents();
  }

  #initEvents() {
    this.#view.onClickPurchaseAmountSubmitButton(this.#createLotto.bind(this));
    this.#view.onClickWinningLottoSubmitButton(this.#compareLotto.bind(this));
    this.#view.onClickRestartButton(this.#initLottos.bind(this));
    this.#view.onClickModalCloseButton();
  }

  #createLotto(purchaseAmountInput) {
    try {
      Validation.validatePurchaseAmount(purchaseAmountInput);
    } catch ({ message }) {
      this.#view.showAlert(message);
      this.#view.initPurchaseAmountInput();

      return;
    }

    const lottoQuantity = Number(purchaseAmountInput) / LOTTO_CONDITION.lottoPrice;
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

  #compareLotto({ winningNumbersInput, bonusNumberInput }) {
    try {
      Validation.validateWinningNumbers(winningNumbersInput);
      Validation.validateBonusNumber(bonusNumberInput, winningNumbersInput);
    } catch ({ message }) {
      this.#view.showAlert(message);

      return;
    }

    const winningNumbers = winningNumbersInput.map(Number);
    const bonusNumber = Number(bonusNumberInput);

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
}
