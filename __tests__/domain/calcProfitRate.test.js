import calcProfitRate from "../../src/domain/calcProfitRate";

describe("/domain/calcProfitRate", () => {
  test("구매 가격과 보상 금액을 통해 알맞은 수익률을 반환한다.", () => {
    // Given
    const purchasePrice = 100_000;
    const rewardPrice = 120_000;

    // When
    const result = calcProfitRate(purchasePrice, rewardPrice);

    // Then
    expect(result).toBe(120);
  });
});
