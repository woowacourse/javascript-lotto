export const LINE_BREAK = "\n";
export const LOTTO_NUMBER_LENGTH = 6;
export const COMMA = ",";
export const LOTTO_PRICE = 1000;
export const REGEX_FINDING_NOT_NUMBER = /[^0-9]/;

export const PREFIX = "[ 에러 ]";
export const ERROR_MESSAGE = Object.freeze({
  NOT_MULTIPLES_OF_THOUSAND: `${PREFIX} 1,000원 단위로 금액을 입력해 주세요.`,
  NOT_INTEGER: `${PREFIX} 정수를 입력해 주세요.`,
  NOT_BETWEEN_ONE_AND_FORTYFIVE: `${PREFIX} 1 ~ 45 사이의 숫자를 입력해 주세요.`,
  DUPLICATED_LOTTO_NUMBER: `${PREFIX} 번호 중복 없이 입력해 주세요.`,
  NOT_SIX: `${PREFIX} 6개의 로또 번호를 입력해 주세요.`,
  DUPLICATED_BONUS_NUMBER: `${PREFIX} 로또 번호와 중복되지 않게 보너스 번호를 입력해 주세요.`,
  NOT_Y_NOR_N: `${PREFIX} 대, 소문자 Y/y 또는 N/n을 입력해 주세요.`,
});

export const OUTPUT_MESSAGE = Object.freeze({
  NUMBER_OF_PURCHASED_TICKETS: (number) => `${number}개를 구매했습니다.`,
  STATISTICS: `${LINE_BREAK}당첨 통계`,
  LINE: `--------------------`,
  MATCHING_THREE_NUMBERS: (number) => `3개 일치 (5,000원) - ${number}개`,
  MATCHING_FOUR_NUMBERS: (number) => `4개 일치 (50,000원) - ${number}개`,
  MATCHING_FIVE_NUMBERS: (number) => `5개 일치 (1,500,000원) - ${number}개`,
  MATCHING_FIVE_NUMBERS_AND_BONUS_NUMBER: (number) =>
    `5개 일치, 보너스 볼 일치 (30,000,000원) - ${number}개`,
  MATCHING_SIX_NUMBERS: (number) => `6개 일치 (2,000,000,000원) - ${number}개`,
  RATE_OF_RETURN: (rate) => `총 수익률은 ${rate}% 입니다.\n`,
});

export const LOTTO_NUMBER_RANGE = Object.freeze({
  MIN: 1,
  MAX: 45,
});

export const INPUT_MESSAGE = Object.freeze({
  PURCHASE_AMOUNT: `로또 구입 금액을 입력해 주세요.`,
  LOTTO_NUMBER: `${LINE_BREAK}당첨 번호를 콤마(,)로 구분해서 입력해 주세요.`,
  BONUS_NUMBER: `${LINE_BREAK}보너스 번호를 입력해 주세요.`,
  RESTART_OR_QUIT: `${LINE_BREAK}다시 시작하시겠습니까? (y/n)`,
});

export const PLACES = Object.freeze({
  FIRST: "FIRST_PLACE",
  SECOND: "SECOND_PLACE",
  THIRD: "THIRD_PLACE",
  FOURTH: "FOURTH_PLACE",
  FIFTH: "FIFTH_PLACE",
});

export const PRIZE = Object.freeze({
  FIRST_PRIZE: 2000000000,
  SECOND_PRIZE: 30000000,
  THIRD_PRIZE: 1500000,
  FOURTH_PRIZE: 50000,
  FIFTH_PRIZE: 5000,
});

export const CAR_NAME_LENGTH = Object.freeze({
  MINIMUM_CAR_NAME_LENGTH: 1,
  MAXIMUM_CAR_NAME_LENGTH: 5,
});
export const MATCHING_NUMBERS = Object.freeze({
  THREE_NUMBERS: 3,
  FOUR_NUMBERS: 4,
  FIVE_NUMBERS: 5,
  SIX_NUMBERS: 6,
});

export const RESTART_COMMEND = Object.freeze({
  LOWER_CASE_Y: "y",
  UPPER_CASE_Y: "Y",
  LOWER_CASE_N: "n",
  UPPER_CASE_N: "N",
});
