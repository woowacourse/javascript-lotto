import Lotto from "../../../src/lotto/shared/domain/Lotto.js";
import LottoMachine from "../../../src/lotto/purchase/LottoMachine.js";

describe("LottoMachine method test", () => {
  const fixed = () => [1, 2, 3, 4, 5, 6];
  const testingLottoMachine = new LottoMachine(fixed);

  test("구매단위보다 커야 계산가능", () => {
    expect(() => testingLottoMachine.buyLottos(900)).toThrow(
      LottoMachine.ERROR.NOT_ENOUGH,
    );
  });

  test("5000원으로 5장 구매 성공", () => {
    const lottos = testingLottoMachine.buyLottos(5000);
    expect(lottos[0]).toBeInstanceOf(Lotto);
    expect(lottos.length).toBe(5);
  });
});
