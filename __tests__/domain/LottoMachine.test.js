/* eslint-disable max-lines-per-function */
import LottoMachine from "../../src/domain/LottoMachine.js";

describe("LottoMachine 객체 테스트", () => {
  test("구입 금액만큼 로또를 생성한다.", () => {
    const PURCHASE_AMOUNT = 4_000;
    const EXPECTED_LOTTO_COUNT = 4;
    const lottoMachine = new LottoMachine(PURCHASE_AMOUNT);

    expect(lottoMachine.makeLottos(PURCHASE_AMOUNT).length).toBe(
      EXPECTED_LOTTO_COUNT,
    );
  });
});
