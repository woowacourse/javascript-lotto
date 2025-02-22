import { ERROR } from "../../src/constants/message.js";
import {
  validateEmpty,
  validateNumber,
  validateRange,
} from "../../src/validation/validate.js";

describe("입력 값 유효성 테스트를 진행한다.", () => {
  test("입력이 비어있으면 오류를 발생시킨다.", () => {
    // given
    const input = "";
    // when
    // then
    expect(() => validateEmpty(input)).toThrow(ERROR.EMPTY);
  });

  test("숫자가 아닌 값을 입력하면 오류를 발생시킨다.", () => {
    // given
    const input = ".";

    expect(() => validateNumber(input)).toThrow(ERROR.NOT_NUMBER);
  });

  describe("범위를 벗어난 입력을 할 경우 오류를 발생시킨다.", () => {
    test("1보다 작은 값을 입력하면 오류를 발생시킨다.", () => {
      // given
      const input = 0;

      expect(() => validateRange({ min: 1, max: 45 }, input)).toThrow(
        ERROR.INVALID_RANGE
      );
    });
    test("45보다 큰 값을 입력하면 오류를 발생시킨다.", () => {
      // given
      const input = 46;

      expect(() => validateRange({ min: 1, max: 45 }, input)).toThrow(
        ERROR.INVALID_RANGE
      );
    });
  });
});
