import { LOTTO } from '../constants/constants';

export const generateRandomNumber = () => Math.floor(Math.random() * LOTTO.MAX_NUMBER) + 1;
export const shuffleNumber = (array) => array.sort(() => Math.random() - 0.5);
