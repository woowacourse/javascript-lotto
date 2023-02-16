const Messages = {
  INPUT_MONEY: "구입금액을 입력해 주세요.",
  INPUT_BONUSNUMBER: "보너스 번호를 입력해 주세요.",
  INPUT_RETRY: "다시 시작하시겠습니까? (y/n).",
  INPUT_WINNING_NUMBERS: "당첨 번호를 입력해 주세요.",
};

const Settings = {
  DIVIDE_MONEY_VALUE: 1000,
  MAX_WINNING_NUMBER_LENGTH: 6,
  RETRY_INPUT: "y",
  RETRY_INPUT_CAPITAL: "Y",
  CLOSE_INPUT: "n",
  CLOSE_INPUT_CAPITAL: "N",
  SCORE_DEFUALT: 0,
};

const Error = {
  NUMBER_TYPE: "숫자만 입력할 수 있습니다.",
  MONEY_UNIT: "1000원 단위로 입력해주세요.",
  POSITIVE_INTEGER: "입력값은 양의 정수여야 합니다.",
  WINNING_NUMBER_LENGTH: "당첨번호는 6개까지만 입력해주세요.",
  CORRECT_NUMBER_RANGE: "당첨번호는 1~45까지의 범위입니다.",
  HAS_BONUS_NUMBER: "보너스 번호는 당첨번호와 중복되지 않아야합니다.",
  CORRECT_RETRY_INPUT: "재시작은 y, 종료는 n을 입력해주세요.",
};

export { Messages, Settings, Error };
