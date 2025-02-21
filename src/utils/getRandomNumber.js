import { LOTTO } from '../constants/messages.js';

export const getRandomNumber = () => {
  return Math.floor(Math.random() * LOTTO.MAX_LOTTO_NUMBER) + LOTTO.MIN_LOTTO_NUMBER;
};
