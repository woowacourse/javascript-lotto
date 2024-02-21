class LottoMoney {
  #money;
  static MIN = 1_000;
  static MAX = 1_000_000_000;
  static LOTTO_PRICE = 1000;

  constructor(money) {
    const parsedMoney = Number(money);
    this.#validate(parsedMoney);
    this.#money = parsedMoney;
  }

  getLottoCount() {
    return Math.floor(this.#money / LottoMoney.LOTTO_PRICE);
  }

  #validate(money) {
    if (isNaN(money)) throw new Error("[ERROR]");

    const moneyIsNotInRange = money < LottoMoney.MIN || money > LottoMoney.MAX;

    if (!Number.isInteger(money)) throw new Error("[ERROR]");
    if (moneyIsNotInRange) throw new Error("[ERROR]");
  }
}

export default LottoMoney;
