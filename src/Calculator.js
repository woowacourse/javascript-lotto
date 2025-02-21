import { WINNING, KEYS } from "./constant/lotto.js";

const Calculator = {
  countWinningRanks(lottos, { winning, bonus }) {
    const winningRanks = {
      [KEYS.FIRST]: 0,
      [KEYS.SECOND]: 0,
      [KEYS.THIRD]: 0,
      [KEYS.FOURTH]: 0,
      [KEYS.FIFTH]: 0,
    };

    lottos.forEach((lotto) => {
      const matchedCount = lotto.filter((num) => winning.includes(num)).length;
      const hasBonus = this.hasBonus(lotto, bonus);

      const matchedKey = this.getMatchedKey(matchedCount, hasBonus);
      this.increaseCount(winningRanks, matchedKey);
    });

    return winningRanks;
  },

  hasBonus(lotto, bonus) {
    return lotto.includes(bonus);
  },

  getMatchedKey(matchedCount, hasBonus) {
    if (matchedCount === WINNING[KEYS.FIRST].MATCH) return KEYS.FIRST;
    if (matchedCount === WINNING[KEYS.SECOND].MATCH && hasBonus)
      return KEYS.SECOND;
    if (matchedCount === WINNING[KEYS.THIRD].MATCH) return KEYS.THIRD;
    if (matchedCount === WINNING[KEYS.FOURTH].MATCH) return KEYS.FOURTH;
    if (matchedCount === WINNING[KEYS.FIFTH].MATCH) return KEYS.FIFTH;
  },

  increaseCount(winningRanks, matchedKey) {
    if (matchedKey) {
      winningRanks[matchedKey] += 1;
    }
    return;
  },

  totalPrize(winningRanks) {
    const total = Object.values(KEYS).reduce((total, key) => {
      return total + WINNING[key].PRIZES * winningRanks[key];
    }, 0);

    return total;
  },

  yieldRate(amount, totalPrize) {
    return ((totalPrize / amount) * 100).toFixed(1);
  },
};

export default Calculator;
