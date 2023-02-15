const { pickRandomNumberInRange } = require('../../utils');
const inputHandler = require('../../view/inputView');
const Money = require('../model/Money');

class LottoMachine {
  #lottos;

  #money;

  readMoney() {
    inputHandler('구입금액을 입력해 주세요.', this.#afterReadMoney);
  }
}

module.exports = LottoMachine;
