const { pickRandomNumberInRange } = require('../../utils');
const inputHandler = require('../../view/inputView');
const Money = require('../model/Money');

class LottoMachine {
  #lottos;

  #money;

  readMoney() {
    inputHandler('구입금액을 입력해 주세요.', this.#afterReadMoney);
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
      this.generateLottos(this.#money.getAmount());
    } catch {
      this.readMoney();
    }
  };
}

module.exports = LottoMachine;
