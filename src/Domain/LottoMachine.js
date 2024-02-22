import Lotto from './Lotto';
import { LOTTO_NUMBER_RANGE, LOTTO_LENGTH } from './LottoNumber';

const PRIZE_MONEY = [null, 2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000];
const LOTTO_PRICE = 1_000;

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
    if (this.#money < LOTTO_PRICE) {
      throw new Error('❌');
    }
  }

  #makeLottoByMoney() {
    const CNT = Math.floor(this.#money / LOTTO_PRICE);
    this.#lottos = Array.from({ length: CNT }, () => {
      const numbers = this.#makeRandomNumbers();
      return new Lotto(numbers);
    });
  }

  #makeRandomNumbers() {
    const lottoSet = new Set();

    while (lottoSet.size !== LOTTO_LENGTH) {
      lottoSet.add(Math.ceil(Math.random() * LOTTO_NUMBER_RANGE.MAX));
    }
    return [...lottoSet];
  }

  getLottos() {
    return [...this.#lottos];
  }

  getWinLottos(winNumbersObj) {
    const NUMBER_OF_RANK_TYPE = 5;
    const resultRankCounts = [null, ...Array.from({ length: NUMBER_OF_RANK_TYPE }, () => 0)];
    this.#lottos.forEach((lotto) => {
      const rank = this.#calculateIndividualLotto(lotto, winNumbersObj);
      if (rank) resultRankCounts[rank] += 1;
    });
    this.#calculateIncome(resultRankCounts);
    return resultRankCounts;
  }

  #calculateIndividualLotto(lotto, winNumbersObj) {
    lotto.calculateRank(winNumbersObj);
    const rank = lotto.getRank();

    return rank;
  }

  #calculateIncome(lottoRanks) {
    lottoRanks.forEach((cnt, index) => {
      this.#income += cnt * PRIZE_MONEY[index];
    });
  }

  getRateOfIncome() {
    const NUMBER_OF_DECIMAL_PLACES = 1;
    return Number(((this.#income / this.#money) * 100).toFixed(NUMBER_OF_DECIMAL_PLACES)).toLocaleString();
  }
}
