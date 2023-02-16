import { LOTTO } from "../constants/index.js";
import randomNumberInRange from "../utils/randomNumberInRange.js";

const lottoGenerator = () => {
  const numbers = new Set();
  while (numbers.size < LOTTO.length) {
    numbers.add(String(randomNumberInRange(LOTTO.min, LOTTO.max)));
  }

  return [...numbers].sort((current, next) => current - next);
};

export default lottoGenerator;
