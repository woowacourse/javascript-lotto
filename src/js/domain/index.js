import { LOTTO_PRICE } from '../constant/index.js';

export const calculateLottoCount = (fare) => Math.floor(fare / LOTTO_PRICE);

export const calculateRemainFare = (fare) => fare % LOTTO_PRICE;
