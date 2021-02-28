// standard

export const UNIT_AMOUNT = 1000;
export const MAX_PAYMENT = 1000000;
export const MIN_LOTTO_NUMBER = 1;
export const MAX_LOTTO_NUMBER = 45;
export const LOTTO_NUMBER_COUNT = 6;
export const BONUS_NUMBER_COUNT = 1;

export const PRIZE_MONEY = {
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
};

Object.freeze(PRIZE_MONEY);

// alert message

export const MSG_INVALID_PAYMENT = `금액을 ${UNIT_AMOUNT}원 단위로 입력해주세요!`;
export const MSG_OVERLAPPED_NUMBERS = '중복된 숫자';
export const MSG_OUT_RANGED_NUMBERS = '범위 밖의 숫자';
export const MSG_BLANK_INPUT = '빈 칸';
export const MSG_SUFFIX = ' 을(를) 입력하셨습니다. 다시 입력해 주세요!';
export const MSG_SPENT_ALL_MONEY = '로또를 구매할 잔액이 부족합니다.';
