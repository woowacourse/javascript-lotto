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

  async play() {
    await this.#createLotto();

    await this.#requestWinningNumbers();
  }

  async #createLotto() {
    const purchaseAmount = await this.#requestPurchaseAmount();
    const lottoQuantity = purchaseAmount / LOTTO_CONDITION.lottoPrice;

    Array.from({ length: lottoQuantity }, () => {
      const lottoNumbers = this.#lottoGame.generateLottoNumbers(LOTTO_CONDITION.lottoDigits);
      this.#lottoGame.makeLotto(lottoNumbers);
    });

    this.#printLottoQuantity();
    this.#printEachLottoNumbers();
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

  #printLottoQuantity() {
    const lottoQuantity = this.#lottoGame.getLottoQuantity();
    OutputView.printLottoQuantity(lottoQuantity);
  }

  #printEachLottoNumbers() {
    const eachLottoNumbers = this.#lottoGame.getEachLottoNumbers();
    OutputView.printEachLottoNumbers(eachLottoNumbers);
  }

  async #requestWinningNumbers() {
    const winningNumbersInput = await InputView.readWinningNumbers();
    const winningNumbers = winningNumbersInput
      .split(',')
      .map((numberInput) => Number(numberInput.trim()));

    try {
      Validation.validateWinningNumbers(winningNumbers);

      return winningNumbers;
    } catch ({ message }) {
      OutputView.printErrorMessage(message);

      return this.#requestWinningNumbers();
    }
  }

  async #requestBonusNumber() {
    const bonusNumber = await InputView.readBonusNumber();
  }
}
