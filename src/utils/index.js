import { PRICE_UNIT, regex } from '../constants/constants';

const utils = {
  getFormattedNumber(number) {
    return number.toString().replace(regex.PRICE_FORMAT, ',');
  },

  calculateLottoCount(priceInput) {
    return Math.floor(Number(priceInput) / PRICE_UNIT);
  },
};

export default utils;
