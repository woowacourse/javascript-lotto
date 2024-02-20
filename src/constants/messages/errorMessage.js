const PREFIX_ERROR = '[ERROR]';

const ERROR_MESSAGE = Object.freeze({
  NOT_POSITIVE_INTEGER: `${PREFIX_ERROR} 양의 정수가 아닙니다.`,
  NOT_THOUSAND_UNIT: `${PREFIX_ERROR} 1000 단위가 아닙니다.`
});

export default ERROR_MESSAGE