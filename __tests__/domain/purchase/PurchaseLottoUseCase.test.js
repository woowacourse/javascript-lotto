import PurchaseLottoUseCase from "../../../src/lotto/purchase/PurchaseLottoUseCase.js";
import LottoMachine from "../../../src/lotto/purchase/LottoMachine.js";
import Money from "../../../src/lotto/shared/domain/Money.js";
import Lotto from "../../../src/lotto/shared/domain/Lotto.js";

describe("PurchaseLottoUseCase", () => {
  const fixed = () => [1, 2, 3, 4, 5, 6];
  const lottoMachine = new LottoMachine(fixed);
  const purchaseLottoUseCase = new PurchaseLottoUseCase(lottoMachine);

  test("5000원으로 5장 구매", () => {
    const money = new Money(5000);
    const lottos = purchaseLottoUseCase.execute(money);
    expect(lottos).toHaveLength(5);
    expect(lottos[0]).toBeInstanceOf(Lotto);
  });
});
