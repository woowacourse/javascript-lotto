import LottoGenerator from "../src/domain/LottoGenerator.js";

test("구입 금액에 해당하는 만큼 로또를 발행해야 한다", () => {
  const price = 5000;
  const generatedLottos = LottoGenerator.getGenerateLottos(price);
  expect(generatedLottos.length).toBe(5);
});
