const InputView = require("./view/InputView");
const OutputView = require("./view/OutputView");
const LottoGame = require("./domain/LottoGame");
const Validation = require("./Validation");

class Controller {
  #lottoNumbers;

  constructor() {
    this.inputPurchaseAmount();
  }

  inputPurchaseAmount() {
    InputView.readPurchaseAmount(this.purchaseAmountHandler.bind(this));
  }

  purchaseAmountHandler(amount) {
    try {
      Validation.purchaseAmount(+amount);
      const lottoGame = new LottoGame(+amount);
      OutputView.printLotteries(lottoGame.getLotteries());
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
    } catch (error) {
      OutputView.printError(error);
      this.inputBonusNumber();
    }
  }
}

module.exports = Controller;
