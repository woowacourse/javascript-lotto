import LottoSeller from "../src/domain/LottoSeller.js";
import Money from "../src/domain/Money.js";

describe("LottoSeller에 대한 유닛 테스트", () => {
  test.each([
    [5000, 5],
    [1000, 1],
  ])("구입 금액에 맞는 수의 로또 발행 (%i원 %i장)", (amount, count) => {
    const money = new Money(amount);
    const lottos = LottoSeller.sell(money);

    expect(lottos.length).toBe(count);
  });

  test.each([
    [1999, 1],
    [2001, 2],
  ])(
    "구입 금액에 맞는 수의 로또 발행(천원 단위의 금액이 아닌 경우 버림한다) ",
    (amount, count) => {
      const money = new Money(amount);

      const lottos = LottoSeller.sell(money);

      expect(lottos.length).toBe(count);
    }
  );
});
