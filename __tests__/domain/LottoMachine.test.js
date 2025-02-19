import LottoMachine from "../../src/domain/lottoMachine.js";

test("입력 받은 금액만큼 로또 개수를 계산한다.", () => {
  const input = Number("1000");

  const lottoMachine = new LottoMachine();

  expect(lottoMachine.getLottoCount(input)).toBe(1);
});
