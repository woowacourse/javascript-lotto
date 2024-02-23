import RetryCommandValidator from './RetryCommandValidator.js';
import AppError from '../../errors/AppError/AppError.js';

describe('재시작 여부 입력 유효성 검사 테스트', () => {
  // given
  const validateRetryCommand = (inputValue) => RetryCommandValidator.check(inputValue);

  const ERROR_CASES = [
    {
      input: 'yes',
      expectedErrorMessage: RetryCommandValidator.validationTypes.isValidCommand.errorMessage,
    },
    {
      input: 'no',
      expectedErrorMessage: RetryCommandValidator.validationTypes.isValidCommand.errorMessage,
    },
  ];

  describe('예외 테스트', () => {
    test.each(ERROR_CASES)(
      '입력값이 "$input" 일 때 "$expectedErrorMessage" 메시지와 함께 에러가 발생해야 한다.',
      ({ input, expectedErrorMessage }) => {
        // when - then
        expect(() => validateRetryCommand(input)).toThrow(new AppError(expectedErrorMessage));
      },
    );
  });

  const SUCCESS_CASES = [{ input: 'y' }, { input: 'Y' }, { input: 'n' }, { input: 'N' }];

  describe('정상 작동 테스트', () => {
    test.each(SUCCESS_CASES)('입력값이 "$input" 일 때 에러가 발생하지 않는다.', ({ input }) => {
      // when - then
      expect(() => validateRetryCommand(input)).not.toThrow();
    });
  });
});
