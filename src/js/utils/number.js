import { LOTTO } from '../constants/constants';

export const generateRandomNumber = () => Math.floor(Math.random() * LOTTO.MAX_NUMBER) + 1;
