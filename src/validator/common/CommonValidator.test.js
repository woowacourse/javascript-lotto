import AppError from '../../errors/AppError/AppError.js';
import CommonValidator from './CommonValidator.js';

describe('공통 유효성 검사 테스트', () => {
  // given
  const EMPTY_VALUE = '';
  const startValidation = (inputValue) => CommonValidator.check(inputValue);

  describe('예외 테스트', () => {
    test('입력 값이 빈 값일 때, "$expectErrorMessage" 메세지와 함께 에러가 발생해야 한다.', () => {
      const EXPECT_ERROR_MESSAGE = CommonValidator.validationTypes.emptyValues.errorMessage;

      // when - then
      expect(() => startValidation(EMPTY_VALUE)).toThrow(new AppError(EXPECT_ERROR_MESSAGE));
    });
    test.each([
      {
        input: EMPTY_VALUE,
        expectedErrorMessage: CommonValidator.validationTypes.emptyValues.errorMessage,
      },
    ])(
      '입력값이 "$input"일 때 "$expectedErrorMessage" 메세지와 함께 에러가 발생해야 한다.',
      ({ input, expectedErrorMessage }) => {
        // then
        expect(() => startValidation(input)).toThrow(new AppError(expectedErrorMessage));
      },
    );
  });

  describe('비 예외 테스트', () => {
    // given
    const SUCCESS_CASE = [
      {
        input: 'abc',
      },
      {
        input: '123',
      },
    ];

    test.each(SUCCESS_CASE)('입력값이 "$input"일 때 에러가 발생하지 않는다.', ({ input }) => {
      // when - then
      expect(() => startValidation(input)).not.toThrow();
    });
  });
});
