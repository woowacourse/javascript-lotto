import { WINNING, KEYS } from "./constant/lotto.js";

const Calculator = {
  getWinningCount(lottos, winningInfo) {
    const winningCount = {
      [KEYS.FIRST]: 0,
      [KEYS.SECOND]: 0,
      [KEYS.THIRD]: 0,
      [KEYS.FOURTH]: 0,
      [KEYS.FIFTH]: 0,
    };

    lottos.forEach((lotto) => {
      const matchedKey = this.getMatchedKey(lotto, winningInfo);
      this.handleWinningCount(winningCount, matchedKey);
    });

    return winningCount;
  },

  getMatchedKey(lotto, winningInfo) {
    const { winning, bonus } = winningInfo;
    const matchedCount = this.getMatchedCount(lotto, winning);
    const hasBonus = this.hasBonus(lotto, bonus);

    return this.findMatchedKey(matchedCount, hasBonus);
  },

  getMatchedCount(lotto, winning) {
    return lotto.filter((num) => winning.includes(num)).length;
  },

  hasBonus(lotto, bonus) {
    return lotto.includes(bonus);
  },

  findMatchedKey(matchedCount, hasBonus) {
    if (matchedCount === WINNING[KEYS.FIRST].MATCH) return KEYS.FIRST;
    if (matchedCount === WINNING[KEYS.SECOND].MATCH && hasBonus)
      return KEYS.SECOND;
    if (matchedCount === WINNING[KEYS.THIRD].MATCH) return KEYS.THIRD;
    if (matchedCount === WINNING[KEYS.FOURTH].MATCH) return KEYS.FOURTH;
    if (matchedCount === WINNING[KEYS.FIFTH].MATCH) return KEYS.FIFTH;
  },

  handleWinningCount(winningCount, matchedKey) {
    if (matchedKey) {
      this.increaseCount(winningCount, matchedKey);
    }
  },

  increaseCount(winningCount, matchedKey) {
    winningCount[matchedKey] += 1;
  },

  getTotalPrize(winningCount) {
    const total = Object.values(KEYS).reduce((total, key) => {
      return total + WINNING[key].PRIZES * winningCount[key];
    }, 0);

    return total;
  },

  getYieldRate(amount, totalPrize) {
    return ((totalPrize / amount) * 100).toFixed(1);
  },
};

export default Calculator;
