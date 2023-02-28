import { LOTTO } from "../constants";

export const calculateBenefit = (total, rank) => {
  // eslint-disable-next-line max-params
  const income = rank.reduce((acc, number, index) => {
    acc += number * LOTTO.prize[index];
    return acc;
  }, 0);

  return income / total * 100;
};
