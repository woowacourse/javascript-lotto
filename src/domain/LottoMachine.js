import Lotto from "../model/Lotto.js";
import { RANDOM_RANGE } from "../constants/lottoInfo.js";

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
    const numbers = pickUniqueNumbersInRange(RANDOM_RANGE.MIN, RANDOM_RANGE.MAX , RANDOM_RANGE.SIZE).sort((a, b) => a - b);
    return new Lotto(numbers);
  });
}
