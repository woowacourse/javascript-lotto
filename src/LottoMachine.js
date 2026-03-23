import { pickNumberInRange } from "./Utils.js";
import { Lotto } from "./Lotto.js";

const PRIZE_LIST = [0, 2_000_000_000, 30_000_000, 1_500_000, 50_000, 5_000];

export class LottoMachine {
  #amount;
  #lottos;
  #matchResult;

  constructor(amount) {
    this.#amount = amount;
    this.#lottos = Array.from({ length: amount / 1000 }, () =>
      this.createLotto(),
    );
    this.#matchResult = new Map([
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
    ]);
  }

  getLottos() {
    return this.#lottos;
  }

  getPurchaseCount() {
    return this.#lottos.length;
  }

  getMatchResult() {
    return this.#matchResult;
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
    this.#lottos.forEach((lotto) => {
      const lottoNumbers = lotto.getLottoNumber();
      const matchCount = lottoNumbers.filter((n) =>
        winningNumber.includes(Number(n))
      ).length;
      const isMatchBonus = lottoNumbers.includes(Number(bonusNumber));
      const rank = this.getMatchRank(matchCount, isMatchBonus);
      this.updateMatchResult(rank);
    });
  }

  getTotalPrize() {
    return this.#matchResult
      .keys()
      .reduce(
        (acc, rank) => acc + PRIZE_LIST[rank] * this.#matchResult.get(rank),
        0,
      );
  }

  getRateOfReturn() {
    const profitRate = (this.getTotalPrize() / this.#amount) * 100;
    return profitRate.toFixed(1);
  }

  createLotto() {
    return new Lotto(pickNumberInRange(1, 45, 6).sort((a, b) => a - b));
  }
}
