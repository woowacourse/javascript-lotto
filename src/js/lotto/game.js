import { getQuotient, getRandomNumber, sortByNumber } from "../utils/util.js";
import { LOTTO } from "../constants/constant.js";

export const getLottoCount = price => {
  return getQuotient(price, LOTTO.PRICE);
};

export const generateLotto = () => {
  const lotto = new Set();
  while (lotto.size !== LOTTO.SIZE) {
    lotto.add(getRandomNumber(LOTTO.MIN_NUM, LOTTO.MAX_NUM));
  }

  return sortByNumber([...lotto]);
};
