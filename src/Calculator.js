import { WINNING, KEYS } from "./constant/lotto.js";

const Calculator = {
  winningCount(lottos, { winning, bonus }) {
    const winningCount = { [KEYS.FIRST]: 0, [KEYS.SECOND]: 0, [KEYS.THIRD]: 0, [KEYS.FOURTH]: 0, [KEYS.FIFTH]: 0 };

    lottos.forEach((lotto) => {
      const matchCount = lotto.filter((num) => winning.includes(num)).length;
      const hasBonus = this.hasBonus(lotto, bonus);

      const matchKey = this.getMatchKey(matchCount, hasBonus);
      this.increaseCount(winningCount, matchKey);
    });

    return winningCount;
  },

  hasBonus(lotto, bonus) {
    return lotto.includes(bonus);
  },

  getMatchKey(matchCount, hasBonus) {
    if (matchCount === WINNING[KEYS.FIRST].MATCH) return KEYS.FIRST;
    if (matchCount === WINNING[KEYS.SECOND].MATCH && hasBonus) return KEYS.SECOND;
    if (matchCount === WINNING[KEYS.THIRD].MATCH) return KEYS.THIRD;
    if (matchCount === WINNING[KEYS.FOURTH].MATCH) return KEYS.FOURTH;
    if (matchCount === WINNING[KEYS.FIFTH].MATCH) return KEYS.FIFTH;
  },

  increaseCount(winningCount, matchKey) {
    if (matchKey) {
      winningCount[matchKey] += 1;
    }
    return;
  },

  totalPrize(winningCount) {
    const total = Object.values(KEYS).reduce((total, key) => {
      return total + WINNING[key].PRIZES * winningCount[key];
    }, 0);

    return total;
  },

  yieldRate(amount, totalPrize) {
    return ((totalPrize / amount) * 100).toFixed(1);
  },
};

export default Calculator;
