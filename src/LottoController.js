const { COMMAND } = require('./constant/setting');

const Comparer = require('./domain/Comparer');
const LottoMachine = require('./domain/LottoMachine');
const ProfitCalculator = require('./domain/ProfitCaculator');
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

class LottoController {
  #lottos;

  #winningLotto;

  async start() {
    const purchaseAmount = await this.inputPurchaseAmount();
    this.issueLottos(purchaseAmount);
    OutputView.printEmptyLine();
    const winningNumber = await this.inputWinningNumber();
    OutputView.printEmptyLine();
    const bonusNumber = await this.inputBonusNumber(winningNumber);
    OutputView.printEmptyLine();

    this.#winningLotto = new WinningLotto(winningNumber, bonusNumber);
    this.printResult(purchaseAmount);

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

  printResult(purchaseAmount) {
    const ranking = new Comparer(this.#winningLotto, this.#lottos).getRanking();
    const profitRate = new ProfitCalculator(ranking).getProfitRate(purchaseAmount);

    OutputView.printRanking(ranking);
    OutputView.printProfitRate(profitRate);
    OutputView.printEmptyLine();
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
