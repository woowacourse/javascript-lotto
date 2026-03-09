import RandomUtil from "./RandomUtil.js";
import { LOTTO } from "../constant/index.js";

class MissionRandomUtil extends RandomUtil {
  #randomNumberGenerator;

  constructor() {
    super();
    this.#randomNumberGenerator = () =>
      Math.floor(
        Math.random() * (LOTTO.MAX_NUMBER - LOTTO.MIN_NUMBER) +
          LOTTO.MIN_NUMBER,
      );
  }

  pickUniqNumbers() {
    const lottoNumbers = new Set();

    do {
      const randomNumber = this.#randomNumberGenerator();
      lottoNumbers.add(randomNumber);
    } while (lottoNumbers.size < LOTTO.COUNT);

    return [...lottoNumbers.keys()];
  }
}

export default MissionRandomUtil;
