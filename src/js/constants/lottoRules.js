export const LOTTO_PRICE = 1000;
export const MONETARY_UNIT = 1; // 한국의 최소 화폐단위: 1원
export const LOTTO_MIN_NUMBER = 1;
export const LOTTO_MAX_NUMBER = 45;
export const LOTTO_NUMBERS_LENGTH = 6;
export const BONUS_NUMBER_LENGTH = 1;
export const TOTAL_NUMBERS_LENGTH = LOTTO_NUMBERS_LENGTH + BONUS_NUMBER_LENGTH;

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
