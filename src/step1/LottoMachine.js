import { pickNumberInRange } from './Utils.js';
import { Lotto, LOTTO_LENGTH, LOTTO_MIN_NUM, LOTTO_MAX_NUM } from './Lotto.js';

const LOTTO_CONFIG = [
  { rank: 1, matchCnt: 6, isBonus: false, prize: 2_000_000_000 },
  { rank: 2, matchCnt: 5, isBonus: true,  prize: 30_000_000 },
  { rank: 3, matchCnt: 5, isBonus: false, prize: 1_500_000 },
  { rank: 4, matchCnt: 4, isBonus: false, prize: 50_000 },
  { rank: 5, matchCnt: 3, isBonus: false, prize: 5_000 },
];

export const LOTTO_PRIZE = 1000;

export class LottoMachine {

  #amount;
  #matchResult;
  #purchaseCount;
  #lottos;

  constructor(amount) {
    this.#amount = amount;
    this.#purchaseCount = amount / LOTTO_PRIZE;
    this.#lottos = Array.from({ length: this.#purchaseCount }, () => this.createLotto());
    this.#matchResult = new Map(LOTTO_CONFIG.map(({ rank }) => [rank, 0]));
  }

  getLottos() {
    return [...this.#lottos];
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
    const found = LOTTO_CONFIG.find(({ matchCnt, isBonus }) => {
      return matchCount === matchCnt && (isBonus ? isMatchBonus : true)
    });
    if (found) {
      return found.rank;
    }
    return null;
  }

  calculateMatchResult(winningNumber, bonusNumber) {
    this.#matchResult = new Map(LOTTO_CONFIG.map(({ rank }) => [rank, 0]));
    this.#lottos.forEach((lotto) => {
      const lottoNumbers = lotto.getLottoNumber()
      const matchCount = new Set([...lottoNumbers]).intersection(new Set([...winningNumber])).size;
      const isMatchBonus = lottoNumbers.includes(Number(bonusNumber));
      const rank = this.getMatchRank(matchCount, isMatchBonus);
      this.updateMatchResult(rank);
    });
  }

  getTotalPrize() {
    return LOTTO_CONFIG.reduce(
      (acc, { rank, prize }) => acc + (prize * this.#matchResult.get(rank)), 0
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
      { label: '3개 일치', prize: LOTTO_CONFIG[4].prize.toLocaleString('ko-KR'), result: this.#matchResult.get(5) },
      { label: '4개 일치', prize: LOTTO_CONFIG[3].prize.toLocaleString('ko-KR'), result: this.#matchResult.get(4) },
      { label: '5개 일치', prize: LOTTO_CONFIG[2].prize.toLocaleString('ko-KR'), result: this.#matchResult.get(3) },
      { label: '5개 일치, 보너스 볼 일치', prize: LOTTO_CONFIG[1].prize.toLocaleString('ko-KR'), result: this.#matchResult.get(2) },
      { label: '6개 일치', prize: LOTTO_CONFIG[0].prize.toLocaleString('ko-KR'), result: this.#matchResult.get(1) },
    ]
  }
}
