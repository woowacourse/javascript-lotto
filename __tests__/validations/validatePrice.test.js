import {
  isNumber,
  isValidPriceRange,
  isValidPriceUnit,
} from "../../src/validations/validatePrice.js";

describe("validations/validatePrice", () => {
  test.each([["0"], ["1"], ["1000"]])(
    "입력된 값이 양의 정수여야 한다.",
    (input) => {
      expect(isNumber(input)).toBe(true);
    }
  );

  test.each([["-1"], ["0.5"], ["1000j"], ["asdf"]])(
    "입력된 값이 양의 정수가 아니면 에러를 출력한다.",
    (input) => {
      expect(isNumber(input)).toBe(false);
    }
  );

  test("1000원 단위로 입력한다.", () => {
    const input = 1000;

    expect(isValidPriceUnit(input)).toBe(true);
  });

  test("1000원 단위로 입력하지 않으면 에러를 출력한다.", () => {
    const input = 1500;

    expect(isValidPriceUnit(input)).toBe(false);
  });

  test("1000원 이상 10만원 이하여야 한다.", () => {
    const input = 11000;

    expect(isValidPriceRange(input)).toBe(true);
  });

  test.each([[800], [1_001_000]])(
    "1000원 이상 10만원 이하가 아니면 에러를 출력한다.",
    (input) => {
      expect(isValidPriceRange(input)).toBe(false);
    }
  );
});
