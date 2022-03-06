import { isNotNumber, isEmpty, isOutOfRange, isOverlap } from "../utils/general.js";
import { validateWinningNumbers } from "../utils/validation.js";
import { ERROR_MESSAGES } from "../utils/constants.js";

/* eslint-disable no-undef */
describe("당첨 번호 유효성 테스트", () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  test("숫자만 입력할 수 있다.", () => {
    expect(numbers.some((number) => isNotNumber(number))).toBeFalsy();
  });

  test("숫자가 아니면 에러 메시지를 보여준다.", () => {
    const value = ["문자", 2, 3, 4, 5, 6];
    expect(() => validateWinningNumbers(value).toThrow(ERROR_MESSAGES.NOT_A_NUMBER));
  });

  test("6개 전부 입력을 해야 한다.", () => {
    expect(numbers.some((number) => isEmpty(number))).toBeFalsy();
  });

  test("빈값이 입력이 되면 에러 메시지를 보여준다.", () => {
    const value = ["", 2, 3, 4, 5, 6];
    expect(() => validateWinningNumbers(value).toThrow(ERROR_MESSAGES.EMPTY_CAN_NOT_ENTERED));
  });

  test("1~45 범위 안으로 입력할 수 있다.", () => {
    const min = 1;
    const max = 45;
    expect(numbers.some((number) => isOutOfRange(number, min, max))).toBeFalsy();
  });

  test("1~45 범위를 벗어나면 에러 메시지를 보여준다.", () => {
    const value = [1, 2, 3, 4, 5, 46];
    expect(() => validateWinningNumbers(value).toThrow(ERROR_MESSAGES.OUT_OF_RANGE));
  });

  test("중복없이 입력해야 한다.", () => {
    expect(isOverlap(numbers)).toBeFalsy();
  });

  test("중복 입력을 하면 에러 메시지를 보여준다.", () => {
    const value = [2, 2, 3, 4, 5, 6];
    expect(() => validateWinningNumbers(value).toThrow(ERROR_MESSAGES.CAN_NOT_OVERLAP));
  });
});
