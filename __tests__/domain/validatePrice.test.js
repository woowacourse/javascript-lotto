import { isNumber } from "../../src/domain/validatePrice.js";

describe("domain/validatePrice", () => {
  test.each([["0"], ["1"], ["1000"]])(
    "입력된 값이 양의 정수여야 한다",
    (input) => {
      expect(() => isNumber(input)).not.toThrow();
    }
  );
});
