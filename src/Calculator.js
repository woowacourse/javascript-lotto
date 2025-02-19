import { WINNING, KEYS } from "./constant/lotto.js";

const Calculator = {
    winningCount(lottos, {winning, bonus}) {
      console.log(lottos);
      const winningCount = {
          [KEYS.FIRST]: 0,
          [KEYS.SECOND]: 0,
          [KEYS.THIRD]: 0,
          [KEYS.FOURTH]: 0,
          [KEYS.FIFTH]: 0,
      }

      lottos.forEach((lotto) => {
        const matchCount = lotto.filter((num) => winning.includes(num)).length;

        if (matchCount === WINNING[KEYS.FIRST].MATCH) winningCount[KEYS.FIRST] += 1;
        if (matchCount === WINNING[KEYS.SECOND].MATCH && lotto.includes(bonus)) winningCount[KEYS.SECOND] += 1;
        if (matchCount === WINNING[KEYS.THIRD].MATCH) winningCount[KEYS.THIRD] += 1;
        if (matchCount === WINNING[KEYS.FOURTH].MATCH) winningCount[KEYS.FOURTH] += 1;
        if (matchCount === WINNING[KEYS.FIFTH].MATCH) winningCount[KEYS.FIFTH] += 1;
      })

      return winningCount;
    }
}

export default Calculator;