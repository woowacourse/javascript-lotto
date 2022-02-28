const CONFIRM_MESSAGE = Object.freeze({
  RE_PURCHASE:
    '다시 구입하시면 이미 구입했던 로또는 사라집니다. 다시 구입하시겠습니까?',
});

const RULES = Object.freeze({
  LOTTO_PRICE: 1000,
  LOTTO_NUMS: 6,
  BONUS_NUMS: 1,
  MIN_LOTTO_NUMBER: 1,
  MAX_LOTTO_NUMBER: 45,
});

const ERROR_MESSAGE = Object.freeze({
  ZERO_MONEY: '구입할 금액을 입력해 주세요.',
  NOT_NUMBER_TYPE: '구입할 금액은 숫자여야 합니다.',
  NEGATIVE_NUMBER: '구입할 금액으로 음수를 입력할 수 없습니다.',
  NOT_UNIT_OF_THOUSAND: '구입할 금액의 단위는 1,000원 단위 입니다.',
  INVALID_WINNING_NUMBERS: `당첨번호와 보너스번호는 ${RULES.MIN_LOTTO_NUMBER}~${RULES.MAX_LOTTO_NUMBER} 사이의 숫자로, 각각 ${RULES.LOTTO_NUMS}개와 ${RULES.BONUS_NUMS}개를 중복없이 모두 입력해주셔야 합니다.`,
});

const REWARD = Object.freeze({
  FIRST: 2000000000,
  SECOND: 30000000,
  THIRD: 1500000,
  FOURTH: 50000,
  FIFTH: 5000,
});

export { CONFIRM_MESSAGE, RULES, REWARD, ERROR_MESSAGE };
