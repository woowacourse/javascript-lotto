export const LOTTO_PRICE = 1000;
export const MONETARY_UNIT = 1; // 한국의 최소 화폐단위: 1원
export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;
export const LOTTO_NUMBERS_LENGTH = 6;
export const LOTTO_NUMBER_SEPARATOR = ', ';
export const PURCHASED_QUANTITY_MESSAGE = (numOfLotto) => `총 ${numOfLotto}개를 구매하였습니다.`;

export const ALERT_MESSAGE = {
  PURCHASE_AMOUNT_IS_INVALID_MONEY: `화폐단위 미만의 자릿수가 포함된 금액입니다.\n${LOTTO_PRICE}원 단위로 입력해주세요`,
  PURCHASE_AMOUNT_IS_TOO_LOW: `입력된 금액이 로또 한 장의 가격보다 작습니다.\n${LOTTO_PRICE}원 이상의 금액을 입력해주세요`,
  PURCHASE_AMOUNT_HAS_CHANGE: (change) =>
    `입력된 금액에서 ${change}원을 제외한 금액으로 로또를 구매했습니다.\n거스름돈 챙겨가세요.`,
};

export const WINNING_NUMBER_CHECK_MESSAGE = {
  OUT_OF_RANGE: `${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER} 범위를 벗어난 값이 있습니다. 확인 후 다시 입력해주세요.`,
  DUPLICATED: '중복된 값이 있습니다. 확인 후 다시 입력해주세요.',
};

export const BOUNS_COUNT = 0.5;
export const WINNING_PRIZE = {
  6: 2000000000,
  5.5: 30000000,
  5: 1500000,
  4: 50000,
  3: 5000,
  2: 0,
  1: 0,
  0: 0,
};
