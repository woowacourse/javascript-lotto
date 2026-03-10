import LottoStore from "../src/model/LottoStore.js";

describe("로또 발행 테스트 ", () => {
  test("RandomUtil이 아닌 인스턴스를 주입하면 예외가 발생한다.", () => {
  expect(() => new LottoStore({ randomUtil: {} })).toThrow();
});

  test("구입 금액이 5천원인 경우 발급한 로또의 갯수는 5개이다.", () => {
    expect(new LottoStore().issuedLottos(5000).length).toBe(5);
  });
});
