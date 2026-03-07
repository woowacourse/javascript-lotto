import { pickNumberInRange } from './Utils.js';
import { Lotto, LOTTO_LENGTH, LOTTO_MIN_NUM, LOTTO_MAX_NUM } from './Lotto.js';

const PRIZE_BY_RANK = {
  1: 2_000_000_000,
  2: 30_000_000,
  3: 1_500_000,
  4: 50_000,
  5: 5_000,
};
export const LOTTO_PRIZE = 1000;

export class LottoMachine {

  #amount;
  #matchResult;

  constructor(amount) {
    this.#amount = amount;
    this.purchaseCount = amount / LOTTO_PRIZE;
    this.lottos = Array.from({ length: this.purchaseCount }, () => this.createLotto());
    this.#matchResult = new Map([
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ]);
  }

  getMatchResult() {
    return new Map(this.#matchResult);
  }

  updateMatchResult(rank) {
    if (rank !== null) {
      const current = this.#matchResult.get(rank);
      this.#matchResult.set(rank, current + 1);
    }
  }

  getMatchRank(matchCount, isMatchBonus) {
    if (matchCount === 6) return 1;
    if (matchCount === 5 && isMatchBonus) return 2;
    if (matchCount === 5) return 3;
    if (matchCount === 4) return 4;
    if (matchCount === 3) return 5;
    return null;
  }

  calculateMatchResult(winningNumber, bonusNumber) {
    this.lottos.forEach((lotto) => {
      const lottoNumbers = lotto.getLottoNumber()
      const matchCount = new Set([...lottoNumbers]).intersection(new Set([...winningNumber])).size;
      const isMatchBonus = lottoNumbers.includes(Number(bonusNumber));
      const rank = this.getMatchRank(matchCount, isMatchBonus);
      this.updateMatchResult(rank);
    });
  }

  getTotalPrize() {
    return this.#matchResult.keys().reduce(
      (acc, rank) => acc + PRIZE_BY_RANK[rank] * this.#matchResult.get(rank), 0
    );
  }

  getRateOfReturn() {
    const profitRate = (this.getTotalPrize() / this.#amount) * 100;
    return profitRate.toFixed(1);
  }

  createLotto() {
    return new Lotto(pickNumberInRange(LOTTO_MIN_NUM, LOTTO_MAX_NUM, LOTTO_LENGTH).sort((a, b) => a - b));
  }

  getMatchResultSummary() {
    return [
      { label: '3개 일치', prize: PRIZE_BY_RANK[5].toLocaleString('ko-KR'), result: this.#matchResult.get(5) },
      { label: '4개 일치', prize: PRIZE_BY_RANK[4].toLocaleString('ko-KR'), result: this.#matchResult.get(4) },
      { label: '5개 일치', prize: PRIZE_BY_RANK[3].toLocaleString('ko-KR'), result: this.#matchResult.get(3) },
      { label: '5개 일치, 보너스 볼 일치', prize: PRIZE_BY_RANK[2].toLocaleString('ko-KR'), result: this.#matchResult.get(2) },
      { label: '6개 일치', prize: PRIZE_BY_RANK[1].toLocaleString('ko-KR'), result: this.#matchResult.get(1) },
    ]
  }
}
