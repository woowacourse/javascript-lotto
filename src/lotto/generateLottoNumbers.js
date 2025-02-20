import { LOTTO_RULE } from "../constants/lotto.js";
import { shuffle } from "../utils/array.js";

const generateLottoNumbers = () => {
  const numbers = Array.from(
    { length: LOTTO_RULE.MAX_LOTTO_NUMBER },
    (_, i) => i + 1
  );

  const shuffleNumbers = shuffle(numbers);
  const lottoNumbers = shuffleNumbers.slice(0, LOTTO_RULE.LOTTO_LENGTH);
  return lottoNumbers.sort((a, b) => a - b);
};

export default generateLottoNumbers;
