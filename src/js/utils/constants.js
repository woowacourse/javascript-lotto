export const LOTTO = Object.freeze({
  COST_UNIT: 1000,
  MAX_DIGIT: 45,
  MIN_DIGIT: 1,
  NUMBER_LENGTH: 6,
});

export const ERROR_MESSAGE = Object.freeze({
  IS_NOT_VALID_PURCHASE_MONEY: '1000원 단위로 금액을 입력해주세요!',
  IS_NOT_VALID_LOTTO_WINNING_NUMBERS: '1~45사이의 숫자를 중복없이 입력해주세요!',
});

export const LOTTO_MATCHING_RESULT_KEY = Object.freeze({
  THREE: '3개',
  FOUR: '4개',
  FIVE: '5개',
  FIVE_PLUS_BONUS: '5개+보너스볼',
  SIX: '6개',
  NOTHING: '낙첨',
});
