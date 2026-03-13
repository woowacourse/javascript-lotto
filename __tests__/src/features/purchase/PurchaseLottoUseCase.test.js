import LottoMachine from "../../../../src/features/purchase/LottoMachine.js";
import PurchaseLottoUseCase from "../../../../src/features/purchase/PurchaseLottoUseCase.js";

describe("PurchaseLottoUseCase", () => {
  const fixed = () => [1, 2, 3, 4, 5, 6];
  const lottoMachine = new LottoMachine(fixed);
  const purchaseLottoUseCase = new PurchaseLottoUseCase(lottoMachine);

  test("5000원으로 5장 구매", () => {
    const purchaseDto = purchaseLottoUseCase.execute(5000);
    expect(purchaseDto.lottos).toHaveLength(5);
    expect(purchaseDto.purchasedAmount).toBe(5000);
    expect(purchaseDto.lottos[0]).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
