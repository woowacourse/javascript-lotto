import { WINNING, KEYS } from "./constant/lotto.js";

const increaseCount = Symbol("increaseCount");

const Ranking = {
  countWinningRanks(lottos, { winning, bonus }) {
    const winningRanks = {
      [KEYS.FIRST]: 0,
      [KEYS.SECOND]: 0,
      [KEYS.THIRD]: 0,
      [KEYS.FOURTH]: 0,
      [KEYS.FIFTH]: 0,
    };

    lottos.forEach((lotto) => {
      const matchedCount = lotto.getMatchedCount(winning);
      const hasBonus = lotto.hasBonus(bonus);
      const matchedKey = this.getMatchedKey(matchedCount, hasBonus);
      Ranking[increaseCount](winningRanks, matchedKey);
    });

    return winningRanks;
  },

  getMatchedKey(matchedCount, hasBonus) {
    if (matchedCount === WINNING[KEYS.FIRST].MATCH) return KEYS.FIRST;
    if (matchedCount === WINNING[KEYS.SECOND].MATCH && hasBonus)
      return KEYS.SECOND;
    if (matchedCount === WINNING[KEYS.THIRD].MATCH) return KEYS.THIRD;
    if (matchedCount === WINNING[KEYS.FOURTH].MATCH) return KEYS.FOURTH;
    if (matchedCount === WINNING[KEYS.FIFTH].MATCH) return KEYS.FIFTH;
  },

  [increaseCount](winningRanks, matchedKey) {
    if (matchedKey) {
      winningRanks[matchedKey] += 1;
    }
    return;
  },
};

export default Ranking;
