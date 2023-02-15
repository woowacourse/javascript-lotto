import { checkPurchaseAmount, checkIsInteger } from "../src/step1-index";

test.each([
  [1000, true],
  [5000, true],
  [50000, true],
  [3001, false],
  [0, false],
  [-5000, false],
])(
  "입력받은 금액(%i)이 1,000원 이상이고 1,000원 단위가 아닌 경우 에러를 반환한다.",
  (purchaseAmount, expected) => {
    expected
      ? expect(() => checkPurchaseAmount(purchaseAmount)).not.toThrow()
      : expect(() => checkPurchaseAmount(purchaseAmount)).toThrow();
  }
);

test.each([
  ["천원", false],
  ["5000.0", false],
  [" ", false],
  ["^^", false],
  ["5,000", false],
  ["", false],
  ["2e3", false],
  ["500", true],
])("입력받은 금액(%i)이 정수가 아닐 경우 에러를 반환한다.", (purchaseAmount, expected) => {
  expected
    ? expect(() => checkIsInteger(purchaseAmount)).not.toThrow()
    : expect(() => checkIsInteger(purchaseAmount)).toThrow();
});
