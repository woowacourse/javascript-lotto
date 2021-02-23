import { LOTTO } from './constants.js';

export const ERROR_MESSAGE = {
  NOT_INTEGER_NUMBER: `입력 금액은 정수여야 합니다.`,
  PAYMENT_AMOUNT: `${LOTTO.PRICE}원 이상의 금액만 입력할 수 있습니다.`,
  EMPTY_INPUT_NUMBER:
    '빈 입력값이 존재 합니다. 7개의 숫자를 모두 입력해주세요.',
  OUT_OF_RANGE: '1~45 사이의 숫자만 가능합니다. 당첨 번호를 다시 입력해주세요.',
  DUPLICATED_NUMBER: '중복된 숫자가 존재합니다. 당첨 번호를 다시 입력해주세요.',
  VALID_INPUT_NUMBER: '정상적으로 입력하셨습니다.',
};

export const GUIDE_MESSAGE = {
  PAYMENT_RESULT_MESSAGE: (lottoCount, remainingMoney) =>
    `로또 ${lottoCount}개 구매 완료. 거스름돈 : ${remainingMoney}원`,
};
