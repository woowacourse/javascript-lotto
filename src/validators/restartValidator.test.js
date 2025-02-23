import restartValidator from "./restartValidator.js";
import { MESSAGES } from "../constants/messages.js";

describe("restartValidator 테스트", () => {
  test.each(["y", "n"])("재시작 할 수 있는 유효한 문자 %s를 입력하면 테스트를 통과한다.", (input) => {
    expect(restartValidator(input)).toBe(true);
  });

  test.each(["yes", "no", "1", "a", ""])("재시작 할 수 없는 유효하지 않은 문자 %s를 입력하면 에러를 띄운다.", (input) => {
    expect(() => restartValidator(input)).toThrow(
      MESSAGES.invalid.restartInput
    );
  });
});
