import { LOTTO } from "./constant/lotto.js";

const generateLotto = () => {
  const lotto = new Set();

  while (lotto.size < LOTTO.LENGTH) {
    const randomNumber = getLottoNumber();
    lotto.add(randomNumber);
  }

  return sortLottoNumbers(Array.from(lotto));
};

export const getLottoNumber = () => {
  return (
    Math.floor(
      Math.random() * (LOTTO.MAX_RANDOM_VALUE - LOTTO.MIN_RANDOM_VALUE + 1)
    ) + LOTTO.MIN_RANDOM_VALUE
  );
};

const sortLottoNumbers = (numbers) => {
  return numbers.sort((a, b) => a - b);
};

export default generateLotto;
