const BonusNumber = require('./domain/BonusNumber');
const LottoMachine = require('./domain/LottoMachine');
const WinningNumbers = require('./domain/WinningNumbers');

const InputView = require('./view/InputView');
const OutputView = require('./view/OutputView');

class LottoGame {
  #lottoMachine;

  #winningNumbers;

  #bonusNumber;

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

  determineAllLottosRank() {
    this.#lottoMachine.lottos.forEach((lotto) => {
      this.#winningLottos[
        this.determineLottoRank(lotto, {
          winningNumbers: this.#winningNumbers.winningNumbers,
          bonusNumber: this.#bonusNumber.bonusNumber,
        }) - 1
      ] += 1;
    });
  }

  determineLottoRank(lotto, { winningNumbers, bonusNumber }) {
    if (this.calculateMatchCount(lotto, winningNumbers) === 6) {
      return 1;
    }

    if (
      this.calculateMatchCount(lotto, winningNumbers) === 5 &&
      this.isBonus(lotto, bonusNumber)
    ) {
      return 2;
    }

    if (
      this.calculateMatchCount(lotto, winningNumbers) === 5 &&
      !this.isBonus(lotto, bonusNumber)
    ) {
      return 3;
    }

    if (this.calculateMatchCount(lotto, winningNumbers) === 4) {
      return 4;
    }

    if (this.calculateMatchCount(lotto, winningNumbers) === 3) {
      return 5;
    }

    return 6;
  }

  calculateMatchCount(lotto, winningNumbers) {
    return lotto.filter((number, idx) => number === winningNumbers[idx]).length;
  }

  isBonus(lotto, bonusNumber) {
    return lotto.includes(bonusNumber);
  }

  calculateProfitRate(winningLottos, purchasePrice) {
    const list = [2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000, 0];
    return (
      (winningLottos.reduce((acc, cur, idx) => acc + list[idx] * cur, 0) /
        purchasePrice) *
      100
    ).toFixed(1);
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
