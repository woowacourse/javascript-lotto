const { PRICE_UNIT, restartCommand } = require('../constants/constants');
const BonusNumber = require('../domain/model/BonusNumber');
const Lottos = require('../domain/model/Lottos');
const WinningNumbers = require('../domain/model/WinningNumbers');
const exception = require('../utils/exception');
const Console = require('../view/Console');
const inputView = require('../view/inputView');
const outputView = require('../view/outputView');

class LottoGameController {
  #lottos;

  #numbers = {
    winningNumbers: undefined,
    bonusNumber: undefined,
  };

  playGame() {
    this.inputPurchasePrice();
  }

  inputPurchasePrice() {
    inputView.readPurchasePrice((purchasePriceInput) => {
      try {
        const lottoCount = this.calculateLottoCount(purchasePriceInput);
        this.#lottos = new Lottos(lottoCount);
        this.showPurchasedLottos();
      } catch (error) {
        Console.print(error.message);
        this.inputPurchasePrice();
      }
    });
  }

  calculateLottoCount(priceInput) {
    exception.handlePurchasePrice(priceInput);

    const price = Number(priceInput);

    return Math.floor(price / PRICE_UNIT);
  }

  showPurchasedLottos() {
    outputView.printLottoCount(this.#lottos.getLottos().length);
    outputView.printLottoNumbers(this.#lottos.getLottos());

    this.inputWinningNumbers();
  }

  inputWinningNumbers() {
    inputView.readWinningNumbers((winningNumbersInput) => {
      try {
        this.#numbers.winningNumbers = new WinningNumbers(winningNumbersInput);
        this.inputBonusNumber();
      } catch (error) {
        Console.print(error.message);
        this.inputWinningNumbers();
      }
    });
  }

  inputBonusNumber() {
    inputView.readBonusNumber((bonusNumberinput) => {
      try {
        this.#numbers.bonusNumber = new BonusNumber(
          this.#numbers.winningNumbers.getNumbers(),
          bonusNumberinput
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
      this.#numbers.winningNumbers.getNumbers(),
      this.#numbers.bonusNumber.getNumber()
    );

    outputView.printStatistics(this.#lottos.getAllRanks());
    outputView.printProfitRate(this.#lottos.getProfitRate());

    this.inputRestartCommand();
  }

  inputRestartCommand() {
    inputView.readRestartCommand((restartCommandInput) => {
      try {
        exception.handleRestartCommand(restartCommandInput);
        if (restartCommandInput === restartCommand.YES) return this.restart();
        Console.close();
      } catch (error) {
        Console.print(error.message);
        this.inputRestartCommand();
      }
    });
  }

  restart() {
    this.#numbers.winningNumbers = undefined;
    this.#numbers.bonusNumber = undefined;
    this.#lottos = undefined;

    this.playGame();
  }
}

module.exports = LottoGameController;
