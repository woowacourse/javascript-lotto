import { LOTTO } from "../constant/lotto.js";

const getRandomNumber = () => {
  return (
    Math.floor(
      Math.random() * (LOTTO.MAX_RANDOM_VALUE - LOTTO.MIN_RANDOM_VALUE + 1)
    ) + LOTTO.MIN_RANDOM_VALUE
  );
};

export default getRandomNumber;