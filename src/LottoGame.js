const LottoMachine = require('./domain/LottoMachine');
const WinningNumbers = require('./domain/WinningNumbers');
const BonusNumber = require('./domain/BonusNumber');
const LottoStatistics = require('./domain/LottoStatistics');

const InputView = require('./view/InputView');
const OutputView = require('./view/OutputView');

const { errorCheckFor } = require('./utils/errorCheckFor');

class LottoGame {
  #winningNumbers;

  #lottoMachine;

  #lottoStatistics;

  async successPayForLottoEvent() {
    const purchasePrice = await InputView.readPurchasePrice();
    this.#lottoMachine = new LottoMachine(parseInt(purchasePrice, 10));

    OutputView.printPurchasedLottos(this.#lottoMachine.lottos);

    await this.inputWinningNumbers();
  }

  async payForLotto() {
    await errorCheckFor(
      () => this.successPayForLottoEvent(),
      () => this.payForLotto()
    );
  }

  async successInputWinningNumbersEvent() {
    const winningNumbers = await InputView.readWinningNumbers();
    this.#winningNumbers = new WinningNumbers(winningNumbers);

    await this.inputBonusNumber(this.#winningNumbers);
  }

  async inputWinningNumbers() {
    await errorCheckFor(
      () => this.successInputWinningNumbersEvent(),
      () => this.inputWinningNumbers()
    );
  }

  async successInputBonusEvent(winningNumbers) {
    this.#lottoStatistics = new LottoStatistics(
      this.#winningNumbers,
      new BonusNumber(await InputView.readBonusNumber(), winningNumbers)
    );

    this.showLottoStatistics();
    await this.inputRestartQuitCommand();
  }

  async inputBonusNumber(winningNumbers) {
    await errorCheckFor(
      () => this.successInputBonusEvent(winningNumbers),
      () => this.inputBonusNumber(winningNumbers)
    );
  }

  showLottoStatistics() {
    const winningLottos = this.#lottoStatistics.determineAllLottosRank(
      this.#lottoMachine.lottos
    );
    const profitRate = this.#lottoStatistics.calculateProfitRate(
      winningLottos,
      this.#lottoMachine.lottos.length * 1000
    );
    OutputView.printStatistics(winningLottos, profitRate);
  }

  async successInputRestartQuitCommand() {
    const command = (await InputView.readRestart()).toLowerCase();
    this.validateCommand(command);
    await this.executeCommand(command);
  }

  async inputRestartQuitCommand() {
    await errorCheckFor(
      () => this.successInputRestartQuitCommand(),
      () => this.inputRestartQuitCommand()
    );
  }

  validateCommand(command) {
    if (!this.isValidCommand(command)) {
      throw new Error(
        '[ERROR] 올바른 명령어가 아닙니다. 재시작(y) / 종료(n)을 입력해 주세요.'
      );
    }
  }

  isValidCommand(command) {
    return ['y', 'n'].includes(command.toLowerCase());
  }

  async executeCommand(command) {
    if (command === 'y') {
      await this.restart();
    }

    if (command === 'n') {
      OutputView.quit();
    }
  }

  async restart() {
    await this.payForLotto();
  }
}

module.exports = LottoGame;
