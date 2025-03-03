import Lotto from "../../common/domain/Lotto.js";
import { LOTTO_NUMBERS, LOTTO_PRICE } from "../../common/lottoConstants/systemConstants.js";
import pickUniqueNumbersInRange from "../../common/util/pickUniqueNumbersInRange.js.js";

export const getLottoCount = (price) => {
  return price / LOTTO_PRICE.UNIT;
};

export const getLottoArray = (count) =>
  Array.from({ length: count }, () => new Lotto(pickUniqueNumbersInRange(LOTTO_NUMBERS.MIN, LOTTO_NUMBERS.MAX, LOTTO_NUMBERS.LENGTH)));
