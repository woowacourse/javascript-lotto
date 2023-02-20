export const LOTTO_NUMBER_LENGTH = 6;
export const DELIMITER = ",";
export const LOTTO_PRICE = 1000;
export const REGEX_FINDING_NOT_NUMBER = /[^0-9]/;

export const ERROR_PREFIX = "[ 에러 ]";
export const ERROR_MESSAGE = Object.freeze({
  NOT_MULTIPLES_OF_THOUSAND: `${ERROR_PREFIX} 1,000원 단위로 금액을 입력해 주세요.`,
  NOT_INTEGER: `${ERROR_PREFIX} 정수를 입력해 주세요.`,
  NOT_BETWEEN_ONE_AND_FORTYFIVE: `${ERROR_PREFIX} 1 ~ 45 사이의 숫자를 입력해 주세요.`,
  DUPLICATED_LOTTO_NUMBER: `${ERROR_PREFIX} 번호 중복 없이 입력해 주세요.`,
  NOT_SIX: `${ERROR_PREFIX} 6개의 로또 당첨 번호를 입력해 주세요.`,
  DUPLICATED_BONUS_NUMBER: `${ERROR_PREFIX} 로또 당첨 번호와 중복되지 않게 보너스 번호를 입력해 주세요.`,
  NOT_Y_NOR_N: `${ERROR_PREFIX} 대, 소문자 Y/y 또는 N/n을 입력해 주세요.`,
});

export const LOTTO_NUMBER_RANGE = Object.freeze({
  MIN: 1,
  MAX: 45,
});

export const INPUT_MESSAGE = Object.freeze({
  PURCHASE_AMOUNT: `로또 구입 금액을 입력해 주세요. `,
  LOTTO_NUMBER: `\n당첨 번호를 콤마(,)로 구분해서 입력해 주세요. `,
  BONUS_NUMBER: `\n보너스 번호를 입력해 주세요. `,
  RESTART_OR_QUIT: `\n다시 시작하시겠습니까? (y/n) `,
});

export const MATCHING_COUNT_AND_PLACES = Object.freeze({
  6: 1,
  5: 3,
  4: 4,
  3: 5,
});

export const PRIZE = Object.freeze({
  1: 2000000000,
  2: 30000000,
  3: 1500000,
  4: 50000,
  5: 5000,
});

export const RESPONSE_AFTER_GAME_ENDS = Object.freeze({
  RESTART: "y",
  QUIT: "n",
});
