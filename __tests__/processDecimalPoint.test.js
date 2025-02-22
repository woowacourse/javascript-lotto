import processDecimalPoint from "../src/utils/processDecimalPoint.js";

describe("processDecimalPoint 도메인 테스트", () => {
  test("소수점이 없는 숫자는 그대로 반환한다.", () => {
    expect(processDecimalPoint(100)).toBe(100);
  });

  test("소수 첫째 자리까지의 숫자는 그대로 반환한다.", () => {
    expect(processDecimalPoint(123.5)).toBe("123.5");
    expect(processDecimalPoint(12.9)).toBe("12.9");
  });

  test("소수 둘째짜리 이상의 숫자는 둘째자리로만 반환한다.", () => {
    expect(processDecimalPoint(123.55)).toBe("123.55");
    expect(processDecimalPoint(123.123)).toBe("123.12");
    expect(processDecimalPoint(1234.1234)).toBe("1234.12");
  });
});
