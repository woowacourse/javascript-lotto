import { isOverlap } from "../utils/general.js";
import { validateWinningNumbers } from "../utils/validation.js";
import { ERROR_MESSAGES } from "../utils/constants.js";

/* eslint-disable no-undef */
describe("당첨 번호 유효성 테스트", () => {
  test("중복없이 입력해야 한다.", () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    expect(isOverlap(numbers)).toBeFalsy();
  });

  test("중복 입력을 하면 에러 메시지를 보여준다.", () => {
    const value = [2, 2, 3, 4, 5, 6];
    expect(() => validateWinningNumbers(value).toThrow(ERROR_MESSAGES.CAN_NOT_OVERLAP));
  });
});
