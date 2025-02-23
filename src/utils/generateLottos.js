import { LOTTO } from "../constants/lotto.js";
import Lotto from "../models/Lotto.js";

export const generateLottoNumbers = (min, max, count) => {
  // 중복 없이 1~45 사이의 숫자 6개 랜덤 생성, 오름차순 정렬
  const numbers = new Set();

  while (numbers.size < count) {
    numbers.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return [...numbers].sort((a, b) => a - b);
};

export const generateLottos = (price) => {
  const count = price / LOTTO.PRICE_STEP;
  return Array.from(
    { length: count },
    () =>
      new Lotto(
        generateLottoNumbers(
          LOTTO.MIN_LOTTO_NUMBER,
          LOTTO.MAX_LOTTO_NUMBER,
          LOTTO.LOTTO_NUMBER_COUNT
        )
      )
  );
};
