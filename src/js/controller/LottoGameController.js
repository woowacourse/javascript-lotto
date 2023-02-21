const {
  PRICE_UNIT,
  RESTART_COMMAND,
  ERROR_MESSAGE,
} = require('../constants/constants');
const Lottos = require('../../domain/model/Lottos');
const WinningNumbers = require('../../domain/model/WinningNumbers');
const validator = require('../../domain/validation/validator');
// const inputView = require('../../view/inputView');
// const outputView = require('../../view/outputView');
const PurchasePriceView = require('../../view/PurchasePriceView');

export default class LottoGameController {
  #lottos;

  #winningNumbers;

  constructor() {
    this.view = {
      purchasePriceView: new PurchasePriceView(),
    };
  }

  playGame() {
    // this.inputPurchasePrice();
    this.inputPurchasePrice();
  }

  inputPurchasePrice(purchasePriceInput) {
    const lottoCount = this.calculateLottoCount(purchasePriceInput);
    console.log(lottoCount);
  }

  calculateLottoCount(priceInput) {
    return Math.floor(Number(priceInput) / PRICE_UNIT);
  }

  /*
  inputPurchasePrice() {
    inputView.readPurchasePrice((purchasePriceInput) => {
      const lottoCount = this.calculateLottoCount(purchasePriceInput);
      this.#lottos = new Lottos(lottoCount);

      this.showPurchasedLottos();
    });
  }

  showPurchasedLottos() {
    outputView.printLottoCount(this.#lottos.getLottos().length);
    outputView.printLottoNumbers(this.#lottos.getLottos());

    this.inputWinningNumbers();
  }

  inputWinningNumbers() {
    inputView.readWinningNumbers((winningNumbersInput) => {
      this.#winningNumbers = winningNumbersInput.split(',').map(Number);
      this.inputBonusNumber();
    });
  }

  inputBonusNumber() {
    inputView.readBonusNumber((bonusNumberInput) => {
      try {
        validator.bonusNumber(this.#winningNumbers, bonusNumberInput);
        this.#winningNumbers = new WinningNumbers(
          this.#winningNumbers,
          Number(bonusNumberInput)
        );

        this.showResult();
      } catch (error) {
        Console.print(error.message);
        this.inputBonusNumber();
      }
    });
  }

  showResult() {
    this.#lottos.calculateAllRanks(
      this.#winningNumbers.getWinningNumbers(),
      this.#winningNumbers.getBonusNumber()
    );

    outputView.printStatistics(this.#lottos.getAllRanks());
    outputView.printProfitRate(this.#lottos.getProfitRate());

    this.inputRestartCommand();
  }

  inputRestartCommand() {
    inputView.readRestartCommand((restartCommandInput) => {
      if (validator.isRestartCommandValid(restartCommandInput))
        return restartCommandInput === RESTART_COMMAND.YES
          ? this.restart()
          : Console.close();

      Console.print(ERROR_MESSAGE.RESTART_COMMAND_ERROR);
      this.inputRestartCommand();
    });
  }

  restart() {
    this.#winningNumbers = null;
    this.#lottos = null;

    this.playGame();
  }
  */
}

module.exports = LottoGameController;
