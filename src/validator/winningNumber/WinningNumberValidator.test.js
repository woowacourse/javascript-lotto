import WinningNumberValidator from './WinningNumberValidator.js';
import AppError from '../../errors/AppError/AppError.js';

describe('당첨 번호 유효성 검사', () => {
  // given
  const validateWinningNumber = (inputValue) => WinningNumberValidator.check(inputValue);

  describe('예외 테스트', () => {
    describe('당첨 번호 입력 형식이 다른 case', () => {
      // given
      const ERROR_CASES = [
        {
          input: 'a,b,c,d,e,f',
          errorCause: '숫자가 아닌 다른 값이 들어왔다',
          expectedErrorMessage: WinningNumberValidator.validationTypes.isValidType.errorMessage,
        },
        {
          input: '1.2,3,4,5,6',
          errorCause: ',가 아닌 .가 포함되었다',
          expectedErrorMessage: WinningNumberValidator.validationTypes.isValidType.errorMessage,
        },
        {
          input: '1,2,3,4,5,-6',
          errorCause: '양수의 값이 들어오지 않았다',
          expectedErrorMessage: WinningNumberValidator.validationTypes.isValidType.errorMessage,
        },
      ];

      test.each(ERROR_CASES)(
        '입력 값 "$input"에 대해 "$errorCause"는 이유로 "$expectedErrorMessage" 메세지와 함께 에러가 발생해야 한다.',
        ({ input, expectedErrorMessage }) => {
          // when - then
          expect(() => validateWinningNumber(input)).toThrow(new AppError(expectedErrorMessage));
        },
      );
    });

    describe('당첨 번호가 6개가 아닌 case', () => {
      // given
      const ERROR_CASES = [
        {
          input: '1,2',
          errorCause: '당첨 번호가 2개다',
          expectedErrorMessage: WinningNumberValidator.validationTypes.isValidLength.errorMessage,
        },
        {
          input: '33',
          errorCause: '당첨 번호가 1개다',
          expectedErrorMessage: WinningNumberValidator.validationTypes.isValidLength.errorMessage,
        },
      ];

      test.each(ERROR_CASES)(
        '입력 값 "$input"에 대해 "$errorCause"는 이유로 "$expectedErrorMessage" 메세지와 함께 에러가 발생해야 한다.',
        ({ input, expectedErrorMessage }) => {
          // when - then
          expect(() => validateWinningNumber(input)).toThrow(new AppError(expectedErrorMessage));
        },
      );
    });

    describe('당첨 번호의 범위를 벗어나는 case', () => {
      // given
      const ERROR_CASES = [
        {
          input: '1,2,3,4,5,60',
          errorCause: '60은 45보다 크다',
          expectedErrorMessage: WinningNumberValidator.validationTypes.isValidRange.errorMessage,
        },
        {
          input: '0,2,3,4,5,6',
          errorCause: '0은 1보다 작다',
          expectedErrorMessage: WinningNumberValidator.validationTypes.isValidRange.errorMessage,
        },
      ];

      test.each(ERROR_CASES)(
        '입력 값 "$input"에 대해 "$errorCause"는 이유로 "$expectedErrorMessage" 메세지와 함께 에러가 발생해야 한다.',
        ({ input, expectedErrorMessage }) => {
          // when - then
          expect(() => validateWinningNumber(input)).toThrow(new AppError(expectedErrorMessage));
        },
      );
    });

    describe('당첨 번호 내 중복된 값이 존재하는 case', () => {
      // given
      const ERROR_CASES = [
        {
          input: '1,1,2,3,4,5',
          errorCause: '1과 1이 중복된다',
          expectedErrorMessage: WinningNumberValidator.validationTypes.isUnique.errorMessage,
        },
        {
          input: '1,1,1,1,1,1',
          errorCause: '모든 값이 중복된다',
          expectedErrorMessage: WinningNumberValidator.validationTypes.isUnique.errorMessage,
        },
      ];

      test.each(ERROR_CASES)(
        '입력 값 "$input"에 대해 "$errorCause"는 이유로 "$expectedErrorMessage" 메세지와 함께 에러가 발생해야 한다.',
        ({ input, expectedErrorMessage }) => {
          // when - then
          expect(() => validateWinningNumber(input)).toThrow(new AppError(expectedErrorMessage));
        },
      );
    });
  });

  describe('정상 작동 테스트', () => {
    // given
    const SUCCESS_CASES = [{ input: '1,2,3,4,5,6' }];

    test.each(SUCCESS_CASES)('입력값 "$input"에 대해 에러가 발생하지 않아야 한다.', ({ input }) => {
      // when - then
      expect(() => validateWinningNumber(input)).not.toThrow();
    });
  });
});
