import { validateYorN } from '../../src/validations/validate/ReStartValidate.js';
import { Y_OR_NO_ERROR_MESSAGE } from '../../src/constants/constants.js';

describe('재시작 여부 유효성 검사 테스트', () => {
  test.each([1.5, 'hi'])('입력값이 "%s"일 때, "y" 또는 "n"이 아니므로 에러를 발생시킨다', (input) => {
    expect(() => validateYorN(input)).toThrow(Y_OR_NO_ERROR_MESSAGE);
  });
});
