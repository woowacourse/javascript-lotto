import LottoMachine from "../src/model/LottoMachine.js";

test("로또 발행 test", () => {
  const purchaseAmount = 3000;
  const lottoMachine = new LottoMachine(purchaseAmount);
  const lottoNumbers = lottoMachine.issuedLottos();

  expect(lottoNumbers.length).toBe(3);
});
