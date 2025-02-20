import { ERROR_MESSAGE } from '../../src/constants/MESSAGES';
import RestartValidator from '../../src/validators/RestartValidator';

describe('재시작 여부 입력 검증 테스트', () => {
  describe('정상 케이스', () => {
    test.each(['y', 'n', 'Y', 'N'])(
      '입력 값이 y/n인 경우, 에러가 발생하지 않는다. (입력 값: %p)',
      (input) => {
        expect(() => {
          RestartValidator.validate(input);
        }).not.toThrow();
      },
    );
  });

  describe('예외 케이스', () => {
    test.each(['', 'asdf', ' ', '!@#$', '한글', '123', null, undefined])(
      '입력 값이 y/n이 아닌 경우, 에러가 발생한다. (입력 값: %p)',
      (input) => {
        expect(() => {
          RestartValidator.validate(input);
        }).toThrow(ERROR_MESSAGE.RESTART.INVALID_INPUT);
      },
    );
  });
});
