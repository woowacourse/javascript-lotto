import Lotto from "../domain/Lotto.js";
import { getUniqueRandomNumbers } from "../utils/random.js";

const LOTTO_VALUES = {
  MIN: 1,
  MAX: 45,
  COUNT: 6,
};

export const createLotto = (count) => {
  return new Array(count).map(() => {
    const lottoNumbers = getUniqueRandomNumbers(
      { min: LOTTO_VALUES.MIN, max: LOTTO_VALUES.MAX },
      LOTTO_VALUES.COUNT
    );
    new Lotto(lottoNumbers);
  });
};
