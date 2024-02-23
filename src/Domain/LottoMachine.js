import Lotto from './Lotto';
import { LOTTO_NUMBER_RANGE, LOTTO_LENGTH } from './LottoNumber';

const PRIZE_MONEY = Object.freeze([null, 2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000]);
const LOTTO_PRICE = 1_000;

const MESSAGES = {
  NOT_NUMBER: '숫자만 입력해주세요.',
  INVALID_MONEY_MESSAGE: `로또 구입 금액은 최소 ${LOTTO_PRICE.toLocaleString()}원입니다.`,
};

export default class LottoMachine {
  #money = {
    invest: undefined,
    income: 0,
  };

  #lottos;

  constructor(money) {
    this.#money.invest = money;
    this.#validateMoney();
    this.#makeLottoByMoney();
  }

  #validateMoney() {
    if (Number.isNaN(this.#money.invest)) {
      throw new Error(MESSAGES.NOT_NUMBER);
    }
    if (this.#money.invest < LOTTO_PRICE) {
      throw new Error(MESSAGES.INVALID_MONEY_MESSAGE);
    }
  }

  #makeLottoByMoney() {
    const CNT = Math.floor(this.#money.invest / LOTTO_PRICE);
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
    return lotto.getRank();
  }

  #calculateIncome(lottoRanks) {
    lottoRanks.forEach((cnt, index) => {
      this.#money.income += cnt * PRIZE_MONEY[index];
    });
  }

  getRateOfIncome() {
    const NUMBER_OF_DECIMAL_PLACES = 1;
    return Number(((this.#money.income / this.#money.invest) * 100).toFixed(NUMBER_OF_DECIMAL_PLACES)).toLocaleString();
  }
}
