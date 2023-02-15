const InputView = require("./view/InputView");
const OutputView = require("./view/OutputView");
const LottoGame = require("./domain/LottoGame");
const Validation = require("./Validation");

class Controller {
  constructor() {
    this.inputPurchaseAmount();
  }

  inputPurchaseAmount() {
    InputView.readPurchaseAmount(this.purchaseAmountHandler.bind(this));
  }

  purchaseAmountHandler(amount) {
    try {
      Validation.purchaseAmount(+amount);
      const lottoGame = new LottoGame(amount);
      OutputView.printLotteries(lottoGame.getLotteries());
    } catch (error) {
      OutputView.printError(error);
      this.inputPurchaseAmount();
    }
  }
}

module.exports = Controller;
