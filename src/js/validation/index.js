import { ERROR_MESSAGE, LOTTO_PRICE, LOTTO_RULES } from '../constant/index.js';

export const isEnoughFare = (fare) => fare >= LOTTO_PRICE;

export const isValidRange = (lottoNumbers) =>
  lottoNumbers.every(
    (lottoNumber) => lottoNumber >= LOTTO_RULES.MIN_RANGE && lottoNumber <= LOTTO_RULES.MAX_RANGE,
  );

export const validator = {
  validateFare: (fare) => {
    if (!isEnoughFare(fare)) {
      throw new Error(ERROR_MESSAGE.LACK_FARE);
    }
  },
};
