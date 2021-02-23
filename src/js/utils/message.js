import { LOTTO } from './constants.js';

export const ERROR_MESSAGE = {
  NOT_INTEGER_NUMBER_ERROR: `소수를 입력하셨습니다. 입력 금액은 정수여야 합니다.`,
  PAYMENT_AMOUNT_ERROR: `${LOTTO.PRICE}원 이상의 금액만 입력할 수 있습니다.`,
};

export const GUIDE_MESSAGE = {
  PAYMENT_RESULT_MESSAGE: (lottoCount, remainingMoney) =>
    `로또 ${lottoCount}개 구매 완료. 거스름돈 : ${remainingMoney}원`,
};
