import getRandomNumber from "./util/random.js";
import Lotto from "./Lotto.js";
import { LOTTO } from "./constant/lotto.js";

const generateLotto = () => {
  const lotto = new Set();

  while (lotto.size < LOTTO.LENGTH) {
    const randomNumber = getRandomNumber(
      LOTTO.MIN_RANDOM_VALUE,
      LOTTO.MAX_RANDOM_VALUE,
    );
    lotto.add(randomNumber);
  }

  return new Lotto(sortLottoNumbers(Array.from(lotto)));
};

const sortLottoNumbers = (numbers) => {
  return numbers.sort((a, b) => a - b);
};

export default generateLotto;
