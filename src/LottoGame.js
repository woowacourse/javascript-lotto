const LottoMachine = require('./domain/LottoMachine');

const InputView = require('./view/InputView');
const OutputView = require('./view/OutputView');

class LottoGame {
  #lottoMachine;

  constructor() {}

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
  }

  async inputPurchasePrice() {
    try {
      const purchasePrice = await InputView.readPurchasePrice();
      this.#lottoMachine = new LottoMachine(parseInt(purchasePrice, 10));
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      this.inputPurchasePrice();
    }
  }

  async showPurchasedLottos() {
    OutputView.printPurchasedLottos(this.#lottoMachine.lottos);
  }
}

module.exports = LottoGame;
