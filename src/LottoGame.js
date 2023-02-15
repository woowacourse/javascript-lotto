const LottoMachine = require('./domain/LottoMachine');

const InputView = require('./view/InputView');
const OutputView = require('./view/OutputView');

class LottoGame {
  #lottoMachine;

  #winningNumbers;

  #bonusNumber;

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
}

module.exports = LottoGame;
