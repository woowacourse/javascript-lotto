const { COMMAND } = require('./constant/setting');
const Comparer = require('./domain/Comparer');
const LottoMachine = require('./domain/LottoMachine');
const ProfitCalculator = require('./domain/ProfitCaculator');
const Validator = require('./domain/Validator');
const Console = require('./util/Console');
const InputView = require('./view/InputView');
const OutputView = require('./view/OutputView');

class LottoController {
  #lottos;

  #winningNumber;

  #bonusNumber;

  async start() {
    const purchaseAmount = await this.inputPurchaseAmount();
    OutputView.printEmptyLine();

    await this.inputWinningNumber();
    OutputView.printEmptyLine();
    await this.inputBonusNumber();
    OutputView.printEmptyLine();

    this.printResult(purchaseAmount);
    this.inputRestartCommand();
  }

  async inputPurchaseAmount() {
    try {
      const purchaseAmount = await InputView.readPurchaseAmount();
      Validator.purchaseAmount(purchaseAmount);
      this.issueLottos(+purchaseAmount);
      return +purchaseAmount;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.inputPurchaseAmount();
    }
  }

  issueLottos(purchaseAmount) {
    const lottoMachine = new LottoMachine(purchaseAmount);
    OutputView.printPurchaseQuantity(lottoMachine.getQuantity());
    this.#lottos = Array.from({ length: lottoMachine.getQuantity() }, () =>
      lottoMachine.issueLotto(),
    );
    OutputView.printLottos(this.#lottos);
  }

  async inputWinningNumber() {
    try {
      const winningNumber = await InputView.readWinningNumber();
      Validator.winningNumber(winningNumber);
      this.#winningNumber = winningNumber.split(',').map(Number);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.inputWinningNumber();
    }
  }

  async inputBonusNumber() {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      Validator.bonusNumber(bonusNumber, this.#winningNumber);
      this.#bonusNumber = +bonusNumber;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.inputBonusNumber();
    }
  }

  printResult(purchaseAmount) {
    const ranking = new Comparer(this.#winningNumber, this.#bonusNumber, this.#lottos).getRanking();
    const profitRate = new ProfitCalculator(ranking).getProfitRate(purchaseAmount);

    OutputView.printRanking(ranking);
    OutputView.printProfitRate(profitRate);
    OutputView.printEmptyLine();
  }

  async inputRestartCommand() {
    try {
      const restartCommand = await InputView.readRestartCommand();
      Validator.restartCommand(restartCommand);
      this.processRestartCommand(restartCommand);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.inputRestartCommand();
    }
  }

  processRestartCommand(restartCommand) {
    if (restartCommand === COMMAND.YES) {
      this.start();
    }
    if (restartCommand === COMMAND.NO) {
      Console.close();
    }
  }
}

module.exports = LottoController;
