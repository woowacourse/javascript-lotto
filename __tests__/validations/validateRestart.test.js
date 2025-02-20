import { ERROR_MESSAGE } from "../../src/constants/error.js";
import validateRestart, {
  validateFormat,
} from "../../src/validations/validateRestart.js";

describe("validations/validateRestart", () => {
  test("입력이 y, n인지 확인한다.", () => {
    const input = "y";

    expect(() => validateFormat(input)).not.toThrow();
  });

  test("입력이 y, n가 아니면 에러를 반환한다.", () => {
    const input = "x";

    expect(() => validateFormat(input)).toThrow(
      ERROR_MESSAGE.INVALID_RESTART_FORMAT
    );
  });

  test.each([
    ["y", true],
    ["Y", true],
    ["n", false],
    ["N", false],
  ])("입력에 따라 true or false를 반환한다.", (input, expectedReturn) => {
    expect(validateRestart(input)).toBe(expectedReturn);
  });
});
