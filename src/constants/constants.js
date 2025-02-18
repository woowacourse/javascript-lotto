export const LOTTO_CONDITION = {
  COUNT: 6,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
};

export const LOTTO_NUMBER_ERROR_MESSAGES = {
  COUNT: `로또 번호는 ${LOTTO_CONDITION.COUNT}자리여야 합니다.`,
  INTIGER: '로또 번호는 정수여야합니다.',
  RANGE: `각 숫자는 ${LOTTO_CONDITION.MIN_NUMBER}~${LOTTO_CONDITION.MAX_NUMBER} 사이여야 한다.`,
  DUPLICATE: '숫자를 중복해서 입력하면 안된다.',
};
