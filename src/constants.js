const MESSAGE = {
  INPUT_PURCHASE_AMOUNT: "구입금액을 입력해 주세요.\n",
  INPUT_LOTTO_NUMBERS: "당첨 번호를 입력해 주세요.\n",
  INPUT_BONUS_NUMBER: "보너스 번호를 입력해 주세요.\n",
};

const AMOUNT_OF_PURCHASE = (amount) => {
  return `${amount}개를 구매했습니다.`;
};

const ERROR = {
  NUMBER: "[ERROR] 숫자를 입력해주세요.",
  OVER_UNIT: "[ERROR] 천 원 이상 입력해주세요.",
  RANGE: "[ERROR] 1부터 45 사이의 값을 입력하세요.",
  DUPLICATED: "[ERROR] 중복된 숫자가 있습니다.",
  DIVIDE: "[ERROR] 로또 1매 가격으로 나누어 떨어지는 금액을 입력하세요.",
  RESTART: "[ERROR] y 혹은 n으로 입력해주세요.",
};

const NUMBER = {
  UNIT: 1_000,
  MIN_RANGE: 1,
  MAX_RANGE: 45,
};

const COMMAND = {
  YES: "y",
  NO: "n",
};

module.exports = {
  NUMBER,
  MESSAGE,
  ERROR,
  AMOUNT_OF_PURCHASE,
  COMMAND,
};
