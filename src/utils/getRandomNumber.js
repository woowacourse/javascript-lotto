import { LOTTO } from '../constants/messages';

export const getRandomNumber = () => {
  return Math.floor(Math.random() * LOTTO.MAX_RANDOM_NUMBER) + LOTTO.MIN_RANDOM_NUMBER;
};
