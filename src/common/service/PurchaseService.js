import Lotto from "../domain/Lotto.js";
import { LOTTO_NUMBERS, LOTTO_PRICE } from "../lottoConstants/systemConstants.js";
import pickUniqueNumbersInRange from "../util/pickUniqueNumbersInRange.js.js";

export const getLottoCount = (price) => {
  return price / LOTTO_PRICE.UNIT;
};

export const getLottoArray = (count) =>
  Array.from({ length: count }, () => new Lotto(pickUniqueNumbersInRange(LOTTO_NUMBERS.MIN, LOTTO_NUMBERS.MAX, LOTTO_NUMBERS.LENGTH)));
