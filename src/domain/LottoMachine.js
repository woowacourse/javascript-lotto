import { LOTTO_NUMBER_RANGE, LOTTO_SIZE } from "../constants/lottoInfo.js";
import Lotto from "../model/Lotto.js";

export function pickUniqueNumbersInRange(min, max, size) {
  const uniqueNumbers = new Set();
  while (uniqueNumbers.size < size) {
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    uniqueNumbers.add(randomNum);
  }
  return Array.from(uniqueNumbers);
}

export function makeLottos(amount) {
  return Array.from({ length: amount }, () => {
    const numbers = pickUniqueNumbersInRange(
      LOTTO_NUMBER_RANGE.MIN,
      LOTTO_NUMBER_RANGE.MAX,
      LOTTO_SIZE,
    ).sort((a, b) => a - b);
    return new Lotto(numbers);
  });
}
