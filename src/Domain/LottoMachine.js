import Lotto from './Lotto';
import { LOTTO_NUMBER_RANGE, LOTTO_LENGTH } from './LottoNumber';

const PRIZE_MONEY = Object.freeze([0, 2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000]);
const LOTTO_PRICE = 1_000;

const MESSAGES = Object.freeze({
  NOT_NUMBER: '숫자만 입력해주세요.',
  INVALID_MONEY: `로또 구입 금액은 최소 ${LOTTO_PRICE.toLocaleString()}원입니다.`,
});

export default class LottoMachine {
  #money;

  #lottos;

  constructor(money) {
    this.#money = money;
    this.#validateMoney();
    this.#makeLottoByMoney();
  }

  #validateMoney() {
    if (Number.isNaN(this.#money)) {
      throw new Error(MESSAGES.NOT_NUMBER);
    }
    if (this.#money < LOTTO_PRICE) {
      throw new Error(MESSAGES.INVALID_MONEY);
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
    const resultRankCounts = this.#makeLottoRanks(winNumbersObj);
    return resultRankCounts;
  }

  #makeLottoRanks(winNumbersObj) {
    const NUMBER_OF_RANK_TYPE = 5;
    const resultRankCounts = [0, ...Array.from({ length: NUMBER_OF_RANK_TYPE }, () => 0)];
    this.#lottos.forEach((lotto) => {
      const rank = this.#calculateIndividualLotto(lotto, winNumbersObj);
      if (rank) resultRankCounts[rank] += 1;
    });
    return resultRankCounts;
  }

  #calculateIndividualLotto(lotto, winNumbersObj) {
    lotto.calculateRank(winNumbersObj);
    return lotto.getRank();
  }

  getRateOfIncome(winNumbersObj) {
    const NUMBER_OF_DECIMAL_PLACES = 1;
    const income = this.#calculateIncome(winNumbersObj);
    return Number(((income / this.#money) * 100).toFixed(NUMBER_OF_DECIMAL_PLACES)).toLocaleString();
  }

  #calculateIncome(winNumbersObj) {
    const resultRankCounts = this.#makeLottoRanks(winNumbersObj);
    return resultRankCounts.reduce((accumulate, currentCount, index) => {
      accumulate += currentCount * PRIZE_MONEY[index];
      return accumulate;
    }, 0);
  }
}
