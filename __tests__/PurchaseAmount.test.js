import PurchaseAmount from "../src/PurchaseAmount";

test("1000으로 나누어 떨어지지 않는 경우", () => {
    expect(() => new PurchaseAmount(123)).toThrow();
})