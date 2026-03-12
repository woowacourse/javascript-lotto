import Lotto from "../../../src/lotto/shared/domain/Lotto.js";
import Money from "../../../src/lotto/shared/domain/Money.js";
import LottoMachine from "../../../src/lotto/purchase/LottoMachine.js";

describe("LottoMachine method test", () => {
  const fixed = () => [1, 2, 3, 4, 5, 6];
  const testingLottoMachine = new LottoMachine(fixed);
  test("구매단위보다 커야 계산가능", () => {
    const money = new Money(900);
    expect(() => testingLottoMachine.buyLottos(money)).toThrow(
      LottoMachine.ERROR.NOT_ENOUGH,
    );
  });

  test("구매단위와 맞아야 계산가능", () => {
    const money = new Money(1050);
    expect(() => testingLottoMachine.buyLottos(money)).toThrow(
      LottoMachine.ERROR.INVALID_UNIT,
    );
  });

  test("5000원으로 5장 구매 성공", () => {
    const userMoney = new Money(5000);
    const { lottos, purchasedMoney } = testingLottoMachine.buyLottos(userMoney);
    expect(lottos[0]).toBeInstanceOf(Lotto);
    expect(lottos).toHaveLength(5);
    expect(purchasedMoney.getAmount()).toBe(5000);
  });
});
