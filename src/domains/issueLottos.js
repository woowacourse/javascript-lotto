import getUniqueRandomNumbers from "../utils/getUniqueRandomNumbers.js";
import {
  MIN_UNIT,
  LOTTO_NUMBER_MAX,
  LOTTO_NUMBER_MIN,
  LOTTO_SIZE,
} from "../constants/validateConstants.js";

const issueLottos = (purchaseAmount) => {
  const lottoCount = purchaseAmount / MIN_UNIT;

  return Array.from({ length: lottoCount }, () => {
    return getUniqueRandomNumbers(
      LOTTO_NUMBER_MIN,
      LOTTO_NUMBER_MAX,
      LOTTO_SIZE
    ).sort((a, b) => a - b);
  });
};
export default issueLottos;
