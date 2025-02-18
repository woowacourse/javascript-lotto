import { ERROR_MESSAGE } from "../../src/constants/error.js";
import { isNumber } from "../../src/domain/validatePrice.js";

describe("domain/validatePrice", () => {
  test.each([["0"], ["1"], ["1000"]])(
    "입력된 값이 양의 정수여야 한다",
    (input) => {
      expect(() => isNumber(input)).not.toThrow();
    }
  );

  test.each([["-1"], ["0.5"], ["1000j"], ["asdf"]])(
    "입력된 값이 양의 정수가 아니면 에러를 출력한다",
    (input) => {
      expect(() => isNumber(input)).toThrow(ERROR_MESSAGE.INVALID_NUMBER);
    }
  );
});
