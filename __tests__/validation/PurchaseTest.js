import { ERROR_MESSAGE } from "../../src/constants/message.js";
import Purchase from "../../src/models/Purchase.js";

describe("구매 금액 입력에 적용되는 검증", () => {
  // input: ""
  test("숫자는 비어있을 수 없습니다.", () => {
    const INPUT = "";

    expect(() => {
      new Purchase(INPUT);
    }).toThrow(ERROR_MESSAGE.COMMON.INVALID_NUMBER);
  });

  // input: a, -1, 0.1
  test("숫자는 자연수여야 합니다.", () => {
    const INPUT = "a";

    expect(() => {
      new Purchase(INPUT);
    }).toThrow(ERROR_MESSAGE.COMMON.INVALID_NUMBER);
  });

  // input: 500, 2001
  test("숫자는 1000원 단위로 입력해야 합니다.", () => {
    const INPUT = "500";

    expect(() => {
      new Purchase(INPUT);
    }).toThrow(ERROR_MESSAGE.PURCHASE.INVALID_UNIT);
  });

  // input: 99999999999999999999999999
  test("숫자는 너무 커서는 안 됩니다.", () => {
    const INPUT = "99999999999999999999999999";

    expect(() => {
      new Purchase(INPUT);
    }).toThrow(ERROR_MESSAGE.PURCHASE.TOO_LARGE);
  });
});
