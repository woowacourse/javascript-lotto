import Validator from "../src/Validator/validator.js";

test("구입 금액이 문자인 경우에 예외 처리한다.", () => {
  const input = "천원";
  const purchaseMoney = Number(input);

  expect(() => Validator.validatePurchaseMoney(purchaseMoney)).toThrow(
    "[ERROR] 구입 금액은 숫자로 입력해야 합니다.",
  );
});
