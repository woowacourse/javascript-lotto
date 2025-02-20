import LOTTO from "./constant/lotto.js";
import { getRandomNumber } from "./util/random.js";

const generateLotto = () => {
  const lotto = new Set();

  while (lotto.size < LOTTO.LENGTH) {
    const randomNumber = getRandomNumber();
    lotto.add(randomNumber);
  }

  return Array.from(lotto).sort((a,b) => a - b);
}


export default generateLotto;