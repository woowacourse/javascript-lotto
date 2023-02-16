const BonusNumber = require('./domain/BonusNumber');
const LottoMachine = require('./domain/LottoMachine');
const WinningNumbers = require('./domain/WinningNumbers');

const InputView = require('./view/InputView');
const OutputView = require('./view/OutputView');

class LottoGame {
  #lottoMachine;

  #winningLottos = [0, 0, 0, 0, 0, 0];

  validateBonusNumber(winningNumbers, bonusNumber) {
    if (this.#isDuplicateFor(winningNumbers, bonusNumber)) {
      throw new Error(
        '[ERROR] 당첨 번호와 보너스 번호에 중복이 존재할 수 없습니다.'
      );
    }
  }

  #isDuplicateFor(winningNumbers, bonusNumber) {
    return winningNumbers.includes(bonusNumber);
  }

  async play() {
    await this.inputPurchasePrice();
    this.showPurchasedLottos();
    await this.inputWinningNumbers();
    await this.inputBonusNumber();
    this.determineAllLottosRank();
    this.showWinningStatistics();
    await this.inputRestart();
  }

  async inputPurchasePrice() {
    try {
      const purchasePrice = await InputView.readPurchasePrice();
      this.#lottoMachine = new LottoMachine(parseInt(purchasePrice, 10));
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      await this.inputPurchasePrice();
    }
  }

  async showPurchasedLottos() {
    OutputView.printPurchasedLottos(this.#lottoMachine.lottos);
  }

  async inputWinningNumbers() {
    try {
      const winningNumbers = await InputView.readWinningNumbers();
      this.#winningNumbers = new WinningNumbers(winningNumbers);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      await this.inputWinningNumbers();
    }
  }

  async inputBonusNumber() {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      this.#bonusNumber = new BonusNumber(bonusNumber);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      await this.inputBonusNumber();
    }
  }

  showWinningStatistics() {
    OutputView.printStatistics(
      this.#winningLottos,
      this.calculateProfitRate(
        this.#winningLottos,
        this.#lottoMachine.lottos.length * 1000
      )
    );
  }

  async inputRestart() {
    try {
      const command = await InputView.readRestart();
      this.validateCommand(command);
      await this.executeCommand(command.toLowerCase());
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      await this.inputRestart();
    }
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
    await this.play();
  }
}

module.exports = LottoGame;
