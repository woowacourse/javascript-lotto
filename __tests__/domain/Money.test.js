import Money from "../../src/domain/Money.js";

describe("Money class 테스트", () => {
  describe("생성자 테스트", () => {
    test("숫자가 아닌 값은 에러를 던진다", () => {
      expect(() => new Money("abc")).toThrow("[ERROR]");
    });

    test("음수는 에러를 던진다", () => {
      expect(() => new Money(-1000)).toThrow("[ERROR]");
    });

    test("0은 에러를 던진다", () => {
      expect(() => new Money(0)).toThrow("[ERROR]");
    });

    test("소수는 에러를 던진다", () => {
      expect(() => new Money(1000.5)).toThrow("[ERROR]");
    });

    test("양의 정수는 정상 생성된다", () => {
      expect(() => new Money(1000)).not.toThrow();
    });
  });

  describe("getAmount", () => {
    test("입력한 금액을 반환한다", () => {
      const money = new Money(2050);
      expect(money.getAmount()).toBe(2050);
    });
  });
});
