const PREFIX_ERROR = '[ERROR]';

const ERROR_MESSAGE = Object.freeze({
  IS_NOT_POSITIVE_INTEGER: `${PREFIX_ERROR} 양의 정수가 아닙니다.`,
  IS_NOT_THOUSAND_UNIT: `${PREFIX_ERROR} 1000 단위가 아닙니다.`,
  IS_NOT_VALID_LOTTO_NUMBER_COUNT: `${PREFIX_ERROR} 입력한 로또 번호가 6개가 아닙니다.`,
  HAS_REDUNDENT_LOTTO_NUMBER: `${PREFIX_ERROR} 입력한 로또 번호에 중복된 값이 존재합니다.`,
  IS_NOT_NUMBER: `${PREFIX_ERROR} 입력한 로또 번호에 숫자가 아닌 값이 존재합니다.`,
  IS_INVALID_LOTTO_NUMBER_RANGE: `${PREFIX_ERROR} 입력한 로또 번호가 1~45 범위에 있지 않습니다.`,
  IS_NOT_CORRECT_RESPONSE: `${PREFIX_ERROR} 올바르지 않은 응답입니다.`,
});

export default ERROR_MESSAGE;
