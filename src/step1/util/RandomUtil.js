import { LOTTO } from "../constant/index.js";

class RandomUtil {
  #randomNumberGenerator;

  constructor() {
    this.#randomNumberGenerator = () =>
      Math.floor(
        Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) +
          LOTTO.MIN_NUMBER,
      );
  }

  pickUniqSixNumbers() {
    const lottoNumbers = new Set();

    do {
      const randomNumber = this.#randomNumberGenerator();
      lottoNumbers.add(randomNumber);
    } while (lottoNumbers.size < LOTTO.COUNT);

    return [...lottoNumbers.keys()];
  }
}

export default RandomUtil;
