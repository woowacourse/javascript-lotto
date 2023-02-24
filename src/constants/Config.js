const MESSAGES = {
  INPUT_MONEY: "구입금액을 입력해 주세요.",
  INPUT_BONUSNUMBER: "보너스 번호를 입력해 주세요.",
  INPUT_RETRY: "다시 시작하시겠습니까? (y/n)",
  INPUT_WINNING_NUMBERS: "당첨 번호를 입력해 주세요.",
  PRINT_RESULT: "당첨통계",
  PRINT_DIVISION: "-",
};

const SETTINGS = {
  DIVIDE_MONEY_VALUE: 1000,
  MAX_WINNING_NUMBER_LENGTH: 6,
  RETRY_INPUT: "y",
  CLOSE_INPUT: "n",
  SCORE_DEFUALT: 0,
  RANDOM_NUMBER_LENGTH: 6,
  LOTTO_RANDOM_NUMBER_RANGE: 45,
  REPEAT_PRINT_DIVISION: 20,
  MONEY_UNIT: "원",
};

const ERROR_MESSAGE = {
  NUMBER_TYPE: "숫자만 입력할 수 있습니다.",
  MONEY_UNIT: "1000원 단위로 입력해주세요.",
  POSITIVE_INTEGER: "입력값은 양의 정수여야 합니다.",
  WINNING_NUMBER_LENGTH: "당첨번호는 6개까지만 입력해주세요.",
  CORRECT_NUMBER_RANGE: "당첨번호는 1~45까지의 범위입니다.",
  DUPLICATED_NUMBER: "당첨번호는 각각 다른 숫자여야합니다.",
  HAS_BONUS_NUMBER: "보너스 번호는 당첨번호와 중복되지 않아야합니다.",
  DEFAULT_ERROR: "알 수 없는 오류가 발생하였습니다.",
  CORRECT_RETRY_INPUT: "재시작은 y, 종료는 n을 입력해주세요.",
  EMPTY_INPUT: "숫자를 모두 입력해주세요.",
};

const SCORE = {
  ZERO: 0,
  ONE: 1,
  TWO: 2,
  THREE: "3개 일치",
  FOUR: "4개 일치",
  FIVE: "5개 일치",
  FIVE_BONUS: "5개 일치, 보너스 볼 일치",
  SIX: "6개 일치",
};

const MATCH = {
  LOTTO_RANKIG: {
    [SCORE.THREE]: 0,
    [SCORE.FOUR]: 0,
    [SCORE.FIVE]: 0,
    [SCORE.FIVE_BONUS]: 0,
    [SCORE.SIX]: 0,
  },

  BENEFIT_BOARD: {
    [SCORE.THREE]: 5000,
    [SCORE.FOUR]: 50000,
    [SCORE.FIVE]: 1500000,
    [SCORE.FIVE_BONUS]: 30000000,
    [SCORE.SIX]: 2000000000,
  },

  MONEY_BOARD: {
    [SCORE.THREE]: "5,000",
    [SCORE.FOUR]: "50,000",
    [SCORE.FIVE]: "1,500,000",
    [SCORE.FIVE_BONUS]: "30,000,000",
    [SCORE.SIX]: "2,000,000,000",
  },
};

export { MESSAGES, SETTINGS, ERROR_MESSAGE, SCORE, MATCH };
