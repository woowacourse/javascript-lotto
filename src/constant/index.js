export const LOTTO_RULES = {
  length: 6,
  min_number: 1,
  max_number: 45,
  cost: 1_000,
};

export const ERROR_MESSAGES = {
  incorrect_length: `로또의 개수가 ${LOTTO_RULES.length}이 아닙니다.`,
  duplicate: '로또 번호는 중복되어선 안됩니다.',
  lotto_number_range: `로또 번호는 ${LOTTO_RULES.min_number}에서 ${LOTTO_RULES.max_number}사이여야 합니다.`,
  bonus_number_duplicate: '보너스 번호는 당첨번호와 중복되지 않아야 합니다.',
  positiveInteger: '양의 정수를 입력해주세요',
  divideThousand: '1,000원 단위로 입력가능합니다.',
  greaterThanThousand: '1000원 이상의 금액을 입력해주세요.',
  only_y_or_n: 'y 또는 n만 입력 가능합니다.',
};
