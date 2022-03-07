import { LOTTO } from '../constants/constants.js';

function isOverZero(money) {
  return money > 0;
}

function isValidUnit(money) {
  return money % LOTTO.PRICE === 0;
}

function isOverLimit(money) {
  return money > LOTTO.INPUT_LIMIT;
}

export function isNumberStartWithZero(money) {
  return money.length > 1 && money[0] == 0;
}

export default function validateMoney(money) {
  if (isNumberStartWithZero(money)) {
    throw new Error('허용되지 않은 숫자 형식입니다.');
  }
  if (!isOverZero(money)) {
    throw new Error('0원보다 큰 금액을 입력해주세요.');
  }
  if (!isValidUnit(money)) {
    throw new Error(
      `로또 가격 단위로 입력해주세요. (현재 로또 가격 : ${LOTTO.PRICE}원)`
    );
  }
  if (isOverLimit(money)) {
    throw new Error('100,000원 보다 큰 금액으로 구입할 수 없습니다.');
  }
}
