export const MONEY_ERROR_MESSAGE = Object.freeze({
  INPUT_NOT_NUMBER: "[ERROR] 구입 금액은 숫자만 입력할 수 있습니다.\n",
  INPUT_NOT_INTEGER: "[ERROR] 구입 금액은 양의 정수만 입력할 수 있습니다.\n",
  INPUT_NOT_THOUSAND_UNIT: "[ERROR] 금액은 1000원 단위로 입력해야 합니다.\n",
});

export const LOTTO_ERROR_MESSAGE = Object.freeze({
  INPUT_NOT_SIX_NUMBERS: "[ERROR] 로또 번호는 6개 이어야합니다.\n",
  INPUT_DUPLICATE: "[ERROR] 중복된 번호는 입력할 수 없습니다.\n",
  INPUT_RANGE: "[ERROR] 로또 번호는 1에서 45 사이의 숫자여야 합니다.\n",
});

export const INPUT_MESSAGE = Object.freeze({
  PURCHASE_AMOUNT: "> 구입금액을 입력해주세요. ",
  WINNING_NUMBER: "\n> 당첨 번호를 입력해주세요. ",
  BONUS_NUMBER: "\n> 보너스 번호를 입력해 주세요. ",
  ASK_RETRY: "\n> 다시 시작하시겠습니까? (y/n) ",
});

export const ERROR_MESSAGE = Object.freeze({
  NOT_INPUT_RETRY: "[ERROR] y 또는 n을 입력해주세요.\n",
  INVALID_INPUT: "[ERROR] 올바르지 않은 Input 인스턴스가 입력되었습니다.\n",
  INVALID_OUTPUT: "[ERROR] 올바르지 않은 Output 인스턴스가 입력되었습니다.\n",
  INVALID_RANDOM_UTIL: "[ERROR] 올바르지 않은 RandomUtil 인스턴스가 입력되었습니다.\n",
  NOT_FOUND_MOCK_DATA: "[ERROR] Mock 데이터가 없습니다.\n",
});
