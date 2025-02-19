import PurchaseService from "../src/service/PurchaseService.js";

test("로또를 구매할 금액을 입력하면, 로또 금액에 따른 구매 개수를 반환한다", () => {
  // given
  const inputPrice = 8000;
  const expectLottoCount = 8;

  // when
  const lottoCount = PurchaseService.getLottoCount(inputPrice);

  // then
  expect(lottoCount).toBe(expectLottoCount);
});
