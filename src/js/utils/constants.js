export const LOTTO = Object.freeze({
  COST_UNIT: 1000,
  MAX_DIGIT: 45,
  MIN_DIGIT: 1,
  NUMBER_LENGTH: 6,
  MAX_COST: 5000,
});

export const ERROR_MESSAGE = Object.freeze({
  NOT_VALIDE_UNIT_PURCHASE_MONEY: '1000원 단위로 금액을 입력해주세요',
  EMPTY_PURCHASE_MONEY: '구입할 금액을 입력해주세요',
  MORE_THAN_MAX_COST: '로또는 5개까지 구매할 수 있습니다',
  NOT_VALID_PURCHASE_MONEY: '올바른 구입 금액을 입력해주세요',
  USER_LOTTO_NUMBER_OVERLAP: '중복되는 숫자를 입력할 수 없습니다',
  USER_LOTTO_NUMBER_CORRECT_RANGE: '번호는 1부터 45까지 입력해야 합니다',
  USER_LOTTO_NUMBER_POSITIVE_VALUE: '모든 번호를 입력해주세요',
});
