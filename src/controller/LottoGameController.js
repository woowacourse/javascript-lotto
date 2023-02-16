const { PRICE_UNIT } = require('../constants/constants');
const BonusNumber = require('../domain/model/BonusNumber');
const Lottos = require('../domain/model/Lottos');
const WinningNumbers = require('../domain/model/WinningNumbers');
const exception = require('../utils/exception');
const Console = require('../view/Console');
const inputView = require('../view/inputView');

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
        const lottoCount = this.calcalateLottoCount(purchasePriceInput);
        this.#lottos = new Lottos(lottoCount);
      } catch (error) {
        Console.print(error.message);
        this.inputPurchasePrice();
      }
    });
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
      } catch (error) {
        Console.print(error.message);
        this.inputBonusNumber();
      }
    });
  }

  inputRestartCommand() {
    inputView.readRestartCommand((restartCommandInput) => {
      try {
        exception.checkRestartCommand(restartCommandInput);
        if (restartCommandInput === 'y') return this.restart();
        return Console.close();
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

  calcalateLottoCount(priceInput) {
    exception.checkPurchasePrice(priceInput);

    const price = Number(priceInput);

    return Math.floor(price / PRICE_UNIT);
  }
}

module.exports = LottoGameController;

new LottoGameController().inputWinningNumbers();
