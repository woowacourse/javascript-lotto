export const LOTTO_RULES = {
  length: 6,
  min_number: 1,
  max_number: 45,
};

export const ERROR_MESSAGES = {
  incorrect_length: `로또의 개수가 ${LOTTO_RULES.length}이 아닙니다.`,
  duplicate: '로또 번호는 중복되어선 안됩니다.',
  lotto_number_range: `로또 번호는 ${LOTTO_RULES.min_number}에서 ${LOTTO_RULES.max_number}사이여야 합니다.`,
};
