import LOTTO_SETTING from '../Constants/lottoSetting.js';
import AppError from '../Error/AppError.js';
import ERROR_MESSAGE from '../Constants/Messages/errorMessage.js';

class Money {
  #money;

  #validateMoney(money) {
    this.#validateType(money);
    this.#validateMinPrice(money);
    this.#validateMaxPrice(money);
  }

  #validateMinPrice(money) {
    if (money < LOTTO_SETTING.MIN_PRICE) {
      throw new AppError(ERROR_MESSAGE.INVALID_MIN_MONEY);
    }
  }

  #validateMaxPrice(money) {
    if (money > LOTTO_SETTING.MAX_PRICE) {
      throw new AppError(ERROR_MESSAGE.OVER_MAX_PRICE);
    }
  }

  #validateType(money) {
    if (!Number.isInteger(money)) {
      throw new AppError(ERROR_MESSAGE.INVALID_TYPE);
    }
  }

  receiveInjectionValue(money) {
    this.#validateMoney(money);
    this.#money = money;
  }

  getMoney() {
    return this.#money;
  }
}

export default Money;
