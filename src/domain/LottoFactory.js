import { LOTTO_NUMBER } from "../constants/lotto.js";
import { getRandomNumber } from "../utils/random.js";
import Lotto from "./Lotto.js";

const LottoFactory = {
  generateLottoNumbers: () => {
    const randomNumberStore = new Set();
    while (randomNumberStore.size < LOTTO_NUMBER.LENGTH) {
      const number = getRandomNumber(LOTTO_NUMBER.MIN, LOTTO_NUMBER.MAX);
      randomNumberStore.add(number);
    }
    return [...randomNumberStore];
  },

  issueLottos: (count) => {
    return Array.from({ length: count }, () => {
      const lottoNumbers = LottoFactory.generateLottoNumbers();
      return new Lotto(lottoNumbers);
    });
  },
};

export default LottoFactory;
