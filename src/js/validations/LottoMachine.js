import { LOTTO } from '../constants/constants.js';

function isOverZero(money) {
  return money > 0;
}

function isValidUnit(money) {
  return money % LOTTO.PRICE === 0;
}

export default function validateMoney(money) {
  if (!isValidUnit(money)) {
    throw new Error(`${LOTTO.PRICE}단위로 입력해주세요`);
  }
  if (!isOverZero(money)) {
    throw new Error('0원보다 큰 금액을 입력해주세요.');
  }
}
