import { LOTTO_MONEY } from "../constants/lotto.js";
import CustomError from "../error/CustomError.js";
import ERROR_MESSAGE from "../error/errorMessage.js";

class LottoMoney {
  #money;

  constructor(money) {
    const parsedMoney = Number(money);
    this.#validate(parsedMoney);
    this.#money = parsedMoney;
  }

  getLottoCount() {
    return Math.floor(this.#money / LOTTO_MONEY.unit);
  }

  get() {
    return this.#money;
  }

  #validate(money) {
    if (Number.isNaN(money))
      throw new CustomError(ERROR_MESSAGE.lottoMoneyNotNumber);

    const moneyIsNotInRange =
      money < LOTTO_MONEY.min || money > LOTTO_MONEY.max;

    if (moneyIsNotInRange)
      throw new CustomError(ERROR_MESSAGE.lottoMoneyNotInRange);
    if (!Number.isInteger(money))
      throw new CustomError(ERROR_MESSAGE.lottoMoneyNotInteger);
  }
}

export default LottoMoney;
