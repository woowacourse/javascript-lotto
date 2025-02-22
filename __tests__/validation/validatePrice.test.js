import { ERROR } from "../../src/constants/message.js";
import validatePrice from "../../src/validation/validatePrice.js";

describe("입력한 구매 금액에 대한 유효성 검사를 진행한다", () => {
  test("1000원 단위가 아닌 경우 에러를 발생시킨다.", () => {
    const price = 1200;

    expect(() => validatePrice(price)).toThrow(ERROR.UNIT);
  });

  test.each([999, 100001])(
    "1000원 이상 100,000 이하가 아닌 경우 에러를 발생시킨다. - %s원인 경우",
    (price) => {
      expect(() => validatePrice(price)).toThrow(ERROR.INVALID_RANGE);
    }
  );
});
