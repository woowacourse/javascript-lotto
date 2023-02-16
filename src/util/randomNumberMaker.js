import { LOTTO_NUMBER_RANGE } from "../constants";
const { MIN, MAX } = LOTTO_NUMBER_RANGE;

export const randomNumberBetween = (min = MIN, max = MAX) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
