import Money from "../../../src/domain/Money.js";

describe("Money 생성 실패 테스트(유효성검사)", () => {
  test("돈은 음수가 될 수없다", () => {
    expect(() => new Money(-1000)).toThrow(Money.ERROR.NEGATIVE);
  });
});

describe("Money getter test", () => {
  test("Money getAmount", () => {
    const money = new Money(1000);
    expect(money.getAmount()).toBe(1000);
  });
});

describe("Money 객체 수익률 테스트", () => {
  test("수익률 계산 8000원으로 5000원 벌면 62.5%", () => {
    const money = new Money(8000);
    expect(money.calculateProfitRate(5000)).toBe(62.5);
  });
});
