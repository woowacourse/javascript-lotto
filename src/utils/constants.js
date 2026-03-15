export const INPUT_MESSAGES = Object.freeze({
  PURCHASE_AMOUNT: "구입금액을 입력해 주세요.\n",
  WINNING_NUMBERS: "\n당첨 번호를 입력해 주세요.\n",
  BONNUS_NUMBERS: "보너스 번호를 입력해 주세요.\n",
  RESTART: "\n다시 시작하시겠습니까? (y/n) ",
});

export const OUTPUT_MESSAGES = Object.freeze({
  STATS_HEADER: "당첨 통계\n--------------------\n",
  "5_BONUS_MATCH": "5개 일치, 보너스 볼 일치",
});

const ERROR_PREFIX = "[ERROR] ";
export const ERROR_MESSAGES = Object.freeze({
  INVALID_INPUT: ERROR_PREFIX + "입력값이 유효하지 않습니다\n",
  BLANK_INPUT: ERROR_PREFIX + "입력값이 비어있습니다\n",

  INVALID_PURCHASE_AMOUNT_TYPE: ERROR_PREFIX + "구입 금액은 숫자여야 합니다\n",
  INVALID_PURCHASE_AMOUNT_NEGATIVE:
    ERROR_PREFIX + "구입 금액은 양수여야 합니다\n",
  INVALID_PURCHASE_AMOUNT_UNIT:
    ERROR_PREFIX + "구입 금액은 1000원 단위여야 합니다\n",

  WINNING_NUMBER_TYPE: ERROR_PREFIX + "당첨 번호는 숫자여야 합니다\n",
  WINNING_NUMBER_COUNT: ERROR_PREFIX + "당첨 번호는 6개여야 합니다\n",
  WINNING_NUMBER_DUPLICATE:
    ERROR_PREFIX + "당첨 번호에 중복된 번호가 포함되어 있습니다\n",
  WINNING_NUMBER_RANGE:
    ERROR_PREFIX + "당첨 번호는 1~45 사이의 숫자여야 합니다\n",

  BONUS_NUMBER_TYPE: ERROR_PREFIX + "보너스 번호는 숫자여야 합니다\n",

  INVALID_LOTTO_NUMBERS_COUNT: ERROR_PREFIX + "로또 번호는 6개여야 합니다\n",
  DUPLICATE_LOTTO_NUMBERS: ERROR_PREFIX + "중복된 번호가 포함되어 있습니다\n",
  OUT_OF_RANGE_LOTTO_NUMBERS:
    ERROR_PREFIX + "로또 번호는 1~45 사이의 숫자여야 합니다\n",
});

export const LOTTO_RULE = Object.freeze({
  LOTTO_PRICE: 1000,
  LOTTO_NUMBERS_COUNT: 6,
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,

  "3_MATCH": 3,
  "4_MATCH": 4,
  "5_MATCH": 5,
  "5_BONUS_MATCH": "5개+보너스볼",
  "6_MATCH": 6,

  RESTART: "y",
  QUIT: "n",
});

export const TERMS = Object.freeze({
  PURCHASE_AMOUNT: "purchaseAmount",
  WINNING_NUMBERS: "winningNumbers",
  BONUS_NUMBER: "bonusNumber",
});
