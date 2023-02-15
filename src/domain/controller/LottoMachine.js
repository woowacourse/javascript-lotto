const { pickRandomNumberInRange } = require('../../utils');
const inputHandler = require('../../view/inputView');
const outputView = require('../../view/outputView');
const Money = require('../model/Money');

class LottoMachine {
  #lottos;

  #money;

  readMoney() {
    inputHandler('> 구입금액을 입력해 주세요.', this.#afterReadMoney);
  }

  readWinningNumbers() {
    inputHandler(
      '\n> 당첨 번호를 입력해 주세요.',
      this.#afterReadWinningNumbers
    );
  }

  generateLottos(amount) {
    const lottoCount = amount / 1000;

    this.#lottos = Array.from({ length: lottoCount }).map(() =>
      this.makeLottoNumbers()
    );
  }

  makeLottoNumbers() {
    const lottoNumbers = Array.from({ length: 6 }).map(() =>
      pickRandomNumberInRange(1, 45)
    );

    return lottoNumbers;
  }

  #afterReadMoney = (input) => {
    try {
      this.#money = new Money(input);
      outputView.printLottoCount(this.#money.getAmount());
      this.generateLottos(this.#money.getAmount());
      this.showLottos();
      this.readWinningNumbers();
    } catch {
      this.readMoney();
    }
  };

  #afterReadWinningNumbers = (input) => {
    try {
      this.readBonusNumber();
    } catch {
      this.readWinningNumbers();
    }
  };

  showLottos() {
    this.#lottos.forEach((lotto) => {
      outputView.printLotto(lotto);
    });
  }
}

module.exports = LottoMachine;
