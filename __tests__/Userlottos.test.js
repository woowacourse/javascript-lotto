import getGenerateLottos from "../src/domain/lottoGenerator.js";

test("구입 금액에 해당하는 만큼 로또를 발행해야 한다", () => {
  const price = 5000;
  const generatedLottos = new getGenerateLottos(price);

  expect(generatedLottos.length).toBe(5);
});
