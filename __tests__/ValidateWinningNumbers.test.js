import { LOTTO_NUMBERS_ERROR_MESSAGE, PRICE_ERROR_MESSAGE } from "../src/constants/errorMessage.js";
import validateWinningNumber from "../src/validation/validateWinningNumber.js";

describe("당첨 번호에 대한 유효성을 진행한다", () => {
  test("당첨 번호가 숫자가 아닌 경우 에러를 출력한다", () => {
    //given
    const input = "1,2,3,4,5,a";

    //then
    expect(() => validateWinningNumber(input)).toThrow(LOTTO_NUMBERS_ERROR_MESSAGE.NUMBER);
  });
  test("당첨 번호가 공백인 경우 에러를 출력한다", () => {
    //given
    const input = "1,2,,";

    //then
    expect(() => validateWinningNumber(input)).toThrow(LOTTO_NUMBERS_ERROR_MESSAGE.EMPTY_ITEM);
  });
  test("당첨 번호가 6개가 아닌 경우 에러를 출력한다", () => {
    //given
    const input = "1,2,3,4,5,6,7";

    //then
    expect(() => validateWinningNumber(input)).toThrow(LOTTO_NUMBERS_ERROR_MESSAGE.LENGTH);
  });
  test("당첨번호가 1~45 사이가 아닌 경우 에러를 출력한다", () => {
    //given
    const input = "1,2,3,4,5,46";

    //then
    expect(() => validateWinningNumber(input)).toThrow(LOTTO_NUMBERS_ERROR_MESSAGE.RANGE);
  });
  test("당첨번호에 중복이 있는 경우 에러를 출력한다", () => {
    //given
    const input = "1,2,3,4,6,6";

    //then
    expect(() => validateWinningNumber(input)).toThrow(LOTTO_NUMBERS_ERROR_MESSAGE.DUPLICATE);
  });
});
