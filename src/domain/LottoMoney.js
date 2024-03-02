import CustomError from "../error/CustomError.js";
import { ERROR_MESSAGE } from "../error/ErrorMessage.js";

class LottoMoney {
  #money;
  static MIN = 1_000;
  static MAX = 100_000;
  static LOTTO_PRICE = 1000;

  constructor(money) {
    const parsedMoney = Number(money);
    this.#money = parsedMoney;
  }

  getLottoCount() {
    return Math.floor(this.#money / LottoMoney.LOTTO_PRICE);
  }

  getLottoMoney() {
    return this.#money;
  }

  static validate(money) {
    if (isNaN(money)) throw new CustomError(ERROR_MESSAGE.lottoMoneyNotNumber);

    const moneyIsNotInRange = money < LottoMoney.MIN || money > LottoMoney.MAX;

    if (!Number.isInteger(money))
    throw new CustomError(ERROR_MESSAGE.lottoMoneyNotInteger);
    if (moneyIsNotInRange)
      throw new CustomError(ERROR_MESSAGE.lottoMoneyNotInRange);
  }
}

export default LottoMoney;
