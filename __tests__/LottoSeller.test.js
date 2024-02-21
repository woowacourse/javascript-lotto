import LottoSeller from "../src/domain/LottoSeller";

describe("LottoSeller에 대한 유닛 테스트", () => {
  test.each([
    [5000, 5],
    [1000, 1],
  ])("구입 금액에 맞는 수의 로또 발행 (%i원 %i장)", (amount, count) => {
    const seller = new LottoSeller();

    const lottos = seller.sellLottos(amount);

    expect(lottos.length).toBe(count);
  });

  test.each([
    [1999, 1],
    [2001, 2],
  ])(
    "구입 금액에 맞는 수의 로또 발행(천원 단위의 금액이 아닌 경우 버림한다) ",
    (amount, count) => {
      const seller = new LottoSeller();

      const lottos = seller.sellLottos(amount);

      expect(lottos.length).toBe(count);
    }
  );
});
