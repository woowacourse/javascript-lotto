import Money from "../../src/domain/Money.js";
describe("Money class 테스트", () => {
  describe("생성자 테스트", () => {
    test("구매 단위(1,000)보다 작을 수 없다", () => {
      expect(() => new Money(900)).toThrow("[ERROR]");
    });

    test("구매 금액은 구매 단위보다 같거나 크면 된다", () => {
      expect(() => new Money(1000)).not.toThrow();
    });
  });

  describe("method test", () => {
    test("머니가 살 수 있는 최대의 로또 갯수를 반환 Money.purchaseLotto()", () => {
      const money = new Money(2050);
      expect(money.getMaximumLottoCount()).toBe(2);
    });
  });
});
