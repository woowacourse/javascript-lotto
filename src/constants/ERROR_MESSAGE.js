const ERROR_MESSAGE = Object.freeze({
  NOT_DIVISIBLE_BY_UNIT: "구매 가격은 1000원 단위로 입력해주세요.",
  INVALID_INPUT_PRICE: "숫자 값만 입력해주세요.",
  INVALID_WINNING_NUMBERS_FORMAT: "숫자와 구분자로 입력해주세요.",
  INVALID_WINNING_NUMBERS_COUNT: "6개의 숫자를 입력해주세요.",
  INVALID_WINNING_NUMBERS_TYPE: "6개의 값 모두 숫자로 입력해주세요.",
  INVALID_WINNING_NUMBERS_RANGE: "6개의 숫자는 1~45 사이로 입력해주세요.",
  DUPLICATE_WINNING_NUMBERS: "6개의 숫자는 중복없이 입력해주세요.",
  INVALID_BONUS_NUMBER_TYPE: "보너스 번호는 숫자로 입력해주세요.",
  INVALID_BONUS_NUMBER_RANGE: "보너스 번호는 1~45 사이로 입력해주세요.",
  DUPLICATE_BONUS_NUMBER: "보너스 번호는 당첨번호와 중복되지 않게 입력해주세요.",
  INVALID_RESTART_FORMAT: "재시작 여부는 y 또는 n으로 입력해주세요.",
});

export default ERROR_MESSAGE;
