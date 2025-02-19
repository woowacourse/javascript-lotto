import Validator from "../src/Validator/validator.js";

test("구입 금액이 문자인 경우에 예외 처리한다.", () => {
  const input = "천원";
  const purchaseMoney = Number(input);

  expect(() => Validator.validatePurchaseMoney(purchaseMoney)).toThrow(
    "[ERROR] 구입 금액은 숫자로 입력해야 합니다.",
  );
});

test("구입 금액이 소수인 경우에 예외 처리한다.", () => {
  const input = "1000.5";
  const purchaseMoney = Number(input);

  expect(() => Validator.validatePurchaseMoney(purchaseMoney)).toThrow(
    "[ERROR] 구입 금액은 정수로 입력해야 합니다.",
  );
});
