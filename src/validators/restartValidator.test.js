import restartValidator from "./restartValidator.js";
import { MESSAGES } from "../constants/messages.js";

describe("restartValidator", () => {
  test.each(["y", "n"])("유효한 입력: %s", (input) => {
    expect(restartValidator(input)).toBe(true);
  });

  test.each(["yes", "no", "1", "a", ""])("잘못된 입력: %s", (input) => {
    expect(() => restartValidator(input)).toThrow(
      MESSAGES.invalid.restartInput
    );
  });
});
