export const LOTTO_PRICE = 1000;
export const MONETARY_UNIT = 1; // 한국의 최소 화폐단위: 1원
export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;
export const LOTTO_NUMBERS_LENGTH = 6;
export const BONUS_NUMBER_LENGTH = 1;
export const LOTTO_NUMBER_SEPARATOR = ', ';
export const PURCHASED_QUANTITY_MESSAGE = (numOfLotto) => `총 ${numOfLotto}개를 구매하였습니다.`;

export const PURCHASE_AMOUNT_ALERT_MESSAGE = {
  PURCHASE_AMOUNT_IS_INVALID_MONEY: `화폐단위 미만의 자릿수가 포함된 금액입니다.\n${LOTTO_PRICE}원 단위로 입력해주세요`,
  PURCHASE_AMOUNT_IS_TOO_LOW: `입력된 금액이 로또 한 장의 가격보다 작습니다.\n${LOTTO_PRICE}원 이상의 금액을 입력해주세요`,
  PURCHASE_AMOUNT_HAS_CHANGE: (change) =>
    `입력된 금액에서 ${change}원을 제외한 금액으로 로또를 구매했습니다.\n거스름돈 챙겨가세요.`,
};

export const WINNING_NUMBER_CHECK_MESSAGE = {
  OUT_OF_RANGE: `${LOTTO_MIN_NUMBER} ~ ${LOTTO_MAX_NUMBER} 범위를 벗어난 값이 있습니다. 확인 후 다시 입력해주세요.`,
  DUPLICATED: '중복된 값이 있습니다. 확인 후 다시 입력해주세요.',
  HAS_BLANK: '아직 입력하지 않은 번호가 있습니다.',
  COMPLETED: '당첨번호 입력이 완료되었습니다. 인생역전의 기회, 지금 결과를 확인하세요!',
};

export const RATE_OF_RETURN_MESSAGE = (rateOfReturn) => `당신의 총 수익률은 ${rateOfReturn}%입니다.`;
export const RATE_OF_RETURN_DECIMAL_PLACE = 2;

export const BONUS_COUNT = 0.5;
export const BONUS_CHECK_REQUIRED_COUNT = 5;
export const WINNING_PRIZE = {
  6: {
    PRIZE: 2000000000,
    DESCRIPTION: '6개',
  },
  5.5: {
    PRIZE: 30000000,
    DESCRIPTION: '5개 + 보너스볼',
  },
  5: {
    PRIZE: 1500000,
    DESCRIPTION: '5개',
  },
  4: {
    PRIZE: 50000,
    DESCRIPTION: '4개',
  },
  3: {
    PRIZE: 5000,
    DESCRIPTION: '3개',
  },
  2: {
    PRIZE: 0,
  },
  1: {
    PRIZE: 0,
  },
  0: {
    PRIZE: 0,
  },
};
