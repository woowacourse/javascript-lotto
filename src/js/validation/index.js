import { ERROR_MESSAGE, LOTTO_PRICE } from '../constant/index.js';

export const isEnoughFare = (fare) => fare >= LOTTO_PRICE;

export const validator = {
  validateFare: (fare) => {
    if (!isEnoughFare(fare)) {
      throw new Error(ERROR_MESSAGE.LACK_OF_FARE);
    }
  },
};
