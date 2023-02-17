import InputView from './view/InputView.js';
import OutputView from './view/OutputView.js';
import Validation from './domain/Vaildation.js';
import LottoGame from './domain/LottoGame.js';
import Console from './utils/Console.js';
import { LOTTO_CONDITION, RESTART_COMMAND } from './constants/condition.js';

export default class LottoGameController {
  #lottoGame;

  constructor() {
    this.#lottoGame = new LottoGame();
  }

  async play() {
    await this.#createLotto();
    await this.#compareLotto();
    await this.#processRestart();
  }

  async #createLotto() {
    const purchaseAmount = await this.#requestPurchaseAmount();
    const lottoQuantity = purchaseAmount / LOTTO_CONDITION.lottoPrice;

    const eachLottoNumbers = Array.from({ length: lottoQuantity }, () => {
      const lottoNumbers = this.#lottoGame.generateLottoNumbers(LOTTO_CONDITION.lottoDigits);
      this.#lottoGame.makeLotto(lottoNumbers);

      return lottoNumbers;
    });

    OutputView.printLottoQuantity(lottoQuantity);
    OutputView.printEachLottoNumbers(eachLottoNumbers);
  }

  async #compareLotto() {
    const winningNumbers = await this.#requestWinningNumbers();
    const bonusNumber = await this.#requestBonusNumber(winningNumbers);

    const eachCompareResult = this.#lottoGame.getEachCompareResult(winningNumbers, bonusNumber);
    const statistics = this.#lottoGame.getStatistics(eachCompareResult);
    const totalPrizeMoney = this.#lottoGame.getTotalPrizeMoney(statistics);
    const yieldRatio = this.#lottoGame.getYieldRatio(totalPrizeMoney);

    OutputView.printStatistics(statistics);
    OutputView.printYieldRatio(yieldRatio);
  }

  async #processRestart() {
    const command = await this.#requestRestartCommand();

    if (command === RESTART_COMMAND.quit) {
      Console.close();
      return;
    }

    this.play();
  }

  async #requestPurchaseAmount() {
    const purchaseAmount = await InputView.readPurchaseAmount();

    try {
      Validation.validatePurchaseAmount(purchaseAmount);

      return Number(purchaseAmount);
    } catch ({ message }) {
      OutputView.printErrorMessage(message);

      return this.#requestPurchaseAmount();
    }
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

  async #requestBonusNumber(winningNumbers) {
    const bonusNumberInput = await InputView.readBonusNumber();
    const bonusNumber = Number(bonusNumberInput);

    try {
      Validation.validateBonusNumber(bonusNumber, winningNumbers);

      return bonusNumber;
    } catch ({ message }) {
      OutputView.printErrorMessage(message);

      return this.#requestBonusNumber(winningNumbers);
    }
  }

  async #requestRestartCommand() {
    const command = await InputView.readRestartCommand();

    try {
      Validation.validateRestartCommand(command);

      return command;
    } catch ({ message }) {
      OutputView.printErrorMessage(message);

      return this.#requestRestartCommand();
    }
  }
}
