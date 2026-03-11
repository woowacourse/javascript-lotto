const PRIZE_RULES = Object.freeze([
  Object.freeze({ matchCount: 3, hasBonus: false, prize: 5_000 }),
  Object.freeze({ matchCount: 4, hasBonus: false, prize: 50_000 }),
  Object.freeze({ matchCount: 5, hasBonus: false, prize: 1_500_000 }),
  Object.freeze({ matchCount: 5, hasBonus: true, prize: 30_000_000 }),
  Object.freeze({ matchCount: 6, hasBonus: false, prize: 2_000_000_000 }),
]);

function findRule({ matchCount, hasBonus }) {
  return PRIZE_RULES.find(
    (rule) => rule.matchCount === matchCount && rule.hasBonus === hasBonus,
  );
}

class LottoResult {
  #prizeCounts;

  constructor(lottos, winningNumber) {
    this.#prizeCounts = this.#calculatePrizeCounts(lottos, winningNumber);
  }

  #calculatePrizeCounts(lottos, winningNumber) {
    const counts = new Map(PRIZE_RULES.map((rule) => [rule, 0]));
    lottos.forEach((lotto) => this.#countPrize(counts, lotto, winningNumber));
    return counts;
  }

  #countPrize(counts, lotto, winningNumber) {
    const winningLotto = winningNumber.getNumbers();
    const bonusNumber = winningNumber.getBonusNumber();
    const matchCount = winningLotto.filter((num) =>
      lotto.hasNumber(num),
    ).length;
    const hasBonus = lotto.hasNumber(bonusNumber);
    const rule = findRule({ matchCount, hasBonus });

    if (!rule) return;
    counts.set(rule, counts.get(rule) + 1);
  }

  getPrizeList() {
    return PRIZE_RULES.map((rule) => ({
      matchCount: rule.matchCount,
      hasBonus: rule.hasBonus,
      prize: rule.prize,
      count: this.#prizeCounts.get(rule),
    }));
  }

  getProfitRate(purchaseAmount) {
    const totalPrize = [...this.#prizeCounts.entries()].reduce(
      (acc, [rule, count]) => acc + rule.prize * count,
      0,
    );
    return ((totalPrize / purchaseAmount) * 100).toFixed(1);
  }
}

export default LottoResult;
