const { COMMAND } = require('../constant/setting');

const Comparer = require('../domain/Comparer');
const LottoMachine = require('../domain/LottoMachine');
const ProfitCalculator = require('../domain/ProfitCaculator');
const WinningLotto = require('../domain/WinningLotto');

const Console = require('../util/Console');
const InputView = require('../view/consoleView/InputView');
const OutputView = require('../view/consoleView/OutputView');
const Validator = require('../domain/Validator');

class LottoController {
  #lottos;

  #winningLotto;

  async start() {
    const purchaseAmount = await this.inputPurchaseAmount();
    OutputView.printEmptyLine();
    const winningNumber = await this.inputWinningNumber();
    OutputView.printEmptyLine();
    const bonusNumber = await this.inputBonusNumber(winningNumber);
    OutputView.printEmptyLine();

    this.#winningLotto = new WinningLotto(winningNumber, bonusNumber);
    this.printResult(purchaseAmount);
    this.inputRestartCommand();
  }

  async inputPurchaseAmount() {
    try {
      const purchaseAmount = await InputView.readPurchaseAmount();
      Validator.purchaseAmount(purchaseAmount);
      this.issueLottos(Number(purchaseAmount));
      return Number(purchaseAmount);
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
      return winningNumber.split(',').map(Number);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.inputWinningNumber();
    }
  }

  async inputBonusNumber(winningNumber) {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      Validator.bonusNumber(bonusNumber, winningNumber);
      return +bonusNumber;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.inputBonusNumber(winningNumber);
    }
  }

  printResult(purchaseAmount) {
    const ranking = new Comparer(this.#winningLotto, this.#lottos).getStatistics();
    const profitRate = new ProfitCalculator(ranking).getProfitRate(purchaseAmount);

    OutputView.printStatistics(ranking);
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
