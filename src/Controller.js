const InputView = require("./view/InputView");
const OutputView = require("./view/OutputView");
const LottoGame = require("./domain/LottoGame");
const Validation = require("./Validation");
const { COMMAND } = require("./constants");

class Controller {
  #lottoNumbers;
  #bonusNumber;
  #lottoGame;

  constructor() {
    this.inputPurchaseAmount();
  }

  inputPurchaseAmount() {
    InputView.readPurchaseAmount(this.purchaseAmountHandler.bind(this));
  }

  purchaseAmountHandler(amount) {
    try {
      Validation.purchaseAmount(+amount);
      this.#lottoGame = new LottoGame(+amount);
      OutputView.printLotteries(this.#lottoGame.getLotteries());
      this.inputLottoNumbers();
    } catch (error) {
      OutputView.printError(error);
      this.inputPurchaseAmount();
    }
  }

  inputLottoNumbers() {
    InputView.readLottoNumbers(this.lottoNumbersHandler.bind(this));
  }

  lottoNumbersHandler(lottoNumbers) {
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

  inputBonusNumber() {
    InputView.readBonusNumber(this.bonusNumberHandler.bind(this));
  }

  bonusNumberHandler(bonusNumber) {
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

  inputRestartCommand() {
    InputView.readRestartCommand(this.restartCommandHandler.bind(this));
  }

  restartCommandHandler(command) {
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

module.exports = Controller;
