import { LOTTO_NUMBERS, LOTTO_PRICE } from "../constants/systemConstants.js";
import Lotto from "../domain/Lotto.js";
import pickUniqueNumbersInRange from "../util/pickUniqueNumbersInRange.js.js";

export const getLottoCount = (price) => {
  return price / LOTTO_PRICE;
};

export const getLottoArray = (count) => {
  const lottoArray = [];

  for (let i = 0; i < count; i++) {
    const lottoNumbers = pickUniqueNumbersInRange(LOTTO_NUMBERS.MIN, LOTTO_NUMBERS.MAX, LOTTO_NUMBERS.LENGTH);
    lottoArray.push(new Lotto(lottoNumbers));
  }
  return lottoArray;
};
