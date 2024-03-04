const PREFIX_ERROR = '[ERROR]';

const ERROR_MESSAGE = Object.freeze({
  IS_NOT_POSITIVE_INTEGER: '양의 정수가 아닙니다.',
  IS_NOT_THOUSAND_UNIT: '1000 단위가 아닙니다.',
  IS_INVALID_LOTTO_NUMBER_COUNT: '입력한 로또 번호가 6개가 아닙니다.',
  HAS_REDUNDENT_LOTTO_NUMBER: '입력한 로또 번호에 중복된 값이 존재합니다.',
  IS_NOT_NUMBER: '입력한 로또 번호에 숫자가 아닌 값이 존재합니다.',
  IS_INVALID_LOTTO_NUMBER_RANGE: '입력한 로또 번호가 1~45 범위에 있지 않습니다.',
  IS_NOT_CORRECT_RESPONSE: '올바르지 않은 응답입니다.',
  BONUS_NUMBER_ALREADY_CHOSEN: '입력한 보너스 번호가 당첨 번호에 이미 존재합니다.',
  IS_INVALID_BONUS_NUMBER_COUNT: '보너스 번호가 입력되지 않았습니다.',
  PURCHASE_LIMIT: '1회 최대 구입한도는 10만원 입니다.',
});

export default ERROR_MESSAGE;
