const { COMMAND } = require('./constant/setting');

const Comparer = require('./domain/Comparer');
const LottoMachine = require('./domain/LottoMachine');
const WinningLotto = require('./domain/WinningLotto');
const {
  validatePurchaseAmount,
  validateLottoNumber,
  validateWinningNumber,
  validateBonusNumber,
  validateRestartCommand,
} = require('./domain/validator');

const Console = require('./util/Console');
const InputView = require('./view/InputView');
const OutputView = require('./view/OutputView');
const convertToNumeric = require('./util/convertToNumeric');
const calculateProfitRate = require('./domain/calculateProfitRate');

class LottoController {
  #lottoMachine;

  #lottos;

  async start() {
    const purchaseAmount = await this.inputPurchaseAmount();
    this.#processLottoIssue(purchaseAmount);

    const winningLotto = await this.#makeWinningLotto();
    this.#processLottoComparison(winningLotto);

    const restartCommand = await this.inputRestartCommand();
    this.processRestartCommand(restartCommand);
  }

  async inputPurchaseAmount() {
    try {
      const purchaseAmount = convertToNumeric(await InputView.readPurchaseAmount());
      validatePurchaseAmount(purchaseAmount);
      return purchaseAmount;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.inputPurchaseAmount();
    }
  }

  #processLottoIssue(purchaseAmount) {
    this.#lottoMachine = new LottoMachine(purchaseAmount);
    this.#lottos = this.#lottoMachine.issueLottos();

    OutputView.printPurchaseStatus(this.#lottoMachine.getQuantity(), this.#lottos);
  }

  async inputWinningNumber() {
    try {
      const winningNumber = this.#convertToWinningNumber(await InputView.readWinningNumber());
      validateWinningNumber(winningNumber);
      return winningNumber;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.inputWinningNumber();
    }
  }

  #convertToWinningNumber(winningNumberInput) {
    return winningNumberInput.split(',').map((lottoNumberInput) => {
      const lottoNumber = convertToNumeric(lottoNumberInput);
      validateLottoNumber(lottoNumber);
      return lottoNumber;
    });
  }

  async inputBonusNumber(winningNumber) {
    try {
      const bonusNumber = convertToNumeric(await InputView.readBonusNumber());
      validateBonusNumber(bonusNumber, winningNumber);
      return bonusNumber;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return this.inputBonusNumber(winningNumber);
    }
  }

  async #makeWinningLotto() {
    const winningNumber = await this.inputWinningNumber();
    OutputView.printEmptyLine();
    const bonusNumber = await this.inputBonusNumber(winningNumber);
    OutputView.printEmptyLine();

    return new WinningLotto(winningNumber, bonusNumber);
  }

  #processLottoComparison(winningLotto) {
    const lottoComparer = new Comparer(winningLotto, this.#lottos);
    const ranking = lottoComparer.getRanking();
    const profitRate = calculateProfitRate(ranking, this.#lottoMachine.getQuantity());

    OutputView.printStatistics(ranking, profitRate);
  }

  async inputRestartCommand() {
    try {
      const restartCommand = await InputView.readRestartCommand();
      validateRestartCommand(restartCommand);
      return restartCommand;
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
