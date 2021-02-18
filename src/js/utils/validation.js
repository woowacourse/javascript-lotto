import { LOTTO_SETTINGS } from './constants.js';

export function isMoneyUnderLottoPrice(money) {
  return money < LOTTO_SETTINGS.LOTTO_PRICE;
}

export function isMoneyNotInteger(money) {
  return Math.floor(money) !== money;
}