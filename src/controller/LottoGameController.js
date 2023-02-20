const { PRICE_UNIT } = require('../constants/constants');
const Lottos = require('../domain/model/Lottos');
const WinningLotto = require('../domain/model/WinningLotto');
const exception = require('../utils/exception');
const Console = require('../view/Console');
const inputView = require('../view/inputView');
const outputView = require('../view/outputView');

class LottoGameController {
  #lottos;

  #winningLotto;

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

  showPurchasedLottos() {
    outputView.printLottoCount(this.#lottos.getLottos().length);
    outputView.printLottoNumbers(this.#lottos.getLottos());

    this.inputWinningNumbers();
  }

  inputWinningNumbers() {
    inputView.readWinningNumbers((winningNumbersInput) => {
      try {
        exception.checkWinningNumbers(winningNumbersInput);
        this.inputBonusNumber(winningNumbersInput.split(',').map(Number));
      } catch (error) {
        Console.print(error.message);
        this.inputWinningNumbers();
      }
    });
  }

  inputBonusNumber(winningNumbers) {
    inputView.readBonusNumber((bonusNumberinput) => {
      try {
        this.#winningLotto = new WinningLotto(winningNumbers, bonusNumberinput);
        this.showResult();
      } catch (error) {
        Console.print(error.message);
        this.inputBonusNumber();
      }
    });
  }

  showResult() {
    this.#lottos.calculateAllRanks(
      this.#winningLotto.getWinningNumbers(),
      this.#winningLotto.getBonusNumber()
    );

    outputView.printStatistics(this.#lottos.getAllRanks());
    outputView.printProfitRate(this.#lottos.getProfitRate());

    this.inputRestartCommand();
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
    this.#lottos = undefined;
    this.#winningLotto = undefined;

    this.playGame();
  }

  calculateLottoCount(priceInput) {
    exception.checkPurchasePrice(priceInput);

    const price = Number(priceInput);

    return Math.floor(price / PRICE_UNIT);
  }
}

module.exports = LottoGameController;
