import getUniqueRandomNumbers from "../utils/getUniqueRandomNumbers.js";
import {
  MIN_UNIT,
  MIN_LOTTO_NUMBER,
  MAX_LOTTO_NUMBER,
  LOTTO_LENGTH,
} from "../constants/constants.js";

const issueLottos = (purchaseAmount) => {
  const lottoCount = purchaseAmount / MIN_UNIT;

  return Array.from({ length: lottoCount }, () => {
    return getUniqueRandomNumbers(
      MIN_LOTTO_NUMBER,
      MAX_LOTTO_NUMBER,
      LOTTO_LENGTH,
    ).sort((a, b) => a - b);
  });
};
export default issueLottos;
