export const ERROR_CODE = Object.freeze({
  INVALID_AMOUNT_UNIT: 'INVALID_AMOUNT_UNIT',
  INVALID_NUMBER_RANGE: 'INVALID_NUMBER_RANGE',
  INVALID_FORMAT: 'INVALID_FORMAT',
  INVALID_ERROR_CODE: 'INVALID_ERROR_CODE',
});

const ERROR_MESSAGE = Object.freeze({
  INVALID_AMOUNT_UNIT: ({ unit }) => `[ERROR] ${unit}원 단위의 금액만 입력해 주세요.`,
  INVALID_NUMBER_RANGE: ({ min, max }) => `[ERROR] ${min}이상 ${max}이하의 숫자만 입력해 주세요.`,
  INVALID_FORMAT: () => `[ERROR] 잘못된 입력 형식입니다.`,
  INVALID_ERROR_CODE: () => '[ERROR] 잘못된 에러코드 입니다.',
});

const isValidErrorCode = (code) => code in ERROR_CODE;

const errorMessageGenerator = (code, payload) =>
  !isValidErrorCode(code) ? ERROR_MESSAGE.INVALID_ERROR_CODE() : ERROR_MESSAGE[code](payload);

const errorOptionsGenerator = (code, value) =>
  !isValidErrorCode(code)
    ? { cause: { code: ERROR_CODE.INVALID_ERROR_CODE, value: code } }
    : { cause: { code, value } };

const createErrorParams = ({ code, payload = null }, value) => {
  const message = errorMessageGenerator(code, payload);
  const options = errorOptionsGenerator(code, value);

  return [message, options];
};

export class CustomError extends Error {
  constructor(about, value = null) {
    super(...createErrorParams(about, value));

    this.name = isValidErrorCode(about.code) ? about.code : ERROR_CODE.INVALID_ERROR_CODE;
  }
}
