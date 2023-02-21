// const InputView = require("./view/InputView");
// const OutputView = require("./view/OutputView");
// const LottoGame = require("./domain/LottoGame");
import Validation from "./Validation";
import { COMMAND } from "./constants";

class Controller {
  #lottoNumbers;
  #bonusNumber;
  #lottoGame;

  constructor() {
    this.inputPurchaseAmount();
  }

  async inputPurchaseAmount() {
    const amount = await InputView.readPurchaseAmount();
    try {
      Validation.purchaseAmount(+amount);
      this.makeLottoGame(+amount);
    } catch (error) {
      OutputView.printError(error);
      this.inputPurchaseAmount();
    }
  }

  makeLottoGame(amount) {
    this.#lottoGame = new LottoGame(amount);
    OutputView.printLotteries(this.#lottoGame.getLotteries());
    this.inputLottoNumbers();
  }

  async inputLottoNumbers() {
    const lottoNumbers = await InputView.readLottoNumbers();
    try {
      this.convertLotto(lottoNumbers);
      Validation.lottoNumbers(this.#lottoNumbers);
      this.inputBonusNumber();
    } catch (error) {
      OutputView.printError(error);
      this.inputLottoNumbers();
    }
  }

  convertLotto(lottoNumbers) {
    this.#lottoNumbers = lottoNumbers
      .split(",")
      .map((number) => +number.trim());
  }

  async inputBonusNumber() {
    const bonusNumber = await InputView.readBonusNumber();
    try {
      Validation.bonusNumber(this.#lottoNumbers, +bonusNumber);
      this.#bonusNumber = +bonusNumber;
      this.generateLottoGameResult();
    } catch (error) {
      OutputView.printError(error);
      this.inputBonusNumber();
    }
  }

  generateLottoGameResult() {
    const lottoResult = this.#lottoGame.calculateRankResult(
      this.#lottoNumbers,
      this.#bonusNumber
    );
    OutputView.printResult(lottoResult);
    this.inputRestartCommand();
  }

  async inputRestartCommand() {
    const command = await InputView.readRestartCommand();
    try {
      Validation.restartCommand(command);
      this.checkRestartCommand(command);
    } catch (error) {
      OutputView.printError(error);
      this.inputRestartCommand();
    }
  }

  checkRestartCommand(command) {
    if (command === COMMAND.RESTART) {
      OutputView.printRestart();
      this.inputPurchaseAmount();
    }
    if (command === COMMAND.QUIT) OutputView.printQuit();
  }
}

export default Controller;
