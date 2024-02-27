import LOTTO_SETTING from '../Constants/lottoSetting.js';
import AppError from '../Error/AppError.js';
import ERROR_MESSAGE from '../Constants/Messages/errorMessage.js';

class Money {
  #money;

  #validateMoney(money) {
    if (money < LOTTO_SETTING.MIN_PRICE) {
      throw new AppError(ERROR_MESSAGE.INVALID_MIN_MONEY);
    }
  }

  fromInputValue(money) {
    this.#validateMoney(money);
    this.#money = money;
  }

  getMoney() {
    return this.#money;
  }
}

export default Money;
