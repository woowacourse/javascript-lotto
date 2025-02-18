import LottoManager from "../src/LottoManager";

test("구입 금액에 해당하는 만큼 로또를 발행해야 한다", () => {
  const price = 5000;
  const lottoManager = new LottoManager(price);

  lottoManager.generateLottos();
  expect(lottoManager.lottos.length).toBe(5);
});
