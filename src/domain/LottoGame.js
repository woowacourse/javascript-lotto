import Lotto from './Lotto.js';
import pickNumberInRange from '../utils/pickNumberInRange.js';
import { LOTTO_CONDITION, PRIZE_MATCH_COUNT, LOTTO_PRIZE_MONEY } from '../constants/condition.js';

export default class LottoGame {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  makeLotto(lottoNumbers) {
    const lotto = new Lotto(lottoNumbers);

    this.#lottos.push(lotto);
  }

  generateLottoNumbers(lottoDigits) {
    const numbers = new Set();

    while (numbers.size !== lottoDigits) {
      const number = pickNumberInRange(
        LOTTO_CONDITION.lottoNumberMinRange,
        LOTTO_CONDITION.lottoNumberMaxRange
      );

      numbers.add(number);
    }

    return [...numbers].sort((numA, numB) => numA - numB);
  }

  getEachCompareResult(winningNumbers, bonusNumber) {
    return this.#lottos.map((lotto) => lotto.getCompareResult(winningNumbers, bonusNumber));
  }

  getStatistics(eachCompareResult) {
    return eachCompareResult.reduce(this.#categorizeResult, { ...statisticsDummy });
  }

  #categorizeResult(statistics, { matchCount, hasBonusNumber }) {
    if (matchCount === PRIZE_MATCH_COUNT.firstPrize) statistics.firstPrize += 1;
    if (matchCount === PRIZE_MATCH_COUNT.secondPrize && hasBonusNumber) statistics.secondPrize += 1;
    if (matchCount === PRIZE_MATCH_COUNT.thirdPrize && !hasBonusNumber) statistics.thirdPrize += 1;
    if (matchCount === PRIZE_MATCH_COUNT.fourthPrize) statistics.fourthPrize += 1;
    if (matchCount === PRIZE_MATCH_COUNT.fifthPrize) statistics.fifthPrize += 1;

    return statistics;
  }

  getTotalPrizeMoney(statistics) {
    return Object.entries(statistics).reduce((acc, [prize, count]) => {
      return acc + LOTTO_PRIZE_MONEY[prize] * count;
    }, 0);
  }

  getLottoQuantity() {
    return this.#lottos.length;
  }

  getEachLottoNumbers() {
    return this.#lottos.map((lotto) => lotto.getNumbers());
  }
}

const statisticsDummy = {
  firstPrize: 0,
  secondPrize: 0,
  thirdPrize: 0,
  fourthPrize: 0,
  fifthPrize: 0,
};
