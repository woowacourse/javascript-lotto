import Lotto from "./Lotto";

const PRIZE_MONEY = [null, 2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000];

export default class LottoMachine {
  #money;

  #income = 0;

  #lottos;

  constructor(money) {
    this.#money = money;
    this.#validMoney();
    this.#makeLottoByMoney();
  }

  #validMoney() {
    if (this.#money < 1000) {
      throw new Error("❌");
    }
  }

  #makeLottoByMoney() {
    const CNT = Math.floor(this.#money / 1000);
    this.#lottos = Array.from({ length: CNT }, () => {
      const numbers = this.#makeRandomNumbers();
      return new Lotto(numbers);
    });
  }

  #makeRandomNumbers() {
    const lottoSet = new Set();

    while (lottoSet.size !== 6) {
      lottoSet.add(Math.ceil(Math.random() * 45));
    }

    return [...lottoSet];
  }

  getLottos() {
    return [...this.#lottos];
  }

  getWinLottos(winNumbersObj) {
    const returnValue = [null, ...Array.from({ length: 5 }, () => 0)];
    this.#lottos.forEach((lotto) => {
      lotto.calculateRank(winNumbersObj);
      const rank = lotto.getRank();
      if (rank) returnValue[rank] += 1;
    });
    this.#calculateIncome(returnValue);
    return returnValue;
  }

  #calculateIncome(lottoRanks) {
    lottoRanks.forEach((cnt, index) => {
      this.#income += cnt * PRIZE_MONEY[index];
    });
  }

  getRateOfIncome() {
    return ((this.#income / this.#money) * 100).toFixed(1);
  }
}
